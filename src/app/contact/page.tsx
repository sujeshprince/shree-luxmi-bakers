import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/common/page-hero";
import { SectionHeading } from "@/components/common/section-heading";
import { Reveal } from "@/components/common/reveal";
import { OpeningHoursCard } from "@/components/common/opening-hours";
import { ContactForm } from "@/components/forms/contact-form";
import {
  fullAddress,
  isEmailConfigured,
  isPhoneConfigured,
  siteConfig,
} from "@/config/site";
import {
  DEFAULT_WHATSAPP_MESSAGE,
  directionsHref,
  mapEmbedHref,
  telHref,
  whatsappHref,
} from "@/lib/links";

export const metadata: Metadata = {
  title: "Contact — Visit, Call or Message Us",
  description:
    "Get in touch with Shree Luxmi Bakers & Sweets, Bilandpur, Gorakhpur. Visit the store at Shastri Chowk Chauraha, message on WhatsApp or send the contact form.",
  alternates: { canonical: "/contact" },
  keywords: [
    "contact bakery Gorakhpur",
    "Shree Luxmi Bakers contact",
    "bakery Bilandpur Gorakhpur address",
    "cake shop Gorakhpur phone",
  ],
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let&apos;s Talk <span className="gold-text">Sweets</span>
          </>
        }
        subtitle="Questions about an order, a custom cake or just what came out of the oven today? Reach us however suits you."
        crumbs={[{ label: "Contact" }]}
      />

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-8 lg:grid-cols-2">
            {/* Form */}
            <Reveal>
              <ContactForm />
            </Reveal>

            {/* Quick contact + map + hours */}
            <div className="flex flex-col gap-6">
              <Reveal delay={0.1}>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Button asChild variant="gold" size="xl" className="h-auto flex-col items-start gap-1 py-4">
                    <a
                      href={whatsappHref(DEFAULT_WHATSAPP_MESSAGE)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="flex items-center gap-2">
                        <MessageCircle className="size-5" />
                        WhatsApp
                      </span>
                      <span className="text-xs font-normal opacity-80">
                        Fastest reply during store hours
                      </span>
                    </a>
                  </Button>

                  <Button
                    asChild
                    variant={isPhoneConfigured ? "goldOutline" : "outline"}
                    size="xl"
                    className="h-auto flex-col items-start gap-1 py-4"
                  >
                    <a href={telHref()}>
                      <span className="flex items-center gap-2">
                        <Phone className="size-5" />
                        {isPhoneConfigured ? "Call Us" : "Phone"}
                      </span>
                      <span className="text-xs font-normal opacity-80">
                        {isPhoneConfigured
                          ? siteConfig.phone
                          : "Number coming soon — use WhatsApp"}
                      </span>
                    </a>
                  </Button>

                  <div className="rounded-2xl border border-border bg-card p-4">
                    <p className="flex items-center gap-2 text-sm font-semibold">
                      <MapPin className="size-4 text-gold" />
                      Address
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {siteConfig.address.line1}, {siteConfig.address.line2},{" "}
                      {siteConfig.address.locality}, {siteConfig.address.city} —{" "}
                      {siteConfig.address.pincode}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-border bg-card p-4">
                    <p className="flex items-center gap-2 text-sm font-semibold">
                      <Mail className="size-4 text-gold" />
                      Email
                    </p>
                    {isEmailConfigured ? (
                      <a
                        href={`mailto:${siteConfig.email}`}
                        className="mt-1.5 block text-sm break-all text-muted-foreground transition-colors hover:text-gold-deep dark:hover:text-gold"
                      >
                        {siteConfig.email}
                      </a>
                    ) : (
                      <p className="mt-1.5 text-sm text-muted-foreground">
                        Not listed yet — WhatsApp us instead.
                      </p>
                    )}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.18}>
                <div className="overflow-hidden rounded-3xl border border-gold/30 bg-card shadow-lg">
                  <iframe
                    title={`Map showing ${siteConfig.name} at ${fullAddress}`}
                    src={mapEmbedHref()}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-64 w-full border-0 sm:h-72"
                  />
                  <div className="flex items-center justify-between gap-3 border-t border-border p-5">
                    <p className="text-sm text-muted-foreground">
                      Shastri Chowk Chauraha, Bilandpur
                    </p>
                    <Button asChild variant="gold" size="lg">
                      <a
                        href={directionsHref()}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Directions
                      </a>
                    </Button>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.26}>
                <OpeningHoursCard />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ strip */}
      <section className="border-t border-border bg-cream py-14 dark:bg-surface-cream sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Before You Ask"
            title="Quick Answers"
            subtitle="The fastest way to reach us for each kind of question."
          />
          <div className="mt-9 grid gap-4 sm:grid-cols-3">
            {[
              {
                q: "Want to place an order?",
                a: "Add items to your cart on the Menu page, then check out — your order opens as a ready-to-send WhatsApp message.",
                href: "/menu",
                hrefLabel: "Browse the menu",
              },
              {
                q: "Planning a custom cake?",
                a: "Fill the cake enquiry with flavours, date and budget — you'll get a quote before confirming anything.",
                href: "/cakes",
                hrefLabel: "Start a cake enquiry",
              },
              {
                q: "Just have a question?",
                a: "Message us on WhatsApp or drop a note through the contact form — we reply during store hours.",
                href: whatsappHref(DEFAULT_WHATSAPP_MESSAGE),
                hrefLabel: "Open WhatsApp",
              },
            ].map((item) => (
              <div
                key={item.q}
                className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-5"
              >
                <p className="font-heading text-base font-semibold">{item.q}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.a}
                </p>
                <a
                  href={item.href}
                  {...(item.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="mt-auto pt-1 text-sm font-medium text-gold-deep underline underline-offset-4 transition-colors hover:text-gold dark:text-gold"
                >
                  {item.hrefLabel} →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
