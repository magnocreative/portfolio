import type { Metadata } from "next";
// Self-hosted variable fonts. No request to a third-party font CDN, which means
// no render-blocking round trip, no external dependency at runtime, and nothing
// leaking a visitor's IP to Google. Two axes ship in one file each.
import "@fontsource-variable/inter";
import "@fontsource-variable/newsreader";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import { themeInitScript } from "@/design-system/components/ThemeToggle";
import { SiteHeader, railInitScript } from "@/design-system/components/SiteHeader";
import { SiteFooter } from "@/design-system/components/SiteFooter";

export const metadata: Metadata = {
  metadataBase: new URL("https://magnocreative.com"),
  title: {
    default: "Alejandro Magno Fernandini — Experience Designer",
    template: "%s — Alejandro Magno Fernandini",
  },
  description:
    "Experience designer working on complex operational systems — the internal tools people use all day to do difficult work.",
  openGraph: {
    type: "website",
    siteName: "Alejandro Magno Fernandini",
    locale: "en_US",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Applies the stored theme before first paint. Without it the page
            renders at the system theme for one frame — the flash that makes
            an otherwise careful dark mode feel cheap. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {/* Same reason, for the rail's collapsed state. This one is the more
            visible of the two if it is missed: the theme getting it wrong is a
            flash of the wrong color, the rail getting it wrong is the entire
            page sliding 232px sideways after it has already been read. */}
        <script dangerouslySetInnerHTML={{ __html: railInitScript }} />
      </head>
      <body className="antialiased">
        {/* The shell lives here rather than in each page. Five pages each
            rendering their own header and footer was five places to forget,
            and a fixed rail has to sit outside the page content rather than
            inside each copy of it. */}
        <SiteHeader />

        {/* The content column, inset by exactly the rail's width from 1280px,
            from the same token the rail is sized by, so the two cannot drift.
            Below 1280 there is no rail and no inset. */}
        <div className="transition-[padding] duration-[240ms] ease-[var(--ease-out-quart)] motion-reduce:transition-none min-[1280px]:pl-[var(--rail-width)]">
          {children}
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
