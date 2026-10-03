import type { MetadataRoute } from "next";

/**
 * Only the routes that exist.
 *
 * A sitemap is a set of promises to a crawler, and listing a page that returns
 * 404 teaches Google the site is unreliable rather than getting the page
 * indexed sooner. /about and /resume were added here the day they started
 * returning pages. /work is still 404 and stays out until it does not, along
 * with the case study routes under /work/ as they are written.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://magnocreative.com";
  const now = new Date();

  return [
    { url: base, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/system`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/system/components`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${base}/resume`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];
}
