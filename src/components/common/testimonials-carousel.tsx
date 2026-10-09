"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Stars } from "@/components/common/stars";
import { testimonials } from "@/data/testimonials";
import { defer } from "@/lib/defer";
import { cn } from "cn";

interface TestimonialsCarouselProps {
  autoPlay?: boolean;
  /** Dark sections use a translucent card treatment. */
  tone?: "light" | "dark";
  className?: string;
}

/** Embla-driven testimonial carousel: prev/next, dots, autoplay, swipe. */
export function TestimonialsCarousel({
  autoPlay = true,
  tone = "light",
  className,
}: TestimonialsCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: false,
  });
  const [selected, setSelected] = React.useState(0);
  const [snaps, setSnaps] = React.useState<number[]>([]);
  const paused = React.useRef(false);

  React.useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    const sync = () => {
      setSnaps(emblaApi.scrollSnapList());
      onSelect();
    };
    defer(sync);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", sync);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", sync);
    };
  }, [emblaApi]);

  React.useEffect(() => {
    if (!autoPlay || !emblaApi) return;
    const interval = window.setInterval(() => {
      if (!paused.current && emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else if (!paused.current) {
        emblaApi.scrollTo(0);
      }
    }, 4500);
    return () => window.clearInterval(interval);
  }, [autoPlay, emblaApi]);

  const scrollTo = (index: number) => emblaApi?.scrollTo(index);

  const isDark = tone === "dark";

  return (
    <div
      className={cn("relative", className)}
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      onFocus={() => (paused.current = true)}
      onBlur={() => (paused.current = false)}
    >
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y gap-4">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="min-w-0 flex-[0_0_86%] sm:flex-[0_0_55%] lg:flex-[0_0_36%]"
            >
              <figure
                className={cn(
                  "flex h-full flex-col gap-4 rounded-2xl border p-6 transition-colors sm:p-7",
                  isDark
                    ? "border-gold/25 bg-black/25"
                    : "border-border bg-card hover:border-gold/50",
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <Stars rating={testimonial.rating} size="md" />
                  <Quote
                    className={cn(
                      "size-7",
                      isDark ? "text-gold/40" : "text-gold/35",
                    )}
                  />
                </div>

                <blockquote
                  className={cn(
                    "flex-1 text-sm leading-relaxed",
                    isDark ? "text-cream/80" : "text-muted-foreground",
                  )}
                >
                  “{testimonial.review}”
                </blockquote>

                <figcaption className="flex items-center gap-3 border-t pt-4 dark:border-border">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-gold/50 bg-gold/15 font-heading font-semibold text-gold-deep dark:text-gold">
                    {testimonial.initials}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span
                      className={cn(
                        "block truncate text-sm font-semibold",
                        isDark ? "text-cream" : "text-foreground",
                      )}
                    >
                      {testimonial.name}
                    </span>
                    <span
                      className={cn(
                        "block truncate text-xs",
                        isDark ? "text-cream/55" : "text-muted-foreground",
                      )}
                    >
                      {testimonial.location}
                    </span>
                  </span>
                  {testimonial.sample ? (
                    <span className="shrink-0 rounded-full border border-gold/40 px-2 py-0.5 text-[0.56rem] font-semibold tracking-[0.14em] text-gold uppercase">
                      Sample
                    </span>
                  ) : null}
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-7 flex items-center justify-center gap-4">
        <button
          type="button"
          aria-label="Previous review"
          onClick={() => emblaApi?.scrollPrev()}
          className={cn(
            "flex size-10 items-center justify-center rounded-full border transition-colors",
            isDark
              ? "border-gold/40 text-gold hover:bg-gold hover:text-brown-deep"
              : "border-gold/50 text-gold-deep hover:bg-gold hover:text-brown-deep dark:text-gold",
          )}
        >
          <ChevronLeft className="size-5" />
        </button>

        <div className="flex items-center gap-2">
          {snaps.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to review ${index + 1}`}
              onClick={() => scrollTo(index)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                index === selected ? "w-7 bg-gold" : "w-2 bg-gold/30 hover:bg-gold/60",
              )}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label="Next review"
          onClick={() => emblaApi?.scrollNext()}
          className={cn(
            "flex size-10 items-center justify-center rounded-full border transition-colors",
            isDark
              ? "border-gold/40 text-gold hover:bg-gold hover:text-brown-deep"
              : "border-gold/50 text-gold-deep hover:bg-gold hover:text-brown-deep dark:text-gold",
          )}
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
    </div>
  );
}
