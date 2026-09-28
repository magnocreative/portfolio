import type { MetadataRoute } from "next";

/**
 * Generated rather than a static file, so the host in the sitemap URL comes
 * from one place. `metadataBase` in layout.tsx is that place.
 *
 * Everything is crawlable. There is nothing here worth hiding, and a portfolio
 * that blocks crawlers is a portfolio nobody finds.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://magnocreative.com/sitemap.xml",
  };
}
