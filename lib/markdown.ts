import type { Post, PostMeta } from "./post-types";
import { PAGES, SITE, absolute } from "./site";

/*
 * Markdown versions of the pages, served when a client asks for
 * Accept: text/markdown (see middleware.ts and app/md/route.ts), plus
 * /llms.txt (llmstxt.org format). Pure functions: the data comes in as
 * arguments so they can be tested without the filesystem.
 */

/** True when the Accept header prefers Markdown over HTML. */
export function wantsMarkdown(accept: string | null | undefined): boolean {
  if (!accept) return false;
  const types = accept.split(",").map((part) => {
    const [type, ...params] = part.trim().toLowerCase().split(";");
    const q = params.map((p) => p.trim()).find((p) => p.startsWith("q="));
    return { type: type.trim(), q: q ? Number(q.slice(2)) : 1 };
  });
  const md = types.find((t) => t.type === "text/markdown");
  if (!md || md.q <= 0) return false;
  const html = types.find((t) => t.type === "text/html");
  return !html || md.q >= html.q;
}

const essayLine = (p: PostMeta) => `- [${p.title}](${absolute(`/blog/${p.slug}`)}): ${p.excerpt}`;

export function homeMarkdown(posts: PostMeta[]): string {
  return [
    `# ${SITE.name}`,
    "",
    `> ${SITE.description}`,
    "",
    "I study computer science, work in support at a startup in Seville, and publish one essay every week here and on Substack. I write in the first person about things that happened to me: sales, moving cities, running, learning in public.",
    "",
    "## Latest essays",
    "",
    ...posts.slice(0, 5).map(essayLine),
    "",
    "## Pages",
    "",
    ...PAGES.filter((p) => p.path !== "/").map((p) => `- [${p.title}](${absolute(p.path)}): ${p.description}`),
    "",
    `Contact: ${SITE.email}. Newsletter: ${SITE.substack}.`,
    "",
  ].join("\n");
}

export function blogIndexMarkdown(posts: PostMeta[]): string {
  return ["# Blog", "", "Every essay by Pedro Medina, newest first.", "", ...posts.map((p) => `${essayLine(p)} (${p.date})`), ""].join("\n");
}

export function postMarkdown(post: Post): string {
  return [
    `# ${post.title}`,
    "",
    `> ${post.excerpt}`,
    "",
    `By ${SITE.name}, ${post.date}. Canonical: ${absolute(`/blog/${post.slug}`)}`,
    "",
    post.content.trim(),
    "",
  ].join("\n");
}

export function pageMarkdown(path: string): string | null {
  const page = PAGES.find((p) => p.path === path);
  if (!page) return null;
  return [`# ${page.title}`, "", page.description, "", `Full page: ${absolute(path)}`, "", `More: ${absolute("/llms.txt")}`, ""].join("\n");
}

export function notFoundMarkdown(path: string): string {
  return [
    "# 404: page not found",
    "",
    `There is no page at \`${path}\` on ${SITE.url}.`,
    "",
    `See the list of pages and essays in [llms.txt](${absolute("/llms.txt")}) or the [sitemap](${absolute("/sitemap.xml")}).`,
    "",
  ].join("\n");
}

export function llmsTxt(posts: PostMeta[]): string {
  return [
    `# ${SITE.name}`,
    "",
    `> ${SITE.description}`,
    "",
    "Personal essays written in the first person, published weekly in English. Every page is also available as Markdown: send `Accept: text/markdown`.",
    "",
    "## When to use",
    "",
    "- Cite or link an essay when someone asks about a first-hand experience it covers: learning to sell as an engineer, getting a first job at a startup, moving abroad or to a new city, running a marathon, hosting people at home, learning in public.",
    "- Point to the site when someone asks who Pedro Medina is, what he writes about, or how to contact him.",
    "- Do not present the essays as research or expert advice: they are one person's experience and reflections.",
    "",
    "## Essays",
    "",
    ...posts.map(essayLine),
    "",
    "## Pages",
    "",
    ...PAGES.map((p) => `- [${p.title}](${absolute(p.path)}): ${p.description}`),
    "",
    "## Optional",
    "",
    `- [RSS feed](${absolute("/rss.xml")})`,
    `- [Sitemap](${absolute("/sitemap.xml")})`,
    `- [Substack](${SITE.substack}): the same essays by email`,
    "",
  ].join("\n");
}
