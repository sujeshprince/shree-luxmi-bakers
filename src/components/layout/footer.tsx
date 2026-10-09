import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/common/social-icons";
import { BrandMark } from "@/components/layout/brand-mark";
import { NewsletterForm } from "@/components/layout/newsletter-form";
import { NAV_ITEMS } from "@/lib/navigation";
import { directionsHref, telHref, whatsappHref } from "@/lib/links";
import { formatClock } from "@/lib/time";
import {
  CATEGORY_LABELS,
  PRODUCT_CATEGORIES,
} from "@/types";
import {
  fullAddress,
  hasSocials,
  isEmailConfigured,
  isPhoneConfigured,
  siteConfig,
} from "@/config/site";

/** Monday-first hour listing for the footer. */
const orderedHours = [...siteConfig.hours].sort(
  (a, b) => ((a.day + 6) % 7) - ((b.day + 6) % 7),
);

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-4 text-[0.68rem] font-semibold tracking-[0.28em] text-gold uppercase">
      {children}
    </h3>
  );
}

export async function Footer() {
  // Cached so the build-time year stays stable across prerender passes
  // (Next 16 forbids reading the current time during static prerendering).
  "use cache";
  const year = new Date().getFullYear();

  return (
    <footer className="relative gradient-brown surface-lattice border-t border-gold/25 text-cream">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-28 sm:px-6 md:pb-10 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand + newsletter */}
          <div className="lg:col-span-4">
            <BrandMark tone="light" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/65">
              Premium cakes, fresh bakery favourites and traditional Indian sweets —
              crafted daily at Shastri Chowk Chauraha, Bilandpur, Gorakhpur.
            </p>

            <div className="mt-6">
              <ColumnHeading>Newsletter</ColumnHeading>
              <NewsletterForm />
            </div>

            {hasSocials ? (
              <div className="mt-6 flex items-center gap-3">
                {siteConfig.socials.instagram ? (
                  <a
                    href={siteConfig.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="flex size-10 items-center justify-center rounded-full border border-gold/40 text-gold transition-all hover:bg-gold hover:text-brown-deep"
                  >
                    <InstagramIcon className="size-4.5" />
                  </a>
                ) : null}
                {siteConfig.socials.facebook ? (
                  <a
                    href={siteConfig.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="flex size-10 items-center justify-center rounded-full border border-gold/40 text-gold transition-all hover:bg-gold hover:text-brown-deep"
                  >
                    <FacebookIcon className="size-4.5" />
                  </a>
                ) : null}
              </div>
            ) : null}
          </div>

          {/* Quick links */}
          <nav aria-label="Footer quick links" className="lg:col-span-2">
            <ColumnHeading>Quick Links</ColumnHeading>
            <ul className="space-y-2.5">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-cream/70 transition-colors hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Categories */}
          <nav aria-label="Product categories" className="lg:col-span-2">
            <ColumnHeading>Categories</ColumnHeading>
            <ul className="space-y-2.5">
              {PRODUCT_CATEGORIES.map((category) => (
                <li key={category}>
                  <Link
                    href={`/menu?category=${category}`}
                    className="text-sm text-cream/70 transition-colors hover:text-gold"
                  >
                    {CATEGORY_LABELS[category]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="lg:col-span-2">
            <ColumnHeading>Contact</ColumnHeading>
            <address className="space-y-3 text-sm text-cream/70 not-italic">
              <p className="flex gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
                <span>
                  {siteConfig.address.line1}, {siteConfig.address.line2},{" "}
                  {siteConfig.address.locality}, {siteConfig.address.city},{" "}
                  {siteConfig.address.state} {siteConfig.address.pincode}
                </span>
              </p>
              {isPhoneConfigured ? (
                <p className="flex gap-2.5">
                  <Phone className="mt-0.5 size-4 shrink-0 text-gold" />
                  <a href={telHref()} className="transition-colors hover:text-gold">
                    {siteConfig.phone}
                  </a>
                </p>
              ) : null}
              {isEmailConfigured ? (
                <p className="flex gap-2.5">
                  <Mail className="mt-0.5 size-4 shrink-0 text-gold" />
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="transition-colors hover:text-gold"
                  >
                    {siteConfig.email}
                  </a>
                </p>
              ) : null}
              <div className="flex flex-wrap gap-3 pt-1">
                <a
                  href={directionsHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 px-3 py-1.5 text-xs font-medium text-gold transition-colors hover:bg-gold hover:text-brown-deep"
                >
                  Get Directions
                </a>
                <a
                  href={whatsappHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 px-3 py-1.5 text-xs font-medium text-gold transition-colors hover:bg-gold hover:text-brown-deep"
                >
                  <MessageCircle className="size-3.5" />
                  WhatsApp
                </a>
              </div>
            </address>
          </div>

          {/* Opening hours */}
          <div className="lg:col-span-2">
            <ColumnHeading>Opening Hours</ColumnHeading>
            <ul className="space-y-2 text-sm">
              {orderedHours.map((entry) => (
                <li
                  key={entry.day}
                  className="flex items-baseline justify-between gap-3 text-cream/70"
                >
                  <span>{entry.label.slice(0, 3)}</span>
                  <span className="tabular-nums text-xs">
                    {entry.open && entry.close
                      ? `${formatClock(entry.open)} – ${formatClock(entry.close)}`
                      : "Closed"}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 border-t border-gold/20 pt-6">
          <div className="flex flex-col items-center justify-between gap-3 text-center text-xs text-cream/50 sm:flex-row sm:text-left">
            <p>
              © {year} {siteConfig.name.toUpperCase()} — All Rights Reserved.
            </p>
            <p>
              Bakery in Gorakhpur · Fresh cakes, mithai &amp; snacks near Shastri Chowk
            </p>
          </div>
          <p className="mt-3 text-center text-[0.68rem] text-cream/35">
            Preview: product names, prices and customer reviews shown are sample data
            pending confirmation from the store.
            <span className="sr-only"> {fullAddress}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
