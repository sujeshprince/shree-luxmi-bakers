"use client";

import Link from "next/link";
import { ShoppingBag, Trash2 } from "lucide-react";
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
import { QuantityStepper } from "@/components/common/quantity-stepper";
import { formatPrice } from "@/lib/format";
import { cartSummaryText } from "@/lib/whatsapp";
import { whatsappHref } from "@/lib/links";
import { useStore } from "@/lib/store";
import { siteConfig } from "@/config/site";

export function CartDrawer() {
  const {
    cart,
    cartOpen,
    closeCart,
    updateQuantity,
    removeItem,
    subtotal,
    deliveryFee,
    total,
    cartCount,
  } = useStore();

  const freeDeliveryGap = Math.max(0, siteConfig.delivery.freeAbove - subtotal);

  return (
    <Sheet open={cartOpen} onOpenChange={(open) => (open ? undefined : closeCart())}>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 border-l border-gold/25 bg-card p-0 sm:max-w-md"
      >
        <SheetHeader className="border-b border-border px-5 py-4">
          <SheetTitle className="font-heading text-xl">
            Your Cart{" "}
            <span className="text-gold-deep">({cartCount})</span>
          </SheetTitle>
          <SheetDescription>
            {cartCount > 0
              ? "Review your treats before ordering."
              : "Your sweet picks will appear here."}
          </SheetDescription>
        </SheetHeader>

        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <span className="flex size-16 items-center justify-center rounded-full border border-gold/40 bg-gold/10">
              <ShoppingBag className="size-7 text-gold" />
            </span>
            <div>
              <p className="font-heading text-lg">Your cart is empty</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Explore our most loved treats and add something delicious.
              </p>
            </div>
            <Button asChild variant="gold" size="lg" onClick={closeCart}>
              <Link href="/menu">Browse Menu</Link>
            </Button>
          </div>
        ) : (
          <ul className="flex-1 divide-y divide-border overflow-y-auto px-5">
            {cart.map((item) => (
              <li key={item.productId} className="flex gap-4 py-4">
                <div className="relative size-18 shrink-0 overflow-hidden rounded-xl border border-border">
                  <SmartImage
                    src={item.image}
                    alt={item.name}
                    sizes="72px"
                    fallbackKind="cake"
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                  <div className="flex items-start justify-between gap-2">
                    <p className="truncate font-medium leading-snug">{item.name}</p>
                    <button
                      type="button"
                      aria-label={`Remove ${item.name} from cart`}
                      onClick={() => {
                        removeItem(item.productId);
                        toast.info(`${item.name} removed from cart`);
                      }}
                      className="text-muted-foreground transition-colors hover:text-destructive"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {formatPrice(item.price)} each
                  </p>
                  <div className="mt-auto flex items-center justify-between gap-2">
                    <QuantityStepper
                      size="sm"
                      value={item.quantity}
                      onChange={(qty) => updateQuantity(item.productId, qty)}
                      label={`Quantity of ${item.name}`}
                    />
                    <span className="font-semibold text-gold-deep dark:text-gold">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {cart.length > 0 ? (
          <SheetFooter className="border-t border-border bg-muted/40 px-5 py-4">
            <dl className="space-y-1.5 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="font-medium">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Delivery</dt>
                <dd className="font-medium">
                  {deliveryFee === 0 ? (
                    <span className="text-green-700 dark:text-green-400">Free</span>
                  ) : (
                    formatPrice(deliveryFee)
                  )}
                </dd>
              </div>
              <div className="flex justify-between border-t border-border pt-1.5 text-base">
                <dt className="font-semibold">Total</dt>
                <dd className="font-heading font-semibold text-gold-deep dark:text-gold">
                  {formatPrice(total)}
                </dd>
              </div>
            </dl>

            {freeDeliveryGap > 0 ? (
              <p className="text-xs text-muted-foreground">
                Add <span className="font-semibold text-gold-deep dark:text-gold">{formatPrice(freeDeliveryGap)}</span> more
                for free delivery.
              </p>
            ) : (
              <p className="text-xs text-green-700 dark:text-green-400">
                You&apos;ve unlocked free delivery!
              </p>
            )}

            <div className="mt-1 grid gap-2">
              <Button asChild variant="gold" size="xl">
                <Link href="/checkout" onClick={closeCart}>
                  Checkout
                </Link>
              </Button>
              <Button asChild variant="goldOutline" size="lg">
                <a
                  href={whatsappHref(cartSummaryText(cart, { subtotal, delivery: deliveryFee, total }))}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Order via WhatsApp
                </a>
              </Button>
              <Button asChild variant="ghost" size="lg" onClick={closeCart}>
                <Link href="/menu">Continue Shopping</Link>
              </Button>
            </div>
          </SheetFooter>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
