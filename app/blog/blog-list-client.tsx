"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BlogCard } from "@/components/blog-card";
import type { PostMeta } from "@/lib/post-types";

const POSTS_PER_PAGE = 10;

interface BlogListClientProps {
  posts: PostMeta[];
}

export function BlogListClient({ posts }: BlogListClientProps) {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const paginated = posts.slice(0, page * POSTS_PER_PAGE);
  const hasMore = page < totalPages;

  return (
    <>
      {/* Post count */}
      <div className="flex items-center justify-end mb-12 border-b border-[#E5E5E5] pb-6">
        <span className="text-xs text-[#6B6B6B] tracking-wide">
          {posts.length} {posts.length === 1 ? "post" : "posts"}
        </span>
      </div>

      {/* Post grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10"
      >
        {paginated.map((post, i) => (
          <BlogCard key={post.slug} post={post} index={i} />
        ))}
      </motion.div>

      {/* Load more */}
      {hasMore && (
        <div className="mt-16">
          <button
            onClick={() => setPage((p) => p + 1)}
            className="text-xs tracking-wide font-medium text-[#6B6B6B] hover:text-[#0A0A0A] transition-colors duration-200 link-underline"
          >
            load more
          </button>
        </div>
      )}
    </>
  );
}
