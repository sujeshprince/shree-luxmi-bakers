"use client";

import Link from "next/link";
import { Cake, MessageCircle, Phone } from "lucide-react";
import { DEFAULT_WHATSAPP_MESSAGE, telHref, whatsappHref } from "@/lib/links";

/**
 * Sticky bottom conversion bar on mobile:
 * ORDER CAKE · WHATSAPP · CALL
 */
export function MobileStickyCTA() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-gold/25 bg-brown-deep/95 backdrop-blur-md md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="grid grid-cols-3 divide-x divide-gold/20">
        <Link
          href="/cakes"
          className="flex min-h-14 flex-col items-center justify-center gap-1 text-cream active:bg-black/20"
        >
          <Cake className="size-5 text-gold" />
          <span className="text-[0.68rem] font-semibold tracking-[0.14em] uppercase">
            Order Cake
          </span>
        </Link>
        <a
          href={whatsappHref(DEFAULT_WHATSAPP_MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-14 flex-col items-center justify-center gap-1 text-cream active:bg-black/20"
        >
          <MessageCircle className="size-5 text-gold" />
          <span className="text-[0.68rem] font-semibold tracking-[0.14em] uppercase">
            WhatsApp
          </span>
        </a>
        <a
          href={telHref()}
          className="flex min-h-14 flex-col items-center justify-center gap-1 text-cream active:bg-black/20"
        >
          <Phone className="size-5 text-gold" />
          <span className="text-[0.68rem] font-semibold tracking-[0.14em] uppercase">
            Call
          </span>
        </a>
      </div>
    </div>
  );
}
