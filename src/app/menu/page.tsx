import type { Metadata } from "next";
import { PageHero } from "@/components/common/page-hero";
import { MenuExplorer } from "@/components/product/menu-explorer";

export const metadata: Metadata = {
  title: "Menu — Cakes, Cookies, Snacks & Sweets",
  description:
    "Explore the full Shree Luxmi Bakers menu: cakes, cookies, namkeen, patties, bread, sweets and beverages. Search and filter the complete range from our Bilandpur, Gorakhpur bakery.",
  alternates: { canonical: "/menu" },
  keywords: [
    "bakery menu Gorakhpur",
    "cake shop Bilandpur menu",
    "Shree Luxmi Bakers menu",
    "bakery items Gorakhpur price list",
  ],
};

export default function MenuPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Menu"
        title={
          <>
            Everything We <span className="gold-text">Bake</span>
          </>
        }
        subtitle="Fresh from the ovens at Shastri Chowk — search, filter and add your favourites to the cart."
        crumbs={[{ label: "Menu" }]}
      />

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <MenuExplorer />
        </div>
      </section>
    </>
  );
}
