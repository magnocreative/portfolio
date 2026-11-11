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

/** A globe: open to relocation, anywhere. */
export function GlobeIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="10" cy="10" r="7" />
      <path d="M3 10h14M10 3c-2 2-3 4.4-3 7s1 5 3 7M10 3c2 2 3 4.4 3 7s-1 5-3 7" />
    </svg>
  );
}
