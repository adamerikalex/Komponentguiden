import type { MetadataRoute } from "next";

const BASE =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://komponentguiden.vercel.app";

// Allow all crawlers, explicitly including AI-search bots (GPTBot, ClaudeBot,
// PerplexityBot etc. follow the wildcard) — deliberate, per SEO/AI-search strategy.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/forslag"] },
    sitemap: `${BASE}/sitemap.xml`,
  };
}
