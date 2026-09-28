import { ImageResponse } from "next/og";
import { OG_CONTENT_TYPE, OG_SIZE, OgCard, ogImageOptions } from "@/lib/og";

export const alt = "i am pedro medina";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return new ImageResponse(
    <OgCard
      title="i am pedro medina"
      subline="Studying computer science, working at a startup, and writing about what I learn along the way."
    />,
    await ogImageOptions()
  );
}
