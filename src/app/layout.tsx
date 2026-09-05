import type { Metadata } from "next";
// Self-hosted variable fonts. No request to a third-party font CDN, which means
// no render-blocking round trip, no external dependency at runtime, and nothing
// leaking a visitor's IP to Google. Two axes ship in one file each.
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://magnocreative.com"),
  title: {
    default: "Alejandro Fernandini — Experience Designer",
    template: "%s — Alejandro Fernandini",
  },
  description:
    "Senior experience designer working on complex operational systems — the internal tools people use all day to do difficult work.",
  openGraph: {
    type: "website",
    siteName: "Alejandro Fernandini",
    locale: "en_US",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}
