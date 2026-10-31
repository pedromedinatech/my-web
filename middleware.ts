import { NextResponse, type NextRequest } from "next/server";
import { wantsMarkdown } from "@/lib/markdown";

/*
 * Content negotiation for agents: a request that prefers
 * Accept: text/markdown gets the Markdown version of the page (app/md/route.ts),
 * including a Markdown 404 for unknown paths. Everyone else gets HTML. Both
 * responses carry Vary: Accept so caches keep them apart.
 */
export function middleware(request: NextRequest) {
  if (wantsMarkdown(request.headers.get("accept"))) {
    const url = request.nextUrl.clone();
    url.pathname = request.nextUrl.pathname === "/" ? "/md" : `/md${request.nextUrl.pathname}`;
    return NextResponse.rewrite(url);
  }
  const res = NextResponse.next();
  res.headers.append("Vary", "Accept");
  return res;
}

export const config = {
  // Pages only: skip Next internals, the Markdown handler itself and files with an extension.
  matcher: ["/((?!_next/|md(?:/|$)|api/|.*\\.[\\w]+$).*)"],
};
