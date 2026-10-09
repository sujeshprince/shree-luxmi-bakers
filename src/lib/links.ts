import {
  fullAddress,
  isPhoneConfigured,
  isWhatsAppConfigured,
  siteConfig,
} from "@/config/site";

/** Opens WhatsApp with a pre-filled message. Works with or without a configured number. */
export function whatsappHref(message?: string): string {
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  const number = isWhatsAppConfigured
    ? siteConfig.whatsapp.replace(/[^\d]/g, "")
    : "";
  return `https://wa.me/${number}${text}`;
}

export const DEFAULT_WHATSAPP_MESSAGE =
  "Hi! I'd like to know more about your cakes and bakery products.";

/** `tel:` href when a phone number is configured, otherwise the contact page. */
export function telHref(): string {
  return isPhoneConfigured ? `tel:${siteConfig.phone.trim()}` : "/contact";
}

/** Google Maps walking/driving directions to the store (no API key required). */
export function directionsHref(): string {
  if (siteConfig.googleMapsPlaceUrl.trim()) return siteConfig.googleMapsPlaceUrl;
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(fullAddress)}`;
}

/** Keyless Google Maps embed for an iframe. */
export function mapEmbedHref(): string {
  if (siteConfig.googleMapsEmbedUrl.trim()) return siteConfig.googleMapsEmbedUrl;
  return `https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}&output=embed`;
}

/** Human-readable one-line address. */
export function addressLine(): string {
  return fullAddress;
}
