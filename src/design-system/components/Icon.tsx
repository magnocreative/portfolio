import type { SVGProps } from "react";

/**
 * A small stroke icon set, drawn rather than imported.
 *
 * All on a 20-unit grid at 1.5 stroke, using currentColor, so an icon picks up
 * whatever the text around it is doing. Sized by the component that holds it,
 * never by the icon itself, which is what keeps a button's icon and its label
 * aligned on the same optical center.
 */

type IconProps = SVGProps<SVGSVGElement>;

function base(props: IconProps) {
  return {
    viewBox: "0 0 20 20",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    focusable: false,
    ...props,
  };
}

export function ArrowRight(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 10h12M11.5 5.5 16 10l-4.5 4.5" />
    </svg>
  );
}

export function ArrowUpRight(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M6.5 13.5 13.5 6.5M7.5 6.5h6v6" />
    </svg>
  );
}

export function ArrowLeft(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M16 10H4M8.5 5.5 4 10l4.5 4.5" />
    </svg>
  );
}

export function Download(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M10 3v9M6.5 8.5 10 12l3.5-3.5M3.5 14.5v1a1.5 1.5 0 0 0 1.5 1.5h10a1.5 1.5 0 0 0 1.5-1.5v-1" />
    </svg>
  );
}

export function Mail(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="2.5" y="4.5" width="15" height="11" rx="1.5" />
      <path d="m3 6 7 4.5L17 6" />
    </svg>
  );
}


/* The four navigation icons.
   
   Drawn to the same 20-unit grid and 1.5 stroke as the rest, and — unlike the
   first pass — to the same INK box: every one of them spans y 3 to 17 and
   centers on (10, 10). A shared viewBox is not shared alignment. Measured with
   getBBox, the first versions centered at y 10, 10.25 and 10.5, and Résumé sat
   at x 9.5 and ran 16 units tall against the others' 13.5. Nothing there is
   visible on its own; stacked in a list where the eye compares each against
   the one above it, it reads as four icons that will not sit still.
   
   Widths are allowed to differ — a document is narrower than a grid and
   forcing them equal would distort both — but the centers and the heights are
   not. Centering is what the eye checks in a vertical list.
   
   Deliberately plain, too. An icon beside a label is read as a label, and an
   icon that tries to be clever costs a reader a moment working out the
   metaphor every time they pass it. */

/** Work: a case. A body of pieces rather than one document. */
export function WorkIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="6" width="14" height="11" rx="1.5" />
      <path d="M7 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  );
}

/**
 * Design system: three plates stacked in order.
 *
 * It is the one icon here that says something specific rather than generic.
 * A grid of squares is what every tool's "components" button looks like; this
 * draws the argument the /system page actually makes — primitives, then
 * semantic roles, then component overrides, in dependency order, with the
 * lower tiers visible beneath the one you touch.
 *
 * Four candidates were drawn and rendered at the real 24px before this was
 * picked. The deciding factor was that size: a kit of circle, square and
 * triangle reads well at 72px and turns to mush at 24, which is the only size
 * it will ever be seen at.
 */
export function SystemIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M10 3 17 6.5 10 10 3 6.5Z" />
      <path d="M17 10 10 13.5 3 10" />
      <path d="M17 13.5 10 17 3 13.5" />
    </svg>
  );
}

/** About: a person. The one place on this site where that is literal. */
export function AboutIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="10" cy="6.5" r="3.5" />
      <path d="M3 17a7 7 0 0 1 14 0" />
    </svg>
  );
}

/**
 * Résumé: a page with lines on it. The case is Work.
 *
 * Widened to the same ink box as the other three — x 3 to 17, not 5 to 15.
 * It was drawn narrower because a document IS narrower than a grid, which is
 * true and was the wrong thing to optimize: in a left-aligned icon column the
 * eye reads the left ink edges, and this one sat 2.4px right of its neighbors.
 * A shared ink box is what makes a column of different shapes look aligned.
 */
export function ResumeIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 3h7l6 6v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
      <path d="M11 3v6h6M6 12h8M6 15h5" />
    </svg>
  );
}

/* The fact icons, for the labels in a FactsPanel.

   Same grid, stroke and ink box as the rest: each spans x 3 to 17 and centers
   on (10, 10). None of them reuses a navigation icon. A person was the obvious
   glyph for "role" and three plates the obvious one for "scope", and both
   already mean a page in the menu; an icon that means two things on one site
   means neither. */

/** Role: a badge. Who did the work, and as what. */
export function RoleIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="4" width="14" height="12" rx="1.5" />
      <circle cx="7.5" cy="9" r="1.75" />
      <path d="M5 13.25c.6-1 1.5-1.5 2.5-1.5s1.9.5 2.5 1.5M12 8.5h2.5M12 11.5h2.5" />
    </svg>
  );
}

/** Period: a calendar. */
export function CalendarIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="4.5" width="14" height="12.5" rx="1.5" />
      <path d="M3 8.5h14M7 3v3M13 3v3" />
    </svg>
  );
}

/** Scope: crop marks. What falls inside the frame of the work. */
export function ScopeIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 7V4a1 1 0 0 1 1-1h3M13 3h3a1 1 0 0 1 1 1v3M17 13v3a1 1 0 0 1-1 1h-3M7 17H4a1 1 0 0 1-1-1v-3M7 10h6" />
    </svg>
  );
}

/** Stack: code brackets. What it was built with. */
export function CodeIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M7 6 3 10l4 4M13 6l4 4-4 4M11 4.5 9 15.5" />
    </svg>
  );
}

/* The point icons, for the cards in a PointCards row. Same grid and stroke as
   the rest. Each is named for what it shows, not for the one card it first
   headed, so a later case study can reuse it where the picture fits. */

/** A briefcase: work, where no employer's logo stands for it (the early
 *  career row on the résumé). */
export function BriefcaseIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M7.5 6.5V5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v1.5M3 11h14" />
      <rect x="3" y="6.5" width="14" height="10.5" rx="1" />
    </svg>
  );
}

/** A briefcase, struck through: nothing taken from work. */
export function BriefcaseOffIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M7.5 6.5V5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v1.5M15.5 6.5H16a1 1 0 0 1 1 1v8M14 17H4a1 1 0 0 1-1-1V7.5a1 1 0 0 1 1-1h5.5M3 11h7M3 3l14 14" />
    </svg>
  );
}

/** A browser window with a check: it runs, and it was tested where it runs. */
export function BrowserCheckIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="2.5" y="3.5" width="15" height="13" rx="1.5" />
      <path d="M2.5 7h15M7.25 11.75l1.75 1.75 3.75-3.75" />
    </svg>
  );
}

/** One person over a two-way arrow: the same hands on both sides of a handoff. */
export function HandoffIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="10" cy="5" r="2.25" />
      <path d="M6.25 12c.4-1.9 1.9-3.25 3.75-3.25s3.35 1.35 3.75 3.25M3 15.5h14M5 13.5l-2 2 2 2M15 13.5l2 2-2 2" />
    </svg>
  );
}

/* The place icons, for where Alejandro is and where he would go. Same grid
   and stroke as the rest. */

/** Texas: the state's outline, the home base. Drawn from its borders and
    simplified to read at 16px; the panhandle and the Rio Grande are what make
    it Texas at that size, so those are the parts kept faithful. */
export function TexasIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M6.85 3.38L10.12 3.38L10.12 5.82L10.98 6.08L12.16 6.39L13.45 6.71L14.96 6.71L16.05 6.97L16.53 7.77L16.53 10.28L17 11.41L16.74 11.91L15.82 12.35L14.96 13.04L13.77 13.92L13.13 14.55L12.91 15.55L13.18 16.62L12.59 16.55L11.62 16.18L10.98 15.43L10.66 14.67L9.8 13.67L9.37 12.67L8.61 11.83L7.54 11.83L7.22 12.29L6.68 12.82L5.82 12.41L5.06 11.54L4.1 10.41L3.13 9.28L3 9.03L6.83 9.03Z" />
    </svg>
  );
}

/* The contact icons, for the résumé PDF's contact column. Same grid and stroke.
   The website takes a link rather than the globe: the globe already means
   open to relocation, on /resume and in the PDF's sidebar layout. */

/** A link: the portfolio's address. Two links of a chain at 45°. */
export function LinkIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M8 12a3.5 3.5 0 0 0 4.95 0l3.3-3.3a3.5 3.5 0 0 0-4.95-4.95l-.83.83" />
      <path d="M12 8a3.5 3.5 0 0 0-4.95 0l-3.3 3.3a3.5 3.5 0 0 0 4.95 4.95l.83-.83" />
    </svg>
  );
}

/** A phone: the number on the copy sent to a person, never the public one. */
export function PhoneIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="5.5" y="2.5" width="9" height="15" rx="1.75" />
      <path d="M9 14.75h2" />
    </svg>
  );
}

/* The status icons, for messages that need a tone: a toast, a field's error.
   Each carries its meaning in its shape, so the tone never rests on color
   alone (WCAG 1.4.1). Same grid and stroke, each in a circle. */

/** Something went wrong: an X in a circle. */
export function CircleXIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="10" cy="10" r="7.25" />
      <path d="M7.5 7.5l5 5M12.5 7.5l-5 5" />
    </svg>
  );
}

/** It worked: a check in a circle. */
export function CircleCheckIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="10" cy="10" r="7.25" />
      <path d="M6.75 10.25l2.25 2.25 4.25-4.75" />
    </svg>
  );
}

/** For your information: an i in a circle. */
export function InfoIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="10" cy="10" r="7.25" />
      <path d="M10 9.25v4M10 6.6v.15" />
    </svg>
  );
}

/** A globe: open to relocation, anywhere. */
export function GlobeIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="10" cy="10" r="7" />
      <path d="M3 10h14M10 3c-2 2-3 4.4-3 7s1 5 3 7M10 3c2 2 3 4.4 3 7s-1 5-3 7" />
    </svg>
  );
}

/* The skill icons, for the résumé's Skills cards. Same grid and stroke. None
   reuses a navigation or fact icon: the plates already mean the design system
   page, and the brackets already mean a stack. */

/** Design systems: three modules and a component diamond, the way a library
    marks the part that everything else is built from. */
export function ComponentsIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="3" width="6" height="6" rx="1" />
      <rect x="11" y="3" width="6" height="6" rx="1" />
      <rect x="3" y="11" width="6" height="6" rx="1" />
      <path d="M14 11l3 3-3 3-3-3Z" />
    </svg>
  );
}

/** Product design: a pen nib. */
export function PenNibIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M10 3l5 6-2.5 7.5h-5L5 9Z" />
      <path d="M10 3v6.5" />
      <circle cx="10" cy="10.75" r="1.25" />
      <path d="M7.5 16.5V17h5v-.5" />
    </svg>
  );
}

/** Design engineering: a terminal prompt. A design that runs. */
export function TerminalIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="2.5" y="4" width="15" height="12" rx="1.5" />
      <path d="M6 8.5l2.5 2-2.5 2M10.5 12.5H14" />
    </svg>
  );
}

/** Tools: a wrench. */
export function WrenchIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M13 3.2a4 4 0 0 0-4 5.4L3.7 13.9a1.6 1.6 0 0 0 2.3 2.3l5.3-5.3a4 4 0 0 0 5.4-4l-2.4 2.3-2.4-.6-.6-2.4Z" />
    </svg>
  );
}

/* Social marks: LinkedIn's "in" square and GitHub's Octocat, traced from each
   company's own one-color mark (Alejandro, November 2026). Filled, not
   stroked, because a brand mark is a shape, and one color, currentColor, so
   they take the text color around them like every other glyph here rather
   than their brand blue and black. The wordmarks are left out: the label
   beside each already names it. Drawn a little inside the 20-unit box (15 for
   the square, 16 for the circle, which reads smaller at the same width) so
   they sit at the weight of the stroke icons.

   Storybook joined them for the three "Open it in Storybook" buttons
   (Alejandro, November 2026): its book with the S cut out and the bookmark
   notch, traced from Storybook's own mark, 16 units tall like the Octocat. */
function filled(props: IconProps) {
  return { viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": true, focusable: false, ...props };
}

export function LinkedInIcon(props: IconProps) {
  return (
    <svg {...filled(props)}>
      <path fillRule="evenodd" d="M3.02 2.74L2.67 3.13L2.50 3.62L2.50 16.37L2.74 16.96L3.13 17.31L3.65 17.48L16.33 17.48L16.58 17.45L16.96 17.24L17.31 16.85L17.48 16.33L17.48 3.65L17.45 3.44L17.24 3.02L16.85 2.67L16.37 2.50L3.62 2.50ZM4.94 7.99L6.84 7.99L7.14 8.26L7.14 15.53L7.07 15.67L6.84 15.86L4.94 15.86L4.68 15.63L4.65 15.49L4.65 8.29L4.75 8.12ZM14.90 8.45L15.23 8.78L15.58 9.37L15.86 10.38L15.93 11.05L15.93 15.56L15.86 15.70L15.67 15.86L13.66 15.86L13.47 15.74L13.40 15.63L13.40 11.50L13.33 11.05L13.19 10.63L12.84 10.21L12.76 10.21L12.56 10.07L12.02 10.00L11.57 10.10L11.29 10.28L10.98 10.66L10.77 11.22L10.70 15.63L10.47 15.86L8.53 15.86L8.40 15.79L8.24 15.60L8.24 8.26L8.31 8.12L8.53 7.99L10.44 7.99L10.70 8.19L10.73 8.87L10.82 8.87L10.89 8.71L11.15 8.45L11.57 8.17L12.09 7.96L12.32 7.96L12.48 7.89L13.05 7.85L13.96 7.96L14.62 8.24ZM5.67 4.12L6.11 4.12L6.39 4.19L6.91 4.47L7.28 4.91L7.49 5.40L7.49 6.08L7.35 6.46L7.14 6.77L6.70 7.14L6.11 7.35L5.67 7.35L5.08 7.14L4.80 6.93L4.54 6.63L4.40 6.35L4.26 5.76L4.40 5.12L4.78 4.56L5.22 4.26Z" />
    </svg>
  );
}

export function GitHubIcon(props: IconProps) {
  return (
    <svg {...filled(props)}>
      <path fillRule="evenodd" d="M7.48 2.51L6.53 2.90L5.91 3.23L4.62 4.19L3.59 5.32L3.08 6.09L2.72 6.78L2.28 7.97L2.00 9.59L2.05 11.26L2.21 12.11L2.46 12.96L2.98 14.09L3.49 14.91L4.03 15.58L4.68 16.23L5.42 16.82L6.22 17.31L7.38 17.82L7.79 17.82L7.92 17.72L7.99 17.54L7.97 15.97L7.38 16.07L6.89 16.07L6.45 15.99L5.88 15.74L5.47 15.35L4.88 14.24L4.08 13.52L4.16 13.37L4.32 13.32L4.70 13.34L5.06 13.50L5.47 13.83L6.06 14.63L6.30 14.81L6.84 15.02L7.40 15.02L7.99 14.84L8.15 14.27L8.51 13.76L7.38 13.55L6.42 13.14L6.06 12.88L5.65 12.47L5.34 12.01L5.14 11.54L4.91 10.54L4.88 9.41L4.96 8.95L5.14 8.43L5.68 7.61L5.55 7.07L5.52 6.53L5.60 5.99L5.76 5.50L5.83 5.42L6.12 5.42L6.78 5.60L7.43 5.91L7.99 6.27L9.46 6.01L10.82 6.04L12.01 6.27L12.60 5.88L13.19 5.60L13.70 5.45L14.14 5.42L14.22 5.47L14.32 5.76L14.45 6.45L14.42 7.12L14.30 7.61L14.84 8.41L15.09 9.33L15.09 10.36L14.91 11.34L14.48 12.26L13.70 13.04L13.09 13.37L12.57 13.55L11.47 13.76L11.83 14.27L11.98 14.86L11.98 17.56L12.03 17.69L12.26 17.85L12.73 17.77L14.12 17.10L15.38 16.15L16.30 15.14L16.84 14.35L17.20 13.68L17.67 12.47L17.87 11.57L17.97 10.67L17.97 9.67L17.90 8.95L17.72 8.07L17.49 7.35L16.89 6.09L15.92 4.75L14.99 3.88L14.19 3.31L13.45 2.90L12.16 2.41L11.36 2.23L10.49 2.13L8.95 2.18Z" />
    </svg>
  );
}

export function StorybookIcon(props: IconProps) {
  return (
    <svg {...filled(props)}>
      <path fillRule="evenodd" d="M16.17 2.17L15.85 2.00L15.34 2.00L15.29 2.02L14.75 2.06L14.81 3.94L14.77 4.00L14.71 4.03L14.61 4.01L14.04 3.57L13.99 3.55L13.30 4.07L13.21 4.10L13.11 4.04L13.09 4.00L13.16 2.26L13.15 2.17L4.23 2.71L4.11 2.73L3.90 2.82L3.79 2.89L3.65 3.03L3.52 3.31L3.50 3.64L4.00 16.74L4.07 17.04L4.16 17.18L4.29 17.32L4.55 17.47L4.79 17.51L14.94 17.95L15.42 17.99L15.81 17.99L16.09 17.88L16.30 17.70L16.43 17.49L16.49 17.26L16.49 2.75L16.41 2.45L16.30 2.29ZM9.81 4.74L10.60 4.76L11.21 4.86L11.80 5.06L12.28 5.35L12.45 5.49L12.71 5.76L12.91 6.05L13.04 6.29L13.23 6.80L13.30 7.10L13.36 7.52L13.37 7.99L13.28 8.06L12.95 8.14L12.40 8.22L12.04 8.24L11.38 8.23L11.08 8.17L10.97 8.09L10.95 7.60L10.89 7.32L10.77 7.08L10.58 6.90L10.43 6.84L10.30 6.82L10.08 6.82L9.86 6.86L9.64 6.97L9.54 7.08L9.47 7.21L9.42 7.42L9.43 7.68L9.49 7.88L9.67 8.15L9.87 8.35L10.15 8.55L11.63 9.36L12.14 9.70L12.53 10.01L12.89 10.39L13.16 10.80L13.34 11.19L13.47 11.71L13.50 12.36L13.43 12.89L13.26 13.37L13.16 13.58L12.94 13.89L12.70 14.14L12.47 14.34L12.01 14.61L11.34 14.86L10.67 14.98L9.99 15.00L9.16 14.92L8.83 14.85L8.45 14.73L7.92 14.46L7.68 14.29L7.45 14.07L7.26 13.83L7.13 13.62L7.00 13.36L6.88 13.04L6.82 12.78L6.76 12.38L6.75 11.56L6.77 11.51L6.83 11.45L7.02 11.39L7.43 11.33L8.45 11.33L9.00 11.39L9.21 11.46L9.27 11.50L9.30 12.09L9.36 12.41L9.49 12.71L9.67 12.86L9.94 12.95L10.34 12.95L10.49 12.90L10.64 12.82L10.72 12.73L10.79 12.60L10.85 12.37L10.84 12.06L10.77 11.86L10.60 11.59L10.37 11.36L10.06 11.13L8.48 10.20L8.03 9.88L7.77 9.66L7.47 9.35L7.15 8.89L6.95 8.41L6.85 7.96L6.83 7.62L6.84 7.27L6.95 6.69L7.15 6.21L7.34 5.90L7.51 5.70L7.84 5.39L8.16 5.18L8.40 5.06L8.71 4.95L9.05 4.85Z" />
    </svg>
  );
}
