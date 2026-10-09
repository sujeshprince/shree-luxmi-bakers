"use client";

import * as React from "react";
import { Heart, MessageCircle, ShoppingCart, Star } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { SmartImage } from "@/components/common/smart-image";
import { Stars } from "@/components/common/stars";
import { QuantityStepper } from "@/components/common/quantity-stepper";
import { formatPrice } from "@/lib/format";
import { buildProductEnquiry } from "@/lib/whatsapp";
import { whatsappHref } from "@/lib/links";
import { useStore } from "@/lib/store";
import { products, relatedProducts } from "@/data/products";
import { cn } from "cn";

/** Product quick-view modal — image, rating, price, qty, cart, WhatsApp, related. */
export function QuickViewModal() {
  const {
    quickViewId,
    closeQuickView,
    addItem,
    toggleWishlist,
    isWishlisted,
    openQuickView,
  } = useStore();
  const [quantity, setQuantity] = React.useState(1);

  const product = products.find((p) => p.id === quickViewId);

  // Reset quantity when a different product is opened (adjusted during
  // render rather than synced in an effect).
  const [lastOpenedId, setLastOpenedId] = React.useState(quickViewId);
  if (quickViewId !== lastOpenedId) {
    setLastOpenedId(quickViewId);
    setQuantity(1);
  }

  if (!product) {
    return <Dialog open={false} onOpenChange={() => closeQuickView()} />;
  }

  const wished = isWishlisted(product.id);
  const related = relatedProducts(product, 4);
  const discount =
    product.mrp && product.mrp > product.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : null;

  return (
    <Dialog
      open={Boolean(quickViewId)}
      onOpenChange={(open) => {
        if (!open) closeQuickView();
      }}
    >
      <DialogContent className="max-h-[90vh] w-full max-w-4xl overflow-y-auto border border-gold/30 bg-card p-0 sm:max-w-4xl">
        <DialogTitle className="sr-only">{product.name}</DialogTitle>
        <DialogDescription className="sr-only">
          Quick view of {product.name} — {formatPrice(product.price)}
        </DialogDescription>

        <div className="grid gap-0 md:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-square overflow-hidden border-b border-border md:border-r md:border-b-0">
            <SmartImage
              src={product.image}
              alt={product.name}
              sizes="(max-width: 768px) 100vw, 50vw"
              fallbackKind={product.category === "sweets" ? "sweets" : "cake"}
              fallbackLabel={product.name}
            />
            {discount ? (
              <span className="absolute top-4 left-4 rounded-full bg-gold px-3 py-1 text-xs font-bold tracking-wider text-brown-deep uppercase">
                {discount}% off
              </span>
            ) : null}
          </div>

          {/* Details */}
          <div className="flex flex-col gap-4 p-5 sm:p-7">
            <div className="flex items-center justify-between gap-3 pr-8">
              <span className="text-[0.65rem] font-semibold tracking-[0.22em] text-gold-deep uppercase dark:text-gold">
                {product.category}
              </span>
              <button
                type="button"
                aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
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
                  "flex size-9 items-center justify-center rounded-full border transition-colors",
                  wished
                    ? "border-gold bg-gold text-brown-deep"
                    : "border-border text-muted-foreground hover:border-gold hover:text-gold-deep",
                )}
              >
                <Heart className={cn("size-4", wished && "fill-current")} />
              </button>
            </div>

            <div>
              <h3 className="font-heading text-2xl leading-tight font-semibold sm:text-3xl">
                {product.name}
              </h3>
              <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                <Stars rating={product.rating} size="md" />
                <span className="tabular-nums">
                  {product.rating.toFixed(1)} · {product.reviews} reviews
                </span>
              </div>
            </div>

            <div className="flex items-end gap-3">
              <span className="font-heading text-3xl font-semibold text-brown dark:text-cream">
                {formatPrice(product.price)}
              </span>
              {product.mrp && product.mrp > product.price ? (
                <span className="pb-1 text-muted-foreground line-through">
                  {formatPrice(product.mrp)}
                </span>
              ) : null}
              <span className="pb-1 text-xs text-green-700 dark:text-green-400">
                {product.inStock ? "In stock" : "Currently unavailable"}
              </span>
            </div>

            <p className="text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <QuantityStepper value={quantity} onChange={setQuantity} />
              <Button
                variant="gold"
                size="xl"
                className="flex-1"
                disabled={!product.inStock}
                onClick={() => {
                  addItem(product, quantity);
                  toast.success(
                    `${quantity} × ${product.name} added to cart`,
                  );
                }}
              >
                <ShoppingCart className="size-5" />
                Add to Cart
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <Button asChild variant="goldOutline" size="lg">
                <a
                  href={whatsappHref(buildProductEnquiry(product))}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="size-4" />
                  WhatsApp Enquiry
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  toggleWishlist(product.id);
                  toast(
                    wished
                      ? `${product.name} removed from wishlist`
                      : `${product.name} saved to wishlist`,
                  );
                }}
              >
                <Star className={cn("size-4", wished && "fill-gold text-gold")} />
                {wished ? "Saved" : "Save for later"}
              </Button>
            </div>

            {/* Related */}
            {related.length > 0 ? (
              <div className="mt-1 border-t border-border pt-4">
                <p className="mb-3 text-[0.65rem] font-semibold tracking-[0.22em] text-muted-foreground uppercase">
                  You may also like
                </p>
                <div className="grid grid-cols-4 gap-2 sm:gap-3">
                  {related.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => openQuickView(item.id)}
                      className="group flex flex-col gap-1.5 text-left"
                    >
                      <span className="relative block aspect-square overflow-hidden rounded-lg border border-border">
                        <SmartImage
                          src={item.image}
                          alt={item.name}
                          sizes="80px"
                          fallbackKind="cake"
                          className="transition-transform duration-500 group-hover:scale-105"
                        />
                      </span>
                      <span className="line-clamp-2 text-[0.7rem] leading-tight font-medium">
                        {item.name}
                      </span>
                      <span className="text-[0.7rem] font-semibold text-gold-deep dark:text-gold">
                        {formatPrice(item.price)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
