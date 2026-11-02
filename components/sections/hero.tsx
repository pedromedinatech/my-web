"use client";

import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight } from "@phosphor-icons/react";
import { PILL_GLASS, PILL_SOLID } from "@/components/pill-link";

/*
 * The name and subtitle are rendered visible from the server HTML (no entrance
 * animation), so a visitor sees whose site this is on first paint.
 *
 * Centred, in Instrument Serif (option 1 of the hero study in Paper,
 * "iampedromedina — hero"): "i am" in italic over the name.
 * Name size: bounded by width (17vw keeps "pedro medina" on one line on small
 * phones; the serif is narrow) and by height (19vh keeps the whole block on
 * short laptop screens), between 3rem and 11rem.
 *
 * The photo no longer bleeds to the edges: it sits inside a thin paper margin
 * (12px on phones, 24px from md), like a print laid on the page.
 */
const NAME_FONT_SIZE = "clamp(3rem, min(17vw, 19vh), 11rem)";

export function HeroSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="p-3 md:p-6">
      <div data-nav-on-dark className="relative h-[calc(100dvh-1.5rem)] md:h-[calc(100dvh-3rem)] min-h-[520px] w-full overflow-hidden rounded-[6px]">

      {/* ── Framed image ── */}
      <Image
        src="/images/hero.JPG"
        alt=""
        fill
        priority
        quality={90}
        className="object-cover object-center"
        aria-hidden
        sizes="100vw"
      />

      {/* ── Scrim: a little darker at the top (nav) and at the bottom, light in the middle ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(22,17,13,0.4) 0%, rgba(22,17,13,0.15) 40%, rgba(22,17,13,0.2) 60%, rgba(22,17,13,0.6) 100%)",
        }}
      />

      {/* ── Display text — centred ── */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center select-none">
        <h1
          aria-label="I am Pedro Medina, building in public"
          className="font-serif text-white"
          style={{
            fontSize: NAME_FONT_SIZE,
            lineHeight: 0.9,
            fontWeight: 400,
            letterSpacing: "-0.03em",
          }}
        >
          <span className="block italic">i am</span>
          <span className="block whitespace-nowrap">pedro medina</span>
        </h1>

        {/* ── Subtitle ── */}
        <p
          className="mt-6 max-w-[36ch] md:max-w-[44ch] text-white/90"
          style={{
            fontSize: "clamp(0.9375rem, 1.5vw, 1.125rem)",
            lineHeight: 1.55,
            fontWeight: 400,
          }}
        >
          Studying computer science, working at a startup, and writing about what I learn along the way.
        </p>

        {/* ── CTAs: writing first (solid), about as the quieter glass pill ── */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
          <Link href="/blog" className={PILL_SOLID}>
            Read my writing
            <ArrowRight size={14} weight="bold" />
          </Link>
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("about")?.scrollIntoView({
                behavior: reduceMotion ? "auto" : "smooth",
              });
            }}
            className={PILL_GLASS}
          >
            About me
            <ArrowDown size={14} weight="bold" />
          </a>
        </div>
      </div>

      </div>
    </section>
  );
}
