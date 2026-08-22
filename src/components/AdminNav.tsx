import Link from "next/link";

// Segmented toggle shared across the admin views: demand (buyer intents) on the
// left, supply (supplier profiles) on the right.
export default function AdminNav({ active }: { active: "demand" | "supply" }) {
  const seg = (isActive: boolean): React.CSSProperties => ({
    padding: "8px 18px",
    fontSize: 14,
    fontWeight: 600,
    textDecoration: "none",
    borderRadius: 7,
    color: isActive ? "#ffffff" : "var(--slate-navy-light, #334155)",
    background: isActive ? "var(--indigo, #635bff)" : "transparent",
  });
  return (
    <div
      style={{
        display: "inline-flex",
        gap: 4,
        padding: 4,
        background: "var(--surface, #ffffff)",
        border: "1px solid var(--border, #e2e8f0)",
        borderRadius: 10,
        marginBottom: 24,
      }}
    >
      <Link href="/admin" style={seg(active === "demand")}>Efterfrågan</Link>
      <Link href="/admin/leverantorer" style={seg(active === "supply")}>Leverantörer</Link>
    </div>
  );
}
