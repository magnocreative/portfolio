"use client";

import { useEffect, useState } from "react";

export type Section = { id: string; label: string };

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
 * keyboard user arrow-key behaviour no link has ever had.
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
    const els = items
      .map((i) => document.getElementById(i.id))
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
          const on = i.id === active;
          return (
            <li key={i.id} className={vertical ? "-ml-px" : "-mb-px"}>
              <a
                href={`#${i.id}`}
                aria-current={on ? "true" : undefined}
                className={[
                  "block font-mono text-xs font-medium uppercase tracking-[0.11em]",
                  "transition-colors duration-[160ms] ease-[var(--ease-out-quart)]",
                  vertical ? "border-l-2 py-2 pl-4" : "whitespace-nowrap border-b-2 pb-3 pt-1",
                  on
                    ? "border-interactive text-text-primary"
                    : "border-transparent text-text-secondary hover:border-border-strong hover:text-text-primary",
                ].join(" ")}
              >
                {i.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
