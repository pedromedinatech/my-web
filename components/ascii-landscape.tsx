"use client";

import { useEffect, useRef, useState } from "react";
import {
  ASCII_DESKTOP,
  ASCII_DESKTOP_COLS,
  ASCII_MOBILE,
  ASCII_MOBILE_COLS,
} from "@/lib/footer-ascii";

/*
 * The footer landscape: one of Pedro's photos rendered as text
 * (scripts/ascii-landscape.py). Real text in a monospace cell of 0.6em, sized
 * with container units so the columns always fill the width exactly.
 *
 * It is the site's single orchestrated moment: the first time it scrolls into
 * view it is revealed from the bottom up. The server HTML is fully visible;
 * the reveal is only armed for visitors who arrive with it below the fold and
 * without reduced motion.
 */

const CELL = 0.6; // advance width of Geist Mono, in em

export function AsciiLandscape() {
  const ref = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || el.getBoundingClientRect().top < window.innerHeight) return;
    setArmed(true);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const hidden = armed && !shown;

  return (
    <div
      ref={ref}
      aria-hidden
      className="w-full select-none text-ink/55 font-mono"
      style={{
        containerType: "inline-size",
        // Ligatures would merge runs like "===" into one glyph and break the grid.
        fontVariantLigatures: "none",
        fontFeatureSettings: '"liga" 0, "calt" 0, "dlig" 0',
        clipPath: hidden ? "inset(100% 0 0 0)" : "inset(0 0 0 0)",
        transition: armed ? "clip-path 1100ms cubic-bezier(0.23, 1, 0.32, 1)" : undefined,
      }}
    >
      <pre
        className="hidden md:block m-0 whitespace-pre"
        style={{
          fontSize: `calc(100cqw / ${ASCII_DESKTOP_COLS * CELL})`,
          lineHeight: 1,
        }}
      >
        {ASCII_DESKTOP}
      </pre>
      <pre
        className="md:hidden m-0 whitespace-pre"
        style={{
          fontSize: `calc(100cqw / ${ASCII_MOBILE_COLS * CELL})`,
          lineHeight: 1,
        }}
      >
        {ASCII_MOBILE}
      </pre>
    </div>
  );
}
