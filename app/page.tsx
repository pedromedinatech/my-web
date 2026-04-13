import { getAllPosts } from "@/lib/posts";
import { HeroSection } from "@/components/sections/hero";
import { AboutSnippetSection } from "@/components/sections/about-snippet";
import { BlogPreviewSection } from "@/components/sections/blog-preview";

export default function Home() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      <HeroSection />
      <AboutSnippetSection />
      <BlogPreviewSection posts={posts} />
    </>
  );
}
