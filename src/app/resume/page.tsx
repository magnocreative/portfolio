import type { Metadata } from "next";
import { Container } from "@/design-system/primitives/Container";
import { Button } from "@/design-system/components/Button";
import { SectionHead } from "@/design-system/components/SectionHead";
import { Card } from "@/design-system/components/Card";
import { PageHeader } from "@/design-system/components/PageHeader";
import { HclLogo, JpmcLogo, UiwLogo, UsaaLogo } from "@/design-system/brand/EmployerLogos";
import { Download } from "@/design-system/components/Icon";
import {
  education,
  email,
  experience,
  lede,
  linkedin,
  location,
  name,
  pdfFile,
  prior,
  relocation,
  skills,
  subtitle,
} from "@/content/resume";

const LOGOS = { jpmc: JpmcLogo, usaa: UsaaLogo, hcl: HclLogo, uiw: UiwLogo };

export const metadata: Metadata = {
  title: "Résumé",
  description:
    "Alejandro Magno Fernandini, experience designer. Ten years across design systems and complex operational tools at JPMorganChase, USAA and HCL Technologies.",
};

/* Every row on this page is capped at the 900px measure, headers included.
   The first version let the employer, location, role and date rows run the
   full container while the bullets stopped at the measure, so each date floated
   roughly three hundred pixels right of the text it belonged to. axe passed it,
   because alignment is not an accessibility failure. It read as two columns
   that had come apart.

   The marker is a drawn dot rather than the bullet character, so its size,
   color and height are chosen instead of inherited from the font. 6px in
   border-strong, quiet beside the text, centered on the first line's
   lowercase letters. */
function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-4">
      <span aria-hidden="true" className="mt-[0.66em] h-1.5 w-1.5 shrink-0 rounded-full bg-border-strong" />
      <span className="text-base leading-[1.65] text-text-secondary">{children}</span>
    </li>
  );
}


export default function Resume() {
  return (
    <>

      <main>
        <Container>
          {/* No contents nav. The page has three sections and Experience is
              two thirds of it, so the list mostly said "you are in Experience"
              (Alejandro, November 2026). A résumé is read top to bottom or
              downloaded; the contents lists stay on the long pages with many
              sections, the case studies and /system. Every row is capped at
              the measure, so the space to the right stays open. */}
          <div>
            <div className="min-w-0">
          {/* No phone number on a public page. It goes on the copy that gets
              sent to a person, where it reaches one reader rather than every
              scraper. */}
          <PageHeader
            type="resume"
            eyebrow="Résumé"
            title={name}
            subtitle={subtitle}
            meta={
              <>
                <span>{location}</span>
                <span>{relocation}</span>
              </>
            }
            lede={lede}
            actions={
              // Where to reach me sits with what to do, not in the facts line
              // above. The facts line says where I am; this row is every way
              // to act on it. Four spaced-capital items, two of them underlined
              // links, made the line above the busiest thing in the header.
              // On a phone the primary takes the full width and the two
              // secondaries split the row under it, so they read as a pair of
              // equal targets rather than two words left hanging. Secondary,
              // not tertiary: a bare word in half a row looked unfinished.
              <div className="grid grid-cols-2 gap-x-2 gap-y-3 sm:flex sm:flex-wrap sm:items-center">
                {/* A file, not a request. It used to open an email asking for
                    the PDF, which put a person between a recruiter and a page
                    they could already read. The download carries no phone
                    number; the copy sent to a person does (see
                    scripts/resume-pdf.mjs). */}
                <Button
                  href={`/${pdfFile}`}
                  download={pdfFile}
                  variant="primary"
                  iconBefore={<Download />}
                  className="col-span-2"
                >
                  Download PDF
                </Button>
                <Button href={`mailto:${email}`} variant="secondary">
                  Email
                </Button>
                <Button href={linkedin} variant="secondary">
                  LinkedIn
                </Button>
              </div>
            }
          />

        {/* Experience */}
          <section id="experience" className="mt-28" aria-labelledby="experience-heading">
            <SectionHead id="experience-heading" className="max-w-measure">Experience</SectionHead>

            {/* One card per employer, 16px apart. The cards carry the
                separation the space used to: 64px of air between employers
                read as quiet, and lines read as busy. The border does the
                separating, so the gap only has to keep two edges apart; at
                24 the run from one card's last bullet to the next logo was
                88px, which read as a section break. */}
            <div className="mt-10 flex flex-col gap-4">
              {experience.map((org) => {
                const Logo = LOGOS[org.logo];
                return (
                <Card as="article" bleed key={org.employer} id={org.id} className="max-w-measure">
                  {/* The mark, then the name with the location under it. The
                      location describes the employer, so it sits with the
                      name rather than out at the right edge, where it stacked
                      with the role dates into two lines of spaced capitals.
                      That leaves the right edge to the dates alone. The block
                      is always two lines, so the mark is 48 at every width and
                      centered on both lines. */}
                  <div className="flex max-w-measure items-center gap-3">
                    <Logo className="h-12 w-12 shrink-0" />
                    <div className="flex min-w-0 flex-col gap-1">
                      <h3 className="font-display text-2xl leading-[1.2] tracking-[-0.015em] text-text-primary">
                        {org.employer}
                      </h3>
                      <span className="font-label text-xs uppercase tracking-[0.11em] text-text-tertiary">
                        {org.location}
                      </span>
                    </div>
                  </div>

                  {org.roles.map((role) => (
                    <div key={role.title} className="mt-8">
                      <div className="flex max-w-measure flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-border-subtle pb-3">
                        <h4 className="font-display text-lg leading-[1.3] text-text-primary">
                          {role.title}
                        </h4>
                        <span className="font-label text-xs uppercase tracking-[0.11em] text-text-tertiary">
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
                </Card>
                );
              })}

              {/* Not a card: earlier roles are one line, not a section, and
                  a card around one sentence is all frame. 40px more than the
                  gap between cards, so it reads as a coda rather than a
                  fourth employer. */}
              <div className="mt-10 max-w-measure">
                <span className="font-label text-xs uppercase tracking-[0.11em] text-text-tertiary">
                  {prior.label}
                </span>
                <p className="mt-3 text-base leading-[1.65] text-text-secondary">{prior.text}</p>
              </div>
            </div>
          </section>

        {/* Skills */}
          <section id="skills" className="mt-28" aria-labelledby="skills-heading">
            <SectionHead id="skills-heading" className="max-w-measure">Skills</SectionHead>

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
          <section id="education" className="mt-28" aria-labelledby="education-heading">
            <SectionHead id="education-heading" className="max-w-measure">Education</SectionHead>

            <div className="mt-10 flex flex-col gap-8">
              {education.map((item) => {
                const Mark = item.logo ? LOGOS[item.logo] : null;
                return (
                  // The school's mark sits where an employer's does: 48px,
                  // centered on the two lines beside it, so Education reads as
                  // the same kind of row as the cards above it, not a list. On
                  // a phone the title wraps and the year drops under it, so the
                  // mark holds to the top, beside the degree it belongs to.
                  <div key={item.title} className="flex max-w-measure items-start gap-3 sm:items-center">
                    {Mark && <Mark className="h-12 w-12 shrink-0" />}
                    <div className="flex min-w-0 flex-1 flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                      <div>
                        <div className="font-display text-lg leading-[1.3] text-text-primary">
                          {item.title}
                        </div>
                        <div className="mt-1 text-base text-text-secondary">{item.detail}</div>
                      </div>
                      <span className="font-label text-xs uppercase tracking-[0.11em] text-text-tertiary">
                        {item.period}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
            </div>

          </div>
        </Container>
      </main>
    </>
  );
}
