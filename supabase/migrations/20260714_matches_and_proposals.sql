-- Proposal flow (docs/demand-funnel-spec.md): matches + tokenized proposal delivery.
-- Run in the KOMPONENTGUIDEN Supabase SQL editor BEFORE deploying.

-- Manually-entered (for now) supplier matches per intent. Denormalized snapshot so
-- the proposal page / funnel never depend on a live Masterbase join; the auto
-- matching engine will later write into this same table.
create table if not exists matches (
  id              uuid primary key default gen_random_uuid(),
  intent_id       uuid not null references intent_requests(id) on delete cascade,
  rank            int,
  supplier_org_nr text,
  supplier_name   text not null,
  supplier_lan    text,
  supplier_note   text,          -- why this supplier / capability summary shown to the buyer
  created_at      timestamptz not null default now()
);
create index if not exists matches_intent_id_idx on matches(intent_id);

-- Read/written only server-side via the service role (admin page + proposal page).
alter table matches enable row level security;

-- Proposal delivery fields on the intent (one proposal per intent for MVP).
alter table intent_requests
  add column if not exists proposal_token text unique,
  add column if not exists proposal_status text,       -- 'draft' | 'sent' | 'expired'
  add column if not exists proposal_sent_at timestamptz,
  add column if not exists proposal_expires_at timestamptz;
