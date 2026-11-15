import type { Metadata } from "next";
import { Container } from "@/design-system/primitives/Container";
import { DataTable } from "@/design-system/components/DataTable";
import { ContrastAudit } from "@/design-system/components/ContrastAudit";
import { decisions, interactiveRoles, textRoles } from "@/content/system";
import { StorybookPanel } from "./StorybookPanel";
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
  { id: "contrast", label: "Contrast, measured" },
  { id: "decisions", label: "Decisions" },
  { id: "components", label: "Components" },
  { id: "source", label: "Read the source" },
];

/* The three tiers, told by following one real color through them: the
   primary button's blue (Alejandro, November 2026). The rows used to describe
   each tier in the abstract, with "Raw OKLCH ramps" left unexplained and a
   fourth column with no heading. The example column is what makes it a
   story: a value, then the role that names it, then the component that asks
   for the role and never for the value. */
const swatch = (
  <span
    aria-hidden="true"
    className="mt-0.5 inline-block h-4 w-4 shrink-0 rounded-[4px] border border-border-default bg-interactive"
  />
);
const tierRows = [
  {
    key: "primitives",
    n: "01",
    name: "Primitives",
    holds:
      "Raw colors, with no meaning attached. Written in OKLCH, a color format where equal steps in lightness look equal to the eye, so every ramp darkens evenly.",
    example: (
      <span className="flex items-start gap-2">
        {swatch}
        <span>
          <span className="block text-text-primary">--p-blue-600</span>
          <span className="block">#4e729a</span>
        </span>
      </span>
    ),
    who: "Only the roles",
  },
  {
    key: "roles",
    n: "02",
    name: "Roles",
    holds:
      "What a color is for: a raised surface, secondary text, a filled control. A role carries its value for each theme, so a component never asks which theme it is in.",
    example: (
      <span className="flex items-start gap-2">
        {swatch}
        <span>
          <span className="block text-text-primary">--interactive-default</span>
          <span className="block">points to --p-blue-600</span>
        </span>
      </span>
    ),
    who: "Every component",
  },
  {
    key: "component",
    n: "03",
    name: "Component",
    holds: "A value one component needs that no role gives it, declared beside that component.",
    example: (
      <span>
        None. The primary button asks for <span className="whitespace-nowrap">--interactive-default</span>{" "}
        directly.
      </span>
    ),
    who: "Only that component",
  },
];

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
                lede="This site runs on the system documented below. Everything here is live. The swatches are the real tokens, and the contrast figures are measured in your browser as you read them. Switch your device to dark mode and every number here changes with it."
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
              Every color on this site passes through three tiers on its way to the screen. A raw value becomes a
              role, and a component only ever asks for the role. That is why a retheme changes the roles once,
              instead of hunting through components for a stray gray. Follow the primary button&rsquo;s blue down
              the third column.
            </TextBlock>

            {/* A table, because the rows are records and the columns are
                what each record holds, and a column needs a heading to say
                so. Stacked when there is no room: these are sentences, and
                prose read through a sideways scroll is read through a
                letterbox. */}
            <DataTable
              className="mt-10"
              label="The three tiers"
              layout="stack"
              align="top"
              columns={[
                { label: "Tier", width: "w-40" },
                { label: "What it holds" },
                { label: "The button’s blue", width: "w-52" },
                { label: "Who may use it", width: "w-40" },
              ]}
              rows={tierRows.map((t) => ({
                key: t.key,
                cells: [
                  <div key="tier">
                    <div className="font-label text-xs text-text-tertiary">{t.n}</div>
                    <div className="mt-1 font-display text-lg text-text-primary">{t.name}</div>
                  </div>,
                  <p key="holds" className="text-sm leading-[1.6] text-text-secondary">
                    {t.holds}
                  </p>,
                  <div key="example" className="font-label text-xs leading-[1.6] text-text-tertiary">
                    {t.example}
                  </div>,
                  <p key="who" className="text-sm leading-[1.6] text-text-secondary">
                    {t.who}
                  </p>,
                ],
              }))}
            />

            {/* The empty third tier, said plainly, because it is the result:
                no component has needed a value the roles don't give it. */}
            <TextBlock className="mt-8">
              The third tier is empty, and that is the result I wanted: no component has needed a value the roles
              don&rsquo;t already give it.
            </TextBlock>
            </section>

              {/* Live audit */}
            <section id="contrast" className="mt-24" aria-labelledby="contrast-heading">
            <SectionHead id="contrast-heading">Text roles, measured live</SectionHead>
            <TextBlock className="mt-8 mb-10">
              Each token below is painted to a canvas and the resulting pixel read back, then checked against the
              WCAG 2.2 threshold for the size it is actually used at. Small metadata is held to 4.5:1, not the 3:1
              large-text allowance, because it is small.
            </TextBlock>
            <ContrastAudit rows={textRoles} label="Text roles, measured" />

            <TextBlock className="mt-14 mb-8" heading="Interactive fills, at the non-text bar">
              Judged at 3:1 rather than 4.5:1, because a filled control owes its contrast to its own
              label and not to the page behind it. That distinction is why these can be single values:
              the fill is blue-600 in both themes, with a white label in both, and white on it measures
              5.00:1. Watch the hex column stay still while the ratios move when you change the theme.
              Hover and pressed drop below the bar on the dark ground and are marked accordingly:
              transient states carrying labels at 7.46:1 and 10.90:1, shown failing rather than left
              out of the table.
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
              The tokens are one file. The components are next to their own stories, and the stories are
              published. The one picture on this page, below, is of those stories. Everything else is the
              thing itself, and you are looking at it running.
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
