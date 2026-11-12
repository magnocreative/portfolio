// Captures the published Storybook for the "Read the source" panel on /system.
//
//   npm run storybook:shot
//     Writes src/assets/evidence/storybook-light.png and storybook-dark.png
//     from https://storybook.magnocreative.com. Rerun it when the stories
//     change enough that the picture would mislead, and commit both files.
//
// The page sits beside a sentence saying the stories are published, so the
// picture is taken from the published Storybook, not drawn: the sidebar and
// the Button's States story with its Controls, as a visitor will find them. Both themes,
// because the site swaps the picture with its own theme.
//
// STORYBOOK_URL points it elsewhere (a local `npx http-server storybook-static`,
// say). STORYBOOK_CHROMIUM points at a Chromium of your own if Playwright's
// is not installed.

import { chromium } from "playwright";

const base = (process.env.STORYBOOK_URL ?? "https://storybook.magnocreative.com").replace(/\/$/, "");
const story = process.env.STORYBOOK_STORY ?? "components-button--states";

const browser = await chromium.launch(
  process.env.STORYBOOK_CHROMIUM ? { executablePath: process.env.STORYBOOK_CHROMIUM } : {},
);

for (const theme of ["light", "dark"]) {
  // The manager follows the OS setting; the preview follows the theme global.
  const context = await browser.newContext({
    colorScheme: theme,
    viewport: { width: 1200, height: 750 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();
  const url = `${base}/?path=/story/${story}&globals=theme:${theme}`;
  const res = await page.goto(url, { waitUntil: "networkidle" });
  if (!res?.ok()) {
    console.error(`Could not load ${url} (${res?.status()}).`);
    process.exit(1);
  }
  // The story renders in an iframe; wait for it, then for fonts to settle.
  const preview = page.frameLocator("#storybook-preview-iframe");
  await preview.locator("#storybook-root > *").first().waitFor({ timeout: 20000 });
  await page.waitForTimeout(800);
  const out = `src/assets/evidence/storybook-${theme}.png`;
  await page.screenshot({ path: out });
  console.log(`Wrote ${out}`);
  await context.close();
}

await browser.close();
