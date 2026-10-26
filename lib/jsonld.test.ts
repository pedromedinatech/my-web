import { describe, expect, it } from "vitest";
import { blogPostingJsonLd, jsonLdScript, personJsonLd } from "./jsonld";

describe("JSON-LD", () => {
  it("home is a Person without address or phone", () => {
    const p = personJsonLd();
    expect(p["@type"]).toBe("Person");
    expect(p.name).toBe("Pedro Medina");
    expect(p.url).toBe("https://iampedromedina.com");
    expect(p.sameAs.length).toBeGreaterThan(0);
    expect("address" in p).toBe(false);
    expect("telephone" in p).toBe(false);
  });
  it("posts are BlogPosting with author and absolute image", () => {
    const b = blogPostingJsonLd({
      slug: "s", title: "T", date: "2026-10-26", category: "personal", excerpt: "E",
      coverImage: "/images/posts/grandma.webp", published: true, readingTime: "1 min",
    });
    expect(b["@type"]).toBe("BlogPosting");
    expect(b.headline).toBe("T");
    expect(b.author.name).toBe("Pedro Medina");
    expect(b.image).toBe("https://iampedromedina.com/images/posts/grandma.webp");
  });
  it("escapes < so the script tag can't be closed early", () => {
    expect(jsonLdScript({ x: "</script>" })).not.toContain("</script>");
  });
});
