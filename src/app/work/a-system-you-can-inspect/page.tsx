import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isHiddenDraft } from "@/content/case-studies";
import { Container } from "@/design-system/primitives/Container";
import { Button } from "@/design-system/components/Button";
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseOffIcon,
  BrowserCheckIcon,
  CalendarIcon,
  CodeIcon,
  HandoffIcon,
  RoleIcon,
  ScopeIcon,
} from "@/design-system/components/Icon";
import { SectionNav } from "@/design-system/components/SectionNav";
import { SectionHead } from "@/design-system/components/SectionHead";
import { CaseStudyHero } from "@/design-system/components/CaseStudyHero";
import { RevealAfter } from "@/design-system/components/RevealAfter";
import { TextBlock } from "@/design-system/components/TextBlock";
import { FactsPanel } from "@/design-system/components/FactsPanel";
import { Tag } from "@/design-system/components/Tag";
import navigationRail from "@/assets/evidence/navigation-rail.png";
import navigationTop from "@/assets/evidence/navigation-top.png";
import contrastMeasured from "@/assets/evidence/contrast-measured.png";
import buttonSheetLight from "@/assets/evidence/button-sheet-light.png";
import buttonSheetDark from "@/assets/evidence/button-sheet-dark.png";
import oneSource from "@/assets/evidence/one-source.png";
import { Figure } from "@/design-system/components/Figure";
import { CompareSlider } from "@/design-system/components/CompareSlider";
import { OutcomeStats } from "@/design-system/components/OutcomeStats";
import { PointCards } from "@/design-system/components/PointCards";

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
   library. The self-service portal is stated as in progress, with no
   numbers: it goes live in February 2027, and its outcome belongs in its
   own case study once it is measured. Revisit this paragraph then. */

// Labels are the section headings verbatim, as on About.
const contents = [
  { id: "problem", label: "The problem" },
  { id: "constraint", label: "The constraint" },
  { id: "decisions", label: "What I decided" },
  { id: "evidence", label: "Evidence" },
  { id: "outcome", label: "What happened" },
  { id: "hindsight", label: "What I’d do differently" },
];

/* The hero's art, rendered live rather than exported: one color through its
   three tiers, the same story as the cover, stood upright so it fits beside
   the title. It is the system drawing itself, so it follows the theme. The
   swatch reads the primitive directly, which no component may do; that is the
   point of showing it, and why this lives in the page and not the library. */
function TokenChain() {
  const tier = "font-label text-xs font-medium uppercase tracking-[0.14em] text-text-tertiary";
  const link = (
    <span className="flex flex-col items-center gap-0" aria-hidden="true">
      <span className="h-12 border-l-2 border-dashed border-border-strong" />
      <span className="-mt-1 h-2.5 w-2.5 rounded-full bg-border-strong" />
    </span>
  );
  return (
    <div className="flex flex-col items-center gap-4">
      <span className={tier}>Primitive</span>
      <span className="h-28 w-28 rounded-lg" style={{ background: "var(--p-blue-600)" }} />
      <span className="font-display text-xl text-text-primary">blue/600</span>
      {link}
      <span className={tier}>Role</span>
      <span className="flex items-center gap-3 rounded-md border border-border-subtle bg-surface-raised px-5 py-3.5">
        <span className="h-4 w-4 rounded-full bg-interactive" />
        <span className="text-lg text-text-primary">interactive/default</span>
      </span>
      {link}
      <span className={tier}>Component</span>
      <Button href="/system" variant="primary" fillOnPhone={false} iconAfter={<ArrowRight />}>
        Read the system
      </Button>
    </div>
  );
}

/* The ground under it: a faint dotted canvas, the part that fades and the
   part that fills a wide screen. */
function DottedGround() {
  return (
    <div
      className="h-full w-full"
      style={{
        backgroundImage: "radial-gradient(var(--border-default) 1.2px, transparent 1.6px)",
        backgroundSize: "28px 28px",
      }}
    />
  );
}

export default function SystemCaseStudy() {
  // A draft is readable on localhost and answers not found once deployed.
  if (isHiddenDraft("a-system-you-can-inspect")) notFound();

  return (
    <main>
      <CaseStudyHero
        breadcrumb={[{ label: "Work", href: "/work" }, { label: "A system you can inspect" }]}
        title="A system you can inspect, because the ones at work can’t be shown."
        lede="Every design system I’ve owned or maintained lives behind an employer’s login. A reviewer can’t open it, and a screenshot of it isn’t mine to share. So I built the MagnoCreative design system in the open, in code and in Figma, from what those systems taught me. The site you’re reading runs on it."
        art={<DottedGround />}
        subject={<TokenChain />}
      />

      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_13rem] lg:gap-16">
          <div className="min-w-0">
            {/* The measure, like the text and figures below, so the page
                keeps one right edge. */}
            <FactsPanel
              className="mt-8 max-w-measure xl:mt-0"
              status={<Tag tone="live">Live on this site</Tag>}
              items={[
                { key: "Role", value: "Designer and engineer, solo", icon: RoleIcon },
                { key: "Period", value: "2026", icon: CalendarIcon },
                { key: "Scope", value: "Tokens, components, Figma library, documentation", icon: ScopeIcon },
                { key: "Stack", value: "Next.js, Tailwind CSS, Figma variables", icon: CodeIcon },
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
              </TextBlock>
              {/* Three parallel rules, so three cards rather than three run-in
                  paragraphs: a reviewer sees the shape of the constraint
                  before reading a word of it. */}
              <PointCards
                className="mt-8"
                items={[
                  {
                    icon: BriefcaseOffIcon,
                    title: "No employer material",
                    body: "No screens, component names or tokens from any system I’ve worked on. What those systems taught me is here. Nothing of theirs is.",
                  },
                  {
                    icon: BrowserCheckIcon,
                    title: "It runs a real site",
                    body: "A Figma-only library never meets a browser, a phone or a screen reader. This one runs the site you’re reading, so every decision gets tested.",
                  },
                  {
                    icon: HandoffIcon,
                    title: "Both sides of the handoff",
                    body: "I designed it and I built it. With no engineer or designer to catch a shortcut, the structure itself had to enforce the rules.",
                  },
                ]}
              />
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

              {/* In the order the decisions are argued: the reasoning, the
                  one source, the change made on purpose, the measurement.
                  The first two are exported from Figma (page "Case study
                  evidence" in Components); the last two are this site,
                  rendered. */}
              <div className="mt-10 flex flex-col gap-14">
                {/* Live rather than a still split: the claim is that one mode
                    switches the whole sheet, so the reader switches it. */}
                <Figure caption="Thirty variants and the reasoning behind them on one sheet, drawn from the component itself. One variable mode switches the sheet and every button on it between themes. Drag to compare.">
                  <CompareSlider
                    label="Compare the Button sheet in the light and dark themes"
                    before={{
                      src: buttonSheetLight,
                      label: "Light",
                      alt: "The Button spec sheet from the Figma library in the light theme: a header with the component's purpose, then thirty variants in a grid labelled by variant, shape and state.",
                    }}
                    after={{
                      src: buttonSheetDark,
                      label: "Dark",
                      alt: "The same sheet in the dark theme, with every surface, label and button recolored by the variable mode.",
                    }}
                  />
                </Figure>
                <Figure
                  src={oneSource}
                  alt="The token for the darkest text, in code above Figma. In tokens.css, --text-primary points at --p-paper-900 in the light theme and --p-slate-100 in the dark. In the Figma variables panel, text primary is paper/900 under Light and slate/100 under Dark, outlined."
                  caption="The darkest text, softened in one place. The role is defined once in code and once in Figma, under the same name and pointing at the same raw value, so one change carries to both."
                />
                <Figure caption="The navigation moved from a side rail to the top bar with one setting, NAV_LAYOUT. The rail is retired, not deleted, and comes back the same way. Drag to compare.">
                  <CompareSlider
                    label="Compare the home page with the side rail and with the top bar"
                    before={{
                      src: navigationRail,
                      label: "Rail",
                      alt: "The home page with the navigation in a rail down the left side: Work, Design system, About and Résumé, each with an icon.",
                    }}
                    after={{
                      src: navigationTop,
                      label: "Top bar",
                      alt: "The same home page with the four links in the top bar beside the theme control, and the content across the full width.",
                    }}
                  />
                </Figure>
                <Figure
                  src={contrastMeasured}
                  alt="The contrast table from the design system page: four text colors, each with its hex value, its ratio measured against the page, and an AA or AAA result. Primary text measures 16.69:1."
                  caption="Every text color checked in the browser against the surface it renders on, and published on the design system page. Primary text measures 16.69:1."
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
                    {/* Third and quietest: it leaves the site. Every state of
                        every component, published on its own domain. */}
                    <Button href="https://storybook.magnocreative.com" variant="tertiary" iconAfter={<ArrowUpRight />}>
                      Open it in Storybook
                    </Button>
                  </div>
                }
              >
                The rest you can check yourself. The tokens, the contrast measurements and every
                component are live on this site, and every state of every component is in Storybook.
              </TextBlock>
            </section>

            {/* 5. Outcome */}
            <section id="outcome" className="mt-28" aria-labelledby="outcome-heading">
              <SectionHead id="outcome-heading" className="max-w-measure">What happened</SectionHead>
              {/* Outcomes, not sizes. Each one is checkable on this site or
                  in its source: the token and the setting are one line each,
                  and the zero is a search of the components for any color
                  that is not a token (November 2026). */}
              <OutcomeStats
                className="mt-10"
                items={[
                  { value: "1 token", label: "softened the darkest text on every page, in code and in Figma" },
                  { value: "1 setting", label: "moved the navigation from a side rail to the top bar" },
                  { value: "0", label: "hard-coded colors across the 27 components in code" },
                ]}
              />
              <TextBlock className="mt-10">
                <p>
                  The site runs on it: 133 variables across six collections, 25 text styles and 27
                  components in code. Figma mirrors them as 38 components, more than in code because the
                  repeating parts, like a tab or a table row, are pieces of their own, plus 31 icons and
                  logos.
                </p>
                <p>
                  The token and the setting are changes that usually mean a rebuild: softening the
                  darkest text on every page, and moving the main navigation. Here each was a single
                  edit.
                </p>
                <p>
                  At work, the same approach is shaping a self-service portal for four lines of
                  business: one place where teams learn what the platform can do and request changes
                  themselves, instead of asking for them through the CRM. It goes live in February
                  2027, and I&rsquo;ve asked the product owners to plan how its impact will be measured
                  from the first day. That case study will follow, with the numbers.
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
              push the title down the first screen. It waits for the hero:
              faded out (and out of the tab order) while the hero has the
              screen, faded in once the reader is into the content. */}
          <RevealAfter target="hero" className="hidden lg:block">
            <SectionNav items={contents} orientation="vertical" sticky label="On this page" />
          </RevealAfter>
        </div>
      </Container>
    </main>
  );
}
