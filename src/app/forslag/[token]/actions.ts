"use server";

import { revalidatePath } from "next/cache";
import { getAdminClient } from "@/lib/supabaseAdmin";

// Buyer feedback from the (public) proposal page — logs a 'responded' event.
// Keyed by the proposal token, so no login and no direct DB access needed.
export async function recordFeedback(formData: FormData) {
  const token = String(formData.get("token") ?? "");
  const supplier = String(formData.get("supplier") ?? "");
  const kind = String(formData.get("kind") ?? ""); // 'kontakt' | 'ej-relevant'
  if (!token || !kind) return;

  const admin = getAdminClient();
  const { data } = await admin
    .from("intent_requests")
    .select("id")
    .eq("proposal_token", token)
    .single();
  const intent = data as { id: string } | null;
  if (!intent) return;

  await admin.from("intent_events").insert({
    intent_id: intent.id,
    stage: "responded",
    meta: { supplier, kind },
  });
  revalidatePath(`/forslag/${token}`);
}
