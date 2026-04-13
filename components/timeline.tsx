"use client";

import Image from "next/image";
import { FadeIn } from "@/components/animations/fade-in";

export interface TimelineEntry {
  year?: string;
  title: string;
  text: string;
  image?: string;
}

interface TimelineProps {
  entries: TimelineEntry[];
}

export function Timeline({ entries }: TimelineProps) {
  return (
    <div className="relative">
      {/* Central line — visible on desktop, left-aligned on mobile */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[#E5E5E5] -translate-x-px md:-translate-x-px" />

      <div className="space-y-16 md:space-y-24">
        {entries.map((entry, i) => {
          const isRight = i % 2 === 0;

          return (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="relative flex items-start">
                {/* Dot marker */}
                <div
                  className={[
                    "absolute top-1.5 w-2 h-2 rounded-full bg-[#0A0A0A] z-10",
                    // Mobile: always on left edge
                    "left-4 -translate-x-1/2",
                    // Desktop: center line
                    "md:left-1/2 md:-translate-x-1/2",
                  ].join(" ")}
                />

                {/*
                  Desktop layout: alternating columns
                  Mobile layout: all content to the right of the left line
                */}
                <div
                  className={[
                    // Mobile: content always right of the left line
                    "ml-10 w-[calc(100%-2.5rem)]",
                    // Desktop: two-column alternating
                    "md:ml-0 md:w-full md:grid md:grid-cols-2 md:gap-16 md:items-start",
                  ].join(" ")}
                >
                  {/* Content block */}
                  <div
                    className={[
                      "md:row-start-1",
                      isRight
                        ? "md:col-start-1 md:text-right md:pr-8"
                        : "md:col-start-2 md:pl-8",
                    ].join(" ")}
                  >
                    {entry.year && (
                      <span className="block text-xs tracking-widest font-medium text-[#6B6B6B] uppercase mb-3">
                        {entry.year}
                      </span>
                    )}
                    <h3 className="text-xl md:text-2xl font-black tracking-tight mb-4">
                      {entry.title}
                    </h3>
                    <p className="text-base text-[#0A0A0A] leading-relaxed">
                      {entry.text}
                    </p>
                  </div>

                  {/* Image block (optional) */}
                  {entry.image && (
                    <div
                      className={[
                        "mt-6 md:mt-0 md:row-start-1",
                        isRight
                          ? "md:col-start-2 md:pl-8"
                          : "md:col-start-1 md:pr-8",
                      ].join(" ")}
                    >
                      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[#F5F5F5]">
                        <Image
                          src={entry.image}
                          alt={entry.title}
                          fill
                          className="object-cover object-center"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </div>
  );
}
