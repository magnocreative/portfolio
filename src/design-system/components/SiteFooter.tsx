import Link from "next/link";
import { Container } from "@/design-system/primitives/Container";

const elsewhere = [
  { href: "mailto:alejandini@gmail.com", label: "Email" },
  { href: "https://www.linkedin.com/in/alejandro-m-fernandini", label: "LinkedIn" },
  { href: "https://github.com/magnocreative", label: "GitHub" },
];

export function SiteFooter() {
  return (
    // The same construction as the header: an opaque raised ground with a
    // single hairline facing the page. The two of them bookend the document —
    // the page is the sheet, these are the edges of it — and before this the
    // footer sat on the page ground and simply trailed off, which made the end
    // of the site feel like a page that had run out rather than one that had
    // finished.
    <footer className="mt-32 border-t border-border-subtle bg-surface-raised">
      <Container>
        <div className="flex flex-col gap-8 py-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="font-display text-xl tracking-[-0.01em] text-text-primary">
              Looking for someone who owns the system, not just the screens?
            </div>
            <a
              href="mailto:alejandini@gmail.com"
              className="mt-3 inline-block text-base text-text-accent underline decoration-border-strong underline-offset-4 transition-colors duration-[160ms] hover:text-interactive-hover hover:decoration-current"
            >
              alejandini@gmail.com
            </a>
          </div>

          {/* Wrapped in a nav and set at the header's link color rather than
              the tertiary these used to carry. Two reasons, and the second is
              the real one: matching the header is the point, but tertiary is
              the mono METADATA color — dates, disciplines, the line about
              the location line below. These are links to somewhere else, and a link
              wearing the metadata color tells a reader it is a fact rather
              than a door.

              No `border-b-2` here, which the header links do carry. That
              border exists there to reserve the two pixels the current-page
              rule occupies, so nothing shifts when the section changes. These
              go off-site and can never be current, so reserving space for a
              state that cannot happen would be cargo cult. */}
          <nav aria-label="Elsewhere">
            <ul className="flex gap-6">
              {elsewhere.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="font-mono text-xs font-medium uppercase tracking-[0.11em] text-text-secondary transition-colors duration-[160ms] hover:text-text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-2 border-t border-border-subtle py-6 font-mono text-xs text-text-tertiary sm:flex-row sm:justify-between">
          <div>Dallas–Fort Worth, Texas</div>
          <div>Built from scratch. The design system is open, and you can read it on GitHub.</div>
        </div>
      </Container>
    </footer>
  );
}
