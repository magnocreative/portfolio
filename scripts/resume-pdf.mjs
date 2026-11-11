// Prints /resume/print to the résumé PDF.
//
//   npm run resume:pdf
//     The public download: public/Alejandro-Magno-Fernandini-Resume.pdf.
//     No phone number. Commit it with the résumé change that prompted it.
//
//   RESUME_PHONE="(000) 000-0000" npm run resume:pdf
//     The copy for a person: the same document with the phone number under the
//     email, saved to ~/Downloads. Never written into the repository, so the
//     number never reaches git history or the public file.
//
// Needs the dev server running (npm run dev) and Playwright's Chromium
// (npx playwright install chromium, once). RESUME_URL points it elsewhere;
// SITE_PASSWORD is sent if the server is gated.

import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const FILE = "Alejandro-Magno-Fernandini-Resume.pdf";
const base = process.env.RESUME_URL ?? "http://localhost:3000";
const phone = process.env.RESUME_PHONE?.trim();
const out = process.env.RESUME_OUT ?? (phone ? join(homedir(), "Downloads", FILE) : join("public", FILE));

// RESUME_CHROMIUM points at a Chromium of your own, if Playwright's is not installed.
const browser = await chromium.launch(process.env.RESUME_CHROMIUM ? { executablePath: process.env.RESUME_CHROMIUM } : {});
const context = await browser.newContext({
  colorScheme: "light",
  httpCredentials: process.env.SITE_PASSWORD ? { username: "", password: process.env.SITE_PASSWORD } : undefined,
});
const page = await context.newPage();
// RESUME_LAYOUT picks one of the print page's layouts (classic, rail, sidebar).
const query = new URLSearchParams();
if (process.env.RESUME_LAYOUT) query.set("layout", process.env.RESUME_LAYOUT);
if (process.env.RESUME_WORK === "off") query.set("work", "off");
const res = await page.goto(`${base}/resume/print${query.size ? `?${query}` : ""}`, { waitUntil: "networkidle" });
if (!res?.ok()) {
  console.error(`Could not load ${base}/resume/print (${res?.status()}). Is \`npm run dev\` running?`);
  process.exit(1);
}
await page.evaluate(() => document.fonts.ready);

if (phone) {
  await page.evaluate((number) => {
    const slot = document.querySelector("[data-phone]");
    if (!slot) throw new Error("No [data-phone] slot on /resume/print");
    slot.hidden = false;
    slot.innerHTML = "<br>" + number.replace(/[<>&]/g, "");
  }, phone);
}

// The running footer: name on the left, page count on the right. Header and
// footer templates cannot load the page's fonts, so it falls back to the
// system sans at 7pt, small enough that the difference does not show.
const footer = `<div style="width:100%;padding:0 0.7in;display:flex;justify-content:space-between;font-family:Helvetica,Arial,sans-serif;font-size:7pt;color:#6b6a68"><span>Alejandro Magno Fernandini · Résumé</span><span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span></div>`;

mkdirSync(phone ? join(homedir(), "Downloads") : "public", { recursive: true });
await page.pdf({
  path: out,
  format: "Letter",
  printBackground: true,
  displayHeaderFooter: true,
  headerTemplate: "<span></span>",
  footerTemplate: footer,
  // 0.15in on the left plus the sheet's own 0.55in: the text still starts 0.7in
  // in, and the classic layout's mark, logos and bullet dots have room to hang
  // (anything outside the page margin box is clipped).
  margin: { top: "0.6in", bottom: "0.7in", left: "0.15in", right: "0.7in" },
});
await browser.close();
console.log(`Saved ${out}${phone ? " (with phone number; not for the repository)" : ""}`);
