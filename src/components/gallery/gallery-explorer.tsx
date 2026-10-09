"use client";

import * as React from "react";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  X,
  ZoomIn,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SmartImage } from "@/components/common/smart-image";
import { RevealGroup, RevealItem } from "@/components/common/reveal";
import { galleryItems } from "@/data/gallery";
import type { GalleryItem } from "@/types";
import { cn } from "cn";

const TAGS = ["All", ...Array.from(new Set(galleryItems.map((item) => item.tag)))];

interface GalleryExplorerProps {
  items: GalleryItem[];
}

/**
 * Masonry-style gallery with a custom lightbox:
 * keyboard next/prev/close, counter, zoom toggle, touch swipe.
 */
export function GalleryExplorer({ items }: GalleryExplorerProps) {
  const [activeTag, setActiveTag] = React.useState("All");
  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null);
  const [zoomed, setZoomed] = React.useState(false);

  const visible = React.useMemo(
    () => (activeTag === "All" ? items : items.filter((item) => item.tag === activeTag)),
    [activeTag, items],
  );

  const open = lightboxIndex !== null ? visible[lightboxIndex] : null;

  const close = React.useCallback(() => {
    setLightboxIndex(null);
    setZoomed(false);
  }, []);

  const step = React.useCallback(
    (direction: 1 | -1) => {
      setLightboxIndex((current) => {
        if (current === null || visible.length === 0) return current;
        return (current + direction + visible.length) % visible.length;
      });
      setZoomed(false);
    },
    [visible.length],
  );

  // Keyboard controls while lightbox is open
  React.useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
      if (event.key === "+" || event.key === "=") setZoomed(true);
      if (event.key === "-") setZoomed(false);
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, close, step]);

  // Touch swipe
  const touchStartX = React.useRef(0);
  const onTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0]?.clientX ?? 0;
  };
  const onTouchEnd = (event: React.TouchEvent) => {
    const endX = event.changedTouches[0]?.clientX ?? 0;
    const delta = endX - touchStartX.current;
    if (Math.abs(delta) > 50) step(delta < 0 ? 1 : -1);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Tag filter */}
      <div
        role="group"
        aria-label="Filter gallery"
        className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0"
      >
        {TAGS.map((tag) => {
          const active = activeTag === tag;
          return (
            <button
              key={tag}
              type="button"
              aria-pressed={active}
              onClick={() => setActiveTag(tag)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-xs font-semibold tracking-[0.14em] uppercase transition-all",
                active
                  ? "border-gold bg-gold text-brown-deep shadow-[0_10px_24px_-12px_rgba(212,175,55,0.9)]"
                  : "border-border bg-background text-muted-foreground hover:border-gold/60 hover:text-gold-deep dark:hover:text-gold",
              )}
            >
              {tag}
            </button>
          );
        })}
      </div>

      {/* Masonry columns */}
      {visible.length > 0 ? (
        <RevealGroup
          key={activeTag}
          className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5"
          stagger={0.05}
        >
          {visible.map((item, index) => (
            <RevealItem key={item.id} className="break-inside-avoid">
              <button
                type="button"
                onClick={() => {
                  setLightboxIndex(index);
                  setZoomed(false);
                }}
                aria-label={`Open image: ${item.alt}`}
                className={cn(
                  "group relative block w-full overflow-hidden rounded-2xl border border-border bg-card text-left transition-all duration-500 hover:-translate-y-1 hover:border-gold/60 hover:shadow-[0_28px_56px_-28px_rgba(212,175,55,0.7)] focus-visible:ring-3 focus-visible:ring-gold/50 focus-visible:outline-none",
                  item.aspect,
                )}
              >
                <SmartImage
                  src={item.image}
                  alt={item.alt}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  fallbackKind="cake"
                  fallbackLabel={item.tag}
                  className="transition-transform duration-700 group-hover:scale-105"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-brown-deep/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                <span className="absolute bottom-3 left-3 flex translate-y-2 items-center gap-2 rounded-full bg-black/55 px-3 py-1.5 text-[0.64rem] font-semibold tracking-[0.14em] text-cream uppercase opacity-0 backdrop-blur transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <Maximize2 className="size-3.5" />
                  View
                </span>
                <span className="absolute top-3 left-3 rounded-full bg-gold/90 px-2.5 py-1 text-[0.6rem] font-bold tracking-[0.14em] text-brown-deep uppercase">
                  {item.tag}
                </span>
              </button>
            </RevealItem>
          ))}
        </RevealGroup>
      ) : (
        <div className="rounded-3xl border border-dashed border-border bg-card px-6 py-16 text-center text-muted-foreground">
          No images in this category yet.
        </div>
      )}

      {/* Sample note */}
      <p className="text-center text-xs text-muted-foreground">
        Sample gallery — replace with the bakery&apos;s real work in{" "}
        <code className="rounded bg-gold/15 px-1.5 py-0.5 text-[0.7rem] text-gold-deep dark:text-gold">
          /public/images/gallery/
        </code>
      </p>

      {/* Lightbox */}
      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Image viewer: ${open.alt}`}
          className="fixed inset-0 z-[120] flex flex-col bg-black/92 backdrop-blur-sm"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6">
            <p className="text-sm font-medium text-cream/85 tabular-nums">
              {(lightboxIndex ?? 0) + 1} / {visible.length}
            </p>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={zoomed ? "Zoom out" : "Zoom in"}
                onClick={() => setZoomed((value) => !value)}
                className="text-cream hover:bg-white/10 hover:text-gold"
              >
                {zoomed ? <Minimize2 /> : <ZoomIn />}
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Close viewer"
                onClick={close}
                className="text-cream hover:bg-white/10 hover:text-gold"
              >
                <X />
              </Button>
            </div>
          </div>

          {/* Image area */}
          <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden px-2 sm:px-16">
            <button
              type="button"
              aria-label="Previous image"
              onClick={() => step(-1)}
              className="absolute left-1 z-10 flex size-11 items-center justify-center rounded-full border border-gold/40 bg-black/60 text-cream transition-all hover:border-gold hover:bg-gold hover:text-brown-deep sm:left-4"
            >
              <ChevronLeft className="size-5" />
            </button>

            <div
              className={cn(
                "relative h-[64vh] w-[92vw] max-w-5xl transition-transform duration-300 sm:h-[70vh]",
                zoomed ? "scale-150 cursor-zoom-out" : "cursor-zoom-in",
              )}
              onClick={() => setZoomed((value) => !value)}
            >
              <SmartImage
                src={open.image}
                alt={open.alt}
                sizes="100vw"
                fallbackKind="cake"
                fallbackLabel={open.tag}
                className="object-contain"
              />
            </div>

            <button
              type="button"
              aria-label="Next image"
              onClick={() => step(1)}
              className="absolute right-1 z-10 flex size-11 items-center justify-center rounded-full border border-gold/40 bg-black/60 text-cream transition-all hover:border-gold hover:bg-gold hover:text-brown-deep sm:right-4"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>

          {/* Caption */}
          <div className="px-6 py-5 text-center">
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-cream/75">
              {open.alt}
            </p>
            <p className="mt-1.5 text-[0.62rem] tracking-[0.22em] text-gold/70 uppercase">
              {open.tag} · Swipe or use arrow keys to browse
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
