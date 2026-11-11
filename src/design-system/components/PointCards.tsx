import type { ComponentType, ReactNode, SVGProps } from "react";

export type Point = {
  /** A 20-unit stroke icon from Icon.tsx, drawn at 24px. */
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  /** A short claim, no closing period: it is a heading, not a sentence. Keep
   *  it to one line at the card's narrowest, about 230px at 1280 (around 25
   *  characters), so the three titles read as a row (Alejandro, November 2026). */
  title: string;
  /** Two or three sentences that earn the title. */
  body: ReactNode;
};

/**
 * Two to four parallel points, each in its own card with an icon, a title
 * and a few sentences: the rules a project worked under, the principles it
 * kept, the trade-offs it took. Built for the constraint in the design system
 * case study, where three rules ran as three bold run-in paragraphs and read
 * as one block. Mirrors the Point cards component in Figma.
 *
 * Use it only when the points are parallel and equal. A sequence wants a
 * numbered list; one point that outranks the rest wants its own paragraph.
 *
 * The icon sits on the card at 24px, in the accent, with no tile behind it
 * (Alejandro, November 2026): one quiet mark of color per card, so the eye
 * finds the row of three before it reads any of them.
 *
 * Side by side once the row is 48rem wide (a container query, like
 * OutcomeStats and FactsPanel), stacked below that. Side by side, the cards
 * share their rows through subgrid, so a title that wraps to two lines
 * pushes every body down with it and the three bodies start on one line. A
 * shorter title sits at the bottom of its row, against its body, so the spare
 * room falls under the icon rather than between a title and its text. On a
 * phone the cards bleed to the screen's edges, like every card on the site.
 *
 * Titles are set in Heading/Role (18px, 1.3), the résumé's role style, so
 * the card brings no type style of its own and maps to one in Figma.
 *
 * It takes the measure, so the page keeps one right edge.
 *
 * `framed={false}` drops the card: no surface, edge or padding, just the icon,
 * title and body, for points whose bodies already group themselves, such as a
 * list of chips (the résumé's Skills: a card around chips was a third nested
 * outline, Alejandro, November 2026). Open points sit further apart instead.
 *
 * `layout="grid"` is the two-by-two version, for four points on a page whose
 * cards run the full width (the résumé's Skills, Alejandro, November 2026):
 * two columns from 48rem, no measure. Its titles are one line by the same
 * rule, so it needs no subgrid; each card simply stretches to its row.
 */
export function PointCards({
  items,
  layout = "row",
  framed = true,
  className = "",
}: {
  items: Point[];
  /** "row": side by side at the measure. "grid": two by two, full width. */
  layout?: "row" | "grid";
  /** The card around each point. Off for an open grid. */
  framed?: boolean;
  className?: string;
}) {
  const grid = layout === "grid";
  return (
    <div className={`@container ${grid ? "" : "max-w-measure"} ${className}`}>
      <ul
        className={
          grid
            ? `grid grid-cols-1 @3xl:grid-cols-2 ${framed ? "gap-4" : "gap-x-16 gap-y-12"}`
            : "grid grid-cols-1 gap-4 @3xl:auto-cols-fr @3xl:grid-flow-col @3xl:grid-rows-[auto_auto_1fr] @3xl:gap-y-0"
        }
      >
        {items.map(({ icon: Icon, title, body }) => (
          <li
            key={title}
            className={`flex flex-col ${
              framed
                ? "rounded-sm border border-border-subtle bg-surface-raised p-6 max-sm:-mx-6 max-sm:rounded-none max-sm:border-x-0"
                : ""
            } ${
              grid ? "" : "@3xl:row-span-3 @3xl:grid @3xl:grid-rows-subgrid"
            }`}
          >
            <Icon className="h-6 w-6 text-text-accent" />
            <h3 className={`mt-5 font-display text-lg leading-[1.3] text-text-primary ${grid ? "" : "@3xl:self-end"}`}>
              {title}
            </h3>
            {/* Text in a paragraph; anything else (a list of chips) in a
                block, since a paragraph cannot hold a list. */}
            {typeof body === "string" ? (
              <p className="mt-2 text-base leading-[1.65] text-text-secondary">{body}</p>
            ) : (
              <div className="mt-3">{body}</div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
