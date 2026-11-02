import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { PILL_GLASS, PILL_SOLID } from "@/components/pill-link";

/*
 * 404: a night panel framed like the home hero. Diogenes walked through Athens
 * with a lamp in daylight, looking for an honest man.
 *
 * The painting fills the frame (Jean-Léon Gérôme, public domain via
 * Wikimedia Commons); a night wash keeps the centred text readable.
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
        {/* Night wash: even over the painting so the centred text reads, deeper at top and bottom */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgb(var(--rgb-night) / 0.7) 0%, rgb(var(--rgb-night) / 0.5) 40%, rgb(var(--rgb-night) / 0.55) 60%, rgb(var(--rgb-night) / 0.85) 100%)",
          }}
        />

        {/* Same layout as the home hero: centred, Instrument Serif, pill CTAs */}
        <div className="relative flex min-h-[inherit] flex-col items-center justify-center px-6 pt-28 pb-24 text-center">
          <h1
            className="font-serif text-paper"
            style={{ fontSize: "clamp(3rem, min(17vw, 19vh), 11rem)", lineHeight: 0.9, fontWeight: 400, letterSpacing: "-0.03em" }}
          >
            <span className="block italic">still</span>
            <span className="block whitespace-nowrap">looking.</span>
          </h1>
          <p className="mt-6 max-w-[44ch] text-[clamp(0.9375rem,1.5vw,1.125rem)] leading-[1.55] text-paper/85">
            Diogenes walked through Athens in broad daylight with a lit lamp, looking for an honest man. He never found one. This page didn&apos;t find what you were looking for either.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/" className={PILL_SOLID}>
              Back to home
              <ArrowRight size={14} weight="bold" />
            </Link>
            <Link href="/blog" className={PILL_GLASS}>
              Read the essays
            </Link>
          </div>
        </div>

        <p className="absolute bottom-5 right-6 md:bottom-6 md:right-8 max-w-[36ch] text-right text-[12px] text-paper/55">
          {DIOGENES_IMAGE.caption}
        </p>
      </div>
    </section>
  );
}
