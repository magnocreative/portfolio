import { Container } from "@/design-system/primitives/Container";
import { Button } from "@/design-system/components/Button";
import { ArrowRight } from "@/design-system/components/Icon";
import { WorkEntry } from "@/design-system/components/WorkEntry";
import { caseStudies } from "@/content/case-studies";
import { SectionHead } from "@/design-system/components/SectionHead";
import { PageHeader } from "@/design-system/components/PageHeader";
import { Tag } from "@/design-system/components/Tag";
import { ThemeToggle } from "@/design-system/components/ThemeToggle";

/**
 * A few of the system's own components, live, where a list of facts about the
 * system used to be. The copy beside it says the strongest thing a systems
 * designer can show is not a screenshot, so this is not one: the buttons
 * respond to the pointer, and the theme control repaints the whole page,
 * which is the token architecture demonstrating itself.
 *
 * The buttons do nothing when pressed. They are specimens, the same ones the
 * components page shows, and they say so in the caption.
 */
function SystemSpecimen() {
  const row = "flex flex-col gap-3";
  const caption = "font-label text-xs uppercase tracking-[0.11em] text-text-tertiary";
  return (
    <figure className="flex flex-col gap-7 rounded-sm border border-border-subtle bg-surface-page p-6 sm:p-8">
      <div className={row}>
        <span className={caption}>Button</span>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="primary" fillOnPhone={false}>Primary</Button>
          <Button variant="secondary" fillOnPhone={false}>Secondary</Button>
          <Button variant="tertiary" fillOnPhone={false}>Tertiary</Button>
        </div>
      </div>
      <div className={row}>
        <span className={caption}>Tag</span>
        <div className="flex flex-wrap items-center gap-2">
          <Tag tone="pass">AA</Tag>
          <Tag tone="neutral">AA Large</Tag>
          <Tag tone="danger">Fail</Tag>
          <Tag dot>In writing</Tag>
        </div>
      </div>
      <div className={row}>
        <span className={caption}>Theme, try it</span>
        <div className="-ml-1.5">
          <ThemeToggle />
        </div>
      </div>
      <figcaption className="font-label text-xs leading-[1.5] text-text-tertiary">
        Live components from the system, not pictures of them.
      </figcaption>
    </figure>
  );
}

export default function Home() {
  return (
    <>

      <main>
        {/* Hero. The measure is deliberately short — a claim you can read in
            one breath beats a paragraph that hedges it. */}
        <Container>
          {/* The eyebrow is the title of record, not the functional one. It
              reads Senior everywhere a person describes this work, and it
              will read Senior here the day the promotion lands, but a public
              page carrying a title that employment verification would not
              return is a discrepancy waiting to be found at the worst moment.
              The seniority is argued by the work below it instead. */}
          <PageHeader
            type="hero"
            eyebrow="Experience Designer · Design Systems"
            title="Hey there, I design the systems behind the tools people use all day."
            lede="Ten years on internal software: compliance platforms, audit tooling, and the CRM systems bankers and advisors work in every day. I own the design system, and I build the prototypes that prove a design works before engineering commits to it."
          />
        </Container>

        {/* Work index */}
        <Container>
          <section className="pt-32" aria-labelledby="work-heading">
            <SectionHead id="work-heading" count={caseStudies.length}>Case studies</SectionHead>

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
            {/* The same section head the work index uses. The page had one
                sectioning device used once, which made the panel below read as
                a floating object rather than a part of the document.

                No count on the right. The work head carries one because four
                case studies is a fact worth stating; a system is not a
                quantity. The layout takes a missing second child without
                complaint, which is the point of building the head as a flex
                row rather than a grid with fixed columns. */}
            <SectionHead id="system-heading">Design system</SectionHead>

            <div className="mt-10 grid grid-cols-1 gap-12 rounded-sm border border-border-subtle bg-surface-raised p-8 md:p-12 lg:grid-cols-[1fr_26rem] lg:items-center lg:gap-16">
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

              <SystemSpecimen />
            </div>
          </section>
        </Container>
      </main>
    </>
  );
}
