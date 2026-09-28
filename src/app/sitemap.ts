import type { MetadataRoute } from "next";

/**
 * Only the routes that exist.
 *
 * The header links to /work, /about and /resume and all three 404 today. They
 * are deliberately NOT listed here: a sitemap is a set of promises to a
 * crawler, and listing a page that returns 404 teaches Google the site is
 * unreliable rather than getting the page indexed sooner. Add each one here
 * the day it starts returning a page, along with the case study routes under
 * /work/ as they are written.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://magnocreative.com";
  const now = new Date();

  return [
    { url: base, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/system`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];
}
