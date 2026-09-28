import type { MetadataRoute } from "next";

/**
 * Driven by the same SITE_PASSWORD variable as the gate in middleware.ts, so
 * the two can never disagree. While the site is gated there is nothing for a
 * crawler to reach anyway, and a sitemap full of URLs that all answer 401 is a
 * set of promises the site cannot keep.
 *
 * Remove the variable and both the password and this restriction lift together.
 */
export default function robots(): MetadataRoute.Robots {
  if (process.env.SITE_PASSWORD) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://magnocreative.com/sitemap.xml",
  };
}
