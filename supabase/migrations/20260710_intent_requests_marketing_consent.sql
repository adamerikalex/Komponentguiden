-- IntentForm B10: separate marketing opt-in, stored as its own boolean so it is
-- a distinct legal basis from the NDA/sekretessgodkännande. Unticked by default.
-- Empty/false = we may only email the buyer about their own match (fullgörande
-- av åtagande); true = consent to nurture/newsletter emails.
--
-- Run in the Supabase SQL editor BEFORE deploying the form that inserts this
-- column (all migrations in this repo are applied manually via the dashboard).

alter table intent_requests
  add column if not exists marketing_consent boolean not null default false;
