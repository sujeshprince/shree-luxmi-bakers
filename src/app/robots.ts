import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

// Required for `output: "export"` (GitHub Pages) — emit a static robots.txt.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/checkout",
    },
    sitemap: `${siteConfig.siteUrl}/sitemap.xml`,
  };
}
