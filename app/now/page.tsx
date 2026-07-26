import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/fade-in";

export const metadata: Metadata = {
  title: "Now",
  description: "What I'm doing now — updated every few months.",
};

const LAST_UPDATED = "July 2026";

const sideQuests = [
  "Taking a solo trip to the mountains",
  "Writing blogs",
];

const learning = [
  "Self-image dictates your reality",
  "Learning to sell makes you a better person",
  "Consume less, create more",
];

const reading = {
  current: [
    { title: "Psycho-Cybernetics", author: "Maxwell Maltz" },
  ],
  recent: [
    { title: "Tuesdays with Morrie", author: "Mitch Albom" },
    { title: "Outliers", author: "Malcolm Gladwell" },
  ],
};

export default function NowPage() {
  return (
    <div className="max-w-layout mx-auto px-6 md:px-10 pt-28 md:pt-32 pb-20 md:pb-28">

      {/* Header */}
      <div className="mb-20 md:mb-28">
        <div className="flex items-end justify-between mb-6">
          <h1 className="text-display font-black tracking-tightest">now</h1>
          <Link
            href="/about"
            className="text-xs tracking-wide font-medium inline-flex items-center gap-1.5 link-underline hover:opacity-60 transition-opacity duration-200"
          >
            about me
            <ArrowUpRight size={11} weight="bold" />
          </Link>
        </div>
        <p className="text-[#6B6B6B] text-base max-w-md">
          What I&apos;m up to right now. Updated every few months.
        </p>
        <p className="text-xs text-[#6B6B6B] mt-3">
          Last updated: {LAST_UPDATED}
        </p>
      </div>

      {/* ── Side-quests ── */}
      <section className="mb-16 md:mb-20">
        <FadeIn>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-10">
            [side-quests]
          </h2>
        </FadeIn>
        <StaggerContainer staggerDelay={0.08}>
          {sideQuests.map((item, i) => (
            <StaggerItem key={i}>
              <div className="grid grid-cols-[2rem_1fr] gap-4 py-5 border-b border-[#E5E5E5]">
                <span className="text-xs text-[#6B6B6B] font-medium pt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-base text-[#0A0A0A] leading-relaxed">{item}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* ── Learning ── */}
      <section className="py-16 md:py-20">
        <FadeIn>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-10">
            [learning]
          </h2>
        </FadeIn>
        <StaggerContainer staggerDelay={0.08}>
          {learning.map((item, i) => (
            <StaggerItem key={i}>
              <div className="grid grid-cols-[2rem_1fr] gap-4 py-5 border-b border-[#E5E5E5]">
                <span className="text-xs text-[#6B6B6B] font-medium pt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-base text-[#0A0A0A] leading-relaxed">{item}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* ── Reading ── */}
      <section className="py-16 md:py-20">
        <FadeIn>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-10">
            [reading]
          </h2>
        </FadeIn>

        {/* Currently reading */}
        <FadeIn delay={0.1}>
          <h3 className="text-xs tracking-wide text-[#6B6B6B] font-medium mb-4">
            Currently reading
          </h3>
        </FadeIn>
        <StaggerContainer staggerDelay={0.08}>
          {reading.current.map((item, i) => (
            <StaggerItem key={i}>
              <div className="flex items-baseline gap-2 py-4 border-b border-[#E5E5E5]">
                <span className="font-bold text-base">{item.title}</span>
                <span className="text-[#6B6B6B] text-sm">{item.author}</span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Recently read */}
        <FadeIn delay={0.1}>
          <h3 className="text-xs tracking-wide text-[#6B6B6B] font-medium mb-4 mt-10">
            Recently read
          </h3>
        </FadeIn>
        <StaggerContainer staggerDelay={0.08}>
          {reading.recent.map((item, i) => (
            <StaggerItem key={i}>
              <div className="flex items-baseline gap-2 py-4 border-b border-[#E5E5E5]">
                <span className="font-bold text-base">{item.title}</span>
                <span className="text-[#6B6B6B] text-sm">{item.author}</span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* ── Backlinks ── */}
      <section className="pt-12 flex flex-col sm:flex-row gap-6 sm:gap-16">
        <Link
          href="/blog"
          className="text-xs tracking-wide font-medium inline-flex items-center gap-1.5 link-underline hover:opacity-60 transition-opacity duration-200"
        >
          read what I write
          <ArrowUpRight size={11} weight="bold" />
        </Link>
        <Link
          href="/"
          className="text-xs tracking-wide font-medium inline-flex items-center gap-1.5 link-underline hover:opacity-60 transition-opacity duration-200"
        >
          home
          <ArrowUpRight size={11} weight="bold" />
        </Link>
      </section>
    </div>
  );
}
