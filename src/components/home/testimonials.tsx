"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { TestimonialsCarousel } from "@/components/common/testimonials-carousel";

/** Customer words section previewing the full reviews page. */
export function Testimonials() {
  return (
    <section className="relative overflow-hidden py-20 gradient-brown sm:py-24">
      <div aria-hidden className="absolute inset-0 surface-lattice opacity-30" />
      <div
        aria-hidden
        className="absolute -top-20 right-1/4 size-72 rounded-full bg-gold/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 text-center">
          <SectionHeading
            tone="dark"
            eyebrow="Kind Words"
            title={
              <>
                Loved by <span className="gold-text">Gorakhpur</span>
              </>
            }
            subtitle="What our customers say about the cakes, sweets and everyday bakes."
          />
          <Reveal delay={0.15}>
            <Button asChild variant="goldOutline" size="lg" className="border-cream/40 text-cream hover:border-gold hover:text-brown-deep">
              <Link href="/reviews" className="group">
                Read All Reviews
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </Reveal>
        </div>

        <div className="mt-12">
          <TestimonialsCarousel tone="dark" />
        </div>

        <p className="mt-6 text-center text-xs text-cream/45">
          Reviews marked “Sample” are placeholder content until genuine customer
          feedback is added.
        </p>
      </div>
    </section>
  );
}
