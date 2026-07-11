-- Demand funnel v0 (docs/demand-funnel-spec.md): event log + qualification.
-- Run in the Supabase SQL editor BEFORE deploying the IntentForm that writes
-- qualification_status / low_confidence / source (all migrations here are applied
-- manually via the dashboard).

-- 1. New columns on intent_requests -----------------------------------------
alter table intent_requests
  add column if not exists qualification_status text,   -- 'qualified' | 'needs_review'
  add column if not exists low_confidence boolean not null default false,
  add column if not exists sni_kod text,                -- filled later by enrichment
  add column if not exists bransch text,                -- derived from SNI (later)
  add column if not exists source text;                 -- channel attribution

-- 2. Append-only event log — the funnel backbone ----------------------------
create table if not exists intent_events (
  id         uuid primary key default gen_random_uuid(),
  intent_id  uuid not null references intent_requests(id) on delete cascade,
  stage      text not null,      -- submitted | qualified | needs_review | matched | sent | engaged | responded | outcome
  ts         timestamptz not null default now(),
  meta       jsonb
);
create index if not exists intent_events_intent_id_idx on intent_events(intent_id);
create index if not exists intent_events_stage_idx     on intent_events(stage);
create index if not exists intent_events_ts_idx        on intent_events(ts);

alter table intent_events enable row level security;
-- No anon policies: rows are written by the SECURITY DEFINER trigger below and
-- read only by an authenticated admin. Add a SELECT policy when /admin lands, e.g.:
--   create policy "admin reads events" on intent_events for select to authenticated using (true);

-- 3. On new intent: log 'submitted' + the qualification outcome, timestamped --
create or replace function log_intent_submitted()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into intent_events (intent_id, stage, meta)
  values (new.id, 'submitted',
          jsonb_build_object('source', new.source, 'low_confidence', new.low_confidence));

  insert into intent_events (intent_id, stage)
  values (new.id, coalesce(new.qualification_status, 'needs_review'));

  return new;
end;
$$;

drop trigger if exists trg_log_intent_submitted on intent_requests;
create trigger trg_log_intent_submitted
  after insert on intent_requests
  for each row execute function log_intent_submitted();
