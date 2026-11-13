import type { ReactNode } from "react";
import { CircleCheckIcon, CircleXIcon, InfoIcon } from "./Icon";

/**
 * A short message about the whole page that rises from the bottom of the
 * screen and leaves on its own: "Link copied", "Your PDF is downloading".
 * Mirrors the Toast component in Figma.
 *
 * Not for an error in a form. A message about one field goes under that
 * field, where the eye already is; the password gate moved its wrong-password
 * note there for that reason (Alejandro, November 2026).
 *
 * The tone is an icon (an X, a check, an i) as well as a color, so it never
 * rests on color alone. The icon is 20px, the size its 20-unit grid is drawn
 * at, so its 1.5px strokes land on whole pixels. A countdown hairline was
 * tried along the bottom and taken out: more motion than message (Alejandro,
 * November 2026). The parent decides how long it stays up.
 *
 * The live region is always in the page and only its content changes, so a
 * screen reader announces the message when it appears (a region added at the
 * same moment as its text is often missed). Render it inside a modal dialog
 * when there is one: a modal sits in the top layer and would cover anything
 * outside it.
 */

/* Each tone in its own color: the words in its text role, a hairline edge
   and a light tint of its fill, the way the live Tag is drawn (Alejandro,
   November 2026). The tint is stronger in dark, where 8% disappears. */
const TONES = {
  danger: {
    Icon: CircleXIcon,
    pill: "text-text-danger border-[color-mix(in_oklab,var(--status-danger)_40%,var(--surface-raised))] bg-[color-mix(in_oklab,var(--status-danger)_8%,var(--surface-raised))] scheme-dark:bg-[color-mix(in_oklab,var(--status-danger)_12%,var(--surface-raised))]",
  },
  success: {
    Icon: CircleCheckIcon,
    pill: "text-text-success border-[color-mix(in_oklab,var(--status-success)_40%,var(--surface-raised))] bg-[color-mix(in_oklab,var(--status-success)_8%,var(--surface-raised))] scheme-dark:bg-[color-mix(in_oklab,var(--status-success)_12%,var(--surface-raised))]",
  },
  info: {
    Icon: InfoIcon,
    pill: "text-text-accent border-[color-mix(in_oklab,var(--interactive-default)_40%,var(--surface-raised))] bg-[color-mix(in_oklab,var(--interactive-default)_8%,var(--surface-raised))] scheme-dark:bg-[color-mix(in_oklab,var(--interactive-default)_14%,var(--surface-raised))]",
  },
} as const;

export function Toast({
  open,
  tone = "info",
  children,
}: {
  open: boolean;
  tone?: keyof typeof TONES;
  children: ReactNode;
}) {
  const { Icon, pill } = TONES[tone];
  return (
    <div
      role="status"
      aria-live="polite"
      className={`pointer-events-none fixed bottom-8 left-1/2 z-50 w-max max-w-[calc(100%-2rem)] -translate-x-1/2 transition-[opacity,translate] duration-[240ms] ease-out motion-reduce:transition-none ${
        open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      {open && (
        <div className={`flex items-center gap-2.5 rounded-full border py-3 pr-4 pl-3.5 text-sm shadow-[0_8px_24px_rgb(3_16_33/0.12)] ${pill}`}>
          <Icon className="h-5 w-5 shrink-0" />
          <span>{children}</span>
        </div>
      )}
    </div>
  );
}
