"use client";

import * as React from "react";
import { Check, Copy, TicketPercent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CountdownTimer } from "@/components/common/countdown";
import { RevealGroup, RevealItem } from "@/components/common/reveal";
import { offers } from "@/data/offers";
import { nextOfferDeadline } from "@/lib/time";
import { defer } from "@/lib/defer";

/** Offer cards with real countdown + copy-to-clipboard promo codes. */
export function OffersBoard() {
  const [deadline, setDeadline] = React.useState<Date | null>(null);
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  // Resolve the real deadline on the client (reading the clock during
  // prerendering is not allowed with Cache Components).
  React.useEffect(() => {
    defer(() => setDeadline(nextOfferDeadline()));
  }, []);

  const copyCode = async (offerId: string, code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedId(offerId);
      window.setTimeout(() => setCopiedId(null), 1800);
    } catch {
      // Clipboard unavailable (e.g. insecure context) — code stays visible to copy manually.
      setCopiedId(null);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Countdown panel */}
      <div className="relative overflow-hidden rounded-3xl border border-gold/40 bg-gradient-to-br from-brown-deep via-brown to-brown-deep p-7 text-center shadow-xl sm:p-9">
        <div aria-hidden className="absolute inset-0 surface-lattice opacity-35" />
        <div className="relative flex flex-col items-center gap-4">
          <p className="text-xs font-semibold tracking-[0.28em] text-gold uppercase">
            This week&apos;s offers end in
          </p>
          <CountdownTimer target={deadline} />
          <p className="max-w-xl text-sm leading-relaxed text-cream/65">
            Codes refresh weekly. Mention the code when you order on WhatsApp or at the
            counter — our team applies it before confirming your bill.
          </p>
        </div>
      </div>

      {/* Offer cards */}
      <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
        {offers.map((offer) => (
          <RevealItem key={offer.id} className="h-full scroll-mt-28">
            <article
              id={offer.id}
              className="group flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/70 hover:shadow-[0_28px_56px_-28px_rgba(212,175,55,0.65)]"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-gold px-3 py-1 text-[0.66rem] font-bold tracking-[0.14em] text-brown-deep uppercase">
                  {offer.highlight}
                </span>
                <TicketPercent className="size-5 text-gold/70" aria-hidden />
              </div>

              <div>
                <h2 className="font-heading text-2xl font-semibold">{offer.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {offer.description}
                </p>
              </div>

              <div className="mt-auto flex flex-col gap-3 border-t border-border pt-4">
                <button
                  type="button"
                  onClick={() => copyCode(offer.id, offer.code)}
                  aria-label={`Copy promo code ${offer.code}`}
                  className="flex items-center justify-between gap-3 rounded-lg border border-dashed border-gold/50 bg-gold/8 px-4 py-2.5 font-mono text-sm font-semibold tracking-widest text-gold-deep transition-colors hover:bg-gold/15 dark:text-gold"
                >
                  {offer.code}
                  {copiedId === offer.id ? (
                    <span className="flex items-center gap-1.5 text-xs font-sans font-medium text-green-600 dark:text-green-400">
                      <Check className="size-3.5" />
                      Copied
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 font-sans text-xs font-medium text-muted-foreground">
                      <Copy className="size-3.5" />
                      Copy
                    </span>
                  )}
                </button>
                <Button
                  asChild
                  variant="gold"
                  size="lg"
                  className="w-full"
                >
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(
                      `Hello! I'd like to claim the "${offer.title}" offer (code: ${offer.code}) from Shree Luxmi Bakers.`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {offer.cta}
                  </a>
                </Button>
              </div>
            </article>
          </RevealItem>
        ))}
      </RevealGroup>

      <p className="text-center text-xs text-muted-foreground">
        Sample offer codes shown for demonstration — configure real promotions in{" "}
        <code className="rounded bg-gold/15 px-1.5 py-0.5 text-[0.7rem] text-gold-deep dark:text-gold">
          src/data/offers.ts
        </code>
        .
      </p>
    </div>
  );
}
