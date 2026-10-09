"use client";

import * as React from "react";
import { useReducedMotion } from "framer-motion";
import { defer } from "@/lib/defer";

interface CounterProps {
  /** Target value, e.g. 15 for "15K+" or 4.8 for a rating. */
  value: number;
  suffix?: string;
  /** Decimal places to animate (0 for plain integers). */
  decimals?: number;
  durationMs?: number;
  className?: string;
}

/** Animated count-up that starts when scrolled into view. */
export function Counter({
  value,
  suffix = "",
  decimals = 0,
  durationMs = 1600,
  className,
}: CounterProps) {
  const [display, setDisplay] = React.useState(0);
  const reduced = useReducedMotion();
  const ref = React.useRef<HTMLSpanElement>(null);
  const started = React.useRef(false);

  React.useEffect(() => {
    if (reduced) {
      // Defer past the effect body (react-hooks/set-state-in-effect) —
      // lands before paint, so the number still appears instantly.
      defer(() => setDisplay(value));
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || started.current) return;
        started.current = true;

        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / durationMs, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = eased * value;
          setDisplay(
            decimals > 0
              ? Number(current.toFixed(decimals))
              : Math.round(current),
          );
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [value, durationMs, reduced, decimals]);

  return (
    <span ref={ref} className={className}>
      {decimals > 0 ? display.toFixed(decimals) : display}
      {suffix}
    </span>
  );
}
