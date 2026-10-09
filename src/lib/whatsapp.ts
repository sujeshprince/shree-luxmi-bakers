import { formatPrice } from "@/lib/format";
import type { CartItem } from "@/types";

/**
 * Builds the structured WhatsApp order message used by the cart,
 * checkout page and "Order via WhatsApp" buttons.
 * All customer-provided details are included as typed by the customer.
 */

export interface CheckoutDetails {
  name: string;
  phone: string;
  address: string;
  deliveryDate: string;
  instructions?: string;
}

function itemLines(items: CartItem[]): string[] {
  return items.map(
    (item, index) =>
      `${index + 1}. ${item.name} x ${item.quantity} — ${formatPrice(
        item.price * item.quantity,
      )}`,
  );
}

export function cartSummaryText(
  items: CartItem[],
  totals: { subtotal: number; delivery: number; total: number },
): string {
  const lines = itemLines(items);
  return [
    "*NEW ORDER — Shree Luxmi Bakers & Sweets*",
    "",
    ...lines,
    "",
    `Subtotal: ${formatPrice(totals.subtotal)}`,
    `Delivery: ${totals.delivery === 0 ? "Free" : formatPrice(totals.delivery)}`,
    `*Total: ${formatPrice(totals.total)}*`,
  ].join("\n");
}

export function buildCheckoutMessage(
  items: CartItem[],
  totals: { subtotal: number; delivery: number; total: number },
  details: CheckoutDetails,
): string {
  return [
    "*NEW ORDER — Shree Luxmi Bakers & Sweets*",
    "",
    `*Customer:* ${details.name}`,
    `*Phone:* ${details.phone}`,
    `*Address:* ${details.address}`,
    `*Delivery date:* ${formatDeliveryDate(details.deliveryDate)}`,
    "",
    "*Items:*",
    ...itemLines(items).map((l) => `  ${l}`),
    "",
    `Subtotal: ${formatPrice(totals.subtotal)}`,
    `Delivery: ${totals.delivery === 0 ? "Free" : formatPrice(totals.delivery)}`,
    `*Total: ${formatPrice(totals.total)}*`,
    details.instructions
      ? `*Instructions:* ${details.instructions}`
      : "*Instructions:* None",
  ].join("\n");
}

export function buildProductEnquiry(product: {
  name: string;
  price: number;
}): string {
  return `Hi! I'm interested in ${product.name} (${formatPrice(
    product.price,
  )}). Could you share availability and delivery details?`;
}

export function buildCakeEnquiry(summary: string): string {
  return `Hi! I'd like to enquire about a custom cake:\n${summary}`;
}

/** "2026-10-14" → "Tue, 14 Oct 2026" (falls back to raw string). */
export function formatDeliveryDate(iso: string): string {
  if (!iso) return "As soon as possible";
  const parsed = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return iso;
  return parsed.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
