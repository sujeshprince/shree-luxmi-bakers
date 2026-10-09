import { siteConfig } from "@/config/site";

const formatter = new Intl.NumberFormat(siteConfig.locale, {
  style: "currency",
  currency: siteConfig.currency,
  maximumFractionDigits: 0,
});

/** ₹699 — Indian digit grouping. */
export function formatPrice(value: number): string {
  return formatter.format(Math.round(value));
}

/** Compact count for stats: 15200 → "15K+" */
export function formatCount(value: number): string {
  if (value >= 1000) {
    const k = value / 1000;
    return `${k >= 100 ? Math.round(k) : Math.round(k * 10) / 10}K`;
  }
  return `${value}`;
}

export function cnJoin(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}
