"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Heart,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  ShoppingBag,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { BrandMark } from "@/components/layout/brand-mark";
import { NAV_ITEMS, isActivePath } from "@/lib/navigation";
import { DEFAULT_WHATSAPP_MESSAGE, directionsHref, telHref, whatsappHref } from "@/lib/links";
import { useStore } from "@/lib/store";
import { siteConfig } from "@/config/site";

function BadgeCount({ count }: { count: number }) {
  if (count <= 0) return null;
  return (
    <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[0.6rem] font-bold text-brown-deep">
      {count > 99 ? "99+" : count}
    </span>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const reduced = useReducedMotion();
  const { cartCount, wishlistCount, openCart, openWishlist } = useStore();

  // Track scroll for the transparent → glass transition.
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation (state adjusted during render —
  // see React's "You Might Not Need an Effect" guidance) & Escape.
  const [lastPathname, setLastPathname] = React.useState(pathname);
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setMobileOpen(false);
  }
  React.useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Lock background scroll while the overlay menu is open.
  React.useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const overHero = pathname === "/" && !scrolled;
  const tone = overHero ? "light" : "dark";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          overHero
            ? "border-b border-transparent bg-transparent"
            : "border-b border-border/70 bg-cream/85 shadow-[0_12px_36px_-24px_rgba(62,39,35,0.6)] backdrop-blur-xl dark:bg-charcoal/85"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-8">
          <Link href="/" aria-label={`${siteConfig.name} — home`} className="shrink-0">
            <BrandMark tone={tone} />
          </Link>

          {/* Desktop navigation */}
          <nav aria-label="Primary" className="hidden items-center gap-4 lg:flex xl:gap-5">
            {NAV_ITEMS.map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`group relative py-2 text-[0.78rem] font-medium tracking-[0.12em] uppercase transition-colors xl:text-[0.82rem] ${
                    active
                      ? "text-gold"
                      : overHero
                        ? "text-cream/85 hover:text-cream"
                        : "text-brown/75 hover:text-brown dark:text-cream/75 dark:hover:text-cream"
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden
                    className={`absolute -bottom-0.5 left-0 h-px bg-gold transition-all duration-300 ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-1 sm:gap-2">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Open wishlist"
              onClick={openWishlist}
              className={`relative ${overHero ? "text-cream hover:text-gold" : ""}`}
            >
              <Heart className="size-5" />
              <BadgeCount count={wishlistCount} />
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Open shopping cart"
              onClick={openCart}
              className={`relative ${overHero ? "text-cream hover:text-gold" : ""}`}
            >
              <ShoppingBag className="size-5" />
              <BadgeCount count={cartCount} />
            </Button>

            <ThemeToggle className={overHero ? "text-cream hover:text-gold" : ""} />

            <Button
              asChild
              variant="gold"
              size="lg"
              className="ml-1 hidden xl:inline-flex"
            >
              <Link href="/cakes">Order Now</Link>
            </Button>

            {/* Mobile hamburger */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((open) => !open)}
              className={`lg:hidden ${overHero ? "text-cream hover:text-gold" : ""}`}
            >
              {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Full-screen mobile navigation */}
      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            key="mobile-menu"
            className="fixed inset-0 z-[55] flex flex-col overflow-y-auto gradient-brown surface-lattice lg:hidden"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -18 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
          >
            <div className="flex h-16 items-center justify-between px-4 sm:px-6">
              <Link href="/" onClick={() => setMobileOpen(false)}>
                <BrandMark tone="light" />
              </Link>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                className="text-cream"
              >
                <X className="size-6" />
              </Button>
            </div>

            <nav
              aria-label="Mobile"
              className="flex flex-1 flex-col justify-center gap-1 px-6 py-8"
            >
              {NAV_ITEMS.map((item, index) => {
                const active = isActivePath(pathname, item.href);
                return (
                  <motion.div
                    key={item.href}
                    initial={reduced ? false : { opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + index * 0.05, duration: 0.4 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center justify-between border-b border-cream/10 py-3.5 font-heading text-3xl transition-colors sm:text-4xl ${
                        active ? "text-gold" : "text-cream hover:text-gold-light"
                      }`}
                    >
                      {item.label}
                      <span className="text-xs tracking-[0.3em] text-cream/40">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <div className="grid grid-cols-3 gap-3 px-6 pb-10">
              <a
                href={telHref()}
                className="flex flex-col items-center gap-1.5 rounded-xl border border-gold/40 py-3 text-cream"
              >
                <Phone className="size-5 text-gold" />
                <span className="text-[0.62rem] tracking-[0.18em] uppercase">Call</span>
              </a>
              <a
                href={whatsappHref(DEFAULT_WHATSAPP_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1.5 rounded-xl border border-gold/40 py-3 text-cream"
              >
                <MessageCircle className="size-5 text-gold" />
                <span className="text-[0.62rem] tracking-[0.18em] uppercase">WhatsApp</span>
              </a>
              <a
                href={directionsHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1.5 rounded-xl border border-gold/40 py-3 text-cream"
              >
                <MapPin className="size-5 text-gold" />
                <span className="text-[0.62rem] tracking-[0.18em] uppercase">Directions</span>
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
