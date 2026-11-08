import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isHiddenDraft } from "@/content/case-studies";
import { Container } from "@/design-system/primitives/Container";
import { Button } from "@/design-system/components/Button";
import { ArrowRight } from "@/design-system/components/Icon";
import { SectionNav } from "@/design-system/components/SectionNav";
import { SectionHead } from "@/design-system/components/SectionHead";
import { PageHeader } from "@/design-system/components/PageHeader";
import { TextBlock } from "@/design-system/components/TextBlock";
import { KeyValueList } from "@/design-system/components/KeyValueList";
import { Figure } from "@/design-system/components/Figure";

export const metadata: Metadata = {
  title: "A system you can inspect",
  description:
    "Every design system I've owned lives behind an employer's login. So I built one in the open, in code and in Figma, and documented every decision with what it cost.",
};

/* The first case study, and the template for the rest. It follows the six
   beats in the storytelling guide (stakes, constraint, decision, evidence,
   outcome, hindsight) as sections down one page with a sticky contents list,
   never tabs: a reviewer skimming in forty seconds has to be able to find the
   constraint and the hindsight without clicking for them.

   The decision beat is split into the three ideas the case rests on: the
   reasoning is the system (DNA), design and code read one source (contract),
   and it changes on purpose (evolution). Each one names what it cost.

   Every number here is checkable on this site or in the published Figma
   library. The one bracketed passage is the self-service portal outcome,
   which Alejandro supplies in a shape that is safe to share. */

// Labels are the section headings verbatim, as on About.
const contents = [
  { id: "problem", label: "The problem" },
  { id: "constraint", label: "The constraint" },
  { id: "decisions", label: "What I decided" },
  { id: "evidence", label: "Evidence" },
  { id: "outcome", label: "What happened" },
  { id: "hindsight", label: "What I’d do differently" },
];

export default function SystemCaseStudy() {
  // A draft is readable on localhost and answers not found once deployed.
  if (isHiddenDraft("a-system-you-can-inspect")) notFound();

  return (
    <main>
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_13rem] lg:gap-16">
          <div className="min-w-0">
            <PageHeader
              type="withSectionNav"
              breadcrumb={[{ label: "Work", href: "/work" }, { label: "A system you can inspect" }]}
              title="A system you can inspect, because the ones at work can’t be shown."
              lede="Every design system I’ve owned or maintained lives behind an employer’s login. A reviewer can’t open it, and a screenshot of it isn’t mine to share. So I built the MagnoCreative design system in the open, in code and in Figma, from what those systems taught me. The site you’re reading runs on it."
            />

            <KeyValueList
              className="mt-12 max-w-[36rem]"
              items={[
                { key: "role", value: "Designer and engineer, solo" },
                { key: "period", value: "2026" },
                { key: "scope", value: "Tokens, components, Figma library, documentation" },
                { key: "stack", value: "Next.js, Tailwind CSS, Figma variables" },
                { key: "status", value: "Live: this site runs on it" },
              ]}
            />

            {/* 1. Stakes */}
            <section id="problem" className="mt-28" aria-labelledby="problem-heading">
              <SectionHead id="problem-heading" className="max-w-measure">The problem</SectionHead>
              <TextBlock className="mt-10">
                <p>
                  Most designers meet a design system as a component library: a set of parts that keeps
                  a brand consistent. That is the smallest thing it does. I&rsquo;ve worked beside
                  designers who could place every component and couldn&rsquo;t say how any of them
                  behaved, what they couldn&rsquo;t do, or why they were built the way they were. That
                  gap is where delivery goes wrong.
                </p>
              </TextBlock>

              {/* The thesis, set apart once. It is the claim every later
                  section has to earn. */}
              <p className="mt-10 max-w-measure border-l border-border-rule pl-6 text-xl leading-[1.5] text-text-primary">
                A design system isn&rsquo;t a component library. It&rsquo;s the documented reasoning
                behind every decision the interface makes: how each part behaves, what it can and
                can&rsquo;t do, and why. When design and engineering share that reasoning, what ships
                matches what was designed, costs less to change, and lasts.
              </p>

              <TextBlock className="mt-10">
                <p>
                  When they don&rsquo;t share it, the difference gets paid for later: as rework, as
                  one-off fixes, and as technical debt nobody budgeted for. That cost is the whole case
                  for a design system, and it&rsquo;s the one case I can&rsquo;t show you from my own
                  work. Everything I&rsquo;ve built there is internal, and it stays there.
                </p>
              </TextBlock>
            </section>

            {/* 2. Constraint */}
            <section id="constraint" className="mt-28" aria-labelledby="constraint-heading">
              <SectionHead id="constraint-heading" className="max-w-measure">The constraint</SectionHead>
              <TextBlock className="mt-10">
                <p>Three rules made this harder than building a showcase.</p>
                <p>
                  <strong className="font-medium text-text-primary">Nothing from an employer.</strong> No
                  screens, no component names, no tokens copied from a system I&rsquo;ve worked on.
                  What those systems taught me is in here. Nothing of theirs is.
                </p>
                <p>
                  <strong className="font-medium text-text-primary">It had to run something real.</strong>{" "}
                  A library that only exists in Figma never meets a browser, a phone or a screen
                  reader. This one runs the site you&rsquo;re reading, so every decision is tested by
                  the page it ships on.
                </p>
                <p>
                  <strong className="font-medium text-text-primary">
                    One person on both sides of the handoff.
                  </strong>{" "}
                  I designed it and I built it. There was no engineer to catch a token I fudged and no
                  designer to catch a component I shortcut, so the rules had to be enforced by the
                  structure itself.
                </p>
              </TextBlock>
            </section>

            {/* 3. Decisions: the three ideas, each with its cost */}
            <section id="decisions" className="mt-28" aria-labelledby="decisions-heading">
              <SectionHead id="decisions-heading" className="max-w-measure">What I decided</SectionHead>

              <TextBlock className="mt-10" heading="The reasoning is the system">
                <p>
                  Every component ships with the reasoning behind it: how it behaves, what it
                  can&rsquo;t do, and what choosing it cost. The components page shows each one live
                  beside that reasoning, and the Figma library carries the same notes on a spec sheet
                  for every component.
                </p>
                <p>
                  Tabs are a good example. They&rsquo;re built properly, with the full keyboard
                  pattern, and this page doesn&rsquo;t use them. Hidden content isn&rsquo;t scanned,
                  searched or printed, and a reviewer skimming a case study shouldn&rsquo;t have to
                  click to find the argument. Knowing when not to use a component is part of the
                  component.
                </p>
                <p>
                  The cost: nothing ships without writing. A component takes longer to finish when
                  finishing means explaining it.
                </p>
              </TextBlock>

              <TextBlock className="mt-16" heading="Design and code read one source">
                <p>
                  The tokens come in three tiers, in dependency order: raw values, then the roles that
                  give them meaning, then the components. A component may never reach past the roles to
                  a raw value. Figma mirrors the same tiers as variables, under the same names.
                </p>
                <p>
                  That rule is what makes change cheap. When I softened the site&rsquo;s darkest text
                  from near-black to a dark gray, it was one line in the tokens and one variable in
                  Figma, and every page and every component followed on both sides.
                </p>
                <p>
                  The cost is discipline. A component can&rsquo;t borrow a raw color because it would
                  be quicker, even when it would be.
                </p>
              </TextBlock>

              <TextBlock className="mt-16" heading="It changes on purpose, and it’s measured">
                <p>
                  A system that can&rsquo;t change becomes the thing people work around, so changes
                  here are deliberate and reversible. When the left navigation rail stopped earning its
                  240 pixels, I retired it instead of deleting it. It&rsquo;s one setting away from
                  coming back, in code and in Figma.
                </p>
                <p>
                  Quality is measured, not asserted. Every text color is checked for contrast in the
                  browser, against the surface it renders on, and the results are published on the
                  design system page. Primary text measures 16.69:1.
                </p>
                <p>
                  The cost is that measurement isn&rsquo;t enough on its own. Twice the numbers passed
                  on type that was clearly too faint, so every change still gets looked at, not just
                  checked.
                </p>
              </TextBlock>
            </section>

            {/* 4. Evidence: each caption is a claim the image proves */}
            <section id="evidence" className="mt-28" aria-labelledby="evidence-heading">
              <SectionHead id="evidence-heading" className="max-w-measure">Evidence</SectionHead>

              <div className="mt-10 flex flex-col gap-14">
                <Figure
                  alt="The Button spec sheet from the Figma library: thirty variants in a labelled grid above a properties table."
                  caption="Thirty variants and eight properties on one sheet, drawn from the component itself, so the documentation can’t quietly drift from the thing it documents."
                />
                <Figure
                  alt="The same spec sheet twice, in the light theme and the dark theme, side by side."
                  caption="The same sheet in both themes. Nothing was recolored by hand: one variable mode switches the sheet and every component on it."
                />
                <Figure
                  alt="The color primitives in Figma: blue, paper and slate ramps, each step labelled with its value."
                  caption="Raw values, named by step and used by nothing except the semantic roles. A component that wants a color has to ask for a role."
                />
                <Figure
                  alt="The live Button on the components page beside its Figma counterpart, in the same state."
                  caption="The component in the browser and in Figma, side by side. Same states, same names, same tokens underneath."
                />
              </div>

              <TextBlock
                className="mt-14"
                action={
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-3">
                    <Button href="/system" variant="primary" iconAfter={<ArrowRight />}>
                      Read the system
                    </Button>
                    <Button href="/system/components" variant="secondary">
                      See the components
                    </Button>
                  </div>
                }
              >
                The rest you can check yourself. The tokens, the contrast measurements and every
                component are live on this site.
              </TextBlock>
            </section>

            {/* 5. Outcome */}
            <section id="outcome" className="mt-28" aria-labelledby="outcome-heading">
              <SectionHead id="outcome-heading" className="max-w-measure">What happened</SectionHead>
              <TextBlock className="mt-10">
                <p>
                  The site runs on it: 128 variables across six collections, 23 text styles, and 18
                  components in code, mirrored by 44 in Figma, where the repeating parts, like a tab or a
                  table row, are pieces of their own.
                </p>
                <p>
                  It has already carried two changes that usually mean a rebuild. Moving the main
                  navigation from a left rail to the top bar was one setting. Softening the darkest
                  text across the whole site was one token.
                </p>
                <p>
                  At work, the same approach is shaping the self-service portal: [what the portal
                  replaced, who uses it now, and the outcome, in a shape that&rsquo;s safe to share].
                  That case study tells the full story.
                </p>
              </TextBlock>
            </section>

            {/* 6. Hindsight */}
            <section id="hindsight" className="mt-28" aria-labelledby="hindsight-heading">
              <SectionHead id="hindsight-heading" className="max-w-measure">
                What I&rsquo;d do differently
              </SectionHead>
              <TextBlock className="mt-10">
                <p>
                  I&rsquo;d generate the documentation from the components on the first day. For
                  months I wrote the Figma notes by hand, and they drifted: some still named a typeface
                  the site no longer used, and one gave the old spacing on the same day I changed it.
                  The spec sheets are now built from the components themselves, so bringing them up to
                  date is one step instead of a rewrite.
                </p>
                <p>
                  Documentation that depends on someone remembering to update it is a second source of
                  truth, and the second one is always the one that&rsquo;s wrong.
                </p>
              </TextBlock>
            </section>
          </div>

          {/* Desktop only, as on About: on a phone the contents list would
              push the title down the first screen. */}
          <div className="hidden lg:block lg:mt-32">
            <SectionNav items={contents} orientation="vertical" sticky label="On this page" />
          </div>
        </div>
      </Container>
    </main>
  );
}
