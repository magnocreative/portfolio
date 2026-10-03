"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Container } from "@/design-system/primitives/Container";
import { ThemeToggle } from "@/design-system/components/ThemeToggle";
import { Logo } from "@/design-system/brand/Logo";

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
  { href: "/work", label: "Work" },
  { href: "/system", label: "Design system" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Résumé" },
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
  animated = true,
  rowClassName = "min-h-10",
}: {
  animated?: boolean;
  /** Row height. 40px in the rail, where the pointer is precise and nothing is
   *  tapped; 44px in the phone panel, which is the platform figure on both
   *  mobile OSes and is not a style choice. */
  rowClassName?: string;
}) {
  const currentHref = useCurrentHref();
  const listRef = useRef<HTMLUListElement>(null);
  const [marker, setMarker] = useState<{ top: number; height: number } | null>(null);

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list || currentHref == null) {
      setMarker(null);
      return;
    }
    const el = list.querySelector<HTMLElement>(`[data-href="${currentHref}"]`);
    if (!el) {
      setMarker(null);
      return;
    }
    const measure = () => setMarker({ top: el.offsetTop, height: el.offsetHeight });
    measure();

    // Fonts land after first paint and change the height of a wrapped label,
    // so the first measurement can be of a box that no longer exists. A
    // ResizeObserver catches that, and every later reflow with it.
    const ro = new ResizeObserver(measure);
    ro.observe(list);
    return () => ro.disconnect();
  }, [currentHref]);

  return (
    <nav aria-label="Main">
      {/* The labels sit on the same left edge as the mark and the name, and the
          indicator lives in the rail's 24px gutter rather than pushing the
          text off that edge. It was the other way round — `pl-5` on every link
          to clear a `left-0` indicator — which put the labels 20px right of
          the logo: close enough to look like alignment that failed rather than
          an indent that was chosen. A marker in the margin is the older and
          better pattern anyway; the text column stays a text column. */}
      <ul ref={listRef} className="relative flex flex-col gap-1">
        {/* Hidden from assistive tech: a second rendering of a state that
            `aria-current` already announces on the link. Announcing position
            twice is worse than not announcing it at all. */}
        {marker && (
          <span
            aria-hidden="true"
            className={`absolute -left-3 w-0.5 rounded-full bg-interactive ${
              animated
                ? "transition-all duration-[240ms] ease-[var(--ease-out-quart)] motion-reduce:transition-none"
                : ""
            }`}
            style={{ transform: `translateY(${marker.top}px)`, height: marker.height }}
          />
        )}

        {nav.map((item) => {
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
                className={`group flex items-center ${rowClassName}`}
              >
                <span
                  className={`font-mono text-xs font-medium uppercase tracking-[0.11em] transition-colors duration-[160ms] ${
                    current
                      ? "text-text-primary"
                      : "text-text-secondary group-hover:text-text-primary"
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
      <path d="M12 5l-5 5 5 5" />
    </svg>
  );
}

/** Two lines, becoming a cross when the panel is open. A control that gives no
 *  sign of its own state is the thing this site criticises everywhere else;
 *  `aria-expanded` says it to a screen reader and this says it to everyone. */
function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
      className="h-5 w-5"
    >
      {open ? <path d="M5 5l10 10M15 5L5 15" /> : <path d="M3 7h14M3 13h14" />}
    </svg>
  );
}

/**
 * The bar, below 1280px: identity on the left, one disclosure flush right.
 *
 * This replaced four links laid out in the bar itself. At 320 and 360 they
 * needed two rows, which with 44px targets made the header 157px — a quarter
 * of a phone viewport, permanently, before any content. Behind a disclosure
 * the header is one row at every width.
 *
 * It is worth naming what this gives up. This site argues against hiding
 * content behind a click, and that is why Tabs are off the case studies and
 * why the component gallery is in page flow. Navigation chrome is the one
 * place the argument does not hold: a nav is not the argument, it is the way
 * to the argument, and a reader who wants it knows to look for it. The rail
 * above 1280 hides nothing at all.
 */
function Bar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close on navigation, or the panel sits open over the page it just left.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

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
    <header className="sticky top-0 z-50 border-b border-border-subtle bg-surface-raised min-[1280px]:hidden">
      <Container>
        <div className="flex items-center justify-between gap-4 py-3">
          {/* overflow-hidden is a guard, not styling. The rail is 300px and the
          identity needs 296, so Inter clears the padding by 4px — and the
          fallback that paints before Inter is about 7px wider than Inter, so
          for one frame on a cold load the name would otherwise print across
          the border. Clipped, that frame costs a hair off the last letter.
          An outline is not clipped by overflow, so focus is unaffected. */}
      <Link
        href="/"
        className="flex items-center gap-3 overflow-hidden text-sm font-medium text-text-primary"
      >
            <Logo className="h-8 w-[43px]" />
            {/* Hidden below 390px, where the name plus the mark plus the
                disclosure do not fit one row. The mark is the identity at that
                size; the name is in the footer of every page. */}
            <span className="hidden whitespace-nowrap min-[390px]:inline">
              Alejandro Magno Fernandini
            </span>
          </Link>

          <button
            ref={buttonRef}
            type="button"
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="grid h-11 w-11 place-items-center rounded-sm text-text-secondary transition-colors duration-[160ms] hover:bg-interactive-subtle hover:text-text-primary"
          >
            <MenuIcon open={open} />
          </button>
        </div>

        {/* Always rendered, toggled with `hidden`, because `aria-controls` has
            to point at an element that exists. The attribute also takes it out
            of the accessibility tree and out of the tab order when closed,
            which conditional rendering would do too but at the cost of a
            dangling reference. */}
        <div id="site-menu" hidden={!open} className="border-t border-border-subtle py-4">
          {/* No sliding indicator in here. The panel is built and destroyed on
              every open, so there is nothing for a mark to travel from. */}
          <NavList animated={false} rowClassName="min-h-11" />
          {/* -ml-1.5 for the same optical reason as the rail: at touch
              density the 32px chip sits 6px inside its 44px button, so the box
              has to start 6px left of the text edge for the chip to land on
              it. This was pl-5, matching the old nav indent that no longer
              exists. */}
          <div className="mt-4 -ml-1.5">
            <ThemeToggle />
          </div>
        </div>
      </Container>
    </header>
  );
}

/**
 * The rail, 1280px and up.
 *
 * 1280 is arithmetic rather than taste. The measure this site sets
 * single-column text to is 900px, the container spends 128px on its own
 * gutters, so the content column needs 1028px. Add the 300px rail and the
 * first viewport that clears it is 1328, which makes the measure 852px at
 * exactly 1280 and the full 900 from 1328 up.
 *
 * The breakpoint stayed at 1280 rather than moving up to 1328 with the rail.
 * 1280 is a real population — it is the default scaled width of a 13" laptop —
 * and trading the rail away on those screens to recover 48px of measure is the
 * worse half of that bargain. Collapsing the rail recovers the full 900 at any
 * width, which is most of why the collapse exists.
 *
 * 1100 was tried first and measured: it left 732px of text, which is the whole
 * /system decisions argument squeezed under its own documented measure by a
 * nav meant to be an improvement.
 *
 * A <header>, not a <div>. As a div its logo link and theme control sat
 * outside every landmark, which axe reports as `region` on every page. Two
 * <header> elements exist in this file but never at once: each is display:none
 * at the other's width.
 *
 * Fixed rather than sticky. A sticky rail is only pinned while its parent is
 * in view, which on a long page means it leaves at the footer.
 */
function Rail() {
  // State exists for exactly one thing: `aria-expanded`, which has to be a
  // real attribute and cannot be expressed in CSS. Everything visible is
  // driven by [data-rail] on <html> through the `rail-collapsed:` variant, so
  // there is no second copy of the truth to fall out of step, and the stored
  // state is already applied by the time React hydrates.
  const [collapsed, setCollapsed] = useState(false);

  useLayoutEffect(() => {
    setCollapsed(document.documentElement.getAttribute("data-rail") === "collapsed");
  }, []);

  function toggle() {
    const next = !collapsed;
    setCollapsed(next);
    const root = document.documentElement;
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
    <header
      className={[
        "fixed inset-y-0 left-0 z-50 hidden w-[var(--rail-width)] flex-col",
        "border-r border-border-subtle bg-surface-raised py-10 min-[1280px]:flex",
        // 24px of padding expanded, 12px collapsed. The collapsed figure is
        // what centers a 48px mark in a 72px rail; at 24 the mark would not
        // fit at all.
        "px-6 rail-collapsed:items-center rail-collapsed:px-3",
        // The one transition here. Collapsing is a 232px change to the whole
        // page, and instant is not restraint at that size, it is a jump cut.
        "transition-[width] duration-[240ms] ease-[var(--ease-out-quart)] motion-reduce:transition-none",
      ].join(" ")}
    >
      {/* overflow-hidden is a guard, not styling. The rail is 300px and the
          identity needs 296, so Inter clears the padding by 4px — and the
          fallback that paints before Inter is about 7px wider than Inter, so
          for one frame on a cold load the name would otherwise print across
          the border. Clipped, that frame costs a hair off the last letter.
          An outline is not clipped by overflow, so focus is unaffected. */}
      <Link
        href="/"
        className="flex items-center gap-3 overflow-hidden text-sm font-medium text-text-primary"
      >
        {/* An explicit width, not `w-auto`. An SVG with no intrinsic width
            takes its box from the column, so this was 207px wide with a 53px
            mark floating in the middle of it, which is why the mark read as
            adrift rather than placed. `aspect-[]` does not fix it either: the
            ratio is satisfied by the height and the width still resolves to
            auto.

            36 tall is 48 wide at this mark's 270.68:203.36 ratio. It is not
            square, and forcing it to 36x36 would squash it. */}
        <Logo className="h-9 w-12 shrink-0" />
        {/* sr-only when collapsed, not hidden. `hidden` would take the name out
            of the accessibility tree and leave this link named "Magno
            Creative" by the mark's own label alone — a different link, to a
            screen reader, depending on a visual preference. sr-only is also
            out of flow, so it contributes nothing to the flex gap. */}
        <span className="whitespace-nowrap rail-collapsed:sr-only">
          Alejandro Magno Fernandini
        </span>
      </Link>

      {/* Close under the identity rather than floating at the optical middle.
          Centered, the four links read as a separate object that happens to
          share a column with the name; tucked under it they read as one block,
          which is what they are. */}
      <div id="rail-nav" className="mt-10 rail-collapsed:hidden">
        <NavList />
      </div>

      {/* mt-auto, so the controls sit on the bottom edge however short the nav
          is, without the nav itself being stretched to reach it. */}
      <div className="mt-auto flex flex-col gap-2 rail-collapsed:items-center">
        <ThemeToggle orientation="vertical" density="pointer" />

        {/* The collapse control sits under the theme stack rather than at the
            top of the rail, because the top of the rail is the identity and
            putting a chrome control beside a name makes the name look like
            part of the chrome. Both bottom controls are 32px boxes on the
            same left edge.

            suppressHydrationWarning is load-bearing and narrow: the server
            cannot know the stored state, so this one attribute legitimately
            differs between the server HTML and the first client render. The
            alternative — not rendering the control until mounted — would mean
            a keyboard user tabbing into a control that appears late. */}
        <button
          type="button"
          onClick={toggle}
          aria-expanded={collapsed ? false : true}
          aria-controls="rail-nav"
          aria-label={collapsed ? "Expand navigation" : "Collapse navigation"}
          title={collapsed ? "Expand navigation" : "Collapse navigation"}
          suppressHydrationWarning
          className="grid h-8 w-8 place-items-center rounded-sm text-text-tertiary transition-colors duration-[160ms] hover:bg-interactive-subtle hover:text-text-primary"
        >
          <ChevronIcon />
        </button>
      </div>
    </header>
  );
}

export function SiteHeader() {
  return (
    <>
      <Bar />
      <Rail />
    </>
  );
}
