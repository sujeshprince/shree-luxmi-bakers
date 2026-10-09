import type { CategoryCard } from "@/types";

/**
 * Category showcase cards for the homepage.
 * Each card deep-links into /menu with the right filter applied.
 * Images: /public/images/categories/ (see PHOTO_GUIDE.md).
 */

export const categoryCards: CategoryCard[] = [
  {
    slug: "designer-cakes",
    name: "Designer Cakes",
    description: "Custom creations for birthdays, weddings & more",
    image: "/images/categories/designer-cakes.jpg",
    menuCategory: "cakes",
    query: "custom",
  },
  {
    slug: "pastries",
    name: "Pastries",
    description: "Everyday indulgence, baked fresh",
    image: "/images/categories/pastries.jpg",
    menuCategory: "pastries",
  },
  {
    slug: "cookies",
    name: "Cookies",
    description: "Crisp, chewy & buttery batches",
    image: "/images/categories/cookies.jpg",
    menuCategory: "bakery",
    query: "cookie",
  },
  {
    slug: "pizza",
    name: "Pizza",
    description: "Hand-stretched & oven-fresh",
    image: "/images/categories/pizza.jpg",
    menuCategory: "snacks",
    query: "pizza",
  },
  {
    slug: "burgers",
    name: "Burgers",
    description: "Toasted buns, loaded fillings",
    image: "/images/categories/burgers.jpg",
    menuCategory: "snacks",
    query: "burger",
  },
  {
    slug: "patties",
    name: "Patties",
    description: "Flaky, golden, straight from the oven",
    image: "/images/categories/patties.jpg",
    menuCategory: "snacks",
    query: "patties",
  },
  {
    slug: "donuts",
    name: "Donuts",
    description: "Pillowy glazes & chocolate dips",
    image: "/images/categories/donuts.jpg",
    menuCategory: "bakery",
    query: "donut",
  },
  {
    slug: "chocolates",
    name: "Chocolates",
    description: "Handcrafted bars, bark & pralines",
    image: "/images/categories/chocolates.jpg",
    menuCategory: "chocolates",
  },
  {
    slug: "indian-sweets",
    name: "Indian Sweets",
    description: "Fresh mithai made every morning",
    image: "/images/categories/indian-sweets.jpg",
    menuCategory: "sweets",
  },
  {
    slug: "gift-hampers",
    name: "Gift Hampers",
    description: "Elegant boxes for every occasion",
    image: "/images/categories/gift-hampers.jpg",
    menuCategory: "gifts",
  },
];
