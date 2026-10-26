import Image from "next/image";
import Link from "next/link";

/*
 * 404: a night panel framed like the home hero. Diogenes walked through Athens
 * with a lamp in daylight, looking for an honest man.
 *
 * DIOGENES_IMAGE: Jean-Léon Gérôme, "Diogenes" (1860, Walters Art Museum, open
 * access). Pending Pedro's OK to download it; until then the page is
 * typographic only.
 */
const DIOGENES_IMAGE: { src: string; caption: string } | null = null;

export default function NotFound() {
  return (
    <section className="p-3 md:p-6">
      <div data-nav-on-dark className="relative min-h-[calc(100dvh-1.5rem)] md:min-h-[calc(100dvh-3rem)] rounded-[6px] bg-night text-paper overflow-hidden">
        {/* Lamp light: a warm pool where Diogenes holds the lamp */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-40 -top-40 h-[640px] w-[640px] rounded-full"
          style={{
            background: "radial-gradient(closest-side, rgb(var(--rgb-amber) / 0.22), transparent)",
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

          {DIOGENES_IMAGE && (
            <figure className="justify-self-end w-full max-w-[460px]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[4px]">
                <Image src={DIOGENES_IMAGE.src} alt={DIOGENES_IMAGE.caption} fill className="object-cover" />
              </div>
              <figcaption className="mt-3 text-[12px] text-paper/50">{DIOGENES_IMAGE.caption}</figcaption>
            </figure>
          )}
        </div>
      </div>
    </section>
  );
}
