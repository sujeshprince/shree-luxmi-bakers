/**
 * ─────────────────────────────────────────────────────────────
 *  SHREE LUXMI BAKERS & SWEETS — SITE CONFIGURATION
 *  Single source of truth for all business information.
 *  Edit this file to update phone, WhatsApp, email, hours, etc.
 *
 *  NOTE: Phone / WhatsApp / Email / social values below are
 *  intentionally BLANK placeholders — no numbers or accounts
 *  have been invented. Fill them in and every button on the
 *  site activates automatically.
 * ─────────────────────────────────────────────────────────────
 */

export type OpeningHour = {
  /** 0 = Sunday … 6 = Saturday (JS getDay() convention) */
  day: number;
  label: string;
  /** 24h "HH:MM" in Asia/Kolkata time, or null when closed */
  open: string | null;
  close: string | null;
};

export const siteConfig = {
  name: "Shree Luxmi Bakers & Sweets",
  shortName: "Shree Luxmi",
  tagline: "Premium Cakes • Delicious Bakery • Traditional Indian Sweets",
  description:
    "Premium cakes, freshly baked goods and traditional Indian sweets in Gorakhpur. Custom birthday & wedding cakes, fresh mithai, patties, pastries and gift hampers from Shastri Chowk Chauraha, Bilandpur.",

  /** Physical address (as supplied by the store) */
  address: {
    line1: "Shastri Chowk Chauraha",
    line2: "Near BSNL Office",
    locality: "Bilandpur",
    city: "Gorakhpur",
    state: "Uttar Pradesh",
    pincode: "273001",
    country: "India",
  },

  /**
   * Placeholders — replace with the real numbers.
   * Example format: "+919876543210" (country code, digits only)
   */
  phone: "",
  whatsapp: "",

  /** Placeholder — e.g. "hello@shreeluxmibakers.in" */
  email: "",

  /** Optional custom Google Maps embed URL. Leave "" to auto-generate from the address. */
  googleMapsEmbedUrl: "",
  /** Optional custom Google Maps place link. Leave "" to auto-generate from the address. */
  googleMapsPlaceUrl: "",

  /** Placeholder social links — leave "" to hide the icon. */
  socials: {
    instagram: "",
    facebook: "",
  },

  /**
   * Opening hours. `open`/`close` are 24h strings in IST.
   * Set both to null for a closed day.
   * (Sample hours — confirm with the store.)
   */
  hours: [
    { day: 0, label: "Sunday", open: "09:00", close: "21:30" },
    { day: 1, label: "Monday", open: "09:00", close: "21:30" },
    { day: 2, label: "Tuesday", open: "09:00", close: "21:30" },
    { day: 3, label: "Wednesday", open: "09:00", close: "21:30" },
    { day: 4, label: "Thursday", open: "09:00", close: "21:30" },
    { day: 5, label: "Friday", open: "09:00", close: "21:30" },
    { day: 6, label: "Saturday", open: "09:00", close: "22:00" },
  ] satisfies OpeningHour[],

  /** IST timezone used for "OPEN NOW" + countdowns (India has no DST, +05:30 fixed). */
  timezone: "Asia/Kolkata",
  utcOffsetMinutes: 330,

  currency: "INR",
  locale: "en-IN",

  /**
   * Delivery — sample configuration, confirm with the store.
   * Set fee to 0 for free delivery.
   */
  delivery: {
    fee: 40,
    freeAbove: 999,
    note: "Local delivery in Gorakhpur",
  },

  /**
   * Optional endpoint that receives contact / cake / newsletter
   * submissions (e.g. a Formspree or custom API URL).
   * Leave "" to run in demo mode — forms still validate fully and
   * offer a genuine WhatsApp hand-off instead of pretending to send.
   */
  formEndpoint: "",

  /**
   * Absolute URL used for canonical / OpenGraph / sitemap.
   *
   * Resolution order:
   *   1. NEXT_PUBLIC_SITE_URL  — set this to your custom domain.
   *   2. Vercel's auto-injected host (production, then preview).
   *   3. http://localhost:3000 — local development fallback.
   */
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000"),
} as const;

export type SiteConfig = typeof siteConfig;

/** Full address as one line (for schema, maps, copy buttons). */
export const fullAddress = [
  siteConfig.address.line1,
  siteConfig.address.line2,
  siteConfig.address.locality,
  siteConfig.address.city,
  siteConfig.address.state,
  siteConfig.address.pincode,
  siteConfig.address.country,
]
  .filter(Boolean)
  .join(", ");

export const isPhoneConfigured = siteConfig.phone.trim().length > 0;
export const isWhatsAppConfigured = siteConfig.whatsapp.trim().length > 0;
export const isEmailConfigured = siteConfig.email.trim().length > 0;
export const hasSocials =
  siteConfig.socials.instagram.trim().length > 0 ||
  siteConfig.socials.facebook.trim().length > 0;
