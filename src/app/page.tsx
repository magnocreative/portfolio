import Link from "next/link";
import { Container, Label } from "@/design-system/primitives/Container";
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
            <Label>Senior Experience Designer — design systems &amp; operational tools</Label>

            <h1 className="text-optical mt-10 max-w-[15ch] font-display text-4xl leading-[1.04] tracking-[-0.025em] text-text-primary text-pretty md:text-5xl lg:text-6xl">
              I design the systems behind the tools people use all day.
            </h1>

            <div className="mt-14 flex max-w-[38rem] gap-6">
              <div aria-hidden="true" className="w-px shrink-0 bg-interactive" />
              <p className="text-lg leading-[1.65] text-text-secondary">
                Ten years on internal software — compliance platforms, audit tooling, and the CRM
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
                <span id="work-heading">Selected work</span>
              </Label>
              <span className="font-mono text-2xs tracking-[0.14em] text-text-tertiary">
                {String(caseStudies.length).padStart(2, "0")}
              </span>
            </div>

            <div>
              {caseStudies.map((study, i) => (
                <WorkEntry key={study.slug} study={study} index={i} />
              ))}
            </div>
          </section>
        </Container>

        {/* The system, as an artifact rather than a claim */}
        <Container>
          <section className="pt-28" aria-labelledby="system-heading">
            <div className="grid grid-cols-1 gap-12 border border-border-rule p-8 md:p-12 lg:grid-cols-[1fr_20rem] lg:items-center lg:gap-20">
              <div>
                <Label className="!text-text-accent">Live artifact</Label>
                <h2
                  id="system-heading"
                  className="mt-5 max-w-[24ch] font-display text-3xl leading-[1.2] tracking-[-0.018em] text-text-primary"
                >
                  This site runs on a design system you can read.
                </h2>
                <p className="mt-5 max-w-[52ch] text-base text-text-secondary">
                  Tokens, components, the accessibility model, and the reasoning behind each —
                  published and open. The strongest thing a systems designer can show isn&rsquo;t a
                  screenshot. It&rsquo;s a system somebody else can inspect, use, and disagree with.
                </p>
                <Link
                  href="/system"
                  className="mt-7 inline-block font-mono text-2xs uppercase tracking-[0.12em] text-text-accent transition-colors duration-[160ms] hover:text-interactive-hover"
                >
                  Read the system →
                </Link>
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
