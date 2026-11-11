import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Logo } from "@/design-system/brand/Logo";
import { HclLogo, JpmcLogo, M7Logo, SwbcLogo, UiwLogo, UsaaLogo } from "@/design-system/brand/OrgLogos";
import { caseStudies } from "@/content/case-studies";
import { BriefcaseIcon } from "@/design-system/components/Icon";
import {
  background,
  backgroundLabel,
  email,
  experience,
  lede,
  linkedin,
  location,
  name,
  relocation,
  site,
  skills,
  subtitle,
} from "@/content/resume";

/**
 * The source of the résumé PDF: the same content as /resume, set as a US
 * Letter document. Not linked from anywhere and not in the sitemap; the
 * download on /resume is the file this page prints to, made by
 * `npm run resume:pdf` (scripts/resume-pdf.mjs).
 *
 * Why a separate layout rather than printing /resume: the page is built for a
 * screen, with cards, a 900px measure and a contents rail. A résumé on paper
 * wants real text an applicant tracking system can read, sized in points, with
 * each employer kept together across the page break.
 *
 * Rail is the résumé (Alejandro, November 2026). The other two stay, picked
 * with `?layout=` (RESUME_LAYOUT for the script), for comparison:
 *   classic  one column, logos and bullets hung in the margin so every line
 *            of text starts on one left edge
 *   rail     a left rail of section names; everything else in one column
 *   sidebar  experience in the main column, the short sections in a column
 *            beside it
 * All three share the rule that makes a page read as aligned: one left edge
 * for text, one right edge for dates, and nothing that sits between the two.
 *
 * Its own small stylesheet, scoped to `.sheet`, because print sizes do not
 * belong on the site's type scale. Every color is a semantic token, and the
 * sheet pins `color-scheme: light`, so `light-dark()` resolves to the paper
 * values even when the site is in its dark theme.
 *
 * The phone number is never in this file or the repository. The script fills
 * the empty `data-phone` slot only when it is given one, for the copy sent to
 * a person; the public download has none.
 */
export const metadata: Metadata = {
  title: "Résumé PDF",
  robots: { index: false, follow: false },
};

const LAYOUTS = ["classic", "rail", "sidebar"] as const;
type Layout = (typeof LAYOUTS)[number];

const LOGOS = { jpmc: JpmcLogo, usaa: UsaaLogo, hcl: HclLogo, uiw: UiwLogo, swbc: SwbcLogo, m7: M7Logo };
const bare = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "");

const css = `
.sheet{color-scheme:light;background:var(--surface-raised);color:var(--text-secondary);font-family:var(--font-sans);font-size:9.4pt;line-height:1.5;width:8.5in;margin:2rem auto 4rem;padding:.6in .7in .7in;box-shadow:0 0 0 1px var(--border-subtle)}
.sheet a{color:var(--text-accent);text-decoration:none}
.sheet b{font-weight:500;color:var(--text-primary)}
.sheet .label{font-size:7.4pt;font-weight:500;letter-spacing:.11em;text-transform:uppercase;color:var(--text-tertiary);line-height:1.5}
.sheet h1{white-space:nowrap;font-size:20pt;font-weight:600;letter-spacing:-.02em;line-height:1.1;color:var(--text-primary)}
.sheet .sub{margin-top:3pt;font-size:10pt}
.sheet .mark{width:34pt;height:auto;flex:none}
.sheet .contact{font-size:8.4pt;line-height:1.6;white-space:nowrap}
.sheet .lede{display:flex;flex-direction:column;gap:6pt;font-size:9.6pt;line-height:1.6}
.sheet .orghead{display:flex;align-items:center;gap:8pt;break-after:avoid}
.sheet .logo{width:20pt;height:20pt;flex:none}
.sheet .orgname{font-size:12.5pt;font-weight:600;letter-spacing:-.01em;line-height:1.2;color:var(--text-primary)}
.sheet .org{break-inside:avoid}
.sheet .org+.org{margin-top:13pt}
.sheet .role{margin-top:8pt}
.sheet .rolehead{display:flex;justify-content:space-between;align-items:baseline;gap:12pt;break-after:avoid}
.sheet .title{font-size:10.4pt;font-weight:500;color:var(--text-primary)}
.sheet ul{list-style:none;margin-top:5pt;display:flex;flex-direction:column;gap:4.5pt}
.sheet li{position:relative;break-inside:avoid}
.sheet li::before{content:"";position:absolute;left:-9pt;top:.62em;width:3.6pt;height:3.6pt;border-radius:50%;background:var(--border-strong)}
.sheet .work p+p{margin-top:8pt}
.sheet .edu{display:flex;align-items:center;gap:8pt}
.sheet .edu .edutext{flex:1}
.sheet .edu>.label{align-self:flex-start;padding-top:2pt}
.sheet .edu+.edu{margin-top:7pt}
.sheet .tile{width:20pt;height:20pt;flex:none;display:flex;align-items:center;justify-content:center;border:.75pt solid var(--border-subtle);border-radius:4pt;color:var(--text-secondary)}
.sheet .tile svg{width:12pt;height:12pt}

/* Classic: one column. The logo and the bullet dots hang in the margin, so
   the employer name, the role, the bullets and the section text all start on
   the same left edge as the name. */
.l-classic .top{display:flex;justify-content:space-between;align-items:flex-end;gap:24pt;padding-bottom:14pt;border-bottom:.75pt solid var(--border-subtle)}
.l-classic .who{position:relative}
.l-classic .who .mark{position:absolute;right:calc(100% + 9pt);top:50%;transform:translateY(-50%);width:28pt}
.l-classic .contact{text-align:right}
.l-classic .lede{margin-top:13pt}
.l-classic .sec{margin-top:18pt}
.l-classic .sec>.label{display:flex;align-items:center;gap:10pt;margin-bottom:10pt}
.l-classic .sec>.label::after{content:"";flex:1;border-top:.75pt solid var(--border-subtle)}
.l-classic .orghead,.l-classic .edu{margin-left:-28pt}
.l-classic .orgloc{margin-left:auto}
.l-classic .rolehead{padding-bottom:4pt;border-bottom:.75pt solid var(--border-subtle)}
.l-classic .skills{display:grid;grid-template-columns:118pt 1fr;row-gap:6pt;column-gap:12pt}
.l-classic .skills dt{font-weight:500;color:var(--text-primary)}
.l-classic.sheet{padding-left:.95in;padding-right:.7in}

/* Rail: a 1.3in column of section names down the left. Every block of text
   starts on the second column's edge; dates end on the right edge. */
.l-rail .top{display:grid;grid-template-columns:1.3in 1fr auto;column-gap:16pt;align-items:end;padding-bottom:14pt;border-bottom:.75pt solid var(--border-subtle)}
.l-rail .top .mark{width:40pt;justify-self:start;align-self:center}
.l-rail .contact{text-align:right}
.l-rail .sec{display:grid;grid-template-columns:1.3in 1fr;column-gap:16pt;margin-top:16pt}
.l-rail .sec>.label{padding-top:2pt}
.l-rail .sec.profile{margin-top:14pt}
.l-rail .orgloc{margin-left:auto}
.l-rail .rolehead{padding-bottom:3pt;border-bottom:.75pt solid var(--border-subtle)}
.l-rail .sec+.sec{padding-top:14pt;border-top:.75pt solid var(--border-subtle)}
.l-rail .skills{display:grid;grid-template-columns:110pt 1fr;row-gap:6pt;column-gap:12pt}
.l-rail .skills dt{font-weight:500;color:var(--text-primary)}
.l-rail ul{margin-left:9pt}

/* Sidebar: experience in a wide main column, the short sections in a narrow
   one to its right, a hairline between. The header runs across both. */
.l-sidebar .top{display:flex;align-items:center;gap:12pt;padding-bottom:14pt;border-bottom:.75pt solid var(--border-subtle)}
.l-sidebar .cols{display:grid;grid-template-columns:1fr 1.85in;column-gap:22pt;margin-top:14pt}
.l-sidebar aside{border-left:.75pt solid var(--border-subtle);padding-left:16pt;font-size:8.6pt;line-height:1.5}
.l-sidebar aside .sec{break-inside:avoid}
.l-sidebar aside .sec+.sec{margin-top:16pt}
.l-sidebar aside .sec>.label{display:block;margin-bottom:6pt}
.l-sidebar aside .contact{white-space:normal}
.l-sidebar aside .nobr{white-space:nowrap}
.l-sidebar .main .sec{margin-top:16pt}
.l-sidebar .main .sec>.label{display:block;margin-bottom:8pt}
.l-sidebar .orgloc{display:block;margin-top:1pt}
.l-sidebar .orghead{align-items:flex-start}
.l-sidebar .rolehead{padding-bottom:3pt;border-bottom:.75pt solid var(--border-subtle)}
.l-sidebar ul{margin-left:9pt}
.l-sidebar .skills dt{font-weight:500;color:var(--text-primary)}
.l-sidebar .skills dd{margin-bottom:6pt}
.l-sidebar .edu{align-items:flex-start}
.l-sidebar .edu .label{display:block;margin-top:1pt}

@media print{
  body>header,body>div>footer{display:none!important}
  body{background:none}
  .sheet{width:auto;margin:0;padding:0 0 0 .55in!important;box-shadow:none;-webkit-print-color-adjust:exact;print-color-adjust:exact}
}`;

function Contact({ stacked = false }: { stacked?: boolean }) {
  return (
    <div className="contact">
      {location}
      {stacked ? <br /> : ", "}
      {stacked ? relocation : relocation.toLowerCase()}
      <br />
      <a href={`mailto:${email}`}>{email}</a>
      <span data-phone hidden />
      <br />
      <a href={linkedin}>
        {bare(linkedin).replace(/\/in\/.*/, "/in/")}
        <wbr />
        <span className="nobr">{bare(linkedin).replace(/.*\/in\//, "")}</span>
      </a>
      <br />
      <a href={site}>{bare(site)}</a>
    </div>
  );
}

function Section({ label, className = "", children }: { label: string; className?: string; children: ReactNode }) {
  return (
    <section className={`sec ${className}`}>
      <h2 className="label">{label}</h2>
      <div className="body">{children}</div>
    </section>
  );
}

function Lede() {
  return (
    <div className="lede">
      {lede.map((p) => (
        <p key={p.slice(0, 24)}>{p}</p>
      ))}
    </div>
  );
}

function Work({ brief = false }: { brief?: boolean }) {
  return (
    <>
      {caseStudies
        .filter((s) => s.status === "published")
        .map((s) => (
          <p key={s.slug}>
            <b>{s.title}.</b>
            {brief ? null : <> {s.standfirst}</>}
            <br />
            <a href={`${site}/work/${s.slug}`}>
              {bare(site)}/work/
              <wbr />
              {s.slug}
            </a>
          </p>
        ))}
    </>
  );
}

function Experience({ locationUnder = false }: { locationUnder?: boolean }) {
  return (
    <>
      {experience.map((org) => {
        const Mark = LOGOS[org.logo];
        return (
          <div key={org.id} className="org">
            <div className="orghead">
              <Mark className="logo" />
              {locationUnder ? (
                <div>
                  <div className="orgname">{org.employer}</div>
                  <span className="label orgloc">{org.location}</span>
                </div>
              ) : (
                <>
                  <span className="orgname">{org.employer}</span>
                  <span className="label orgloc">{org.location}</span>
                </>
              )}
            </div>
            {org.roles.map((role) => (
              <div key={role.title} className="role">
                <div className="rolehead">
                  <span className="title">{role.title}</span>
                  <span className="label">{role.period}</span>
                </div>
                <ul>
                  {role.bullets.map((b) => (
                    <li key={b.slice(0, 40)}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );
      })}
    </>
  );
}

/* The page shows skills as chips, where each one starts with a capital. Run
   together in a sentence that reads "Component architecture, Design tokens",
   so after the first item each starts lowercase, unless its second letter is
   a capital (AI, WCAG). Tools are all names, so they keep theirs. */
function sentence(group: string, items: string[]) {
  if (group === "Tools") return items.join(", ");
  return items
    .map((item, i) => (i > 0 && /^[A-Z][a-z]/.test(item) ? item[0].toLowerCase() + item.slice(1) : item))
    .join(", ");
}

function Skills() {
  return (
    <dl className="skills">
      {skills.map((s) => (
        <div key={s.group} style={{ display: "contents" }}>
          <dt>{s.group}</dt>
          <dd>{sentence(s.group, s.items)}</dd>
        </div>
      ))}
    </dl>
  );
}

/* Education and early career: the earlier roles and the degree as one pair
   of rows, newest first. A row with no logo gets the briefcase in an outlined
   tile the logo's size, so both rows keep one left edge. */
function Background() {
  return (
    <>
      {background.map((e) => {
        const Mark = e.logo ? LOGOS[e.logo] : null;
        return (
          <div key={e.title} className="edu">
            {Mark ? (
              <Mark className="logo" />
            ) : (
              <span className="tile" aria-hidden="true">
                <BriefcaseIcon />
              </span>
            )}
            <div className="edutext">
              <b>{e.title}</b>
              <br />
              {e.detail}
            </div>
            <span className="label">{e.period}</span>
          </div>
        );
      })}
    </>
  );
}

const hasWork = caseStudies.some((s) => s.status === "published");

export default async function ResumePrint({
  searchParams,
}: {
  searchParams: Promise<{ layout?: string; work?: string }>;
}) {
  const params = await searchParams;
  const layout: Layout = LAYOUTS.includes(params.layout as Layout) ? (params.layout as Layout) : "rail";
  const showWork = hasWork && params.work !== "off";

  let body: ReactNode;
  if (layout === "sidebar") {
    body = (
      <>
        <header className="top">
          <Logo className="mark" />
          <div>
            <h1>{name}</h1>
            <p className="sub">{subtitle}</p>
          </div>
        </header>
        <div className="cols">
          <div className="main">
            <Lede />
            <Section label="Experience">
              <Experience locationUnder />
            </Section>
          </div>
          <aside>
            <Section label="Contact">
              <Contact stacked />
            </Section>
            {showWork && (
              <Section label="Selected work" className="work">
                <Work brief />
              </Section>
            )}
            <Section label="Skills">
              <Skills />
            </Section>
            <Section label={backgroundLabel}>
              <Background />
            </Section>
          </aside>
        </div>
      </>
    );
  } else {
    body = (
      <>
        <header className="top">
          {layout === "rail" && <Logo className="mark" />}
          <div className="who">
            {layout === "classic" && <Logo className="mark" />}
            <h1>{name}</h1>
            <p className="sub">{subtitle}</p>
          </div>
          <Contact />
        </header>
        {layout === "rail" ? (
          <Section label="Profile" className="profile">
            <Lede />
          </Section>
        ) : (
          <Lede />
        )}
        {showWork && (
          <Section label="Selected work" className="work">
            <Work />
          </Section>
        )}
        <Section label="Experience">
          <Experience />
        </Section>
        <Section label="Skills">
          <Skills />
        </Section>
        <Section label={backgroundLabel}>
          <Background />
        </Section>
      </>
    );
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <article className={`sheet l-${layout}`}>{body}</article>
    </>
  );
}
