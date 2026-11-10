import type { ReactNode } from "react";

export type Outcome = {
  /** The number with its unit, short: "1 token", "0", "16.69:1". */
  value: string;
  /** What the number did, as the rest of a sentence that starts with it. */
  label: ReactNode;
};

/**
 * Two to four numbers that open a case study's outcome: what the work did,
 * stated so a reviewer can read it in the time it takes to scroll past.
 * Mirrors the Outcome stats component in Figma.
 *
 * A number here has to be an outcome, not a size. "128 variables" says how
 * big the system is; "1 token softened the darkest text on every page" says
 * what the system made cheap. Each label finishes the sentence its number
 * starts, so the pair reads aloud as one claim, and the story under the row
 * is where the claim is earned.
 *
 * Deliberately not a card. The facts panel at the top of the page is a card,
 * and two boxes would make the outcome look like more metadata; rules above
 * and below set it apart instead. It takes the measure, like everything else
 * in the column. Side by side once the row itself is 48rem wide (a container
 * query, as in FactsPanel), stacked above that.
 *
 * Numbers in display type (text-3xl, 36px SemiBold), labels in body type, so
 * the pair reads as a figure and its meaning rather than a dashboard tile.
 */
export function OutcomeStats({ items, className = "" }: { items: Outcome[]; className?: string }) {
  return (
    <div className={`@container max-w-measure border-y border-border-subtle ${className}`}>
      <ul className="grid grid-cols-1 @3xl:auto-cols-fr @3xl:grid-flow-col">
        {items.map((item, i) => (
          <li
            key={item.value}
            className={`flex flex-col gap-2 py-6 ${
              i > 0 ? "border-t border-border-subtle @3xl:border-t-0 @3xl:border-l @3xl:pl-6" : ""
            } ${i < items.length - 1 ? "@3xl:pr-6" : ""}`}
          >
            <span className="font-display text-3xl text-text-primary">{item.value}</span>
            <span className="text-base text-text-secondary">{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
