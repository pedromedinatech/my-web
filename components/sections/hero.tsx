"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";

const LINES = [
  { text: "i am", muted: false },
  { text: "pedro medina", muted: false },
];

/*
 * The name and subtitle are rendered visible from the server HTML (no entrance
 * animation), so a visitor sees whose site this is on first paint.
 *
 * Name size: bounded by width (12vw keeps "pedro medina" on one line on small
 * phones) and by height (16vh keeps the whole block above the fold on short
 * laptop screens), between 2.5rem and 11rem.
 */
const NAME_FONT_SIZE = "clamp(2.5rem, min(12vw, 16vh), 11rem)";

export function HeroSection() {
  const reduceMotion = useReducedMotion();
  // Starts false on server and client so hydration matches.
  const [animateIndicator, setAnimateIndicator] = useState(false);
  useEffect(() => {
    setAnimateIndicator(reduceMotion === false);
  }, [reduceMotion]);

  return (
    <section className="relative min-h-[100dvh] w-full overflow-hidden">

      {/* ── Full-bleed image ── */}
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

      {/* ── Scrim: darker at the bottom where the text sits ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.45) 30%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.08) 100%)",
        }}
      />

      {/* ── Display text — bottom-left ── */}
      <div className="absolute bottom-10 left-6 right-6 md:right-auto md:bottom-14 md:left-10 lg:left-16 z-10 select-none">
        <h1
          aria-label="I am Pedro Medina, building in public"
          style={{
            fontSize: NAME_FONT_SIZE,
            lineHeight: 0.9,
            fontWeight: 800,
            letterSpacing: "-0.03em",
          }}
        >
          {LINES.map((line) => (
            <span
              key={line.text}
              className="block whitespace-nowrap"
              style={{ color: line.muted ? "rgba(255,255,255,0.3)" : "#ffffff" }}
            >
              {line.text}
            </span>
          ))}
        </h1>

        {/* ── Subtitle ── */}
        <p
          className="mt-4 max-w-[34ch] md:max-w-none md:whitespace-nowrap text-white/85"
          style={{
            fontSize: "clamp(0.875rem, 1.5vw, 1.125rem)",
            lineHeight: 1.5,
            fontWeight: 400,
          }}
        >
          Studying computer science, working at a startup, and writing about what I learn along the way.
        </p>

        {/* ── CTA links ── */}
        <div className="flex items-center gap-6 mt-5">
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("about")?.scrollIntoView({
                behavior: reduceMotion ? "auto" : "smooth",
              });
            }}
            className="inline-flex items-center gap-1 text-sm font-medium tracking-wide text-white/80 hover:text-white transition-colors"
          >
            About me
            <ArrowUpRight size={14} weight="bold" />
          </a>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm font-medium tracking-wide text-white/80 hover:text-white transition-colors"
          >
            Read my writing
            <ArrowUpRight size={14} weight="bold" />
          </Link>
        </div>
      </div>

      {/* ── Scroll indicator (decorative). Static line in the server HTML and
          with reduced motion; loops only after hydration when motion is OK. ── */}
      <div
        aria-hidden
        className="absolute bottom-10 right-6 md:bottom-14 md:right-10 lg:right-16 z-10"
      >
        <motion.span
          className="block w-px bg-white/30"
          initial={false}
          animate={
            animateIndicator
              ? { scaleY: [0, 1, 1, 0], y: ["0%", "0%", "0%", "100%"] }
              : { scaleY: 1, y: "0%" }
          }
          transition={
            animateIndicator
              ? {
                  repeat: Infinity,
                  duration: 2.6,
                  ease: "easeInOut",
                  times: [0, 0.3, 0.7, 1],
                }
              : { duration: 0 }
          }
          style={{ height: 44, transformOrigin: "top" }}
        />
      </div>
    </section>
  );
}
