"use client";

import Link from "next/link";
import { Check, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { SmartImage } from "@/components/common/smart-image";
import { CakeEnquiryForm } from "@/components/forms/cake-enquiry-form";
import { whatsappHref } from "@/lib/links";

const PROMISES = [
  "Any flavour, any size, any theme",
  "Eggless options available on request",
  "Free consultation on design & budget",
  "On-time delivery across Gorakhpur",
];

/** High-intent custom cake section with the full enquiry form. */
export function CustomCake() {
  return (
    <section
      id="custom-cakes"
      className="relative overflow-hidden py-20 gradient-brown sm:py-24 lg:py-28"
    >
      <div aria-hidden className="absolute inset-0 surface-lattice opacity-40" />
      <div
        aria-hidden
        className="absolute -top-24 left-1/4 size-80 rounded-full bg-gold/10 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl items-start gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* Copy side */}
        <div className="flex flex-col gap-6 lg:sticky lg:top-28">
          <SectionHeading
            tone="dark"
            align="left"
            eyebrow="Custom Cakes"
            title={
              <>
                Your Cake.{" "}
                <span className="gold-text">Your Story.</span>
              </>
            }
            subtitle="Birthdays, weddings, anniversaries or just-because — we design around your moment, your budget and your taste."
          />

          <Reveal delay={0.12}>
            <div className="relative mx-auto aspect-4/5 max-w-md overflow-hidden rounded-3xl border border-gold/30 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.8)] sm:aspect-3/2 lg:aspect-4/5">
              <SmartImage
                src="/images/cakes/custom-cake-feature.jpg"
                alt="Multi-tier custom celebration cake"
                sizes="(max-width: 1024px) 100vw, 45vw"
                fallbackKind="cake"
                fallbackLabel="Designed Around Your Celebration"
              />
            </div>
          </Reveal>

          <ul className="grid gap-3">
            {PROMISES.map((promise, index) => (
              <li key={promise}>
                <Reveal
                  delay={0.16 + index * 0.06}
                  className="flex items-center gap-3 text-cream/85"
                >
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-gold/20">
                    <Check className="size-3.5 text-gold" />
                  </span>
                  {promise}
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal delay={0.4}>
            <Button asChild variant="goldOutline" size="xl" className="text-cream border-cream/40 hover:border-gold hover:text-brown-deep">
              <a
                href={whatsappHref(
                  "Hi! I'd like to discuss a custom cake design for an upcoming celebration.",
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="size-5" />
                Chat on WhatsApp
              </a>
            </Button>
          </Reveal>
        </div>

        {/* Form */}
        <Reveal delay={0.15}>
          <CakeEnquiryForm />
          <p className="mt-4 text-center text-xs text-cream/50">
            Samples shown on this site are for preview —{" "}
            <Link href="/gallery" className="underline underline-offset-4 hover:text-gold">
              see the cake gallery
            </Link>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
