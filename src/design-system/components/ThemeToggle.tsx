"use client";

import { useEffect, useRef, useState } from "react";

export type ThemeChoice = "system" | "light" | "dark";

export const THEME_STORAGE_KEY = "mc-theme";

/**
 * Runs before first paint, injected into <head>. Without it the page renders
 * at the system theme for one frame before the stored choice applies — the
 * white flash that makes an otherwise careful dark mode feel cheap.
 *
 * Kept deliberately tiny and dependency-free; it is inlined as a string.
 */
export const themeInitScript = `(function(){try{var c=localStorage.getItem("${THEME_STORAGE_KEY}");if(c==="light"||c==="dark"){document.documentElement.setAttribute("data-theme",c)}}catch(e){}})();`;

function applyTheme(choice: ThemeChoice) {
  const root = document.documentElement;
  if (choice === "system") {
    root.removeAttribute("data-theme");
  } else {
    root.setAttribute("data-theme", choice);
  }
}

// Light, dark, then system. The order used to put system first, which is the
// order of importance — it is the default and the setting most visitors should
// keep — but not the order anyone reads a control in. A three-state theme
// switch is read as a spectrum: the two concrete choices, then the one that
// says "decide for me". Every desktop OS that ships this control orders it the
// same way, and a control that disagrees with the one in a person's system
// settings costs them a moment working out what it is.
//
// This array is the single source of both the visual order and the arrow-key
// order, because the radiogroup walks it directly. There is no second list to
// keep in step.
const options: { value: ThemeChoice; label: string; icon: React.ReactNode }[] = [
  {
    value: "light",
    label: "Light",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
        <circle cx="10" cy="10" r="3.4" />
        <path
          d="M10 2.4v1.8M10 15.8v1.8M17.6 10h-1.8M4.2 10H2.4M15.37 4.63l-1.27 1.27M5.9 14.1l-1.27 1.27M15.37 15.37l-1.27-1.27M5.9 5.9L4.63 4.63"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    value: "dark",
    label: "Dark",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
        <path d="M16.3 11.6A6.9 6.9 0 018.4 3.7a6.9 6.9 0 107.9 7.9z" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    value: "system",
    label: "Match system",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
        <rect x="2.5" y="3.5" width="15" height="10" rx="1.5" />
        <path d="M7 16.5h6" strokeLinecap="round" />
      </svg>
    ),
  },
];

/**
 * Three states, not two. A plain toggle silently discards "follow my system",
 * which is the setting most visitors actually want and the one they never get
 * back once a binary switch has been touched.
 *
 * Built to the ARIA radiogroup pattern, not merely labelled as one. For a
 * while this carried `role="radiogroup"` and `role="radio"` while behaving
 * like three unrelated buttons: three separate tab stops, arrow keys inert.
 * That is a promise to a screen reader the keyboard does not keep — the
 * announcement says "one of three" and the interaction says "three of three".
 *
 * axe passed it the whole time, which is the point worth keeping. The roles
 * were present and correctly nested, and that is all a static scan can check.
 * Whether the keys a role implies actually do anything is behavior, and
 * behavior is not a thing a linter sees. Same lesson as the theme chip whose
 * selected state was invisible and measured clean.
 */
export function ThemeToggle({
  orientation = "horizontal",
  density = "touch",
}: {
  /** The rail stacks these; the phone panel keeps them in a row. The keyboard
   *  behavior is identical either way — see `onKeyDown`, which has always
   *  accepted both axes — so this changes the layout and what the group tells
   *  a screen reader, and nothing else. */
  orientation?: "horizontal" | "vertical";
  /**
   * How big the hit area is, which is a different question from how big the
   * control looks.
   *
   * `touch` is a 32px chip centered in a 44px button, 1px apart. The 44 is not
   * decoration and not a container you can see: it is the hit area, and 44 is
   * the platform figure on both iOS and Android and the WCAG 2.2 AAA target.
   * The chip is what the eye reads; the button is what a thumb lands on, and
   * the thumb is less accurate than the eye. This is the phone panel.
   *
   * `pointer` collapses the two: a 32px button that is also the 32px chip,
   * 8px apart. A cursor is accurate to the pixel, so the padded hit area buys
   * nothing on a desktop rail, and the honest version is a control whose box
   * is the thing you can see. 32px still clears WCAG 2.2 AA, which asks for
   * 24, and sits under AAA, which asks for 44 — a trade that is defensible for
   * a pointer and would not be for a thumb.
   */
  density?: "touch" | "pointer";
} = {}) {
  const vertical = orientation === "vertical";
  const touch = density === "touch";
  const [choice, setChoice] = useState<ThemeChoice>("system");
  const [mounted, setMounted] = useState(false);
  const refs = useRef<Partial<Record<ThemeChoice, HTMLButtonElement | null>>>({});

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (stored === "light" || stored === "dark") setChoice(stored);
    } catch {
      /* private mode, blocked storage — the system default is a fine answer */
    }
  }, []);

  function select(next: ThemeChoice) {
    setChoice(next);
    applyTheme(next);
    try {
      if (next === "system") localStorage.removeItem(THEME_STORAGE_KEY);
      else localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* the theme still applies for this session */
    }
  }

  // Selection follows focus, which is the rule for radios and the opposite of
  // a listbox. Arrowing onto an option chooses it. That sounds aggressive
  // until you consider what this control does: every option is reversible in
  // one more keypress, and the result is visible instantly across the whole
  // page. Requiring a second key to confirm would mean arrowing past a theme
  // without ever seeing it.
  function move(next: ThemeChoice) {
    select(next);
    refs.current[next]?.focus();
  }

  function onKeyDown(e: React.KeyboardEvent) {
    const i = options.findIndex((o) => o.value === choice);
    if (i === -1) return;
    const last = options.length - 1;

    // Both axes, in both orientations. `aria-orientation` names the axis for a
    // screen reader, but a sighted keyboard user reaching this control has no
    // way to know which arrows it wants before trying one, and the group now
    // renders horizontally in the phone panel and vertically in the rail. A
    // control that answers only one axis is a dead key half the time.
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      move(options[(i + 1) % options.length].value);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      move(options[(i - 1 + options.length) % options.length].value);
    } else if (e.key === "Home") {
      e.preventDefault();
      move(options[0].value);
    } else if (e.key === "End") {
      e.preventDefault();
      move(options[last].value);
    }
  }

  return (
    <div
      role="radiogroup"
      aria-label="Color theme"
      // No enclosing box. The border was drawing a frame around three icons
      // that already read as a set, and in the header it put a second
      // rectangle inside a bar that is itself a rectangle. What groups these
      // now is proximity: the gap between them is far tighter than the gap to
      // anything else in the header, which is all a group of three needs.
      // The selected option still carries a filled ground, so the state does
      // not depend on the frame that is gone.
      // Declared, not assumed. A radiogroup is horizontal by default in ARIA,
      // so a stacked group that says nothing is announced as the wrong shape.
      aria-orientation={vertical ? "vertical" : "horizontal"}
      onKeyDown={onKeyDown}
      // The 12px that separate the chips do the grouping either way: stacked,
      // the 44px targets leave the same 12px between 32px chips vertically as
      // they did horizontally, so the proximity argument above carries over
      // unchanged rather than needing a new number.
      className={`inline-flex ${touch ? "gap-px" : "gap-2"} ${
        vertical ? "flex-col items-start" : "items-center"
      }`}
    >
      {options.map((option) => {
        const active = mounted && choice === option.value;
        // The roving tabindex, and the reason the group is ONE tab stop rather
        // than three. Note it reads `choice` and not `active`: `active` is
        // gated on mount so nothing renders as chosen before the stored
        // preference is known, and hanging tabindex off that would give the
        // server and the first client render two different tab orders.
        const tabbable = choice === option.value;
        return (
          <button
            key={option.value}
            ref={(el) => {
              refs.current[option.value] = el;
            }}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={option.label}
            title={option.label}
            tabIndex={tabbable ? 0 : -1}
            onClick={() => select(option.value)}
            className={[
              // See `density` above for why there are two sizes. The chip
              // inside is 32px either way, so the thing you look at does not
              // change between surfaces — only the margin of error around it.
              "group grid place-items-center transition-colors duration-[160ms]",
              touch ? "h-11 w-11" : "h-8 w-8",
              // The selected fill is the interactive blue, not the inverse
              // surface. Inside a frame the inverse fill read as a segmented
              // control; standing on its own it became the darkest object in
              // the header, at 19.8:1 against the bar, which is more weight
              // than a preference most visitors never touch deserves. The
              // blue is 7.5:1 in light and 9.5:1 in dark — unmistakable, and
              // a third of the visual force.
              //
              // The obvious quieter answer, the secondary button's tinted
              // ground, was built and measured and rejected. The tint reached
              // 1.17:1 against the header and the accent icon landed at
              // 1.17:1 against the unselected icons: same lightness, only the
              // hue apart. Selection would have rested on color alone, which
              // is exactly what WCAG 1.4.1 rules out, and axe passed it
              // clean — a state being invisible is not a thing axe can see.
            ].join(" ")}
          >
            <span
              className={[
                "grid h-8 w-8 place-items-center rounded-sm transition-colors duration-[160ms]",
                active
                  ? "bg-interactive text-interactive-on"
                  : "text-text-tertiary group-hover:bg-interactive-subtle group-hover:text-text-secondary",
              ].join(" ")}
            >
              {/* 24px in a 32px chip, so 4px of breathing room each side.
                  These were 20px, which at a 32px chip read as a small glyph
                  floating in a box rather than an icon with a ground. */}
              <span className="h-6 w-6">{option.icon}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
