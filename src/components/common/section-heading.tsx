import * as React from "react";
import { cn } from "cn";
import { Reveal } from "@/components/common/reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "center";
  /** "dark" = for gold/brown sections, "light" = default cream backgrounds. */
  tone?: "light" | "dark";
  className?: string;
}

/** Editorial section header: gold eyebrow, Playfair headline, muted subtitle. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  tone = "light",
  className,
}: SectionHeadingProps) {
  const isCenter = align === "center";
  const isDark = tone === "dark";

  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        isCenter && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <span
          className={cn(
            "inline-flex items-center gap-3 text-xs font-semibold tracking-[0.32em] uppercase",
            isDark ? "text-gold-light" : "text-gold-deep",
          )}
        >
          <span
            className={cn(
              "h-px w-8",
              isDark ? "bg-gold/60" : "bg-gold/70",
              isCenter && "hidden",
            )}
            aria-hidden
          />
          {eyebrow}
          <span
            aria-hidden
            className={cn("h-px w-8", isDark ? "bg-gold/60" : "bg-gold/70")}
          />
        </span>
      ) : null}

      <h2
        className={cn(
          "text-balance text-4xl leading-[1.08] font-semibold sm:text-5xl lg:text-[3.4rem]",
          isDark ? "text-cream" : "text-brown dark:text-cream",
        )}
      >
        {title}
      </h2>

      {subtitle ? (
        <p
          className={cn(
            "max-w-2xl text-base leading-relaxed sm:text-lg",
            isDark ? "text-cream/70" : "text-muted-foreground",
            isCenter && "mx-auto",
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </Reveal>
  );
}
