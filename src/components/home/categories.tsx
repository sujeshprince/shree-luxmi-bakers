"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { SmartImage } from "@/components/common/smart-image";
import { categoryCards } from "@/data/categories";

/** Interactive category showcase — each card deep-links to a filtered menu. */
export function Categories() {
  return (
    <section className="relative bg-cream py-20 dark:bg-surface-cream sm:py-24">
      <div aria-hidden className="absolute inset-0 surface-dots opacity-40" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Explore"
          title="Something Delicious for Every Craving"
          subtitle="Ten ways to make today sweeter — tap any category to see the full range."
        />

        <RevealGroup className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-5" stagger={0.06}>
          {categoryCards.map((category) => (
            <RevealItem key={category.slug}>
              <Link
                href={`/menu?category=${category.menuCategory}${
                  category.query ? `&q=${encodeURIComponent(category.query)}` : ""
                }`}
                className="group relative block aspect-4/5 overflow-hidden rounded-2xl border border-border bg-muted shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/60 hover:shadow-[0_28px_56px_-26px_rgba(212,175,55,0.75)]"
              >
                <SmartImage
                  src={category.image}
                  alt={category.name}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  fallbackKind={category.slug === "indian-sweets" ? "sweets" : "cake"}
                  className="transition-transform duration-700 group-hover:scale-110"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-brown-deep/92 via-brown-deep/35 to-transparent"
                />

                <span className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-4 text-left">
                  <span className="font-heading text-lg leading-tight font-semibold text-cream sm:text-xl">
                    {category.name}
                  </span>
                  <span className="line-clamp-2 text-xs text-cream/70">
                    {category.description}
                  </span>
                  <span className="mt-1.5 inline-flex items-center gap-1.5 text-[0.66rem] font-semibold tracking-[0.18em] text-gold uppercase">
                    Explore
                    <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </span>
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
