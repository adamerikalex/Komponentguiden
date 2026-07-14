import Link from "next/link";
import { notFound } from "next/navigation";
import { getAdminClient } from "@/lib/supabaseAdmin";
import { SITE_URL } from "@/lib/site";
import { addMatch, removeMatch, sendProposal } from "./actions";

export const dynamic = "force-dynamic";

const NAVY = "var(--slate-navy, #1e2633)";
const NAVY_LIGHT = "var(--slate-navy-light, #334155)";
const INDIGO = "var(--indigo, #635bff)";
const BORDER = "var(--border, #e2e8f0)";
const SURFACE = "var(--surface, #ffffff)";

type Intent = {
  id: string;
  company_name: string | null;
  org_nr: string | null;
  contact_name: string | null;
  contact_email: string | null;
  method: string | null;
  material: string | null;
  timeframe: string | null;
  qualification_status: string | null;
  proposal_token: string | null;
  proposal_status: string | null;
  proposal_expires_at: string | null;
};
type Match = {
  id: string;
  rank: number | null;
  supplier_name: string;
  supplier_org_nr: string | null;
  supplier_lan: string | null;
  supplier_note: string | null;
};

export default async function AdminIntentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const admin = getAdminClient();

  const { data: iData } = await admin
    .from("intent_requests")
    .select("id, company_name, org_nr, contact_name, contact_email, method, material, timeframe, qualification_status, proposal_token, proposal_status, proposal_expires_at")
    .eq("id", id)
    .single();
  const intent = iData as Intent | null;
  if (!intent) notFound();

  const { data: mData } = await admin
    .from("matches")
    .select("id, rank, supplier_name, supplier_org_nr, supplier_lan, supplier_note")
    .eq("intent_id", id)
    .order("rank", { ascending: true });
  const matches = (mData ?? []) as Match[];

  const proposalUrl = intent.proposal_token ? `${SITE_URL}/forslag/${intent.proposal_token}` : null;
  const canAddMore = matches.length < 5;

  const cardStyle = { background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "20px 22px", marginTop: 18 } as const;
  const inputStyle = { padding: "8px 10px", border: `1px solid ${BORDER}`, borderRadius: 8, fontSize: 14, width: "100%" } as const;

  return (
    <div style={{ maxWidth: 820, margin: "0 auto", padding: "32px 24px 80px" }}>
      <Link href="/admin" style={{ fontSize: 13, color: INDIGO }}>← Tillbaka till dashboard</Link>
      <h1 style={{ fontSize: 24, color: NAVY, margin: "10px 0 0" }}>{intent.company_name ?? "Intent"}</h1>
      <p style={{ color: NAVY_LIGHT, fontSize: 14, margin: "4px 0 0" }}>
        {intent.org_nr ?? "—"} · {intent.contact_name ?? "—"} · {intent.contact_email ?? "—"}
        <br />
        {intent.material ?? "—"} · {intent.method ?? "—"} · {intent.timeframe ?? "—"} · {intent.qualification_status ?? "—"}
      </p>

      {/* Matched suppliers */}
      <div style={cardStyle}>
        <h2 style={{ fontSize: 16, color: NAVY, margin: "0 0 12px" }}>Matchade leverantörer ({matches.length}/5)</h2>
        {matches.length === 0 && <p style={{ color: NAVY_LIGHT, fontSize: 14 }}>Inga leverantörer tillagda ännu.</p>}
        {matches.map((m) => (
          <div key={m.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, padding: "10px 0", borderTop: `1px solid ${BORDER}` }}>
            <div style={{ fontSize: 14, color: NAVY }}>
              <strong>{m.rank}. {m.supplier_name}</strong>
              <div style={{ color: NAVY_LIGHT, fontSize: 13 }}>
                {[m.supplier_org_nr, m.supplier_lan].filter(Boolean).join(" · ") || "—"}
                {m.supplier_note ? ` — ${m.supplier_note}` : ""}
              </div>
            </div>
            <form action={removeMatch}>
              <input type="hidden" name="intentId" value={intent.id} />
              <input type="hidden" name="matchId" value={m.id} />
              <button type="submit" style={{ background: "none", border: "none", color: "#e53e3e", cursor: "pointer", fontSize: 13 }}>Ta bort</button>
            </form>
          </div>
        ))}
      </div>

      {/* Add supplier */}
      {canAddMore && (
        <div style={cardStyle}>
          <h2 style={{ fontSize: 16, color: NAVY, margin: "0 0 12px" }}>Lägg till leverantör</h2>
          <form action={addMatch} style={{ display: "grid", gap: 10 }}>
            <input type="hidden" name="intentId" value={intent.id} />
            <input name="supplier_name" placeholder="Leverantörens namn *" required style={inputStyle} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <input name="supplier_org_nr" placeholder="Org.nr" style={inputStyle} />
              <input name="supplier_lan" placeholder="Län" style={inputStyle} />
            </div>
            <input name="supplier_note" placeholder="Kort motivering (visas för köparen)" style={inputStyle} />
            <button type="submit" className="btn-primary" style={{ padding: "10px 16px", justifySelf: "start" }}>Lägg till</button>
          </form>
        </div>
      )}

      {/* Proposal */}
      <div style={cardStyle}>
        <h2 style={{ fontSize: 16, color: NAVY, margin: "0 0 12px" }}>Förslag till köpare</h2>
        {matches.length === 0 ? (
          <p style={{ color: NAVY_LIGHT, fontSize: 14 }}>Lägg till minst en leverantör innan du skapar förslaget.</p>
        ) : (
          <form action={sendProposal}>
            <input type="hidden" name="intentId" value={intent.id} />
            <button type="submit" className="btn-primary" style={{ padding: "10px 16px" }}>
              {intent.proposal_status === "sent" ? "Uppdatera förslagslänk" : "Skapa förslagslänk"}
            </button>
          </form>
        )}
        {proposalUrl && (
          <div style={{ marginTop: 14, fontSize: 14, color: NAVY }}>
            <div style={{ color: NAVY_LIGHT, marginBottom: 4 }}>
              Status: {intent.proposal_status ?? "—"}
              {intent.proposal_expires_at ? ` · går ut ${new Date(intent.proposal_expires_at).toLocaleDateString("sv-SE")}` : ""}
            </div>
            <code style={{ display: "block", background: "var(--canvas, #f4f6f9)", padding: "10px 12px", borderRadius: 8, wordBreak: "break-all" }}>{proposalUrl}</code>
            <p style={{ color: NAVY_LIGHT, fontSize: 13, marginTop: 6 }}>
              Mejla den här länken till köparen tills automatiskt utskick (Resend) är på plats.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
