import { Container } from "@/design-system/primitives/Container";
import { Button } from "@/design-system/components/Button";
import { GitHubIcon, LinkedInIcon, Mail, TexasIcon } from "@/design-system/components/Icon";

const elsewhere = [
  { href: "https://www.linkedin.com/in/alejandro-m-fernandini", label: "LinkedIn", Icon: LinkedInIcon },
  { href: "https://github.com/magnocreative", label: "GitHub", Icon: GitHubIcon },
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

          {/* Tertiary buttons with each site's mark (Alejandro, November
              2026): the email is the secondary action, these are the other
              places to find him, one step quieter. They were uppercase links
              in the header's style; as buttons they share the email's
              vocabulary, so the row reads as one set of actions in two
              volumes. Labelled as well as marked: two words cost nothing, and
              an icon-only link needs a hidden name and a bigger target.
              Tighter padding than the default, pulled out by the same amount,
              so the text meets the container's edge on both sides. Centered on
              the 40px email button on wide screens. Not full width on a phone:
              two short links sit side by side. */}
          <nav aria-label="Elsewhere">
            <ul className="-mx-3 flex gap-2">
              {elsewhere.map(({ href, label, Icon }) => (
                <li key={label}>
                  <Button href={href} variant="tertiary" fillOnPhone={false} iconBefore={<Icon />} iconSize="lg" className="px-3!">
                    {label}
                  </Button>
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
