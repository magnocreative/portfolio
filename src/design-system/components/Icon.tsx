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
