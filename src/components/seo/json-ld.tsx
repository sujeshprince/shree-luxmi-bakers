import { hasSocials, isPhoneConfigured, siteConfig } from "@/config/site";

/** Schema.org structured data for the bakery (LocalBusiness subtype). */
export function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Bakery",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.siteUrl,
    image: `${siteConfig.siteUrl}/opengraph-image`,
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: `${siteConfig.address.line1}, ${siteConfig.address.line2}, ${siteConfig.address.locality}`,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.pincode,
      addressCountry: "IN",
    },
    ...(isPhoneConfigured ? { telephone: siteConfig.phone } : {}),
    ...(hasSocials
      ? {
          sameAs: [
            siteConfig.socials.instagram,
            siteConfig.socials.facebook,
          ].filter(Boolean),
        }
      : {}),
    openingHoursSpecification: siteConfig.hours
      .filter((h) => h.open != null && h.close != null)
      .map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: h.label,
        opens: `${h.open}:00`,
        closes: `${h.close}:00`,
      })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}

