import type { ReactNode } from "react";

/**
 * A note set off from the prose around it by a rule down its left edge.
 * Mirrors the Note component in Figma.
 *
 * On the components page it carries the half of a component's documentation
 * nobody writes: where it is deliberately NOT used, or the version that came
 * before and why it went. That is commentary on the specimen above it rather
 * than part of the argument, so it is drawn as an aside: the same type as the
 * body, set in by 20px behind a 1px rule in the section-rule color.
 *
 * It was a local helper on that page, written once and used six times. It
 * lives in the system now because it is a pattern, and a pattern that only
 * exists inside one page is one nobody else can reach for.
 *
 * On a phone it drops the rule and the inset and reads as plain prose. A
 * 342px column cannot spare 20px to an indent, and a rule down the edge of a
 * column that narrow reads as a margin mistake rather than an aside. The
 * Figma component has the same two versions, Device=Desktop and Mobile.
 *
 * Spacing above it belongs to the page, through `className`, as with
 * TextBlock.
 */
export function Note({ className = "", children }: { className?: string; children: ReactNode }) {
  return (
    <p
      className={`max-w-measure border-border-rule text-base leading-[1.7] text-text-secondary sm:border-l sm:pl-5 ${className}`}
    >
      {children}
    </p>
  );
}
