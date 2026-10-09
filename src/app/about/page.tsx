import type { Metadata } from "next";
import Link from "next/link";
import { Heart, Sparkles, Users, Leaf, ShieldCheck, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/common/page-hero";
import { SectionHeading } from "@/components/common/section-heading";
import { SmartImage } from "@/components/common/smart-image";
import { Reveal, RevealGroup, RevealItem } from "@/components/common/reveal";
import { Counter } from "@/components/common/counter";
import { OpeningHoursCard } from "@/components/common/opening-hours";
import { siteConfig } from "@/config/site";
import { directionsHref } from "@/lib/links";

export const metadata: Metadata = {
  title: "About Us — Our Story, Values & Bakery",
  description:
    "Meet Shree Luxmi Bakers & Sweets — a neighbourhood bakery at Shastri Chowk, Bilandpur, Gorakhpur. Our story, our values and what goes into every cake, cookie and sweet we make.",
  alternates: { canonical: "/about" },
  keywords: [
    "bakery in Gorakhpur",
    "Bilandpur bakery",
    "local bakery Gorakhpur",
    "Shree Luxmi Bakers story",
  ],
};

const values = [
  {
    icon: Heart,
    title: "Baked with Care",
    text: "Every batch is made in small runs so what reaches you is fresh, not factory-made.",
  },
  {
    icon: Leaf,
    title: "Quality Ingredients",
    text: "We choose our flour, butter, chocolate and mithai ingredients for taste first — never shortcuts.",
  },
  {
    icon: ShieldCheck,
    title: "Clean & Hygienic",
    text: "A spotless kitchen and disciplined process behind everything that leaves the counter.",
  },
  {
    icon: Users,
    title: "Community First",
    text: "A neighbourhood bakery at heart — built on regulars, festivals and family celebrations.",
  },
  {
    icon: Sparkles,
    title: "Made to Celebrate",
    text: "From daily bread to tiered wedding cakes, everything is finished with the same detail.",
  },
  {
    icon: Award,
    title: "Consistent Taste",
    text: "The flavour you loved last time is the flavour you get this time — every time.",
  },
];

const stats = [
  { value: 40, suffix: "+", label: "Items on the menu" },
  { value: 7, suffix: "", label: "Days open every week" },
  { value: 8, suffix: "+", label: "Product categories" },
  { value: 100, suffix: "%", label: "Made fresh to order" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title={
          <>
            A Bakery the Neighbourhood <span className="gold-text">Calls Its Own</span>
          </>
        }
        subtitle="Shree Luxmi Bakers & Sweets — cakes, cookies, snacks and mithai from the heart of Bilandpur, Gorakhpur."
        crumbs={[{ label: "About" }]}
      />

      {/* Story */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <Reveal y={40}>
              <div className="relative">
                <div className="relative aspect-4/3 overflow-hidden rounded-3xl border border-gold/30 shadow-xl">
                  <SmartImage
                    src="/images/about/story.jpg"
                    alt="Inside the Shree Luxmi Bakers store at Shastri Chowk, Bilandpur"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    fallbackKind="bakery"
                    fallbackLabel="Our Store"
                  />
                </div>
                <div
                  aria-hidden
                  className="absolute -right-4 -bottom-4 hidden rounded-2xl border border-gold/40 bg-card px-6 py-4 shadow-lg sm:block"
                >
                  <p className="font-heading text-lg font-semibold text-gold-deep dark:text-gold">
                    Shastri Chowk Chauraha
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Near BSNL Office, Bilandpur, Gorakhpur
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.12} y={40}>
              <div className="flex flex-col gap-5">
                <Badge className="w-fit" variant="outline">
                  Since the beginning
                </Badge>
                <h2 className="font-heading text-3xl font-semibold sm:text-4xl">
                  From a local counter to your celebrations
                </h2>
                <div className="flex flex-col gap-4 text-base leading-relaxed text-muted-foreground">
                  <p>
                    {siteConfig.name} sits at {siteConfig.address.line1} — where families
                    stop by for everyday bread and biscuits, and return for the cakes that
                    anchor their biggest celebrations.
                  </p>
                  <p>
                    We keep things simple: bake fresh, serve honestly, and treat every
                    order — a single patties plate or a three-tier wedding cake — with the
                    same attention.
                  </p>
                  <p className="rounded-2xl border border-dashed border-gold/50 bg-gold/8 p-4 text-sm">
                    <strong className="font-semibold text-foreground">
                      A note on this website:
                    </strong>{" "}
                    Photography, product listings and customer reviews shown here are
                    sample content, ready to be swapped for the bakery&apos;s real photos
                    and details.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button asChild variant="gold" size="xl">
                    <Link href="/menu">Explore the Menu</Link>
                  </Button>
                  <Button asChild variant="outline" size="xl">
                    <a
                      href={directionsHref()}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit the Store
                    </a>
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative overflow-hidden py-14 gradient-brown sm:py-16">
        <div aria-hidden className="absolute inset-0 surface-lattice opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-1 text-center"
              >
                <p className="font-heading text-4xl font-semibold text-gold sm:text-5xl">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-xs tracking-[0.18em] text-cream/60 uppercase sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="What We Stand For"
            title={
              <>
                The Values Behind Every <span className="gold-text">Batch</span>
              </>
            }
            subtitle="The standards we hold ourselves to, whether it is a box of biscuits or a wedding cake."
          />
          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
            {values.map((value) => (
              <RevealItem key={value.title} className="h-full">
                <article className="group h-full rounded-2xl border border-border bg-card p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/60 hover:shadow-[0_24px_48px_-28px_rgba(212,175,55,0.6)]">
                  <span className="flex size-12 items-center justify-center rounded-xl border border-gold/40 bg-gold/10 text-gold transition-transform duration-500 group-hover:scale-110">
                    <value.icon className="size-6" aria-hidden />
                  </span>
                  <h3 className="mt-4 font-heading text-xl font-semibold">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {value.text}
                  </p>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Visit + hours */}
      <section className="border-t border-border bg-cream py-16 dark:bg-surface-cream sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-8 md:grid-cols-2">
            <Reveal>
              <div className="flex h-full flex-col justify-center gap-5">
                <Badge className="w-fit" variant="outline">
                  Come Say Hello
                </Badge>
                <h2 className="font-heading text-3xl font-semibold sm:text-4xl">
                  Find us at Shastri Chowk
                </h2>
                <p className="text-base leading-relaxed text-muted-foreground">
                  {siteConfig.address.line1}, {siteConfig.address.line2},{" "}
                  {siteConfig.address.locality}, {siteConfig.address.city} —{" "}
                  {siteConfig.address.pincode}. Drop in during store hours, or get
                  directions before you leave.
                </p>
                <Button asChild variant="gold" size="xl" className="w-fit">
                  <a
                    href={directionsHref()}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get Directions
                  </a>
                </Button>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <OpeningHoursCard className="h-full" />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
