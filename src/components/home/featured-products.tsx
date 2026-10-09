"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/product-card";
import { Reveal, RevealGroup, RevealItem } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { products } from "@/data/products";

/** Homepage product preview — bestsellers, linking to the full menu. */
export function FeaturedProducts() {
  const featured = products.filter((product) => product.badge).slice(0, 8);
  const fallback = products.slice(0, 8);
  const shown = featured.length >= 4 ? featured : fallback;

  return (
    <section className="py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            align="left"
            eyebrow="The Counter"
            title="Our Most Loved Treats"
            subtitle="Handpicked favourites from our daily display — sample prices shown for preview."
          />
          <Reveal delay={0.15} className="shrink-0">
            <Button asChild variant="goldOutline" size="xl" className="group">
              <Link href="/menu">
                View Full Menu
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </Reveal>
        </div>

        <RevealGroup className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.07}>
          {shown.map((product) => (
            <RevealItem key={product.id}>
              <ProductCard product={product} className="h-full" />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
