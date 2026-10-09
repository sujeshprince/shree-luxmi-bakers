"use client";

import Link from "next/link";
import { Heart, ShoppingCart, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { SmartImage } from "@/components/common/smart-image";
import { formatPrice } from "@/lib/format";
import { useStore } from "@/lib/store";
import { products } from "@/data/products";

export function WishlistDrawer() {
  const {
    wishlist,
    wishlistOpen,
    closeWishlist,
    toggleWishlist,
    addItem,
    openCart,
  } = useStore();

  const items = products.filter((product) => wishlist.includes(product.id));

  return (
    <Sheet
      open={wishlistOpen}
      onOpenChange={(open) => (open ? undefined : closeWishlist())}
    >
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 border-l border-gold/25 bg-card p-0 sm:max-w-md"
      >
        <SheetHeader className="border-b border-border px-5 py-4">
          <SheetTitle className="font-heading text-xl">
            Wishlist <span className="text-gold-deep">({items.length})</span>
          </SheetTitle>
          <SheetDescription>Your saved treats, ready anytime.</SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <span className="flex size-16 items-center justify-center rounded-full border border-gold/40 bg-gold/10">
              <Heart className="size-7 text-gold" />
            </span>
            <div>
              <p className="font-heading text-lg">Nothing saved yet</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Tap the heart on any product to save it for later.
              </p>
            </div>
            <Button asChild variant="gold" size="lg" onClick={closeWishlist}>
              <Link href="/menu">Explore the Menu</Link>
            </Button>
          </div>
        ) : (
          <ul className="flex-1 divide-y divide-border overflow-y-auto px-5">
            {items.map((product) => (
              <li key={product.id} className="flex gap-4 py-4">
                <div className="relative size-16 shrink-0 overflow-hidden rounded-xl border border-border">
                  <SmartImage
                    src={product.image}
                    alt={product.name}
                    sizes="64px"
                    fallbackKind="cake"
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="truncate font-medium leading-snug">{product.name}</p>
                    <button
                      type="button"
                      aria-label={`Remove ${product.name} from wishlist`}
                      onClick={() => toggleWishlist(product.id)}
                      className="text-muted-foreground transition-colors hover:text-destructive"
                    >
                      <X className="size-4" />
                    </button>
                  </div>
                  <p className="font-semibold text-gold-deep dark:text-gold">
                    {formatPrice(product.price)}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-1 self-start"
                    onClick={() => {
                      addItem(product);
                      toast.success(`${product.name} added to cart`);
                      closeWishlist();
                      openCart();
                    }}
                  >
                    <ShoppingCart className="size-3.5" />
                    Move to cart
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {items.length > 0 ? (
          <SheetFooter className="border-t border-border">
            <Button asChild variant="gold" size="lg" onClick={closeWishlist}>
              <Link href="/menu">Continue Shopping</Link>
            </Button>
          </SheetFooter>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
