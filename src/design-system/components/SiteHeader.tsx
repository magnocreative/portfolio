"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/design-system/primitives/Container";
import { ThemeToggle } from "@/design-system/components/ThemeToggle";
import { Logo } from "@/design-system/brand/Logo";

// Résumé sits in the same list as the rest rather than being appended by hand.
// A second copy of the markup meant every change to a nav link had to be made
// twice, which is how it ended up as the one item that could not show a
// selected state.
//
// It also used to be the one item drawn in the accent blue, as a nudge toward
// the thing a reviewer most wants. That stopped working the moment the nav
// gained a real selected state: the state is blue, so a permanently blue item
// read as permanently current, on every page. Worse, on /resume itself the
// accent branch overrode the current branch, leaving the one item whose
// selected state was weaker than everyone else's.
//
// Color in this nav now means one thing — you are here — and nothing borrows
// it for emphasis. Résumé does not need the help. It is the last item, it is
// named the thing people are looking for, and this site argues for restraint
// everywhere else.
const nav = [
  { href: "/work", label: "Work" },
  { href: "/system", label: "Design system" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Résumé" },
];

export function SiteHeader() {
  const pathname = usePathname();

  // startsWith, not equality, so a case study at /work/some-slug still marks
  // Work as the section you are in. The trailing slash matters: without it
  // /workshop would light up Work too.
  //
  // The null guard is not defensive noise. `usePathname` returns null wherever
  // there is no app router above the component, which is exactly the case in
  // Storybook, and without it the header threw and rendered nothing there. A
  // component that only works inside one tree is one the library cannot show.
  const isCurrent = (href: string) =>
    pathname != null && (pathname === href || pathname.startsWith(`${href}/`));

  return (
    // Sticky, with an opaque ground one step above the page. Not
    // translucent-with-blur:
    // this site is set in a documentation register, and a frosted bar with
    // type sliding under it reads as an app chrome that belongs to a different
    // design. The border is the whole separation it needs.
    <header className="sticky top-0 z-50 border-b border-border-subtle bg-surface-raised">
      <Container>
        {/* Below 820px this becomes two rows: identity and theme control on
            one, navigation on the next. Five items plus a control will not fit
            on a 390px screen, and a hamburger for four links is theatre.
            820 rather than the sm breakpoint because "Design system" is a
            longer label than "System" was: at 768 the nav still fit the row
            but wrapped internally, orphaning Résumé on a line of its own
            beside a half-empty header. Stacking is the honest layout there. */}
        <div className="flex flex-col gap-4 py-4 min-[820px]:flex-row min-[820px]:items-center min-[820px]:justify-between min-[820px]:py-5">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/"
              className="flex items-center gap-3 text-sm font-medium text-text-primary"
            >
              <Logo className="h-[26px] w-auto" />
              <span>Alejandro Magno Fernandini</span>
            </Link>
            <div className="min-[820px]:hidden">
              <ThemeToggle />
            </div>
          </div>

          <div className="flex items-center gap-7">
            <nav aria-label="Main">
              <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 min-[820px]:gap-7">
                {nav.map((item) => {
                  const current = isCurrent(item.href);

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        // aria-current is the actual answer for a screen
                        // reader. The rule below it is the answer for everyone
                        // else, and neither one is doing the other's job.
                        aria-current={current ? "page" : undefined}
                        // The rule is the same signal Tabs uses for a selected
                        // tab: a line under the label, never a fill. Color
                        // alone would not have worked here — hover already
                        // takes a link to text-primary, so a selected item and
                        // a hovered one would have been indistinguishable.
                        //
                        // Every item carries the border at all times and only
                        // the color changes, so nothing shifts by two pixels
                        // when the section changes.
                        className={`border-b-2 pb-1 font-mono text-xs font-medium uppercase tracking-[0.11em] transition-colors duration-[160ms] ${
                          current
                            ? "border-interactive text-text-primary"
                            : "border-transparent text-text-secondary hover:text-text-primary"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div className="hidden min-[820px]:block">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
