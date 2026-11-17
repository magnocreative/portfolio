import type { Metadata } from "next";
import { Container } from "@/design-system/primitives/Container";
import { ContrastAudit } from "@/design-system/components/ContrastAudit";
import { decisions, interactiveRoles, textRoles } from "@/content/system";
import { StorybookPanel } from "./StorybookPanel";
import { TokenFlow } from "./TokenFlow";
import { AtomicLadder } from "./AtomicLadder";
import { SectionNav } from "@/design-system/components/SectionNav";
import { Button } from "@/design-system/components/Button";
import { ArrowRight, StorybookIcon } from "@/design-system/components/Icon";
import { SectionHead } from "@/design-system/components/SectionHead";
import { TextBlock } from "@/design-system/components/TextBlock";
import { PageHeader } from "@/design-system/components/PageHeader";
import { SplitList } from "@/design-system/components/SplitList";

export const metadata: Metadata = {
  title: "The design system",
  description:
    "The tokens, themes and accessibility model behind this site: three tiers, two neutral grounds, one set of semantic roles, and contrast measured rather than asserted.",
};

const contents = [
  { id: "tiers", label: "Three tiers" },
  { id: "atomic", label: "Atoms to pages" },
  { id: "contrast", label: "Contrast, measured" },
  { id: "decisions", label: "Decisions" },
  { id: "components", label: "Components" },
  { id: "source", label: "Read the source" },
];

/* The three tiers are drawn by TokenFlow: three real colors followed from
   the primitive, through the semantic role, to the component (Alejandro,
   November 2026). It replaced a table that followed one color in words. */

export default function SystemPage() {
  return (
    <>

      <main>
        <Container>
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
                eyebrow="The design system"
                title="A system you can read, not a claim you have to take on trust."
                lede="This site runs on the system documented below, and everything here is live. The swatches are the real tokens, and the contrast figures are measured in your browser as you read. Switch your device to dark mode and every number changes with it."
                actions={
                  // The proof under the promise (Alejandro, November 2026).
                  // The lede says everything is live; a reader skimming the
                  // top of the page shouldn't have to scroll four screens to
                  // check. The same two links return further down, where each
                  // is the next step for someone who read that far: the
                  // gallery under Components, Storybook in Read the source.
                  // Stacked full width on a phone, side by side from 640.
                  <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                    <Button href="/system/components" variant="primary" iconAfter={<ArrowRight />}>
                      See the components running
                    </Button>
                    <Button
                      href="https://storybook.magnocreative.com"
                      variant="secondary"
                      iconBefore={<StorybookIcon />}
                      iconSize="lg"
                    >
                      Open in Storybook
                    </Button>
                  </div>
                }
              />
              {/* Three tiers */}
            <section id="tiers" className="mt-24" aria-labelledby="tiers-heading">
            <SectionHead id="tiers-heading">Three tiers between a color and the screen</SectionHead>

            <TextBlock className="mt-8">
              Every color on this site starts as a raw value, takes on a purpose, and only then reaches a
              component. A component never asks for the raw value. It asks for the purpose, so a redesign
              changes the purpose once instead of hunting through every component for a stray gray.
            </TextBlock>

            <div className="mt-10">
              <TokenFlow />
            </div>

            {/* The component tier of tokens, said plainly, because its being
                empty is the result: no component has needed a value the
                semantics don't give it. */}
            <TextBlock className="mt-8">
              Switch your theme and the text and surface rows light a different primitive, while the button&rsquo;s
              blue stays where it is and the components never change. There is room for one more kind of token: a
              value declared beside a single component, for something no semantic role covers. So far no component
              has needed one, and that is the result I wanted.
            </TextBlock>
            </section>

              {/* Atomic design */}
            <section id="atomic" className="mt-24" aria-labelledby="atomic-heading">
            <SectionHead id="atomic-heading">From atoms to pages</SectionHead>
            <TextBlock className="mt-8">
              <p>
                When I first learned design systems, the frame that made them click was{" "}
                <a
                  href="https://atomicdesign.bradfrost.com/"
                  className="text-text-accent underline decoration-1 underline-offset-[3px] hover:decoration-2"
                >
                  atomic design
                </a>
                , Brad Frost&rsquo;s way of describing an interface as parts that build on one another, from
                the smallest pieces up to the pages people actually use.
              </p>
            </TextBlock>
            {/* His words, attributed: Alejandro's choice of quote (November
                2026), from Atomic Design, chapter 2, verified word for word at
                the source. It defines the method, so the intro above no longer
                lists the five stages; the graphic below shows them. */}
            <figure className="mt-10 max-w-measure border-l border-border-rule pl-6">
              <blockquote className="font-display text-xl leading-[1.45] text-text-primary">
                <p>
                  &ldquo;Atomic design is a methodology composed of five distinct stages working together to create
                  interface design systems in a more deliberate and hierarchical manner.&rdquo;
                </p>
              </blockquote>
              <figcaption className="mt-3 font-label text-xs uppercase tracking-[0.11em] text-text-tertiary">
                Brad Frost,{" "}
                <cite className="not-italic">
                  <a href="https://atomicdesign.bradfrost.com/chapter-2/" className="text-text-accent hover:underline">
                    Atomic Design
                  </a>
                </cite>
                , 2016
              </figcaption>
            </figure>
            <div className="mt-10">
              <AtomicLadder />
            </div>
            <TextBlock className="mt-8">
              This site keeps the vocabulary rather than the folders. Its components are not filed as atoms or
              molecules, because the same card can be a whole section in one place and a small part in another.
              The names are for talking about how the pieces fit, not for sorting them.
            </TextBlock>
            </section>

              {/* Live audit */}
            <section id="contrast" className="mt-24" aria-labelledby="contrast-heading">
            <SectionHead id="contrast-heading">Text roles, measured live</SectionHead>
            <TextBlock className="mt-8 mb-10">
              Each token below is painted to a canvas and the pixel read back, so the figure describes the color
              you actually see. It is then checked against the WCAG 2.2 threshold for the size it is used at.
              Small metadata is held to 4.5:1, not the 3:1 large-text allowance.
            </TextBlock>
            <ContrastAudit rows={textRoles} label="Text roles, measured" />

            <TextBlock className="mt-14 mb-8" heading="Interactive fills, at the non-text bar">
              <p>
                Filled controls are judged at 3:1 rather than 4.5:1, because a fill owes its contrast to
                its own label, not to the page behind it. That is why each can be a single value:
                blue-600 in both themes, with a white label that measures 5.00:1. Change your theme and
                watch the ratios move while the hex column stays still.
              </p>
              <p>
                On the dark ground, hover and pressed fall below the bar. The table grades them
                Decorative rather than hiding them: they are passing states, and the white label on them
                still measures 7.46:1 and 10.90:1.
              </p>
            </TextBlock>
            <ContrastAudit rows={interactiveRoles} kind="nontext" label="Interactive fills, measured" />
            </section>

              {/* Decisions */}
            <section id="decisions" className="mt-24" aria-labelledby="decisions-heading">
            <SectionHead id="decisions-heading">Decisions, and what each one cost</SectionHead>

            {/* Title left, reasoning right: a SplitList. The rule the old
                comment here set still holds, that these read in sequence and
                that a paragraph wants a measure, not the page: two columns of
                unequal paragraphs was the wrong shape, and so was one column
                at 120 characters a line. A row per decision keeps the order
                and puts the paragraph at about 75 (Alejandro, November 2026). */}
            <SplitList className="mt-10" items={decisions} />
            </section>

              {/* Components */}
            <section id="components" className="mt-24" aria-labelledby="components-heading">
            <SectionHead id="components-heading">Components</SectionHead>

            {/* A link rather than the gallery itself. This page is the
                argument; the gallery is the evidence, and the evidence needs
                full width and room to grow as the system does. Keeping them
                apart means neither gets longer at the other's expense. */}
            <TextBlock
              className="mt-8"
              action={
                <Button href="/system/components" variant="primary" iconAfter={<ArrowRight />}>
                  See the components running
                </Button>
              }
            >
              Everything above is reasoning. The components themselves are on their own page, rendered
              live rather than screenshotted, each one next to the decision it embodies and what that
              decision cost. Nothing there is behind a tab, including the Tabs component.
            </TextBlock>
            </section>

              {/* Where to read it */}
            <section id="source" className="mt-24">
            <StorybookPanel eyebrow="Read the source" heading="Every claim on this page is checkable." contrastHref="#contrast">
              The tokens are one file. The components sit next to their own stories, and the stories are
              published. The one picture on this page, below, is of those stories. Everything else is the
              real thing, running in front of you.
            </StorybookPanel>

            </section>
            </div>

            {/* The rail is in the right column and lives in the source order
                AFTER the content, so keyboard and screen-reader users meet the
                page itself first rather than a list of places they could go.
                Which side it sits on is a grid decision; the component does not
                know or care. */}
            {/* No `self-start` here. Letting the grid item stretch is what gives the
                sticky nav inside it a tall containing block to travel down; hugging
                the content collapses that block to 146px and the rail scrolls away
                after one screen. The same sticky trap, from the other side. */}
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
