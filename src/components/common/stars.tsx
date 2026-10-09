import { Star } from "lucide-react";
import { cn } from "cn";

interface StarsProps {
  rating: number;
  className?: string;
  size?: "sm" | "md";
}

/** Gold star row reflecting the given rating (4.8 → 5 stars, last half-capable). */
export function Stars({ rating, className, size = "sm" }: StarsProps) {
  const starSize = size === "sm" ? "size-3.5" : "size-4";
  return (
    <span
      className={cn("inline-flex items-center gap-0.5", className)}
      role="img"
      aria-label={`Rated ${rating} out of 5`}
    >
      {[1, 2, 3, 4, 5].map((step) => {
        const filled = rating >= step - 0.25;
        return (
          <Star
            key={step}
            className={cn(
              starSize,
              filled ? "fill-gold text-gold" : "text-gold/35",
            )}
          />
        );
      })}
    </span>
  );
}
