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

export type AuditRow = {
  token: string;
  note: string;
  /** Display type only. Everything else is held to the small-text bar. */
  large?: boolean;
};

type Measured = AuditRow & { hex: string; ratio: number; verdict: Level };

/**
 * The chip gets an edge, not a darker fill.
 *
 * A tint on a 97.2% page cannot carry its own shape by luminance alone: even
 * pushing the fill until it starts reading as a grey box only reached 1.15:1,
 * which is still not a visible boundary. A hairline solves it at a contrast
 * the eye actually registers, and leaves the fill light enough that the text
 * inside it keeps its own ratio.
 */
const chip =
  "border border-[color-mix(in_oklab,var(--text-accent)_35%,transparent)] bg-interactive-subtle text-text-accent";

const verdictClass: Record<Level, string> = {
  AAA: chip,
  AA: chip,
  "AA Large": "text-text-tertiary",
  Fail: "text-status-danger",
  "Non-text AA": chip,
  // Not a failure and not styled like one. A divider under 3:1 is a decision.
  Decorative: "text-text-tertiary",
  Reference: "text-text-tertiary",
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
export function ContrastAudit({ rows, kind = "text" }: { rows: AuditRow[]; kind?: TokenKind }) {
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
    <div className="overflow-x-auto">
      <table className="w-full min-w-[36rem] border-collapse text-left">
        <thead>
          <tr className="border-b border-border-default">
            {/* The swatch and verdict columns are visual, but a header cell with
                no accessible name is a real failure — a screen reader announces
                the column as unlabelled. The name is present and hidden, not
                absent. */}
            {[
              { label: "Swatch", visible: false },
              { label: "Role", visible: true },
              { label: "Value", visible: true },
              { label: "Ratio", visible: true },
              { label: "Result", visible: false },
            ].map((h, i) => (
              <th
                key={h.label}
                scope="col"
                className={`pb-3 font-mono text-2xs font-normal uppercase tracking-[0.14em] text-text-tertiary ${
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
            <tr key={m.token} className="border-b border-border-subtle">
              <td className="py-3.5 pr-4">
                <span
                  className="block h-8 w-8 rounded-xs border border-border-default"
                  style={{ background: `var(${m.token})` }}
                />
              </td>
              <td className="py-3.5 pr-4">
                <div className="font-mono text-xs text-text-primary">{m.token}</div>
                <div className="mt-0.5 text-xs text-text-tertiary">{m.note}</div>
              </td>
              <td className="py-3.5 pr-4 font-mono text-2xs text-text-tertiary">{m.hex || "—"}</td>
              <td className="py-3.5 pr-4 text-right font-mono text-xs text-text-primary">
                {/* A surface measured against itself is 1.00:1 by definition.
                    Printing that invites the reader to treat it as a result. */}
                {!measured ? "—" : m.token === "--surface-page" ? "—" : `${m.ratio.toFixed(2)}:1`}
              </td>
              <td className="py-3.5 text-right">
                {measured && (
                  <span
                    className={`inline-block rounded-xs px-2 py-0.5 font-mono text-2xs uppercase tracking-[0.08em] ${verdictClass[m.verdict]}`}
                  >
                    {m.verdict}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!measured && (
        <p className="mt-3 font-mono text-2xs text-text-tertiary">Measuring…</p>
      )}
    </div>
  );
}
