import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, getRelatedPosts, formatDate } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { BlogCard } from "@/components/blog-card";

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: ["Pedro Medina"],
      images: post.coverImage
        ? [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }]
        : [{ url: "/images/pedro/og-default.jpg", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default function PostPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const related = getRelatedPosts(post.slug, post.category, 2);

  return (
    <article className="max-w-layout mx-auto px-6 md:px-10 pt-28 md:pt-32 pb-16 md:pb-24">
      {/* Back link + about */}
      <div className="flex items-center justify-between mb-12">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs tracking-wide text-[#6B6B6B] hover:text-[#0A0A0A] transition-colors duration-200 group"
        >
          <ArrowLeft
            size={12}
            weight="bold"
            className="group-hover:-translate-x-1 transition-transform duration-200"
          />
          back to blog
        </Link>
        <Link
          href="/about"
          className="text-xs tracking-wide font-medium inline-flex items-center gap-1.5 link-underline hover:opacity-60 transition-opacity duration-200"
        >
          about me
          <ArrowUpRight size={11} weight="bold" />
        </Link>
      </div>

      {/* Post header */}
      <header className="mb-12 max-w-[720px]">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs tracking-wide text-[#6B6B6B] font-medium">
            {post.category}
          </span>
          <span className="text-[#E5E5E5]">—</span>
          <span className="text-xs text-[#6B6B6B]">{formatDate(post.date)}</span>
          <span className="text-[#E5E5E5]">—</span>
          <span className="text-xs text-[#6B6B6B]">{post.readingTime} read</span>
        </div>

        <h1 className="text-xl md:text-2xl font-black tracking-tighter leading-tight">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="mt-4 text-base text-[#6B6B6B] leading-relaxed">
            {post.excerpt}
          </p>
        )}
      </header>

      {/* Cover image */}
      {post.coverImage && (
        <div className="relative w-full max-w-[720px] mx-auto aspect-[16/9] mb-14 overflow-hidden rounded-xl">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      )}

      {/* Post body */}
      <div className="prose-pedro">
        <MDXRemote source={post.content} />
      </div>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="mt-24 pt-12 border-t border-[#E5E5E5]">
          <h2 className="text-xs tracking-wide font-bold mb-10 text-[#6B6B6B]">
            next posts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
            {related.map((p, i) => (
              <BlogCard key={p.slug} post={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
