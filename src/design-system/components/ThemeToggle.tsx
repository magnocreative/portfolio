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
export function ThemeToggle() {
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

    // Both axes, because the group is horizontal in the header and there is no
    // reliable way for a keyboard user to know that before they try.
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
      onKeyDown={onKeyDown}
      className="inline-flex items-center gap-px"
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
              // 36px target around a 28px chip: the chip is what you see, the
              // button is what you hit. 28 cleared the 24px AA minimum but sat
              // well under the 44 both mobile platforms ask for. 44 was tried
              // and rejected here, because it leaves 16px of dead space
              // between chips and proximity is the only thing grouping these
              // three now the frame is gone. 36 is AA plus half again.
              "group grid h-9 w-9 place-items-center transition-colors duration-[160ms]",
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
                "grid h-7 w-7 place-items-center rounded-sm transition-colors duration-[160ms]",
                active
                  ? "bg-interactive text-interactive-on"
                  : "text-text-tertiary group-hover:bg-interactive-subtle group-hover:text-text-secondary",
              ].join(" ")}
            >
              <span className="h-4 w-4">{option.icon}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
