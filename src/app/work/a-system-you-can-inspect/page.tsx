import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { isHiddenDraft } from "@/content/case-studies";
import { Button } from "@/design-system/components/Button";
import {
  ArrowRight,
  StorybookIcon,
  BriefcaseOffIcon,
  BrowserCheckIcon,
  CalendarIcon,
  CodeIcon,
  HandoffIcon,
  RoleIcon,
  ScopeIcon,
} from "@/design-system/components/Icon";
import { CaseStudyLayout } from "@/design-system/components/CaseStudyLayout";
import { DottedGround } from "@/design-system/components/CaseStudyHero";
import { CaseStudyBeat, CaseStudyPart } from "@/design-system/components/CaseStudyPart";
import { TextBlock } from "@/design-system/components/TextBlock";
import { FactsPanel } from "@/design-system/components/FactsPanel";
import { Tag } from "@/design-system/components/Tag";
import { ORG_LOGOS } from "@/design-system/brand/OrgLogos";
import navigationRail from "@/assets/evidence/navigation-rail.png";
import navigationTop from "@/assets/evidence/navigation-top.png";
import buttonSheetLight from "@/assets/evidence/button-sheet-light.png";
import buttonSheetDark from "@/assets/evidence/button-sheet-dark.png";
import figmaTextVariables from "@/assets/evidence/figma-text-variables.png";
import { Logo } from "@/design-system/brand/Logo";
import { CodeBlock } from "@/design-system/components/CodeBlock";
import { ContrastAudit } from "@/design-system/components/ContrastAudit";
import { textRoles } from "@/content/system";
import { tokenLine } from "@/content/token-source";
import { Figure } from "@/design-system/components/Figure";
import { CompareSlider } from "@/design-system/components/CompareSlider";
import { OutcomeStats } from "@/design-system/components/OutcomeStats";
import { systemCounts } from "@/content/system-counts";
import { PointCards } from "@/design-system/components/PointCards";
import { LogoRoughs, LogoSketches } from "./logo";

export const metadata: Metadata = {
  title: "A system you can inspect",
  description:
    "Every design system I have owned lives behind an employer's login. So I built one in the open, in code and in Figma, and documented every decision with what it cost.",
};

/* The first case study, moved onto the two halves the storytelling guide
   settled on in November 2026, after the GRC study was written in them:
   What changed (the situation, the result, my role), then How I got there
   (the constraint, the decision, the argument I lost, what I'd do
   differently). The words are the ones the page already had; the order
   changed so the result comes first, and each figure moved into the beat it
   proves instead of an Evidence gallery.

   The decision beat keeps the three ideas the case rests on: the reasoning is
   the system, design and code read one source, and it changes on purpose.
   Each one names what it cost.

   The argument I lost is lost to the evidence, not to a person: a solo
   project has no one to overrule it. The rail was Alejandro's choice
   (November 2026, option A of two).

   Every number here is checkable on this site or in the published Figma
   library. The self-service portal is stated as in progress, with no
   numbers: it goes live in February 2027, and its outcome belongs in its
   own case study once it is measured. Revisit that paragraph then. */

const contents = [
  {
    id: "what-changed",
    label: "What changed",
    children: [
      { id: "situation", label: "The situation" },
      { id: "result", label: "The result" },
      { id: "role", label: "My role" },
    ],
  },
  {
    id: "how",
    label: "How I got there",
    children: [
      { id: "mark", label: "It starts with the mark" },
      { id: "constraint", label: "The constraint" },
      { id: "decision", label: "The decision" },
      { id: "argument", label: "The argument I lost" },
      { id: "differently", label: "What I’d do differently" },
    ],
  },
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

const MagnoLogo = ORG_LOGOS.magnocreative;

export default function SystemCaseStudy() {
  // A draft is readable on localhost and answers not found once deployed.
  if (isHiddenDraft("a-system-you-can-inspect")) notFound();

  return (
    <CaseStudyLayout
      breadcrumb={[{ label: "Work", href: "/work" }, { label: "A system you can inspect" }]}
      title="A system you can inspect, because the ones at work can’t be shown."
      lede="Every design system I have owned or maintained lives behind an employer’s login. A reviewer is unable to open it, and a screenshot of it is not mine to share. So I built the MagnoCreative design system in the open, in code and in Figma, from what those systems taught me. The site you are reading runs on it."
      art={<DottedGround />}
      subject={<TokenChain />}
      contents={contents}
      facts={
        /* The measure, like the text and figures below, so the page keeps
           one right edge. */
        <FactsPanel
          className="mt-8 max-w-measure xl:mt-0"
          status={<Tag tone="live">Live on this site</Tag>}
          /* The counterpart to the GRC study's disclosure: nothing here is
             recreated (Alejandro, November 2026) */
          note="Every picture here is this site, its Figma library or my own sketches, and the contrast table runs live in your browser."
          org={
            <>
              <MagnoLogo mono className="-my-1 h-8 w-8 shrink-0" />
              MagnoCreative
              <span aria-hidden="true" className="opacity-50">
                ·
              </span>
              Personal project
            </>
          }
          items={[
            { key: "Role", value: "Designer and engineer, solo", icon: RoleIcon },
            { key: "Period", value: "2026", icon: CalendarIcon },
            { key: "Scope", value: "Tokens, components, Figma library, documentation", icon: ScopeIcon },
            { key: "Stack", value: "Next.js, Tailwind CSS, Figma variables, Claude Code", icon: CodeIcon },
          ]}
        />
      }
    >
      <CaseStudyPart id="what-changed" eyebrow="Part one" title="What changed" className="mt-28">
        <CaseStudyBeat
          id="situation"
          heading="The situation"
          after={
            <>
              {/* The thesis, set apart once. It is the claim every later
                  beat has to earn. */}
              <p className="max-w-measure border-l border-border-rule pl-6 text-xl leading-[1.5] text-text-primary">
                A design system is not a component library. It is the documented reasoning behind every
                decision the interface makes: how each part behaves, what it can and cannot do, and why. When design and engineering share that reasoning, what ships matches what was
                designed, costs less to change, and lasts.
              </p>
              <TextBlock>
                When they do not share it, the difference gets paid for later: as rework, as one-off fixes,
                and as technical debt nobody budgeted for. That cost is the whole case for a design system,
                and it is the one case I am unable to show you from my own work. Everything I have built
                there is internal, and it stays there.
              </TextBlock>
            </>
          }
        >
          <p>
            Most designers meet a design system as a component library: a set of parts that keeps a
            brand consistent. That is the smallest thing it does. I have worked beside designers who
            could place every component and could not say how any of them behaved, what they could not
            do, or why they were built the way they were. That gap is where delivery goes
            wrong.
          </p>
        </CaseStudyBeat>

        <CaseStudyBeat
          id="result"
          heading="The result"
          after={
            <>
              {/* Outcomes, not sizes. Each one is checkable on this site or
                  in its source: the token and the setting are one line each,
                  and the zero is a search of the components for any color
                  that is not a token (November 2026). */}
              <OutcomeStats
                items={[
                  { value: "1 token", label: "softened the darkest text on every page, in code and in Figma" },
                  { value: "1 setting", label: "moved the navigation from a side rail to the top bar" },
                  { value: "0", label: `hard-coded colors across the ${systemCounts.components} components in code` },
                ]}
              />
              <TextBlock>
                <p>
                  The token and the setting are changes that usually mean a rebuild: softening the darkest
                  text on every page, and moving the main navigation. Here each was a single edit.
                </p>
                <p>
                  It has been tested by its own next case study. When the GRC study needed a new page
                  structure, recreated product screens and a frame that stays light in either theme, they
                  were added as components with stories and Figma counterparts, and this study moved onto
                  them without a rewrite.
                </p>
                <p>
                  At work, the same approach is shaping a self-service portal for four lines of business:
                  one place where teams learn what the platform can do and request changes themselves,
                  instead of asking for them through the CRM. It goes live in February 2027, and I have
                  asked the product owners to plan how its impact will be measured from the first day. That
                  case study will follow, with the numbers.
                </p>
              </TextBlock>
              <Figure caption="The navigation moved from a side rail to the top bar with one setting, NAV_LAYOUT. Drag to compare.">
                <CompareSlider
                  label="Compare the homepage with the side rail and with the top bar"
                  before={{
                    src: navigationRail,
                    label: "Rail",
                    alt: "The homepage with the navigation in a rail down the left side: Work, Design system, About and Résumé, each with an icon.",
                  }}
                  after={{
                    src: navigationTop,
                    label: "Top bar",
                    alt: "The same homepage with the four links in the top bar beside the theme control, and the content across the full width.",
                  }}
                />
              </Figure>
            </>
          }
        >
          {/* The two counts come from the code at build time, like the panel
              on /system. Figma's own counts (variables, text styles,
              components, icons) were listed here until the content pass of
              November 2026: they read as an inventory, and they were written
              down by hand, so they drifted whenever the libraries moved. */}
          <p>
            Today it is {systemCounts.tokens} tokens in one file and {systemCounts.components} components,
            mirrored in a Figma library that uses the same names.
          </p>
        </CaseStudyBeat>

        <CaseStudyBeat id="role" heading="My role">
          <p>
            Designer and engineer, solo. I designed the tokens, components and documentation, built them in
            code and in Figma, and wrote every page that explains them.
          </p>
          <p>
            I built it with Claude Code, an AI coding agent, in a version-controlled repository. I set the
            direction, made the design decisions and reviewed every change; the agent wrote much of the code
            with me.
          </p>
        </CaseStudyBeat>
      </CaseStudyPart>

      <CaseStudyPart id="how" eyebrow="Part two" title="How I got there" className="mt-28">
        {/* Where the system starts (Alejandro, November 2026: tell how the
            logo was made). His own sketches and roughs, from his earlier
            portfolio; the story is his account. It ends where the decision
            picks up: the mark's two blues are the first tokens. */}
        <CaseStudyBeat
          id="mark"
          heading="It starts with the mark"
          after={
            <>
              <Figure
                ratio="auto"
                bare
                caption="Nine of the first sketches: my initials, tried as blocks, scripts and triangles. Select any sketch to see it larger."
              >
                <LogoSketches />
              </Figure>
              <Figure
                ratio="auto"
                bare
                caption="The digital roughs, in the order I made them: mountains, then an M of two peaks, then pencil tips, then the two blue peaks that became the mark."
              >
                <LogoRoughs />
              </Figure>
            {/* The end of the mark's story and the start of the system's
                (Alejandro, November 2026: give the mark a prominent presence,
                annotated, then the tokens after). The mark large and drawn
                live from the site's artwork, each peak labeled with its token
                and value; under it, each token on to the role it fills and,
                for the deep peak, the button it paints. Page code, so it may
                show the primitives by name. */}
            <Figure
              ratio="auto"
              caption="The final mark, and its two peaks as tokens: the deep one is the blue of every button, link and focus ring on this site."
            >
              <div
                role="img"
                aria-label="The final MagnoCreative mark, two blue mountains forming an M, shown large. The deep peak, on the left, is the token blue/600, hex 4E729A; the light peak, on the right, is blue/400, hex 80A2C4. Into the system: blue/600 fills the role interactive/default, the color of a button; blue/400 fills mark/light."
                className="flex flex-col gap-8 p-6 sm:p-10"
              >
                {/* The mark, annotated: a leader from each side to its peak */}
                <span className="grid grid-cols-2 items-center gap-x-4 gap-y-6 sm:grid-cols-[1fr_auto_1fr] sm:gap-x-0">
                  <span className="col-span-2 flex justify-center sm:order-2 sm:col-span-1">
                    <Logo className="h-36 w-auto sm:h-44" title="" />
                  </span>
                  {(
                    [
                      ["--p-blue-600", "Deep peak", "blue/600", "#4E729A", "left"],
                      ["--p-blue-400", "Light peak", "blue/400", "#80A2C4", "right"],
                    ] as const
                  ).map(([v, peak, name, hex, side]) => (
                    <span
                      key={name}
                      className={`flex items-center gap-3 ${
                        side === "left" ? "sm:order-1 sm:flex-row-reverse sm:text-right" : "sm:order-3"
                      }`}
                    >
                      <span aria-hidden="true" className="hidden h-px flex-1 bg-border-strong sm:block" />
                      <span aria-hidden="true" className="hidden h-2 w-2 shrink-0 rounded-full bg-border-strong sm:block" />
                      <span className={`flex flex-col gap-1.5 ${side === "left" ? "sm:items-end" : ""}`}>
                        <span className="font-label text-xs uppercase tracking-[0.11em] text-text-tertiary">{peak}</span>
                        <span className={`flex items-center gap-2 ${side === "left" ? "sm:flex-row-reverse" : ""}`}>
                          <span className="h-6 w-6 shrink-0 rounded-sm" style={{ background: `var(${v})` }} />
                          <span className="text-sm font-medium text-text-primary">{name}</span>
                        </span>
                        <span className="font-label text-xs text-text-tertiary">{hex}</span>
                      </span>
                    </span>
                  ))}
                </span>

                {/* Then into the system: each token on to the role it fills */}
                <span className="flex flex-col gap-3 border-t border-border-subtle pt-6">
                  <span className="font-label text-xs uppercase tracking-[0.11em] text-text-tertiary">
                    Into the system
                  </span>
                  {(
                    [
                      ["--p-blue-600", "blue/600", "interactive/default", true],
                      ["--p-blue-400", "blue/400", "mark/light", false],
                    ] as const
                  ).map(([v, name, role, button]) => (
                    <span key={name} className="flex flex-wrap items-center gap-x-3 gap-y-2">
                      <span className="h-5 w-5 shrink-0 rounded-sm" style={{ background: `var(${v})` }} />
                      <span className="text-sm font-medium text-text-primary">{name}</span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-text-tertiary" />
                      <span className="rounded-sm border border-border-subtle bg-surface-raised px-2.5 py-1 text-sm text-text-primary">
                        {role}
                      </span>
                      {/* The button sample from a tablet up; on a phone the row
                          would wrap it onto a line of its own */}
                      {button && (
                        <span className="hidden items-center gap-3 sm:flex">
                          <ArrowRight className="h-4 w-4 shrink-0 text-text-tertiary" />
                          <Button specimen variant="primary" fillOnPhone={false}>
                            Button
                          </Button>
                        </span>
                      )}
                    </span>
                  ))}
                </span>
              </div>
            </Figure>
            </>
          }
        >
          <p>
            Before the system had a token, it had a mark. I drew it for myself, and I started where
            most personal marks start: with my initials. A page of AF monograms tried every way to join
            the two letters, and none of them said anything about who I am.
          </p>
          <p>
            So I turned to my middle name, Magno, which I almost never use. That is what made it feel
            right for a mark of my own. Magno means great, and mountains fit it, as they fit where I am
            from, the Pacific Northwest. In the digital roughs the mountains became two peaks forming an
            M, and each peak became a pencil tip, for the creative work, with the tip reading as snow.
          </p>
          <p>
            The final mark is two blue peaks, and those two blues are where the system starts. The deep
            peak is blue 600, the color of every button, link and focus ring on this site, and the
            lighter peak is blue 400. The mark sits in the system as two tokens, not as an image beside
            it.
          </p>
        </CaseStudyBeat>

        <CaseStudyBeat
          id="constraint"
          heading="The constraint"
          after={
            /* Three parallel rules, so three cards rather than three run-in
               paragraphs: a reviewer sees the shape of the constraint before
               reading a word of it. */
            <PointCards
              items={[
                {
                  icon: BriefcaseOffIcon,
                  title: "No employer material",
                  body: "No screens, component names or tokens from any system I have worked on. What those systems taught me is here. Nothing of theirs is.",
                },
                {
                  icon: BrowserCheckIcon,
                  title: "It runs a real site",
                  body: "A Figma-only library never meets a browser, a phone or a screen reader. This one ships to all three, so every decision gets tested.",
                },
                {
                  icon: HandoffIcon,
                  title: "Both sides of the handoff",
                  body: "I designed it and directed the build, with an AI coding agent. With no engineer or designer to review it, the structure itself had to enforce the rules.",
                },
              ]}
            />
          }
        >
          <p>Three rules made this harder than building a showcase.</p>
        </CaseStudyBeat>

        <CaseStudyBeat
          id="decision"
          heading="The decision"
          after={
            <>
              {/* The three ideas sit on a rule, indented under the beat, so
                  their headings read as parts of The decision and not as
                  beats of their own: the type is the same size, the
                  structure says the level. */}
              <div className="flex max-w-measure flex-col gap-14 border-l border-border-subtle pl-6 sm:pl-8">
              <TextBlock heading="The reasoning is the system" headingAs="h4">
                <p>
                  Every component ships with the reasoning behind it: how it behaves, what it cannot do,
                  and what choosing it cost. The components page shows each one live beside that
                  reasoning, and the Figma library carries the same notes on a spec sheet for every
                  component.
                </p>
                <p>
                  Tabs are a good example. They are built properly, with the full keyboard pattern, and
                  this page does not use them. Hidden content is not scanned, searched or printed, and a
                  reviewer skimming a case study should not have to click to find the argument.
                  Knowing when not to use a component is part of the component.
                </p>
                <p>
                  The cost: nothing ships without writing. A component takes longer to finish when finishing
                  means explaining it.
                </p>
              </TextBlock>
              {/* Live rather than a still split: the claim is that one mode
                  switches the whole sheet, so the reader switches it. */}
              <Figure caption="Thirty variants and their reasoning on one sheet, drawn from the component. One variable mode switches the whole sheet between themes. Drag to compare.">
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
              <TextBlock heading="Design and code read one source" headingAs="h4">
                <p>
                  The tokens come in three tiers, in dependency order: raw values, then the roles that give
                  them meaning, then the components. A component may never reach past the roles to a raw
                  value. Figma mirrors the same tiers as variables, under the same names.
                </p>
                <p>
                  That rule is what makes change cheap. When I softened the site&rsquo;s darkest text from
                  near-black to a dark gray, it was one line in the tokens and one variable in Figma, and
                  every page and every component followed on both sides.
                </p>
                <p>
                  The cost is discipline. A component cannot borrow a raw color because it would be
                  quicker, even when it would be.
                </p>
              </TextBlock>
              {/* Live, not a picture of a light editor (Alejandro, November
                  2026). The code is quoted from tokens.css when the site
                  builds, so it shows what the file says today, in the
                  site's own colors, and follows the theme. The comment above
                  the primitive says what OKLCH is, where the reader meets
                  it. The Figma panel stays a picture: it is Figma's own
                  interface, dark in both themes, on the figure's sunken
                  ground so it reads as a figure on the light page too. */}
              <Figure
                ratio="auto"
                caption="The darkest text, softened in one place: one role in code and one variable in Figma, under the same name and pointing at the same value. The code is read from the token file."
              >
                <div className="flex flex-col gap-3 p-5 sm:p-8">
                  <span className="font-label text-xs uppercase tracking-[0.11em] text-text-tertiary">
                    Code · tokens.css
                  </span>
                  <CodeBlock
                    lines={[
                      "/* Primitive, in OKLCH: lightness, chroma, hue */",
                      tokenLine("--p-paper-900"),
                      "/* Role: one value per theme */",
                      tokenLine("--text-primary"),
                    ]}
                  />
                  <span className="mt-5 font-label text-xs uppercase tracking-[0.11em] text-text-tertiary">
                    Figma · Color variables, text group
                  </span>
                  <Image
                    src={figmaTextVariables}
                    alt="The Figma variables panel, text group: primary is paper/900 under Light and slate/100 under Dark, outlined; secondary is paper/700 and slate/300."
                    sizes="(min-width: 1024px) 52rem, 100vw"
                    className="h-auto w-full"
                  />
                </div>
              </Figure>
              <TextBlock heading="It changes on purpose, and it’s measured" headingAs="h4">
                <p>
                  A system that cannot change becomes the thing people work around, so changes here are
                  deliberate and reversible.
                </p>
                <p>
                  Quality is measured, not asserted. Every text color is checked for contrast in the browser,
                  against the surface it renders on, and the results are published on the design system
                  page. The table below is that check, running in your browser as you read this: switch
                  your device between light and dark and the figures move with it.
                </p>
                <p>
                  The cost is that measurement is not enough on its own. Twice the numbers passed on
                  type that was clearly too faint, so every change still gets looked at, not just checked.
                </p>
              </TextBlock>
              {/* The table itself, not a screenshot of it (Alejandro, November
                  2026). The screenshot was a light capture that read as a
                  hole in the dark page, and it had already drifted: the
                  table it showed had since gained its frame and its Result
                  column. The figure keeps its sunken ground, so on the light
                  page it reads as a figure and not as more of the page; the
                  table inside it sits on the page surface, because that is
                  the surface every ratio here is measured against. */}
              <Figure
                ratio="auto"
                caption="Every text color, measured in your browser against the page it sits on, as the design system page publishes it."
              >
                <div className="flex flex-col gap-3 p-5 sm:p-8">
                  <span className="font-label text-xs uppercase tracking-[0.11em] text-text-tertiary">
                    From the design system page · Measured live
                  </span>
                  <div className="rounded-sm bg-surface-page">
                    <ContrastAudit rows={textRoles} label="Text roles, measured live" />
                  </div>
                </div>
              </Figure>
              </div>
              <TextBlock
                action={
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-3">
                    <Button href="/system" variant="primary" iconAfter={<ArrowRight />}>
                      Read the system
                    </Button>
                    <Button href="/system/components" variant="secondary">
                      See the components
                    </Button>
                    {/* Third and quietest: it leaves the site. Storybook's
                        mark leads, as LinkedIn's and GitHub's do in the
                        footer, and stands in for the up-right arrow. */}
                    <Button
                      href="https://storybook.magnocreative.com"
                      variant="tertiary"
                      iconBefore={<StorybookIcon />}
                      iconSize="lg"
                    >
                      Open in Storybook
                    </Button>
                  </div>
                }
              >
                The rest you can check yourself. The tokens, the contrast measurements and every component
                are live on this site, and every state of every component is in Storybook.
              </TextBlock>
            </>
          }
        >
          <p>
            I decided the deliverable was the reasoning, not the components, and built three things around
            it. Each has a cost.
          </p>
        </CaseStudyBeat>

        <CaseStudyBeat id="argument" heading="The argument I lost">
          <p>
            A solo project has no one to overrule it, so the argument I lost, I lost to the evidence. I
            built a left navigation rail and argued for it: it kept the sections in view and gave the site
            the feel of a product. On a laptop it cost 240 pixels of every page, and the content it framed
            was mostly reading, which wants width, not chrome.
          </p>
          <p>
            The rail lost. I retired it rather than deleting it, so it is one setting from coming back,
            in code and in Figma.
          </p>
        </CaseStudyBeat>

        <CaseStudyBeat id="differently" heading="What I’d do differently">
          <p>
            I would generate the documentation from the components on the first day. For months I wrote
            the Figma notes by hand, and they drifted: some still named a typeface the site no longer used,
            and one gave the old spacing on the same day I changed it. The spec sheets are now built from
            the components themselves, so bringing them up to date is one step instead of a rewrite.
          </p>
          <p>
            Documentation that depends on someone remembering to update it is a second source of truth, and
            the second one is always the one that is wrong.
          </p>
        </CaseStudyBeat>
      </CaseStudyPart>
    </CaseStudyLayout>
  );
}
