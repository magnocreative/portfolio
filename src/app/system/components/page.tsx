import type { Metadata } from "next";
import { Container } from "@/design-system/primitives/Container";
import { Breadcrumbs } from "@/design-system/components/Breadcrumbs";
import { SectionNav } from "@/design-system/components/SectionNav";
import { Button } from "@/design-system/components/Button";
import { Tabs } from "@/design-system/components/Tabs";
import { WorkEntry } from "@/design-system/components/WorkEntry";
import { ArrowRight, ArrowLeft, Download, StorybookIcon } from "@/design-system/components/Icon";
import { caseStudies } from "@/content/case-studies";
import { SectionHead } from "@/design-system/components/SectionHead";
import { PageHeader } from "@/design-system/components/PageHeader";
import { TextBlock } from "@/design-system/components/TextBlock";
import { Note } from "@/design-system/components/Note";
import { ThemeToggle } from "@/design-system/components/ThemeToggle";

export const metadata: Metadata = {
  title: "Components",
  description:
    "The component library running live: every component rendered on the page, each next to the decision it embodies and what that decision cost.",
};

/* Why this is a page rather than a tab strip on /system.
 *
 * Tabs were already ruled out of the homepage and the case studies, on the
 * grounds that hiding an argument behind a tab means a reviewer can leave
 * having read a third of it. A component gallery behind tabs is that same
 * failure with better lighting: somebody lands on the first panel, looks at a
 * button, and never learns the theme toggle keeps "match system" alive.
 *
 * So: nothing is hidden here. Every component is rendered in page flow, in
 * sequence, and the only navigation is a rail that moves you faster through
 * content you can already see. Scroll, do not click.
 *
 * A second reason for the sub-route rather than a longer /system: the two
 * pages have different jobs. /system makes the argument. This shows the
 * evidence at full width. Keeping them apart means each can get longer
 * without making the other harder to finish.
 */

const contents = [
  { id: "button", label: "Button" },
  { id: "theme", label: "Theme toggle" },
  { id: "breadcrumbs", label: "Breadcrumbs" },
  { id: "tabs", label: "Tabs" },
  { id: "rail", label: "Section nav" },
  { id: "work-entry", label: "Work entry" },
  { id: "foundations", label: "Foundations" },
];

/** The ground every specimen sits on. One surface, so nothing is flattered by
 *  a background chosen to suit it. `surface-raised` is also the ground the
 *  homepage panel uses, which is where several of these actually appear. */
function Stage({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`mt-8 rounded-sm border border-border-subtle bg-surface-raised p-6 md:p-10 ${className}`}
    >
      {children}
    </div>
  );
}

/** A labelled cell inside a stage. The caption is the state's real name, in
 *  the same label face the rest of the site uses for metadata, so a reader can match
 *  what they are looking at to the prop that produces it. */
function Cell({ caption, children }: { caption: string; children: React.ReactNode }) {
  // Full width on a phone, so the specimen behaves the way the component does
  // in a page: a button there fills its column, and showing it at label width
  // here would document a phone layout the site never uses.
  return (
    <div className="flex w-full flex-col gap-3 sm:w-auto">
      <span className="font-label text-xs uppercase tracking-[0.11em] text-text-tertiary">
        {caption}
      </span>
      <div className="flex items-center">{children}</div>
    </div>
  );
}

/**
 * The way from a section to the same component in Storybook. The page is the
 * argument, curated: each component beside its decision and its cost. Storybook
 * is the evidence: every state, with controls. This link joins the two, so a
 * reader who wants the whole catalog for one component is a tap away from it
 * and the page never has to become a catalog itself (Alejandro, November
 * 2026). Tertiary, with Storybook's mark like every way into it on the site;
 * pulled 20px left so its label lines up with the text above, and its own
 * width on a phone: it closes a section, it is not the section's action.
 */
function StoryLink({ story }: { story: string }) {
  return (
    <Button
      href={`https://storybook.magnocreative.com/?path=/story/${story}`}
      variant="tertiary"
      iconBefore={<StorybookIcon />}
      iconSize="lg"
      fillOnPhone={false}
      className="mt-6 -ml-5"
    >
      Every state in Storybook
    </Button>
  );
}

function Head({ id, title, decision }: { id: string; title: string; decision: string }) {
  return (
    <>
      <SectionHead id={`${id}-heading`}>{title}</SectionHead>
      <TextBlock className="mt-8">{decision}</TextBlock>
    </>
  );
}

export default function ComponentsPage() {
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
              {/* The one page on this site deep enough to need a trail. The
                  top-level pages deliberately do not carry one: a breadcrumb
                  reading "Home / About" states what the nav already shows with
                  a selected state, and if every page has a trail then having
                  one stops meaning you are a level down.

                  The headline is one short claim, set to balance: two even
                  lines at 1440, three below. The two-sentence title it replaced
                  ("Not screenshots of a system. The system, running.") left
                  "Not" alone on the first line on a phone. */}
              <PageHeader
                type="withSectionNav"
                breadcrumb={[{ label: "Design system", href: "/system" }, { label: "Components" }]}
                title="The real components, running live."
                lede="Every component below is the real one, rendered by this page, reading the same tokens as everything else on the site. Change your theme and they all change with it. Each sits next to the decision it embodies and what that decision cost, because a component library that only shows the happy state is a catalog, not a system."
              />

              {/* Button */}
              <section id="button" className="mt-24" aria-labelledby="button-heading">
                <Head
                  id="button"
                  title="Button"
                  decision="Three fills, not two fills and an outline. An outlined secondary sits at
                  almost the same visual weight as a disabled one, competes with every hairline rule
                  on a page built from hairlines, and next to a solid primary it reads as one real
                  button and one ghost. A tint is the same blue at a lower volume, so the pair are
                  obviously one family. The cost is that the tint alone measures about 1.1:1 against
                  the page, so the shape depends on a hairline that reaches only 1.9:1, under the 3:1
                  non-text bar. That is a stated trade: what identifies the control is its label at
                  6.35:1 inside a real button element."
                />

                <Stage>
                  <div className="flex flex-wrap items-start gap-x-12 gap-y-8">
                    <Cell caption="primary">
                      <Button variant="primary" iconAfter={<ArrowRight />}>
                        Read the system
                      </Button>
                    </Cell>
                    <Cell caption="secondary">
                      <Button variant="secondary">Request a PDF</Button>
                    </Cell>
                    <Cell caption="tertiary">
                      <Button variant="tertiary" iconBefore={<ArrowLeft />}>
                        Back
                      </Button>
                    </Cell>
                  </div>

                  <div className="mt-10 flex flex-wrap items-start gap-x-12 gap-y-8 border-t border-border-subtle pt-10">
                    <Cell caption="selected">
                      <Button variant="secondary" selected>
                        Selected
                      </Button>
                    </Cell>
                    <Cell caption="disabled">
                      <Button variant="primary" disabled>
                        Unavailable
                      </Button>
                    </Cell>
                    <Cell caption="pill + icon">
                      <Button variant="secondary" shape="pill" iconBefore={<Download />}>
                        Download
                      </Button>
                    </Cell>
                  </div>
                </Stage>

                <Note className="mt-6">
                  Disabled is an explicit fill rather than an opacity. A button dimmed with opacity
                  has a contrast ratio nobody can predict, because it depends on whatever happens to
                  be behind it. An earlier version borrowed the sunken surface for that fill and
                  measured 1.00:1 against a sunken well. Not faint. Gone. It only showed up when the
                  same component was placed on the page, a panel and a well side by side, which is
                  the argument for a gallery like this one.
                </Note>
                <StoryLink story="components-button--states" />
              </section>

              {/* Theme toggle */}
              <section id="theme" className="mt-24" aria-labelledby="theme-heading">
                <Head
                  id="theme"
                  title="Theme toggle"
                  decision="Two controls, not three. Light and dark are two values of one choice, so
                  they share a single switch, and the switch shows the theme it will give you rather
                  than the one you are in, with a name that says the action: Switch to dark theme.
                  Following the system is a different kind of choice, about who decides rather than
                  which theme, so it gets a button of its own. A switch on its own would throw that
                  setting away the first time anyone touched it, and it is the one most people want."
                />

                <Stage>
                  <Cell caption="live, in step with the header">
                    <ThemeToggle />
                  </Cell>
                </Stage>

                <TextBlock className="mt-6">
                  Neither toggle keeps the theme to itself. Both read it from the page, so this one and
                  the one in the header cannot disagree: change either and the other follows. That
                  used to be untrue, and this section described the toggle instead of showing it.
                </TextBlock>

                <Note className="mt-6">
                  The selected state takes the solid interactive fill rather than a tint. A tinted
                  version measured 1.17:1 against the header and 1.17:1 between the selected and
                  unselected icons, which would have rested the whole state on hue. axe passed it.
                  An earlier version was a three-option radiogroup that announced &ldquo;one of
                  three&rdquo; while behaving as three separate tab stops. A static scan cannot see
                  either of those, because both are behavior.
                </Note>
                <StoryLink story="components-themetoggle--default" />
              </section>

              {/* Breadcrumbs */}
              <section
                id="breadcrumbs"
                className="mt-24"
                aria-labelledby="breadcrumbs-heading"
              >
                <Head
                  id="breadcrumbs"
                  title="Breadcrumbs"
                  decision="An ordered list inside a labelled nav, so the hierarchy is in the markup
                  and a screen reader announces the position within it. A row of divs separated by
                  slashes conveys none of that, and it is what most hand-built breadcrumbs are. The
                  last crumb is not a link: it is the page you are on, so it carries aria-current and
                  no href, and therefore no hover state. A hover on something you cannot click is a
                  lie about what happens next. It is also set in the accent blue at semibold, the
                  same treatment the current item in the main navigation carries, so you-are-here
                  reads as one idea across the site. Weight as well as color, because position is a
                  weak cue in a two-item trail, and hue on its own would be the whole state."
                />

                <Stage>
                  <div className="flex flex-col gap-8">
                    <Cell caption="two levels">
                      <Breadcrumbs
                        label="Breadcrumb example, two levels"
                        items={[
                          { label: "Design system", href: "/system" },
                          { label: "Components" },
                        ]}
                      />
                    </Cell>
                    <Cell caption="three levels, long current page">
                      <Breadcrumbs
                        label="Breadcrumb example, three levels"
                        items={[
                          { label: "Work", href: "/work" },
                          { label: "Case studies", href: "/work" },
                          { label: "Self-service portal" },
                        ]}
                      />
                    </Cell>
                  </div>
                </Stage>

                <Note className="mt-6">
                  Not used on the homepage, <code className="font-medium">/about</code>,{" "}
                  <code className="font-medium">/resume</code> or{" "}
                  <code className="font-medium">/system</code>. Those are top level, so a trail
                  there would read &ldquo;Home / About&rdquo; and state what the global nav already
                  shows with a selected state. It would also cost this page the one thing a
                  breadcrumb is for: if every page carries a trail, carrying one stops meaning you
                  are a level down. The second example above also shows why the current crumb
                  truncates at 28ch rather than 22ch. The unit measures the zero glyph and ignores
                  letterspacing, so at this tracking about a fifth of the budget is gaps.
                </Note>
                <StoryLink story="components-breadcrumbs--states" />
              </section>

              {/* Tabs */}
              <section id="tabs" className="mt-24" aria-labelledby="tabs-heading">
                <Head
                  id="tabs"
                  title="Tabs"
                  decision="The full ARIA pattern: roving tabindex so the set is one tab stop, arrow
                  keys to move between tabs, Home and End, and a focusable panel so a keyboard user
                  can reach the content they just revealed. Manual activation, not selection
                  following focus: arrowing through tabs should let you read the labels without
                  swapping the panel underneath you."
                />

                <Stage>
                  <Tabs
                    label="Tabs specimen"
                    tabs={[
                      {
                        id: "activation",
                        label: "Activation",
                        content: (
                          <TextBlock className="py-6">
                            Arrow to another tab and the panel does not change until you press Enter
                            or Space. That is manual activation, and it is the right default when a
                            panel holds more than a line of content.
                          </TextBlock>
                        ),
                      },
                      {
                        id: "indicator",
                        label: "Indicator",
                        content: (
                          <TextBlock className="py-6">
                            An underline rather than a fill. A filled tab is one pill away from
                            looking like a button, and this site already spends three variants
                            teaching a reader what a filled blue rectangle means.
                          </TextBlock>
                        ),
                      },
                      {
                        id: "disabled",
                        label: "Disabled",
                        disabled: true,
                        content: <div />,
                      },
                    ]}
                  />
                </Stage>

                <Note className="mt-6">
                  Deliberately absent from the homepage, the case studies and this page. Tabs hide
                  content behind a click, so a reviewer can leave having read a third of an argument
                  and believing they read all of it. That is an acceptable cost for a settings panel
                  and an unacceptable one for the case this site is making, which is why the
                  components below are in page flow rather than in the component directly above.
                </Note>
                <StoryLink story="components-tabs--states" />
              </section>

              {/* Section nav */}
              <section id="rail" className="mt-24" aria-labelledby="rail-heading">
                <Head
                  id="rail"
                  title="Section nav"
                  decision="Real anchors, not buttons running scrollTo, so a middle click opens a
                  section in a new tab and the URL is shareable. Position is tracked with an
                  IntersectionObserver and announced with aria-current. It takes an orientation and
                  a sticky flag, because the same list is a rail on a wide screen and a strip on a
                  narrow one."
                />

                <Stage>
                  <Cell caption="horizontal, not sticky">
                    <SectionNav
                      items={contents.slice(0, 4)}
                      orientation="horizontal"
                      label="Section nav specimen"
                    />
                  </Cell>
                  <TextBlock className="mt-8">
                    This one is live and tracking the real sections of this page, so scrolling moves
                    the current item in both it and the rail on the right. Two instances, two
                    different <code className="font-medium">label</code> values, which is what
                    that prop is for: two nav landmarks sharing a name are two doors with the same
                    sign.
                  </TextBlock>
                </Stage>

                <Note className="mt-6">
                  The vertical rail has no <code className="font-medium">self-start</code> on
                  its grid cell, and that omission is load bearing. Letting the cell stretch gives
                  the sticky element inside it a tall block to travel down; hugging the content
                  collapses that block to the rail&rsquo;s own height and the rail scrolls away after
                  one screen. The same trap in reverse to the one that put section spacing in margin
                  rather than padding, so{" "}
                  <code className="font-medium">scroll-margin-top</code> lands an anchor on the
                  right line.
                </Note>
                <StoryLink story="components-sectionnav--states" />
              </section>

              {/* Work entry */}
              <section
                id="work-entry"
                className="mt-24"
                aria-labelledby="work-entry-heading"
              >
                <Head
                  id="work-entry"
                  title="Work entry"
                  decision="One row of the work index: a raised card with the image at 40%, held 16px
                  from the card's top, bottom and left edge, and the record at 60%. The index and the
                  facts open the record, and a footer bar closes it with the status, so the row says
                  whether it can be opened before anyone tries. Narrower than 64rem, as here, the
                  image stacks above the record; on a phone the card runs to the screen's edges, like
                  the résumé cards."
                />

                <Stage>
                  <WorkEntry study={caseStudies[1]} index={1} />
                </Stage>

                <Note className="mt-6">
                  This is the fourth shape the index has had. A four-column text row came first and
                  left the metadata floating about 350px right of each summary. A two-column card grid
                  replaced it and was shorter, but gave each study half the page and no room for an
                  image. The row came back with an image slot, so each study gets the full width and
                  something to look at besides text. Then the rows became cards, in the snug inset
                  the home page's panel already used, so the list and the panel read as one family. Each image will be a visual from its case
                  study, made for this site, never a screen: the screens belong to the companies that
                  paid for them.
                </Note>
                <StoryLink story="components-workentry--the-index" />
              </section>

              {/* Foundations */}
              <section
                id="foundations"
                className="mt-24"
                aria-labelledby="foundations-heading"
              >
                <Head
                  id="foundations"
                  title="Foundations"
                  decision="Color, type and spacing are not repeated here. They live on the system
                  page with the contrast measured live in your browser, and duplicating them would
                  create a second source of truth that drifts from the first. A design system with
                  two swatch tables has a bug in it already."
                />

                <div className="mt-8 flex flex-wrap gap-4">
                  <Button href="/system#tiers" variant="secondary" iconAfter={<ArrowRight />}>
                    Three tiers
                  </Button>
                  <Button href="/system#contrast" variant="secondary" iconAfter={<ArrowRight />}>
                    Contrast, measured
                  </Button>
                  <Button href="/system#decisions" variant="secondary" iconAfter={<ArrowRight />}>
                    Decisions
                  </Button>
                </div>

                <TextBlock
                  className="mt-10"
                  action={
                    <Button href="https://storybook.magnocreative.com" variant="secondary" iconBefore={<StorybookIcon />} iconSize="lg">
                      Open it in Storybook
                    </Button>
                  }
                >
                  Every state of every component, including the ones that are wrong on purpose, lives
                  in Storybook alongside the source, published at storybook.magnocreative.com. The
                  stories use sample content, so nothing there is waiting to be written.
                </TextBlock>
              </section>
            </div>

            {/* Rail in the right column, after the content in source order, so
                keyboard and screen reader users meet the page before the list
                of places they could go. */}
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
