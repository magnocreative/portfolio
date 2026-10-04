import type { Metadata } from "next";
import { Container, Label } from "@/design-system/primitives/Container";
import { SectionNav } from "@/design-system/components/SectionNav";
import { Button } from "@/design-system/components/Button";

export const metadata: Metadata = {
  title: "Résumé",
  description:
    "Alejandro Magno Fernandini, experience designer. Ten years across design systems and complex operational tools at JPMorganChase, USAA and HCL Technologies.",
};

/* Dates and titles here must match the Google Doc exactly. They were corrected
   once already: the USAA range originally absorbed the HCL contract, which
   overstated the employment by twenty months and would not have survived an
   employment verification. The title is the title of record, not the
   functional one, for the same reason.

   Periods read "to" rather than an en dash, matching the case study index. */
const experience = [
  {
    employer: "JPMorganChase",
    id: "jpmorganchase",
    location: "Plano, Texas",
    roles: [
      {
        title: "Experience Designer",
        period: "June 2024 to present",
        bullets: [
          "Led design and documentation for the platform’s self-service portal, a reference product other lines of business use to adopt shared CRM patterns. Rated exceeding expectations; partners credited the work with high project impact.",
          "Own and maintain the Salesforce Lightning Design System used by every CRM team in the group: component architecture, auto layout and slot patterns, and the usage documentation designers work from.",
          "Drove the analysis behind the team’s decision to leave Salesforce and build an in-house design system, after the vendor’s platform shift left the existing system unable to meet cross-line-of-business needs.",
          "Replaced static prototypes with coded ones, removing a translation step between design and engineering. Built the workflow, the components and the specification format, established the team’s first version-controlled workspace, and taught both to the team.",
        ],
      },
      {
        title: "Software Engineer",
        period: "November 2022 to June 2024",
        bullets: [
          "Maintained and updated the SQL jobs behind the bank’s submission for the Federal Reserve’s Comprehensive Capital Analysis and Review, the annual stress test that sets how much capital a large bank must hold. Daily run cycle handed to a team in India overnight, working to a fixed month-end delivery date.",
          "Automating parts of the pipeline made it faster and more fragile. Rebuilt the jobs so they stopped breaking, shipping each fix through a verification deployment before production. Stability was the goal, and month-end data went out on schedule.",
        ],
      },
    ],
  },
  {
    employer: "USAA",
    id: "usaa",
    location: "San Antonio and Plano, Texas",
    roles: [
      {
        title: "Designer",
        period: "October 2018 to November 2022",
        bullets: [
          "Designed across governance, risk and compliance, audit, and enterprise reporting: internal platforms where the users are specialists and the cost of a bad interface is measured in rework and missed controls.",
          "Surveyed 82 people across a compliance organization running on sixteen interconnected applications, and found the problem was not the applications. Nobody could tell when any of them was down or in maintenance.",
          "Designed the consolidated status view that replaced checking sixteen systems by hand. Shipped to several hundred staff and still in use, with a feedback channel inside it so what got built next came from the people using it.",
          "Recommended a common design language across all sixteen applications. When platform leadership chose to keep each system’s defaults, redesigned the approach to deliver value without requiring sixteen teams to migrate.",
        ],
      },
    ],
  },
  {
    employer: "HCL Technologies",
    id: "hcl",
    location: "On-site at USAA, San Antonio, Texas",
    roles: [
      {
        title: "Visual Designer",
        period: "February 2017 to October 2018",
        bullets: [
          "Designed web pages for USAA’s public site within the bank team, and prototyped concepts for USAA Labs that directors used to socialize new ideas internally. Converted to a full-time USAA role at the end of the engagement.",
        ],
      },
    ],
  },
];

const skills = [
  {
    group: "Design systems",
    items:
      "Component architecture, design tokens, auto layout and slot patterns, usage documentation, adoption and governance across teams",
  },
  {
    group: "Product design",
    items:
      "Discovery, user research and interviews, information architecture, interaction design, prototyping, accessibility (WCAG)",
  },
  {
    group: "Design engineering",
    items:
      "Coded prototypes, version control and branching workflows, AI-assisted prototyping, design-to-engineering handoff",
  },
  {
    group: "Tools",
    items:
      "Figma, VS Code, Storybook, Salesforce Lightning Design System, Jira, FigJam, Adobe Creative Suite",
  },
];

const education = [
  {
    title: "Bachelor of Fine Arts, Computer Graphic Arts",
    detail: "University of the Incarnate Word",
    period: "2015",
  },
  {
    title: "AWS Certified Cloud Practitioner",
    detail: "Amazon Web Services",
    period: "2023 to 2026",
  },
];

/* Every row on this page is capped at the 900px measure, headers included.
   The first version let the employer, location, role and date rows run the
   full container while the bullets stopped at the measure, so each date floated
   roughly three hundred pixels right of the text it belonged to. axe passed it,
   because alignment is not an accessibility failure. It read as two columns
   that had come apart.

   A hairline rather than a bullet glyph. The site has no dots in it anywhere
   else, and a list marker is a piece of type nobody chose. */
function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-4">
      <span aria-hidden="true" className="mt-[0.72em] h-px w-3 shrink-0 bg-border-strong" />
      <span className="text-base leading-[1.65] text-text-secondary">{children}</span>
    </li>
  );
}

function SectionHead({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-border-rule pb-4">
      <Label as="h2" className="!text-text-primary">
        <span id={id}>{children}</span>
      </Label>
    </div>
  );
}

// Built from `experience` rather than typed out beside it. A hand-kept copy
// of this list is a second place to remember when an employer is added, and
// the one that gets forgotten is always the nav.
const contents = [
  {
    id: "experience",
    label: "Experience",
    children: experience.map((org) => ({ id: org.id, label: org.employer })),
  },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
];

export default function Resume() {
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
          <section className="pt-24 pb-4 md:pt-36">
            <Label>Résumé</Label>

            {/* The name is the h1 here and nowhere else on the site. This page
                is the document, so the document gets its title. */}
            <h1 className="text-optical mt-10 font-display text-4xl leading-[1.06] tracking-[-0.025em] text-text-primary lg:text-5xl">
              Alejandro Magno Fernandini
            </h1>

            <p className="mt-5 max-w-measure text-lg leading-[1.55] text-text-secondary">
              Experience Designer. Design systems and complex operational tools.
            </p>

            {/* No phone number on a public page. It goes on the copy that gets
                sent to a person, where it reaches one reader rather than every
                scraper. */}
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-[0.11em] text-text-tertiary">
              <span>Dallas&ndash;Fort Worth, Texas</span>
              <span>Open to relocation</span>
              <a
                href="mailto:alejandini@gmail.com"
                className="text-text-accent underline decoration-border-strong underline-offset-4 transition-colors duration-[160ms] hover:text-interactive-hover hover:decoration-current"
              >
                alejandini@gmail.com
              </a>
              <a
                href="https://www.linkedin.com/in/alejandro-m-fernandini"
                className="text-text-accent underline decoration-border-strong underline-offset-4 transition-colors duration-[160ms] hover:text-interactive-hover hover:decoration-current"
              >
                LinkedIn
              </a>
            </div>

            <div className="mt-12 flex max-w-[46rem] gap-6">
              <div aria-hidden="true" className="w-px shrink-0 bg-interactive" />
              <p className="text-lg leading-[1.65] text-text-secondary">
                Experience designer with ten years in design and a working engineering background,
                focused on the internal systems people use all day to do difficult work. I own
                design systems, and I build the prototypes that prove a design works before
                engineering commits to it.
              </p>
            </div>

            <div className="mt-8">
              <Button
                href="mailto:alejandini@gmail.com?subject=R%C3%A9sum%C3%A9%20PDF"
                variant="secondary"
              >
                Request a PDF
              </Button>
            </div>
          </section>

        {/* Experience */}
          <section id="experience" className="scroll-mt-28 mt-28" aria-labelledby="experience-heading">
            <SectionHead id="experience-heading">Experience</SectionHead>

            <div className="mt-10 flex flex-col gap-16">
              {experience.map((org) => (
                <article key={org.employer} id={org.id} className="scroll-mt-28">
                  <div className="flex max-w-measure flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <h3 className="font-display text-2xl leading-[1.2] tracking-[-0.015em] text-text-primary">
                      {org.employer}
                    </h3>
                    <span className="font-mono text-xs uppercase tracking-[0.11em] text-text-tertiary">
                      {org.location}
                    </span>
                  </div>

                  {org.roles.map((role) => (
                    <div key={role.title} className="mt-8">
                      <div className="flex max-w-measure flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-border-subtle pb-3">
                        <h4 className="font-display text-lg leading-[1.3] text-text-primary">
                          {role.title}
                        </h4>
                        <span className="font-mono text-xs uppercase tracking-[0.11em] text-text-tertiary">
                          {role.period}
                        </span>
                      </div>

                      <ul className="mt-5 flex max-w-measure flex-col gap-4">
                        {role.bullets.map((bullet) => (
                          <Bullet key={bullet.slice(0, 40)}>{bullet}</Bullet>
                        ))}
                      </ul>
                    </div>
                  ))}
                </article>
              ))}

              <div className="max-w-measure">
                <span className="font-mono text-xs uppercase tracking-[0.11em] text-text-tertiary">
                  Earlier
                </span>
                <p className="mt-3 text-base leading-[1.65] text-text-secondary">
                  Graphic designer and technical illustrator roles at SWBC and Elbit Systems of
                  America, 2013 to 2017.
                </p>
              </div>
            </div>
          </section>

        {/* Skills */}
          <section id="skills" className="scroll-mt-28 mt-28" aria-labelledby="skills-heading">
            <SectionHead id="skills-heading">Skills</SectionHead>

            <dl className="mt-10 flex flex-col gap-8">
              {skills.map((skill) => (
                <div key={skill.group}>
                  <dt className="font-display text-lg leading-[1.3] text-text-primary">
                    {skill.group}
                  </dt>
                  <dd className="mt-2 max-w-measure text-base leading-[1.65] text-text-secondary">
                    {skill.items}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

        {/* Education */}
          <section id="education" className="scroll-mt-28 mt-28" aria-labelledby="education-heading">
            <SectionHead id="education-heading">Education &amp; certification</SectionHead>

            <div className="mt-10 flex flex-col gap-8">
              {education.map((item) => (
                <div
                  key={item.title}
                  className="flex max-w-measure flex-wrap items-baseline justify-between gap-x-6 gap-y-1"
                >
                  <div>
                    <div className="font-display text-lg leading-[1.3] text-text-primary">
                      {item.title}
                    </div>
                    <div className="mt-1 text-base text-text-secondary">{item.detail}</div>
                  </div>
                  <span className="font-mono text-xs uppercase tracking-[0.11em] text-text-tertiary">
                    {item.period}
                  </span>
                </div>
              ))}
            </div>
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
            <div className="hidden lg:block lg:mt-32">
              <SectionNav items={contents} orientation="vertical" sticky label="On this page" />
            </div>
          </div>
        </Container>
      </main>
    </>
  );
}
