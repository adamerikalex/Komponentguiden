import Link from "next/link";
import { getAdminClient } from "@/lib/supabaseAdmin";
import { reviewSubmission } from "./actions";

export const dynamic = "force-dynamic";

const NAVY = "var(--slate-navy, #1e2633)";
const NAVY_LIGHT = "var(--slate-navy-light, #334155)";
const INDIGO = "var(--indigo, #635bff)";
const BORDER = "var(--border, #e2e8f0)";
const SURFACE = "var(--surface, #ffffff)";

type Submission = {
  id: string;
  created_at: string;
  org_nr: string | null;
  company_name: string | null;
  contact_name: string | null;
  yrkesroll: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  material_slugs: string[] | null;
  capability_slugs: string[] | null;
  cert_slugs: string[] | null;
  certs: string[] | null;
  cert_details: string | null;
  maskinpark: string | null;
  kapacitet: string | null;
  region_slugs: string[] | null;
  consent_match: boolean | null;
  consent_contact: boolean | null;
  qualification_status: string | null;
  low_confidence: boolean | null;
  review_status: string | null;
};

function fmt(v: string[] | null): string {
  return v && v.length ? v.join(", ") : "—";
}

export default async function AdminLeverantorerPage() {
  const admin = getAdminClient();
  const { data } = await admin
    .from("supplier_submissions")
    .select(
      "id, created_at, org_nr, company_name, contact_name, yrkesroll, contact_email, contact_phone, material_slugs, capability_slugs, cert_slugs, certs, cert_details, maskinpark, kapacitet, region_slugs, consent_match, consent_contact, qualification_status, low_confidence, review_status"
    )
    .order("created_at", { ascending: false });
  const subs = (data ?? []) as Submission[];
  const pending = subs.filter((s) => (s.review_status ?? "pending") === "pending");
  const reviewed = subs.filter((s) => (s.review_status ?? "pending") !== "pending");

  const card = { background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "18px 20px", marginTop: 16 } as const;
  const row = (label: string, value: string) => (
    <p style={{ fontSize: 13.5, color: NAVY_LIGHT, margin: "4px 0" }}>
      <span style={{ color: "#94a3b8" }}>{label}: </span>
      <span style={{ color: NAVY }}>{value}</span>
    </p>
  );

  const renderCard = (s: Submission, withActions: boolean) => {
    const needsReview = (s.qualification_status ?? "") !== "qualified";
    return (
      <div key={s.id} style={card}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
          <div>
            <strong style={{ fontSize: 16, color: NAVY }}>{s.company_name ?? "—"}</strong>
            <span style={{ fontSize: 12, color: "#94a3b8", marginLeft: 8 }}>{s.org_nr ?? "—"}</span>
          </div>
          <span style={{ fontSize: 12, fontWeight: 600, color: needsReview ? "#b7791f" : "#008b8b" }}>
            {s.qualification_status ?? "—"}{s.review_status && s.review_status !== "pending" ? ` · ${s.review_status}` : ""}
          </span>
        </div>
        {row("Kontakt", [s.contact_name, s.yrkesroll, s.contact_email, s.contact_phone].filter(Boolean).join(" · ") || "—")}
        {row("Material", fmt(s.material_slugs))}
        {row("Kapabiliteter", fmt(s.capability_slugs))}
        {row("Certifieringar", `${fmt(s.certs)}${s.cert_details ? `  (${s.cert_details})` : ""}`)}
        {s.maskinpark ? row("Maskinpark", s.maskinpark) : null}
        {s.kapacitet ? row("Kapacitet", s.kapacitet) : null}
        {row("Län", fmt(s.region_slugs))}
        {row("Samtycke", `matcha: ${s.consent_match ? "ja" : "nej"} · kontakt: ${s.consent_contact ? "ja" : "nej"}`)}
        {withActions && (
          <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
            <form action={reviewSubmission}>
              <input type="hidden" name="id" value={s.id} />
              <input type="hidden" name="status" value="approved" />
              <button type="submit" className="btn-primary" style={{ padding: "8px 16px", fontSize: 14 }}>Godkänn</button>
            </form>
            <form action={reviewSubmission}>
              <input type="hidden" name="id" value={s.id} />
              <input type="hidden" name="status" value="rejected" />
              <button type="submit" style={{ padding: "8px 16px", fontSize: 14, background: "none", border: `1px solid ${BORDER}`, borderRadius: 8, color: "#e53e3e", cursor: "pointer" }}>Avslå</button>
            </form>
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ maxWidth: 820, margin: "0 auto", padding: "32px 24px 80px" }}>
      <Link href="/admin" style={{ fontSize: 13, color: INDIGO }}>← Tillbaka till dashboard</Link>
      <h1 style={{ fontSize: 24, color: NAVY, margin: "10px 0 0" }}>Leverantörsprofiler</h1>
      <p style={{ color: NAVY_LIGHT, fontSize: 14, margin: "4px 0 0" }}>
        Självrapporterade profiler från /for-leverantorer. Godkänn för att flagga för push till
        Masterbase <code>company_capabilities</code> (source=sjalvrapporterad).
      </p>

      <h2 style={{ fontSize: 16, color: NAVY, margin: "28px 0 0" }}>Att granska ({pending.length})</h2>
      {pending.length === 0 && <p style={{ color: NAVY_LIGHT, fontSize: 14, marginTop: 8 }}>Inga profiler väntar på granskning.</p>}
      {pending.map((s) => renderCard(s, true))}

      {reviewed.length > 0 && (
        <>
          <h2 style={{ fontSize: 16, color: NAVY, margin: "36px 0 0" }}>Granskade ({reviewed.length})</h2>
          {reviewed.map((s) => renderCard(s, false))}
        </>
      )}
    </div>
  );
}
