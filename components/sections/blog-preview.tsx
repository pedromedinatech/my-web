import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { PostMeta } from "@/lib/post-types";
import { formatDate } from "@/lib/post-types";
import { StaggerContainer, StaggerItem } from "@/components/animations/fade-in";

interface BlogPreviewSectionProps {
  posts: PostMeta[];
}

export function BlogPreviewSection({ posts }: BlogPreviewSectionProps) {
  if (posts.length === 0) return null;

  return (
    <section className="max-w-layout mx-auto px-6 md:px-10 py-16 md:py-24">
      {/* Section header */}
      <div className="flex items-end justify-between mb-12 border-b border-[#E5E5E5] pb-6">
        <h2 className="font-black text-[#0A0A0A] tracking-tight leading-tight" style={{ fontSize: "clamp(1.6rem, 3vw, 2.25rem)" }}>
          [lately on the blog]
        </h2>
        <Link
          href="/blog"
          className="text-xs tracking-wide font-medium inline-flex items-center gap-1.5 link-underline hover:opacity-60 transition-opacity duration-200"
        >
          see all
          <ArrowUpRight size={11} weight="bold" />
        </Link>
      </div>

      {/* Post list */}
      <StaggerContainer staggerDelay={0.1}>
        {posts.map((post) => (
          <StaggerItem key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="group block">
              <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] md:items-baseline gap-2 md:gap-8 py-6 border-b border-[#E5E5E5] hover:opacity-60 transition-opacity duration-200">
                <span className="text-xs tracking-wide text-[#6B6B6B] font-medium w-28 shrink-0">
                  {post.category}
                </span>
                <h3 className="font-bold text-base leading-snug tracking-tight">
                  {post.title}
                </h3>
                <span className="text-xs text-[#6B6B6B] shrink-0">
                  {formatDate(post.date)} · {post.readingTime}
                </span>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
