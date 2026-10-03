import type { Metadata } from "next";
import { Container, Label } from "@/design-system/primitives/Container";
import { Button } from "@/design-system/components/Button";
import { ArrowRight } from "@/design-system/components/Icon";
import { SiteHeader } from "@/design-system/components/SiteHeader";
import { SiteFooter } from "@/design-system/components/SiteFooter";
import { Logo } from "@/design-system/brand/Logo";

export const metadata: Metadata = {
  title: "About",
  description:
    "Ten years designing internal software: compliance platforms, audit tooling, and the CRM systems bankers and advisors work in every day. An engineering background, and a habit of building the prototype rather than describing it.",
};

/* Written in the same register as the decisions on /system: a claim, then what
   it costs. A principle with no cost attached is a preference wearing a suit,
   and a reader who has run a team can tell the difference immediately. Each
   one here is drawn from work that actually happened, which is why none of
   them needs a project name to land. */
const principles = [
  {
    title: "Build it rather than describe it",
    body: "A static mockup asks engineering to imagine the behavior. A coded prototype shows them. I replaced our static prototypes with coded ones, built the component workflow and the specification format around them, and set up the team’s first version-controlled workspace. The cost is real: the first pass is slower, and a prototype left to drift out of date is worse than no prototype at all. It buys something worth more, which is that the argument stops being about whether a thing will work.",
  },
  {
    title: "Grayscale first",
    body: "When the self-service portal went in front of four lines of business, the first version had no color in it anywhere. People argue about what they can see, and color is the easiest thing to see. Take it away and the conversation moves to structure, which is the part that is expensive to change later. The cost is that some reviewers read grayscale as unfinished, so you have to say out loud why it looks that way, every time, until the habit sets.",
  },
  {
    title: "Measure, then look",
    body: "Every color on this site is measured rather than asserted, and the measurements are published on the design system page. It still is not sufficient. Twice the numbers came back clean on type that was clearly too faint, because a contrast ratio models none of stroke weight, letterspacing, or what all-caps does to a line of text. Measurement catches what the eye misses. The eye catches what the standard does not model. Skipping either one ships something broken.",
  },
  {
    title: "Adoption is its own design problem",
    body: "A pattern that only gets used when a designer is in the room has not been adopted, it has been supervised. The work that actually moved adoption was not screen design at all. It was making a pattern findable, making the reasoning behind it legible to someone who was not in the meeting, and making the decision to use it something a team could arrive at without me.",
  },
];

export default function About() {
  return (
    <>
      <SiteHeader />

      <main>
        <Container>
          <section className="pt-24 pb-4 md:pt-36">
            <Label>About</Label>

            <h1 className="text-optical mt-10 max-w-[18ch] font-display text-4xl leading-[1.04] tracking-[-0.025em] text-text-primary text-balance md:text-5xl lg:text-6xl">
              Most of what I&rsquo;ve designed, you will never see.
            </h1>

            <div className="mt-14 flex max-w-[46rem] gap-6">
              <div aria-hidden="true" className="w-px shrink-0 bg-interactive" />
              <p className="text-lg leading-[1.65] text-text-secondary">
                Compliance platforms, audit tooling, and the CRM systems bankers and advisors work
                in every day. Internal software, used by people who cannot go and pick something
                else instead. That constraint is not a footnote to the work. It is the work.
              </p>
            </div>
          </section>
        </Container>

        {/* The path here */}
        <Container>
          <section className="pt-32" aria-labelledby="path-heading">
            <div className="border-b border-border-rule pb-4">
              <Label as="h2" className="!text-text-primary">
                <span id="path-heading">The short version</span>
              </Label>
            </div>

            <div className="mt-10 flex max-w-measure flex-col gap-6 text-base leading-[1.7] text-text-secondary">
              <p>
                Ten years in design. I started as a graphic designer and technical illustrator,
                moved into visual design on a bank&rsquo;s public site, and then into product design
                on the internal platforms nobody outside the company ever sees.
              </p>
              <p>
                In the middle of that I spent a year and a half as a software engineer, maintaining
                the SQL jobs behind a bank&rsquo;s submission for the Federal Reserve&rsquo;s annual
                capital stress test. Automating parts of the pipeline had made it faster and more
                fragile, and the job was to make it stop breaking ahead of a delivery date that did
                not move. That was not a detour from design. It is why I can build the prototype
                instead of describing it, and why I know what a handoff actually costs the person
                on the receiving end of it.
              </p>
              <p>
                Today I&rsquo;m an experience designer at JPMorganChase in Plano, working across CRM
                platforms used throughout the firm, and I own the design system those teams build
                from. Before that, six years at USAA across governance, risk and compliance, audit,
                and enterprise reporting: specialist users, high stakes, and interfaces where the
                cost of a bad decision shows up as rework and missed controls rather than a bounce
                rate.
              </p>
            </div>
          </section>
        </Container>

        {/* The mark */}
        <Container>
          <section className="pt-28" aria-labelledby="mark-heading">
            <div className="border-b border-border-rule pb-4">
              <Label as="h2" className="!text-text-primary">
                <span id="mark-heading">The mark</span>
              </Label>
            </div>

            {/* The figures in the copy are measured against THIS panel, not
                against the page. Raised resolves to pure white in light and one
                step up from the page in dark, which moves both numbers: the deep
                peak reads 5.00:1 here against 4.62:1 on the page ground, and
                3.60:1 here against 3.82:1. Re-measured when the panel was added
                rather than carried over, because a ratio quoted against the
                wrong surface is just a number somebody made up. */}
            <div className="mt-10 grid grid-cols-1 gap-10 rounded-sm border border-border-subtle bg-surface-raised p-8 md:p-12 lg:grid-cols-[15rem_1fr] lg:gap-16">
              <div>
                <Logo
                  title="The Magno Creative mark"
                  className="w-[180px] md:w-[220px] lg:w-full h-auto"
                />
                <dl className="mt-6 font-mono text-xs">
                  {[
                    ["--mark-deep", "#4e729a"],
                    ["--mark-light", "#80a2c4"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4 border-b border-border-subtle py-2">
                      <dt className="text-text-tertiary">{k}</dt>
                      <dd className="text-text-primary">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="flex max-w-measure flex-col gap-6 text-base leading-[1.7] text-text-secondary">
                <p>
                  Two peaks forming an M, the snowcaps cut as negative space. I&rsquo;m from the
                  Pacific Northwest, and my middle name is Magno, which means great or large. The
                  mountains were the obvious shape and they stuck.
                </p>
                <p>
                  What makes it worth a section is what happened after it existed. The deep peak is{" "}
                  <code className="font-mono text-sm text-text-primary">#4e729a</code>, and that is
                  not a color chosen to sit near the interface. It is{" "}
                  <code className="font-mono text-sm text-text-primary">--interactive-default</code>{" "}
                  itself: the one blue this site runs on, behind every button, every focus ring and
                  every selected state. The dark theme was drawn from the mark rather than inverted
                  from the light one, which is why the logo sits in it natively instead of being
                  placed on top of something unrelated.
                </p>
                <p>
                  Both fills are single values rather than a light pair and a dark pair, so the
                  artwork is identical in both themes while the surface under it changes. Against
                  this panel the deep peak measures 5.00:1 in light and 3.60:1 in dark. Both clear
                  the 3:1 bar a non-text element is held to, which is the whole reason one value can
                  serve both themes at all. Switch your theme: everything behind the mark moves and
                  the hex column does not.
                </p>
                <p className="text-text-primary">
                  A mark that only appears in the corner of a page is decoration. This one produced
                  the palette.
                </p>
                <div className="mt-2">
                  <Button href="/system#contrast" variant="secondary" iconAfter={<ArrowRight />}>
                    See it measured
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </Container>

        {/* How I work */}
        <Container>
          <section className="pt-28" aria-labelledby="principles-heading">
            <div className="flex items-baseline justify-between border-b border-border-rule pb-4">
              <Label as="h2" className="!text-text-primary">
                <span id="principles-heading">How I work</span>
              </Label>
              <span className="font-mono text-xs tracking-[0.14em] text-text-tertiary">
                {String(principles.length).padStart(2, "0")}
              </span>
            </div>

            {/* One column at the 900px measure, matching the decisions section
                on /system. Two columns were tried there and read as a comparison
                between items that are not alternatives to each other. */}
            <div className="mt-10 flex flex-col gap-10">
              {principles.map((principle) => (
                <div key={principle.title}>
                  <h3 className="max-w-measure font-display text-xl leading-[1.25] tracking-[-0.012em] text-text-primary">
                    {principle.title}
                  </h3>
                  <p className="mt-3 max-w-measure text-base leading-[1.7] text-text-secondary">
                    {principle.body}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </Container>

        {/* What I'm after */}
        <Container>
          <section className="pt-28" aria-labelledby="interest-heading">
            <div className="border-b border-border-rule pb-4">
              <Label as="h2" className="!text-text-primary">
                <span id="interest-heading">What interests me</span>
              </Label>
            </div>

            <div className="mt-10 flex max-w-measure flex-col gap-6 text-base leading-[1.7] text-text-secondary">
              <p>
                Design systems and internal tools, in that order. The work I want is the work where
                the system is the product: where somebody has to own the tokens, the components,
                the documentation and the argument for why another team should adopt any of it,
                and where the people using the result are specialists doing difficult work under
                real constraints.
              </p>
              <p>
                I care more about whether a thing shipped and stayed shipped than whether it looked
                good in a deck. The oldest project on this site is four years old and still running.
                That fact is worth more to me than any screenshot of it.
              </p>
            </div>

            <div className="mt-8">
              <Button href="/system" variant="primary" iconAfter={<ArrowRight />}>
                Read the design system
              </Button>
            </div>
          </section>
        </Container>
      </main>

      <SiteFooter />
    </>
  );
}
