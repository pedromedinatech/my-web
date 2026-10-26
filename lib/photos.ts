import photosData from "@/content/photos.json";

export interface Photo {
  src: string;
  width: number;
  height: number;
  alt: string;
  title?: string;
  date?: string;
  camera?: string;
  lens?: string;
  aperture?: string;
  shutter?: string;
  iso?: number;
  placeholder?: boolean;
}

/** Column counts used at each breakpoint of /photos. */
export const MASONRY_COLUMNS = [2, 3, 4] as const;
export type ColumnCount = (typeof MASONRY_COLUMNS)[number];

/**
 * Where one photo sits for a given column count. Positions are expressed in
 * units of the column width (`a`) plus a number of gaps (`b`), so the browser
 * can resolve them for any width with calc() and no JavaScript:
 *   top = a * columnWidth + b * gap
 */
export interface Slot {
  column: number;
  a: number;
  b: number;
}

export interface PlacedPhoto extends Photo {
  slots: Record<ColumnCount, Slot>;
}

export interface Masonry {
  photos: PlacedPhoto[];
  /** Container height per column count, in the same units as Slot. */
  heights: Record<ColumnCount, { a: number; b: number }>;
}

// Only used to compare columns while placing; real sizes come from calc().
const NOMINAL_COLUMN = 300;
const NOMINAL_GAP = 10;

/**
 * Pinterest-style placement: each photo goes to the column that is shortest at
 * that moment, so the order (newest first) reads left to right and top to
 * bottom while portraits and landscapes keep their real proportions.
 */
export function layoutMasonry(photos: Photo[]): Masonry {
  const placed: PlacedPhoto[] = photos.map((p) => ({ ...p, slots: {} as Record<ColumnCount, Slot> }));
  const heights = {} as Masonry["heights"];

  for (const n of MASONRY_COLUMNS) {
    const cols = Array.from({ length: n }, () => ({ a: 0, b: 0 }));
    const px = (c: { a: number; b: number }) => c.a * NOMINAL_COLUMN + c.b * NOMINAL_GAP;
    for (const photo of placed) {
      let best = 0;
      for (let i = 1; i < n; i++) if (px(cols[i]) < px(cols[best])) best = i;
      const col = cols[best];
      photo.slots[n] = { column: best, a: col.a, b: col.b };
      col.a += photo.height / photo.width;
      col.b += 1;
    }
    const tallest = cols.reduce((m, c) => (px(c) > px(m) ? c : m), cols[0]);
    heights[n] = { a: tallest.a, b: Math.max(0, tallest.b - 1) };
  }

  return { photos: placed, heights };
}

export function getPhotos(): Photo[] {
  return photosData as Photo[];
}

export function photoCaption(p: Photo): string {
  const parts = [p.date ? formatMonth(p.date) : "", p.camera ?? ""].filter(Boolean);
  return parts.join(", ");
}

function formatMonth(iso: string): string {
  const d = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}
