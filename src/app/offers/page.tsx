import type { Metadata } from "next";
import { PageHero } from "@/components/common/page-hero";
import { SectionHeading } from "@/components/common/section-heading";
import { OffersBoard } from "@/components/offers/offers-board";

export const metadata: Metadata = {
  title: "Offers & Deals — Seasonal Savings",
  description:
    "Current offers at Shree Luxmi Bakers & Sweets, Gorakhpur: birthday deals, festival combos, wedding packages, gift hampers and weekend specials with promo codes.",
  alternates: { canonical: "/offers" },
  keywords: [
    "bakery offers Gorakhpur",
    "cake discount Gorakhpur",
    "Shree Luxmi Bakers offers",
    "festive offers bakery Bilandpur",
  ],
};

const terms = [
  "Offers are valid until the countdown ends — codes refresh weekly.",
  "One code applies per order unless stated otherwise.",
  "Mention the promo code on WhatsApp or at the counter when ordering.",
  "Offers cannot be combined with other running promotions unless confirmed by the bakery.",
  "Sample codes are shown on this site — the bakery confirms the live offer when you order.",
];

export default function OffersPage() {
  return (
    <>
      <PageHero
        eyebrow="Offers"
        title={
          <>
            Save Something <span className="gold-text">Sweet</span>
          </>
        }
        subtitle="Live deals on cakes, hampers and party orders — copy the code, mention it while ordering."
        crumbs={[{ label: "Offers" }]}
      />

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <OffersBoard />
        </div>
      </section>

      <section className="border-t border-border bg-cream py-14 dark:bg-surface-cream sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Fine Print"
            title="Offer Terms"
            subtitle="Fair and simple — here is how the promotions work."
          />
          <ul className="mt-9 flex flex-col gap-3">
            {terms.map((term, index) => (
              <li
                key={term}
                className="flex items-start gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm text-muted-foreground"
              >
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-gold/15 font-heading text-xs font-semibold text-gold-deep dark:text-gold">
                  {index + 1}
                </span>
                {term}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
