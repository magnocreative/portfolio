import type { ReactNode } from "react";

type Width = "text" | "wide";

const widths: Record<Width, string> = {
  text: "max-w-[44rem]",
  wide: "max-w-[84rem]",
};

/**
 * The single source of horizontal rhythm. Every page section goes through it,
 * so gutters and measure are changed in one place rather than negotiated per
 * component — which is how portfolios end up with six slightly different
 * left edges.
 */
export function Container({
  children,
  width = "wide",
  className = "",
}: {
  children: ReactNode;
  width?: Width;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full px-6 sm:px-10 lg:px-16 ${widths[width]} ${className}`}>
      {children}
    </div>
  );
}

/**
 * Small uppercase mono label. Used for section headings and metadata — the
 * documentation register the whole site is written in.
 */
export function Label({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "span" | "h2";
}) {
  return (
    <Tag
      className={`font-mono text-2xs uppercase tracking-[0.14em] text-text-tertiary ${className}`}
    >
      {children}
    </Tag>
  );
}
