"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, TicketPercent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CountdownTimer } from "@/components/common/countdown";
import { Reveal, RevealGroup, RevealItem } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { offers } from "@/data/offers";
import { nextOfferDeadline } from "@/lib/time";
import { defer } from "@/lib/defer";

/** Offers band with a real, ticking countdown to the next weekly deadline. */
export function OffersPreview() {
  const [deadline, setDeadline] = React.useState<Date | null>(null);
  const featured = offers.slice(0, 3);

  // Resolve the real deadline on the client (clock reads are blocked
  // during static prerendering with Cache Components).
  React.useEffect(() => {
    defer(() => setDeadline(nextOfferDeadline()));
  }, []);

  return (
    <section className="relative overflow-hidden py-20 gradient-brown sm:py-24">
      <div aria-hidden className="absolute inset-0 surface-lattice opacity-35" />
      <div
        aria-hidden
        className="absolute -right-20 -bottom-24 size-96 rounded-full bg-gold/12 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 text-center">
          <SectionHeading
            tone="dark"
            eyebrow="Limited Time"
            title={
              <>
                Sweet Deals, <span className="gold-text">Limited Time</span>
              </>
            }
            subtitle="Seasonal savings on cakes, hampers and party orders — apply the code when you order."
          />

          <Reveal delay={0.15}>
            <p className="text-xs font-semibold tracking-[0.24em] text-cream/60 uppercase">
              This week&apos;s offers end in
            </p>
            <div className="mt-3 flex justify-center">
              <CountdownTimer target={deadline} compact />
            </div>
          </Reveal>
        </div>

        <RevealGroup
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.09}
        >
          {featured.map((offer) => (
            <RevealItem key={offer.id} className="h-full">
              <article className="group flex h-full flex-col gap-4 rounded-2xl border border-gold/30 bg-black/25 p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-gold hover:shadow-[0_28px_56px_-26px_rgba(212,175,55,0.75)]">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-gold px-3 py-1 text-[0.66rem] font-bold tracking-[0.14em] text-brown-deep uppercase">
                    {offer.highlight}
                  </span>
                  <TicketPercent className="size-5 text-gold/70" />
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-semibold text-cream">
                    {offer.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/70">
                    {offer.description}
                  </p>
                </div>
                <div className="mt-auto flex items-center justify-between gap-3 border-t border-gold/20 pt-4">
                  <span className="rounded-lg border border-dashed border-gold/50 px-3 py-1.5 font-mono text-sm font-semibold tracking-widest text-gold">
                    {offer.code}
                  </span>
                  <Button asChild variant="gold" size="lg">
                    <Link href={`/offers#${offer.id}`}>{offer.cta}</Link>
                  </Button>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.2} className="mt-9 flex flex-col items-center gap-3 text-center">
          <Button
            asChild
            variant="goldOutline"
            size="xl"
            className="border-cream/40 text-cream hover:border-gold hover:text-brown-deep"
          >
            <Link href="/offers" className="group">
              View All Offers
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <p className="text-xs text-cream/45">
            Sample offer codes — configure real promotions in the offers data file.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
