import Link from "next/link";
import { Container } from "@/design-system/primitives/Container";
import { ThemeToggle } from "@/design-system/components/ThemeToggle";

const nav = [
  { href: "/work", label: "Work" },
  { href: "/system", label: "System" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-border-subtle">
      <Container>
        {/* Below sm this becomes two rows: identity and theme control on one,
            navigation on the next. Five items plus a control will not fit on a
            390px screen, and a hamburger for four links is theatre. */}
        <div className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:py-5">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/"
              className="flex items-baseline gap-3 text-sm font-medium text-text-primary"
            >
              <span className="font-mono text-xs tracking-[0.02em] text-text-accent">AF</span>
              <span>Alejandro Fernandini</span>
            </Link>
            <div className="sm:hidden">
              <ThemeToggle />
            </div>
          </div>

          <div className="flex items-center gap-7">
            <nav aria-label="Main">
              <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 sm:gap-7">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="font-mono text-2xs uppercase tracking-[0.12em] text-text-secondary transition-colors duration-[160ms] hover:text-text-primary"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/resume"
                    className="font-mono text-2xs uppercase tracking-[0.12em] text-text-accent transition-colors duration-[160ms] hover:text-interactive-hover"
                  >
                    Résumé
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
