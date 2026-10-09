"use client";

import * as React from "react";
import { diffTo, type Countdown } from "@/lib/time";
import { defer } from "@/lib/defer";

function compute(target: Date): Countdown {
  return diffTo(target);
}

/**
 * Deterministic placeholder used for the server render and the client's
 * first (hydration) render — identical on both sides so the ticking values
 * never cause a hydration mismatch. The real countdown is seeded right
 * after mount and then ticks every second.
 */
function emptyCountdown(): Countdown {
  return { days: 0, hours: 0, minutes: 0, seconds: 0, totalMs: 0, expired: false };
}

/**
 * Live countdown to a real timestamp. When the deadline passes it shows
 * an honest "ended" state instead of pretending an offer is still live.
 *
 * `target` may be null while the deadline is resolved on the client
 * (reading the clock during prerendering is not allowed with Cache
 * Components) — the timer renders its zero blocks until then.
 */
export function CountdownTimer({
  target,
  onExpiredLabel = "This offer has ended",
  compact = false,
}: {
  target: Date | null;
  onExpiredLabel?: string;
  compact?: boolean;
}) {
  const [countdown, setCountdown] = React.useState<Countdown>(emptyCountdown);

  React.useEffect(() => {
    if (!target) return;
    const tick = () => setCountdown(compute(target));
    defer(tick);
    const interval = window.setInterval(tick, 1000);
    return () => window.clearInterval(interval);
  }, [target]);

  if (countdown.expired) {
    return (
      <p className="text-sm font-medium tracking-wide text-cream/70" role="status">
        {onExpiredLabel}
      </p>
    );
  }

  const blocks: Array<{ label: string; value: number }> = [
    { label: "Days", value: countdown.days },
    { label: "Hours", value: countdown.hours },
    { label: "Minutes", value: countdown.minutes },
    { label: "Seconds", value: countdown.seconds },
  ];

  return (
    <div
      className="flex gap-2 sm:gap-3"
      role="timer"
      aria-label="Offer ends in"
    >
      {blocks.map((block) => (
        <div
          key={block.label}
          className={`flex flex-col items-center rounded-xl border border-gold/40 bg-black/25 backdrop-blur-sm ${
            compact ? "min-w-14 px-2.5 py-2" : "min-w-16 px-3 py-2.5 sm:min-w-20 sm:px-4 sm:py-3"
          }`}
        >
          <span
            className={`font-heading font-semibold tabular-nums text-gold ${
              compact ? "text-xl" : "text-2xl sm:text-3xl"
            }`}
          >
            {String(block.value).padStart(2, "0")}
          </span>
          <span className="mt-0.5 text-[0.58rem] font-medium tracking-[0.2em] text-cream/60 uppercase">
            {block.label}
          </span>
        </div>
      ))}
    </div>
  );
}
