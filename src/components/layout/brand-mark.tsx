import { Cake } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "cn";

/**
 * Brand mark: gold monogram + Playfair wordmark.
 * Pure presentational — usable from both server and client components.
 * (Optional photo logo: drop /images/brand/logo.png in and swap this file.)
 */
export function BrandMark({
  tone = "dark",
  className,
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <span className="flex size-9 items-center justify-center rounded-full border border-gold/60 bg-gold/10">
        <Cake className="size-4.5 text-gold" />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-heading text-lg font-semibold tracking-wide sm:text-xl",
            tone === "light" ? "text-cream" : "text-brown dark:text-cream",
          )}
        >
          {siteConfig.shortName}
        </span>
        <span className="mt-1 text-[0.58rem] font-medium tracking-[0.34em] text-gold uppercase">
          Bakers &amp; Sweets
        </span>
      </span>
    </span>
  );
}
