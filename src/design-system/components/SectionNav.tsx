"use client";

import { useEffect, useState } from "react";

export type Section = {
  id: string;
  label: string;
  /**
   * One level of nesting, and only one.
   *
   * Two levels is a contents list; three is a document outline, and a document
   * outline in a 192px rail is a thing people stop reading. The constraint is
   * in the type on purpose: `children` holds leaves, not more `Section`s, so a
   * third level cannot be added without someone deciding to.
   */
  children?: { id: string; label: string }[];
};

/**
 * A contents list for a long page: real anchors to sections that all stay in
 * the document, with the current one marked as the reader scrolls.
 *
 * Not tabs, and the distinction is not pedantic. Tabs swap one region between
 * mutually exclusive views and only one exists on screen at a time. This
 * navigates a page where everything is present, which is the whole reason to
 * choose it: nothing is hidden from Cmd+F, from print, from search, or from a
 * reviewer skimming in forty seconds. Wiring anchors into `role="tablist"`
 * would announce `aria-selected` for something nobody selected and hand a
 * keyboard user arrow-key behavior no link has ever had.
 *
 * So it is a labelled nav around an ordered list of anchors, and the current
 * section carries `aria-current`. Plain, and correct for what it does.
 *
 * ---
 *
 * Two things that will bite whoever uses this next.
 *
 * **Sticky only works inside its own parent's box**, and this bites from both
 * directions. Wrapping the bar in a one-line div makes the div scroll away and
 * take the bar with it, silently, with no error. And in a grid, reaching for
 * `self-start` on the rail's cell to stop it stretching collapses that cell to
 * the height of the list, which is the same bug wearing a different hat: the
 * rail then travels for one screen and disappears.
 *
 * Let the grid cell stretch. The tall cell is not a layout accident, it is the
 * track the sticky element runs down.
 *
 * **Which side of the content it sits on is a layout decision, not a prop.**
 * Put it in the left or right column of the grid; the component does not care.
 * A `side` prop that mirrored the rule to the outer edge was built and thrown
 * away, because it put the marker at the far end of the column from the label
 * it marks. The rule belongs immediately beside the text it indexes, and the
 * text is left-aligned either way, so the rule stays on the left either way.
 *
 * **The sections need `scroll-mt`, and their spacing has to be margin rather
 * than padding.** Two separate traps that look like one bug.
 *
 * `scroll-margin-top` decides where a section's BORDER BOX lands, and a sticky
 * header will cover whatever sits above that, so without it the heading ends
 * up underneath the header. That part is well known.
 *
 * The second half is not. If the section carries its spacing as `pt-24`, the
 * border box top is 96px above the heading, so landing the box at 112px puts
 * the heading at 208px and leaves a strip of the PREVIOUS section showing in
 * the gap. It reads exactly like a scroll that stopped short, and no amount of
 * tuning `scroll-mt` fixes it, because the two numbers are fighting.
 *
 * Use `mt-*` for the space above a section and `scroll-mt-*` for the landing
 * offset. Margin sits outside the border box, so the box top is the heading
 * and `scroll-mt` then means what it looks like it means.
 */

export function SectionNav({
  items,
  orientation = "horizontal",
  label = "On this page",
  sticky = false,
  className = "",
}: {
  items: Section[];
  /** Horizontal reads as a bar under a hero. Vertical is the rail a long case study wants. */
  orientation?: "horizontal" | "vertical";
  /** The nav landmark's name. Change it if a page carries two. */
  label?: string;
  /** Vertical only. See the note above about why the horizontal bar cannot own this. */
  sticky?: boolean;
  className?: string;
}) {
  const [active, setActive] = useState<string | undefined>(items[0]?.id);

  useEffect(() => {
    // Children are observed too, so scrolling through the employers inside
    // Experience moves the mark between them rather than parking it on the
    // section heading until the next one arrives.
    const ids = items.flatMap((i) => [i.id, ...(i.children ?? []).map((c) => c.id)]);
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!els.length) return;

    // The band is deliberately narrow and sits high: a section counts as
    // current once its top reaches the upper fifth of the viewport, not when
    // it merely enters it. A wide band marks two sections at once on a short
    // page, which reads as a bug even though nothing is broken.
    const obs = new IntersectionObserver(
      (entries) => {
        const first = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (first) setActive(first.target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [items]);

  const vertical = orientation === "vertical";

  return (
    <nav
      aria-label={label}
      className={[vertical && sticky ? "sticky top-32" : "", className].join(" ")}
    >
      <ol
        className={
          vertical
            ? "flex flex-col gap-y-1 border-l border-border-subtle"
            : "flex flex-wrap items-end gap-x-7 gap-y-2 border-b border-border-subtle"
        }
      >
        {items.map((i) => {
          const kids = i.children ?? [];
          const activeChild = kids.some((c) => c.id === active);
          const on = i.id === active;
          // Three states, not two. A parent whose child is current is neither
          // "current" nor "not here": it is the section you are inside. It
          // takes the rule, so the branch reads as live, and primary text
          // rather than the accent, so exactly one item in the list is blue.
          // Two blue items would make the reader work out which one they are
          // actually at.
          const containing = activeChild && !on;
          return (
            <li key={i.id} className={vertical ? "-ml-px" : "-mb-px"}>
              <a
                href={`#${i.id}`}
                // Only the deepest current item carries it. A parent and a
                // child both announcing `aria-current` tells a screen reader
                // there are two current locations.
                aria-current={on ? "true" : undefined}
                className={[
                  "block font-mono text-xs uppercase tracking-[0.11em]",
                  "transition-colors duration-[160ms] ease-[var(--ease-out-quart)]",
                  vertical ? "border-l-2 py-2 pl-4" : "whitespace-nowrap border-b-2 pb-3 pt-1",
                  // Accent blue for the current section, matching the main nav
                  // and the current breadcrumb, so "you are here" is one
                  // treatment wherever it appears rather than three. The rule
                  // takes the same accent as the text: `interactive` is the
                  // fill blue and `text-accent` is its light/dark pair, and
                  // putting one against the other is two blues side by side.
                  //
                  // Semibold as well, for the same reason it is on the other
                  // two: the rule already carries a non-color cue here, so
                  // this is consistency rather than necessity, and monospace
                  // means it costs no layout.
                  on
                    ? "border-text-accent font-semibold text-text-accent"
                    : containing
                      ? "border-text-accent font-medium text-text-primary"
                      : "border-transparent font-medium text-text-secondary hover:border-border-strong hover:text-text-primary",
                ].join(" ")}
              >
                {i.label}
              </a>

              {/* Children render in the vertical rail only. A nested list laid
                  out horizontally is a row of items at two levels of meaning
                  with nothing to say which is which, and the horizontal
                  variant is the narrow-screen form, where the space is not
                  there either. The sections are all still reachable; the bar
                  indexes them one level up. */}
              {vertical && kids.length > 0 && (
                <ol className="flex flex-col">
                  {kids.map((c) => {
                    const childOn = c.id === active;
                    return (
                      <li key={c.id}>
                        <a
                          href={`#${c.id}`}
                          aria-current={childOn ? "true" : undefined}
                          className={[
                            // 13px, same as the parent. The type scale's floor
                            // is 13 and the 12 and 10 steps are deliberately
                            // unused, so depth is carried by the indent and the
                            // weight rather than by shrinking below the floor.
                            "block border-l-2 py-1.5 pl-8 font-mono text-xs uppercase tracking-[0.11em]",
                            "transition-colors duration-[160ms] ease-[var(--ease-out-quart)]",
                            childOn
                              ? "border-text-accent font-semibold text-text-accent"
                              : "border-transparent font-medium text-text-tertiary hover:border-border-strong hover:text-text-secondary",
                          ].join(" ")}
                        >
                          {c.label}
                        </a>
                      </li>
                    );
                  })}
                </ol>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
