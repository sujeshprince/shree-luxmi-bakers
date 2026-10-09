"use client";

import * as React from "react";
import { PackageSearch, Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/product-card";
import { RevealGroup, RevealItem } from "@/components/common/reveal";
import { CATEGORY_LABELS, PRODUCT_CATEGORIES, type ProductCategory } from "@/types";
import { products } from "@/data/products";
import { defer } from "@/lib/defer";
import { cn } from "cn";

type SortKey = "featured" | "price-asc" | "price-desc" | "rating";

const SORT_OPTIONS: Array<{ value: SortKey; label: string }> = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

type Filter = "all" | ProductCategory;

const FILTERS: Array<{ value: Filter; label: string }> = [
  { value: "all", label: "All" },
  ...PRODUCT_CATEGORIES.map((category) => ({
    value: category as Filter,
    label: CATEGORY_LABELS[category],
  })),
];

/** Searchable, filterable, sortable product catalogue. */
export function MenuExplorer() {
  // Start at "all" so the full catalogue is rendered in the static export.
  // useSearchParams() would bail the whole component out to an empty
  // Suspense fallback at build time (no products in the HTML). Instead,
  // URL filters like /menu?category=cakes are applied after mount below.
  const [filter, setFilter] = React.useState<Filter>("all");
  const [query, setQuery] = React.useState("");
  const [sort, setSort] = React.useState<SortKey>("featured");

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");
    const q = params.get("q");
    defer(() => {
      if (
        category &&
        (PRODUCT_CATEGORIES as readonly string[]).includes(category)
      ) {
        setFilter(category as Filter);
      }
      if (q) setQuery(q);
    });
  }, []);

  const visible = React.useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const filtered = products.filter((product) => {
      const matchesFilter = filter === "all" || product.category === filter;
      if (!matchesFilter) return false;
      if (!normalized) return true;
      const haystack = [
        product.name,
        product.description,
        product.category,
        ...(product.tags ?? []),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(normalized);
    });

    const sorted = [...filtered];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating);
    return sorted;
  }, [filter, query, sort]);

  const clearAll = () => {
    setFilter("all");
    setQuery("");
    setSort("featured");
  };

  const hasActiveFilters = filter !== "all" || query.trim().length > 0;

  return (
    <div className="flex flex-col gap-6">
      {/* Controls */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Search */}
          <div className="relative w-full sm:max-w-sm">
            <label htmlFor="menu-search" className="sr-only">
              Search products
            </label>
            <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              id="menu-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search cakes, sweets, patties…"
              className="h-11 w-full rounded-full border border-input bg-background pr-10 pl-10 text-sm outline-none transition-colors focus-visible:border-gold focus-visible:ring-3 focus-visible:ring-gold/30"
            />
            {query ? (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => setQuery("")}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-destructive"
              >
                <X className="size-4" />
              </button>
            ) : null}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="size-4 text-muted-foreground" />
            <label htmlFor="menu-sort" className="sr-only">
              Sort products
            </label>
            <select
              id="menu-sort"
              value={sort}
              onChange={(event) => setSort(event.target.value as SortKey)}
              className="h-11 cursor-pointer rounded-full border border-input bg-background px-4 text-sm outline-none transition-colors focus-visible:border-gold focus-visible:ring-3 focus-visible:ring-gold/30"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category pills */}
        <div
          role="group"
          aria-label="Filter by category"
          className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0"
        >
          {FILTERS.map((option) => {
            const active = filter === option.value;
            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(option.value)}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-2 text-xs font-semibold tracking-[0.14em] uppercase transition-all",
                  active
                    ? "border-gold bg-gold text-brown-deep shadow-[0_10px_24px_-12px_rgba(212,175,55,0.9)]"
                    : "border-border bg-background text-muted-foreground hover:border-gold/60 hover:text-gold-deep dark:hover:text-gold",
                )}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Result count */}
      <div className="flex items-center justify-between gap-3 border-b border-border pb-3 text-sm text-muted-foreground">
        <p aria-live="polite">
          {visible.length === 0
            ? "No matches"
            : `Showing ${visible.length} of ${products.length} items`}
          {query.trim() ? ` for “${query.trim()}”` : ""}
        </p>
        {hasActiveFilters ? (
          <button
            type="button"
            onClick={clearAll}
            className="inline-flex items-center gap-1.5 font-medium text-gold-deep transition-colors hover:text-gold dark:text-gold"
          >
            <X className="size-3.5" />
            Clear filters
          </button>
        ) : null}
      </div>

      {/* Grid */}
      {visible.length > 0 ? (
        <RevealGroup
          key={`${filter}-${query}-${sort}`}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          stagger={0.05}
        >
          {visible.map((product) => (
            <RevealItem key={product.id} className="h-full">
              <ProductCard product={product} className="h-full" />
            </RevealItem>
          ))}
        </RevealGroup>
      ) : (
        <div className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-border bg-card px-6 py-16 text-center">
          <span className="flex size-16 items-center justify-center rounded-full border border-gold/40 bg-gold/10">
            <PackageSearch className="size-7 text-gold" />
          </span>
          <div>
            <p className="font-heading text-xl font-semibold">
              No treats match that search
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try a different word — chocolate, gulab, patties — or clear the filters.
            </p>
          </div>
          <Button variant="gold" size="lg" onClick={clearAll}>
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
}
