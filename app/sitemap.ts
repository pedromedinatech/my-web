import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { PAGES, absolute } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const pageEntries: MetadataRoute.Sitemap = PAGES.map((page) => ({
    url: absolute(page.path),
    lastModified: new Date(),
    changeFrequency: page.path === "/" || page.path === "/blog" ? "weekly" : "monthly",
    priority: page.path === "/" ? 1 : page.path === "/blog" ? 0.9 : 0.6,
  }));

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absolute(`/blog/${post.slug}`),
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...pageEntries, ...postEntries];
}
