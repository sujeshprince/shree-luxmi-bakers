"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Counter } from "@/components/common/counter";
import { Reveal, RevealGroup, RevealItem } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { SmartImage } from "@/components/common/smart-image";

const STATS = [
  { value: 15, suffix: "K+", label: "Happy Customers" },
  { value: 500, suffix: "+", label: "Cake Designs" },
  { value: 100, suffix: "%", label: "Fresh Daily" },
  { value: 20, suffix: "+", label: "Categories" },
];

/** Split-screen story section with parallax image and animated statistics. */
export function About() {
  const reduced = useReducedMotion();
  const imageRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["-7%", "7%"]);

  return (
    <section className="relative overflow-hidden py-20 sm:py-24 lg:py-28">
      <div
        aria-hidden
        className="absolute top-0 right-0 size-[26rem] rounded-full bg-gold/6 blur-3xl"
      />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* Image side */}
        <div ref={imageRef} className="relative">
          <Reveal y={36}>
            <div className="relative aspect-4/5 overflow-hidden rounded-[2rem] border border-gold/25 shadow-[0_40px_90px_-45px_rgba(62,39,35,0.7)] sm:aspect-5/6 lg:aspect-4/5">
              <motion.div
                style={{ y: imageY }}
                className="absolute top-[-8%] right-0 bottom-[-8%] left-0"
              >
                <SmartImage
                  src="/images/about/bakery-story.jpg"
                  alt="Baker hand-finishing a celebration cake"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  fallbackKind="bakery"
                  fallbackLabel="Handcrafted Daily"
                />
              </motion.div>
            </div>
          </Reveal>

          {/* Floating freshness card */}
          <Reveal
            delay={0.25}
            className="absolute -right-3 bottom-6 flex w-48 items-center gap-3 rounded-2xl border border-gold/40 bg-card/95 p-4 shadow-xl backdrop-blur sm:-right-6 sm:w-56"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gold/15">
              <Cookie className="size-5 text-gold-deep dark:text-gold" />
            </span>
            <p className="text-sm leading-snug font-medium">
              Fresh from the oven,
              <span className="text-gold-deep dark:text-gold"> every single day.</span>
            </p>
          </Reveal>
        </div>

        {/* Copy side */}
        <div className="flex flex-col gap-6">
          <SectionHeading
            align="left"
            eyebrow="Our Story"
            title={
              <>
                More Than a Bakery.{" "}
                <span className="text-gold-deep dark:text-gold">
                  A Part of Your Celebrations.
                </span>
              </>
            }
          />

          <Reveal delay={0.1}>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              Every morning begins the same way at Shree Luxmi — ovens warming, dough
              resting, and mithai being shaped by hand. We bake with fresh ingredients,
              fold our sweets with patience, and finish every cake as if it were for our
              own family.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              From first birthdays to Diwali trays, anniversary tiers to evening patties —
              Gorakhpur has trusted us to make its moments sweeter. Nothing sits overnight;
              if it isn&apos;t fresh, it doesn&apos;t reach our counter.
            </p>
          </Reveal>

          <RevealGroup className="mt-2 grid grid-cols-2 gap-4 sm:gap-5" stagger={0.1}>
            {STATS.map((stat) => (
              <RevealItem
                key={stat.label}
                className="rounded-2xl border border-gold/25 bg-cream p-4 text-center transition-colors hover:border-gold/60 dark:bg-surface-cream sm:p-5"
              >
                <p className="font-heading text-3xl font-semibold text-brown dark:text-gold sm:text-4xl">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-1 text-xs font-medium tracking-wide text-muted-foreground sm:text-sm">
                  {stat.label}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.3} className="mt-2">
            <Button asChild variant="gold" size="xl" className="group">
              <Link href="/about">
                Discover Our Story
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
