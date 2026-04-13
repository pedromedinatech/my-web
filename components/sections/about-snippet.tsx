import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { FadeIn } from "@/components/animations/fade-in";

export function AboutSnippetSection() {
  return (
    <section className="max-w-layout mx-auto px-6 md:px-10 py-20 md:py-32">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-stretch">

        {/* Left: text */}
        <FadeIn>
          <div>
            {/* Header */}
            <div className="mb-10">
              <h2 className="font-black text-[#0A0A0A] tracking-tight leading-tight" style={{ fontSize: "clamp(1.6rem, 3vw, 2.25rem)" }}>
                [why are you seeing this]
              </h2>
            </div>

            {/* Body */}
            <div className="space-y-5 mb-10">
              <p className="text-[#0A0A0A] text-base leading-relaxed">
                For a long time I was the kind of person who just goes with the flow.
                Not because I wanted to, but because I didn&apos;t know there was another
                option. When I started to see it, I became obsessed. I wanted something
                big. The problem is that wanting isn&apos;t enough, and it took me years to
                understand that. My fears, my insecurities and everything I had accumulated
                without noticing, were holding me back more than any external circumstance.
                One day I decided that was my responsibility. Mine alone.
              </p>
              <p className="text-[#0A0A0A] text-base leading-relaxed">
                So I started doing uncomfortable things. Posting videos without being sure
                why. Writing without knowing if anyone would read it. Chasing things I still
                don&apos;t fully know how to achieve. I&apos;m not where I want to be. But I&apos;m on the
                way. This site is part of that journey.
              </p>
            </div>

            {/* Link */}
            <Link
              href="/about"
              className="text-xs tracking-wide font-medium inline-flex items-center gap-1.5 link-underline hover:opacity-60 transition-opacity duration-200"
            >
              about me
              <ArrowUpRight size={11} weight="bold" />
            </Link>
          </div>
        </FadeIn>

        {/* Right: photo */}
        <FadeIn delay={0.15}>
          <div className="relative w-full aspect-[4/3] md:aspect-auto md:min-h-[400px] overflow-hidden rounded-2xl bg-[#F0F0F0]">
            <Image
              src="/images/whoami.JPG"
              alt="Pedro Medina"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
