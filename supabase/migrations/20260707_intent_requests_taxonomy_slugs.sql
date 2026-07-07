-- Taxonomy slug columns on intent_requests (Komponentguiden Supabase project).
-- Run in the Supabase SQL editor. Source of truth for slug values:
-- Masterbase repo, docs/taxonomi.md (branch docs/metalbase-datamall).
--
-- Matching later = overlap on these arrays ∩ region ∩ size, per taxonomi.md.

alter table intent_requests
  add column if not exists capability_slugs text[] not null default '{}',
  add column if not exists material_slugs   text[] not null default '{}',
  add column if not exists cert_slugs       text[] not null default '{}';

-- GIN indexes so the matching engine can do fast array-overlap (&&) queries.
create index if not exists intent_requests_capability_slugs_idx
  on intent_requests using gin (capability_slugs);
create index if not exists intent_requests_material_slugs_idx
  on intent_requests using gin (material_slugs);
create index if not exists intent_requests_cert_slugs_idx
  on intent_requests using gin (cert_slugs);

-- Backfill existing rows from the stored display labels.
-- Deterministic: method/material are fixed radio options, certs a fixed list.
-- NOTE: assumes certs is text[]; if the column is jsonb, replace
-- unnest(certs) with jsonb_array_elements_text(certs).
update intent_requests set
  capability_slugs = (
    case method
      when 'Skärande bearbetning' then array['skarande-bearbetning']
      when 'Plåt & svets'         then array['platbearbetning','svetsning']
      when 'Gjutning'             then array['gjutning-formande']
      when 'Formsprutning'        then array['polymer']
      when '3D-printing'          then array['additiv-tillverkning']
      else '{}'::text[]
    end
    || case when coalesce(trim(surface_treatment),'') <> ''
            then array['ytbehandling'] else '{}'::text[] end
  ),
  material_slugs = case material
    when 'Aluminium'      then array['aluminium']
    when 'Stål'           then array['stal']
    when 'Rostfritt'      then array['rostfritt']
    when 'Titan / Special' then array['titan','ovrigt-special']
    when 'Plast'          then array['plast']
    when 'Komposit'       then array['komposit']
    else '{}'::text[]
  end,
  cert_slugs = coalesce((
    select array_agg(s) from (
      select case c
        when 'ISO 9001 (Kvalitet)' then 'iso9001'
        when 'ISO 14001 (Miljö)'   then 'iso14001'
        when 'ISO 3834 (Svets)'    then 'iso3834'
        when 'AS9100 (Försvar)'    then 'as9100'
        when 'ISO 13485 (MedTech)' then 'iso13485'
      end as s
      from unnest(certs) as c
    ) mapped where s is not null
  ), '{}'::text[])
where capability_slugs = '{}';
