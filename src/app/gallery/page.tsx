import type { Metadata } from "next";
import { PageHero } from "@/components/common/page-hero";
import { GalleryExplorer } from "@/components/gallery/gallery-explorer";
import { galleryItems } from "@/data/gallery";

export const metadata: Metadata = {
  title: "Gallery — Cakes & Creations",
  description:
    "Browse the Shree Luxmi Bakers gallery: birthday cakes, wedding tiers, kids themes, photo cakes, festival boxes and luxury creations from our Gorakhpur bakery.",
  alternates: { canonical: "/gallery" },
  keywords: [
    "bakery gallery Gorakhpur",
    "cake designs Gorakhpur",
    "custom cake photos Bilandpur",
    "Shree Luxmi Bakers gallery",
  ],
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title={
          <>
            Our Work, <span className="gold-text">Fresh from the Oven</span>
          </>
        }
        subtitle="Celebration cakes, festival boxes and everyday bakes — a look at what leaves our counter."
        crumbs={[{ label: "Gallery" }]}
      />

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <GalleryExplorer items={galleryItems} />
        </div>
      </section>
    </>
  );
}
