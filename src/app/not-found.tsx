import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sidan kunde inte hittas – Komponentguiden",
  robots: { index: false, follow: true },
};

const NAVY = "var(--slate-navy, #1e2633)";
const NAVY_LIGHT = "var(--slate-navy-light, #334155)";
const INDIGO = "var(--indigo, #635bff)";

const suggestions: { label: string; href: string }[] = [
  { label: "Startsidan", href: "/" },
  { label: "Starta en matchning", href: "/#intent-form" },
  { label: "CNC-bearbetning", href: "/cnc-bearbetning" },
  { label: "Plåt & svets", href: "/plat-och-svets" },
  { label: "Resurser & guider", href: "/blogg" },
  { label: "Om oss", href: "/om-oss" },
];

export default function NotFound() {
  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "96px 24px 120px", textAlign: "center" }}>
      <p
        style={{
          fontFamily: "var(--font-roboto-mono, monospace)",
          color: INDIGO,
          fontSize: 14,
          letterSpacing: "0.08em",
          margin: 0,
        }}
      >
        FEL 404
      </p>
      <h1 style={{ color: NAVY, fontSize: 32, margin: "12px 0 0", lineHeight: 1.2 }}>
        Sidan kunde inte hittas
      </h1>
      <p style={{ color: NAVY_LIGHT, fontSize: 16, lineHeight: 1.6, margin: "16px auto 0", maxWidth: 460 }}>
        Länken kan vara felstavad eller så har sidan flyttats. Här är några vägar vidare —
        eller starta en kostnadsfri matchning direkt.
      </p>

      <div style={{ marginTop: 32 }}>
        <Link href="/#intent-form" className="btn-primary" style={{ padding: "14px 24px", fontSize: 16 }}>
          Starta matchning →
        </Link>
      </div>

      <div
        style={{
          marginTop: 40,
          display: "flex",
          flexWrap: "wrap",
          gap: "10px 20px",
          justifyContent: "center",
        }}
      >
        {suggestions.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            style={{ color: INDIGO, fontSize: 14, textDecoration: "none" }}
          >
            {s.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
