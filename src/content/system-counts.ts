import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

/**
 * The size of the design system, counted from the code when the site builds,
 * for the "Read the source" panel on /system (Alejandro, November 2026). The
 * panel promises every claim on the page is checkable, so its numbers are not
 * typed in: add a component or a story and the count moves with it.
 *
 * Server only: it reads the repository, which exists at build time and not in
 * the browser. /system is prerendered, so this runs once per build.
 *
 *   tokens      custom properties declared in tokens.css, less the 29
 *               `--color-*` aliases that only feed Tailwind's utilities. Those
 *               restate tokens that are already counted; they are not designed
 *               with. The deliberately unused text-2xs and text-3xs steps are
 *               counted: they are declared, so they exist.
 *   components  one file each in src/design-system/components, stories aside.
 *   stories     every `export const Name: Story` in a *.stories.tsx file, which
 *               is what Storybook lists.
 */

const root = process.cwd();

function tokens() {
  const css = readFileSync(join(root, "src/styles/tokens.css"), "utf8");
  const names = new Set(css.match(/^\s*--[a-z0-9-]+(?=\s*:)/gim)?.map((n) => n.trim()) ?? []);
  return [...names].filter((n) => !n.startsWith("--color-")).length;
}

function components() {
  return readdirSync(join(root, "src/design-system/components")).filter(
    (f) => f.endsWith(".tsx") && !f.endsWith(".stories.tsx"),
  ).length;
}

function stories() {
  let n = 0;
  const walk = (dir: string) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) walk(path);
      else if (entry.name.endsWith(".stories.tsx")) {
        n += readFileSync(path, "utf8").match(/^export const \w+\s*:\s*Story\b/gm)?.length ?? 0;
      }
    }
  };
  walk(join(root, "src"));
  return n;
}

export const systemCounts = { tokens: tokens(), components: components(), stories: stories() };
