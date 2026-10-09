"use client";

import * as React from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  CheckCircle2,
  Loader2,
  MessageCircle,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { QuantityStepper } from "@/components/common/quantity-stepper";
import { SmartImage } from "@/components/common/smart-image";
import { useStore } from "@/lib/store";
import { formatPrice } from "@/lib/format";
import { buildCheckoutMessage } from "@/lib/whatsapp";
import { whatsappHref } from "@/lib/links";
import { siteConfig } from "@/config/site";
import { defer } from "@/lib/defer";
import { cn } from "cn";

const PHONE_RE = /^(?:\+?91)?[6-9]\d{9}$/;

function isFutureDate(value: string): boolean {
  const chosen = new Date(`${value}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return !Number.isNaN(chosen.getTime()) && chosen >= today;
}

const schema = z
  .object({
    name: z.string().trim().min(2, "Please enter your name"),
    phone: z
      .string()
      .trim()
      .min(1, "Please enter your phone number")
      .refine(
        (value) => PHONE_RE.test(value.replace(/[\s-]/g, "")),
        "Enter a valid 10-digit Indian mobile number",
      ),
    method: z.enum(["delivery", "pickup"], { message: "Please choose an option" }),
    address: z.string().trim(),
    deliveryDate: z
      .string()
      .min(1, "Please choose a date")
      .refine(isFutureDate, "Please choose today or a future date"),
    instructions: z.string().max(500, "Please keep it under 500 characters"),
  })
  .superRefine((value, ctx) => {
    if (value.method === "delivery" && value.address.trim().length < 10) {
      ctx.addIssue({
        code: "custom",
        path: ["address"],
        message: "Please enter a complete delivery address",
      });
    }
  });

type Values = z.infer<typeof schema>;

/** Cart review + customer details → structured WhatsApp order hand-off. */
export function CheckoutView() {
  const {
    cart,
    subtotal,
    deliveryFee,
    total,
    updateQuantity,
    removeItem,
    clearCart,
  } = useStore();

  const [order, setOrder] = React.useState<{ message: string } | null>(null);
  // Earliest selectable date — resolved on the client (clock reads are
  // blocked during static prerendering with Cache Components).
  const [minDate, setMinDate] = React.useState("");

  React.useEffect(() => {
    defer(() => {
      const nextDay = new Date(Date.now() + 86_400_000);
      setMinDate(nextDay.toISOString().slice(0, 10));
    });
  }, []);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      phone: "",
      method: "delivery",
      address: "",
      deliveryDate: "",
      instructions: "",
    },
  });

  const method = useWatch({ control, name: "method" });

  // Empty cart state
  if (cart.length === 0 && !order) {
    return (
      <div className="flex flex-col items-center gap-5 rounded-3xl border border-dashed border-border bg-card px-6 py-16 text-center">
        <span className="flex size-16 items-center justify-center rounded-full border border-gold/40 bg-gold/10">
          <ShoppingBag className="size-7 text-gold" />
        </span>
        <div>
          <h2 className="font-heading text-2xl font-semibold">Your cart is empty</h2>
          <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
            Add some fresh bakes from the menu and they&apos;ll show up here, ready to
            order.
          </p>
        </div>
        <Button asChild variant="gold" size="xl">
          <a href="/menu">Browse the Menu</a>
        </Button>
      </div>
    );
  }

  // Success state
  if (order) {
    return (
      <div
        className="flex flex-col items-center gap-5 rounded-3xl border border-gold/40 bg-card p-8 text-center shadow-xl sm:p-10"
        role="status"
        aria-live="polite"
      >
        <span className="flex size-16 items-center justify-center rounded-full bg-green-500/12 text-green-600 dark:text-green-400">
          <CheckCircle2 className="size-8" />
        </span>
        <div>
          <h2 className="font-heading text-2xl font-semibold">
            Your order is ready to send!
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            We&apos;ve opened WhatsApp with your complete order — item list, delivery
            details and totals. Press send there and the bakery will confirm availability
            and timing with you.
          </p>
          <p className="mx-auto mt-3 max-w-md text-xs text-muted-foreground/80">
            No payment has been made. Payment is settled directly with the bakery on
            confirmation.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild variant="gold" size="lg">
            <a
              href={whatsappHref(order.message)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="size-4" />
              Open WhatsApp Again
            </a>
          </Button>
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={() => {
              clearCart();
              setOrder(null);
            }}
          >
            <Trash2 className="size-4" />
            Clear Cart &amp; Continue
          </Button>
        </div>
      </div>
    );
  }

  const onSubmit = (values: Values) => {
    const address =
      values.method === "pickup"
        ? "Store pickup — Shastri Chowk Chauraha, Bilandpur"
        : values.address.trim();

    const message = buildCheckoutMessage(cart, { subtotal, delivery: deliveryFee, total }, {
      name: values.name.trim(),
      phone: values.phone.trim(),
      address,
      deliveryDate: values.deliveryDate,
      instructions: values.instructions.trim() || undefined,
    });

    // Open WhatsApp with the structured order (popup may be blocked — the
    // success panel includes a fallback button with the same message).
    window.open(whatsappHref(message), "_blank", "noopener,noreferrer");
    setOrder({ message });
  };

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[1fr_400px]">
      {/* Details form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-5 rounded-3xl border border-gold/30 bg-card p-6 shadow-xl sm:p-8"
      >
        <div>
          <h2 className="font-heading text-2xl font-semibold">Your Details</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            We&apos;ll use these to confirm your order on WhatsApp.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="checkout-name">Name</Label>
            <Input
              id="checkout-name"
              autoComplete="name"
              placeholder="Your full name"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "checkout-name-error" : undefined}
              {...register("name")}
            />
            {errors.name ? (
              <p
                id="checkout-name-error"
                className="text-xs text-destructive"
                role="alert"
              >
                {errors.name.message}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="checkout-phone">Phone</Label>
            <Input
              id="checkout-phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="e.g. 98765 43210"
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "checkout-phone-error" : undefined}
              {...register("phone")}
            />
            {errors.phone ? (
              <p
                id="checkout-phone-error"
                className="text-xs text-destructive"
                role="alert"
              >
                {errors.phone.message}
              </p>
            ) : null}
          </div>
        </div>

        {/* Fulfilment method */}
        <fieldset className="flex flex-col gap-1.5">
          <legend className="text-sm font-medium leading-none">How would you like it?</legend>
          <div className="mt-2 grid gap-3 sm:grid-cols-2">
            {(
              [
                {
                  value: "delivery",
                  title: "Home Delivery",
                  note: `${siteConfig.delivery.note} · ${formatPrice(
                    siteConfig.delivery.fee,
                  )}${siteConfig.delivery.freeAbove ? ` (free above ${formatPrice(siteConfig.delivery.freeAbove)})` : ""}`,
                },
                {
                  value: "pickup",
                  title: "Store Pickup",
                  note: "Collect from Shastri Chowk Chauraha, Bilandpur",
                },
              ] as const
            ).map((option) => (
              <label
                key={option.value}
                className={cn(
                  "flex cursor-pointer flex-col gap-1 rounded-xl border p-4 transition-colors",
                  method === option.value
                    ? "border-gold bg-gold/10 shadow-[0_10px_24px_-14px_rgba(212,175,55,0.8)]"
                    : "border-border hover:border-gold/50",
                )}
              >
                <span className="flex items-center gap-2 text-sm font-semibold">
                  <input
                    type="radio"
                    value={option.value}
                    className="accent-[#D4AF37]"
                    {...register("method")}
                  />
                  {option.title}
                </span>
                <span className="text-xs leading-relaxed text-muted-foreground">
                  {option.note}
                </span>
              </label>
            ))}
          </div>
          {errors.method ? (
            <p className="text-xs text-destructive" role="alert">
              {errors.method.message}
            </p>
          ) : null}
        </fieldset>

        {method === "delivery" ? (
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="checkout-address">
              Delivery Address<span className="ml-0.5 text-destructive">*</span>
            </Label>
            <Textarea
              id="checkout-address"
              rows={3}
              placeholder="House / flat, street, landmark, locality in Gorakhpur"
              autoComplete="street-address"
              aria-invalid={Boolean(errors.address)}
              aria-describedby={
                errors.address ? "checkout-address-error" : undefined
              }
              {...register("address")}
            />
            {errors.address ? (
              <p
                id="checkout-address-error"
                className="text-xs text-destructive"
                role="alert"
              >
                {errors.address.message}
              </p>
            ) : null}
          </div>
        ) : null}

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="checkout-date">
              Required Date<span className="ml-0.5 text-destructive">*</span>
            </Label>
            <Input
              id="checkout-date"
              type="date"
              min={minDate}
              aria-invalid={Boolean(errors.deliveryDate)}
              aria-describedby={
                errors.deliveryDate ? "checkout-date-error" : undefined
              }
              {...register("deliveryDate")}
            />
            {errors.deliveryDate ? (
              <p
                id="checkout-date-error"
                className="text-xs text-destructive"
                role="alert"
              >
                {errors.deliveryDate.message}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="checkout-instructions">
              Instructions
              <span className="ml-0.5 text-muted-foreground">(optional)</span>
            </Label>
            <Input
              id="checkout-instructions"
              placeholder="Message on cake, less sweet…"
              aria-invalid={Boolean(errors.instructions)}
              {...register("instructions")}
            />
            {errors.instructions ? (
              <p className="text-xs text-destructive" role="alert">
                {errors.instructions.message}
              </p>
            ) : null}
          </div>
        </div>

        <Button
          type="submit"
          variant="gold"
          size="2xl"
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? (
            <Loader2 className="size-5 animate-spin" />
          ) : (
            <MessageCircle className="size-5" />
          )}
          {isSubmitting ? "Preparing…" : "Place Order on WhatsApp"}
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          No online payment — you confirm the order and pay the bakery directly. Have a
          promo code? Mention it in the WhatsApp message.
        </p>
      </form>

      {/* Order summary */}
      <aside className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-6 shadow-lg lg:sticky lg:top-24">
        <h2 className="font-heading text-xl font-semibold">Order Summary</h2>

        <ul className="flex flex-col divide-y divide-border">
          {cart.map((item) => (
            <li key={item.productId} className="flex gap-3 py-3.5">
              <div className="relative size-14 shrink-0 overflow-hidden rounded-xl border border-border">
                <SmartImage
                  src={item.image}
                  alt={item.name}
                  sizes="56px"
                  fallbackKind="bakery"
                  fallbackLabel={item.name}
                  className="object-cover"
                />
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                <div className="flex items-start justify-between gap-2">
                  <p className="truncate text-sm font-medium">{item.name}</p>
                  <button
                    type="button"
                    aria-label={`Remove ${item.name} from cart`}
                    onClick={() => removeItem(item.productId)}
                    className="text-muted-foreground transition-colors hover:text-destructive"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <QuantityStepper
                    value={item.quantity}
                    min={1}
                    max={99}
                    onChange={(value) => updateQuantity(item.productId, value)}
                  />
                  <span className="text-sm font-semibold tabular-nums">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <dl className="flex flex-col gap-2.5 border-t border-border pt-4 text-sm">
          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">Subtotal</dt>
            <dd className="font-medium tabular-nums">{formatPrice(subtotal)}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">Delivery</dt>
            <dd className="font-medium tabular-nums">
              {deliveryFee === 0 ? (
                <span className="text-green-600 dark:text-green-400">Free</span>
              ) : (
                formatPrice(deliveryFee)
              )}
            </dd>
          </div>
          <div className="flex items-center justify-between border-t border-border pt-3">
            <dt className="font-heading text-lg font-semibold">Total</dt>
            <dd className="font-heading text-lg font-semibold text-gold-deep tabular-nums dark:text-gold">
              {formatPrice(total)}
            </dd>
          </div>
        </dl>

        <p className="rounded-xl border border-dashed border-gold/50 bg-gold/8 p-3 text-xs leading-relaxed text-muted-foreground">
          Final price is confirmed by the bakery before your order is accepted — sample
          prices shown until the store&apos;s real price list is added.
        </p>
      </aside>
    </div>
  );
}
