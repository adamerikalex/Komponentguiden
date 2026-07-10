// Single source of truth for the site's base URL. Comes from the
// NEXT_PUBLIC_SITE_URL env var (set in Vercel once the custom domain is live),
// with the vercel.app deployment as fallback. Used by metadataBase, sitemap,
// canonicals and JSON-LD so they all switch to the real domain automatically.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://komponentguiden.vercel.app";
