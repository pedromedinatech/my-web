import Image from "next/image";
import Link from "next/link";

/*
 * 404: a night panel framed like the home hero. Diogenes walked through Athens
 * with a lamp in daylight, looking for an honest man.
 *
 * The painting fills the frame (Jean-Léon Gérôme, public domain via
 * Wikimedia Commons); a night gradient from the bottom-left keeps the text readable.
 */
const DIOGENES_IMAGE = {
  src: "/images/diogenes-gerome.webp",
  alt: "Diogenes sitting in his large clay jar, trimming a lantern, with four dogs around him in a sunlit street.",
  caption: "Jean-Léon Gérôme, Diogenes, 1860. Walters Art Museum, Baltimore.",
};

export default function NotFound() {
  return (
    <section className="p-3 md:p-6">
      <div data-nav-on-dark className="relative min-h-[calc(100dvh-1.5rem)] md:min-h-[calc(100dvh-3rem)] rounded-[6px] bg-night text-paper overflow-hidden">
        <Image
          src={DIOGENES_IMAGE.src}
          alt={DIOGENES_IMAGE.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[35%_40%]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgb(var(--rgb-night) / 0.95) 0%, rgb(var(--rgb-night) / 0.75) 35%, rgb(var(--rgb-night) / 0.15) 70%, transparent 100%), linear-gradient(to right, rgb(var(--rgb-night) / 0.6), transparent 60%), linear-gradient(to bottom, rgb(var(--rgb-night) / 0.6), transparent 22%)",
          }}
        />

        <div className="relative grid min-h-[inherit] grid-cols-1 md:grid-cols-2 items-end gap-10 px-6 md:px-12 pt-28 pb-12 md:pb-16">
          <div>
            <p className="text-[13px] text-paper/60 mb-6">error 404</p>
            <h1
              className="font-black text-paper"
              style={{ fontSize: "clamp(3rem, 9vw, 8rem)", lineHeight: 0.9, letterSpacing: "-0.04em" }}
            >
              still
              <br />
              looking.
            </h1>
            <p className="mt-8 max-w-[38ch] text-[17px] leading-relaxed text-paper/75">
              Diogenes walked through Athens in broad daylight with a lit lamp, looking for an honest man. He never found one. This page didn&apos;t find what you were looking for either.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-[15px]">
              <Link href="/" className="press text-amber hover:text-paper transition-colors duration-150 rounded-[1px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber">
                back to home
              </Link>
              <Link href="/blog" className="press text-amber hover:text-paper transition-colors duration-150 rounded-[1px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber">
                read the essays
              </Link>
            </div>
          </div>

          <p className="md:justify-self-end md:text-right max-w-[36ch] text-[12px] text-paper/55">
            {DIOGENES_IMAGE.caption}
          </p>
        </div>
      </div>
    </section>
  );
}
