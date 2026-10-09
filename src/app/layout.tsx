import type { Metadata, Viewport } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/config/site";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Preloader } from "@/components/layout/preloader";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { BackToTop } from "@/components/layout/back-to-top";
import { WhatsAppFloat } from "@/components/layout/whatsapp-float";
import { MobileStickyCTA } from "@/components/layout/mobile-sticky-cta";
import { CustomCursor } from "@/components/layout/custom-cursor";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { WishlistDrawer } from "@/components/cart/wishlist-drawer";
import { QuickViewModal } from "@/components/product/quick-view-modal";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const siteTitle = `${siteConfig.name} — Premium Cakes, Bakery & Indian Sweets in Gorakhpur`;

/**
 * Absolute (base-path-aware) URLs. The site is deployed under a GitHub
 * Pages sub-path, so the Open Graph image must be referenced with its full
 * path — relying on the file convention double-prefixes basePath.
 */
const siteUrl = siteConfig.siteUrl.replace(/\/$/, "");
const ogImageUrl = `${siteUrl}/og.png`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "bakery in Gorakhpur",
    "best cakes in Gorakhpur",
    "birthday cakes Gorakhpur",
    "custom cakes Gorakhpur",
    "Indian sweets Gorakhpur",
    "bakery near Shastri Chowk",
    "cake shop Bilandpur",
    "fresh mithai Gorakhpur",
    "eggless cakes Gorakhpur",
    "party cakes Gorakhpur",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: siteConfig.name,
    title: siteTitle,
    description: siteConfig.description,
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — premium cakes and Indian sweets`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteConfig.description,
    images: [{ url: ogImageUrl, alt: `${siteConfig.name} — premium cakes and Indian sweets` }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFF8E7" },
    { media: "(prefers-color-scheme: dark)", color: "#1C1C1C" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${playfair.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Providers>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brown focus:px-4 focus:py-2 focus:text-cream"
          >
            Skip to content
          </a>
          <JsonLd />
          <ScrollProgress />
          <Preloader />
          <Navbar />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
          <CartDrawer />
          <WishlistDrawer />
          <QuickViewModal />
          <BackToTop />
          <WhatsAppFloat />
          <MobileStickyCTA />
          <CustomCursor />
        </Providers>
      </body>
    </html>
  );
}
