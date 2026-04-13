import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { getAllPosts } from "@/lib/posts";
import { CATEGORIES } from "@/lib/post-types";
import { BlogListClient } from "./blog-list-client";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Posts on startups, technology, sales, and learning in public.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-layout mx-auto px-6 md:px-10 pt-28 md:pt-32 pb-20 md:pb-28">
      {/* Header */}
      <div className="mb-16 md:mb-20">
        <div className="flex items-end justify-between mb-6">
          <h1 className="text-display font-black tracking-tightest">
            blog
          </h1>
          <Link
            href="/about"
            className="text-xs tracking-wide font-medium inline-flex items-center gap-1.5 link-underline hover:opacity-60 transition-opacity duration-200"
          >
            who writes this
            <ArrowUpRight size={11} weight="bold" />
          </Link>
        </div>
        <p className="text-[#6B6B6B] text-base max-w-md">
          Learning in public. No filters, no waiting until everything is figured out.
        </p>
      </div>

      <BlogListClient posts={posts} categories={CATEGORIES} />
    </div>
  );
}
