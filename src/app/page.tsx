import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { TrustBar } from "@/components/home/trust-bar";
import { About } from "@/components/home/about";
import { Categories } from "@/components/home/categories";
import { FeaturedProducts } from "@/components/home/featured-products";
import { CustomCake } from "@/components/home/custom-cake";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { Festivals } from "@/components/home/festivals";
import { Testimonials } from "@/components/home/testimonials";
import { OffersPreview } from "@/components/home/offers-preview";
import { VisitUs } from "@/components/home/visit-us";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <About />
      <Categories />
      <FeaturedProducts />
      <CustomCake />
      <WhyChooseUs />
      <Festivals />
      <Testimonials />
      <OffersPreview />
      <VisitUs />
    </>
  );
}
