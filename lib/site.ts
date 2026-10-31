/** Facts about the site used by metadata, JSON-LD, llms.txt and the Markdown versions. */
export const SITE = {
  url: "https://iampedromedina.com",
  name: "Pedro Medina",
  description:
    "Pedro Medina's personal site: one essay a week about what he learns studying computer science, working at a startup in Seville and building things.",
  email: "iampedromedina@gmail.com",
  image: "/images/pedro/IMG_2325.webp",
  substack: "https://pedromedinaa.substack.com",
  sameAs: [
    "https://x.com/pedroomedinaa_",
    "https://www.instagram.com/pedrooomedina/",
    "https://github.com/pedromedinatech",
    "https://pedromedinaa.substack.com",
  ],
} as const;

/** Pages that exist as HTML, with a one-line description for llms.txt and Markdown. */
export const PAGES: { path: string; title: string; description: string }[] = [
  { path: "/", title: "Home", description: "Who Pedro is and his latest essays." },
  { path: "/blog", title: "Blog", description: "Every essay, newest first." },
  { path: "/about", title: "About", description: "Pedro's story: computer science, sales, startups, running." },
  { path: "/now", title: "Now", description: "What Pedro is focused on right now." },
  { path: "/read", title: "Read", description: "Books and essays Pedro recommends." },
  { path: "/contact", title: "Contact", description: "How to reach Pedro." },
  { path: "/privacy", title: "Privacy", description: "What this site collects (almost nothing) and why." },
];

export const absolute = (path: string) => new URL(path, SITE.url).toString();
