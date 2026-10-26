"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { X } from "@phosphor-icons/react";
import type { Masonry, PlacedPhoto } from "@/lib/photos";
import { photoCaption } from "@/lib/photos";

/*
 * Pinterest-style grid + full-screen viewer.
 *
 * Layout: positions come from layoutMasonry() on the server and are resolved
 * by CSS (container units + calc), so there is no layout shift and no JS needed
 * to place the photos. See .masonry in app/globals.css.
 *
 * Viewer (apple-design): it grows out of the thumbnail and goes back into it
 * (shared layout), with a critically damped spring (no bounce). Drag down to
 * close; a flick closes even if the drag was short, because the release
 * velocity decides. Arrows move between photos, Esc closes. With reduced
 * motion it just cross-fades.
 */

const SPRING = { type: "spring", bounce: 0, duration: 0.4 } as const;
const CLOSE_DISTANCE = 120; // px
const CLOSE_VELOCITY = 600; // px/s

export function PhotoGrid({ masonry }: { masonry: Masonry }) {
  const { photos, heights } = masonry;
  const [open, setOpen] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();
  const tileRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const lastOpened = useRef<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (d: number) => setOpen((i) => (i === null ? i : (i + d + photos.length) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    if (open === null) {
      // Give focus back to the photo that was opened.
      if (lastOpened.current !== null) tileRefs.current[lastOpened.current]?.focus();
      return;
    }
    lastOpened.current = open;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, step]);

  const vars: Record<string, string | number> = {};
  for (const n of [2, 3, 4] as const) {
    vars[`--ha${n}`] = heights[n].a;
    vars[`--hb${n}`] = heights[n].b;
  }

  return (
    <LayoutGroup>
      <div className="masonry-wrap">
        <div className="masonry" style={vars as React.CSSProperties}>
          {photos.map((p, i) => (
            <Tile
              key={p.src}
              photo={p}
              index={i}
              hidden={open === i}
              layout={!reduceMotion}
              onOpen={() => setOpen(i)}
              refCallback={(el) => { tileRefs.current[i] = el; }}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open !== null && (
          <Viewer
            key="viewer"
            photo={photos[open]}
            index={open}
            total={photos.length}
            layout={!reduceMotion}
            onClose={close}
            onStep={step}
          />
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
}

function Tile({
  photo,
  index,
  hidden,
  layout,
  onOpen,
  refCallback,
}: {
  photo: PlacedPhoto;
  index: number;
  hidden: boolean;
  layout: boolean;
  onOpen: () => void;
  refCallback: (el: HTMLButtonElement | null) => void;
}) {
  const style: Record<string, string | number> = { aspectRatio: `${photo.width} / ${photo.height}` };
  for (const n of [2, 3, 4] as const) {
    style[`--c${n}`] = photo.slots[n].column;
    style[`--a${n}`] = photo.slots[n].a;
    style[`--b${n}`] = photo.slots[n].b;
  }
  const caption = photoCaption(photo);

  return (
    <button
      ref={refCallback}
      type="button"
      onClick={onOpen}
      className="tile press group block overflow-hidden rounded-[4px] bg-hover text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink"
      style={style as React.CSSProperties}
      aria-label={`Open photo ${index + 1}${photo.alt ? `: ${photo.alt}` : ""}`}
    >
      <motion.div
        layoutId={layout ? `photo-${photo.src}` : undefined}
        transition={SPRING}
        className="relative h-full w-full"
        style={{ opacity: hidden ? 0 : 1 }}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover"
        />
        {caption && (
          <span className="pointer-events-none absolute inset-x-0 bottom-0 p-2.5 text-[12px] text-paper opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100 bg-gradient-to-t from-ink/60 to-transparent">
            {caption}
          </span>
        )}
      </motion.div>
    </button>
  );
}

function Viewer({
  photo,
  index,
  total,
  layout,
  onClose,
  onStep,
}: {
  photo: PlacedPhoto;
  index: number;
  total: number;
  layout: boolean;
  onClose: () => void;
  onStep: (d: number) => void;
}) {
  const y = useMotionValue(0);
  const backdrop = useTransform(y, [-300, 0, 300], [0.4, 1, 0.4]);
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => { closeRef.current?.focus(); }, []);

  const caption = photoCaption(photo);
  const settings = [photo.lens, photo.aperture, photo.shutter, photo.iso ? `ISO ${photo.iso}` : ""].filter(Boolean).join(" · ");
  const ratio = photo.width / photo.height;

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={photo.alt || `Photo ${index + 1} of ${total}`}
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center p-4 md:p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-paper"
        style={{ opacity: backdrop }}
        onClick={onClose}
      />

      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="press absolute right-4 top-4 md:right-8 md:top-8 z-10 grid h-10 w-10 place-items-center rounded-full text-ink hover:bg-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-ink"
      >
        <X size={20} />
      </button>

      <motion.div
        className="relative w-full touch-none"
        style={{ y, maxWidth: `min(100%, calc((100dvh - 8rem) * ${ratio}))` }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.6}
        onDragEnd={(_, info) => {
          if (Math.abs(info.offset.y) > CLOSE_DISTANCE || Math.abs(info.velocity.y) > CLOSE_VELOCITY) onClose();
        }}
      >
        <motion.div
          layoutId={layout ? `photo-${photo.src}` : undefined}
          transition={SPRING}
          className="relative w-full overflow-hidden rounded-[4px]"
          style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
        >
          <Image src={photo.src} alt={photo.alt} fill sizes="100vw" className="object-contain" priority />
        </motion.div>
      </motion.div>

      <div className="relative mt-4 flex w-full max-w-[720px] items-center justify-between gap-6 text-[13px] text-muted">
        <p>
          {photo.title && <span className="text-ink">{photo.title}. </span>}
          {caption}
          {settings && <span className="block md:inline md:ml-2">{settings}</span>}
        </p>
        <div className="flex shrink-0 items-center gap-1">
          <button type="button" onClick={() => onStep(-1)} className="press rounded px-2 py-1 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-ink" aria-label="Previous photo">prev</button>
          <span aria-hidden>{index + 1}/{total}</span>
          <button type="button" onClick={() => onStep(1)} className="press rounded px-2 py-1 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-ink" aria-label="Next photo">next</button>
        </div>
      </div>
    </motion.div>
  );
}
