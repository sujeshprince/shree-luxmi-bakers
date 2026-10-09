import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

const BASE = siteConfig.siteUrl.replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: Array<{
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }> = [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/menu", changeFrequency: "weekly", priority: 0.9 },
    { path: "/cakes", changeFrequency: "weekly", priority: 0.9 },
    { path: "/offers", changeFrequency: "daily", priority: 0.8 },
    { path: "/gallery", changeFrequency: "weekly", priority: 0.7 },
    { path: "/about", changeFrequency: "monthly", priority: 0.6 },
    { path: "/reviews", changeFrequency: "weekly", priority: 0.6 },
    { path: "/contact", changeFrequency: "monthly", priority: 0.7 },
  ];

  return pages.map((page) => ({
    url: `${BASE}${page.path}`,
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
