import { NextRequest, NextResponse } from "next/server";
import { SITE_URL } from "@/lib/site";
import { sendEmail, wrapEmail, emailButton, esc } from "@/lib/email";

export const dynamic = "force-dynamic";

// Target for a Supabase Database Webhook on `intent_requests` INSERT. The webhook
// is configured (in the Supabase dashboard) to POST the new row here with a
// shared-secret header, so this fires server-to-server on a real insert and
// can't be spoofed by the anon client. It emails Alexander a summary + a direct
// link to review/send the match in /admin/[id].

type IntentRecord = {
  id: string;
  company_name: string | null;
  org_nr: string | null;
  contact_name: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  method: string | null;
  material: string | null;
  timeframe: string | null;
  qualification_status: string | null;
};

export async function POST(req: NextRequest) {
  // Shared-secret gate. Configure the webhook to send this header.
  const secret = process.env.NOTIFY_WEBHOOK_SECRET;
  if (secret && req.headers.get("x-notify-secret") !== secret) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  let record: IntentRecord | null = null;
  try {
    const body = await req.json();
    record = (body?.record ?? null) as IntentRecord | null;
  } catch {
    return NextResponse.json({ ok: false, error: "bad payload" }, { status: 400 });
  }
  if (!record?.id) return NextResponse.json({ ok: true, skipped: "no record" });

  const to = process.env.ADMIN_NOTIFY_EMAIL;
  if (!to) return NextResponse.json({ ok: true, skipped: "no ADMIN_NOTIFY_EMAIL" });

  const status = record.qualification_status ?? "—";
  const needsReview = status !== "qualified";
  const adminLink = `${SITE_URL}/admin/${record.id}`;

  const row = (label: string, value: string | null) =>
    `<tr>
      <td style="padding:4px 12px 4px 0;font-size:13px;color:#64748b;white-space:nowrap;vertical-align:top;">${label}</td>
      <td style="padding:4px 0;font-size:14px;color:#1e2633;">${esc(value) || "—"}</td>
    </tr>`;

  const statusBadge = needsReview
    ? `<span style="color:#b7791f;font-weight:600;">${esc(status)} — kontrollera</span>`
    : `<span style="color:#008b8b;font-weight:600;">${esc(status)}</span>`;

  const html = wrapEmail(`
    <p style="margin:0 0 6px;font-size:16px;font-weight:700;color:#1e2633;">Ny förfrågan att matcha</p>
    <p style="margin:0 0 16px;font-size:14px;color:#334155;">
      ${esc(record.company_name) || "Okänt företag"} har skickat in en förfrågan.
    </p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;">
      ${row("Företag", record.company_name)}
      ${row("Org.nr", record.org_nr)}
      ${row("Kontakt", [record.contact_name, record.contact_email, record.contact_phone].filter(Boolean).join(" · ") || null)}
      ${row("Material", record.material)}
      ${row("Metod", record.method)}
      ${row("Tidsram", record.timeframe)}
      <tr><td style="padding:4px 12px 4px 0;font-size:13px;color:#64748b;">Status</td><td style="padding:4px 0;font-size:14px;">${statusBadge}</td></tr>
    </table>
    ${emailButton(adminLink, "Granska & skicka förslag →")}
  `);

  const subject = `${needsReview ? "⚠ " : ""}Ny förfrågan: ${record.company_name ?? "okänt företag"}`;
  const result = await sendEmail({
    to,
    subject,
    html,
    replyTo: record.contact_email ?? undefined,
  });

  // Always 200 (even on send failure) so Supabase doesn't retry-storm; the result
  // is returned for observability in the webhook log.
  return NextResponse.json({ ok: result.ok, skipped: result.skipped ?? false, error: result.error });
}
