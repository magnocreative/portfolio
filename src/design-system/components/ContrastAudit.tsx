"use client";

import { useEffect, useState } from "react";
import {
  resolveToken,
  contrastRatio,
  level,
  hex,
  type Level,
  type TokenKind,
} from "@/design-system/utils/contrast";
import { Tag, type TagTone } from "@/design-system/components/Tag";

export type AuditRow = {
  token: string;
  note: string;
  /** Display type only. Everything else is held to the small-text bar. */
  large?: boolean;
};

type Measured = AuditRow & { hex: string; ratio: number; verdict: Level };

/**
 * Which tone each verdict takes. Only a pass is drawn as a chip; see Tag for
 * why the chip has an edge rather than a darker fill.
 */
const verdictTone: Record<Level, TagTone> = {
  AAA: "pass",
  AA: "pass",
  "AA Large": "neutral",
  Fail: "danger",
  "Non-text AA": "pass",
  // Not a failure and not styled like one. A divider under 3:1 is a decision.
  Decorative: "neutral",
  Reference: "neutral",
};

/**
 * Measures each token against the page surface, live, in the visitor's own
 * browser — and re-measures when the theme changes.
 *
 * The measurement is deliberately not a lookup table. Reading a computed
 * custom property back gives you `oklch(...)`, and anything that parses that
 * as RGB produces confident nonsense, so each value is painted to a canvas and
 * the pixel is read. That is how --text-tertiary was caught at 3.92:1 in the
 * light theme, under the 4.5:1 its small mono metadata requires. It looked
 * completely fine on screen.
 */
export function ContrastAudit({
  rows,
  kind = "text",
  label,
}: {
  rows: AuditRow[];
  kind?: TokenKind;
  /**
   * Names the scrollable region. Required rather than optional, because two
   * regions sharing a name are two landmarks with the same sign, which is the
   * same rule Breadcrumbs carries a `label` for.
   */
  label: string;
}) {
  const [measured, setMeasured] = useState<Measured[] | null>(null);

  useEffect(() => {
    const measure = () => {
      const bg = resolveToken("--surface-page");
      if (!bg) return;
      setMeasured(
        rows.map((r) => {
          const fg = resolveToken(r.token);
          if (!fg) return { ...r, hex: "—", ratio: 0, verdict: "Fail" as Level };
          const ratio = contrastRatio(fg, bg);
          return { ...r, hex: hex(fg), ratio, verdict: level(ratio, r.large, kind) };
        }),
      );
    };
    measure();

    // The theme can change two ways: the toggle stamps data-theme, or the OS
    // setting flips underneath a visitor who never touched the toggle.
    const observer = new MutationObserver(measure);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", measure);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", measure);
    };
  }, [rows, kind]);

  return (
    // The table is wider than a phone, so this scrolls sideways. A div that
    // scrolls and holds nothing focusable is unreachable by keyboard: there is
    // no way into it and no way to arrow across. tabIndex makes it a stop, and
    // a stop in the tab order has to say what it is, hence role and label.
    //
    // Found by auditing at 390px. Five clean audits had run before this, all
    // at 1440, where the table fits and never scrolls. The bug was not hiding;
    // nobody had looked at the width where it exists.
    //
    // `relative` is load-bearing. The Swatch header is `sr-only`, which is
    // position: absolute, and an absolute box is clipped by a scroller only
    // when the scroller is its containing block. Without it the hidden label
    // escaped this div at x 600 and widened the whole document, so phones
    // laid the page out at 600px and zoomed it out to fit: the page sat in
    // the left two thirds of the screen with an empty strip beside it.
    //
    // The outline holds the table together as one object, and the width stops
    // at the measure, where the paragraph above it stops, so a ratio and its
    // grade stay near the token they belong to. At full width in Storybook
    // they sat 600px from it (Alejandro, November 2026). Inside, only the
    // lines between rows: a table read across, row by row, gains nothing from
    // vertical rules but noise. No fill: every ratio here is measured against
    // the page surface, so the rows sit on the page surface. A raised card
    // under them would show one surface and report another.
    <div
      className="relative max-w-measure overflow-x-auto rounded-sm border border-border-subtle"
      tabIndex={0}
      role="region"
      aria-label={label}
    >
      {/* Fixed columns, the same in every table on the page. Sized by their
          content, the browser gave each table its own grid, so the Value and
          Ratio columns of the two /system tables sat 40px apart, one above the
          other (Alejandro, November 2026). The widths hold the longest of
          each: a hex, a ratio, NON-TEXT AA; the role takes what is left,
          446px at the measure, room for every note on one line but the
          longest. 43rem is the narrowest that keeps them: on a phone the
          table scrolls inside its outline rather than wrap. */}
      <table className="w-full min-w-[43rem] table-fixed border-collapse text-left">
        <colgroup>
          <col className="w-[4.25rem]" />
          <col />
          <col className="w-28" />
          <col className="w-24" />
          <col className="w-40" />
        </colgroup>
        <thead>
          <tr className="border-b border-border-subtle bg-surface-sunken">
            {/* Headers are Label/Current, SemiBold at the label tracking, so
                the column names read as headings above the rows rather than
                as one more line of metadata (Alejandro, November 2026). */}
            {/* The swatch column is visual, but a header cell with no
                accessible name is a real failure: a screen reader announces
                the column as unlabelled. Its name is present and hidden, not
                absent. Result is shown: the grade is what a reader scans the
                table for, and an unnamed column left them to guess what AAA
                and Decorative were grading (Alejandro, November 2026). */}
            {[
              { label: "Swatch", visible: false },
              { label: "Role", visible: true },
              { label: "Value", visible: true },
              { label: "Ratio", visible: true },
              { label: "Result", visible: true },
            ].map((h, i) => (
              <th
                key={h.label}
                scope="col"
                className={`py-3 pr-4 font-label text-xs font-semibold uppercase tracking-[0.11em] text-text-tertiary first:pl-5 last:pr-5 ${
                  i >= 3 ? "text-right" : ""
                }`}
              >
                <span className={h.visible ? undefined : "sr-only"}>{h.label}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(measured ?? rows.map((r) => ({ ...r, hex: "", ratio: 0, verdict: "AA" as Level }))).map((m) => (
            <tr key={m.token} className="border-b border-border-subtle last:border-b-0">
              <td className="py-3.5 pr-4 pl-5">
                <span
                  className="block h-8 w-8 rounded-sm border border-border-default"
                  style={{ background: `var(${m.token})` }}
                />
              </td>
              <td className="py-3.5 pr-4">
                <div className="font-label text-xs text-text-primary">{m.token}</div>
                <div className="mt-0.5 text-xs text-text-tertiary">{m.note}</div>
              </td>
              <td className="py-3.5 pr-4 font-label text-xs text-text-tertiary">{m.hex || "—"}</td>
              <td className="py-3.5 pr-4 text-right font-label text-xs text-text-primary">
                {/* A surface measured against itself is 1.00:1 by definition.
                    Printing that invites the reader to treat it as a result. */}
                {!measured ? "—" : m.token === "--surface-page" ? "—" : `${m.ratio.toFixed(2)}:1`}
              </td>
              {/* nowrap: a chip never breaks across two lines. At 390, before
                  the columns were fixed, "NON-TEXT AA" did. */}
              <td className="py-3.5 pr-5 text-right whitespace-nowrap">
                {measured && (
                  // The unboxed tones carry the chip's own padding, so every
                  // verdict's text ends on the same right edge down the column.
                  <Tag
                    tone={verdictTone[m.verdict]}
                    className={verdictTone[m.verdict] === "pass" ? "" : "px-2.5 py-0.5"}
                  >
                    {m.verdict}
                  </Tag>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!measured && (
        <p className="border-t border-border-subtle px-5 py-3 font-label text-xs text-text-tertiary">Measuring…</p>
      )}
    </div>
  );
}
