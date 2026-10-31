import { NextResponse } from "next/server";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { blogIndexMarkdown, homeMarkdown, notFoundMarkdown, pageMarkdown, postMarkdown } from "@/lib/markdown";

/*
 * Markdown versions of the site. middleware.ts rewrites /some/page to
 * /md/some/page when a request prefers Accept: text/markdown; browsers keep
 * getting HTML.
 */
export const dynamic = "force-dynamic";

const md = (body: string, status = 200) =>
  new NextResponse(body, {
    status,
    headers: { "Content-Type": "text/markdown; charset=utf-8", Vary: "Accept" },
  });

export function GET(_request: Request, { params }: { params: { path?: string[] } }) {
  const path = params.path?.length ? `/${params.path.join("/")}` : "/";

  if (path === "/") return md(homeMarkdown(getAllPosts()));
  if (path === "/blog") return md(blogIndexMarkdown(getAllPosts()));

  const post = path.match(/^\/blog\/([\w-]+)$/);
  if (post) {
    const found = getPostBySlug(post[1]);
    return found ? md(postMarkdown(found)) : md(notFoundMarkdown(path), 404);
  }

  const page = pageMarkdown(path);
  return page ? md(page) : md(notFoundMarkdown(path), 404);
}
