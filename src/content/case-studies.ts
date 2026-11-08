/**
 * The case study index.
 *
 * Titles are the DECISION, not the project name. "Sixteen applications, and
 * no way to know when they'd break" tells a reader what the work was about;
 * "GRC Connect" tells them nothing and asks them to click to find out.
 *
 * A note on what's named here: employers are real, because that's normal and
 * verifiable. Internal system names, product names and screens are not, and
 * never will be — that line is where confidentiality actually sits.
 */

import type { StaticImageData } from "next/image";
// Static imports, so Next reads each cover's real size at build time and
// reserves its box before the bytes arrive.
import systemCover from "@/assets/covers/a-system-you-can-inspect.png";

export type CaseStudy = {
  slug: string;
  /** The decision, phrased so it survives being read alone. */
  title: string;
  /** One sentence on the constraint or the trade — never a summary of scope. */
  standfirst: string;
  disciplines: string[];
  employer: string;
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
  // it describes is the site they are on. Draft until the self-service portal
  // outcome is written in and the four evidence images are exported from the
  // Figma library; the page itself already builds at /work/a-system-you-can-inspect.
  {
    slug: "a-system-you-can-inspect",
    title: "A system you can inspect, because the ones at work can’t be shown",
    standfirst:
      "Every design system I’ve owned lives behind an employer’s login. So I built one in the open, in code and in Figma, from what those systems taught me, and wrote down what every decision cost.",
    disciplines: ["Design systems", "Front-end engineering", "Documentation"],
    employer: "MagnoCreative",
    period: "2026",
    status: "draft",
    // Made in the Figma Site file (Thumbnail covers), from the library's own
    // variables and Button: one color through its three tiers, with the
    // ground split light and dark on a slant. The blue holds on both sides.
    cover: {
      src: systemCover,
      alt: "A blue swatch labeled blue/600, joined by a dotted line to a chip labeled interactive/default, and on to a button reading Read the system. The ground is split on a slant, light on the left and dark on the right, and the blue is the same on both sides.",
    },
  },
  // PLACEHOLDER. The title, standfirst and period below are written to the
  // right shape, not from the real account — replace all three once the draft
  // is voice-checked. Everything here stays on the safe side of the rule
  // above: no platform name, no capability names, no vendor named.
  {
    slug: "self-serve-instead-of-a-request-queue",
    title: "Replacing a request queue with a portal people can use themselves",
    standfirst:
      "Four lines of business, each asking for platform changes a different way. I built the prototype in grayscale first, so the people reviewing it argued about structure instead of color.",
    disciplines: ["Prototyping", "Discovery", "Documentation"],
    employer: "JPMorganChase",
    period: "2025 to now",
    status: "draft",
  },
  {
    slug: "design-system-through-a-migration",
    title: "The system behind sixteen CRM surfaces",
    standfirst:
      "I inherited a design system built on a vendor's platform. Then the vendor moved on without us. This is the case I made for building our own, and what it cost to make it.",
    disciplines: ["Design systems", "Platform strategy", "Governance"],
    employer: "JPMorganChase",
    period: "2024 to now",
    status: "draft",
  },
  {
    slug: "adoption-without-a-designer-in-the-room",
    title: "Getting teams to adopt a pattern without me in the room",
    standfirst:
      "Adoption kept depending on a designer being available. So I stopped designing screens and designed how a team finds, understands and commits to a pattern on its own.",
    disciplines: ["Platform design", "Documentation", "Adoption"],
    employer: "JPMorganChase",
    period: "2025",
    status: "draft",
  },
  {
    slug: "sixteen-applications-one-blind-spot",
    title: "Sixteen applications, and no way to know when they'd break",
    // The old version of this ended on the rejection: "Leadership said no, and
    // they were right." Honest, but it made the case study about being
    // gracefully overruled. The actual arc is better and was sitting one
    // question away: he asked for the expensive fix, was told no, built the
    // thing people had actually asked for, and it is still running years
    // later. Ending on a verifiable fact beats ending on a good attitude.
    standfirst:
      "Eighty-two people told me they didn't want better applications. They wanted to know when the ones they had would be down. I recommended one design language across all sixteen; leadership said no, and they were right. What shipped instead is still in use.",
    disciplines: ["Enterprise UX", "Research", "Consolidation"],
    employer: "USAA",
    period: "2021",
    status: "draft",
  },
];
