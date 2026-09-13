"use client";

import { useId, useRef, useState, type ReactNode } from "react";

export type Tab = {
  id: string;
  label: string;
  content: ReactNode;
  disabled?: boolean;
};

/**
 * Tabs, built to the ARIA pattern rather than to look like it.
 *
 * Almost every hand-rolled tab set on the web is a row of divs with a click
 * handler. It looks identical and it is broken in three ways nobody sees in a
 * screenshot, all of which this fixes:
 *
 *   1. Arrow keys move between tabs; Home and End jump to the ends. Tab itself
 *      moves OUT of the tablist to the panel. That is the whole point of a
 *      roving tabindex: one stop for the group, not one stop per tab, so a
 *      keyboard user with nine tabs does not press Tab nine times to get past
 *      them.
 *   2. `aria-selected` and `aria-controls` tell a screen reader which tab is
 *      active and what it governs. Colour alone tells it nothing.
 *   3. The panel is focusable, so somebody who arrives by keyboard can scroll
 *      its content. A panel with `tabIndex={-1}` is readable and unscrollable.
 *
 * A real caveat before using this: tabs hide content. Hidden content is not
 * scanned, not found by Cmd+F, not printed, and not indexed. On a case study,
 * where a reviewer is skimming for evidence you did the work, that is a real
 * cost. Tabs earn their place on reference material somebody consults, not on
 * an argument somebody reads. Sections and a sticky contents list beat tabs
 * for the latter every time.
 */

export function Tabs({
  tabs,
  label,
  defaultTab,
  className = "",
}: {
  tabs: Tab[];
  /** Names the tablist for assistive tech. Required, and it should say what the set organises. */
  label: string;
  defaultTab?: string;
  className?: string;
}) {
  const uid = useId();
  const firstEnabled = tabs.find((t) => !t.disabled)?.id ?? tabs[0]?.id;
  const [active, setActive] = useState(defaultTab ?? firstEnabled);
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  const enabled = tabs.filter((t) => !t.disabled);

  function move(to: string) {
    setActive(to);
    // Focus follows selection, which is the correct behaviour for tabs whose
    // panels are already rendered: arrowing through them should reveal each
    // one, not require a second keypress to confirm.
    refs.current[to]?.focus();
  }

  function onKeyDown(e: React.KeyboardEvent) {
    const i = enabled.findIndex((t) => t.id === active);
    if (i === -1) return;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      move(enabled[(i + 1) % enabled.length].id);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      move(enabled[(i - 1 + enabled.length) % enabled.length].id);
    } else if (e.key === "Home") {
      e.preventDefault();
      move(enabled[0].id);
    } else if (e.key === "End") {
      e.preventDefault();
      move(enabled[enabled.length - 1].id);
    }
  }

  return (
    <div className={className}>
      {/* An underline indicator rather than a filled or pill tab. The button
          family already owns fills on this site, and a row of filled tabs
          beside a filled button reads as two primaries competing. A rule under
          the active label says the same thing and says it more quietly, which
          is what a piece of structural furniture should do. */}
      <div
        role="tablist"
        aria-label={label}
        onKeyDown={onKeyDown}
        className="flex flex-wrap items-end gap-x-7 gap-y-2 border-b border-border-subtle"
      >
        {tabs.map((t) => {
          const selected = t.id === active;
          return (
            <button
              key={t.id}
              ref={(el) => {
                refs.current[t.id] = el;
              }}
              role="tab"
              id={`${uid}-tab-${t.id}`}
              aria-controls={`${uid}-panel-${t.id}`}
              aria-selected={selected}
              // The roving tabindex. Exactly one tab is in the tab order.
              tabIndex={selected ? 0 : -1}
              disabled={t.disabled}
              onClick={() => !t.disabled && setActive(t.id)}
              className={[
                "-mb-px border-b-2 pb-3 pt-1",
                "font-mono text-xs font-medium uppercase tracking-[0.11em] whitespace-nowrap",
                "transition-colors duration-[160ms] ease-[var(--ease-out-quart)]",
                // Disabled is an explicit colour, never opacity. An
                // opacity-dimmed label has a ratio that depends on whatever is
                // behind it, so nobody can tell you what it measures. This is
                // 5.87:1 in light and 7.02:1 in dark, and it is skipped by the
                // arrow keys rather than merely looking unavailable.
                t.disabled
                  ? "cursor-not-allowed border-transparent text-text-tertiary"
                  : selected
                    ? "border-interactive text-text-primary"
                    : "border-transparent text-text-secondary hover:border-border-strong hover:text-text-primary",
              ].join(" ")}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {tabs.map((t) => (
        <div
          key={t.id}
          role="tabpanel"
          id={`${uid}-panel-${t.id}`}
          aria-labelledby={`${uid}-tab-${t.id}`}
          hidden={t.id !== active}
          tabIndex={0}
          className="pt-8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-ring)]"
        >
          {t.content}
        </div>
      ))}
    </div>
  );
}
