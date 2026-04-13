"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { PostMeta } from "@/lib/post-types";
import { formatDate } from "@/lib/post-types";

interface BlogCardProps {
  post: PostMeta;
  index?: number;
}

export function BlogCard({ post, index = 0 }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 80,
        damping: 20,
        delay: index * 0.07,
      }}
      className="group"
    >
      <Link href={`/blog/${post.slug}`} className="block">
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 200, damping: 30 }}
          className="border-t border-[#E5E5E5] pt-5 pb-6"
        >
          {/* Top meta */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs tracking-wide text-[#6B6B6B] font-medium">
              {post.category}
            </span>
            <span className="text-xs text-[#6B6B6B]">
              {post.readingTime} read
            </span>
          </div>

          {/* Title */}
          <h3 className="text-base font-bold leading-snug tracking-tight mb-2 group-hover:opacity-60 transition-opacity duration-200">
            {post.title}
          </h3>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-sm text-[#6B6B6B] leading-relaxed line-clamp-2 mb-4">
              {post.excerpt}
            </p>
          )}

          {/* Date */}
          <span className="text-xs text-[#6B6B6B]">{formatDate(post.date)}</span>
        </motion.div>
      </Link>
    </motion.article>
  );
}
