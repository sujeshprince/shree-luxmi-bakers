import type { Metadata } from "next";
import { PageHero } from "@/components/common/page-hero";
import { CheckoutView } from "@/components/checkout/checkout-view";

export const metadata: Metadata = {
  title: "Checkout — Review & Order",
  description:
    "Review your Shree Luxmi Bakers cart and send a structured order directly to the bakery on WhatsApp. No online payment required.",
  alternates: { canonical: "/checkout" },
  robots: { index: false },
};

export default function CheckoutPage() {
  return (
    <>
      <PageHero
        eyebrow="Checkout"
        title={
          <>
            Review &amp; <span className="gold-text">Order</span>
          </>
        }
        subtitle="Check your cart, add delivery details, and send the complete order to the bakery on WhatsApp."
        crumbs={[{ label: "Checkout" }]}
        className="pb-10 sm:pb-12"
      />

      <section className="py-12 sm:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <CheckoutView />
        </div>
      </section>
    </>
  );
}
