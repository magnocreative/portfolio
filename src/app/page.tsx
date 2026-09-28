import { Container, Label } from "@/design-system/primitives/Container";
import { Button } from "@/design-system/components/Button";
import { ArrowRight } from "@/design-system/components/Icon";
import { SiteHeader } from "@/design-system/components/SiteHeader";
import { SiteFooter } from "@/design-system/components/SiteFooter";
import { WorkEntry } from "@/design-system/components/WorkEntry";
import { caseStudies } from "@/content/case-studies";

const systemFacts = [
  { key: "tokens", value: "three tiers" },
  { key: "color", value: "OKLCH ramps" },
  { key: "themes", value: "paper / slate" },
  { key: "contrast", value: "WCAG AA" },
];

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main>
        {/* Hero. The measure is deliberately short — a claim you can read in
            one breath beats a paragraph that hedges it. */}
        <Container>
          <section className="pt-24 pb-4 md:pt-36">
            {/* The title of record, not the functional one. It reads Senior
                everywhere a person describes this work, and it will read
                Senior here the day the promotion lands — but a public page
                carrying a title that employment verification would not return
                is a discrepancy waiting to be found at the worst moment. The
                seniority is argued by the work below it instead. */}
            <Label>Experience Designer · design systems &amp; operational tools</Label>

            <h1 className="text-optical mt-10 max-w-[15ch] font-display text-4xl leading-[1.04] tracking-[-0.025em] text-text-primary text-balance md:text-5xl xl:max-w-[21ch] lg:text-6xl">
              I design the systems behind the tools people use all day.
            </h1>

            <div className="mt-14 flex max-w-[46rem] gap-6">
              <div aria-hidden="true" className="w-px shrink-0 bg-interactive" />
              <p className="text-lg leading-[1.65] text-text-secondary">
                Ten years on internal software: compliance platforms, audit tooling, and the CRM
                systems bankers and advisors work in every day. I own the design system, and I build
                the prototypes that prove a design works before engineering commits to it.
              </p>
            </div>
          </section>
        </Container>

        {/* Work index */}
        <Container>
          <section className="pt-32" aria-labelledby="work-heading">
            <div className="flex items-baseline justify-between border-b border-border-rule pb-4">
              <Label as="h2" className="!text-text-primary">
                <span id="work-heading">Case studies</span>
              </Label>
              <span className="font-mono text-xs tracking-[0.14em] text-text-tertiary">
                {String(caseStudies.length).padStart(2, "0")}
              </span>
            </div>

            {/* Two columns from lg. One below, because a card at 390px wide
                with a three-line summary is already a full-width object. */}
            <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
              {caseStudies.map((study, i) => (
                <WorkEntry key={study.slug} study={study} index={i} />
              ))}
            </div>
          </section>
        </Container>

        {/* The system, as an artifact rather than a claim */}
        <Container>
          <section className="pt-28" aria-labelledby="system-heading">
            {/* The same section head the work index uses. The page had one
                sectioning device used once, which made the panel below read as
                a floating object rather than a part of the document.

                No count on the right. The work head carries one because four
                case studies is a fact worth stating; a system is not a
                quantity. The layout takes a missing second child without
                complaint, which is the point of building the head as a flex
                row rather than a grid with fixed columns. */}
            <div className="border-b border-border-rule pb-4">
              <Label as="h2" className="!text-text-primary">
                <span id="system-heading">Design system</span>
              </Label>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-12 rounded-sm border border-border-subtle bg-surface-raised p-8 md:p-12 lg:grid-cols-[1fr_20rem] lg:items-center lg:gap-20">
              <div>
                {/* The "Live artifact" eyebrow that used to sit here is gone.
                    With the section head above, it was the second of three
                    labels stacked inside 200px, and the heading under it
                    already says the same thing in a full sentence. */}
                <h3 className="max-w-[24ch] font-display text-3xl leading-[1.2] tracking-[-0.018em] text-text-primary">
                  This site runs on a design system you can read.
                </h3>
                <p className="mt-5 max-w-[52ch] text-base text-text-secondary">
                  Tokens, components, the accessibility model, and the reasoning behind each, published
                  and open. The strongest thing a systems designer can show isn&rsquo;t a
                  screenshot. It&rsquo;s a system somebody else can inspect, use, and disagree with.
                </p>
                <div className="mt-7">
                  {/* Primary, and the only one on the page. The panel is the
                      single thing the homepage asks a reviewer to go and read,
                      so it gets the solid fill and nothing else competes for
                      it. A second primary anywhere on this page would make
                      both of them mean less. */}
                  <Button href="/system" variant="primary" iconAfter={<ArrowRight />}>
                    Read the system
                  </Button>
                </div>
              </div>

              <dl className="font-mono text-xs">
                {systemFacts.map((fact, i) => (
                  <div
                    key={fact.key}
                    className={`flex justify-between py-3 ${
                      i < systemFacts.length - 1 ? "border-b border-border-subtle" : ""
                    }`}
                  >
                    <dt className="text-text-tertiary">{fact.key}</dt>
                    <dd className="text-text-primary">{fact.value}</dd>
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
