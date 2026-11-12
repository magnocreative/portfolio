import type { ReactNode } from "react";

export type SplitItem = {
  /** The point, set in the display face. Short: a scannable list is the left column. */
  title: string;
  /** The reasoning: a string for one paragraph, or several <p> elements. */
  body: ReactNode;
};

/**
 * Titled rows: the title on the left, its paragraph on the right, a hairline
 * between rows. The "Decisions, and what each one cost" list on /system.
 * Mirrors the Split list component in Figma.
 *
 * Why this shape and not two columns of paragraphs (Alejandro, November
 * 2026): the entries run from two sentences to a dozen, and side by side
 * the long ones left a hole beside every short one. A row is as tall as its
 * own paragraph, so uneven lengths cost nothing, and the entries still read
 * in sequence, top to bottom, the way they were written. Full width, the
 * paragraphs ran 120 characters a line; beside a 15rem title column they run
 * about 75, the same cap the work index uses. The titles down the left read
 * as a list of the decisions on their own. It is the résumé's split, the
 * employer left and the roles right, used for argument instead of history.
 *
 * Side by side once the list itself is 48rem wide (a container query), so it
 * stacks wherever its column is narrower, not only on a phone.
 */
/**
 * A hyphenated term stays whole: "color-scheme" never splits into "color-"
 * over "scheme" in the narrow title column, which is where a browser would
 * otherwise break it.
 */
function keepTerms(title: string) {
  return title.split(/(\S*-\S*)/).map((part, i) =>
    part.includes("-") ? (
      <span key={i} className="whitespace-nowrap">
        {part}
      </span>
    ) : (
      part
    ),
  );
}

export function SplitList({
  items,
  headingAs: Heading = "h3",
  className = "",
}: {
  items: SplitItem[];
  /** The titles' level. h3 under a SectionHead, which is the h2. */
  headingAs?: "h3" | "h4";
  className?: string;
}) {
  return (
    <div className={`@container max-w-measure ${className}`}>
      {items.map((item, i) => {
        const paragraphs = Array.isArray(item.body);
        return (
          <div
            key={item.title}
            className={`grid grid-cols-1 gap-y-3 @3xl:grid-cols-[15rem_minmax(0,1fr)] @3xl:gap-x-10 ${
              i > 0 ? "border-t border-border-subtle pt-8" : ""
            } ${i < items.length - 1 ? "pb-8" : ""}`}
          >
            <Heading className="font-display text-xl leading-[1.25] tracking-[-0.012em] text-text-primary text-balance">
              {keepTerms(item.title)}
            </Heading>
            <div className="flex max-w-[40rem] flex-col gap-6 text-base leading-[1.7] text-text-secondary">
              {paragraphs || typeof item.body !== "string" ? item.body : <p>{item.body}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
