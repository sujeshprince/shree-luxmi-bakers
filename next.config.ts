import path from "node:path";
import type { NextConfig } from "next";

/**
 * GitHub Pages serves this project from a repository sub-path, e.g.
 *   https://sujeshprince.github.io/shree-luxmi-bakers/
 * so the deployed build needs a base path. The deploy workflow injects
 * NEXT_PUBLIC_BASE_PATH; local dev and local builds stay at the root.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Emit a fully static site into `out/` — required for GitHub Pages,
  // which cannot run a Node.js server.
  output: "export",

  // GitHub Pages can't run Next.js's on-demand image optimizer.
  images: { unoptimized: true },

  // Add the repo sub-path to every route/asset in the deployed build.
  // (basePath already prefixes /_next assets — do NOT also set assetPrefix.)
  ...(basePath ? { basePath } : {}),

  // Emit `/about/index.html` style files so Pages resolves clean URLs.
  trailingSlash: true,

  turbopack: {
    // Pin the workspace root to this project (a parent folder also has a
    // lockfile, which otherwise makes Next infer the wrong root).
    root: path.resolve(import.meta.dirname),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
