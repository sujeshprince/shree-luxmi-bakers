"use client";

import {
  Cake,
  IndianRupee,
  ShieldCheck,
  Sprout,
  Sunrise,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";

interface Reason {
  icon: LucideIcon;
  title: string;
  description: string;
}

const REASONS: Reason[] = [
  {
    icon: Sunrise,
    title: "Fresh Every Day",
    description: "Baked and rolled out each morning — nothing waits on the shelf.",
  },
  {
    icon: Sprout,
    title: "Premium Ingredients",
    description: "Real butter, fresh cream, pure ghee and quality chocolate.",
  },
  {
    icon: ShieldCheck,
    title: "100% Hygienic",
    description: "A spotless kitchen, clean handling and careful packaging.",
  },
  {
    icon: Cake,
    title: "Custom Cakes",
    description: "Designed around your theme, photo, flavour and budget.",
  },
  {
    icon: Truck,
    title: "Fast Local Delivery",
    description: "Careful doorstep delivery across Gorakhpur when you need it.",
  },
  {
    icon: IndianRupee,
    title: "Affordable Prices",
    description: "Premium taste that stays friendly for everyday celebrations.",
  },
];

/** Six reasons block with animated icons and gold hover treatment. */
export function WhyChooseUs() {
  return (
    <section className="bg-cream py-20 dark:bg-surface-cream sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Promise"
          title="Why Gorakhpur Chooses Us"
          subtitle="Small details, done carefully, every single day."
        />

        <RevealGroup
          className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.08}
        >
          {REASONS.map((reason) => (
            <RevealItem key={reason.title} className="h-full">
              <div className="group flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold hover:shadow-[0_28px_56px_-28px_rgba(212,175,55,0.7)]">
                <span className="flex size-12 items-center justify-center rounded-xl border border-gold/40 bg-gold/10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-gold group-hover:text-brown-deep">
                  <reason.icon className="size-6 text-gold-deep dark:text-gold group-hover:text-brown-deep" />
                </span>
                <div>
                  <h3 className="font-heading text-xl font-semibold">{reason.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {reason.description}
                  </p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
