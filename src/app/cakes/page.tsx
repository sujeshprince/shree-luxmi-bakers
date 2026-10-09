import type { Metadata } from "next";
import Link from "next/link";
import { CakeSlice, Ruler, CalendarDays, Palette, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/common/page-hero";
import { SectionHeading } from "@/components/common/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/common/reveal";
import { ProductCard } from "@/components/product/product-card";
import { CakeEnquiryForm } from "@/components/forms/cake-enquiry-form";
import { products } from "@/data/products";
import { DEFAULT_WHATSAPP_MESSAGE, whatsappHref } from "@/lib/links";

export const metadata: Metadata = {
  title: "Custom Cakes — Birthdays, Weddings & Anniversaries",
  description:
    "Order custom celebration cakes in Gorakhpur: choose flavour, tier, theme and message. Enquire online for birthdays, weddings, anniversaries and baby showers from Shree Luxmi Bakers, Bilandpur.",
  alternates: { canonical: "/cakes" },
  keywords: [
    "custom cake Gorakhpur",
    "birthday cake Bilandpur",
    "cake order Gorakhpur online",
    "theme cake Gorakhpur",
    "wedding cake Gorakhpur",
  ],
};

const steps = [
  {
    icon: Palette,
    title: "Tell Us the Vision",
    text: "Share the occasion, theme, colours and reference photos through the enquiry form or WhatsApp.",
  },
  {
    icon: Ruler,
    title: "Get a Quote",
    text: "We confirm size, servings, design feasibility and a clear price — no hidden charges.",
  },
  {
    icon: CalendarDays,
    title: "Confirm & Schedule",
    text: "Lock your date with advance confirmation. We recommend ordering celebration cakes early.",
  },
  {
    icon: CakeSlice,
    title: "Freshly Baked & Decorated",
    text: "Your cake is baked and finished for pickup or delivery — boxed safely for the celebration.",
  },
];

const faqs = [
  {
    q: "How far in advance should I order a custom cake?",
    a: "For tiered or heavily decorated cakes, please enquire as early as possible. Simple cakes can often be accommodated sooner — the enquiry form and WhatsApp are the fastest ways to check availability for your date.",
  },
  {
    q: "Can you match a theme or photo reference?",
    a: "Yes. Share your theme, colours and reference images with your enquiry and we will confirm what is achievable, along with the quote.",
  },
  {
    q: "Do you offer eggless options?",
    a: "Eggless versions are available for many items. Mention your requirement in the enquiry form and we will confirm for your specific cake.",
  },
  {
    q: "Do you deliver custom cakes?",
    a: "Delivery options depend on distance and cake size. Add your locality in the enquiry and we will confirm whether delivery is possible for your order.",
  },
];

export default function CakesPage() {
  const cakeProducts = products.filter((product) => product.category === "cakes");

  return (
    <>
      <PageHero
        eyebrow="Custom Cakes"
        title={
          <>
            Cakes Made for <span className="gold-text">Your Moment</span>
          </>
        }
        subtitle="Birthdays, weddings, anniversaries, baby showers — designed to order, baked fresh, finished by hand."
        crumbs={[{ label: "Custom Cakes" }]}
      >
        <div className="mt-2 flex flex-wrap gap-3">
          <Button asChild variant="gold" size="xl">
            <a href="#enquire">Enquire About a Cake</a>
          </Button>
          <Button
            asChild
            variant="goldOutline"
            size="xl"
            className="border-cream/40 text-cream hover:border-gold hover:text-brown-deep"
          >
            <a
              href={whatsappHref(DEFAULT_WHATSAPP_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="size-5" />
              WhatsApp Us
            </a>
          </Button>
        </div>
      </PageHero>

      {/* Catalogue of cake bases */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Cake Menu"
            title="Start with a Flavour"
            subtitle="Pick a base from the cake menu — size, theme and finishing touches are confirmed with your enquiry."
          />
          <RevealGroup
            className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
            stagger={0.06}
          >
            {cakeProducts.map((product) => (
              <RevealItem key={product.id} className="h-full">
                <ProductCard product={product} className="h-full" />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Process */}
      <section className="relative overflow-hidden py-16 gradient-brown sm:py-20">
        <div aria-hidden className="absolute inset-0 surface-lattice opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tone="dark"
            eyebrow="How It Works"
            title={
              <>
                From Idea to <span className="gold-text">Celebration</span>
              </>
            }
            subtitle="A simple, transparent ordering process — you always know what happens next."
          />
          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
            {steps.map((step, index) => (
              <RevealItem key={step.title} className="h-full">
                <article className="group relative h-full rounded-2xl border border-gold/25 bg-black/25 p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/70">
                  <span className="absolute top-4 right-5 font-heading text-4xl font-semibold text-gold/20 transition-colors group-hover:text-gold/40">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="flex size-12 items-center justify-center rounded-xl border border-gold/40 bg-gold/12 text-gold">
                    <step.icon className="size-6" aria-hidden />
                  </span>
                  <h3 className="mt-4 font-heading text-lg font-semibold text-cream">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/65">{step.text}</p>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Enquiry form */}
      <section id="enquire" className="scroll-mt-24 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-10 lg:grid-cols-2">
            <Reveal>
              <div className="flex flex-col gap-5">
                <Badge className="w-fit" variant="outline">
                  Cake Enquiry
                </Badge>
                <h2 className="font-heading text-3xl font-semibold sm:text-4xl lg:text-5xl">
                  Tell us about your cake
                </h2>
                <p className="text-base leading-relaxed text-muted-foreground">
                  Fill in the details below and we will get back to you with availability
                  and a quote. Prefer chatting? Send the same details on WhatsApp and we
                  will take it from there.
                </p>
                <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
                  {[
                    "No payment online — confirm your order directly with the bakery",
                    "Quote shared before you confirm anything",
                    "Sample catalogue — replace with your real cake menu anytime",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="rounded-2xl border border-border bg-card p-5 text-sm leading-relaxed text-muted-foreground">
                  Looking for everyday cakes and bakes?{" "}
                  <Link
                    href="/menu"
                    className="font-medium text-gold-deep underline underline-offset-4 dark:text-gold"
                  >
                    Browse the full menu
                  </Link>
                  .
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <CakeEnquiryForm />
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="border-t border-border bg-cream py-16 dark:bg-surface-cream sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Good to Know"
            title="Custom Cake FAQs"
            subtitle="Quick answers to the questions we hear most often."
          />
          <div className="mt-10 flex flex-col gap-4">
            {faqs.map((faq, index) => (
              <Reveal key={faq.q} delay={index * 0.05}>
                <details className="group rounded-2xl border border-border bg-card p-5 transition-colors open:border-gold/50 sm:p-6">
                  <summary className="cursor-pointer list-none font-heading text-lg font-semibold marker:hidden">
                    <span className="flex items-center justify-between gap-4">
                      {faq.q}
                      <span
                        aria-hidden
                        className="flex size-7 shrink-0 items-center justify-center rounded-full border border-gold/50 text-gold transition-transform group-open:rotate-45"
                      >
                        +
                      </span>
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {faq.a}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
