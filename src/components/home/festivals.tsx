"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealItem } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { SmartImage } from "@/components/common/smart-image";
import { festivals } from "@/data/festivals";

/** Horizontal festive gifting scroller (snap-scroll on every breakpoint). */
export function Festivals() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24 lg:py-28">
      <div
        aria-hidden
        className="absolute top-1/2 left-0 size-[30rem] -translate-y-1/2 rounded-full bg-gold/8 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Festive Season"
          title="Festive Gifting, Sorted"
          subtitle="Diwali trays, Rakhi boxes, Holi gujiya, Christmas plum cake and more — curated for every celebration of the year."
        />

        <RevealGroup className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4" stagger={0.05}>
          {festivals.map((festival) => (
            <RevealItem
              key={festival.id}
              className="w-72 shrink-0 snap-start sm:w-80"
            >
              <article className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/60 hover:shadow-[0_28px_56px_-26px_rgba(212,175,55,0.7)]">
                <div className="relative aspect-16/10 overflow-hidden">
                  <SmartImage
                    src={festival.image}
                    alt={`${festival.name} special gifting`}
                    sizes="320px"
                    fallbackKind="gift"
                    fallbackLabel={festival.name}
                    className="transition-transform duration-700 group-hover:scale-105"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-brown-deep/85 via-brown-deep/20 to-transparent"
                  />
                  <span
                    className="absolute top-3 left-3 rounded-full px-2.5 py-1 text-[0.6rem] font-bold tracking-[0.16em] text-charcoal uppercase backdrop-blur"
                    style={{ backgroundColor: `${festival.accent}E6` }}
                  >
                    {festival.name}
                  </span>
                </div>
                <div className="flex flex-col gap-2 p-5">
                  <p className="font-heading text-lg font-semibold text-gold-deep dark:text-gold">
                    {festival.tagline}
                  </p>
                  <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                    {festival.description}
                  </p>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.2} className="mt-8 flex justify-center">
          <Button asChild variant="gold" size="xl" className="group">
            <Link href="/offers">
              Explore Festive Offers
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
