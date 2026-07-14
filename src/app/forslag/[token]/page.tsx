import Link from "next/link";
import { getAdminClient } from "@/lib/supabaseAdmin";
import { recordFeedback } from "./actions";

export const dynamic = "force-dynamic";

const NAVY = "var(--slate-navy, #1e2633)";
const NAVY_LIGHT = "var(--slate-navy-light, #334155)";
const INDIGO = "var(--indigo, #635bff)";
const BORDER = "var(--border, #e2e8f0)";
const SURFACE = "var(--surface, #ffffff)";

type Intent = {
  id: string;
  company_name: string | null;
  material: string | null;
  method: string | null;
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

function Shell({ children }: { children: React.ReactNode }) {
  return <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px 96px" }}>{children}</div>;
}

export default async function ProposalPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const admin = getAdminClient();

  const { data: iData } = await admin
    .from("intent_requests")
    .select("id, company_name, material, method, proposal_expires_at")
    .eq("proposal_token", token)
    .maybeSingle();
  const intent = iData as Intent | null;

  if (!intent) {
    return (
      <Shell>
        <h1 style={{ color: NAVY }}>Förslaget kunde inte hittas</h1>
        <p style={{ color: NAVY_LIGHT }}>Länken är ogiltig. Kontrollera att du använt hela länken, eller kontakta oss på info@komponentguiden.se.</p>
      </Shell>
    );
  }

  const expired = intent.proposal_expires_at ? new Date(intent.proposal_expires_at) < new Date() : false;
  if (expired) {
    return (
      <Shell>
        <span className="metadata">Komponentguiden</span>
        <h1 style={{ color: NAVY, marginTop: 8 }}>Det här förslaget har gått ut</h1>
        <p style={{ color: NAVY_LIGHT }}>Förslaget är inte längre aktivt. Vill ni ha en ny matchning? <Link href="/#intent-form" style={{ color: INDIGO }}>Starta en ny förfrågan →</Link></p>
      </Shell>
    );
  }

  const { data: mData } = await admin
    .from("matches")
    .select("id, rank, supplier_name, supplier_org_nr, supplier_lan, supplier_note")
    .eq("intent_id", intent.id)
    .order("rank", { ascending: true });
  const matches = (mData ?? []) as Match[];

  // Log 'engaged' once on first view (opened/klickat).
  const { count } = await admin
    .from("intent_events")
    .select("*", { count: "exact", head: true })
    .eq("intent_id", intent.id)
    .eq("stage", "engaged");
  if (!count) {
    await admin.from("intent_events").insert({ intent_id: intent.id, stage: "engaged" });
  }

  return (
    <Shell>
      <span className="metadata">Er matchning · Komponentguiden</span>
      <h1 style={{ color: NAVY, marginTop: 8, fontSize: 28 }}>Fem leverantörer för er förfrågan</h1>
      <p style={{ color: NAVY_LIGHT, fontSize: 15 }}>
        {[intent.material, intent.method].filter(Boolean).join(" · ") || "Er förfrågan"}. Ta kontakt med de leverantörer som passar er — och låt oss gärna veta hur det går, det hjälper oss matcha bättre nästa gång.
      </p>

      <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 14 }}>
        {matches.map((m) => (
          <div key={m.id} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "18px 20px" }}>
            <h3 style={{ margin: 0, fontSize: 17, color: NAVY }}>{m.rank}. {m.supplier_name}</h3>
            <div style={{ color: NAVY_LIGHT, fontSize: 13, marginTop: 2 }}>
              {[m.supplier_org_nr, m.supplier_lan].filter(Boolean).join(" · ") || ""}
            </div>
            {m.supplier_note && <p style={{ color: NAVY_LIGHT, fontSize: 14, margin: "8px 0 0" }}>{m.supplier_note}</p>}
            <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
              <form action={recordFeedback}>
                <input type="hidden" name="token" value={token} />
                <input type="hidden" name="supplier" value={m.supplier_name} />
                <input type="hidden" name="kind" value="kontakt" />
                <button type="submit" style={{ fontSize: 13, padding: "6px 12px", borderRadius: 8, border: `1px solid ${INDIGO}`, background: "none", color: INDIGO, cursor: "pointer" }}>Vi tog kontakt</button>
              </form>
              <form action={recordFeedback}>
                <input type="hidden" name="token" value={token} />
                <input type="hidden" name="supplier" value={m.supplier_name} />
                <input type="hidden" name="kind" value="ej-relevant" />
                <button type="submit" style={{ fontSize: 13, padding: "6px 12px", borderRadius: 8, border: `1px solid ${BORDER}`, background: "none", color: NAVY_LIGHT, cursor: "pointer" }}>Inte relevant</button>
              </form>
            </div>
          </div>
        ))}
      </div>

      <p style={{ color: NAVY_LIGHT, fontSize: 13, marginTop: 24 }}>Frågor? Mejla oss på <a href="mailto:info@komponentguiden.se" style={{ color: INDIGO }}>info@komponentguiden.se</a>.</p>
    </Shell>
  );
}
