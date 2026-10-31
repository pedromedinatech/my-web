import { describe, expect, it } from "vitest";
import { blogIndexMarkdown, homeMarkdown, llmsTxt, notFoundMarkdown, pageMarkdown, postMarkdown, wantsMarkdown } from "./markdown";
import type { Post, PostMeta } from "./post-types";

const post: PostMeta = {
  slug: "2026-10-26-grandma",
  title: "Now I understand you, grandma",
  date: "2026-10-26",
  category: "personal",
  excerpt: "My first dinner for friends.",
  published: true,
  readingTime: "2 min",
};

describe("wantsMarkdown", () => {
  it("is true for an explicit text/markdown request", () => {
    expect(wantsMarkdown("text/markdown")).toBe(true);
    expect(wantsMarkdown("text/markdown, */*;q=0.1")).toBe(true);
  });
  it("is false for browsers and missing headers", () => {
    expect(wantsMarkdown("text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8")).toBe(false);
    expect(wantsMarkdown(null)).toBe(false);
    expect(wantsMarkdown("*/*")).toBe(false);
  });
  it("respects quality values", () => {
    expect(wantsMarkdown("text/html;q=0.5, text/markdown")).toBe(true);
    expect(wantsMarkdown("text/html, text/markdown;q=0.5")).toBe(false);
    expect(wantsMarkdown("text/markdown;q=0")).toBe(false);
  });
});

describe("markdown pages", () => {
  it("home lists the essays with absolute links", () => {
    const md = homeMarkdown([post]);
    expect(md.startsWith("# Pedro Medina")).toBe(true);
    expect(md).toContain("https://iampedromedina.com/blog/2026-10-26-grandma");
  });
  it("blog index includes dates", () => {
    expect(blogIndexMarkdown([post])).toContain("(2026-10-26)");
  });
  it("post keeps the body and a canonical link", () => {
    const full: Post = { ...post, content: "This weekend..." };
    const md = postMarkdown(full);
    expect(md).toContain("# Now I understand you, grandma");
    expect(md).toContain("This weekend...");
    expect(md).toContain("Canonical: https://iampedromedina.com/blog/2026-10-26-grandma");
  });
  it("known static pages resolve, unknown ones don't", () => {
    expect(pageMarkdown("/now")).toContain("# Now");
    expect(pageMarkdown("/nope")).toBeNull();
  });
  it("404 explains the error and links to llms.txt and the sitemap", () => {
    const md = notFoundMarkdown("/nope");
    expect(md.length).toBeGreaterThan(20);
    expect(md).toContain("/llms.txt");
    expect(md).toContain("/sitemap.xml");
  });
});

describe("llms.txt", () => {
  it("follows llmstxt.org: H1, blockquote, then sections", () => {
    const txt = llmsTxt([post]);
    const lines = txt.split("\n");
    expect(lines[0]).toBe("# Pedro Medina");
    expect(lines[2].startsWith("> ")).toBe(true);
    expect(txt).toContain("## When to use");
    expect(txt).toContain("## Essays");
    expect(txt).toContain("- [Now I understand you, grandma](https://iampedromedina.com/blog/2026-10-26-grandma)");
  });
});
