/** Shared domain types for the storefront. */

export const PRODUCT_CATEGORIES = [
  "cakes",
  "pastries",
  "sweets",
  "bakery",
  "snacks",
  "chocolates",
  "gifts",
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  cakes: "Cakes",
  pastries: "Pastries",
  sweets: "Sweets",
  bakery: "Bakery",
  snacks: "Snacks",
  chocolates: "Chocolates",
  gifts: "Gifts",
};

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  /** Price in ₹ (sample data — confirm with the store). */
  price: number;
  /** Original price in ₹ when a discount badge should show. */
  mrp?: number;
  category: ProductCategory;
  /** Path under /public, e.g. "/images/products/chocolate-truffle-cake.jpg" */
  image: string;
  rating: number;
  reviews: number;
  /** Small badge, e.g. "Bestseller" | "New" | "Top Rated" */
  badge?: string;
  inStock: boolean;
  /** Extra search keywords so filters feel smart. */
  tags?: string[];
}

export interface CategoryCard {
  slug: string;
  name: string;
  description: string;
  image: string;
  /** Menu page filter target. */
  menuCategory: ProductCategory;
  /** Optional refinement query, e.g. "donut". */
  query?: string;
}

export interface GalleryItem {
  id: string;
  image: string;
  alt: string;
  tag: GalleryTag;
  /** Tailwind aspect class for the masonry tile. */
  aspect: string;
}

export const GALLERY_TAGS = [
  "Birthday",
  "Wedding",
  "Anniversary",
  "Kids",
  "Photo Cakes",
  "Designer",
  "Festival",
  "Luxury",
] as const;

export type GalleryTag = (typeof GALLERY_TAGS)[number];

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  review: string;
  rating: number;
  /** Initials-based avatar (no invented photos of real people). */
  initials: string;
  /** Always true until genuine reviews are supplied. */
  sample: boolean;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  highlight: string;
  /** Sample promo code until the store supplies real ones. */
  code: string;
  /** Highlighted offer that receives the hero countdown. */
  featured?: boolean;
  cta: string;
}

export interface Festival {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  accent: string;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}
