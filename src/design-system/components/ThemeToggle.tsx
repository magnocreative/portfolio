"use client";

import { useSyncExternalStore } from "react";

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

/* All three normalized to the same ink box, x 3 to 17, so they share a left
   edge with the nav icons and with each other. They were drawn to 2.4, 2.6 and
   2.5, which is invisible in isolation and reads as a ragged column the moment
   they sit under a logo whose own ink starts flush. A shared viewBox is not a
   shared ink box. */
const SunIcon = (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
    <circle cx="10" cy="10" r="3.2" />
    <path
      d="M10 3v1.7M10 15.3v1.7M17 10h-1.7M4.7 10H3M14.95 5.05l-1.2 1.2M6.25 13.75l-1.2 1.2M14.95 14.95l-1.2-1.2M6.25 6.25L5.05 5.05"
      strokeLinecap="round"
    />
  </svg>
);

const MoonIcon = (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
    <path d="M17 12.1A7.1 7.1 0 018.1 3.2a7.1 7.1 0 108.9 8.9z" strokeLinejoin="round" />
  </svg>
);

const SystemIcon = (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
    <rect x="3" y="3.5" width="14" height="10" rx="1.5" />
    <path d="M7 17h6" strokeLinecap="round" />
  </svg>
);

/** Subscribe to the stored choice, which lives on <html> rather than in React.
 *  One source of truth, so two toggles on a page cannot disagree. */
function useChoice(): ThemeChoice {
  return useSyncExternalStore(
    (onChange) => {
      const mo = new MutationObserver(onChange);
      mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
      return () => mo.disconnect();
    },
    () => {
      const v = document.documentElement.getAttribute("data-theme");
      return v === "light" || v === "dark" ? v : "system";
    },
    () => "system" as ThemeChoice,
  );
}

/**
 * Subscribe to the OS preference itself.
 *
 * Needed because of what the switch has to answer: when the choice is
 * "system", the switch must offer the opposite of what the system is currently
 * resolving to, and nothing in the DOM records that — `data-theme` is absent
 * in system mode precisely so the CSS falls through to the media query. So the
 * media query is a second external store, subscribed to rather than read once,
 * or the switch would start offering the wrong direction the moment someone
 * changed their OS from light to dark with the page open.
 */
function useSystemDark(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia("(prefers-color-scheme: dark)").matches,
    () => false,
  );
}

/**
 * Two controls, not three: a light/dark switch and a "match system" mode.
 *
 * This replaced a three-option radiogroup — Light, Dark, Match system — and the
 * reduction is not just one fewer button. Light and Dark were never really
 * three peers: they are two values of one axis, and "match system" is a
 * different kind of thing entirely, a statement about who decides rather than
 * about which theme. Rendering all three as equal siblings said they were the
 * same kind of choice. They are not.
 *
 * The one thing the old version got right and a plain binary toggle usually
 * destroys is that "follow my system" survives. A two-state switch on its own
 * discards it permanently the first time anyone touches it — the setting most
 * visitors actually want becomes unreachable. Keeping it as its own mode
 * button is what makes the reduction safe.
 *
 * The switch shows the theme it will GIVE you, not the one you are in, and its
 * name says the action: "Switch to dark theme". Icon and label describe the
 * same thing, which is the only way the pair is unambiguous — an icon showing
 * current state beside a label describing an action is two signals pointing
 * opposite ways.
 *
 * The mode button is a real toggle and reverses both ways: pressed means the
 * system decides; pressing it again pins whatever the system is currently
 * resolving to, so you are never stuck in a state you cannot leave by the
 * control that put you there. `aria-pressed` carries that to a screen reader.
 *
 * What went with the radiogroup: the roving tabindex, the arrow-key handler
 * and `aria-orientation`. Two buttons are two tab stops and that is correct —
 * the roving pattern exists to stop a group of peers eating the tab order, and
 * these two are not peers.
 */
export function ThemeToggle({
  orientation = "horizontal",
  density = "touch",
}: {
  /** Row or stack. Both controls behave identically either way. */
  orientation?: "horizontal" | "vertical";
  /**
   * How big the hit area is, which is a different question from how big the
   * control looks.
   *
   * `touch` is a 32px chip centered in a 44px button. The 44 is not decoration
   * and not a container you can see: it is the hit area, and 44 is the
   * platform figure on both iOS and Android and the WCAG 2.2 AAA target. The
   * chip is what the eye reads; the button is what a thumb lands on, and the
   * thumb is less accurate than the eye.
   *
   * `pointer` collapses the two: a 32px button that is also the 32px chip. A
   * cursor is accurate to the pixel, so the padded hit area buys nothing on a
   * desktop rail. 32px still clears WCAG 2.2 AA, which asks for 24, and sits
   * under AAA, which asks for 44 — defensible for a pointer, and not for a
   * thumb.
   */
  density?: "touch" | "pointer";
} = {}) {
  const choice = useChoice();
  const systemDark = useSystemDark();
  const vertical = orientation === "vertical";
  const touch = density === "touch";

  // What the page is actually showing, which is not the same as what was
  // chosen: in system mode the choice is "system" and the theme is whatever
  // the OS says. The switch has to act on the former and describe the latter.
  const resolved: "light" | "dark" = choice === "system" ? (systemDark ? "dark" : "light") : choice;
  const target: "light" | "dark" = resolved === "dark" ? "light" : "dark";
  const isSystem = choice === "system";

  // 32px chip inside the target, same construction for both controls, so hover
  // and selected are the same object in two colors rather than two shapes.
  const button = [
    "group grid place-items-center transition-colors duration-[160ms]",
    touch ? "h-11 w-11" : "h-8 w-8",
  ].join(" ");
  const chip = "grid h-8 w-8 place-items-center rounded-sm transition-colors duration-[160ms]";
  const quiet =
    "text-text-tertiary group-hover:bg-surface-sunken group-hover:text-text-secondary";
  // The selected fill is the interactive blue, not an inverse surface. The
  // inverse made this the darkest object in the header at 19.8:1 against the
  // bar, which is more weight than a preference most visitors never touch
  // deserves. The blue is 7.5:1 light and 9.5:1 dark — unmistakable, and a
  // third of the visual force. The quieter answer, the tinted ground, was
  // built and measured and rejected: it reached 1.17:1 against the header and
  // 1.17:1 between selected and unselected icons, which would have rested the
  // state on hue alone. axe passed that version clean.
  const selected = "bg-interactive text-interactive-on";

  return (
    <div
      role="group"
      aria-label="Color theme"
      className={`inline-flex ${touch ? "gap-px" : "gap-2"} ${
        vertical ? "flex-col items-start" : "items-center"
      }`}
    >
      <button
        type="button"
        onClick={() => {
          applyTheme(target);
          try {
            localStorage.setItem(THEME_STORAGE_KEY, target);
          } catch {
            /* the theme still applies for this session */
          }
        }}
        aria-label={`Switch to ${target} theme`}
        title={`Switch to ${target} theme`}
        className={button}
      >
        <span className={`${chip} ${quiet}`}>
          <span className="h-6 w-6">{target === "dark" ? MoonIcon : SunIcon}</span>
        </span>
      </button>

      <button
        type="button"
        // Pressing it while pressed pins the theme the system is currently
        // resolving to. Without that, the only way out of system mode would be
        // the other button, and a toggle you cannot untoggle is not a toggle.
        onClick={() => {
          const next: ThemeChoice = isSystem ? resolved : "system";
          applyTheme(next);
          try {
            if (next === "system") localStorage.removeItem(THEME_STORAGE_KEY);
            else localStorage.setItem(THEME_STORAGE_KEY, next);
          } catch {
            /* the theme still applies for this session */
          }
        }}
        aria-pressed={isSystem}
        aria-label="Match system theme"
        title="Match system theme"
        className={button}
      >
        <span className={`${chip} ${isSystem ? selected : quiet}`}>
          <span className="h-6 w-6">{SystemIcon}</span>
        </span>
      </button>
    </div>
  );
}
