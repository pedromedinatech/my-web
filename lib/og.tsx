/**
 * Shared pieces for the generated Open Graph images
 * (app/opengraph-image.tsx and app/blog/[slug]/opengraph-image.tsx).
 *
 * Images are rendered at build time with next/og (Satori). Fonts are fetched
 * from Google Fonts during the build; if that fails, the card still renders
 * with next/og's bundled default font so the build never breaks.
 */

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const INK = "#0A0A0A";
const MUTED = "#6B6B6B";
const PADDING = 72;

// An old Safari user agent makes the Google Fonts CSS2 API answer with TTF
// files, which Satori can read (it can't read woff2).
const TTF_USER_AGENT =
  "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1";

type OgFont = {
  name: string;
  data: ArrayBuffer;
  weight: 500 | 900;
  style: "normal";
};

async function loadInter(weight: 500 | 900): Promise<OgFont | null> {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=Inter:wght@${weight}`,
      {
        headers: { "User-Agent": TTF_USER_AGENT },
        signal: AbortSignal.timeout(10_000),
      }
    ).then((res) => {
      if (!res.ok) throw new Error(`css ${res.status}`);
      return res.text();
    });

    const match = css.match(
      /src:\s*url\(([^)]+)\)\s*format\(['"](truetype|opentype)['"]\)/
    );
    if (!match) throw new Error("no ttf/otf src in css");

    const data = await fetch(match[1], {
      signal: AbortSignal.timeout(10_000),
    }).then((res) => {
      if (!res.ok) throw new Error(`font ${res.status}`);
      return res.arrayBuffer();
    });

    return { name: "Inter", data, weight, style: "normal" };
  } catch (err) {
    console.warn(
      `[og] could not load Inter ${weight}, using default font:`,
      err instanceof Error ? err.message : err
    );
    return null;
  }
}

let fontsPromise: Promise<OgFont[]> | null = null;

/** Inter Medium + Inter Black, or [] if Google Fonts is unreachable. */
export function loadOgFonts(): Promise<OgFont[]> {
  if (!fontsPromise) {
    fontsPromise = Promise.all([loadInter(500), loadInter(900)]).then(
      (fonts) => fonts.filter((f): f is OgFont => f !== null)
    );
  }
  return fontsPromise;
}

/**
 * Windows-only workaround for next 14.2's bundled @vercel/og 0.6.3.
 *
 * Its Node entry locates its wasm/font files at import time with
 * `fileURLToPath(path.join(import.meta.url, "../yoga.wasm"))`. On Windows,
 * path.join turns the file:// URL into backslashes and fileURLToPath throws
 * "Invalid URL", so every ImageResponse fails and `next build` breaks.
 *
 * We pre-import that module once with path.join temporarily routed to
 * path.posix.join for file: URLs, then restore it. The module stays cached, so
 * next/og's own lazy import reuses it. No-op on Linux/macOS (e.g. Vercel).
 */
let ogRuntimeReady: Promise<void> | null = null;

function ensureOgRuntime(): Promise<void> {
  if (process.platform !== "win32" || process.env.NEXT_RUNTIME === "edge") {
    return Promise.resolve();
  }
  if (!ogRuntimeReady) {
    ogRuntimeReady = (async () => {
      /* eslint-disable @typescript-eslint/no-require-imports */
      const path = require("path") as typeof import("path");
      const { syncBuiltinESMExports } = require("module") as typeof import("module");
      /* eslint-enable @typescript-eslint/no-require-imports */
      const originalJoin = path.join;
      path.join = (...parts: string[]) =>
        parts[0]?.startsWith("file:")
          ? path.posix.join(...parts)
          : originalJoin(...parts);
      syncBuiltinESMExports();
      try {
        await import(
          /* webpackIgnore: true */ "next/dist/compiled/@vercel/og/index.node.js"
        );
      } catch (err) {
        console.warn(
          "[og] could not preload @vercel/og:",
          err instanceof Error ? err.message : err
        );
      } finally {
        path.join = originalJoin;
        syncBuiltinESMExports();
      }
    })();
  }
  return ogRuntimeReady;
}

/** ImageResponse options: size + fonts (omitted when none loaded, so next/og uses its default). */
export async function ogImageOptions() {
  await ensureOgRuntime();
  const fonts = await loadOgFonts();
  return { ...OG_SIZE, fonts: fonts.length > 0 ? fonts : undefined };
}

/**
 * Title size that keeps the title within ~3 lines of the 1056px content box.
 * Inter Black with -0.04em tracking averages roughly 0.56em per character.
 */
function titleFontSize(title: string): number {
  const length = title.length;
  if (length <= 40) return 76;
  if (length <= 60) return 68;
  if (length <= 80) return 60;
  if (length <= 110) return 52;
  return 44;
}

export function OgCard({
  label,
  title,
  subline,
}: {
  label?: string;
  title: string;
  subline?: string;
}) {
  const fontSize = titleFontSize(title);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: PADDING,
        backgroundColor: "#FFFFFF",
        color: INK,
        fontFamily: "Inter",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 26,
          fontWeight: 500,
          color: MUTED,
          letterSpacing: "-0.01em",
        }}
      >
        {label ?? ""}
      </div>

      {/* No fixed height/overflow clip here: the size table above plus
          lineClamp (whole lines, with ellipsis) keep the title within 3 lines
          for any font metrics, including the fallback font. */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontSize,
            fontWeight: 900,
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
            textWrap: "balance",
            lineClamp: 3,
          }}
        >
          {title}
        </div>
        {subline ? (
          <div
            style={{
              marginTop: 28,
              fontSize: 30,
              fontWeight: 500,
              lineHeight: 1.35,
              color: MUTED,
              letterSpacing: "-0.01em",
              maxWidth: 900,
            }}
          >
            {subline}
          </div>
        ) : null}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            fontSize: 30,
            fontWeight: 900,
            letterSpacing: "-0.03em",
          }}
        >
          pedro medina
        </div>
        <div
          style={{
            fontSize: 24,
            fontWeight: 500,
            color: MUTED,
          }}
        >
          iampedromedina.com
        </div>
      </div>
    </div>
  );
}
