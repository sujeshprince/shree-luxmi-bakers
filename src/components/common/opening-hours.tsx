"use client";

import * as React from "react";
import { Clock, MapPin } from "lucide-react";
import { directionsHref } from "@/lib/links";
import { formatClock, getOpenState, type OpenState } from "@/lib/time";
import { siteConfig } from "@/config/site";
import { defer } from "@/lib/defer";
import { cn } from "cn";

/**
 * Live opening-hours card: computes "OPEN NOW" against real IST time
 * and re-checks periodically so the badge never goes stale.
 *
 * The status starts as `null` (server + hydration render show a neutral
 * badge) and is seeded right after mount — reading the clock during
 * prerendering is not allowed with Cache Components.
 */
export function OpeningHoursCard({ className }: { className?: string }) {
  const [state, setState] = React.useState<OpenState | null>(null);

  React.useEffect(() => {
    const update = () => setState(getOpenState());
    defer(update);
    const interval = window.setInterval(update, 60_000);
    return () => window.clearInterval(interval);
  }, []);

  const today = state?.today?.day ?? -1;

  return (
    <div
      className={cn(
        "rounded-3xl border border-gold/30 bg-card p-6 shadow-lg sm:p-7",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-heading text-xl font-semibold sm:text-2xl">
            Opening Hours
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Shastri Chowk Chauraha, Bilandpur
          </p>
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[0.64rem] font-bold tracking-[0.16em] uppercase",
            state === null
              ? "border-gold/40 bg-gold/10 text-gold-deep dark:text-gold"
              : state.isOpen
                ? "border-green-600/40 bg-green-500/12 text-green-700 dark:text-green-400"
                : "border-destructive/40 bg-destructive/10 text-destructive",
          )}
          role="status"
        >
          <span
            className={cn(
              "size-1.5 rounded-full",
              state === null
                ? "bg-gold"
                : state.isOpen
                  ? "bg-green-600 dark:bg-green-400"
                  : "bg-destructive",
            )}
          />
          {state === null
            ? "Hours"
            : state.isOpen
              ? "Open Now"
              : "Closed"}
        </span>
      </div>

      <p className="mt-2 text-sm font-medium text-gold-deep dark:text-gold">
        {state?.status ?? "See this week's hours below"}
      </p>

      <ul className="mt-4 space-y-2.5">
        {[...siteConfig.hours]
          .sort((a, b) => ((a.day + 6) % 7) - ((b.day + 6) % 7))
          .map((entry) => {
            const isToday = entry.day === today;
            return (
              <li
                key={entry.day}
                className={cn(
                  "flex items-center justify-between gap-3 rounded-lg px-3 py-1.5 text-sm",
                  isToday
                    ? "bg-gold/12 font-semibold text-gold-deep dark:text-gold"
                    : "text-muted-foreground",
                )}
              >
                <span className="inline-flex items-center gap-2">
                  <Clock className="size-3.5 opacity-70" />
                  {entry.label}
                  {isToday ? (
                    <span className="text-[0.56rem] font-bold tracking-[0.16em] uppercase">
                      · Today
                    </span>
                  ) : null}
                </span>
                <span className="tabular-nums">
                  {entry.open && entry.close
                    ? `${formatClock(entry.open)} – ${formatClock(entry.close)}`
                    : "Closed"}
                </span>
              </li>
            );
          })}
      </ul>

      <a
        href={directionsHref()}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-gold-deep transition-colors hover:text-gold dark:text-gold"
      >
        <MapPin className="size-4" />
        Get directions to the store
      </a>
    </div>
  );
}
