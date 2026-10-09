"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "cn";

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
  className?: string;
  label?: string;
}

/** Accessible −/+ quantity control. */
export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  size = "md",
  className,
  label = "Quantity",
}: QuantityStepperProps) {
  const compact = size === "sm";
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-background",
        className,
      )}
      role="group"
      aria-label={label}
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
        className={cn(
          "flex items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted disabled:opacity-30",
          compact ? "size-7" : "size-9",
        )}
      >
        <Minus className={compact ? "size-3.5" : "size-4"} />
      </button>
      <span
        aria-live="polite"
        className={cn(
          "min-w-7 text-center font-medium tabular-nums",
          compact ? "text-sm" : "text-base",
        )}
      >
        {value}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
        className={cn(
          "flex items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted disabled:opacity-30",
          compact ? "size-7" : "size-9",
        )}
      >
        <Plus className={compact ? "size-3.5" : "size-4"} />
      </button>
    </div>
  );
}
