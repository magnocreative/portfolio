"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ThemeToggle } from "@/design-system/components/ThemeToggle";
import { Logo } from "@/design-system/brand/Logo";
import { WorkIcon, SystemIcon, AboutIcon, ResumeIcon } from "@/design-system/components/Icon";

// Résumé sits in the same list as the rest rather than being appended by hand.
// A second copy of the markup meant every change to a nav link had to be made
// twice, which is how it ended up as the one item that could not show a
// selected state.
//
// Color in this nav means one thing — you are here — and nothing borrows it
// for emphasis. Résumé used to be drawn permanently in the accent blue as a
// nudge toward the thing reviewers want most, and that stopped working the
// moment the nav gained a real selected state: a permanently blue item reads
// as permanently current, on every page.
const nav = [
  { href: "/work", label: "Work", Icon: WorkIcon },
  { href: "/system", label: "Design system", Icon: SystemIcon },
  { href: "/about", label: "About", Icon: AboutIcon },
  { href: "/resume", label: "Résumé", Icon: ResumeIcon },
];

// startsWith, not equality, so a case study at /work/some-slug still marks Work
// as the section you are in. The trailing slash matters: without it /workshop
// would light up Work too.
//
// The null guard is not defensive noise. `usePathname` returns null wherever
// there is no app router above the component, which is exactly the case in
// Storybook, and without it the header threw and rendered nothing there.
function useCurrentHref() {
  const pathname = usePathname();
  const isCurrent = (href: string) =>
    pathname != null && (pathname === href || pathname.startsWith(`${href}/`));
  // One decision per render, returned once. Every consumer compares against
  // this single value rather than calling the predicate again, so the mark the
  // eye sees and the state a screen reader is told cannot disagree.
  return nav.find((item) => isCurrent(item.href))?.href ?? null;
}

/**
 * A vertical list of links with one indicator shared between them.
 *
 * One mark that moves is a position in a list. Four marks that switch on and
 * off are four separate states that happen to be mutually exclusive, and only
 * the first reads as "you are here, and here is where you came from".
 *
 * The indicator is positioned from the real offsetTop and height of the
 * current item rather than from an index times an assumed row height, because
 * the moment a label wraps an assumed height puts the mark beside the wrong
 * link.
 */
function NavList({
  rowClassName = "min-h-10 px-3",
  collapsible = false,
  variant = "rows",
}: {
  /**
   * How the four items are arranged, and it is ONE prop rather than two on
   * purpose.
   *
   * "grid" means a 2x2 of containers: each item becomes a tile with its icon
   * above its label and a drawn edge around it. The containers are not a
   * separate option you can ask for on a row, because that combination was
   * built, measured and rejected, and leaving it reachable would invite
   * someone to rebuild it.
   *
   * Why it fails on rows. A full-bleed row is 366 x 44, an 8:1 rectangle. Its
   * two long edges dominate and its two short edges sit 12px from the screen
   * edge with no ground beside them to read against, so the outline never
   * closes and four containers read as eight horizontal rules. Worse, measured
   * against the panel the edge is LOUDER than the state it is supposed to
   * frame:
   *
   *                                      light    dark
   *   container edge (border-subtle)     1.22:1   1.13:1
   *   selected fill  (surface-sunken)    1.14:1   1.11:1
   *
   * Four containers each outshouting the one selected item is backwards, and
   * it made the current page harder to find rather than easier. Giving the
   * current row an accent edge instead was tried and did not fix it, because
   * the shape is the problem and the color is not.
   *
   * The same 1px edge, the same token, the same 1.13:1, works in the grid,
   * because a tile is 167 x 94 and an outline at 1.8:1 closes. Containers need
   * area, which is the whole reason the two things are one prop.
   */
  variant?: "rows" | "grid";
  /**
   * Whether this list's labels follow the rail's collapsed state.
   *
   * Only the rail's copy does. The `rail-collapsed:` variant keys off
   * `[data-rail="collapsed"]` on <html>, so it matches EVERY descendant of the
   * document — including the phone panel, which has nothing to do with the
   * rail and is not even rendered at the width the rail exists at. Collapsing
   * the rail on a desktop therefore stored a preference that, on the same
   * person's phone, silently reduced the menu to four unlabeled icons.
   *
   * Nothing caught it: the labels were `sr-only`, so they stayed in the
   * accessibility tree with their names intact and axe passed every run. It
   * needed a person to open the menu on a phone after collapsing the rail on a
   * laptop — two states, two devices, one shared key.
   */
  collapsible?: boolean;
  /**
   * The row's height and horizontal padding. Row variant only; the grid sizes
   * its tiles from their own content.
   *
   * 40px in the rail, where the pointer is precise and nothing is tapped. The
   * 44px figure that belongs to touch now lives in the grid's tiles, which are
   * 167 x 94 and clear it twice over.
   *
   * There used to be a second note here about the panel bleeding its rows
   * outward by 12 (`-mx-3 px-3`), so the icon could keep the mark's 24px line
   * while the fill still had padding to hold it in. That trick is gone with
   * the rows it served, and it is worth recording why rather than just
   * deleting it.
   *
   * Three things were wanted and only two were ever available at once: the
   * icon ink on 24 to match the mark, inner padding so the fill was not
   * jammed against its own icon, and the fill's edge on 24 with everything
   * else in the panel. The bleed bought the first two by spending the third,
   * which was invisible until the theme chips moved to the right and put a
   * chip edge on 366 directly under a fill edge on 378.
   *
   * The grid does not resolve that conflict, it dissolves it. Centred content
   * in a tile has no left edge to argue about, so all three constraints stop
   * competing at once.
   */
  rowClassName?: string;
}) {
  const currentHref = useCurrentHref();
  const grid = variant === "grid";
  return (
    <nav aria-label="Main">
      {/* `gap-2` in the grid rather than `gap-1`: a drawn edge needs air around
          it, and at 4px the four tiles read as one block subdivided rather
          than as four objects.

          Two columns on a phone, four from 640 up, and the reflow is the same
          rule that rejected containers on rows in the first place: a tile only
          reads as a tile while its proportions stay near square. Held at two
          columns, a tile is 167 x 94 at 390 and a perfectly good object, but
          530 x 94 at 1100 — a 5.6:1 bar with its icon and label marooned in
          the middle, which is exactly the shape that failed as a row.

          Four columns puts it back: 174 wide at 768, 301 at 1279. The widest
          label, "DESIGN SYSTEM" at 120px, has 22px of slack in the narrowest
          four-column cell, at 640.

          640 is also where the theme controls leave the panel for the banner,
          so one breakpoint changes the panel from a phone sheet into a single
          row of four, rather than two rules firing at different widths. */}
      <ul
        className={
          grid
            ? "grid grid-cols-2 gap-2 sm:grid-cols-4"
            : "relative flex flex-col gap-1"
        }
      >
        {nav.map(({ Icon, ...item }) => {
          const current = item.href === currentHref;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                data-href={item.href}
                aria-current={current ? "page" : undefined}
                // Height comes from the caller, because the two places this
                // list renders are not the same kind of target. Both clear the
                // WCAG 2.2 AA minimum of 24px by a wide margin. These were
                // 23px once — one pixel under that minimum — and the 23 came
                // from a line height rather than from any decision.
                //
                // A contained pill on the logo's 24px line, rather than a row
                // bleeding off the screen edge.
                //
                // The fills are neutral, not the interactive blue, and they
                // are deliberately quiet: hover takes `surface-page` and
                // current takes `surface-sunken`, which against the rail's
                // raised ground measure 1.08 and 1.14 in light, 1.06 and 1.11
                // in dark. They sit a step DOWN the surface ramp rather than
                // up, so the current row reads as recessed — where you already
                // are — rather than as a control asking to be pressed.
                //
                // The blue tint this replaced measured 1.49 and 1.80, which is
                // a lot of weight for a row you are not being asked to click.
                //
                // Current and hover differ by 1.05:1, which is nothing — but
                // the two never appear on the same row, so the comparison that
                // matters is each against the rail, not against each other.
                // The state does not rest on the fill: it rests on the label's
                // weight, on `aria-current`, and on color, in that order.
                className={[
                  "group rounded-sm transition-colors duration-[160ms]",
                  grid
                    ? // The edge is an inset box-shadow, not a border, and that
                      // is arithmetic rather than taste: `box-sizing:
                      // border-box` would make a 1px border eat 1px of the
                      // tile's own padding and shift everything inside it. A
                      // shadow is painted, not laid out.
                      //
                      // Every tile carries the same edge, including the current
                      // one. The edge is the container; the fill, the weight
                      // and the accent are the state. An edge that appeared
                      // only on the current tile would be a fourth signal
                      // saying what three already say, and would leave the
                      // other three looking like they had lost something.
                      "flex flex-col items-center justify-center gap-2.5 py-5 shadow-[inset_0_0_0_1px_var(--border-subtle)]"
                    : "flex items-center gap-3",
                  grid ? "" : rowClassName,
                  current ? "bg-surface-sunken" : "hover:bg-surface-page",
                ].join(" ")}
              >
                {/* 36px from the rail's edge, which is the pill's 24 plus its
                    12 of padding. The icons gave up the logo's exact left edge
                    when the row became a contained pill: a pill with no inner
                    padding is a box with its contents jammed against the side,
                    and of the two alignments the pill's edge is the one worth
                    keeping, because the pill is the larger object and the one
                    the eye reads as the row. */}
                {/* -3.6px, and it is arithmetic rather than a nudge. Every
                    icon here is drawn with its ink spanning x 3 to 17 of a
                    20-unit viewBox, so at 24px rendered the shape starts 3.6px
                    inside its own box. Aligning the boxes therefore left the
                    icons 3.6px right of the logo, whose ink fills its viewBox
                    edge to edge. The eye aligns ink, not boxes.

                    This is why the icons were normalized to one ink box first:
                    with four different insets there is no single offset, only
                    four magic numbers.

                    It applies in BOTH rail states, and the fact that it does
                    is the whole reason the collapsed rail is 88.8px wide
                    rather than a round number.

                    There was a version that handed the 3.6 back on collapse,
                    on the reasoning that a narrow strip is read as a centred
                    column rather than as a left edge. It did centre the icons,
                    and it also moved every one of them 3.6px sideways on each
                    toggle — the labels slid in and the icons slid under them,
                    which is visible and which someone reported within the day.

                    Both were treated as a choice between centring and
                    alignment. They are not. Spending the offset buys centring
                    at the cost of a 3.6px jump; keeping it buys alignment at
                    the cost of 36.01px of air on the left against 43.19 on the
                    right. The third option is to stop adjusting the icon and
                    size the container to it: hold the ink at 36 and make the
                    rail 2*(24+12) + 16.8 = 88.8, and the air comes out 36.01
                    and 35.99. Nothing moves, the strip is symmetric, and the
                    icons keep the mark's line in both states, which the
                    give-back version had quietly given up.

                    The 16.8 is the ink's own width, 14 of the 20 viewBox units
                    at 24px. That is why the number is not round: it is derived
                    from the artwork rather than chosen, and rounding it to 88
                    or 96 reintroduces the asymmetry it exists to remove. */}
                <span
                  className={`grid h-6 w-6 shrink-0 place-items-center ${
                    grid ? "" : "-ml-[3.6px]"
                  }`}
                >
                  <Icon
                    className={`h-6 w-6 transition-colors duration-[160ms] ${
                      current
                        ? "text-text-accent"
                        : "text-text-tertiary group-hover:text-text-secondary"
                    }`}
                  />
                </span>
                <span
                  // Weight, not just color. The vertical marker used to be the
                  // non-color half of this state; without it the current row
                  // would be distinguished by accent text and an accent icon
                  // on a 1.14:1 fill — which is close enough to color alone to
                  // be the thing that disqualified the tinted theme chip at
                  // 1.17:1. Semibold costs nothing here because the label is
                  // monospace: the advance width of every character is fixed,
                  // so the row cannot reflow when the weight changes.
                  className={`font-mono text-xs uppercase tracking-[0.11em] transition-colors duration-[160ms] ${
                    collapsible ? "rail-collapsed:sr-only" : ""
                  } ${
                    current
                      ? "font-semibold text-text-accent"
                      : "font-medium text-text-secondary group-hover:text-text-primary"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export const RAIL_STORAGE_KEY = "mc-rail";

/**
 * Runs before first paint, injected into <head>, same job as the theme's.
 *
 * Without it a visitor who collapsed the rail last time gets the expanded
 * 240px rail for one frame and then watches the whole page jump 144px left.
 * That is a worse first impression than either state, and it is the exact
 * failure the theme script exists to prevent — a stored preference arriving
 * after the paint it was meant to govern.
 */
export const railInitScript = `(function(){try{if(localStorage.getItem("${RAIL_STORAGE_KEY}")==="collapsed"){document.documentElement.setAttribute("data-rail","collapsed")}}catch(e){}})();`;

/** A chevron pointing at the edge it will move toward. It rotates rather than
 *  swapping paths, and the rotation is driven by the same `data-rail`
 *  attribute as everything else, so there is no state to keep in step. */
function ChevronIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className="h-6 w-6 transition-transform duration-[240ms] ease-[var(--ease-out-quart)] rail-collapsed:rotate-180 motion-reduce:transition-none"
    >
      {/* Spans 13 of the 20-unit viewBox vertically, where it used to span 10.
          The box was always 24px in a 32px chip, same as every other icon, but
          a chevron fills a narrow slice of its own box while the sun and the
          monitor fill most of theirs — so at identical box sizes this one read
          as the smaller icon. The fix is the path, not the box. */}
      <path d="M13.25 3.5L6.75 10l6.5 6.5" />
    </svg>
  );
}

/**
 * Two lines that become a cross, and actually travel between the two.
 *
 * A control that gives no sign of its own state is the thing this site
 * criticizes everywhere else; `aria-expanded` says it to a screen reader and
 * this says it to everyone.
 *
 * Both lines are drawn in the same place — centered on the viewBox — and it is
 * the CLOSED state that displaces them, 3 units up and 3 units down. That is
 * backwards from how it reads on screen, and it is the whole reason this can
 * animate: authored as two separate paths, one for the lines and one for the
 * cross, opening the menu swapped one `d` for another and there was nothing in
 * between for a transition to interpolate. A path swap cannot be tweened; a
 * transform can.
 *
 * Drawing them centered also puts the rotation origin on the viewBox center,
 * which is each line's own center, so they pivot in place rather than swinging
 * around a corner. `transform-box: view-box` is stated rather than assumed —
 * it is the spec's initial value, and that is exactly the kind of default that
 * is cheap to declare and expensive to be wrong about.
 *
 * 240ms on the site's standard ease, and silent under prefers-reduced-motion.
 */
function MenuIcon({ open }: { open: boolean }) {
  const line = {
    transformBox: "view-box" as const,
    transformOrigin: "center" as const,
  };
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
      className="h-6 w-6 [&>path]:transition-transform [&>path]:duration-[240ms] [&>path]:ease-[var(--ease-out-quart)] motion-reduce:[&>path]:transition-none"
    >
      <path
        d="M3 10h14"
        style={{ ...line, transform: open ? "rotate(45deg)" : "translateY(-3px)" }}
      />
      <path
        d="M3 10h14"
        style={{ ...line, transform: open ? "rotate(-45deg)" : "translateY(3px)" }}
      />
    </svg>
  );
}

/**
 * The banner. Every width, full bleed, and the only identity on the page.
 *
 * This used to be two components: a Bar below 1280 carrying the mark, the name
 * and a theme control, and a Rail above it carrying its own copy of all three.
 * Two of everything, never visible at once. The identity now lives here alone
 * and the rail below is navigation and nothing else.
 *
 * That split is what made the rail 300px wide — it was sized by the 188px name
 * rather than by anything navigational. Nav-only, the widest unbreakable thing
 * is the 120px "Design system" label, which is why the rail is now 240 and why
 * prose sets at the full documented 900px measure at 1280 rather than 852.
 *
 * It costs the thing the rail was originally built to buy: content no longer
 * begins at the top of the viewport. 64px off every page, permanently. Taken
 * knowingly, because an identity that moves and resizes when a navigation
 * preference changes was the worse problem.
 *
 * The 64 is a token, and `scroll-margin-top` in globals.css is derived from it
 * rather than stated beside it, so the one number governs both the bar and
 * everything that has to clear the bar.
 *
 * Fixed height from a token rather than from whatever the contents add up to.
 * The rail is positioned from the same token, so the two cannot drift; a
 * height that is a consequence of padding is a number nothing can safely be
 * measured against.
 */
function Banner() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close on navigation, or the panel sits open over the page it just left.
  //
  // Adjusted during render rather than in an effect. This was
  // `useEffect(() => setOpen(false), [pathname])`, which React's own lint rule
  // flags: it renders the panel open on the new route, then immediately
  // renders it closed. The documented pattern for "reset state when a prop
  // changes" is to compare and set during render, which React re-runs before
  // committing anything to the DOM, so the open panel is never painted.
  const [openedAt, setOpenedAt] = useState(pathname);
  if (openedAt !== pathname) {
    setOpenedAt(pathname);
    setOpen(false);
  }

  // Escape closes and puts focus back on the control that opened it. Without
  // the second half, a keyboard user who dismisses the panel is left with
  // focus on nothing and has to tab from the top of the document again.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  /**
   * Swipe up to dismiss.
   *
   * Attached by hand rather than through React's `onTouchMove`, because this
   * listener has to call `preventDefault` and a passive listener cannot. React
   * makes no promise about which of its touch handlers are passive, and on iOS
   * a passive touchmove means the page scrolls underneath the gesture: the
   * menu closes AND the article behind it jumps, out of one movement the
   * person meant as one thing.
   *
   * Only touches that START on the panel are affected. Everywhere else on the
   * page scrolls exactly as it did.
   *
   * Three things it deliberately declines to act on:
   *
   * - A panel tall enough to need its own scroll. Checked per gesture rather
   *   than assumed from the current design, because four short labels fit any
   *   phone and a translated label at large text on a small viewport may not,
   *   and silently eating that scroll would be a worse bug than having no
   *   gesture at all.
   * - A horizontal drag. Both mobile platforms use edge-swipe for back, and a
   *   dismiss gesture must not sit on top of system navigation.
   * - A downward drag. The panel is anchored to the top of the screen; there
   *   is nothing below it to pull down.
   *
   * The panel tracks the finger rather than waiting for release, which is what
   * separates a gesture that works from one that feels real: the person sees
   * the thing move while they are still deciding, and a release short of the
   * threshold springs back instead of leaving them guessing whether they did
   * anything. The travel is damped (an exponent, not a cap) so the panel never
   * outruns the finger or leaves the top of the screen.
   */
  const panelRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef(0);
  const [drag, setDrag] = useState(0);

  useEffect(() => {
    const el = panelRef.current;
    if (!el || !open) return;

    let startY = 0;
    let startX = 0;
    let travel = 0; // how far the FINGER went, which is not how far the panel went
    let lastY = 0;
    let lastT = 0;
    let velocity = 0; // px per ms, positive upward
    let live = false;

    const set = (v: number) => {
      dragRef.current = v;
      setDrag(v);
    };

    const onStart = (e: TouchEvent) => {
      const t = e.touches[0];
      startY = lastY = t.clientY;
      startX = t.clientX;
      lastT = e.timeStamp;
      travel = 0;
      velocity = 0;
      live = el.scrollHeight <= el.clientHeight + 1;
      set(0);
    };

    const onMove = (e: TouchEvent) => {
      if (!live) return;
      const t = e.touches[0];
      const dy = t.clientY - startY;
      const dx = t.clientX - startX;
      if (Math.abs(dx) > Math.abs(dy)) {
        live = false;
        set(0);
        return;
      }
      if (dy >= 0) {
        travel = 0;
        set(0);
        return;
      }
      if (e.cancelable) e.preventDefault();
      const dt = e.timeStamp - lastT;
      if (dt > 0) velocity = (lastY - t.clientY) / dt;
      lastY = t.clientY;
      lastT = e.timeStamp;
      travel = -dy;
      set(-Math.pow(travel, 0.82));
    };

    const onEnd = () => {
      // Measured on the FINGER, not on the panel's damped travel, and the
      // difference is not academic: the damping exponent means 48px of panel
      // movement is 112px of actual thumb, which on a 390px screen is most of
      // a reachable stroke. Testing the damped number was a real bug — the
      // gesture worked and simply felt dead, because the distance the person
      // had to produce was more than twice the one documented beside it.
      //
      // 48px of finger on a 281px panel is about a sixth of its height, which
      // is the proportion both mobile platforms settle around for a dismiss.
      // No tap travels that far.
      //
      // Velocity is the second way in, because a flick is a dismissal that
      // never covers much ground: 0.5px/ms is a deliberate stroke and well
      // clear of the drift at the end of a slow drag. Distance OR speed, so
      // the careful dragger and the quick flicker both get the same result.
      if (live && (travel >= 48 || (travel >= 20 && velocity > 0.5))) {
        setOpen(false);
        // Not `focus()`. Escape returns focus because a keyboard user has
        // nowhere else to be; a thumb does not want the disclosure outlined
        // after a swipe it made with its eyes on the page.
        buttonRef.current?.blur();
      }
      set(0);
      live = false;
    };

    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchmove", onMove, { passive: false });
    el.addEventListener("touchend", onEnd, { passive: true });
    el.addEventListener("touchcancel", onEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove", onMove);
      el.removeEventListener("touchend", onEnd);
      el.removeEventListener("touchcancel", onEnd);
    };
  }, [open]);

  return (
    // The hairline is a shadow, not a border, for the same reason the rail's
    // is: a border lives inside the border box and would eat a pixel of the
    // declared height, making the token a near-miss rather than the number.
    // The bottom corners round only while the panel is open. Closed this is a
    // bar, and a bar has square corners; open it is a sheet that has come down
    // over the page, and the curve is what says so.
    <header
      className={[
        "sticky top-0 z-50 bg-surface-raised shadow-[0_1px_0_var(--border-subtle)]",
        "transition-[border-radius] duration-[240ms] ease-[var(--ease-out-quart)] motion-reduce:transition-none",
        // The breakpoint half is not belt-and-braces. `open` is panel state and
        // the panel only exists below 1280, but the state survives a resize:
        // open the menu on a phone, rotate or widen past the breakpoint, and
        // the panel hides while `open` stays true — leaving a rounded-bottom
        // bar above a rail, with nothing hanging off it for the curve to
        // belong to. Measured at 1440 after opening at 390: radius 16px, panel
        // gone, rail up.
        //
        // Scoping the class to the widths the panel exists at is the fix that
        // cannot drift, because it is the same condition that governs the
        // panel itself rather than a second copy of it in JavaScript.
        open ? "rounded-b-[16px] min-[1280px]:rounded-b-none" : "",
      ].join(" ")}
    >
      {/* Full bleed, with a flat 24px inset — not the Container.
       
          The Container caps at 84rem and spends up to 64px on gutters, which
          at 1440 put the mark 112px in from the left while the nav icons sat
          at 24. Two left edges that disagree by 88px, one directly above the
          other. A banner is chrome: it belongs to the window, not to the text
          column, so it takes the window's edges.
       
          24 is the rail's own left edge, so the mark and the icons beneath it
          now share one line down the whole page. The right side is the mirror
          of it. */}
      {/* 24 below 1280, 36 from there up, and the breakpoint is the reason the
          36 exists at all: the rail's nav icons sit at 36 — its own 24 of
          padding plus the selected pill's 12 — so at those widths the mark in
          the banner and the icons beneath it share a left edge. Below 1280
          there is no rail, so the extra 12 aligns with nothing and costs a
          phone 24px of its 390. The inset follows the thing it was measured
          against rather than being a constant that happens to be right once. */}
      <div className="px-6 min-[1280px]:px-9">
        <div className="flex h-[var(--banner-height)] items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 text-sm font-medium text-text-primary">
            {/* 40 x 30. The mark's natural aspect is 4:3 and its ink fills the
                box edge to edge, so the width is the dimension that reads as
                "the logo size" and the height follows from it. Was 48 x 36 in
                a 72px bar; this keeps roughly the same air above and below it
                (17px against 18px) in a bar that is 8px shorter. */}
            <Logo className="h-[30px] w-10 shrink-0" />
            {/* Hidden below 390px, where the name plus the mark plus the
                disclosure do not fit one row. The mark is the identity at that
                size; the name is in the footer of every page. */}
            <span className="hidden whitespace-nowrap min-[390px]:inline">
              Alejandro Magno Fernandini
            </span>
          </Link>

          <div className="flex items-center gap-2">
            {/* In the banner from 640 up, where it fits beside the name, and in
                the disclosure panel below that. At 390 the name, the mark, the
                three chips and the hamburger come to 419px against 342px of
                room, and the thing that would have to give is the name. */}
            {/* -mr-1.5 is the same optical correction the disclosure carries:
                the 32px chip sits 6px inside its 44px target, so the box has
                to overhang by exactly that for the chip's edge to land on the
                24px line the mark starts from. The hit area overhangs into the
                gutter, invisibly, which is what hit areas are for. */}
            <div className="-mr-1.5 hidden sm:block">
              <ThemeToggle />
            </div>

            <button
              ref={buttonRef}
              type="button"
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
              // The same construction as the theme chips beside it: a 32px chip
              // you can see inside a 44px target you hit. -mr-1.5 puts the
              // chip's own right edge on the container's inner edge, mirroring
              // the mark's 24px inset at the other end.
              // The ground goes on the 32px chip, not the 44px target, so the
              // hover is the same size as every other chip state in the
              // header. The 44 is the hit area and stays invisible.
              className="group -mr-1.5 grid h-11 w-11 place-items-center min-[1280px]:hidden"
            >
              <span className="grid h-8 w-8 place-items-center rounded-sm text-text-secondary transition-colors duration-[160ms] group-hover:bg-surface-sunken group-hover:text-text-primary">
                <MenuIcon open={open} />
              </span>
            </button>
          </div>
        </div>

        {/* Always rendered, because `aria-controls` has to point at an element
            that exists.

            It used to be toggled with the `hidden` attribute, which sets
            `display: none` — correct for the accessibility tree and fatal to
            any transition, because there is no height for the panel to animate
            from. `inert` does the same two jobs `hidden` was there for, taking
            the panel out of the tab order and out of the accessibility tree,
            while leaving it laid out and therefore animatable.

            The motion is a grid row from 0fr to 1fr rather than a height from
            0 to auto, because `auto` is not a value a transition can
            interpolate toward. The row is the thing that animates; the child
            clips. `overflow-hidden` on that child is not decoration either —
            it is what sets the grid item's automatic minimum size to zero, and
            without it the row refuses to collapse at all.

            So the panel rolls down out of the bar and rolls back up into it,
            which is also the direction the two lines of the disclosure travel
            as they cross. */}
        <div
          id="site-menu"
          ref={panelRef}
          inert={!open}
          className={[
            "grid min-[1280px]:hidden",
            "transition-[grid-template-rows] duration-[240ms] ease-[var(--ease-out-quart)]",
            "motion-reduce:transition-none",
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
          ].join(" ")}
        >
          <div className="overflow-hidden">
            <div
              // No rule between the bar and the panel. It was there to separate
              // the identity from the navigation, and the tiles below do that
              // on their own now — four drawn edges are more than enough
              // structure for one small sheet, and a rule on top of them was
              // simply a ninth horizontal line. The header's own bottom
              // hairline still separates the whole panel from the page, which
              // is the boundary that actually needs stating.
              className="pb-4 pt-1 transition-transform duration-[240ms] ease-[var(--ease-out-quart)] motion-reduce:transition-none"
              // Zero duration while the finger is down, so the panel tracks it
              // one to one; the class's 240ms comes back the moment the drag
              // resets, which is what animates the spring back. Driving this
              // from the inline duration rather than by swapping the class
              // keeps the transition property on the element the whole time,
              // so there is no frame where the browser has a new transform and
              // no rule telling it to animate.
              style={{
                transform: drag ? `translateY(${drag}px)` : undefined,
                transitionDuration: drag ? "0s" : undefined,
              }}
            >
              {/* No sliding indicator in here. The panel is built and destroyed
                  on every open, so there is nothing for a mark to travel from. */}
              <NavList variant="grid" />
              {/* Bottom right, mirroring the disclosure directly above it
                  rather than the nav icons to its left. -mr-1.5 is the same 6px
                  the hamburger carries: it puts the 32px chip's own right edge
                  on the container's inner edge, so chip and hamburger share a
                  right line the way the nav icons and the mark share a left
                  one. The 44px targets overhang into the gutter, invisibly,
                  which is what hit areas are for. */}
              <div className="mt-4 -mr-1.5 flex justify-end sm:hidden">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

/**
 * The rail, 1280px and up. Navigation, and nothing else.
 *
 * 240px, and the number is measured rather than chosen: 24 of padding, a 24px
 * icon, a 12px gap, the 120px "Design system" label and 24 of padding come to
 * 204, and the remaining 36 is slack for the fallback mono that paints before
 * JetBrains loads. At 1280 that leaves a 1040px column, 912px of it inside the
 * container's gutters, so prose still sets at the full 900px measure. The
 * 300px version left 852.
 *
 * Everything sits on 24, in both states, and nothing moves when the rail
 * collapses. That is possible only because the rail now holds one kind of
 * object. While the mark and the theme chips lived here too, the rail held
 * four different widths on one left edge and had to choose between a ragged
 * right edge and an alignment switch that slid every object sideways.
 *
 * Collapsed is 88.8px: 24 of padding, 12 of pill padding, the icon's 16.8px
 * of ink, and the same 12 and 24 back out again. Sized by the INK rather than
 * by the 24px box around it, which is what lets the icons hold one position
 * in both states instead of sliding 3.6px on every toggle. See the note on
 * the icon wrapper in NavList for why that is the number.
 *
 * Fixed rather than sticky. A sticky rail is only pinned while its parent is
 * in view, which on a long page means it leaves at the footer. It starts below
 * the banner, from the banner's own token.
 */
function Rail() {
  // The attribute on <html> is the single source of truth — the inline script
  // sets it before first paint and the `rail-collapsed:` variant reads it — so
  // this subscribes to it rather than keeping a second copy in React state.
  //
  // It was `useState` plus a `useLayoutEffect` that copied the attribute in.
  // That is two values for one fact, and it made the server and the first
  // client render disagree about `aria-label`, which needed suppressing.
  // useSyncExternalStore has a server snapshot, so hydration matches and the
  // real value arrives on the next render with nothing suppressed.
  const collapsed = useSyncExternalStore(
    (onChange) => {
      const mo = new MutationObserver(onChange);
      mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-rail"] });
      return () => mo.disconnect();
    },
    () => document.documentElement.getAttribute("data-rail") === "collapsed",
    () => false,
  );

  function toggle() {
    const root = document.documentElement;
    const next = root.getAttribute("data-rail") !== "collapsed";
    if (next) root.setAttribute("data-rail", "collapsed");
    else root.removeAttribute("data-rail");
    try {
      if (next) localStorage.setItem(RAIL_STORAGE_KEY, "collapsed");
      else localStorage.removeItem(RAIL_STORAGE_KEY);
    } catch {
      /* blocked storage: the rail still collapses for this session */
    }
  }

  return (
    <div
      className={[
        "fixed bottom-0 left-0 z-40 hidden w-[var(--rail-width)] flex-col",
        // 24 on top, matching the horizontal inset, so the first nav row sits the
        // same distance from the banner above it as it does from the rail's own
        // left edge. 40 at the bottom, which is the caret's air rather than the
        // nav's: it is the only thing down there and it reads as cramped on the
        // rail's own edge.
        "top-[var(--banner-height)] px-6 pt-6 pb-10 min-[1280px]:flex",
        "bg-surface-raised shadow-[1px_0_0_var(--border-subtle)]",
        // The one transition. Collapsing is a 136px change to the whole page,
        // and instant is not restraint at that size, it is a jump cut.
        "transition-[width] duration-[240ms] ease-[var(--ease-out-quart)] motion-reduce:transition-none",
      ].join(" ")}
    >
      {/* A <div>, not a <header>, and not a second <nav> landmark either. The
          NavList inside already carries nav[aria-label="Main"]; wrapping it in
          a banner landmark as well would announce the same four links as two
          nested regions. It was a <header> only because it used to hold a logo
          and a theme control that would otherwise have sat outside every
          landmark, which axe reported as `region` on every page. Those are in
          the banner now, so the reason is gone. */}
      <div id="rail-nav">
        <NavList collapsible />
      </div>

      {/* Bottom left, on the same 24px edge as the icons, in both states — so
          nothing in this rail moves when it collapses. It sat on the right
          edge while the rail had an identity to stay clear of; a right-anchored
          control has to move when the right edge moves, which is exactly the
          drift that made the old version feel unsettled. */}
      <button
        type="button"
        onClick={toggle}
        // No `aria-expanded`. The same four links are in the accessibility
        // tree at both widths with the same names, so nothing is disclosed.
        // A disclosure that discloses nothing is a promise to a screen reader
        // that the interaction does not keep.
        aria-controls="rail-nav"
        aria-label={collapsed ? "Expand navigation" : "Collapse navigation"}
        title={collapsed ? "Expand navigation" : "Collapse navigation"}
        // Built to the nav row's spec, not to its own. It was a 32x32 chip at
        // `ml-2` sitting under four 48x40 rows at `px-3`, which is four
        // differences at once: a different height, a different width, a
        // different left edge and a different sized hover ground. Collapsed,
        // where the rail is nothing but a column of five icons, that reads
        // immediately — the one at the bottom is visibly a smaller object.
        //
        // Now it is the same cell: `min-h-10` for the 40px height, `px-3` for
        // the 12px padding, the same `rounded-sm`, and the same icon span with
        // the same optical offset. Collapsed it comes out 40.8x40, identical
        // to a nav row, and its hover ground is the same object in the same
        // place.
        //
        // `self-start` rather than stretching to the rail's width. A nav row
        // is full width because it carries a label; this one does not, and a
        // 192px hover ground for a 24px glyph is a target out of all
        // proportion to the control. Every property a row and this share is
        // shared; the one they do not is the one with a reason.
        //
        // The glyphs align on their CENTRES rather than their left edges, and
        // that is correct rather than a compromise. The four nav icons are all
        // drawn to ink x3-17; a chevron drawn that wide would be a squat arrow
        // rather than a chevron, so it keeps its narrower 6.5-13. Both sit
        // centred in the same 24px box, so the centres land within 0.3px of
        // each other, which is what the eye reads down a column of mixed glyph
        // widths.
        // `w-[var(--rail-cell)]` — one fixed width, the same 40.8 a nav row
        // collapses to, and emphatically NOT `self-stretch`.
        //
        // Stretch was the obvious way to make the collapsed button match a
        // collapsed row, and it was wrong in a way that only shows in motion.
        // `data-rail` flips in a single frame but the rail WIDTH is animated
        // over 240ms, so a stretched child adopts the rail's width instantly
        // and then rides it down: measured, the button jumped from 44.4 to 192
        // in one frame and shrank from there. A 4.3x flash on every collapse,
        // invisible in any static screenshot and obvious the moment anyone
        // clicks it.
        //
        // A fixed width settles that and the expanded asymmetry together.
        // Content-sized, the button was 44.4 because the icon's -3.6px optical
        // offset comes out of the layout as well as the paint, leaving the
        // glyph 8.41 from the left edge and 12 from the right. At a stated
        // 40.8 the ground is symmetric about the ink in both states, and
        // nothing about it depends on the rail, so nothing can animate.
        className="group mt-auto flex min-h-10 w-[var(--rail-cell)] self-start items-center rounded-sm px-3 text-text-tertiary transition-colors duration-[160ms] hover:bg-surface-page hover:text-text-secondary"
      >
        <span className="-ml-[3.6px] grid h-6 w-6 shrink-0 place-items-center">
          <ChevronIcon />
        </span>
      </button>
    </div>
  );
}

export function SiteHeader() {
  return (
    <>
      <Banner />
      <Rail />
    </>
  );
}
