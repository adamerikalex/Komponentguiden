import type { MetadataRoute } from "next";
import { categoryPages } from "content/categories";
import { getAllPosts } from "@/lib/posts";

// When komponentguiden.se is purchased: set NEXT_PUBLIC_SITE_URL in Vercel env
// (Production) and redeploy — sitemap, robots and canonicals follow automatically.
const BASE =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://komponentguiden.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/concierge",
    "/om-oss",
    "/akut",
    "/support",
    "/sekretesspolicy",
    "/blogg",
  ].map((path) => ({
    url: `${BASE}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const categoryRoutes = categoryPages.map((p) => ({
    url: `${BASE}/${p.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blogRoutes = getAllPosts().map((post) => ({
    url: `${BASE}/blogg/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...categoryRoutes, ...blogRoutes];
}
