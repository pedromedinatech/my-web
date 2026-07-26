import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { FadeIn } from "@/components/animations/fade-in";

export function AboutSnippetSection() {
  return (
    <section id="about" className="max-w-layout mx-auto px-6 md:px-10 py-20 md:py-32">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-stretch">

        {/* Left: text */}
        <FadeIn>
          <div>
            {/* Header */}
            <div className="mb-10">
              <h2 className="font-black text-[#0A0A0A] tracking-tight leading-tight" style={{ fontSize: "clamp(1.6rem, 3vw, 2.25rem)" }}>
                [about]
              </h2>
            </div>

            {/* Body */}
            <div className="space-y-5 mb-10">
              <p className="text-[#0A0A0A] text-base leading-relaxed">
                I&apos;m 20, born in Córdoba. I&apos;m trying to collect as many experiences
                as I can while I&apos;m young. My happiness comes from taking side-quests
                and creating things. I study, I sell, I build and I write, and I know
                the intersection of all of them will become something powerful.
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
              src="/images/pedro/IMG_2325.webp"
              alt="Pedro Medina"
              fill
              className="object-cover object-[center_70%]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
