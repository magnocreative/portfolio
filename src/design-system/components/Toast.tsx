import type { ReactNode } from "react";

/**
 * A short message that rises from the bottom of the screen and leaves on its
 * own: the password gate's "That's not quite it. Try again." Mirrors the
 * Toast component in Figma.
 *
 * The live region is always in the page and only its content changes, so a
 * screen reader announces the message when it appears (a region added at the
 * same moment as its text is often missed). A pill on the raised surface with
 * a hairline, the same edge every surface here has; the tone is carried by
 * one 8px dot, not a red fill, so the message reads as information rather
 * than an alarm. Render it inside a modal dialog when there is one: a modal
 * sits in the top layer and would cover anything outside it.
 */
export function Toast({
  open,
  tone = "danger",
  children,
}: {
  open: boolean;
  tone?: "danger" | "success" | "neutral";
  children: ReactNode;
}) {
  const dot = { danger: "bg-status-danger", success: "bg-status-success", neutral: "bg-text-tertiary" }[tone];
  return (
    <div
      role="status"
      aria-live="polite"
      className={`pointer-events-none fixed bottom-8 left-1/2 z-50 w-max max-w-[calc(100%-2rem)] -translate-x-1/2 transition-[opacity,translate] duration-[240ms] ease-out motion-reduce:transition-none ${
        open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      {open && (
        <div className="flex items-center gap-2.5 rounded-full border border-border-default bg-surface-raised px-4 py-3 text-sm text-text-primary shadow-[0_8px_24px_rgb(3_16_33/0.12)]">
          <span aria-hidden="true" className={`h-2 w-2 shrink-0 rounded-full ${dot}`} />
          <span>{children}</span>
        </div>
      )}
    </div>
  );
}
