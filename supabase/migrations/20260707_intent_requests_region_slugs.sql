-- IntentForm v2: geographic requirement (län-level, matches Masterbase companies.lan
-- granularity). Empty array = no requirement ("Hela Sverige").
-- Run in the Supabase SQL editor BEFORE deploying the v2 form.

alter table intent_requests
  add column if not exists region_slugs text[] not null default '{}';

create index if not exists intent_requests_region_slugs_idx
  on intent_requests using gin (region_slugs);
