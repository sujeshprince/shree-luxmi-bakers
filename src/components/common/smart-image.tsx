"use client";

import * as React from "react";
import Image from "next/image";
import { Cake, Candy, Croissant, Gift, ImageIcon } from "lucide-react";
import { cn } from "cn";

type FallbackKind = "cake" | "sweets" | "bakery" | "gift" | "gallery";

const ICONS: Record<FallbackKind, React.ComponentType<{ className?: string }>> = {
  cake: Cake,
  sweets: Candy,
  bakery: Croissant,
  gift: Gift,
  gallery: ImageIcon,
};

interface SmartImageProps {
  /** Path under /public. When missing or broken an elegant brand fallback shows. */
  src?: string;
  alt: string;
  /** Tailwind classes for the <img> itself. */
  className?: string;
  /** Classes for the positioning wrapper. */
  wrapperClassName?: string;
  sizes: string;
  /** Use "eager" + fetchPriority "high" only for above-the-fold heroes. */
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
  fallbackKind?: FallbackKind;
  fallbackLabel?: string;
}

/**
 * next/image wrapper that degrades gracefully:
 * photo present → optimized photo, otherwise → designed brand surface.
 * The site never shows a broken image icon.
 */
export function SmartImage({
  src,
  alt,
  className,
  wrapperClassName,
  sizes,
  loading = "lazy",
  fetchPriority,
  fallbackKind = "gallery",
  fallbackLabel,
}: SmartImageProps) {
  const [failed, setFailed] = React.useState(false);
  const showFallback = !src || failed;
  const Icon = ICONS[fallbackKind];

  return (
    <span
      className={cn(
        "absolute inset-0 overflow-hidden bg-muted",
        wrapperClassName,
      )}
    >
      {showFallback ? (
        <span
          aria-label={alt}
          role="img"
          className="gradient-brown surface-lattice flex h-full w-full flex-col items-center justify-center gap-3 text-center"
        >
          <span className="rounded-full border border-gold/40 bg-black/25 p-3">
            <Icon className="size-6 text-gold sm:size-7" />
          </span>
          {fallbackLabel ? (
            <span className="max-w-[80%] font-heading text-xs tracking-wide text-cream/70 sm:text-sm">
              {fallbackLabel}
            </span>
          ) : null}
        </span>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          loading={loading}
          fetchPriority={fetchPriority}
          className={cn("object-cover", className)}
          onError={() => setFailed(true)}
        />
      )}
    </span>
  );
}
