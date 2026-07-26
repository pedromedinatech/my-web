"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const LINES = [
  { text: "i am", muted: false },
  { text: "pedro medina", muted: false },
];

export function HeroSection() {
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

      {/* ── Overlay for text legibility ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.25) 45%, rgba(0,0,0,0.1) 100%)",
        }}
      />

      {/* ── Display text — bottom-left ── */}
      <div className="absolute bottom-10 left-6 md:bottom-14 md:left-10 lg:left-16 z-10 select-none">
        <h1
          aria-label="I am Pedro Medina, building in public"
          className="overflow-hidden"
          style={{
            fontSize: "clamp(3.5rem, 10vw, 11rem)",
            lineHeight: 0.9,
            fontWeight: 800,
            letterSpacing: "-0.03em",
          }}
        >
          {LINES.map((line, i) => (
            <span key={line.text} className="block overflow-hidden">
              <motion.span
                className="block"
                style={{ color: line.muted ? "rgba(255,255,255,0.3)" : "#ffffff" }}
                initial={{ y: "105%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.75, delay: 0.1 + i * 0.1, ease: EASE_OUT }}
              >
                {line.text}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* ── Subtitle ── */}
        <div className="overflow-hidden mt-4">
          <motion.span
            className="block text-white whitespace-nowrap"
            style={{
              fontSize: "clamp(0.875rem, 1.5vw, 1.125rem)",
              fontWeight: 300,
              opacity: 0.7,
            }}
            initial={{ y: "105%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.75, delay: 0.35, ease: EASE_OUT }}
          >
            Studying computer science, working at a startup, and writing about what I learn along the way.
          </motion.span>
        </div>

        {/* ── CTA links ── */}
        <motion.div
          className="flex items-center gap-6 mt-5"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: EASE_OUT }}
        >
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
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
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
        className="absolute bottom-10 right-6 md:bottom-14 md:right-10 lg:right-16 z-10"
      >
        <motion.span
          className="block w-px bg-white/30"
          animate={{ scaleY: [0, 1, 1, 0], y: ["0%", "0%", "0%", "100%"] }}
          transition={{
            repeat: Infinity,
            duration: 2.6,
            ease: "easeInOut",
            times: [0, 0.3, 0.7, 1],
          }}
          style={{ height: 44, transformOrigin: "top" }}
        />
      </motion.div>
    </section>
  );
}
