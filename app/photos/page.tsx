import type { Metadata } from "next";
import { getPhotos, layoutMasonry } from "@/lib/photos";
import { PhotoGrid } from "@/components/photo-grid";

export const metadata: Metadata = {
  title: "Photos",
  description: "Photos I take: mountains, snow, the sea and a few cities.",
  alternates: { canonical: "/photos" },
};

export default function PhotosPage() {
  const photos = getPhotos();
  const masonry = layoutMasonry(photos);
  const isPlaceholder = photos.some((p) => p.placeholder);

  return (
    <div className="max-w-layout mx-auto px-3 md:px-6 pt-28 md:pt-32 pb-8">
      <div className="px-3 md:px-4 mb-12 md:mb-16 max-w-[52ch]">
        <h1 className="text-display font-black tracking-tightest">photos</h1>
        <p className="mt-6 text-base text-muted">
          Photos I take: mountains, snow, the sea and a few cities. Tap one to see it full size.
        </p>
        {isPlaceholder && (
          <p className="mt-3 text-[13px] text-accent-ink">
            Preview: these are blog covers standing in until the real photos arrive.
          </p>
        )}
      </div>

      <PhotoGrid masonry={masonry} />
    </div>
  );
}
