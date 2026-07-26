import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/fade-in";

export const metadata: Metadata = {
  title: "About",
  description: "Who Pedro Medina is. A record of what he builds and what he learns.",
};

const drives = [
  { n: "01", text: "Trying to be my most authentic self every single day." },
  { n: "02", text: "Learning as much things as I can in my 20s." },
  { n: "03", text: "Share stuff I learn to help people." },
  { n: "04", text: "Building things that have impact on others." },
];

const interests = [
  { label: "[startups]", src: "/images/startups.jpg" },
  { label: "[tech]",     src: "/images/technology.jpg" },
  { label: "[sport]",    src: "/images/sports.JPG", position: "object-[center_20%]" },
  { label: "[travel]",   src: "/images/travelling.webp" },
  { label: "[reading]",  src: "/images/read.jpg" },
  { label: "[people]",   src: "/images/people.JPG", position: "object-[center_50%]" },
];

export default function AboutPage() {
  return (
    <div className="max-w-layout mx-auto px-6 md:px-10 pt-28 md:pt-32 pb-20 md:pb-28">

      {/* ── Header — same structure as /blog ── */}
      <div className="mb-20 md:mb-28">
        <div className="flex items-end justify-between mb-6">
          <h1 className="text-display font-black tracking-tightest">about</h1>
          <Link
            href="/blog"
            className="text-xs tracking-wide font-medium inline-flex items-center gap-1.5 link-underline hover:opacity-60 transition-opacity duration-200"
          >
            read what I write
            <ArrowUpRight size={11} weight="bold" />
          </Link>
        </div>
        <p className="text-[#6B6B6B] text-base max-w-md">
          I don&apos;t have it all figured out. But I know what I&apos;m after.
        </p>
      </div>

      {/* ── [who i am] ── */}
      <section className="mb-16 md:mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
          <FadeIn>
            <div>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-8">
                [who i am]
              </h2>
              <p className="text-base text-[#0A0A0A] leading-relaxed">
                A 20-year-old Spanish CS student living abroad who spent years chasing grades and missing the point.
                He understood nobody was going to save him, and started being responsible for himself. He noticed
                he was not meant for a predictable path. He started doing side-quests which eventually ended up
                liking. Concluded that why sticking to one single thing was atractive, and started running away
                from that. Accepted the fact that learning never ends.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.12}>
            <div className="relative aspect-video overflow-hidden rounded-xl bg-[#F5F5F5]">
              <Image
                src="/images/pedro/about-whoami-2.JPG"
                alt="Pedro Medina"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-bottom"
                priority
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── [what drives me] ── */}
      <section className="border-t border-[#E5E5E5] py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
          <FadeIn>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight">
              [what drives me]
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <StaggerContainer staggerDelay={0.1}>
              {drives.map((item) => (
                <StaggerItem key={item.n}>
                  <div className="grid grid-cols-[2rem_1fr] gap-4 py-5 border-b border-[#E5E5E5]">
                    <span className="text-xs text-[#6B6B6B] font-medium pt-0.5">{item.n}</span>
                    <p className="text-base text-[#0A0A0A] leading-relaxed">{item.text}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </FadeIn>
        </div>
      </section>

      {/* ── [what i like] ── */}
      <section className="border-t border-[#E5E5E5] py-16 md:py-20">
        <FadeIn>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-10">
            [what do I actually love]
          </h2>
        </FadeIn>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {interests.map((item, i) => (
            <FadeIn key={item.label} delay={i * 0.07}>
              <div className="relative overflow-hidden rounded-xl bg-[#F5F5F5] group">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={item.src}
                    alt={item.label}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className={`object-cover ${item.position ?? "object-center"} transition-transform duration-700 group-hover:scale-105`}
                  />
                  <div className="absolute inset-0 bg-black/30" />
                </div>
                <span className="absolute bottom-3 left-3 text-sm font-normal text-white">
                  {item.label}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── Backlinks ── */}
      <section className="border-t border-[#E5E5E5] pt-12 flex flex-col sm:flex-row gap-6 sm:gap-16">
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
