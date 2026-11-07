import type { ReactNode } from "react";

export type TagTone = "pass" | "neutral" | "danger";

/**
 * A short uppercase status: "In writing" on a draft case study, AA or Fail
 * against a measured contrast ratio. Mirrors the Tag component in Figma.
 *
 * Two copies existed before this, and they disagreed on the two properties
 * that make a label read as a label: the draft tag was Medium at 0.11em, the
 * contrast chips Regular at 0.08em. Both now take the site's label setting,
 * the same as every eyebrow and section head.
 *
 * Three tones, and only `pass` is drawn as a chip:
 *
 *   pass: accent text in a pale interactive fill with a hairline edge. A tint
 *     on the page cannot carry its own shape by luminance alone (pushing the
 *     fill until it read as a gray box only reached 1.15:1), so the edge does
 *     it, at a contrast the eye registers, and the fill stays light enough for
 *     the label inside to keep its own ratio.
 *   neutral: tertiary text, no box. For a state that is information rather
 *     than a result: a draft, a large-text allowance, a divider kept under
 *     3:1 on purpose.
 *   danger: the status red, no box. A failure is not decorated.
 *
 * `dot` puts a small mark in front, for a tag that sits alone on a line and
 * needs something to anchor it there, like the draft tag under a case study.
 */
const tones: Record<TagTone, string> = {
  pass:
    "rounded-[var(--radius-pill)] border border-[color-mix(in_oklab,var(--text-accent)_35%,transparent)] bg-interactive-subtle px-2.5 py-0.5 text-text-accent",
  neutral: "text-text-tertiary",
  danger: "text-status-danger",
};

export function Tag({
  tone = "neutral",
  dot = false,
  className = "",
  children,
}: {
  tone?: TagTone;
  dot?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 font-label text-xs font-medium uppercase tracking-[0.11em] ${tones[tone]} ${className}`}
    >
      {dot && <span aria-hidden="true" className="h-1 w-1 rounded-full bg-border-strong" />}
      {children}
    </span>
  );
}
