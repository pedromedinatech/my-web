import { StaggerContainer, StaggerItem } from "@/components/animations/fade-in";

const axes = [
  {
    label: "startups",
    title: "Learning to build products people actually want.",
    description:
      "The process of going from an idea to something real that someone uses. No shortcuts, no certainties, lots of iteration.",
  },
  {
    label: "communication",
    title: "Clarity as a competitive advantage.",
    description:
      "Writing with precision. Speaking with conviction. Understanding that communicating well is a technical skill, not a talent.",
  },
  {
    label: "technology",
    title: "Building with today's tools to understand tomorrow.",
    description:
      "Not as an end in itself, but as a means to create things with real impact and real scale.",
  },
];

export function BuildingSection() {
  return (
    <section className="max-w-layout mx-auto px-6 md:px-10 py-24 md:py-32">
      {/* Section label */}
      <p className="text-xs tracking-wide text-[#6B6B6B] mb-16 font-medium">
        what I&apos;m building
      </p>

      <StaggerContainer
        className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-0"
        staggerDelay={0.12}
      >
        {/* Large left block */}
        <StaggerItem>
          <div className="border-t border-[#E5E5E5] pt-8 pb-12 pr-0 md:pr-16">
            <span className="text-xs tracking-wide text-[#6B6B6B] font-medium mb-4 block">
              {axes[0].label}
            </span>
            <h2
              className="font-black text-[#0A0A0A] mb-4 leading-tight tracking-tight"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}
            >
              {axes[0].title}
            </h2>
            <p className="text-[#6B6B6B] text-base leading-relaxed max-w-[50ch]">
              {axes[0].description}
            </p>
          </div>
        </StaggerItem>

        {/* Right column — 2 stacked blocks */}
        <div className="flex flex-col">
          {axes.slice(1).map((axis) => (
            <StaggerItem key={axis.label}>
              <div className="border-t border-[#E5E5E5] pt-8 pb-10 md:pl-10">
                <span className="text-xs tracking-wide text-[#6B6B6B] font-medium mb-3 block">
                  {axis.label}
                </span>
                <h3 className="text-base font-bold text-[#0A0A0A] leading-snug tracking-tight mb-2">
                  {axis.title}
                </h3>
                <p className="text-sm text-[#6B6B6B] leading-relaxed">
                  {axis.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </div>
      </StaggerContainer>
    </section>
  );
}
