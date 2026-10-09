import type { Offer } from "@/types";

/**
 * SAMPLE OFFERS — demo data.
 * Promo codes are illustrative until the store supplies real ones.
 * The countdown ticks to a genuine timestamp (next Sunday 23:59 IST).
 */

export const offers: Offer[] = [
  {
    id: "birthday-special",
    title: "Birthday Special",
    description:
      "Any 1 kg designer cake with free candles, knife and a handwritten message card.",
    highlight: "Flat 15% Off",
    code: "BIRTHDAY15",
    featured: true,
    cta: "Claim Offer",
  },
  {
    id: "festival-offers",
    title: "Festival Offers",
    description: "Curated mithai boxes and festive combos for Diwali, Holi & Raksha Bandhan.",
    highlight: "Up to 20% Off",
    code: "FESTIVE20",
    cta: "Claim Offer",
  },
  {
    id: "wedding-packages",
    title: "Wedding Packages",
    description:
      "Dessert counters, tiered cakes and return-gift boxes for pre-wedding functions.",
    highlight: "Custom Quote",
    code: "WEDDING",
    cta: "Claim Offer",
  },
  {
    id: "gift-hampers",
    title: "Gift Hampers",
    description: "Premium hampers with sweets, cookies and chocolates — wrapped and ready.",
    highlight: "Save ₹200",
    code: "GIFT200",
    cta: "Claim Offer",
  },
  {
    id: "weekend-specials",
    title: "Weekend Specials",
    description: "Buy any 4 patties or buns and get 2 chocolate chip cookies free.",
    highlight: "Buy 4 Get 2",
    code: "WEEKEND",
    cta: "Claim Offer",
  },
];
