"use client";

import * as React from "react";
import { Eye, Heart, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { SmartImage } from "@/components/common/smart-image";
import { Stars } from "@/components/common/stars";
import { formatPrice } from "@/lib/format";
import { useStore } from "@/lib/store";
import type { Product } from "@/types";
import { cn } from "cn";

interface ProductCardProps {
  product: Product;
  className?: string;
}

/** Editorial product card: photo, badge, rating, wishlist, quick view, add to cart. */
export function ProductCard({ product, className }: ProductCardProps) {
  const { addItem, openQuickView, toggleWishlist, isWishlisted } = useStore();
  const wished = isWishlisted(product.id);
  const discount =
    product.mrp && product.mrp > product.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : null;

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-[0_28px_60px_-30px_rgba(212,175,55,0.65)]",
        className,
      )}
    >
      {/* Image */}
      <button
        type="button"
        onClick={() => openQuickView(product.id)}
        aria-label={`Quick view: ${product.name}`}
        className="relative block aspect-4/5 w-full overflow-hidden text-left"
      >
        <SmartImage
          src={product.image}
          alt={product.name}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          fallbackKind={product.category === "sweets" ? "sweets" : "cake"}
          className="transition-transform duration-700 group-hover:scale-105"
        />

        {/* Badges */}
        <span className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.badge ? (
            <span className="rounded-full bg-brown-deep/90 px-2.5 py-1 text-[0.62rem] font-semibold tracking-[0.14em] text-gold uppercase backdrop-blur">
              {product.badge}
            </span>
          ) : null}
          {discount ? (
            <span className="rounded-full bg-gold px-2.5 py-1 text-[0.62rem] font-bold tracking-wider text-brown-deep uppercase">
              {discount}% off
            </span>
          ) : null}
        </span>

        {/* Quick view pill */}
        <span className="absolute inset-x-0 bottom-0 flex translate-y-full justify-center pb-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 max-lg:translate-y-0 max-lg:opacity-100">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-cream/95 px-3.5 py-1.5 text-[0.68rem] font-semibold tracking-[0.14em] text-brown uppercase shadow-lg backdrop-blur">
            <Eye className="size-3.5" />
            Quick View
          </span>
        </span>
      </button>

      {/* Wishlist */}
      <button
        type="button"
        aria-label={
          wished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`
        }
        aria-pressed={wished}
        onClick={() => {
          toggleWishlist(product.id);
          toast(
            wished
              ? `${product.name} removed from wishlist`
              : `${product.name} saved to wishlist`,
          );
        }}
        className={cn(
          "absolute top-3 right-3 flex size-9 items-center justify-center rounded-full border backdrop-blur transition-all",
          wished
            ? "border-gold bg-gold text-brown-deep"
            : "border-cream/30 bg-cream/85 text-brown hover:border-gold hover:text-gold-deep",
        )}
      >
        <Heart className={cn("size-4", wished && "fill-current")} />
      </button>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-2 p-4 sm:p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[0.62rem] font-semibold tracking-[0.2em] text-gold-deep uppercase dark:text-gold">
            {product.category}
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Stars rating={product.rating} />
            <span className="tabular-nums">
              {product.rating.toFixed(1)} ({product.reviews})
            </span>
          </span>
        </div>

        <button
          type="button"
          onClick={() => openQuickView(product.id)}
          className="text-left font-heading text-lg leading-snug font-semibold transition-colors hover:text-gold-deep dark:hover:text-gold"
        >
          {product.name}
        </button>

        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {product.description}
        </p>

        <div className="mt-auto flex items-end justify-between gap-3 pt-3">
          <div className="flex flex-col">
            {product.mrp && product.mrp > product.price ? (
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(product.mrp)}
              </span>
            ) : null}
            <span className="font-heading text-xl font-semibold text-brown dark:text-cream">
              {formatPrice(product.price)}
            </span>
          </div>
          <Button
            variant="gold"
            size="lg"
            disabled={!product.inStock}
            onClick={() => {
              addItem(product);
              toast.success(`${product.name} added to cart`);
            }}
          >
            <ShoppingCart className="size-4" />
            {product.inStock ? "Add" : "Sold out"}
          </Button>
        </div>
      </div>
    </article>
  );
}
