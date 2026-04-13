export type PostCategory =
  | "startups"
  | "technology"
  | "personal";

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  category: PostCategory;
  excerpt: string;
  coverImage?: string;
  published: boolean;
  readingTime: string;
}

export interface Post extends PostMeta {
  content: string;
}

export const CATEGORIES: PostCategory[] = [
  "technology",
  "startups",
  "personal",
];

export const CATEGORY_LABELS: Record<PostCategory, string> = {
  technology: "technology",
  startups: "startups",
  personal: "personal",
};

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
