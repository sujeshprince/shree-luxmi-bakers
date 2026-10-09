"use client";

import Link from "next/link";
import {
  motion,
  useReducedMotion,
} from "framer-motion";
import { ChevronDown, MapPin, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SmartImage } from "@/components/common/smart-image";
import { DEFAULT_WHATSAPP_MESSAGE, directionsHref, telHref, whatsappHref } from "@/lib/links";

const HEADLINE = ["Freshly", "Baked", "Happiness", "Every", "Day"];

/** Subtle floating gold particles (decorative, reduced-motion aware). */
const PARTICLES = [
  { left: "6%", top: "18%", size: 7, delay: 0 },
  { left: "14%", top: "64%", size: 5, delay: 1.2 },
  { left: "23%", top: "30%", size: 4, delay: 2.1 },
  { left: "34%", top: "78%", size: 6, delay: 0.6 },
  { left: "48%", top: "14%", size: 4, delay: 1.8 },
  { left: "57%", top: "55%", size: 5, delay: 2.6 },
  { left: "66%", top: "24%", size: 6, delay: 0.3 },
  { left: "74%", top: "70%", size: 4, delay: 1.5 },
  { left: "83%", top: "40%", size: 7, delay: 2.9 },
  { left: "91%", top: "12%", size: 5, delay: 0.9 },
  { left: "88%", top: "82%", size: 4, delay: 2.3 },
  { left: "42%", top: "44%", size: 5, delay: 3.2 },
];

const QUICK_ACTIONS = [
  { label: "Call Now", href: telHref(), icon: Phone, external: false },
  {
    label: "WhatsApp",
    href: whatsappHref(DEFAULT_WHATSAPP_MESSAGE),
    icon: MessageCircle,
    external: true,
  },
  { label: "Get Directions", href: directionsHref(), icon: MapPin, external: true },
];

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden gradient-brown text-cream"
    >
      {/* Background: optional photo + designed fallback beneath it */}
      <SmartImage
        src="/images/hero/hero-main.jpg"
        alt="Freshly decorated celebration cake in warm bakery light"
        sizes="100vw"
        loading="eager"
        fetchPriority="high"
        wrapperClassName="bg-transparent"
        className="opacity-55"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-brown-deep via-brown-deep/88 to-brown-deep/45"
      />
      <div aria-hidden className="absolute inset-0 surface-lattice opacity-30" />
      <div
        aria-hidden
        className="absolute -top-32 -left-32 size-96 rounded-full bg-gold/12 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -right-24 -bottom-40 size-[28rem] rounded-full bg-gold/10 blur-3xl"
      />

      {/* Floating particles */}
      {!reduced
        ? PARTICLES.map((particle, index) => (
            <span
              key={index}
              aria-hidden
              className="absolute rounded-full bg-gold/50 animate-float-soft"
              style={{
                left: particle.left,
                top: particle.top,
                width: particle.size,
                height: particle.size,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${6 + (index % 4)}s`,
              }}
            />
          ))
        : null}

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-14 px-4 pt-32 pb-28 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:pt-36 lg:pb-24">
        {/* Copy */}
        <div className="flex flex-col items-start gap-6">
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-[0.68rem] font-medium tracking-[0.24em] text-gold-light uppercase"
          >
            <MapPin className="size-3.5" />
            Shastri Chowk · Bilandpur · Gorakhpur
          </motion.p>

          <h1 className="font-heading text-[2.6rem] leading-[1.04] font-semibold sm:text-6xl lg:text-7xl xl:text-[4.9rem]">
            {HEADLINE.map((word, index) => (
              <motion.span
                key={word}
                initial={reduced ? false : { opacity: 0, y: 34 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.75,
                  delay: 0.25 + index * 0.09,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`mr-[0.28em] inline-block ${
                  word === "Happiness" ? "gold-text" : "text-cream"
                }`}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75 }}
            className="text-sm font-medium tracking-[0.2em] text-cream/85 uppercase sm:text-base"
          >
            Premium Cakes <span className="mx-1 text-gold">✦</span> Delicious Bakery{" "}
            <span className="mx-1 text-gold">✦</span> Traditional Indian Sweets
          </motion.p>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.88 }}
            className="max-w-xl text-base leading-relaxed text-cream/70 sm:text-lg"
          >
            Crafted with love, premium ingredients, and a passion for making every
            celebration sweeter.
          </motion.p>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1 }}
            className="mt-2 flex flex-wrap gap-4"
          >
            <Button asChild variant="gold" size="2xl">
              <Link href="/cakes">Order a Cake</Link>
            </Button>
            <Button
              asChild
              variant="goldOutline"
              size="2xl"
              className="border-cream/45 text-cream hover:border-gold hover:text-brown-deep"
            >
              <Link href="/menu">Explore Menu</Link>
            </Button>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.15 }}
            className="mt-3 flex flex-wrap gap-3"
          >
            {QUICK_ACTIONS.map((action) => (
              <a
                key={action.label}
                href={action.href}
                {...(action.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="inline-flex items-center gap-2 rounded-full border border-cream/25 px-4 py-2 text-sm text-cream/85 transition-all hover:border-gold hover:bg-gold/10 hover:text-gold-light"
              >
                <action.icon className="size-4 text-gold" />
                {action.label}
              </a>
            ))}
          </motion.div>
        </div>

        {/* Floating imagery */}
        <div className="relative mx-auto hidden aspect-square w-full max-w-lg lg:block">
          <div
            aria-hidden
            className="absolute top-1/2 left-1/2 size-[108%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/20"
          />
          <div
            aria-hidden
            className="absolute top-1/2 left-1/2 size-[86%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/12"
          />

          <motion.div
            initial={reduced ? false : { opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="absolute top-0 right-0 w-[64%] overflow-hidden rounded-3xl border border-gold/35 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)] animate-float-soft"
          >
            <div className="relative aspect-4/5">
              <SmartImage
                src="/images/hero/cake-feature.jpg"
                alt="Premium chocolate truffle cake"
                sizes="(max-width: 1024px) 50vw, 30vw"
                fallbackKind="cake"
                fallbackLabel="Designer Cakes"
              />
            </div>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.75 }}
            className="absolute bottom-4 left-0 w-[50%] overflow-hidden rounded-2xl border border-gold/35 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)] animate-float-soft"
            style={{ animationDelay: "1.6s" }}
          >
            <div className="relative aspect-square">
              <SmartImage
                src="/images/hero/sweets-feature.jpg"
                alt="Fresh Indian sweets"
                sizes="(max-width: 1024px) 40vw, 22vw"
                fallbackKind="sweets"
                fallbackLabel="Fresh Mithai"
              />
            </div>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 1 }}
            className="absolute top-10 left-2 w-[36%] overflow-hidden rounded-2xl border border-gold/35 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)] animate-float-soft"
            style={{ animationDelay: "3.1s" }}
          >
            <div className="relative aspect-square">
              <SmartImage
                src="/images/hero/pastry-feature.jpg"
                alt="Freshly baked pastries"
                sizes="15vw"
                fallbackKind="bakery"
                fallbackLabel="Daily Bakes"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#trust"
        aria-label="Scroll to highlights"
        className="absolute bottom-20 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1.5 text-cream/55 transition-colors hover:text-gold md:flex"
      >
        <span className="text-[0.6rem] tracking-[0.3em] uppercase">Scroll</span>
        <ChevronDown className="size-5 animate-bounce" />
      </a>
    </section>
  );
}
