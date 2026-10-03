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
  rowClassName = "min-h-10",
  collapsible = false,
}: {
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
  /** Row height. 40px in the rail, where the pointer is precise and nothing is
   *  tapped; 44px in the phone panel, which is the platform figure on both
   *  mobile OSes and is not a style choice. */
  rowClassName?: string;
}) {
  const currentHref = useCurrentHref();
  return (
    <nav aria-label="Main">
      <ul className="relative flex flex-col gap-1">
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
                  "group flex items-center gap-3 rounded-sm px-3 transition-colors duration-[160ms]",
                  rowClassName,
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
                <span className="grid h-6 w-6 shrink-0 place-items-center">
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
 * 304px rail for one frame and then watches the whole page jump 232px left.
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
      <path d="M13 3.5L6.5 10l6.5 6.5" />
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
 * is the 120px "Design system" label, which is why the rail is now 216 and why
 * prose sets at the full documented 900px measure at 1280 rather than 852.
 *
 * It costs the thing the rail was originally built to buy: content no longer
 * begins at the top of the viewport. 72px off every page, permanently. Taken
 * knowingly, because an identity that moves and resizes when a navigation
 * preference changes was the worse problem.
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

  return (
    // The hairline is a shadow, not a border, for the same reason the rail's
    // is: a border lives inside the border box and would eat a pixel of the
    // declared height, making the token a near-miss rather than the number.
    <header className="sticky top-0 z-50 bg-surface-raised shadow-[0_1px_0_var(--border-subtle)]">
      {/* Full bleed, with a flat 24px inset — not the Container.
       
          The Container caps at 84rem and spends up to 64px on gutters, which
          at 1440 put the mark 112px in from the left while the nav icons sat
          at 24. Two left edges that disagree by 88px, one directly above the
          other. A banner is chrome: it belongs to the window, not to the text
          column, so it takes the window's edges.
       
          24 is the rail's own left edge, so the mark and the icons beneath it
          now share one line down the whole page. The right side is the mirror
          of it. */}
      {/* 36, not 24. Twelve more on each side by request, and it lands
          somewhere useful: the rail's nav icons sit at 36 too — the rail's own
          24 of padding plus the selected pill's 12 — so the mark in the banner
          and the icons beneath it share a left edge again, which they lost when
          the row became a contained pill. */}
      <div className="px-9">
        <div className="flex h-[var(--banner-height)] items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 text-sm font-medium text-text-primary">
            <Logo className="h-9 w-12 shrink-0" />
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

        {/* Always rendered, toggled with `hidden`, because `aria-controls` has
            to point at an element that exists. The attribute also takes it out
            of the accessibility tree and out of the tab order when closed. */}
        <div
          id="site-menu"
          hidden={!open}
          className="border-t border-border-subtle py-4 min-[1280px]:hidden"
        >
          {/* No sliding indicator in here. The panel is built and destroyed on
              every open, so there is nothing for a mark to travel from. */}
          <NavList rowClassName="min-h-11" />
          <div className="mt-4 -ml-1.5 sm:hidden">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}

/**
 * The rail, 1280px and up. Navigation, and nothing else.
 *
 * 216px, and the number is measured rather than chosen: 24 of padding, a 24px
 * icon, a 12px gap, the 120px "Design system" label, 24 of padding, and 12 of
 * slack for the fallback mono that paints before JetBrains loads. At 1280 that
 * leaves a 1064px column, 936px of it inside the container's gutters, so prose
 * sets at the full 900px measure. The 300px version left 852.
 *
 * Everything sits on 24, in both states, and nothing moves when the rail
 * collapses. That is possible only because the rail now holds one kind of
 * object. While the mark and the theme chips lived here too, the rail held
 * four different widths on one left edge and had to choose between a ragged
 * right edge and an alignment switch that slid every object sideways.
 *
 * Collapsed is 80px: 24 + 32 + 24, sized by the collapse control rather than
 * by the 24px icons, because the control is the widest thing left.
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
        // The same hover as a nav row: `surface-page` for the ground and
        // `text-secondary` for the glyph. It used `interactive-subtle`, the
        // blue tint, which made the one control in this rail that is not
        // navigation respond more loudly than the four that are.
        className="mt-auto ml-2 grid h-8 w-8 place-items-center rounded-sm text-text-tertiary transition-colors duration-[160ms] hover:bg-surface-page hover:text-text-secondary"
      >
        <ChevronIcon />
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
