import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Monospace for the ASCII landscape in the footer (cell = 0.6em wide).
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Pedro Medina",
    template: "%s — Pedro Medina",
  },
  description:
    "Building in tech. Learning in public.",
  metadataBase: new URL("https://iampedromedina.com"),
  alternates: {
    types: {
      "application/rss+xml": "https://iampedromedina.com/rss.xml",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://iampedromedina.com",
    siteName: "Pedro Medina",
    title: "Pedro Medina",
    description: "Building in tech. Learning in public.",
    // images come from app/opengraph-image.tsx (file convention)
  },
  twitter: {
    card: "summary_large_image",
    site: "@pedroomedinaa_",
    creator: "@pedroomedinaa_",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable}`}>
      <body
        className="bg-paper text-ink antialiased font-sans"
      >
        <Nav />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
