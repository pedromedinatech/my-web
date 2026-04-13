import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Pedro Medina",
    template: "%s — Pedro Medina",
  },
  description:
    "Building in tech. Learning in public.",
  metadataBase: new URL("https://iampedromedina.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://iampedromedina.com",
    siteName: "Pedro Medina",
    title: "Pedro Medina",
    description: "Building in tech. Learning in public.",
    images: [
      {
        url: "/images/pedro/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Pedro Medina",
      },
    ],
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
    <html lang="en" className={inter.variable}>
      <body
        className="bg-[#FFFFFF] text-[#0A0A0A] antialiased font-sans"
      >
        <Nav />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
