import type { Metadata } from "next";
import { Container } from "@/design-system/primitives/Container";
import { PageHeader } from "@/design-system/components/PageHeader";
import { PasswordGate } from "@/design-system/components/PasswordGate";
import { homeHero } from "@/content/home";
import { email } from "@/content/resume";

/**
 * What the proxy (src/proxy.ts) answers with while the site is
 * password-protected, under whatever address was asked for. Behind the card,
 * the opening of the home page and nothing further in: the blur is for
 * atmosphere, not secrecy, because anything rendered here is in the page's
 * source. The case studies, the résumé and every image stay on the far side
 * of the password.
 */
export const metadata: Metadata = {
  title: "Welcome",
  robots: { index: false, follow: false },
};

export default function GatePage() {
  return (
    <>
      <main aria-hidden="true">
        <Container>
          <PageHeader type="hero" {...homeHero} />
        </Container>
      </main>
      <PasswordGate
        contactHref={`mailto:${email}?subject=${encodeURIComponent("Password for magnocreative.com")}`}
      />
    </>
  );
}
