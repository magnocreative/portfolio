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

export type CaseStudy = {
  slug: string;
  /** The decision, phrased so it survives being read alone. */
  title: string;
  /** One sentence on the constraint or the trade — never a summary of scope. */
  standfirst: string;
  disciplines: string[];
  employer: string;
  period: string;
  /** Draft entries render dimmed and unlinked until the writing is done. */
  status: "published" | "draft";
};

export const caseStudies: CaseStudy[] = [
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
    standfirst:
      "Eighty-two people told me they didn't want better applications. They wanted to know when the ones they had would be down. I recommended one design language across all sixteen. Leadership said no, and they were right.",
    disciplines: ["Enterprise UX", "Research", "Consolidation"],
    employer: "USAA",
    period: "2021",
    status: "draft",
  },
];
