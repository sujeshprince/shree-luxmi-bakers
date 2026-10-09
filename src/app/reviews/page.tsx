import type { Metadata } from "next";
import { MessageCircle, Quote, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/common/page-hero";
import { SectionHeading } from "@/components/common/section-heading";
import { TestimonialsCarousel } from "@/components/common/testimonials-carousel";
import { Stars } from "@/components/common/stars";
import { Reveal, RevealGroup, RevealItem } from "@/components/common/reveal";
import { testimonials } from "@/data/testimonials";
import { DEFAULT_WHATSAPP_MESSAGE, whatsappHref } from "@/lib/links";

export const metadata: Metadata = {
  title: "Reviews — What Customers Say",
  description:
    "Read customer feedback about Shree Luxmi Bakers & Sweets — cakes, mithai, patties and festival orders from Bilandpur, Gorakhpur.",
  alternates: { canonical: "/reviews" },
  keywords: [
    "bakery reviews Gorakhpur",
    "Shree Luxmi Bakers reviews",
    "cake shop feedback Bilandpur",
  ],
};

export default function ReviewsPage() {
  const average =
    testimonials.reduce((sum, item) => sum + item.rating, 0) / testimonials.length;

  return (
    <>
      <PageHero
        eyebrow="Reviews"
        title={
          <>
            Words from Our <span className="gold-text">Customers</span>
          </>
        }
        subtitle="Feedback from celebrations, festival orders and everyday stops at the counter."
        crumbs={[{ label: "Reviews" }]}
      />

      {/* Summary + carousel */}
      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 md:grid-cols-3">
            <Reveal>
              <div className="flex flex-col items-center gap-2 rounded-3xl border border-gold/40 bg-card p-7 text-center shadow-lg md:col-span-1">
                <p className="font-heading text-6xl font-semibold text-gold-deep dark:text-gold">
                  {average.toFixed(1)}
                </p>
                <Stars rating={average} size="md" className="mt-1" />
                <p className="text-sm text-muted-foreground">
                  Based on {testimonials.length} reviews
                </p>
                <Badge className="mt-2" variant="outline">
                  Sample content
                </Badge>
              </div>
            </Reveal>

            <div className="md:col-span-2">
              <TestimonialsCarousel tone="light" />
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            These reviews are placeholders until genuine, consented customer feedback is
            added in{" "}
            <code className="rounded bg-gold/15 px-1.5 py-0.5 text-[0.7rem] text-gold-deep dark:text-gold">
              src/data/testimonials.ts
            </code>
            .
          </p>
        </div>
      </section>

      {/* All reviews grid */}
      <section className="border-t border-border bg-cream py-16 dark:bg-surface-cream sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="All Feedback"
            title={
              <>
                Every <span className="gold-text">Kind Word</span>
              </>
            }
            subtitle="A longer look at what customers have shared about their orders."
          />
          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
            {testimonials.map((testimonial) => (
              <RevealItem key={testimonial.id} className="h-full">
                <article className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/60 hover:shadow-[0_24px_48px_-28px_rgba(212,175,55,0.6)]">
                  <div className="flex items-center justify-between gap-3">
                    <Stars rating={testimonial.rating} />
                    <Quote className="size-6 text-gold/35" aria-hidden />
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    “{testimonial.review}”
                  </p>
                  <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-4">
                    <div className="flex items-center gap-3">
                      <span className="flex size-10 items-center justify-center rounded-full bg-gold/15 font-heading text-sm font-semibold text-gold-deep dark:text-gold">
                        {testimonial.initials}
                      </span>
                      <div>
                        <p className="text-sm font-semibold">{testimonial.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {testimonial.location}
                        </p>
                      </div>
                    </div>
                    {testimonial.sample ? (
                      <Badge
                        variant="outline"
                        className="text-[0.58rem] tracking-[0.14em] uppercase"
                      >
                        Sample
                      </Badge>
                    ) : null}
                  </div>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>

          {/* Leave a review CTA */}
          <Reveal delay={0.2} className="mt-12">
            <div className="relative overflow-hidden rounded-3xl border border-gold/40 bg-gradient-to-br from-brown-deep via-brown to-brown-deep p-8 text-center shadow-xl sm:p-10">
              <div aria-hidden className="absolute inset-0 surface-lattice opacity-30" />
              <div className="relative flex flex-col items-center gap-4">
                <span className="flex size-14 items-center justify-center rounded-full border border-gold/40 bg-gold/12 text-gold">
                  <Star className="size-6" aria-hidden />
                </span>
                <h3 className="font-heading text-2xl font-semibold text-cream sm:text-3xl">
                  Had a great experience?
                </h3>
                <p className="max-w-xl text-sm leading-relaxed text-cream/65">
                  Share your feedback with us on WhatsApp — the best reviews make it to
                  this page (with your permission, of course).
                </p>
                <Button
                  asChild
                  variant="gold"
                  size="xl"
                >
                  <a
                    href={whatsappHref(
                      `${DEFAULT_WHATSAPP_MESSAGE}\n\nMy review: `,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="size-5" />
                    Send Your Review
                  </a>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
