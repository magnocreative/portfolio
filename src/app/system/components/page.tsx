import type { Metadata } from "next";
import { Container, Label } from "@/design-system/primitives/Container";
import { Breadcrumbs } from "@/design-system/components/Breadcrumbs";
import { SectionNav } from "@/design-system/components/SectionNav";
import { Button } from "@/design-system/components/Button";
import { Tabs } from "@/design-system/components/Tabs";
import { WorkEntry } from "@/design-system/components/WorkEntry";
import { ArrowRight, ArrowLeft, Download } from "@/design-system/components/Icon";
import { caseStudies } from "@/content/case-studies";

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
 * button, and never learns the theme control is a real radiogroup.
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
 *  the same mono the rest of the site uses for metadata, so a reader can match
 *  what they are looking at to the prop that produces it. */
function Cell({ caption, children }: { caption: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <span className="font-mono text-xs uppercase tracking-[0.11em] text-text-tertiary">
        {caption}
      </span>
      <div className="flex items-center">{children}</div>
    </div>
  );
}

function Head({ id, title, decision }: { id: string; title: string; decision: string }) {
  return (
    <>
      <div className="border-b border-border-rule pb-4">
        <Label as="h2" className="!text-text-primary">
          <span id={`${id}-heading`}>{title}</span>
        </Label>
      </div>
      <p className="mt-8 max-w-measure text-base leading-[1.7] text-text-secondary">{decision}</p>
    </>
  );
}

/** The note under a specimen. Where a component is deliberately NOT used is
 *  as much a part of a system as where it is, and it is the half nobody
 *  documents. */
function Absent({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-6 max-w-measure border-l border-border-rule pl-5 text-base leading-[1.7] text-text-secondary">
      {children}
    </p>
  );
}

export default function ComponentsPage() {
  return (
    <>

      <main>
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_13rem] lg:gap-16">
            <div>
              <section className="pt-24 pb-4 md:pt-32">
                {/* The one page on this site deep enough to need a trail. The
                    top-level pages deliberately do not carry one: a breadcrumb
                    reading "Home / About" states what the nav already shows
                    with a selected state, and if every page has a trail then
                    having one stops meaning you are a level down. */}
                <Breadcrumbs
                  items={[
                    { label: "Design system", href: "/system" },
                    { label: "Components" },
                  ]}
                />

                <Label className="mt-10">Components</Label>

                <h1 className="text-optical mt-8 max-w-[15ch] font-display text-3xl leading-[1.06] tracking-[-0.025em] text-text-primary text-balance md:text-4xl xl:max-w-[24ch] lg:text-5xl">
                  Not screenshots of a system. The system, running.
                </h1>

                <div className="mt-10 flex max-w-[46rem] gap-6">
                  <div aria-hidden="true" className="w-px shrink-0 bg-interactive" />
                  <p className="text-lg leading-[1.65] text-text-secondary">
                    Every component below is the real one, rendered by this page, reading the same
                    tokens as everything else on the site. Change your theme and they all change with
                    it. Each sits next to the decision it embodies and what that decision cost,
                    because a component library that only shows the happy state is a catalog, not
                    a system.
                  </p>
                </div>
              </section>

              {/* Button */}
              <section id="button" className="scroll-mt-28 mt-24" aria-labelledby="button-heading">
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

                <Absent>
                  Disabled is an explicit fill rather than an opacity. A button dimmed with opacity
                  has a contrast ratio nobody can predict, because it depends on whatever happens to
                  be behind it. An earlier version borrowed the sunken surface for that fill and
                  measured 1.00:1 against a sunken well. Not faint. Gone. It only showed up when the
                  same component was placed on the page, a panel and a well side by side, which is
                  the argument for a gallery like this one.
                </Absent>
              </section>

              {/* Theme toggle */}
              <section id="theme" className="scroll-mt-28 mt-24" aria-labelledby="theme-heading">
                <Head
                  id="theme"
                  title="Theme toggle"
                  decision="Three states, not two. A plain switch silently discards 'follow my
                  system', which is the setting most people actually want and the one they never get
                  back once a binary toggle has been touched. It is built to the ARIA radiogroup
                  pattern rather than merely labelled as one: a single tab stop, arrow keys in both
                  axes, Home and End, and selection following focus the way radios do and listboxes
                  do not."
                />

                <p className="mt-6 max-w-measure text-base leading-[1.7] text-text-secondary">
                  The specimen for this one is in the header, top right of this page, and it is
                  deliberately not duplicated down here. The reason is worth more than the demo would
                  have been: the component holds its own state, so a second instance on the same page
                  would show a different selection from the header the moment either one was used.
                  That is a real constraint, it is named here rather than hidden, and it is on the
                  list to fix.
                </p>
                <p className="mt-5 max-w-measure text-base leading-[1.7] text-text-secondary">
                  Try it with the keyboard instead. Tab to it once, then arrow through. One stop,
                  three options, and the whole page changes under you as you move.
                </p>

                <Absent>
                  The selected option takes the solid interactive fill rather than a tint. A tinted
                  version measured 1.17:1 against the header and 1.17:1 between the selected and
                  unselected icons, which would have rested the entire selected state on hue. axe
                  passed it. For a while this also carried the radiogroup roles while behaving as
                  three separate tab stops with inert arrow keys, which announces &ldquo;one of
                  three&rdquo; and interacts as three of three. A static scan cannot see either of
                  those, because both are behavior.
                </Absent>
              </section>

              {/* Breadcrumbs */}
              <section
                id="breadcrumbs"
                className="scroll-mt-28 mt-24"
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

                <Absent>
                  Not used on the homepage, <code className="font-mono text-sm">/about</code>,{" "}
                  <code className="font-mono text-sm">/resume</code> or{" "}
                  <code className="font-mono text-sm">/system</code>. Those are top level, so a trail
                  there would read &ldquo;Home / About&rdquo; and state what the global nav already
                  shows with a selected state. It would also cost this page the one thing a
                  breadcrumb is for: if every page carries a trail, carrying one stops meaning you
                  are a level down. The second example above also shows why the current crumb
                  truncates at 28ch rather than 22ch. The unit measures the zero glyph and ignores
                  letterspacing, so at this tracking about a fifth of the budget is gaps.
                </Absent>
              </section>

              {/* Tabs */}
              <section id="tabs" className="scroll-mt-28 mt-24" aria-labelledby="tabs-heading">
                <Head
                  id="tabs"
                  title="Tabs"
                  decision="The full ARIA pattern: roving tabindex so the set is one tab stop, arrow
                  keys to move between tabs, Home and End, and a focusable panel so a keyboard user
                  can reach the content they just revealed. Manual activation, not selection
                  following focus, which is the opposite of the theme toggle on purpose. Arrowing
                  through tabs should let you read the labels without swapping the panel underneath
                  you; arrowing through themes should show you each theme."
                />

                <Stage>
                  <Tabs
                    label="Tabs specimen"
                    tabs={[
                      {
                        id: "activation",
                        label: "Activation",
                        content: (
                          <p className="max-w-measure py-6 text-base leading-[1.7] text-text-secondary">
                            Arrow to another tab and the panel does not change until you press Enter
                            or Space. That is manual activation, and it is the right default when a
                            panel holds more than a line of content.
                          </p>
                        ),
                      },
                      {
                        id: "indicator",
                        label: "Indicator",
                        content: (
                          <p className="max-w-measure py-6 text-base leading-[1.7] text-text-secondary">
                            An underline rather than a fill. A filled tab is one pill away from
                            looking like a button, and this site already spends three variants
                            teaching a reader what a filled blue rectangle means.
                          </p>
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

                <Absent>
                  Deliberately absent from the homepage, the case studies and this page. Tabs hide
                  content behind a click, so a reviewer can leave having read a third of an argument
                  and believing they read all of it. That is an acceptable cost for a settings panel
                  and an unacceptable one for the case this site is making, which is why the
                  components below are in page flow rather than in the component directly above.
                </Absent>
              </section>

              {/* Section nav */}
              <section id="rail" className="scroll-mt-28 mt-24" aria-labelledby="rail-heading">
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
                  <p className="mt-8 max-w-measure text-base leading-[1.7] text-text-secondary">
                    This one is live and tracking the real sections of this page, so scrolling moves
                    the current item in both it and the rail on the right. Two instances, two
                    different <code className="font-mono text-sm">label</code> values, which is what
                    that prop is for: two nav landmarks sharing a name are two doors with the same
                    sign.
                  </p>
                </Stage>

                <Absent>
                  The vertical rail has no <code className="font-mono text-sm">self-start</code> on
                  its grid cell, and that omission is load bearing. Letting the cell stretch gives
                  the sticky element inside it a tall block to travel down; hugging the content
                  collapses that block to the rail&rsquo;s own height and the rail scrolls away after
                  one screen. The same trap in reverse to the one that put section spacing in margin
                  rather than padding, so{" "}
                  <code className="font-mono text-sm">scroll-margin-top</code> lands an anchor on the
                  right line.
                </Absent>
              </section>

              {/* Work entry */}
              <section
                id="work-entry"
                className="scroll-mt-28 mt-24"
                aria-labelledby="work-entry-heading"
              >
                <Head
                  id="work-entry"
                  title="Work entry"
                  decision="The card the work index is built from. Its title is capped at 28ch and
                  its standfirst is never truncated, because the standfirst is the argument. Cards in
                  a row share a height through an auto margin on the footer rather than a fixed one,
                  so a longer summary lengthens the row instead of being cut to fit it."
                />

                <Stage>
                  <div className="max-w-[34rem]">
                    <WorkEntry study={caseStudies[1]} index={1} />
                  </div>
                </Stage>

                <Absent>
                  This replaced a full-width row that held up at three entries and broke at four: the
                  metadata columns sat about 350px right of where the summary stopped, so every row
                  carried a hole down its middle. The titles were capped at 22ch at the time, which
                  rendered at 349px inside a 538px card, so every title also stopped short of its own
                  right edge. Both were invisible until there were four of them on a page at once.
                </Absent>
              </section>

              {/* Foundations */}
              <section
                id="foundations"
                className="scroll-mt-28 mt-24"
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

                <p className="mt-10 max-w-measure text-base leading-[1.7] text-text-secondary">
                  Every state of every component, including the ones that are wrong on purpose, lives
                  in Storybook alongside the source. It runs with{" "}
                  <code className="font-mono text-sm">npm run storybook</code> from the repository.
                  It is not published at a URL yet; when it is, each specimen above will link to its
                  own story rather than this paragraph doing the work.
                </p>
              </section>
            </div>

            {/* Rail in the right column, after the content in source order, so
                keyboard and screen reader users meet the page before the list
                of places they could go. */}
            <div className="order-first mt-24 lg:order-none lg:mt-32">
              <SectionNav items={contents} orientation="vertical" sticky label="On this page" />
            </div>
          </div>
        </Container>
      </main>
    </>
  );
}
