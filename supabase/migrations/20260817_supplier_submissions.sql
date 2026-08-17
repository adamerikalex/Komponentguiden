-- Supplier self-input channel (docs/supplier-input-spec.md).
-- Suppliers submit their own capability profile via /for-leverantorer. This table
-- is the Komponentguiden-side intake/relationship record — raw submission + consent
-- + review status. Validated capabilities later flow to Masterbase
-- company_capabilities (source='sjalvrapporterad') via a scoped path (v0: /admin
-- review → manual push). Uses the SAME taxonomy slugs as intent_requests so supply
-- and demand speak one vocabulary.

create table if not exists supplier_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  -- Identity
  org_nr text,
  company_name text,
  contact_name text,
  yrkesroll text,
  contact_email text,
  contact_phone text,

  -- Capabilities (taxonomy slugs — same vocabulary as intent_requests)
  material_slugs text[],
  capability_slugs text[],
  process_slugs text[],
  surface_slugs text[],
  surface_treatment text,       -- free-text "annat" ytbehandling
  cert_slugs text[],
  certs text[],                 -- human labels of claimed certs
  cert_details text,            -- cert number / issuer, for verification
  maskinpark text,              -- free-text machine list
  kapacitet text,               -- free-text capacity clues
  region_slugs text[],

  -- Consent (two separate, opt-in)
  consent_match boolean not null default false,
  consent_contact boolean not null default false,

  -- Provenance + processing
  source text not null default 'sjalvrapporterad',
  qualification_status text,    -- 'qualified' | 'needs_review'
  low_confidence boolean not null default false,
  review_status text not null default 'pending',  -- 'pending' | 'approved' | 'rejected'
  reviewed_at timestamptz
);

alter table supplier_submissions enable row level security;

-- Anon may INSERT only (public form), never read — same posture as intent_requests.
-- The /admin review reads via the server-only service-role client, which bypasses RLS.
create policy "anon insert supplier_submissions"
  on supplier_submissions for insert to anon with check (true);

create index if not exists supplier_submissions_review_idx
  on supplier_submissions (review_status, created_at desc);
create index if not exists supplier_submissions_orgnr_idx
  on supplier_submissions (org_nr);
