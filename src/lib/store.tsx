"use client";

import * as React from "react";
import { siteConfig } from "@/config/site";
import { defer } from "@/lib/defer";
import type { CartItem, Product } from "@/types";

const CART_KEY = "slb:cart:v1";
const WISHLIST_KEY = "slb:wishlist:v1";

interface StoreValue {
  cart: CartItem[];
  wishlist: string[];
  cartCount: number;
  wishlistCount: number;
  subtotal: number;
  deliveryFee: number;
  total: number;

  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;

  wishlistOpen: boolean;
  openWishlist: () => void;
  closeWishlist: () => void;

  quickViewId: string | null;
  openQuickView: (id: string) => void;
  closeQuickView: () => void;

  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;

  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
}

const StoreContext = React.createContext<StoreValue | null>(null);

function readStored<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as T) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = React.useState<CartItem[]>([]);
  const [wishlist, setWishlist] = React.useState<string[]>([]);
  const [cartOpen, setCartOpen] = React.useState(false);
  const [wishlistOpen, setWishlistOpen] = React.useState(false);
  const [quickViewId, setQuickViewId] = React.useState<string | null>(null);
  const hydrated = React.useRef(false);

  // Hydrate from localStorage after mount (avoids SSR mismatch). The
  // write is deferred so the effect body never sets state synchronously.
  React.useEffect(() => {
    defer(() => {
      setCart(readStored<CartItem[]>(CART_KEY, []));
      setWishlist(readStored<string[]>(WISHLIST_KEY, []));
      hydrated.current = true;
    });
  }, []);

  React.useEffect(() => {
    if (hydrated.current) {
      window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
    }
  }, [cart]);

  React.useEffect(() => {
    if (hydrated.current) {
      window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
    }
  }, [wishlist]);

  const addItem = React.useCallback(
    (product: Product, quantity = 1) => {
      setCart((prev) => {
        const existing = prev.find((item) => item.productId === product.id);
        if (existing) {
          return prev.map((item) =>
            item.productId === product.id
              ? { ...item, quantity: Math.min(item.quantity + quantity, 99) }
              : item,
          );
        }
        return [
          ...prev,
          {
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity,
          },
        ];
      });
      setCartOpen(true);
    },
    [],
  );

  const removeItem = React.useCallback((productId: string) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
  }, []);

  const updateQuantity = React.useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((item) => item.productId !== productId));
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity: Math.min(quantity, 99) } : item,
      ),
    );
  }, []);

  const clearCart = React.useCallback(() => setCart([]), []);

  const toggleWishlist = React.useCallback((productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  }, []);

  const isWishlisted = React.useCallback(
    (productId: string) => wishlist.includes(productId),
    [wishlist],
  );

  const subtotal = React.useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart],
  );

  const deliveryFee = React.useMemo(() => {
    if (cart.length === 0) return 0;
    if (siteConfig.delivery.fee <= 0) return 0;
    return subtotal >= siteConfig.delivery.freeAbove ? 0 : siteConfig.delivery.fee;
  }, [cart.length, subtotal]);

  const value = React.useMemo<StoreValue>(
    () => ({
      cart,
      wishlist,
      cartCount: cart.reduce((sum, item) => sum + item.quantity, 0),
      wishlistCount: wishlist.length,
      subtotal,
      deliveryFee,
      total: subtotal + deliveryFee,
      cartOpen,
      openCart: () => setCartOpen(true),
      closeCart: () => setCartOpen(false),
      wishlistOpen,
      openWishlist: () => setWishlistOpen(true),
      closeWishlist: () => setWishlistOpen(false),
      quickViewId,
      openQuickView: (id: string) => setQuickViewId(id),
      closeQuickView: () => setQuickViewId(null),
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      toggleWishlist,
      isWishlisted,
    }),
    [
      cart,
      wishlist,
      subtotal,
      deliveryFee,
      cartOpen,
      wishlistOpen,
      quickViewId,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      toggleWishlist,
      isWishlisted,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreValue {
  const ctx = React.useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within <StoreProvider>");
  return ctx;
}
