import type { SVGProps } from "react";

/**
 * A small stroke icon set, drawn rather than imported.
 *
 * All on a 20-unit grid at 1.5 stroke, using currentColor, so an icon picks up
 * whatever the text around it is doing. Sized by the component that holds it,
 * never by the icon itself, which is what keeps a button's icon and its label
 * aligned on the same optical centre.
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
