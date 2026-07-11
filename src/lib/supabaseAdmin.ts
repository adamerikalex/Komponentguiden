import { createClient } from "@supabase/supabase-js";

// SERVER-ONLY Supabase client using the service-role key. It bypasses RLS, so it
// must never be imported into a client component. Used by the /admin dashboard
// (guarded by Basic-Auth middleware) to read intent_requests / intent_events,
// which are otherwise anon-INSERT-only. The key has NO NEXT_PUBLIC_ prefix, so
// it is never shipped to the browser. Created lazily so a missing env var only
// errors at request time, not at build.
export function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    throw new Error(
      "Saknar NEXT_PUBLIC_SUPABASE_URL eller SUPABASE_SERVICE_ROLE_KEY i miljön."
    );
  }
  return createClient(url, serviceKey, { auth: { persistSession: false } });
}
