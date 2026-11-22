/**
 * The case study index.
 *
 * Titles are the DECISION, not the project name. "Sixteen applications, and
 * no warning before any went down" tells a reader what the work was about;
 * "GRC Connect" tells them nothing and asks them to click to find out.
 *
 * A note on what's named here: employers are real, because that's normal and
 * verifiable. Screens are never shown, only recreated with invented content.
 * Internal product names stay out unless Alejandro decides one is safe to
 * name: GRC Connect, a former employer's internal tool his earlier portfolio
 * already named (November 2026), is the one exception so far.
 */

import type { StaticImageData } from "next/image";
import type { OrgLogo } from "@/design-system/brand/OrgLogos";
// Static imports, so Next reads each cover's real size at build time and
// reserves its box before the bytes arrive.
import systemCover from "@/assets/covers/a-system-you-can-inspect.png";
import sixteenCover from "@/assets/covers/sixteen-applications-one-blind-spot.png";
import quarterCover from "@/assets/covers/a-quarter-of-the-fields-gone.png";

export type CaseStudy = {
  slug: string;
  /** The decision, phrased so it survives being read alone. */
  title: string;
  /** One sentence on the constraint or the trade — never a summary of scope. */
  standfirst: string;
  disciplines: string[];
  employer: string;
  /** The organization's mark, shown beside its name on the card. The same
   *  traced tiles the résumé uses; MagnoCreative for work under its own name. */
  logo: OrgLogo;
  period: string;
  /** Draft entries render marked and unlinked until the writing is done. */
  status: "published" | "draft";
  /**
   * The image beside the entry in the index: a visual from the case study,
   * made for this site. Never a screenshot or anything exported from an
   * employer's tools. Until one exists the index draws a placeholder.
   */
  cover?: { src: StaticImageData | string; alt: string };
};

/**
 * True when a study's page should not be served: it is a draft and this is a
 * production build. Drafts are readable on localhost while they are written
 * and answer not found everywhere else, so placeholder text in an unfinished
 * study can't be reached by guessing its address.
 */
export function isHiddenDraft(slug: string) {
  const study = caseStudies.find((s) => s.slug === slug);
  return !!study && study.status === "draft" && process.env.NODE_ENV !== "development";
}

export const caseStudies: CaseStudy[] = [
  // First, because it is the one study a reader can check in full: the system
  // it describes is the site they are on. Published November 2026. Its portal
  // paragraph says the portal is in progress; revisit it with numbers after
  // the portal goes live in February 2027.
  {
    slug: "a-system-you-can-inspect",
    title: "A system you can inspect, because the ones at work can’t be shown",
    standfirst:
      "Every design system I have owned lives behind an employer’s login. So I built one in the open, in code and in Figma, from what those systems taught me, and wrote down what every decision cost.",
    disciplines: ["Design systems", "Front-end engineering", "Documentation"],
    employer: "MagnoCreative",
    logo: "magnocreative",
    period: "2026",
    status: "published",
    // Rendered from the site's own Logo and tokens (Alejandro, November
    // 2026): the mark leads, its two peaks named as tokens, and the deep one
    // carried across a light-to-dark slant to the button it paints, whose
    // role and reach sit in rows that mirror the swatches. Captured once per
    // theme and joined along the slant.
    cover: {
      src: systemCover,
      alt: "The MagnoCreative mark, two blue mountain peaks forming an M, with its two blues named below: blue/600, the deep peak, and blue/400, the light peak. A dotted line carries the deep blue across a slanted split from a light ground to a dark one, to a larger button reading Read the system; under it, mirroring the swatches, the role interactive/default and every button, link and focus ring.",
    },
  },
  // Second, and the first written in the two halves (What changed, How I got
  // there). Published November 2026 from Alejandro's account. The old
  // standfirst ended on "leadership said no, and they were right", about the
  // one-design-language idea; his account turned that around. He won the
  // argument that mattered to users (build in React, not out of the box) and
  // lost the bigger one (fewer applications), so the standfirst names both.
  {
    slug: "sixteen-applications-one-blind-spot",
    title: "Sixteen applications, and no warning before any went down",
    standfirst:
      "Eighty-two people said they didn’t need better applications; they needed to see the system. I argued for building the hub in React instead of Salesforce, and won. I argued for fewer applications, and lost.",
    disciplines: ["Enterprise UX", "Research", "Stakeholder alignment"],
    employer: "USAA",
    logo: "usaa",
    period: "2022",
    status: "published",
    // The hub itself, edge to edge, rendered from the page's own
    // recreation (./diagrams CoverArt, Alejandro, November 2026). Invented
    // content; nothing from USAA.
    cover: {
      src: sixteenCover,
      alt: "The GRC Connect dashboard, recreated with invented content: a status line reading 1 issue, 2 maintenance windows and 2 updates, a welcome column, the person's applications as cards that say what each is for, one marked for maintenance and one slow to load, each with Launch, and below them the applications available to request.",
    },
  },
  // Third, and the GRC study's counterpart: there the argument for custom
  // was won, here out of the box was the rule and the argument for going
  // further was lost. From Alejandro's account (November 2026). The
  // application stays unnamed.
  {
    slug: "a-quarter-of-the-fields-gone",
    title: "A quarter of the fields gone, picked by the users who resisted",
    standfirst:
      "About 150 auditors were moving off a Salesforce application they had used for years, and the rebuild had to stay out of the box. The users who resisted the change told us which fields to cut. I argued for custom record pages, and lost.",
    disciplines: ["Enterprise UX", "Platform constraints", "Research"],
    employer: "USAA",
    logo: "usaa",
    period: "2021 to 2022",
    status: "published",
    // Lightning in front of Classic, the study's result in one picture,
    // rendered from the page's own recreations (./diagrams CoverArt,
    // Alejandro, November 2026). Invented content; nothing from USAA.
    cover: {
      src: quarterCover,
      alt: "Two recreated screens of the same training record. Behind, Salesforce Classic: tabs in a gray band, the record number over Edit, Delete and Clone buttons, and labels right-aligned beside their values under section strips. In front, Lightning, out of the box: the app bar, the record's header with its icon and highlights, a path from Draft to Submitted, and the record's tabs.",
    },
  },
];
