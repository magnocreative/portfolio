import Link from "next/link";
import { Container } from "@/design-system/primitives/Container";
import { Button } from "@/design-system/components/Button";
import { Mail, TexasIcon } from "@/design-system/components/Icon";

const elsewhere = [
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
    // 32px above it on a phone and 128 from 640 up. On a phone the page has
    // already been one long column for several screens; another 128px of empty
    // ground before the footer read as the page having stopped early rather
    // than finished.
    <footer className="mt-8 border-t border-border-subtle bg-surface-raised sm:mt-32">
      <Container>
        <div className="flex flex-col gap-8 py-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="font-display text-xl tracking-[-0.01em] text-text-primary">
              Looking for someone who owns the system, not just the screens?
            </div>
            {/* The closing call to action, so it is drawn as one: a
                secondary button, the same as Email in the résumé header
                (Alejandro, November 2026). It keeps the address as its label
                rather than "Email me", because people copy it, and a mailto
                link does nothing on a machine with no mail app. It was an
                underlined link beside an EMAIL link in the row on the right
                that went to the same place; that one is gone. Full width on a
                phone, like every action there. */}
            <Button
              href="mailto:alejandini@gmail.com"
              variant="secondary"
              iconBefore={<Mail />}
              className="mt-5"
            >
              alejandini@gmail.com
            </Button>
          </div>

          {/* Wrapped in a nav and set at the header's link color rather than
              the tertiary these used to carry. Two reasons, and the second is
              the real one: matching the header is the point, but tertiary is
              the METADATA color — dates, disciplines, the line about
              the location line below. These are links to somewhere else, and a link
              wearing the metadata color tells a reader it is a fact rather
              than a door.

              No `border-b-2` here, which the header links do carry. That
              border exists there to reserve the two pixels the current-page
              rule occupies, so nothing shifts when the section changes. These
              go off-site and can never be current, so reserving space for a
              state that cannot happen would be cargo cult. */}
          {/* 10px up from the bottom on wide screens: the row aligns bottoms,
              and the links are one 20px line beside a 40px button, so this
              centers them on it instead of sitting them on its lower edge. */}
          <nav aria-label="Elsewhere" className="sm:pb-2.5">
            <ul className="flex gap-6">
              {elsewhere.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="font-label text-xs font-medium uppercase tracking-[0.11em] text-text-secondary transition-colors duration-[160ms] hover:text-text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-2 border-t border-border-subtle py-6 font-label text-xs text-text-tertiary sm:flex-row sm:justify-between">
          <div className="inline-flex items-center gap-1.5">
            <TexasIcon className="h-5 w-5 shrink-0" />
            Dallas–Fort Worth, Texas
          </div>
          <div>Built from scratch. The design system is open, and you can read it on GitHub.</div>
        </div>
      </Container>
    </footer>
  );
}
