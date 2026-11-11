import type { Metadata } from "next";
import { Logo } from "@/design-system/brand/Logo";
import { HclLogo, JpmcLogo, UsaaLogo } from "@/design-system/brand/EmployerLogos";
import { caseStudies } from "@/content/case-studies";
import {
  education,
  email,
  experience,
  lede,
  linkedin,
  location,
  name,
  prior,
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
 * wants one column of real text that an applicant tracking system can read,
 * sized in points, with each employer kept together across the page break.
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

const LOGOS = { jpmc: JpmcLogo, usaa: UsaaLogo, hcl: HclLogo };
const bare = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "");

const css = `
.sheet{color-scheme:light;background:var(--surface-raised);color:var(--text-secondary);font-family:var(--font-sans);font-size:9.4pt;line-height:1.5;width:8.5in;margin:2rem auto 4rem;padding:.6in .7in .7in;box-shadow:0 0 0 1px var(--border-subtle)}
.sheet a{color:var(--text-accent);text-decoration:none}
.sheet .label{font-size:7.4pt;font-weight:500;letter-spacing:.11em;text-transform:uppercase;color:var(--text-tertiary)}
.sheet .top{display:flex;justify-content:space-between;align-items:flex-end;gap:24pt;padding-bottom:14pt;border-bottom:.75pt solid var(--border-subtle)}
.sheet .who{display:flex;align-items:center;gap:11pt}
.sheet .mark{width:34pt;height:auto;flex:none}
.sheet h1{white-space:nowrap;font-size:20pt;font-weight:600;letter-spacing:-.02em;line-height:1.1;color:var(--text-primary)}
.sheet .sub{margin-top:3pt;font-size:10pt}
.sheet .contact{text-align:right;font-size:8.4pt;line-height:1.6;white-space:nowrap;flex:none}
.sheet .lede{margin-top:13pt;display:flex;flex-direction:column;gap:6pt;font-size:9.6pt;line-height:1.6}
.sheet section{margin-top:18pt}
.sheet .head{display:flex;align-items:center;gap:10pt;margin-bottom:10pt}
.sheet .head::after{content:"";flex:1;border-top:.75pt solid var(--border-subtle)}
.sheet .org+.org{margin-top:12pt}
.sheet .orghead{display:flex;align-items:center;gap:8pt;break-after:avoid}
.sheet .logo{width:20pt;height:20pt;flex:none}
.sheet .orgname{font-size:12.5pt;font-weight:600;letter-spacing:-.01em;line-height:1.2;color:var(--text-primary)}
.sheet .orgloc{margin-left:auto}
.sheet .role{margin-top:8pt}
.sheet .rolehead{display:flex;justify-content:space-between;align-items:baseline;gap:12pt;padding-bottom:4pt;border-bottom:.75pt solid var(--border-subtle);break-after:avoid}
.sheet .title{font-size:10.4pt;font-weight:500;color:var(--text-primary)}
.sheet ul{list-style:none;margin-top:6pt;display:flex;flex-direction:column;gap:4.5pt}
.sheet li{display:flex;gap:9pt;break-inside:avoid}
.sheet li::before{content:"";flex:none;width:3.6pt;height:3.6pt;border-radius:50%;background:var(--border-strong);margin-top:.62em}
.sheet .prior{margin-top:12pt}
.sheet .prior p,.sheet .work p{margin-top:2pt}
.sheet .work p+p{margin-top:8pt}
.sheet b{font-weight:500;color:var(--text-primary)}
.sheet dl{display:grid;grid-template-columns:118pt 1fr;row-gap:6pt;column-gap:12pt}
.sheet dt{font-weight:500;color:var(--text-primary)}
.sheet .edu{display:flex;justify-content:space-between;align-items:baseline;gap:12pt}
.sheet .edu+.edu{margin-top:7pt}
@media print{
  body>header,body>div>footer{display:none!important}
  body{background:none}
  .sheet{width:auto;margin:0;padding:0;box-shadow:none;-webkit-print-color-adjust:exact;print-color-adjust:exact}
}`;

export default function ResumePrint() {
  const work = caseStudies.filter((s) => s.status === "published");
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <article className="sheet">
        <div className="top">
          <div className="who">
            <Logo className="mark" />
            <div>
              <h1>{name}</h1>
              <p className="sub">{subtitle}</p>
            </div>
          </div>
          <div className="contact">
            {location}, {relocation.toLowerCase()}
            <br />
            <a href={`mailto:${email}`}>{email}</a>
            <span data-phone hidden />
            <br />
            <a href={linkedin}>{bare(linkedin)}</a>
            <br />
            <a href={site}>{bare(site)}</a>
          </div>
        </div>

        <div className="lede">
          {lede.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>

        {work.length > 0 && (
          <section className="work">
            <div className="head">
              <span className="label">Selected work</span>
            </div>
            {work.map((s) => (
              <p key={s.slug}>
                <b>{s.title}.</b> {s.standfirst}
                <br />
                <a href={`${site}/work/${s.slug}`}>
                  {bare(site)}/work/{s.slug}
                </a>
              </p>
            ))}
          </section>
        )}

        <section>
          <div className="head">
            <span className="label">Experience</span>
          </div>
          {experience.map((org) => {
            const Mark = LOGOS[org.logo];
            return (
              <div key={org.id} className="org">
                <div className="orghead">
                  <Mark className="logo" />
                  <span className="orgname">{org.employer}</span>
                  <span className="label orgloc">{org.location}</span>
                </div>
                {org.roles.map((role) => (
                  <div key={role.title} className="role">
                    <div className="rolehead">
                      <span className="title">{role.title}</span>
                      <span className="label">{role.period}</span>
                    </div>
                    <ul>
                      {role.bullets.map((b) => (
                        <li key={b.slice(0, 40)}>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            );
          })}
          <div className="prior">
            <span className="label">{prior.label}</span>
            <p>{prior.text}</p>
          </div>
        </section>

        <section>
          <div className="head">
            <span className="label">Skills</span>
          </div>
          <dl>
            {skills.map((s) => (
              <div key={s.group} style={{ display: "contents" }}>
                <dt>{s.group}</dt>
                <dd>{s.items}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section>
          <div className="head">
            <span className="label">Education</span>
          </div>
          {education.map((e) => (
            <div key={e.title} className="edu">
              <div>
                <b>{e.title}</b>
                <br />
                {e.detail}
              </div>
              <span className="label">{e.period}</span>
            </div>
          ))}
        </section>
      </article>
    </>
  );
}
