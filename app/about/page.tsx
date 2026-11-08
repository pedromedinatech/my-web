import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { ABOUT_INTRO, BELIEFS, BORING_VERSION, FAVORITES, WHO_I_AM } from "@/lib/about";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: "About",
  description: "Who Pedro Medina is, what he believes and what he keeps coming back to.",
};

const LINK = "text-xs tracking-wide font-medium inline-flex items-center gap-1.5 link-underline hover:opacity-60 transition-opacity duration-200";
const ROW = "grid grid-cols-[2rem_1fr] gap-4 py-5 border-b border-line";
const num = (i: number) => String(i + 1).padStart(2, "0");

export default function AboutPage() {
  return (
    <div className="max-w-layout mx-auto px-6 md:px-10 pt-28 md:pt-32 pb-20 md:pb-28">

      {/* ── Header — same structure as /blog ── */}
      <div className="mb-20 md:mb-28">
        <div className="flex items-end justify-between mb-6">
          <h1 className="text-display font-black tracking-tightest">about</h1>
          <Link href="/blog" className={LINK}>
            read what I write
            <ArrowUpRight size={11} weight="bold" />
          </Link>
        </div>
        <p className="text-muted text-base max-w-md">{ABOUT_INTRO}</p>
      </div>

      {/* ── [who i am] ── */}
      <section className="mb-16 md:mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-8">[who i am]</h2>
            <p className="text-base text-ink leading-relaxed">{WHO_I_AM}</p>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-xl bg-hover">
            <Image
              src="/images/pedro/about-whoami-2.JPG"
              alt="Pedro Medina"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-bottom"
              priority
            />
          </div>
        </div>
      </section>

      {/* ── [what i believe] ── */}
      <section className="border-t border-line py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight">[what i believe]</h2>
          <div>
            {BELIEFS.map((belief, i) => (
              <div key={belief.text} className={ROW}>
                <span className="text-xs text-muted font-medium pt-0.5">{num(i)}</span>
                <p className="text-base text-ink leading-relaxed">
                  {belief.href ? (
                    <Link href={belief.href} className="link-underline hover:opacity-60 transition-opacity duration-200">
                      {belief.text}
                      <ArrowUpRight size={11} weight="bold" className="inline ml-1 -mt-0.5 text-muted" />
                    </Link>
                  ) : (
                    belief.text
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── [things i keep coming back to] ── */}
      <section className="border-t border-line py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight">[things i keep coming back to]</h2>
          <div>
            {FAVORITES.map((item, i) => (
              <div key={item.title} className={ROW}>
                <span className="text-xs text-muted font-medium pt-0.5">{num(i)}</span>
                <div>
                  <p className="text-base text-ink leading-relaxed">
                    <span className="font-semibold">{item.title}</span>
                    <span className="text-muted">, {item.by}</span>
                  </p>
                  <p className="text-sm text-muted leading-relaxed mt-1">{item.note}</p>
                </div>
              </div>
            ))}
            <Link href="/now" className={`${LINK} mt-8`}>
              what I&apos;m on right now
              <ArrowUpRight size={11} weight="bold" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── [the boring version] ── */}
      <section className="border-t border-line py-12">
        <p className="text-sm text-muted leading-relaxed max-w-prose">{BORING_VERSION}</p>
      </section>

      {/* ── Backlinks ── */}
      <section className="border-t border-line pt-12 flex flex-col sm:flex-row gap-6 sm:gap-16">
        <Link href="/blog" className={LINK}>
          read what I write
          <ArrowUpRight size={11} weight="bold" />
        </Link>
        <Link href="/" className={LINK}>
          home
          <ArrowUpRight size={11} weight="bold" />
        </Link>
      </section>
    </div>
  );
}
