import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/fade-in";
import { Timeline, type TimelineEntry } from "@/components/timeline";

export const metadata: Metadata = {
  title: "About",
  description: "Who Pedro Medina is. A record of what he builds and what he learns.",
};

const path: TimelineEntry[] = [
  {
    year: "2005 — 2017",
    title: "[the happiest guy on earth]",
    text: "Grew up in Córdoba, a small city in the south of Spain. Had the kindest childhood, great and loving parents raised me. \
    I look back at those days, where nothing could stop me from doing the things I wanted. A child's mind is what I already tell everyone \
    is an adult's goal. Not being afraid of the outcome, just going where curiosity carries you. The happiest I have ever been.",
    image: "/images/pedro/about-the-happiest.JPG",
  },
  {
    year: "2017 — 2023",
    title: "[going with the flow]",
    text: "Soon you find out you are growing up, new things come into your life. Without certain traits, this can lead you to doing \
    things you don't actually like, but others do. And as a byproduct, you fit the group, at the cost of losing yourself. I barely have \
    any remider of that period, just going with the flow, doing the things I was supposed to, always dictated by others. I admit that I kinda \
    hate my teens, seeing it from my actual perspective, but that built who I am today. I had fun, not everything was bad, but it was not me at all.",
    image: "/images/pedro/about-going-with-the-flow.png",
  },
  {
    year: "2023 — 2025",
    title: "[the wake-up call]",
    text: "They say you are who you are surrounded by. I started meeting the right people, some casually, some intentionally. \
    Something clicked for me. I put myself in rooms aligned with what I was really trying to be. I woke up from being passive to \
    whatever happened at me, to putting myself intentionally in places where I made things happen. I realized how much was possible \
    and how many things I had beeing doing wrong. My life changed apparently, it was a new me. But something was still off, there was \
    a void. It was the gap between who I realized I could be, and who I was at that moment. I did not know what I liked (still don't), \
    and I was constantly paralyzed, did not do many things just because I overthought it too much. Changed a lot of habits. Everybody told \
    me I had potential, but seeing it did not match my reality started to curse me. ",
    image: "/images/pedro/the-wake-up-call.JPG",
  },
  {
    year: "2025 — now",
    title: "[on my way]",
    text: "I moved 4000 km far away from home. First time I was alone in a whole different country, without my family. It initially hurted me \
    but I lowkey knew now I was free to do everything I hadn't been able before. I started creating videos, and started a blog. \
    I investing on myself, trusting people a few steps ahead of me to help me get where I want to be. I started side-projects too. \
    Since that everything has changed, now I see myself moving towards something, not paralyzed anymore. Follow along on this journey, \
    which I am sure will carry me to a better place.",
    image: "/images/pedro/on-my-way.JPG",
  },
];

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
  { label: "[travel]",   src: "/images/travel.jpg" },
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
                src="/images/pedro/about-whoami.JPG"
                alt="Pedro Medina"
                fill
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

      {/* ── [my path] ── */}
      <section className="border-t border-[#E5E5E5] py-16 md:py-20">
        <FadeIn>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-14 md:mb-20">
            [my path]
          </h2>
        </FadeIn>
        <Timeline entries={path} />
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
