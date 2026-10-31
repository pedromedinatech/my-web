import type { PostMeta } from "./post-types";
import { SITE, absolute } from "./site";

/**
 * schema.org data for the home page. A Person, not an Organization: this is a
 * personal site, so there is no street address or phone (decision 2026-10-26).
 */
export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE.url}/#person`,
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    image: absolute(SITE.image),
    email: `mailto:${SITE.email}`,
    jobTitle: "Writer and computer science student",
    sameAs: [...SITE.sameAs],
  };
}

export function blogPostingJsonLd(post: PostMeta) {
  const url = absolute(`/blog/${post.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": url,
    url,
    mainEntityOfPage: url,
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: "en",
    ...(post.coverImage ? { image: absolute(post.coverImage) } : {}),
    author: { "@type": "Person", "@id": `${SITE.url}/#person`, name: SITE.name, url: SITE.url },
  };
}

/** Serialises for a <script type="application/ld+json">, escaping "<" so it can't close the tag. */
export function jsonLdScript(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
