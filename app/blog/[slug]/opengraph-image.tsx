import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, formatDate } from "@/lib/posts";
import { OG_CONTENT_TYPE, OG_SIZE, OgCard, ogImageOptions } from "@/lib/og";

export const alt = "Post by Pedro Medina";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const label = [post.category, post.date ? formatDate(post.date) : null]
    .filter(Boolean)
    .join(" · ")
    .toLowerCase();

  return new ImageResponse(
    <OgCard label={label} title={post.title} />,
    await ogImageOptions()
  );
}
