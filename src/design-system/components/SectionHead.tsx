import type { ReactNode } from "react";

/**
 * The heading that opens a section: a display-size title, with an optional
 * count beside it.
 *
 * It was written out by hand fourteen times across six pages before it became
 * a component, and two of those pages had grown their own private copy of it.
 * One component means the size, the color and the count change in one place.
 *
 * November 2026: no rule, and display type instead of a small uppercase label.
 * Most sections now open onto something with its own edge (the résumé's
 * employer cards, the raised panels, the case study rows), so a full-width
 * line under the title was one more edge in a stack of them. Size does the
 * separating instead, on the type scale's own steps: 48 from 640 (text-4xl),
 * 36 on a phone (text-3xl). That puts it a clear step above what sits inside a
 * section, the 36px panel headings and the 28px employer names, and a step
 * below the 64px page title.
 *
 * The count sits beside the title rather than at the far right. Away from a
 * rule there is nothing to run it out to, and 900px from the word it counts
 * it read as a stray number. Tertiary, padded to two digits, tracked wide so
 * the digits do not read as part of the title.
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
  /** For a width cap. The résumé passes `max-w-measure`. */
  className?: string;
  /** Shown beside the title, padded to two digits. Leave out for no count. */
  count?: number;
  children: ReactNode;
}) {
  const hasCount = count !== undefined;

  return (
    <div className={`flex items-baseline gap-x-4 ${className}`}>
      <h2 className="font-display text-3xl text-text-primary sm:text-4xl">
        <span id={id}>{children}</span>
      </h2>
      {hasCount && (
        <span className="font-label text-xs tracking-[0.14em] text-text-tertiary">
          {String(count).padStart(2, "0")}
        </span>
      )}
    </div>
  );
}
