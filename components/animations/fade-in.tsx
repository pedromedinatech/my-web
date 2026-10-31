/*
 * Static wrappers (redesign, Oct 2026).
 *
 * These used to fade and rise every block into view on scroll. Per-section
 * entrance animations read as a generic template, so the site now keeps a
 * single orchestrated moment (the ASCII landscape in the footer) and renders
 * everything else immediately. The components stay so pages keep their layout
 * and markup; the motion props are accepted and ignored.
 */

interface WrapperProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  once?: boolean;
  staggerDelay?: number;
}

export function FadeIn({ children, className }: WrapperProps) {
  return <div className={className}>{children}</div>;
}

export function StaggerContainer({ children, className }: WrapperProps) {
  return <div className={className}>{children}</div>;
}

export function StaggerItem({ children, className }: WrapperProps) {
  return <div className={className}>{children}</div>;
}
