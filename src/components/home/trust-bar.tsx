"use client";

import {
  Cake,
  Cookie,
  Star,
  Truck,
  type LucideIcon,
  UtensilsCrossed,
} from "lucide-react";
import { Counter } from "@/components/common/counter";
import { Reveal } from "@/components/common/reveal";

interface TrustItem {
  icon: LucideIcon;
  label: string;
  note: string;
  counter?: { value: number; decimals?: number; suffix?: string };
}

const ITEMS: TrustItem[] = [
  {
    icon: Star,
    label: "Customer Rating",
    note: "Sample rating, pending store data",
    counter: { value: 4.8, decimals: 1, suffix: "+" },
  },
  { icon: Cake, label: "Custom Cakes", note: "Designed for your day" },
  { icon: Cookie, label: "Fresh Indian Sweets", note: "Made every morning" },
  { icon: UtensilsCrossed, label: "Freshly Baked Daily", note: "No stale shelves" },
  { icon: Truck, label: "Local Delivery", note: "Across Gorakhpur" },
];

/** Instant credibility strip directly beneath the hero. */
export function TrustBar() {
  return (
    <section
      id="trust"
      aria-label="Why customers trust us"
      className="relative z-20 border-y border-gold/25 bg-cream dark:bg-surface-cream"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 gap-y-6 px-4 py-7 sm:px-6 md:grid-cols-3 lg:grid-cols-5 lg:px-8">
        {ITEMS.map((item, index) => (
          <Reveal
            key={item.label}
            delay={index * 0.07}
            className="flex items-center gap-3"
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-gold/45 bg-gold/10">
              <item.icon className="size-5 text-gold-deep dark:text-gold" />
            </span>
            <div className="min-w-0">
              <p className="font-heading text-base leading-tight font-semibold text-brown dark:text-cream sm:text-lg">
                {item.counter ? (
                  <>
                    <Counter
                      value={item.counter.value}
                      decimals={item.counter.decimals}
                      suffix={item.counter.suffix}
                    />{" "}
                    {item.label}
                  </>
                ) : (
                  item.label
                )}
              </p>
              <p className="truncate text-xs text-muted-foreground">{item.note}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
