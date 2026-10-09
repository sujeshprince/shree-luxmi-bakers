# 📸 Photo Guide — Shree Luxmi Bakers & Sweets

Drop real photos into `public/images/` using the **exact file names** below and the
website picks them up automatically. Until a photo exists, the site shows an elegant
branded fallback (gold-on-brown panel with an icon and label) — nothing ever looks
broken.

> **Tip:** You don't have to add every photo at once. Add them folder by folder,
> starting with `hero/` and `categories/` — those make the biggest visual difference.

---

## Folder structure

```
public/images/
├── hero/          Homepage hero + hero mosaic
├── categories/    Category cards (Menu section on homepage)
├── products/      Every menu item (40 files)
├── gallery/       Portfolio gallery (16 files)
├── cakes/         Custom-cake feature images
├── festivals/     Festive gifting cards (7 files)
├── about/         Store / story photos
└── brand/         Logo, favicon, social share image
```

---

## 1. Hero — `public/images/hero/`

| File name | Used on | Suggested shot |
|---|---|---|
| `hero-main.jpg` | Homepage hero background | The counter or a cake display, shot wide, left third slightly darker for text overlay (min **2000×1400 px**) |
| `cake-feature.jpg` | Hero mosaic / small tile | One striking celebration cake, close-up |
| `sweets-feature.jpg` | Hero mosaic / small tile | Mithai tray — gulab jamun / kaju katli in warm light |
| `pastry-feature.jpg` | Hero mosaic / small tile | Pastries or patties on a clean board |

## 2. Categories — `public/images/categories/`

All **portrait 4:5**, min **1200×1500 px** — one representative product per category:

`designer-cakes.jpg` · `pastries.jpg` · `cookies.jpg` · `pizza.jpg` ·
`burgers.jpg` · `patties.jpg` · `donuts.jpg` · `chocolates.jpg` ·
`indian-sweets.jpg` · `gift-hampers.jpg`

## 3. Products — `public/images/products/` (40 files)

Square or 4:5, min **1000×1000 px**, one item per file, consistent background across
the whole set (a plain cream/wood surface works beautifully).

**Cakes:** `chocolate-truffle-cake.jpg` · `classic-black-forest.jpg` ·
`red-velvet-cake.jpg` · `pineapple-cake.jpg` · `butterscotch-cake.jpg` ·
`coffee-hazelnut-cake.jpg` · `kit-kat-celebration-cake.jpg` · `photo-custom-cake.jpg`

**Pastries & bakes:** `chocolate-pastry.jpg` · `black-forest-pastry.jpg` ·
`red-velvet-pastry.jpg` · `blueberry-muffin.jpg` · `butter-croissant.jpg` ·
`milk-bread-loaf.jpg`

**Cookies & donuts:** `chocolate-chip-cookies.jpg` · `nankhatai-cookies.jpg` ·
`glazed-donuts.jpg` · `bun-maska.jpg`

**Indian sweets:** `gulab-jamun.jpg` · `rasgulla.jpg` · `kaju-katli.jpg` ·
`motichoor-laddu.jpg` · `soan-papdi.jpg` · `rasmalai.jpg` · `kalakand.jpg`

**Savory:** `veg-patties.jpg` · `paneer-patties.jpg` · `veg-burger.jpg` ·
`paneer-burger.jpg` · `margherita-pizza.jpg` · `veggie-pizza.jpg` · `samosa.jpg`

**Chocolates:** `dark-chocolate-bar.jpg` · `chocolate-box.jpg` ·
`choco-almond-bark.jpg` · `homemade-chocolate-jar.jpg`

**Hampers:** `festival-gift-hamper.jpg` · `sweet-celebration-box.jpg` ·
`wedding-dry-fruit-hamper.jpg` · `chocolate-gift-hamper.jpg`

## 4. Gallery — `public/images/gallery/` (16 files)

Your best work — mixed portrait/landscape is fine (the masonry layout adapts).
Min **1200 px** on the long edge.

`birthday-chocolate.jpg` · `wedding-tier.jpg` · `anniversary-red-velvet.jpg` ·
`kids-cartoon.jpg` · `photo-cake-memory.jpg` · `designer-gold.jpg` ·
`festival-sweet-box.jpg` · `luxury-chocolate.jpg` · `birthday-floral.jpg` ·
`wedding-pink.jpg` · `kids-number.jpg` · `designer-ombre.jpg` ·
`photo-cake-graduation.jpg` · `festival-rakhi.jpg` · `luxury-tier-gold.jpg` ·
`anniversary-hearts.jpg`

> The tag shown on each card (Birthday, Wedding, Kids…) comes from
> `src/data/gallery.ts` — edit the `alt` text there to describe your actual photo.

## 5. Cakes & festivals

| File | Folder | Shot |
|---|---|---|
| `custom-cake-feature.jpg` | `cakes/` | A decorator finishing a custom cake (portrait, 4:5) |
| `diwali.jpg` | `festivals/` | Diwali sweet box / hamper |
| `raksha-bandhan.jpg` | `festivals/` | Rakhi combo |
| `holi.jpg` | `festivals/` | Gujiya / Holi specials |
| `christmas.jpg` | `festivals/` | Plum cake / Christmas bakes |
| `valentines.jpg` | `festivals/` | Heart / couple-themed cake |
| `eid.jpg` | `festivals/` | Sheer khurma / Eid sweets |
| `new-year.jpg` | `festivals/` | New Year cake / party platter |

## 6. About — `public/images/about/`

| File | Shot |
|---|---|
| `story.jpg` | Wide shot of the shop front or interior (4:3, min 1600 px wide) |
| `bakery-story.jpg` | The team at work / ovens / counter (portrait 4:5) |

## 7. Brand — `public/images/brand/`

| File | Used for | Notes |
|---|---|---|
| `logo.png` | Navbar, footer | Transparent PNG, at least **600 px wide** |
| `logo-dark.png` | (Optional) variant for dark backgrounds | |
| `favicon.png` | Browser tab | **48×48** or **96×96** square |
| `og-image.jpg` | Social share preview | **1200×630** — currently auto-generated, this file overrides it |

---

## Shooting checklist ✅

- **Light:** natural daylight or warm bright light; avoid on-camera flash.
- **Background:** uncluttered — cream linen, wooden board, or the shop counter.
- **Angle:** cakes at eye level or 45°, mithai/plates top-down, store front straight-on.
- **Framing:** leave a little breathing room; the layout crops to cards.
- **Format:** JPG (quality 80–90) or PNG. Keep each file **under ~300 KB** so pages
  stay fast — resize before uploading (e.g. 1200 px wide is plenty).
- **Consistency:** same surface/light across the product set makes the menu look
  professional — this matters more than fancy equipment.

## After adding photos

1. Restart the dev server if it's running (`npm run dev`).
2. Hard-refresh the page (Ctrl+Shift+R) — `next/image` caches optimised versions.
3. If a photo looks wrong, check the exact file name matches the table above
   (names are case-sensitive).

Everything still works with **zero photos added** — the branded fallbacks are a
deliberate design, not a bug.
