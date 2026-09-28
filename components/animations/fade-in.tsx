"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

/*
 * Reveal-on-scroll as a progressive enhancement.
 *
 * - The server-rendered HTML is always fully visible (no inline opacity:0),
 *   so link previews, screenshots, no-JS visitors and slow hydration all see
 *   the content.
 * - After hydration, only blocks that start completely below the fold are
 *   hidden (instantly, while they are off-screen) and then revealed with a
 *   short, small fade + rise when scrolled into view. Anything already on
 *   screen at load is never hidden, so there is no flash.
 * - With `prefers-reduced-motion: reduce` nothing is ever hidden or moved.
 */

const EASE_OUT = [0.23, 1, 0.32, 1] as const;
const IN_VIEW_MARGIN = "-60px 0px";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function useReveal(once: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const isInView = useInView(ref, { once, margin: IN_VIEW_MARGIN });
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    // Only arm the reveal for blocks that are entirely below the fold at mount.
    if (el.getBoundingClientRect().top >= window.innerHeight) setArmed(true);
  }, []);

  const hidden = armed && !reduceMotion && !isInView;
  return { ref, hidden, reduceMotion: Boolean(reduceMotion) };
}

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
  once?: boolean;
}

export function FadeIn({
  children,
  delay = 0,
  duration = 0.5,
  yOffset = 8,
  className,
  once = true,
}: FadeInProps) {
  const { ref, hidden, reduceMotion } = useReveal(once);

  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={
        hidden
          ? { opacity: 0, y: yOffset, transition: { duration: 0 } }
          : {
              opacity: 1,
              y: 0,
              transition: reduceMotion
                ? { duration: 0 }
                : { duration, delay, ease: EASE_OUT },
            }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
  once = true,
}: StaggerContainerProps) {
  const { ref, hidden, reduceMotion } = useReveal(once);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : staggerDelay,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      // `initial={false}` is inherited by StaggerItem children, so the server
      // renders them in their visible state.
      initial={false}
      animate={hidden ? "hidden" : "visible"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  yOffset = 8,
}: {
  children: React.ReactNode;
  className?: string;
  yOffset?: number;
}) {
  const reduceMotion = useReducedMotion();

  const itemVariants = {
    hidden: { opacity: 0, y: yOffset, transition: { duration: 0 } },
    visible: {
      opacity: 1,
      y: 0,
      transition: reduceMotion
        ? { duration: 0 }
        : { duration: 0.5, ease: EASE_OUT },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
