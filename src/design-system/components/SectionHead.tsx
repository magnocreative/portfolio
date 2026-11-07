import type { ReactNode } from "react";
import { Label } from "@/design-system/primitives/Container";

/**
 * The heading that opens a section: an uppercase label on a full-width rule,
 * with an optional count at the far right.
 *
 * It was written out by hand fourteen times across six pages before it became
 * a component, and two of those pages had grown their own private copy of it.
 * One component means the rule weight, the label color and the gap above the
 * rule change in one place.
 *
 * The label is set in the primary text color, not the tertiary one the plain
 * eyebrow uses, because here it names the section rather than describing the
 * page. The count is tertiary, padded to two digits so 04 and 12 align, and
 * tracked wider than the label so the digits do not read as part of it.
 *
 * Pass `id` when the section points at the heading with `aria-labelledby`.
 */
export function SectionHead({
  id,
  count,
  className = "",
  children,
}: {
  id?: string;
  /**
   * For a width cap. The résumé passes `max-w-measure` so the rule stops where
   * every row under it stops, instead of running 44px past them.
   */
  className?: string;
  /** Shown at the far right, padded to two digits. Leave out for no count. */
  count?: number;
  children: ReactNode;
}) {
  const hasCount = count !== undefined;

  return (
    <div
      className={`border-b border-border-rule pb-4 ${
        hasCount ? "flex items-baseline justify-between" : ""
      } ${className}`}
    >
      <Label as="h2" className="!text-text-primary">
        <span id={id}>{children}</span>
      </Label>
      {hasCount && (
        <span className="font-label text-xs tracking-[0.14em] text-text-tertiary">
          {String(count).padStart(2, "0")}
        </span>
      )}
    </div>
  );
}
