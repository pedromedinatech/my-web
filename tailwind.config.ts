import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "Helvetica Neue", "Arial", "sans-serif"],
        display: ["var(--font-inter)", "Helvetica Neue", "Arial", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "Menlo", "Consolas", "monospace"],
      },
      colors: {
        // Mirrors the CSS variables in app/globals.css
        paper: "rgb(var(--rgb-paper) / <alpha-value>)",
        ink: "rgb(var(--rgb-ink) / <alpha-value>)",
        muted: "rgb(var(--rgb-muted) / <alpha-value>)",
        line: "rgb(var(--rgb-line) / <alpha-value>)",
        hover: "rgb(var(--rgb-hover) / <alpha-value>)",
        accent: "rgb(var(--rgb-accent) / <alpha-value>)",
        "accent-ink": "rgb(var(--rgb-accent-ink) / <alpha-value>)",
        amber: "rgb(var(--rgb-amber) / <alpha-value>)",
        night: "rgb(var(--rgb-night) / <alpha-value>)",
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "1" }],
        xs: ["0.75rem", { lineHeight: "1.4" }],
        sm: ["0.875rem", { lineHeight: "1.5" }],
        base: ["1rem", { lineHeight: "1.75" }],
        lg: ["1.25rem", { lineHeight: "1.5" }],
        xl: ["1.5rem", { lineHeight: "1.3" }],
        "2xl": ["2rem", { lineHeight: "1.15" }],
        "4xl": ["3.5rem", { lineHeight: "1.05" }],
        "6xl": ["6rem", { lineHeight: "0.95" }],
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter: "-0.02em",
        tight: "-0.01em",
        normal: "0",
        wide: "0.05em",
        wider: "0.1em",
        widest: "0.2em",
      },
      maxWidth: {
        prose: "65ch",
        layout: "1400px",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fade-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
    },
  },
  plugins: [],
};
export default config;
