import type { ReactNode } from "react";

export type DataTableColumn = {
  label: string;
  /** False keeps the heading for screen readers and hides it on screen, for
   *  a column that explains itself, such as a swatch. */
  visible?: boolean;
  align?: "left" | "right";
  /** A width class for the column, such as "w-28". Leave out on the one
   *  column that takes whatever is left. */
  width?: string;
};

export type DataTableRow = { key: string; cells: ReactNode[] };

/**
 * The bordered table the design system page reads its records in: the two
 * contrast tables, and the three tiers above them. Made a component when the
 * second kind arrived (Alejandro, November 2026), so a heading, a row line or
 * the frame changes once for every table on the site.
 *
 * The frame holds the table together as one object and stops at the measure,
 * where the paragraph above it stops, so a value stays near the label it
 * belongs to. Inside, only the lines between rows: a table read across, row
 * by row, gains nothing from vertical rules but noise. No fill: the contrast
 * figures are measured against the page surface, so the rows sit on it. The
 * heading row is sunken, and its labels are Label, SemiBold, at the label
 * tracking, so they read as headings rather than one more line of metadata.
 *
 * Two ways to meet a narrow screen, because two kinds of content do:
 *
 *   scroll  Numbers to compare down a column. The table keeps its columns and
 *           scrolls sideways inside its frame, from `minWidth` down. The
 *           frame is then a tab stop with a name, since a scroller with
 *           nothing focusable in it can't be reached by keyboard.
 *   stack   Sentences to read. Below 48rem of its own width (a container
 *           query, so it answers to the room it has, not the screen), each
 *           row becomes a block: the first cell as its title and every other
 *           cell under its column's name. Sideways scrolling through prose
 *           is reading through a letterbox.
 *
 * `relative` on the frame is load-bearing: a hidden heading is sr-only, which
 * is position: absolute, and an absolute box is clipped by a scroller only
 * when the scroller is its containing block. Without it a hidden label once
 * escaped and widened the whole document on a phone.
 */
export function DataTable({
  label,
  columns,
  rows,
  layout = "scroll",
  minWidth = "min-w-[43rem]",
  align = "middle",
  footer,
  className = "",
}: {
  /** Names the table. Required, because two tables sharing a name are two
   *  landmarks with the same sign. */
  label: string;
  columns: DataTableColumn[];
  rows: DataTableRow[];
  layout?: "scroll" | "stack";
  /** Scroll layout only: the narrowest the table gets before it scrolls. */
  minWidth?: string;
  /** Where a row's cells sit when one runs to several lines. */
  align?: "middle" | "top";
  /** A line under the last row, inside the frame: a status, a note. */
  footer?: ReactNode;
  className?: string;
}) {
  const stack = layout === "stack";
  const frame = `relative max-w-measure rounded-sm border border-border-subtle ${
    stack ? "@container" : "overflow-x-auto"
  } ${className}`;

  const table = (
    <table
      className={`w-full table-fixed border-collapse text-left ${
        stack ? "@max-3xl:block" : minWidth
      }`}
      aria-label={stack ? label : undefined}
    >
      <colgroup className={stack ? "@max-3xl:hidden" : undefined}>
        {columns.map((c) => (
          <col key={c.label} className={c.width} />
        ))}
      </colgroup>
      <thead className={stack ? "@max-3xl:sr-only" : undefined}>
        <tr className="border-b border-border-subtle bg-surface-sunken">
          {columns.map((c) => (
            <th
              key={c.label}
              scope="col"
              className={`py-3 pr-4 font-label text-xs font-semibold uppercase tracking-[0.11em] text-text-tertiary first:pl-5 last:pr-5 ${
                c.align === "right" ? "text-right" : ""
              }`}
            >
              <span className={c.visible === false ? "sr-only" : undefined}>{c.label}</span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className={stack ? "@max-3xl:block" : undefined}>
        {rows.map((r) => (
          <tr
            key={r.key}
            className={`border-b border-border-subtle last:border-b-0 ${
              stack ? "@max-3xl:block @max-3xl:px-5 @max-3xl:py-5" : ""
            }`}
          >
            {r.cells.map((cell, i) => {
              const c = columns[i];
              return (
                <td
                  key={c.label}
                  // In the stacked rows, every cell but the first carries its
                  // column's name above it, drawn from data-label so the name
                  // is written once, in the column list.
                  data-label={stack && i > 0 ? c.label : undefined}
                  className={`py-3.5 pr-4 first:pl-5 last:pr-5 ${align === "top" ? "align-top" : ""} ${
                    c.align === "right" ? "text-right" : ""
                  } ${
                    stack
                      ? "@max-3xl:block @max-3xl:p-0 @max-3xl:first:pl-0 @max-3xl:last:pr-0 @max-3xl:text-left @max-3xl:[&:not(:first-child)]:mt-4 @max-3xl:[&:not(:first-child)]:before:mb-1.5 @max-3xl:[&:not(:first-child)]:before:block @max-3xl:[&:not(:first-child)]:before:font-label @max-3xl:[&:not(:first-child)]:before:text-xs @max-3xl:[&:not(:first-child)]:before:font-semibold @max-3xl:[&:not(:first-child)]:before:uppercase @max-3xl:[&:not(:first-child)]:before:tracking-[0.11em] @max-3xl:[&:not(:first-child)]:before:text-text-tertiary @max-3xl:[&:not(:first-child)]:before:content-[attr(data-label)]"
                      : ""
                  }`}
                >
                  {cell}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );

  return stack ? (
    <div className={frame}>
      {table}
      {footer && <div className="border-t border-border-subtle px-5 py-3">{footer}</div>}
    </div>
  ) : (
    <div className={frame} tabIndex={0} role="region" aria-label={label}>
      {table}
      {footer && <div className="border-t border-border-subtle px-5 py-3">{footer}</div>}
    </div>
  );
}
