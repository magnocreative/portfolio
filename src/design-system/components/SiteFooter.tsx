import Link from "next/link";
import { Container } from "@/design-system/primitives/Container";

const elsewhere = [
  { href: "mailto:alejandini@gmail.com", label: "Email" },
  { href: "https://www.linkedin.com/in/alejandro-m-fernandini", label: "LinkedIn" },
  { href: "https://github.com/magnocreative", label: "GitHub" },
];

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-border-subtle">
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

          <ul className="flex gap-6">
            {elsewhere.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="font-mono text-2xs font-medium uppercase tracking-[0.11em] text-text-tertiary transition-colors duration-[160ms] hover:text-text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-2 border-t border-border-subtle py-6 font-mono text-2xs text-text-tertiary sm:flex-row sm:justify-between">
          <div>Prosper, Texas</div>
          <div>Built from scratch. The design system is open, and you can read it on GitHub.</div>
        </div>
      </Container>
    </footer>
  );
}
