import type { ElementType, ReactNode } from "react";

/**
 * A raised surface with a hairline edge: surface-raised, a 1px border-subtle
 * border and the small radius, 32px in. The same material as FeaturePanel,
 * without its two-column layout, for content that is one column long.
 * Mirrors Card in Figma.
 *
 * First use: one card per employer on the résumé, so the reader can tell at a
 * glance where one employer's roles stop and the next begin. Lines alone made
 * the page busy; space alone was too quiet over a long list.
 *
 * `bleed` is for phones. Below 640 the card runs to both edges of the screen
 * with square corners and no side borders, keeping the page's 24px gutter as
 * its own padding, so the text is exactly as wide as it would be without the
 * card. A card inset inside a 342px column would have spent 64px of it on
 * padding and edges. From 640 up it is an ordinary rounded card.
 */
export function Card({
  as: Tag = "div",
  bleed = false,
  className = "",
  children,
  ...rest
}: {
  as?: ElementType;
  /** Run to the screen's edges below 640px. Assumes the page's 24px gutter. */
  bleed?: boolean;
  className?: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <Tag
      className={[
        "rounded-sm border border-border-subtle bg-surface-raised p-8",
        bleed ? "max-sm:-mx-6 max-sm:rounded-none max-sm:border-x-0 max-sm:px-6" : "",
        className,
      ].join(" ")}
      {...rest}
    >
      {children}
    </Tag>
  );
}
