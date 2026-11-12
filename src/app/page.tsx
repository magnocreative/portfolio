import { Container } from "@/design-system/primitives/Container";
import { Button } from "@/design-system/components/Button";
import { ArrowRight } from "@/design-system/components/Icon";
import { WorkEntry } from "@/design-system/components/WorkEntry";
import { caseStudies } from "@/content/case-studies";
import { SectionHead } from "@/design-system/components/SectionHead";
import { PageHeader } from "@/design-system/components/PageHeader";
import { homeHero } from "@/content/home";
import { Tag } from "@/design-system/components/Tag";
import { ThemeToggle } from "@/design-system/components/ThemeToggle";
import { FeaturePanel } from "@/design-system/components/FeaturePanel";

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
    // Fills the height of its column, so in the snug panel its top and bottom
    // edges sit 16px from the panel's, and its contents center in it.
    <figure className="flex h-full flex-col justify-center gap-7 rounded-sm border border-border-subtle bg-surface-page p-6 sm:p-8">
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
          <PageHeader type="hero" {...homeHero} />
        </Container>

        {/* Work index */}
        <Container>
          <section className="pt-32" aria-labelledby="work-heading">
            <SectionHead id="work-heading" count={caseStudies.length}>Case studies</SectionHead>

            <div className="mt-10 flex flex-col gap-4">
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

            <FeaturePanel
              className="mt-10"
              headingAs="h3"
              heading="This site runs on a design system you can read."
              asideWidth="wide"
              asideInset="snug"
              aside={<SystemSpecimen />}
              action={
                // Primary, and the only one on the page. The panel is the
                // single thing the homepage asks a reviewer to go and read, so
                // it gets the solid fill. The specimen beside it shows a
                // Primary too, but as a labeled sample, not an action.
                <Button href="/system" variant="primary" iconAfter={<ArrowRight />}>
                  Read the system
                </Button>
              }
            >
              Tokens, components, the accessibility model, and the reasoning behind each, published
              and open. The strongest thing a systems designer can show isn&rsquo;t a screenshot.
              It&rsquo;s a system somebody else can inspect, use, and disagree with.
            </FeaturePanel>
          </section>
        </Container>
      </main>
    </>
  );
}
