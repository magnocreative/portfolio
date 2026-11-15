/**
 * The case study index.
 *
 * Titles are the DECISION, not the project name. "Sixteen applications, and
 * no way to know when any of them would go down" tells a reader what the work was about;
 * "GRC Connect" tells them nothing and asks them to click to find out.
 *
 * A note on what's named here: employers are real, because that's normal and
 * verifiable. Internal system names, product names and screens are not, and
 * never will be — that line is where confidentiality actually sits.
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
      "Every design system I’ve owned lives behind an employer’s login. So I built one in the open, in code and in Figma, from what those systems taught me, and wrote down what every decision cost.",
    disciplines: ["Design systems", "Front-end engineering", "Documentation"],
    employer: "MagnoCreative",
    logo: "magnocreative",
    period: "2026",
    status: "published",
    // Made in the Figma Site file (Thumbnail covers), from the library's own
    // variables and Button: one color through its three tiers, with the
    // ground split light and dark on a slant. The blue holds on both sides.
    cover: {
      src: systemCover,
      alt: "A blue swatch labeled blue/600, joined by a dotted line to a chip labeled interactive/default, and on to a button reading Read the system. The ground is split on a slant, light on the left and dark on the right, and the blue is the same on both sides.",
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
    title: "Sixteen applications, and no way to know when any of them would go down",
    standfirst:
      "Eighty-two people said they didn’t need better applications; they needed to see the system. I argued for building the hub in React instead of Salesforce, and won. I argued for fewer applications, and lost.",
    disciplines: ["Enterprise UX", "Research", "Stakeholder alignment"],
    employer: "USAA",
    logo: "usaa",
    period: "2022",
    status: "published",
    // The hero's own art on the dotted ground, rendered from the page
    // (./diagrams HeroSubject): sixteen tiles by platform above one front
    // door. Made for this site; nothing from USAA.
    cover: {
      src: sixteenCover,
      alt: "Sixteen square tiles in four rows: two rows tinted blue, one row in solid gray outline, one row in dashed outline. A dashed line runs down from them to a single white card with a green status dot, labeled One front door.",
    },
  },
  // Third, and the GRC study's counterpart: there the argument for custom
  // was won, here out of the box was the rule and the argument for going
  // further was lost. From Alejandro's account (November 2026). The
  // application stays unnamed, as the index promises.
  {
    slug: "a-quarter-of-the-fields-gone",
    title: "A quarter of the fields gone, and the users who missed the old system told us which ones",
    standfirst:
      "About 150 auditors were moving off a Salesforce application they had used for years, and the rebuild had to stay out of the box. The users who resisted the change told us which fields to cut. I argued for custom record pages, and lost.",
    disciplines: ["Enterprise UX", "Platform constraints", "Research"],
    employer: "USAA",
    logo: "usaa",
    period: "2021 to 2022",
    status: "published",
    // The hero's own art on the dotted ground, rendered from the page
    // (./diagrams HeroSubject): eight fields, two of them cut, above three
    // short groups. Made for this site; nothing from USAA.
    cover: {
      src: quarterCover,
      alt: "A tall card of eight field rows labeled Salesforce Classic, two of them in dashed outline. A dashed line runs down from it to three small cards side by side, labeled Lightning, out of the box, each with a blue heading bar and two rows.",
    },
  },
];
