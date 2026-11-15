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
import { DataTable } from "@/design-system/components/DataTable";

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

  const shown = measured ?? rows.map((r) => ({ ...r, hex: "", ratio: 0, verdict: "AA" as Level }));

  // The frame, the headings and the scrolling live in DataTable, shared with
  // the tiers table on the same page. The table scrolls rather than stacks:
  // these are figures read down a column, so the columns have to survive.
  // Found the hard way at 390px, after five audits at 1440 where it never
  // scrolled: the scroller has to be a named tab stop (see DataTable).
  return (
    <DataTable
      label={label}
      layout="scroll"
      // Fixed columns, the same in every table on the page. Sized by their
      // content, the browser gave each table its own grid, so the Value and
      // Ratio columns of the two /system tables sat 40px apart, one above the
      // other (Alejandro, November 2026). The widths hold the longest of
      // each: a hex, a ratio, NON-TEXT AA; the role takes what is left,
      // 446px at the measure, room for every note on one line but the
      // longest. 43rem is the narrowest that keeps them: on a phone the
      // table scrolls inside its outline rather than wrap.
      minWidth="min-w-[43rem]"
      columns={[
        // The swatch column is visual, but a header cell with no accessible
        // name is a real failure: a screen reader announces the column as
        // unlabelled. Its name is present and hidden, not absent. Result is
        // shown: the grade is what a reader scans the table for (Alejandro,
        // November 2026).
        { label: "Swatch", visible: false, width: "w-[4.25rem]" },
        { label: "Role" },
        { label: "Value", width: "w-28" },
        { label: "Ratio", width: "w-24", align: "right" },
        { label: "Result", width: "w-40", align: "right" },
      ]}
      rows={shown.map((m) => ({
        key: m.token,
        cells: [
          <span
            key="swatch"
            className="block h-8 w-8 rounded-sm border border-border-default"
            style={{ background: `var(${m.token})` }}
          />,
          <div key="role">
            <div className="font-label text-xs text-text-primary">{m.token}</div>
            <div className="mt-0.5 text-xs text-text-tertiary">{m.note}</div>
          </div>,
          <span key="value" className="font-label text-xs text-text-tertiary">
            {m.hex || "—"}
          </span>,
          // A surface measured against itself is 1.00:1 by definition.
          // Printing that invites the reader to treat it as a result.
          <span key="ratio" className="font-label text-xs text-text-primary">
            {!measured ? "—" : m.token === "--surface-page" ? "—" : `${m.ratio.toFixed(2)}:1`}
          </span>,
          // nowrap: a chip never breaks across two lines. At 390, before the
          // columns were fixed, "NON-TEXT AA" did.
          <span key="result" className="whitespace-nowrap">
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
          </span>,
        ],
      }))}
      footer={!measured && <p className="font-label text-xs text-text-tertiary">Measuring…</p>}
    />
  );
}
