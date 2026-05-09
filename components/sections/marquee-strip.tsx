"use client";

import { motion } from "framer-motion";

const ITEMS = [
  "BUILDER",
  "WRITER",
  "STARTUPS",
  "TECH",
  "COMMUNICATION",
  "ATHLETE"
];

const SEP = "·";

const track = Array.from({ length: 4 }, () => ITEMS).flat();

export function MarqueeStrip() {
  return (
    <div className="w-full bg-[#0A0A0A] overflow-hidden py-3 select-none">
      <motion.div
        className="flex gap-6 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 18, ease: "linear", repeat: Infinity }}
      >
        {[...track, ...track].map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="text-xs tracking-widest font-bold text-white/70 flex-shrink-0"
          >
            {item}
            <span className="mx-3 text-white/30">{SEP}</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
