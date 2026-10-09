# 🍰 Shree Luxmi Bakers & Sweets — Website

A production-ready, conversion-focused website for **Shree Luxmi Bakers & Sweets**,
Shastri Chowk Chauraha (Near BSNL Office), Bilandpur, Gorakhpur, Uttar Pradesh 273001.

Built with **Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
Framer Motion · shadcn/ui · React Hook Form + Zod**.

### 🔗 Live site

**https://sujeshprince.github.io/shree-luxmi-bakers/**

Hosted on **GitHub Pages** as a fully static export. Every push to `main`
rebuilds and redeploys automatically via
[`.github/workflows/deploy-pages.yml`](./.github/workflows/deploy-pages.yml).

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export → ./out  (GitHub Pages / any static host)
npm run lint     # ESLint
npx tsc --noEmit # type check
```

> The production build is a **static export** (`output: "export"`) so it can be
> served from GitHub Pages with no Node.js server. `npm run build` writes the
> site to `out/`; open `out/index.html` via any static server to preview.

---

## ⚠️ Sample data — read before showing clients

This site ships with **clearly-marked sample content** so nothing looks empty.
Nothing below has been invented as a real business claim, and it must be replaced
or confirmed before going live:

| Data | Where | Status |
|---|---|---|
| Product list & prices (40 items) | `src/data/products.ts` | **Sample** — replace with the real menu & prices |
| Customer reviews | `src/data/testimonials.ts` | **Sample** (`sample: true`, badged in UI) |
| Offer codes | `src/data/offers.ts` | **Sample** — countdown itself ticks to a real timestamp (next Sunday 23:59 IST) |
| Opening hours | `src/config/site.ts` | Sample — confirm with the store |
| Delivery fee / free-above | `src/config/site.ts` | Sample — confirm with the store |
| Photos | `public/images/**` | None added yet → branded fallbacks render automatically |
| Address | `src/config/site.ts` | **Real** (as supplied) |
| Phone / WhatsApp / email / socials | `src/config/site.ts` | **Blank on purpose** — no numbers were invented |

The footer, reviews page, offers page and gallery all display visible "sample"
disclaimers until real data replaces them.

---

## ⚙️ Configuration — `src/config/site.ts`

This file is the **single source of truth** for business information:

```ts
phone: "",        // e.g. "+919876543210"  → enables every Call button
whatsapp: "",     // digits only, e.g. "919876543210" → enables direct WhatsApp chat
email: "",        // e.g. "hello@shreeluxmibakers.in"
socials: { instagram: "", facebook: "" },  // blank = icon hidden
```

Fill any of these in and the corresponding buttons/links activate **everywhere**
automatically — navbar, footer, floating button, contact page, checkout. While
blank, phone/WhatsApp buttons politely route to the contact page or open WhatsApp
without a number (still functional, never broken).

Other keys: `hours` (IST), `delivery`, `formEndpoint`, `siteUrl`.

### Environment

```bash
# Absolute URL used for canonical / OpenGraph / sitemap
NEXT_PUBLIC_SITE_URL=https://sujeshprince.github.io/shree-luxmi-bakers

# Repo sub-path the site is served from (GitHub Pages project sites).
# Leave unset for local dev / custom domains at the root.
NEXT_PUBLIC_BASE_PATH=/shree-luxmi-bakers
```

Both are injected by the deploy workflow. Locally they default to
`http://localhost:3000` at the root (no domain was invented).

---

## 📝 Forms (contact / cake enquiry / newsletter)

All forms are fully validated (Zod) with loading, error and success states.

- **`siteConfig.formEndpoint` set** → submissions POST to that URL
  (Formspree, your API, etc.). JSON, or `multipart/form-data` when a file is attached.
- **`formEndpoint` blank (current state)** → **demo mode**: validation and success UI
  work, the UI says plainly that no endpoint is connected, and every success panel
  offers a **real WhatsApp hand-off** so the customer's message still reaches the bakery.

Nothing ever pretends to have been sent when it wasn't.

## 🛒 Checkout

There is **no payment gateway and no database** (by design). The flow is:

cart → details form → structured WhatsApp message (items, quantities, totals,
address, date, instructions) opened in `wa.me`.

The customer sends the message; the bakery confirms availability and takes payment
directly.

## 🗺️ Maps

Keyless Google Maps: `?q=…&output=embed` for the iframe, `maps/dir` for
directions. No API key required. Custom embed/place URLs can be overridden in
`siteConfig`.

---

## 📁 Project structure

```
src/
├── app/                  # Routes: /, about, menu, cakes, gallery, offers,
│   │                     # reviews, contact, checkout, not-found
│   ├── layout.tsx        # Fonts, metadata, JSON-LD, global chrome
│   ├── robots.ts  sitemap.ts
├── components/
│   ├── home/             # Homepage sections
│   ├── product/          # Product card, menu explorer, quick view
│   ├── cart/             # Cart & wishlist drawers
│   ├── gallery/          # Grid + lightbox (next/prev/counter/zoom/swipe)
│   ├── checkout/  offers/  forms/  common/  ui/
├── config/site.ts        # ← business info lives here
├── data/                 # products, categories, testimonials, offers, gallery, festivals
├── lib/                  # store (cart/wishlist), whatsapp, links, time, submit, format
└── types.ts
public/images/            # Add real photos here (see PHOTO_GUIDE.md)
public/og.png             # Social share image (1200×630)
```

## ✨ Features

- Responsive navigation + full-screen mobile menu
- Menu search, category filter, sorting, URL params (`?category=&q=`)
- Cart with quantity control + wishlist (persisted in `localStorage`)
- Quick-view product modal
- Custom cake enquiry form with optional reference-image upload
- Gallery lightbox: keyboard arrows, counter, zoom, touch swipe
- Testimonials carousel, offer countdown (real timestamps), copy-to-clipboard codes
- Light/dark mode, scroll progress, back-to-top, preloader, custom cursor
- Floating WhatsApp + mobile sticky CTA bar
- SEO: metadata, canonical, OpenGraph/Twitter image, robots, sitemap,
  Schema.org `Bakery` JSON-LD, Gorakhpur-local keywords
- Accessibility: focus rings, ARIA roles/labels, keyboard operability,
  `prefers-reduced-motion` respected

## 🖼️ Photos

See **[PHOTO_GUIDE.md](./PHOTO_GUIDE.md)** for every expected file name, shot
list and sizing. Photos are optional — branded fallbacks render until they exist.

## 🚀 Deploy (GitHub Pages)

The site is a **static export**, so it deploys to GitHub Pages for free with no server.

**Automatic:** push to `main` → GitHub Actions
([`.github/workflows/deploy-pages.yml`](./.github/workflows/deploy-pages.yml))
builds `out/` and publishes it to
**https://sujeshprince.github.io/shree-luxmi-bakers/**.

One-time repo setup (already done for this repo): **Settings → Pages → Build and
deployment → Source: GitHub Actions**.

**Before showing the bakery owner:**

1. Fill phone / WhatsApp / email in `src/config/site.ts`.
2. Replace sample products / reviews / offers / hours with real data.
3. Add photos per `PHOTO_GUIDE.md`.
4. (Optional) Set a custom domain and update `NEXT_PUBLIC_SITE_URL`.

> If you add a custom domain served at the root (not a repo sub-path), remove
> `NEXT_PUBLIC_BASE_PATH` from the workflow so assets aren't prefixed.
