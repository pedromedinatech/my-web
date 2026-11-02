// Pill-shaped calls to action for text set over a photo (home hero, 404).
// Solid paper for the main action, translucent glass for the secondary one.
const PILL =
  "press inline-flex h-11 items-center gap-1.5 rounded-full px-5 text-[14px] font-medium tracking-tight transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper";

export const PILL_SOLID = `${PILL} bg-paper text-ink hover:bg-white`;

export const PILL_GLASS = `${PILL} border border-white/25 bg-white/10 text-white backdrop-blur-md hover:bg-white/20`;
