import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/design-system/primitives/Container";
import { Button } from "@/design-system/components/Button";
import { SectionNav } from "@/design-system/components/SectionNav";
import { FeaturePanel } from "@/design-system/components/FeaturePanel";
import { ArrowRight } from "@/design-system/components/Icon";
import { Logo } from "@/design-system/brand/Logo";
import { TextBlock } from "@/design-system/components/TextBlock";
// Imported rather than referenced from /public, so Next reads the real
// dimensions at build time and reserves the box before the bytes arrive. That
// is the difference between a figure that appears and one that shoves three
// paragraphs down the page when it loads.
import portrait from "@/assets/alejandro-fernandini.jpg";
import { SectionHead } from "@/design-system/components/SectionHead";
import { PageHeader } from "@/design-system/components/PageHeader";
import { KeyValueList } from "@/design-system/components/KeyValueList";

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
  // The double diamond, told as what it found rather than named as a method:
  // the résumé states the belief in a line, this proves it (Alejandro,
  // November 2026). Tightened in the content pass of November 2026: each one
  // keeps its story and its cost, about a quarter shorter.
  {
    title: "Find the problem before the solution",
    body: "At USAA, I surveyed 82 people across a compliance organization that ran on sixteen interconnected applications. The problem was not the applications. Nobody could tell when one of them was down. The answer was one status view in place of sixteen systems checked by hand. Agentic tools make this step tempting to skip, because a screen is now minutes away. The cost of discovery is that it looks like nothing is happening, so I defend that time until the reframed problem pays for it.",
  },
  {
    title: "Build it rather than describe it",
    body: "A static mockup asks engineering to imagine the behavior. A coded prototype shows it. I replaced our static prototypes with coded ones, built the component workflow and the specification format around them, and set up the team’s first version-controlled workspace. The first pass is slower, and a prototype left to drift is worse than none at all. What it buys is worth more: the conversation stops being about whether a thing will work.",
  },
  {
    title: "Grayscale first",
    body: "When the self-service portal first went in front of four lines of business, there was no color in it anywhere. People argue about what they can see, and color is the easiest thing to see. Take it away and the conversation moves to structure, the part that is expensive to change later. The cost is that some reviewers read grayscale as unfinished, so I explain why, every time, until the habit sets.",
  },
  {
    title: "Measure, then look",
    body: "Every color on this site is measured, and the measurements are published on the design system page. Measurement alone is still not enough. Twice the numbers came back clean on type that was clearly too faint, because a contrast ratio does not account for stroke weight, letterspacing, or all caps. Measurement catches what the eye misses, and the eye catches what the standard leaves out. Skip either one, and something broken ships.",
  },
  {
    title: "Adoption is its own design problem",
    body: "A pattern that only gets used when a designer is in the room has not been adopted. It has been supervised. The work that moved adoption was not screen design. It was making a pattern easy to find, making the reasoning behind it clear to someone who missed the meeting, and making the choice to use it one a team could reach without me. The cost is that this work, done well, is invisible.",
  },
];

// The labels are the section headings verbatim. A contents list that
// paraphrases is a second set of names to keep in step, and the one that drifts
// is always the copy nobody is looking at.
const contents = [
  { id: "short-version", label: "The short version" },
  { id: "mark", label: "The mark" },
  { id: "how-i-work", label: "How I work" },
  { id: "interests", label: "What interests me" },
];

export default function About() {
  return (
    <>

      <main>
        <Container>
          {/* One Container around a grid, rather than a Container per section.
              The sticky contents nav needs a grid item that stretches the full
              height of the content beside it; wrapping each section separately
              gives it nothing to travel down and it scrolls away after the
              first screen. Same sticky trap the /system page documents. */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_13rem] lg:gap-16">
            {/* min-w-0 is a guard, not a fix for anything currently broken. A
                grid item defaults to `min-width: auto` and will not shrink
                below its content's intrinsic width, so a child declaring a
                minimum — the contrast tables are min-w-[36rem] — would push
                this column past the viewport. Today it cannot: those tables
                sit in their own `overflow-x-auto` wrapper, measured at 342px
                on a 390px screen and clipping correctly. This keeps the next
                wide child from depending on remembering that. */}
            <div className="min-w-0">
          <PageHeader
            type="withSectionNav"
            eyebrow="About"
            title="Most of what I designed, you will never see."
            lede="Compliance platforms, audit tooling, and the CRM systems bankers and advisors work in every day. The people who use them are unable to switch to something better, so the work is making sure they never need to."
          />

        {/* The path here */}
          <section id="short-version" className="mt-32" aria-labelledby="path-heading">
            <SectionHead id="path-heading">The short version</SectionHead>

            {/* Three layouts, one per width, because the photo has a different
                job at each.

                Phone, below 640: full width above the prose. Alejandro's call:
                on a phone the portrait should fill the screen, not sit as a
                thumbnail beside a column too narrow to share.

                640 to 1359: floated, so the first paragraphs sit beside it and
                the third clears it and recovers the full measure. Side by side
                in its own column here would leave the text 270 to 370px wide,
                about 35 to 45 characters a line.

                1360 and up: its own column, sized so the text starts exactly
                where the text of the mark panel below starts. That edge is the
                panel's 1px border, its 3rem padding, its 15rem logo column and
                its 4rem gap, less this row's 1.75rem gap: 20.25rem plus 1px.
                The two sections then read as one grid instead of two layouts
                stacked. At 1440 the text column is 591px. */}
            <div className="mt-10 text-base leading-[1.7] text-text-secondary min-[1360px]:grid min-[1360px]:grid-cols-[calc(20.25rem+1px)_1fr] min-[1360px]:items-start min-[1360px]:gap-7">
              <figure className="mb-7 w-full sm:max-[1359px]:float-left sm:max-[1359px]:mr-7 sm:max-[1359px]:mb-3 sm:max-[1359px]:w-44 lg:max-[1359px]:w-52 min-[1360px]:mb-0">
                <Image
                  src={portrait}
                  alt="Alejandro Magno Fernandini"
                  // The DISPLAY size at each width, so the browser fetches an
                  // image close to what it paints rather than the 880px source
                  // everywhere.
                  sizes="(min-width: 1360px) 325px, (min-width: 1024px) 208px, (min-width: 640px) 176px, 100vw"
                  // Generated from the import at build time, so the space is
                  // filled with the photo's own colours while it loads instead
                  // of a hole in the paragraph.
                  placeholder="blur"
                  className="h-auto w-full rounded-sm"
                />
              </figure>
              <div className="max-w-measure">
                <p>
                  I started as a graphic designer and technical illustrator, moved to a bank&rsquo;s
                  public website, and then followed the work inward, to the platforms nobody outside
                  the company ever sees. That is where I have stayed, and where I do my best work.
                </p>
                <p className="mt-6">
                  Along the way, I spent a year and a half as a software engineer, keeping a Federal
                  Reserve stress-test pipeline from breaking ahead of a deadline that never moved. It
                  is why I prototype in code, and why I design every handoff for the person receiving
                  it.
                </p>
                <p className="mt-6">
                  Today I&rsquo;m an experience designer at JPMorganChase in Plano, where I own the
                  design system our CRM teams build from. Before that, I spent six years at USAA
                  designing for compliance and audit specialists, where a confusing screen does not
                  cost a click. It costs a missed control.
                </p>
              </div>
            </div>
          </section>

        {/* The mark */}
          <section id="mark" className="mt-28" aria-labelledby="mark-heading">
            <SectionHead id="mark-heading">The mark</SectionHead>

            {/* The ratios that used to be quoted here (5.00:1 and 3.60:1 against
                this panel) moved out in the content pass of November 2026: the
                section tells the story of the mark, and "See it measured" takes
                the reader to the page that proves it. */}
            <FeaturePanel
              className="mt-10"
              asideWidth="narrow"
              asideSide="start"
              align="start"
              aside={
                <div>
                  <Logo
                    title="The MagnoCreative mark"
                    className="w-full sm:w-[180px] md:w-[220px] xl:w-full h-auto"
                  />
                  <KeyValueList
                    className="mt-6"
                    items={[
                      { key: "--mark-deep", value: "#4e729a" },
                      { key: "--mark-light", value: "#80a2c4" },
                    ]}
                  />
                </div>
              }
            >
              <div className="flex max-w-measure flex-col gap-6 text-base leading-[1.7] text-text-secondary">
                <p>
                  Two peaks form an M, with the snowcaps cut from the negative space. I am from the
                  Pacific Northwest, and my middle name, Magno, means great. Mountains were the
                  obvious shape, and they stuck.
                </p>
                <p>
                  Then the mark outgrew the corner of the page. Its deep peak became{" "}
                  <code className="font-medium text-text-primary">--interactive-default</code>, the
                  one blue behind every button, focus ring and selected state on this site. The dark
                  theme was drawn from the mark rather than inverted from the light one, so the logo
                  sits in it naturally. Switch your theme: everything behind the mark changes, and the
                  mark does not.
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
            </FeaturePanel>
          </section>

        {/* How I work */}
          <section id="how-i-work" className="mt-28" aria-labelledby="principles-heading">
            <SectionHead id="principles-heading" count={principles.length}>How I work</SectionHead>

            {/* One column at the 900px measure, matching the decisions section
                on /system. Two columns were tried there and read as a comparison
                between items that are not alternatives to each other. */}
            <div className="mt-10 flex flex-col gap-10">
              {principles.map((principle) => (
                <TextBlock key={principle.title} heading={principle.title}>
                  {principle.body}
                </TextBlock>
              ))}
            </div>
          </section>

        {/* What I'm after */}
          <section id="interests" className="mt-28" aria-labelledby="interest-heading">
            <SectionHead id="interest-heading">What interests me</SectionHead>

            <TextBlock
              className="mt-10"
              action={
                <Button href="/system" variant="primary" iconAfter={<ArrowRight />}>
                  Read the design system
                </Button>
              }
            >
              <p>
                Design systems and internal tools, in that order. The work I am looking for is the
                kind where the system is the product: someone has to own the tokens, the components,
                the documentation and the case for why another team should adopt them, and the people
                using the result are specialists doing difficult work under real constraints.
              </p>
              <p>
                I care more about whether something shipped and stayed shipped than whether it looked
                good in a deck. The oldest project on this site is four years old and, the last I
                heard, still in use. That means more to me than any screenshot of it.
              </p>
            </TextBlock>
          </section>
            </div>

            {/* No `self-start`. Letting the grid item stretch is what gives the
                sticky nav inside it a tall containing block to travel down. */}
            {/* Desktop only. Below 1024 this stacked horizontally above the
                content and ran 154 to 209px tall, which on a 390px phone put
                the page title 59 to 66 percent of the way down the first
                screen: the reader met a list of places they could go before
                the page had said what it was.

                A contents list earns that space on a wide screen, where it
                sits in a column nothing else wanted and a reader arrives
                wanting one specific part. On a phone there is no spare column,
                and people scroll. Every section is still reachable; what is
                gone is the index, not the content.

                `hidden`, not a second layout. The horizontal variant still
                exists in the component and in Storybook — it is simply not
                what these pages want. */}
            {/* The same 32 the page header carries as `md:pt-32`, so the nav's
                first label starts on the page eyebrow's line rather than a
                third of a row below it. The component pulls back by its own
                row padding; see the note on the sticky offset there. */}
            <div className="hidden lg:block lg:mt-32">
              <SectionNav items={contents} orientation="vertical" sticky label="On this page" />
            </div>
          </div>
        </Container>
      </main>
    </>
  );
}
