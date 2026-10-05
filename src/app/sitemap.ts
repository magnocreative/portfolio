import type { MetadataRoute } from "next";

/**
 * Only the routes that exist.
 *
 * A sitemap is a set of promises to a crawler, and listing a page that returns
 * 404 teaches Google the site is unreliable rather than getting the page
 * indexed sooner. /about, /resume and /work were added here the day they
 * started returning pages. The case study routes under /work/ join as they are
 * written.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://magnocreative.com";
  const now = new Date();

  return [
    { url: base, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/work`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/system`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/system/components`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${base}/resume`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];
}
