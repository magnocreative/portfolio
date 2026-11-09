import type { ComponentType, CSSProperties, ReactNode, SVGProps } from "react";

export type Fact = {
  /** Sentence case: "Role", "Period". */
  key: string;
  value: ReactNode;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

/**
 * The facts of a piece of work in one card: who, when, what was in scope,
 * what it was built with, and, in the header, its status. Sits under a case
 * study's hero, before the story starts. Mirrors the Facts panel component in
 * Figma.
 *
 * It replaced a KeyValueList at 36rem with the values pushed to the right
 * edge. Two things were wrong with that at the top of a case study: the eye
 * had to cross about 400px from "scope" to its value, and it read as the end
 * of the intro rather than as a separate thing to scan. Here the values sit
 * beside their labels and the edge sets it apart. It takes the measure, like
 * the text and figures under it, so the page keeps one right edge.
 *
 * Two columns once the card itself is 48rem wide (a container query, not a
 * breakpoint: beside the section nav at 1024 the card is 39rem, and two
 * columns there would leave each value about 110px). Filled down then
 * across, so the reading order and the screen reader's order are the same. Status goes in the header rather than
 * in a fifth row: it is the one fact that is a state rather than a
 * description, and four rows split two and two with nothing left over.
 *
 * Below 640 it bleeds to the screen edge like the work cards and the résumé,
 * and each value drops under its label, indented to the label's text. Beside
 * a 120px label column a phone had 158px left for the value, and three of the
 * four wrapped.
 *
 * Each label carries an icon from the fact set in Icon.tsx. The icons are
 * labels, not decoration: one per kind of fact, the same on every study.
 * Labels and values are body size (16px) with 24px icons: this is content a
 * reviewer reads, not metadata to skim past, and at 13px it read as fine
 * print under a 64px title (Alejandro, November 2026).
 */
export function FactsPanel({
  label = "At a glance",
  status,
  items,
  className = "",
}: {
  label?: string;
  /** Usually a Tag. Leave out for a study with nothing live to point at. */
  status?: ReactNode;
  items: Fact[];
  className?: string;
}) {
  const rows = Math.ceil(items.length / 2);
  return (
    <section
      className={`@container rounded-sm border border-border-subtle bg-surface-raised max-sm:-mx-6 max-sm:rounded-none max-sm:border-x-0 ${className}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-subtle px-6 py-4 sm:px-8">
        <h2 className="font-label text-xs font-medium uppercase tracking-[0.11em] text-text-tertiary">
          {label}
        </h2>
        {status}
      </div>
      <dl
        style={{ "--rows": rows } as CSSProperties}
        className="grid grid-cols-1 gap-x-16 px-6 py-2 sm:px-8 @3xl:grid-flow-col @3xl:grid-cols-2 @3xl:grid-rows-[repeat(var(--rows),auto)]"
      >
        {items.map(({ key, value, icon: Icon }, i) => {
          // A rule between rows, never under the last one in a column.
          const last = i === items.length - 1;
          const endOfFirstColumn = i === rows - 1;
          return (
            <div
              key={key}
              className={`grid grid-cols-1 items-start gap-x-4 gap-y-1 py-4 sm:grid-cols-[7.5rem_1fr] ${
                last ? "" : "border-b border-border-subtle"
              } ${endOfFirstColumn ? "@3xl:border-b-0" : ""}`}
            >
              <dt className="flex h-[1.65rem] items-center gap-2.5 text-base text-text-tertiary">
                <Icon className="h-6 w-6 shrink-0" />
                {key}
              </dt>
              <dd className="pl-[2.125rem] text-base text-text-primary sm:pl-0">{value}</dd>
            </div>
          );
        })}
      </dl>
    </section>
  );
}
