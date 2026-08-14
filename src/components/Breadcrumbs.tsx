import Link from "next/link";
import { SITE_URL } from "@/lib/site";

export type Crumb = { name: string; href?: string };

// Visible breadcrumb trail + BreadcrumbList JSON-LD. Crumbs without an href are
// context-only (no hub page exists) and are omitted from the schema, which only
// lists linked items — the last linked item (current page) carries its own URL.
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const linked = items.filter((c) => c.href);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: linked.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.href}`,
    })),
  };

  return (
    <nav
      aria-label="Brödsmulor"
      style={{ fontSize: "13px", color: "var(--slate-navy-light)", marginBottom: "18px" }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {items.map((c, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={i}>
            {i > 0 && <span style={{ margin: "0 8px", opacity: 0.5 }}>›</span>}
            {c.href && !isLast ? (
              <Link href={c.href} style={{ color: "var(--indigo)", textDecoration: "none" }}>
                {c.name}
              </Link>
            ) : (
              <span aria-current={isLast ? "page" : undefined}>{c.name}</span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
