import { getAdminClient } from "@/lib/supabaseAdmin";
import { LAN_GROUPS } from "@/lib/taxonomy";

// Always render at request time (reads live data, uses the service-role key).
export const dynamic = "force-dynamic";

type IntentRow = {
  id: string;
  created_at: string;
  company_name: string | null;
  org_nr: string | null;
  qualification_status: string | null;
  low_confidence: boolean | null;
  method: string | null;
  material: string | null;
  region_slugs: string[] | null;
  timeframe: string | null;
};
type EventRow = { intent_id: string; stage: string; ts: string };

const REGION_LABEL: Record<string, string> = {};
LAN_GROUPS.forEach((g) => g.lan.forEach((l) => (REGION_LABEL[l.slug] = l.label)));

const NAVY = "var(--slate-navy, #1e2633)";
const NAVY_LIGHT = "var(--slate-navy-light, #334155)";
const INDIGO = "var(--indigo, #635bff)";
const BORDER = "var(--border, #e2e8f0)";
const SURFACE = "var(--surface, #ffffff)";
const CANVAS = "var(--canvas, #f4f6f9)";

function topCounts(items: string[], limit = 8): [string, number][] {
  const m = new Map<string, number>();
  for (const it of items) if (it) m.set(it, (m.get(it) ?? 0) + 1);
  return [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, limit);
}

function median(nums: number[]): number | null {
  if (nums.length === 0) return null;
  const s = [...nums].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
}

function Card({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "18px 20px" }}>
      <div style={{ fontSize: 12, fontFamily: "var(--font-meta)", textTransform: "uppercase", color: "var(--turquoise, #008b8b)", letterSpacing: 0.4 }}>{label}</div>
      <div style={{ fontSize: 30, fontWeight: 800, color: NAVY, marginTop: 6 }}>{value}</div>
      {hint && <div style={{ fontSize: 12, color: NAVY_LIGHT, marginTop: 2 }}>{hint}</div>}
    </div>
  );
}

function Bars({ title, rows, accent = INDIGO }: { title: string; rows: [string, number][]; accent?: string }) {
  const max = Math.max(1, ...rows.map((r) => r[1]));
  return (
    <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "18px 20px" }}>
      <h3 style={{ fontSize: 15, color: NAVY, margin: "0 0 14px" }}>{title}</h3>
      {rows.length === 0 ? (
        <p style={{ fontSize: 13, color: NAVY_LIGHT, margin: 0 }}>Ingen data ännu.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {rows.map(([label, n]) => (
            <div key={label} style={{ display: "grid", gridTemplateColumns: "160px 1fr 34px", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 13, color: NAVY_LIGHT, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{label}</span>
              <span style={{ background: CANVAS, borderRadius: 6, height: 18, position: "relative", overflow: "hidden" }}>
                <span style={{ position: "absolute", inset: 0, width: `${(n / max) * 100}%`, background: accent, borderRadius: 6 }} />
              </span>
              <span style={{ fontSize: 13, fontWeight: 700, color: NAVY, textAlign: "right" }}>{n}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: Promise<{ from?: string; to?: string }>;
}) {
  const { from, to } = await searchParams;

  let intents: IntentRow[] = [];
  let events: EventRow[] = [];
  let loadError: string | null = null;

  try {
    const admin = getAdminClient();
    let iq = admin
      .from("intent_requests")
      .select("id, created_at, company_name, org_nr, qualification_status, low_confidence, method, material, region_slugs, timeframe")
      .order("created_at", { ascending: false })
      .limit(5000);
    if (from) iq = iq.gte("created_at", from);
    if (to) iq = iq.lte("created_at", `${to}T23:59:59`);
    const { data: iData, error: iErr } = await iq;
    if (iErr) throw iErr;
    intents = (iData ?? []) as IntentRow[];

    let eq = admin.from("intent_events").select("intent_id, stage, ts").limit(20000);
    if (from) eq = eq.gte("ts", from);
    if (to) eq = eq.lte("ts", `${to}T23:59:59`);
    const { data: eData, error: eErr } = await eq;
    if (eErr) throw eErr;
    events = (eData ?? []) as EventRow[];
  } catch (err) {
    loadError = err instanceof Error ? err.message : "Kunde inte läsa data.";
  }

  // KPIs
  const total = intents.length;
  const qualified = intents.filter((i) => i.qualification_status === "qualified").length;
  const needsReview = intents.filter((i) => i.qualification_status === "needs_review").length;
  const lowConf = intents.filter((i) => i.low_confidence).length;

  // Funnel (distinct intents per stage from the event log)
  const stageSets: Record<string, Set<string>> = {};
  for (const e of events) (stageSets[e.stage] ??= new Set()).add(e.intent_id);
  const stageCount = (s: string) => stageSets[s]?.size ?? 0;
  const funnel: [string, number][] = [
    ["Inskickad", stageCount("submitted") || total],
    ["Kvalificerad", stageCount("qualified") || qualified],
    ["Matchad", stageCount("matched")],
    ["Förslag skickat", stageCount("sent")],
    ["Öppnat / klickat", stageCount("engaged")],
    ["Svarat", stageCount("responded")],
    ["Utfall", stageCount("outcome")],
  ];

  // 48h clock — median hours submitted → sent (empty until matches flow)
  const submittedTs: Record<string, string> = {};
  const sentTs: Record<string, string> = {};
  for (const e of events) {
    if (e.stage === "submitted") submittedTs[e.intent_id] = e.ts;
    if (e.stage === "sent") sentTs[e.intent_id] = e.ts;
  }
  const sendHours: number[] = [];
  for (const id of Object.keys(sentTs)) {
    if (submittedTs[id]) {
      const h = (new Date(sentTs[id]).getTime() - new Date(submittedTs[id]).getTime()) / 3.6e6;
      if (h >= 0) sendHours.push(h);
    }
  }
  const medHours = median(sendHours);

  // Demand breakdowns
  const byMethod = topCounts(intents.map((i) => i.method ?? ""));
  const byMaterial = topCounts(intents.map((i) => i.material ?? ""));
  const regionItems: string[] = [];
  for (const i of intents) {
    if (!i.region_slugs || i.region_slugs.length === 0) regionItems.push("Hela Sverige");
    else for (const s of i.region_slugs) regionItems.push(REGION_LABEL[s] ?? s);
  }
  const byRegion = topCounts(regionItems);

  return (
    <div style={{ maxWidth: 1080, margin: "0 auto", padding: "40px 24px 80px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 12 }}>
        <div>
          <span className="metadata">Intern · demand funnel</span>
          <h1 style={{ fontSize: 28, color: NAVY, margin: "6px 0 0" }}>Efterfrågedashboard</h1>
        </div>
        <form method="get" style={{ display: "flex", gap: 8, alignItems: "flex-end", fontSize: 13 }}>
          <label style={{ color: NAVY_LIGHT }}>Från<br /><input type="date" name="from" defaultValue={from} className="input-field" style={{ padding: 6 }} /></label>
          <label style={{ color: NAVY_LIGHT }}>Till<br /><input type="date" name="to" defaultValue={to} className="input-field" style={{ padding: 6 }} /></label>
          <button type="submit" className="btn-primary" style={{ padding: "8px 14px" }}>Filtrera</button>
        </form>
      </div>

      {loadError && (
        <div style={{ marginTop: 20, padding: "14px 18px", background: "#fdecec", border: "1px solid #f3b4b4", borderRadius: 10, color: NAVY, fontSize: 14 }}>
          <strong>Kunde inte läsa data:</strong> {loadError}. Kontrollera att migrationen körts och att <code>SUPABASE_SERVICE_ROLE_KEY</code> finns i miljön.
        </div>
      )}

      {!loadError && total === 0 && (
        <p style={{ marginTop: 20, color: NAVY_LIGHT }}>Inga intents ännu i valt intervall.</p>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14, marginTop: 24 }}>
        <Card label="Antal intents" value={String(total)} hint="i valt intervall" />
        <Card label="Kvalificerade" value={String(qualified)} hint={total ? `${Math.round((qualified / total) * 100)}% av intents` : "—"} />
        <Card label="Behöver granskning" value={String(needsReview)} hint={`varav låg tillit: ${lowConf}`} />
        <Card label="48h-klockan" value={medHours == null ? "—" : `${medHours.toFixed(1)} h`} hint={medHours == null ? "väntar på matchningsmotorn" : "median tid till förslag"} />
      </div>

      <div style={{ marginTop: 28 }}>
        <Bars title="Tratt — steg för steg" rows={funnel} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16, marginTop: 16 }}>
        <Bars title="Efterfrågan per metod" rows={byMethod} />
        <Bars title="Efterfrågan per material" rows={byMaterial} />
        <Bars title="Geografiskt krav" rows={byRegion} />
      </div>

      {total > 0 && (
        <div style={{ marginTop: 28, background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 12, overflow: "hidden" }}>
          <h3 style={{ fontSize: 15, color: NAVY, margin: 0, padding: "16px 20px", borderBottom: `1px solid ${BORDER}` }}>Senaste intents</h3>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ color: NAVY_LIGHT, textAlign: "left" }}>
                  {["Datum", "Företag", "Org.nr", "Metod", "Material", "Status"].map((h) => (
                    <th key={h} style={{ padding: "10px 20px", fontWeight: 600, borderBottom: `1px solid ${BORDER}` }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {intents.slice(0, 25).map((i) => (
                  <tr key={i.id} style={{ color: NAVY }}>
                    <td style={{ padding: "10px 20px", borderBottom: `1px solid ${BORDER}`, whiteSpace: "nowrap" }}>{new Date(i.created_at).toLocaleDateString("sv-SE")}</td>
                    <td style={{ padding: "10px 20px", borderBottom: `1px solid ${BORDER}` }}>{i.company_name ?? "—"}</td>
                    <td style={{ padding: "10px 20px", borderBottom: `1px solid ${BORDER}`, whiteSpace: "nowrap" }}>{i.org_nr ?? "—"}</td>
                    <td style={{ padding: "10px 20px", borderBottom: `1px solid ${BORDER}` }}>{i.method ?? "—"}</td>
                    <td style={{ padding: "10px 20px", borderBottom: `1px solid ${BORDER}` }}>{i.material ?? "—"}</td>
                    <td style={{ padding: "10px 20px", borderBottom: `1px solid ${BORDER}`, whiteSpace: "nowrap" }}>
                      <span style={{ color: i.qualification_status === "qualified" ? "#15803d" : "#b7791f" }}>
                        {i.qualification_status ?? "—"}
                      </span>
                      {i.low_confidence && <span style={{ color: "#b7791f" }}> · låg tillit</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
