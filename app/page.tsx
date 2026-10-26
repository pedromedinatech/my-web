import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { personJsonLd, jsonLdScript } from "@/lib/jsonld";
import { HeroSection } from "@/components/sections/hero";
import { AboutSnippetSection } from "@/components/sections/about-snippet";
import { BlogPreviewSection } from "@/components/sections/blog-preview";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": "https://iampedromedina.com/rss.xml" },
  },
};

export default function Home() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(personJsonLd()) }}
      />
      <HeroSection />
      <AboutSnippetSection />
      <BlogPreviewSection posts={posts} />
    </>
  );
}
