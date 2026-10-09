"use client";

import { MessageCircle } from "lucide-react";
import { DEFAULT_WHATSAPP_MESSAGE, whatsappHref } from "@/lib/links";

/**
 * Floating WhatsApp button (desktop). On mobile the sticky bottom bar
 * carries the WhatsApp action instead, so the two never collide.
 */
export function WhatsAppFloat() {
  return (
    <a
      href={whatsappHref(DEFAULT_WHATSAPP_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed right-4 bottom-28 z-40 hidden size-14 items-center justify-center rounded-full gradient-gold text-brown-deep shadow-[0_14px_36px_-10px_rgba(212,175,55,0.9)] transition-transform hover:scale-110 md:right-6 md:flex md:size-16"
    >
      <span
        className="absolute inset-0 rounded-full bg-gold/50 animate-pulse-ring"
        aria-hidden
      />
      <MessageCircle className="relative size-7 fill-current drop-shadow" />
    </a>
  );
}
