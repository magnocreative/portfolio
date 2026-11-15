import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Lines quoted from tokens.css, read when the site builds, so a page that
 * shows the token file shows what is in it (Alejandro, November 2026). The
 * "one source" figure in the design system case study quotes two of them; as
 * a screenshot it would have kept the old values after the file moved on.
 *
 * Throws at build time if a token is renamed or removed, so a quote can't
 * quietly go missing. Server only, like system-counts.
 */
const css = readFileSync(join(process.cwd(), "src/styles/tokens.css"), "utf8");

export function tokenLine(name: string): string {
  const escaped = name.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
  const match = css.match(new RegExp(`^\\s*(${escaped}:[^;]*;)`, "m"));
  if (!match) throw new Error(`tokens.css has no ${name}`);
  return match[1];
}
