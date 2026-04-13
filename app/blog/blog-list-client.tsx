"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BlogCard } from "@/components/blog-card";
import type { PostMeta, PostCategory } from "@/lib/post-types";
import { CATEGORY_LABELS } from "@/lib/post-types";
import { CaretDown } from "@phosphor-icons/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const POSTS_PER_PAGE = 10;

interface BlogListClientProps {
  posts: PostMeta[];
  categories: PostCategory[];
}

export function BlogListClient({ posts, categories }: BlogListClientProps) {
  const [activeCategory, setActiveCategory] = useState<PostCategory | "all">("all");
  const [page, setPage] = useState(1);

  const filtered =
    activeCategory === "all"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paginated = filtered.slice(0, page * POSTS_PER_PAGE);
  const hasMore = page < totalPages;

  const activeLabel =
    activeCategory === "all" ? "all" : CATEGORY_LABELS[activeCategory];

  return (
    <>
      {/* Category dropdown */}
      <div className="flex items-center justify-between mb-12 border-b border-[#E5E5E5] pb-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="inline-flex items-center gap-1.5 text-sm text-[#0A0A0A] hover:opacity-60 transition-opacity duration-200 outline-none">
              {activeLabel}
              <CaretDown size={10} weight="bold" className="opacity-60" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={activeCategory}
              onValueChange={(v) => {
                setActiveCategory(v as PostCategory | "all");
                setPage(1);
              }}
            >
              <DropdownMenuRadioItem value="all">all</DropdownMenuRadioItem>
              {categories.map((cat) => (
                <DropdownMenuRadioItem key={cat} value={cat}>
                  {CATEGORY_LABELS[cat]}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <span className="text-xs text-[#6B6B6B] tracking-wide">
          {filtered.length} {filtered.length === 1 ? "post" : "posts"}
        </span>
      </div>

      {/* Post grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10"
        >
          {paginated.length === 0 ? (
            <p className="text-[#6B6B6B] text-sm col-span-full py-12 tracking-wide">
              No posts in this category yet.
            </p>
          ) : (
            paginated.map((post, i) => (
              <BlogCard key={post.slug} post={post} index={i} />
            ))
          )}
        </motion.div>
      </AnimatePresence>

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
