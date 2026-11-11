import type { Metadata } from "next";
import { Container } from "@/design-system/primitives/Container";
import { Button } from "@/design-system/components/Button";
import { SectionHead } from "@/design-system/components/SectionHead";
import { Card } from "@/design-system/components/Card";
import { PageHeader } from "@/design-system/components/PageHeader";
import { HclLogo, JpmcLogo, M7Logo, SwbcLogo, UiwLogo, UsaaLogo } from "@/design-system/brand/OrgLogos";
import { HistoryRow } from "@/design-system/components/HistoryRow";
import {
  BriefcaseIcon,
  ComponentsIcon,
  Download,
  GlobeIcon,
  PenNibIcon,
  TerminalIcon,
  TexasIcon,
  WrenchIcon,
} from "@/design-system/components/Icon";
import { PointCards } from "@/design-system/components/PointCards";
import { Chips } from "@/design-system/components/Chips";
import {
  background,
  backgroundLabel,
  email,
  experience,
  lede,
  linkedin,
  location,
  name,
  pdfFile,
  relocation,
  skills,
  subtitle,
} from "@/content/resume";

const SKILL_ICONS: Record<string, typeof ComponentsIcon> = {
  "Design systems": ComponentsIcon,
  "Product design": PenNibIcon,
  "Design engineering": TerminalIcon,
  Tools: WrenchIcon,
};

const LOGOS = { jpmc: JpmcLogo, usaa: UsaaLogo, hcl: HclLogo, uiw: UiwLogo, swbc: SwbcLogo, m7: M7Logo };

export const metadata: Metadata = {
  title: "Résumé",
  description:
    "Alejandro Magno Fernandini, experience designer. Ten years across design systems and complex operational tools at JPMorganChase, USAA and HCL Technologies.",
};

/* The page is built like the Work index: prose (the header)
   stops at the 900px measure, and the cards take the full width and split it,
   the employer on the left and the roles on the right. A role's title and its
   dates share one row inside the roles column, so a date always sits at the
   end of the line it belongs to. (The first version let the date rows run the
   full container while the bullets stopped at the measure, and each date
   floated three hundred pixels from its text.)

   The marker is a drawn dot rather than the bullet character, so its size,
   color and height are chosen instead of inherited from the font. 6px in
   border-strong, quiet beside the text, centered on the first line's
   lowercase letters. */
/* A location keeps its last city and its state on one line. "On-site at
   USAA, San Antonio, Texas" wrapped in the employer column as "San Antonio,"
   over "Texas"; now it breaks before the city, if it breaks at all
   (Alejandro, November 2026). Only the last city: "San Antonio and Plano,
   Texas" held whole ran past a 320px screen, so it may break before "Plano". */
function Place({ text }: { text: string }) {
  const parts = text.split(", ");
  const state = parts.pop() ?? "";
  const cities = parts.pop() ?? "";
  const lead = cities.lastIndexOf(" and ");
  const city = lead >= 0 ? cities.slice(lead + 5) : cities;
  const note = parts.length ? parts.join(", ") + ", " : "";
  return (
    <>
      {note}
      {lead >= 0 && cities.slice(0, lead + 5)}
      <span className="whitespace-nowrap">{city ? `${city}, ${state}` : state}</span>
    </>
  );
}

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
                {/* Where he is and where he would go, each with its mark:
                    the state for home, the globe for anywhere. Tertiary like
                    the words. 20px: the glyphs are drawn inside a 14-unit ink
                    box, so at 16 they read about 11px, smaller than the
                    capitals beside them (Alejandro, November 2026). */}
                <span className="inline-flex items-center gap-1.5">
                  <TexasIcon className="h-5 w-5 shrink-0" />
                  {location}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <GlobeIcon className="h-5 w-5 shrink-0" />
                  {relocation}
                </span>
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
                <Card as="article" bleed key={org.employer} id={org.id} className="@container">
                  {/* Built like the Work index: the card takes the full width
                      and splits it, the employer on the left and the roles on
                      the right, instead of a 900px card with the right of the
                      page left empty (Alejandro, November 2026). The split
                      follows the card's own width (56rem); narrower, it stacks
                      as before, the mark beside the name. The roles column is
                      about 860px at 1440, so bullets keep a readable line. */}
                  <div className="grid grid-cols-1 @4xl:grid-cols-[17rem_minmax(0,1fr)] @4xl:gap-x-12">
                    {/* The mark, then the name with the location under it. The
                        location describes the employer, so it sits with the
                        name, which leaves the right edge to the dates alone. */}
                    <div className="flex items-center gap-4 @4xl:flex-col @4xl:items-start">
                      <Logo className="h-12 w-12 shrink-0" />
                      <div className="flex min-w-0 flex-col gap-1">
                        <h3 className="font-display text-2xl leading-[1.2] tracking-[-0.015em] text-text-primary">
                          {org.employer}
                        </h3>
                        <span className="font-label text-xs uppercase tracking-[0.11em] text-text-tertiary">
                          <Place text={org.location} />
                        </span>
                      </div>
                    </div>

                    <div>
                      {org.roles.map((role, i) => (
                        <div key={role.title} className={i === 0 ? "mt-8 @4xl:mt-0" : "mt-8"}>
                          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-border-subtle pb-3">
                            <h4 className="font-display text-lg leading-[1.3] text-text-primary">
                              {role.title}
                            </h4>
                            <span className="font-label text-xs uppercase tracking-[0.11em] text-text-tertiary">
                              {role.period}
                            </span>
                          </div>

                          <ul className="mt-5 flex flex-col gap-4">
                            {role.bullets.map((bullet) => (
                              <Bullet key={bullet.slice(0, 40)}>{bullet}</Bullet>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
                );
              })}
            </div>
          </section>

        {/* Skills */}
          <section id="skills" className="mt-28" aria-labelledby="skills-heading">
            <SectionHead id="skills-heading" className="max-w-measure">Skills</SectionHead>

            {/* The four groups two by two across the full width, each in a
                card with its mark on the title's line and its skills as
                borderless chips: the same component as the constraints in the
                design system case study. Open, on the bare page, the chips
                were one step from the ground and everything blended; the card
                groups each set and gives the chips something to sit on
                (Alejandro, November 2026). A phone stacks them. */}
            <PointCards
              layout="grid"
              header="inline"
              className="mt-10"
              items={skills.map((s) => ({
                icon: SKILL_ICONS[s.group] ?? ComponentsIcon,
                title: s.group,
                body: <Chips items={s.items} />,
              }))}
            />
          </section>

        {/* Education and early career */}
          <section id="background" className="mt-28" aria-labelledby="background-heading">
            <SectionHead id="background-heading" className="max-w-measure">{backgroundLabel}</SectionHead>

            {/* Rows, not cards: each is one line, and a card built for roles
                and bullets looked empty around it (Alejandro, November 2026).
                The earlier roles used to close Experience as a one-line coda
                and the degree stood alone here; as a pair they read as where
                the career starts. */}
            <div className="mt-10 flex flex-col gap-8">
              {background.map((item) => (
                <HistoryRow
                  key={item.title}
                  logo={item.logo ? LOGOS[item.logo] : undefined}
                  icon={BriefcaseIcon}
                  title={item.title}
                  detail={item.detail}
                  period={item.period}
                />
              ))}
            </div>
          </section>
            </div>

          </div>
        </Container>
      </main>
    </>
  );
}
