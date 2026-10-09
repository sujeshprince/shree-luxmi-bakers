"use client";

import Link from "next/link";
import { MessageCircle, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { OpeningHoursCard } from "@/components/common/opening-hours";
import { fullAddress, isPhoneConfigured, siteConfig } from "@/config/site";
import {
  DEFAULT_WHATSAPP_MESSAGE,
  directionsHref,
  mapEmbedHref,
  telHref,
  whatsappHref,
} from "@/lib/links";

/** Store visit band: keyless Google Maps embed, address and live hours. */
export function VisitUs() {
  return (
    <section className="bg-cream py-20 dark:bg-surface-cream sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Visit Us"
          title="Your Neighbourhood Bakery"
          subtitle="Pop in for fresh bakes, pick up mithai, or plan your next celebration with us."
        />

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-2">
          {/* Map */}
          <Reveal y={36}>
            <div className="overflow-hidden rounded-3xl border border-gold/30 bg-card shadow-lg">
              <iframe
                title={`Map showing ${siteConfig.name} on ${fullAddress}`}
                src={mapEmbedHref()}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-72 w-full border-0 sm:h-80 lg:h-96"
              />
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border p-5">
                <p className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
                  <span>
                    {siteConfig.address.line1}, {siteConfig.address.line2},{" "}
                    {siteConfig.address.locality}, {siteConfig.address.city} —{" "}
                    {siteConfig.address.pincode}
                  </span>
                </p>
                <Button asChild variant="goldOutline" size="lg">
                  <a
                    href={directionsHref()}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get Directions
                  </a>
                </Button>
              </div>
            </div>
          </Reveal>

          {/* Hours + quick contact */}
          <div className="flex flex-col gap-5">
            <Reveal delay={0.1}>
              <OpeningHoursCard />
            </Reveal>

            <Reveal delay={0.2}>
              <div className="grid gap-3 sm:grid-cols-2">
                <Button asChild variant="gold" size="xl">
                  <a
                    href={whatsappHref(DEFAULT_WHATSAPP_MESSAGE)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="size-5" />
                    WhatsApp Us
                  </a>
                </Button>
                <Button
                  asChild
                  variant={isPhoneConfigured ? "goldOutline" : "outline"}
                  size="xl"
                >
                  <a href={telHref()}>
                    <Phone className="size-5" />
                    {isPhoneConfigured ? "Call Now" : "Contact Page"}
                  </a>
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="rounded-2xl border border-border bg-card p-5 text-sm leading-relaxed text-muted-foreground">
                Looking for something specific?{" "}
                <Link
                  href="/menu"
                  className="font-medium text-gold-deep underline underline-offset-4 dark:text-gold"
                >
                  Browse the full menu
                </Link>{" "}
                or{" "}
                <Link
                  href="/cakes"
                  className="font-medium text-gold-deep underline underline-offset-4 dark:text-gold"
                >
                  order a custom cake
                </Link>
                .
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
