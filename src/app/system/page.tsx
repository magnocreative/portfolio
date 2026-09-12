import type { Metadata } from "next";
import { Container, Label } from "@/design-system/primitives/Container";
import { SiteHeader } from "@/design-system/components/SiteHeader";
import { SiteFooter } from "@/design-system/components/SiteFooter";
import { ContrastAudit, type AuditRow } from "@/design-system/components/ContrastAudit";

export const metadata: Metadata = {
  title: "The design system",
  description:
    "The tokens, themes and accessibility model behind this site — three tiers, two neutral ramps, one set of semantic roles, and contrast measured rather than asserted.",
};

const textRoles: AuditRow[] = [
  { token: "--text-primary", note: "Body and headings" },
  { token: "--text-secondary", note: "Standfirsts, supporting copy" },
  { token: "--text-tertiary", note: "Mono metadata — dates, disciplines, labels" },
  { token: "--text-accent", note: "Links and section markers" },
  { token: "--interactive-default", note: "Interactive elements, rules" },
];

const tiers = [
  {
    n: "01",
    name: "Primitives",
    holds: "Raw OKLCH ramps. No meaning attached.",
    who: "Semantic tier only",
  },
  {
    n: "02",
    name: "Semantic",
    holds: "Roles — surface-raised, text-secondary, interactive-hover",
    who: "Components",
  },
  {
    n: "03",
    name: "Component",
    holds: "Per-component overrides aliasing the semantic tier",
    who: "That one component",
  },
];

const decisions = [
  {
    title: "Two ramps, not one inverted",
    body: "Light is paper, a warm cream, the register of a well-set document. Dark is slate, drawn from the logo's own blue, so the mark sits natively in it rather than being placed on top of something unrelated. Most dual-theme sites invert a single palette and end up with one real design and one afterthought. The cost of doing it this way is a second ramp to maintain. The benefit is that both themes are deliberate.",
  },
  {
    title: "Both themes stated in one declaration",
    body: "Every role is written once, as light-dark(paper, slate). Twin light and dark blocks always drift eventually. Someone edits one and forgets the other, and the bug ships because nobody looks at both themes on the same day. Stating them together makes drift structurally impossible rather than a matter of discipline.",
  },
  {
    title: "The switch sets color-scheme, not a class",
    body: "Native form controls, scrollbars and the text caret follow color-scheme. A class-based theme leaves all of them light while the page goes dark — the detail that makes a dark mode feel almost right and never quite.",
  },
  {
    title: "Components never reach past the semantic tier",
    body: "One constraint, and it is the reason the site rethemes by editing two files. It also means no component carries a light branch and a dark branch, which is where most theme bugs actually live.",
  },
  {
    title: "Contrast is measured, not asserted",
    body: "Reading a token back gives you oklch(...), and anything that parses that as RGB produces confident nonsense. So each value is painted to a canvas and the pixel is read. That is not academic: it caught text-tertiary sitting at 3.92:1 in the light theme — under the 4.5:1 its small mono metadata requires — and it looked completely fine to me on screen.",
  },
  {
    title: "Borders are allowed to fail",
    body: "Dividers sit deliberately below 3:1. A hairline that meets text contrast is a heavy black line and the page stops reading as a document. Non-text contrast governs controls and meaningful graphics; a rule between two rows is neither. Knowing which rules do not apply is part of applying them.",
  },
];

export default function SystemPage() {
  return (
    <>
      <SiteHeader />

      <main>
        <Container>
          <section className="pt-24 pb-4 md:pt-32">
            <Label>The design system</Label>
            <h1 className="text-optical mt-8 max-w-[18ch] font-display text-3xl leading-[1.06] tracking-[-0.025em] text-text-primary text-pretty md:text-4xl lg:text-5xl">
              A system you can read, not a claim you have to take on trust.
            </h1>
            <p className="mt-10 max-w-[54ch] text-lg leading-[1.65] text-text-secondary">
              This site runs on the system documented below. Everything here is live — the swatches are the real tokens,
              and the contrast figures are measured in your browser as you read them. Change your device to dark mode
              and every number on this page changes with it.
            </p>
          </section>
        </Container>

        {/* Three tiers */}
        <Container>
          <section className="pt-24" aria-labelledby="tiers">
            <div className="border-b border-border-rule pb-4">
              <Label as="h2" className="!text-text-primary">
                <span id="tiers">Three tiers, in dependency order</span>
              </Label>
            </div>

            <div className="mt-8 max-w-[62ch]">
              <p className="text-base text-text-secondary">
                The order is the whole point. A component that reaches past the semantic tier into a raw value is a
                component that will not follow a retheme, and will not be found until someone notices the wrong grey in
                a screenshot months later.
              </p>
            </div>

            <div className="mt-10">
              {tiers.map((t) => (
                <div
                  key={t.n}
                  className="grid grid-cols-1 gap-x-6 gap-y-2 border-b border-border-subtle py-6 lg:grid-cols-[3rem_10rem_1fr_16rem]"
                >
                  <div className="font-mono text-xs text-text-tertiary">{t.n}</div>
                  <div className="font-display text-xl text-text-primary">{t.name}</div>
                  <div className="text-base text-text-secondary">{t.holds}</div>
                  <div className="font-mono text-xs text-text-tertiary lg:text-right">
                    <span className="lg:hidden">Referenced by: </span>
                    {t.who}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Container>

        {/* Live audit */}
        <Container>
          <section className="pt-24" aria-labelledby="contrast">
            <div className="border-b border-border-rule pb-4">
              <Label as="h2" className="!text-text-primary">
                <span id="contrast">Text roles, measured live</span>
              </Label>
            </div>
            <p className="mt-8 mb-10 max-w-[62ch] text-base text-text-secondary">
              Each token below is painted to a canvas and the resulting pixel read back, then checked against the
              WCAG 2.2 threshold for the size it is actually used at. Small mono metadata is held to 4.5:1, not the 3:1
              large-text allowance, because it is small.
            </p>
            <ContrastAudit rows={textRoles} />
          </section>
        </Container>

        {/* Decisions */}
        <Container>
          <section className="pt-24" aria-labelledby="decisions">
            <div className="border-b border-border-rule pb-4">
              <Label as="h2" className="!text-text-primary">
                <span id="decisions">Decisions, and what each one cost</span>
              </Label>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-2">
              {decisions.map((d) => (
                <div key={d.title}>
                  <h3 className="font-display text-xl leading-[1.25] tracking-[-0.01em] text-text-primary">
                    {d.title}
                  </h3>
                  <p className="mt-3 max-w-[52ch] text-base text-text-secondary">{d.body}</p>
                </div>
              ))}
            </div>
          </section>
        </Container>

        {/* Where to read it */}
        <Container>
          <section className="pt-24">
            <div className="grid grid-cols-1 gap-10 border border-border-rule p-8 md:p-12 lg:grid-cols-[1fr_22rem] lg:items-center lg:gap-20">
              <div>
                <Label className="!text-text-accent">Read the source</Label>
                <h2 className="mt-5 max-w-[26ch] font-display text-3xl leading-[1.2] tracking-[-0.018em] text-text-primary">
                  Every claim on this page is checkable.
                </h2>
                <p className="mt-5 max-w-[52ch] text-base text-text-secondary">
                  The tokens are one file. The components are next to their own stories. Nothing here is a screenshot of
                  work done elsewhere — it is the thing itself, and you are looking at it running.
                </p>
              </div>

              <dl className="font-mono text-xs">
                {[
                  ["tokens", "src/styles/tokens.css"],
                  ["components", "src/design-system/"],
                  ["stories", "npm run storybook"],
                  ["source", "github.com/magnocreative/portfolio"],
                ].map(([k, v], i, arr) => (
                  <div
                    key={k}
                    className={`flex flex-wrap justify-between gap-x-4 gap-y-1 py-3 ${
                      i < arr.length - 1 ? "border-b border-border-subtle" : ""
                    }`}
                  >
                    <dt className="text-text-tertiary">{k}</dt>
                    <dd className="text-text-primary">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>
        </Container>
      </main>

      <SiteFooter />
    </>
  );
}
