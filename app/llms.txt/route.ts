import { getAllPosts } from "@/lib/posts";
import { llmsTxt } from "@/lib/markdown";

// llmstxt.org: a Markdown map of the site for language models.
export function GET() {
  return new Response(llmsTxt(getAllPosts()), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
