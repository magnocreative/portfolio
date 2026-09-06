"use client";

import { useEffect, useState } from "react";

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

const options: { value: ThemeChoice; label: string; icon: React.ReactNode }[] = [
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
];

/**
 * Three states, not two. A plain toggle silently discards "follow my system",
 * which is the setting most visitors actually want and the one they never get
 * back once a binary switch has been touched.
 */
export function ThemeToggle() {
  const [choice, setChoice] = useState<ThemeChoice>("system");
  const [mounted, setMounted] = useState(false);

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

  return (
    <div
      role="radiogroup"
      aria-label="Color theme"
      className="inline-flex items-center gap-px rounded-sm border border-border-default p-px"
    >
      {options.map((option) => {
        const active = mounted && choice === option.value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={option.label}
            title={option.label}
            onClick={() => select(option.value)}
            className={[
              "grid h-6 w-6 place-items-center rounded-[3px] transition-colors duration-[160ms]",
              active
                ? "bg-surface-inverse text-text-inverse"
                : "text-text-tertiary hover:bg-interactive-subtle hover:text-text-secondary",
            ].join(" ")}
          >
            <span className="h-3.5 w-3.5">{option.icon}</span>
          </button>
        );
      })}
    </div>
  );
}
