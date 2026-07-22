"use server";

import { randomBytes } from "crypto";
import { revalidatePath } from "next/cache";
import { getAdminClient } from "@/lib/supabaseAdmin";
import { SITE_URL } from "@/lib/site";
import { sendEmail, wrapEmail, emailButton, esc } from "@/lib/email";

// Add a manual supplier match to an intent (max 5 enforced in the UI).
export async function addMatch(formData: FormData) {
  const intentId = String(formData.get("intentId") ?? "");
  const supplierName = String(formData.get("supplier_name") ?? "").trim();
  if (!intentId || !supplierName) return;
  const admin = getAdminClient();

  const { count } = await admin
    .from("matches")
    .select("*", { count: "exact", head: true })
    .eq("intent_id", intentId);

  await admin.from("matches").insert({
    intent_id: intentId,
    rank: (count ?? 0) + 1,
    supplier_name: supplierName,
    supplier_org_nr: String(formData.get("supplier_org_nr") ?? "").trim() || null,
    supplier_lan: String(formData.get("supplier_lan") ?? "").trim() || null,
    supplier_note: String(formData.get("supplier_note") ?? "").trim() || null,
  });

  // Log 'matched' once, when the first supplier is added.
  const { count: matchedEvents } = await admin
    .from("intent_events")
    .select("*", { count: "exact", head: true })
    .eq("intent_id", intentId)
    .eq("stage", "matched");
  if (!matchedEvents) {
    await admin.from("intent_events").insert({ intent_id: intentId, stage: "matched" });
  }

  revalidatePath(`/admin/${intentId}`);
}

export async function removeMatch(formData: FormData) {
  const intentId = String(formData.get("intentId") ?? "");
  const matchId = String(formData.get("matchId") ?? "");
  if (!matchId) return;
  const admin = getAdminClient();
  await admin.from("matches").delete().eq("id", matchId);
  revalidatePath(`/admin/${intentId}`);
}

// Generate (or refresh) the tokenized proposal + mark it sent. Email send itself
// is stubbed until Resend is configured — for now the admin copies the link.
export async function sendProposal(formData: FormData) {
  const intentId = String(formData.get("intentId") ?? "");
  if (!intentId) return;
  const admin = getAdminClient();

  const { data } = await admin
    .from("intent_requests")
    .select("proposal_token, proposal_status, contact_email, contact_name, company_name")
    .eq("id", intentId)
    .single();
  const intent = data as {
    proposal_token: string | null;
    proposal_status: string | null;
    contact_email: string | null;
    contact_name: string | null;
    company_name: string | null;
  } | null;

  const token = intent?.proposal_token ?? randomBytes(12).toString("base64url");
  const firstSend = intent?.proposal_status !== "sent";

  await admin
    .from("intent_requests")
    .update({
      proposal_token: token,
      proposal_status: "sent",
      proposal_sent_at: new Date().toISOString(),
      proposal_expires_at: new Date(Date.now() + 60 * 24 * 3600 * 1000).toISOString(),
    })
    .eq("id", intentId);

  if (firstSend) {
    await admin.from("intent_events").insert({ intent_id: intentId, stage: "sent" });

    // Buyer proposal email (best-effort — the link is saved regardless, and the
    // admin page still shows it as a manual fallback if the send is skipped).
    if (intent?.contact_email) {
      const url = `${SITE_URL}/forslag/${token}`;
      const greeting = intent.contact_name ? `Hej ${esc(intent.contact_name)},` : "Hej,";
      await sendEmail({
        to: intent.contact_email,
        subject: "Dina matchade leverantörer från Komponentguiden",
        replyTo: process.env.ADMIN_NOTIFY_EMAIL,
        html: wrapEmail(`
          <p style="margin:0 0 12px;font-size:15px;color:#1e2633;">${greeting}</p>
          <p style="margin:0 0 12px;font-size:14px;color:#334155;line-height:1.6;">
            Vi har tagit fram ett urval leverantörer som matchar din förfrågan${
              intent.company_name ? ` för ${esc(intent.company_name)}` : ""
            }. Öppna länken nedan för att se dem och markera vilka du vill gå vidare med.
          </p>
          ${emailButton(url, "Se dina leverantörer →")}
          <p style="margin:14px 0 0;font-size:12.5px;color:#64748b;line-height:1.5;">
            Länken är personlig och giltig i 60 dagar. Har du frågor är det bara att svara på det här mejlet.
          </p>
        `),
      });
    }
  }

  revalidatePath(`/admin/${intentId}`);
}
