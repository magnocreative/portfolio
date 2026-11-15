"use client";

import { useEffect, useState } from "react";
import { contrastRatio, level, resolveToken, type Level } from "@/design-system/utils/contrast";
import { Tag } from "@/design-system/components/Tag";

/**
 * One contrast figure, measured live: a token, its ratio against the page
 * surface, and the grade. The same measurement ContrastAudit makes for a whole
 * table (painted to a canvas and read back, never parsed), for a place that
 * needs one reading rather than the table, such as the preview of
 * "Contrast, measured" on the components page (Alejandro, November 2026).
 * A screenshot of the table there would have been a second copy of it, and
 * the first copy to go stale.
 *
 * Re-measures when the theme changes, by the toggle or by the system.
 */
export function ContrastReading({ token, large = false }: { token: string; large?: boolean }) {
  const [reading, setReading] = useState<{ ratio: number; verdict: Level } | null>(null);

  useEffect(() => {
    const measure = () => {
      const fg = resolveToken(token);
      const bg = resolveToken("--surface-page");
      if (!fg || !bg) return;
      const ratio = contrastRatio(fg, bg);
      setReading({ ratio, verdict: level(ratio, large, "text") });
    };
    measure();
    const observer = new MutationObserver(measure);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", measure);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", measure);
    };
  }, [token, large]);

  // Two lines, so it fits a narrow card: the token, then its figure and
  // grade under it, the way the table's Role column reads.
  return (
    <span className="flex items-center gap-3 font-label text-xs">
      <span
        aria-hidden="true"
        className="block h-8 w-8 shrink-0 rounded-sm border border-border-default"
        style={{ background: `var(${token})` }}
      />
      <span className="flex flex-col gap-1">
        <span className="text-text-primary">{token}</span>
        <span className="flex items-center gap-2">
          <span className="text-text-primary tabular-nums">{reading ? `${reading.ratio.toFixed(2)}:1` : "—"}</span>
          {reading && <Tag tone={reading.verdict === "Fail" ? "danger" : "pass"}>{reading.verdict}</Tag>}
        </span>
      </span>
    </span>
  );
}
