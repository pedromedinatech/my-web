import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { PostMeta, Post, PostCategory } from "./post-types";

export type { PostMeta, Post, PostCategory };
export { CATEGORIES, formatDate } from "./post-types";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

function parsePostFile(filename: string): PostMeta | null {
  const filepath = path.join(POSTS_DIR, filename);
  const raw = fs.readFileSync(filepath, "utf-8");
  const { data, content } = matter(raw);

  if (!data.published) return null;

  const stats = readingTime(content);
  const minutes = Math.ceil(stats.minutes);

  return {
    slug: filename.replace(/\.mdx?$/, ""),
    title: data.title ?? "Untitled",
    date: data.date ?? "",
    category: (data.category ?? "personal") as PostCategory,
    excerpt: data.excerpt ?? "",
    coverImage: data.coverImage,
    published: data.published ?? false,
    readingTime: `${minutes} min`,
  };
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => /\.mdx?$/.test(f));

  const posts = files
    .map(parsePostFile)
    .filter((p): p is PostMeta => p !== null)
    .sort((a, b) => (a.date > b.date ? -1 : 1));

  return posts;
}

export function getPostBySlug(slug: string): Post | null {
  const extensions = ["mdx", "md"];

  for (const ext of extensions) {
    const filepath = path.join(POSTS_DIR, `${slug}.${ext}`);
    if (!fs.existsSync(filepath)) continue;

    const raw = fs.readFileSync(filepath, "utf-8");
    const { data, content } = matter(raw);

    if (!data.published) return null;

    const stats = readingTime(content);
    const minutes = Math.ceil(stats.minutes);

    return {
      slug,
      title: data.title ?? "Untitled",
      date: data.date ?? "",
      category: (data.category ?? "personal") as PostCategory,
      excerpt: data.excerpt ?? "",
      coverImage: data.coverImage,
      published: data.published ?? false,
      readingTime: `${minutes} min`,
      content,
    };
  }

  return null;
}

export function getRelatedPosts(
  currentSlug: string,
  category: PostCategory,
  count = 2
): PostMeta[] {
  const all = getAllPosts();

  const sameCat = all.filter(
    (p) => p.slug !== currentSlug && p.category === category
  );

  if (sameCat.length >= count) return sameCat.slice(0, count);

  const rest = all.filter(
    (p) => p.slug !== currentSlug && p.category !== category
  );

  return [...sameCat, ...rest].slice(0, count);
}
