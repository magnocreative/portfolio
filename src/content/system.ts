import type { AuditRow } from "@/design-system/components/ContrastAudit";

/**
 * What the design system page says about itself, in one place, so the pages
 * that point at it read from the same lists: /system draws its tables and its
 * decisions from here, and the components page previews them (Alejandro,
 * November 2026). A preview that copied a number would drift from the page it
 * links to; one that reads this file cannot.
 */

export const textRoles: AuditRow[] = [
  { token: "--text-primary", note: "Body and headings" },
  { token: "--text-secondary", note: "Standfirsts, supporting copy" },
  { token: "--text-tertiary", note: "Metadata: dates, disciplines, labels" },
  { token: "--text-accent", note: "Links and section markers" },
  { token: "--text-danger", note: "Errors: under a field, in a toast" },
  { token: "--text-success", note: "Confirmations: a toast, a live tag" },
];

/* --interactive-default used to sit in the table above, where it was judged
   against the page at the 4.5:1 TEXT bar. That passed in light by luck (4.62:1)
   and soft-failed in dark (3.82:1) — a failing verdict, on the public page, for
   a token this same page argues is correct. The table was contradicting the
   system.

   A filled control owes its contrast to its own label, not to the page behind
   it. That is the whole reason these three can be single values. Audited here
   at the 3:1 non-text bar, which is the one that actually governs them. */
export const interactiveRoles: AuditRow[] = [
  { token: "--interactive-default", note: "Filled controls, the focus ring, the mark. One value, both themes" },
  { token: "--interactive-hover", note: "Hover on a filled control" },
  { token: "--interactive-selected", note: "Pressed and selected" },
];

export const decisions = [
  {
    title: "Two ramps, not one inverted",
    body: "Light is paper, a near-neutral gray with just enough warmth left in it to not read as gray. Dark is slate, drawn from the logo's own blue, so the mark sits natively in it rather than being placed on top of something unrelated. Paper began five times warmer, a proper cream, and it was lovely until a cool blue fill sat on it: warm ground against cool tint is a complementary clash, and a tint that faint loses that argument every time. The lightness of every step is untouched, so no contrast figure on this page moved. Only the amount of hue did.",
  },
  {
    title: "Both themes stated in one declaration",
    body: "Every role is written once, as light-dark(paper, slate). Twin light and dark blocks always drift eventually. Someone edits one and forgets the other, and the bug ships because nobody looks at both themes on the same day. Stating them together makes drift structurally impossible rather than a matter of discipline.",
  },
  {
    title: "The switch sets color-scheme, not a class",
    body: "Native form controls, scrollbars and the text caret follow color-scheme. A class-based theme leaves all of them light while the page goes dark. That is the detail that makes a dark mode feel almost right and never quite.",
  },
  {
    title: "Components never reach past the semantic tier",
    body: "One constraint, and it is the reason the site rethemes by editing two files. It also means no component carries a light branch and a dark branch, which is where most theme bugs actually live.",
  },
  {
    title: "Contrast is measured, not asserted",
    body: "Reading a token back gives you oklch(...), and anything that parses that as RGB produces confident nonsense. So each value is painted to a canvas and the pixel is read. That is not academic: it caught text-tertiary sitting at 3.92:1 in the light theme, under the 4.5:1 its small metadata requires, and it looked completely fine to me on screen.",
  },
  {
    title: "One edge below the bar, on purpose",
    // Was "Two hairlines, both below the bar, for different reasons", five
    // times the length of the shortest entry. Its panel-edge half is what
    // "Borders are allowed to fail" already argues, so that entry carries it
    // and this one keeps the button (Alejandro, November 2026).
    body: "A secondary button's edge measures about 1.9:1, under the 3:1 non-text minimum. WCAG 1.4.11 asks 3:1 of what identifies a control, and the edge isn't that: the label is, at 6.35:1, inside a real button with a 40px target. At 3:1 the edge reads as an outline and the quiet variant stops being quiet. It was built at 3.64:1, softened to 3.10:1 and landed here. A system that only documents the rules it passes is a brochure.",
  },
  {
    title: "Borders are allowed to fail",
    body: "Dividers and panel edges sit deliberately below 3:1. A hairline that meets text contrast is a heavy black line and the page stops reading as a document. Non-text contrast governs controls and meaningful graphics; a rule between two rows is neither. Knowing which rules do not apply is part of applying them.",
  },
];

export const storybookAlt =
  "Storybook for this design system: the component list on the left with Button open, and the Button's States story showing primary, secondary and tertiary buttons at rest, hover, selected and disabled, with its controls below.";
