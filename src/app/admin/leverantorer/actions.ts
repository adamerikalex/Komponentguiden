"use server";

import { revalidatePath } from "next/cache";
import { getAdminClient } from "@/lib/supabaseAdmin";

// Approve or reject a supplier submission. On approve (v0) the capabilities are
// pushed to Masterbase company_capabilities by a separate script/endpoint — this
// just records the review decision. Guarded by the /admin Basic-Auth middleware.
export async function reviewSubmission(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!id || (status !== "approved" && status !== "rejected")) return;

  const admin = getAdminClient();
  await admin
    .from("supplier_submissions")
    .update({ review_status: status, reviewed_at: new Date().toISOString() })
    .eq("id", id);

  revalidatePath("/admin/leverantorer");
}
