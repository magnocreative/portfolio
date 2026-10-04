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
      className={[
        // Two offsets, and both align the first LABEL rather than the first
        // BOX. A row carries `py-2.5`, so aligning the boxes leaves the text
        // 10px low — which is most of the gap that made the rail look like it
        // was sagging next to the content it indexes.
        //
        // `-mt-2.5` cancels that padding at the top of the list, so the page
        // can position this column with the same round number its header uses
        // (`mt-36` against the header's `pt-36`) and have the two lines agree.
        //
        // The stuck offset is derived from the same expression as the
        // sections' own `scroll-margin-top` in globals.css, minus the same
        // 10px. Jump to a section and its heading lands at `banner + 40`; this
        // puts the nav's first label on exactly that line instead of 34px
        // below it. Writing it as the same calc rather than as a number is
        // what keeps the two from drifting the next time the banner changes
        // height — which has already happened once this file was alive.
        vertical && sticky
          ? "sticky top-[calc(var(--banner-height)+2.5rem-0.625rem)]"
          : "",
        vertical ? "-mt-2.5" : "",
        className,
      ].join(" ")}
    >
      {/* The vertical rail has NO rule of its own, and that is the whole
          mechanism behind the break beside a nested list.

          It used to carry `border-l`, which drew one unbroken spine down the
          entire list — including the stretch beside the subsections, so a
          nested group sat between two parallel lines 16px apart. A rule that
          belongs to the list cannot stop for part of the list.

          So the rule became a property of each top-level ROW instead (see the
          anchor below), and the nested list keeps its own. The spine now runs
          beside Experience, stops while its children are indexed by their own
          rule, and resumes at the next top-level item.

          `gap-y-1` went with it. A per-row rule plus a 4px gap is a dashed
          line, and the dashes only appear between two childless items, which
          is exactly the pair nobody checks. The 4px is given back as padding
          on the row, so the spacing between items is unchanged at 20px. */}
      <ol
        className={
          vertical
            ? "flex flex-col"
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
            <li key={i.id} className={vertical ? "" : "-mb-px"}>
              <a
                href={`#${i.id}`}
                // Only the deepest current item carries it. A parent and a
                // child both announcing `aria-current` tells a screen reader
                // there are two current locations.
                aria-current={on ? "true" : undefined}
                className={[
                  "block font-mono text-xs uppercase tracking-[0.11em]",
                  "transition-colors duration-[160ms] ease-[var(--ease-out-quart)]",
                  // The 1px track is a background gradient, not a border,
                  // because `border-left` is already spoken for by the 2px
                  // marker and an element has only one of those. It works
                  // because `background-clip` defaults to `border-box`: the
                  // background paints UNDER the border, so a 1px stripe at the
                  // left edge shows through while the marker is transparent,
                  // and is covered the moment the marker takes a colour. One
                  // element, two concentric rules, no extra DOM.
                  //
                  // `py-2.5` rather than `py-2` absorbs the `gap-y-1` the list
                  // gave up: 10 + 10 is the same 20px of air that 8 + 4 + 8
                  // was, so this is the same rhythm drawn a different way.
                  vertical
                    ? "border-l-2 bg-[linear-gradient(to_right,var(--border-subtle)_1px,transparent_1px)] py-2.5 pl-4"
                    : "whitespace-nowrap border-b-2 pb-3 pt-1",
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
                  indexes them one level up.

                  The nested list carries its OWN rule, indented by 16 to sit
                  under the parent's text rather than under the parent's rule.
                  Before this the children were indented by padding alone, so
                  three employers hung off the same spine as the three
                  top-level sections and the hierarchy was carried entirely by
                  how far the words started. The rule is the thing the eye
                  follows down a contents list; if it does not step in, nothing
                  structural does.

                  The 16 and the children's `pl-4` add up to exactly the `pl-8`
                  they replaced, so no label moves. This adds a line; it does
                  not re-space the list.

                  The outer rule deliberately continues past them. A reader
                  inside USAA is also inside Experience, and the two marks at
                  two depths are what say so — which is the same reason the
                  parent keeps its `containing` state while a child is
                  current. */}
              {vertical && kids.length > 0 && (
                <ol className="ml-4 flex flex-col border-l border-border-subtle">
                  {kids.map((c) => {
                    const childOn = c.id === active;
                    return (
                      <li key={c.id} className="-ml-px">
                        <a
                          href={`#${c.id}`}
                          aria-current={childOn ? "true" : undefined}
                          className={[
                            // 13px, same as the parent. The type scale's floor
                            // is 13 and the 12 and 10 steps are deliberately
                            // unused, so depth is carried by the indent and the
                            // weight rather than by shrinking below the floor.
                            "block border-l-2 py-1.5 pl-4 font-mono text-xs uppercase tracking-[0.11em]",
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
