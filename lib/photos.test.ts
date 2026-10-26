import { describe, expect, it } from "vitest";
import { layoutMasonry, type Photo } from "./photos";

const photo = (w: number, h: number, i: number): Photo => ({ src: `/p${i}.webp`, width: w, height: h, alt: "" });

describe("layoutMasonry", () => {
  const photos = [photo(3, 2, 0), photo(2, 3, 1), photo(1, 1, 2), photo(3, 2, 3), photo(2, 3, 4)];
  const m = layoutMasonry(photos);

  it("starts filling left to right", () => {
    expect(m.photos.slice(0, 3).map((p) => p.slots[3].column)).toEqual([0, 1, 2]);
    expect(m.photos.slice(0, 3).every((p) => p.slots[3].a === 0 && p.slots[3].b === 0)).toBe(true);
  });
  it("puts the next photo in the shortest column", () => {
    // After the first three, the 3:2 landscape (column 0) is the shortest.
    expect(m.photos[3].slots[3]).toEqual({ column: 0, a: 2 / 3, b: 1 });
  });
  it("keeps every column count inside its columns", () => {
    for (const n of [2, 3, 4] as const) {
      expect(m.photos.every((p) => p.slots[n].column >= 0 && p.slots[n].column < n)).toBe(true);
      expect(m.heights[n].a).toBeGreaterThan(0);
    }
  });
});
