# Supplier Input — supply-side self-service capability channel

*Spec v1 · 2026-08-17 · Komponentguiden*
*A consent-based, source-tagged, org-nr-verified channel for suppliers to submit their own capability
profiles — complementing web-scraping, never replacing the proprietary supply base with a public directory.*

---

## 1. Why this exists (strategic role)

Today the supply side is populated **outside-in**: we scrape/enrich suppliers who never asked to be there.
This channel flips it **inside-out** — suppliers opt in and describe their own capabilities. It matters for
three reasons:

1. **It fills the gap scraping structurally can't close.** A large share of the cohort has no website,
   JS-only sites, or no extractable data (`no_site` / `js_site` / `no_data` in the scrape). Self-input is
   the channel for that hard 30–40% — and it runs **in parallel** with scraping, not after it.
2. **Consent.** A supplier who submits has opted in, which cleans up the provenance concern (recommending
   workshops that never agreed) and makes downstream outreach legitimate.
3. **Supply-side flywheel + relationship on-ramp.** Turns a demand-heavy product into a genuine two-sided
   marketplace, and is the first supplier touch that later feeds Concierge and the M&A/lazy-twin track.

**Reframe:** this is not a "fallback after scraping is complete" — scraping never completes. Use scraping
for the easy wins, invite everyone else to self-submit.

## 2. Non-negotiables

- **Never a public directory.** The supply base is the moat and the reason demand intake works. Buyers must
  never browse suppliers. Supplier profiles are exposed only through the scoped `metalbase_public` view to
  the matching engine — never to the public. A supplier may see/edit **their own** record, never others'.
- **Consent-based.** Every submission captures explicit opt-in to be matched and (separately) to be contacted.
- **Source-tagged.** Every capability row records where it came from and how confident we are.
- **Identity-verified.** Every submission is tied to a valid org-nr (checksum), like the buyer IntentForm.
- **Respect `reklamsparr`.** Any outbound batch filters out suppliers flagged `reklamsparr` in Masterbase.

## 3. Provenance model — capability data sources

The `company_capabilities` / `company_certifications` satellite tables (Masterbase) were built with a
`source` field + `confidence` for exactly this. Add supplier input as another source; nothing to redesign.

`source` values: `hemsida` (scraped from own website) · `sjalvrapporterad` (this channel) ·
`ai-harledd` (inferred) · `maskinpark-legacy` (old raw jsonb) · `allabolag`.

**Self-reported is a *different* signal, not a superior one.** On a lead marketplace, suppliers have a
gaming incentive (claim everything to catch more matches). So:
- Facts they'd know precisely (machine brand/model, län, materials) → high confidence.
- **Certifications → treat with suspicion.** Most gameable *and* most consequential (an unverified ISO 9001
  claim reaching a defense buyer is a real problem). Store self-claimed certs as `ej verifierad` at low
  confidence (≤0.4) until a number/issuer is provided or checked.
- **Conflicts** between self-reported and scraped are flagged for review, never silently overwritten.
- Confidence precedence stays per the taxonomy rules; self-reported does **not** auto-win over evidence.

## 4. Data model & write path

**Which database holds what — and why (a deliberate split).** A submission is split across the two
databases on purpose:

- The **raw submission** — contact details, consent choices, org-nr, validation status, and an audit copy
  of exactly what was typed — **stays in Komponentguiden**. It's the supply-side mirror of `intent_requests`:
  the intake / relationship record ("who reached out, what they said, what they agreed to").
- The **validated capabilities** it produces — taxonomy slugs, machines, certs — are **written into
  Masterbase** (`company_capabilities` / `company_certifications`), merged onto the *same company row* as any
  scraped capabilities, differentiated only by the `source` tag.

**Rationale:** all supply data must live in **one place (Masterbase)** so the matching engine reads a single
source. If self-reported capabilities lived only in Komponentguiden, the supply base would be forked across
two databases and matching would have to stitch them together. Keeping scraped + self-reported in the same
`company_capabilities` table (differentiated only by `source`) means they blend into one profile per company
and matching is source-agnostic. Plainly: **Komponentguiden = the submission (inbox); Masterbase = the
capabilities that submission yields (the supply base matching reads).** (Keeping everything in Komponentguiden
was considered and rejected — it would fork the supply data and complicate matching.)

**Collection (Komponentguiden Supabase):** a `supplier_submissions` table — raw submission + identity +
consent + `qualification_status` + timestamps + audit of the exact payload. Mirrors how `intent_requests`
works on the demand side.

**Destination (Masterbase):** validated capabilities upsert into `company_capabilities` /
`company_certifications` keyed on `org_nr`, with `source='sjalvrapporterad'` + confidence.

**Write path — scoped, never the service key.** Komponentguiden must never hold the Masterbase service key
(architecture rule). Two options:
- **v0 (human-in-the-loop):** submissions land in Komponentguiden, Alexander reviews in `/admin`, approved
  ones are pushed to Masterbase via a small script / scoped endpoint. The review gate doubles as
  anti-gaming. Fastest to ship, mirrors the proposal-flow pattern.
- **v1 (automated):** a Masterbase Edge Function / RPC accepts a validated submission payload and upserts
  with source + confidence — Komponentguiden calls it with a scoped token, never raw SQL.

## 5. The supplier form (`/for-leverantorer` → form, or emailed link)

Essentially **the IntentForm inverted** — same shared taxonomy slugs (`docs/taxonomi.md`), but describing
what the supplier *can do* rather than what a buyer *needs*. Reuse `src/lib/validation.ts` (org-nr checksum)
and `src/lib/taxonomy.ts` (slug mapping).

Fields:
- **Identity (mandatory):** org-nr (Luhn checksum), företagsnamn, kontaktnamn, yrkesroll, arbetsmejl
  (work-email warn-flag), telefon (optional).
- **Kapabiliteter:** materialgrupper (metall/plast/komposit + subtyper), bearbetningsmetoder (the method +
  process chips — the *same* taxonomy the buyer picks from), ytbehandling, toleranser/precision.
- **Maskinpark:** structured list — maskin (fabrikat + modell), antal, kapacitet (max längd/vikt/tonnage).
  Prefilled from scraped `maskinpark` where we have it (see §9).
- **Certifieringar:** ISO 9001 / 14001 / 3834 / AS9100 / ISO 13485 — each with cert-nummer + utfärdare for
  verification (unverified → low confidence, `ej verifierad`).
- **Kapacitet & leverans:** seriestorlekar (prototyp/små/stora), ledtider, ev. ledig kapacitet (optional but
  gold for lazy-twin/M&A screening).
- **Geografi:** län.
- **Samtycke (två separata):** (1) matcha mig mot förfrågningar; (2) kontakta mig. Both opt-in, unticked.

## 6. Validation, cleaning & anti-gaming

1. **Org-nr checksum** + normalize; look up / create the company on `org_nr`.
2. **Map to taxonomy slugs** at submit (same `src/lib/taxonomy.ts` path as IntentForm) — store slugs, not
   free text, so supply and demand join cleanly.
3. **Cert verification tier:** number+issuer present → higher confidence; absent → `ej verifierad`, ≤0.4.
4. **Conflict detection:** where self-reported disagrees with scraped/registry (e.g. claims a method the
   website contradicts, or a size class the financials make implausible), flag for review, don't overwrite.
5. **Qualification status** (`qualified` / `needs_review`) like the intent qualifier — free-mail, missing
   org-nr match, or conflicts → `needs_review`.
6. **Honeypot + rate-limit** on any public form (bot defense, as on IntentForm).

## 7. Outbound loop (email → form)

- **Target list:** suppliers in the cohort that are **unpopulated** (`har_capabilities = false` in
  `enrichment_queue`) **and not** `reklamsparr`. Prioritise by the queue's `prio` (tier × size × gaps).
- **Send:** via **Resend** (already live). Email invites them to submit their profile and get free buyer
  requests; links to the form (prefilled token where we have a scraped draft — see §9). Include a clear
  opt-out. B2B cold outreach is defensible under legitimate interest in SE, but honor opt-out + reklamsparr.
- **Track:** open/click/submit, so the channel's yield is measurable next to scraping's.

## 8. Public "För leverantörer" onboarding page

- A public **one-way onboarding funnel** — "Är du legotillverkare? Få kostnadsfria förfrågningar.
  Registrera din kapacitetsprofil." → the supplier form. Good for inbound supply + SEO (suppliers searching
  "fler kunder / leads legotillverkning"). Add to nav/footer.
- **Explicitly NOT** a browsable supplier list. No search of other companies, no public profiles. The page
  submits; it does not display the base. (This is the line that protects the moat and the demand intake.)
- JSON-LD: a `Service` describing the supplier offer; keep it lean.

## 9. Phase 2 — "claim your profile" (self-only)

Nice UX once the base is fuller: a supplier searches for **their own** company, sees a **pre-filled draft**
built from scraped `maskinpark`/certs, and confirms/edits it. Safe because a supplier only ever sees their
own record. Turns cold scraped data into warm, consented, corrected data — and is a strong email hook
("we've drafted your profile — 2 minutes to confirm").

## 10. How it connects (architecture summary)

```
Supplier ──(form on Komponentguiden)──▶ supplier_submissions (KG Supabase)
                                              │  validate · org-nr · taxonomy slugs · cert tier · conflicts
                                              ▼
                                   /admin review (v0)  ──approve──▶ scoped write ──▶ company_capabilities
                                                                                      (Masterbase, source=
                                                                                       sjalvrapporterad + conf)
                                                                                            │
Buyer intent ──▶ matching engine ──reads──▶ metalbase_public ◀──joins on slugs────────────┘
```

Shared taxonomy means supply (this channel) and demand (IntentForm) speak the same slug language, so
matching is a clean join regardless of whether a capability came from scraping or self-input.

## 11. Build phasing

- **v0 (buildable now, no Masterbase automation):** supplier form + `supplier_submissions` table +
  org-nr/taxonomy validation + `/admin` review + Resend invite to a bounded, non-reklamsparr batch +
  the public `/for-leverantorer` page. Approved submissions pushed to Masterbase by script.
- **v1:** automated scoped write endpoint (Masterbase Edge Function/RPC) so approved (or auto-qualified)
  submissions flow without manual push. Open/click/submit analytics into the funnel dashboard.
- **v2:** "claim your profile" pre-fill from scraped data; conflict-resolution UI; capacity/utilization
  capture feeding the lazy-twin/M&A track.

## 12. Open decisions

- **Review gate vs auto-accept:** hold everything for `/admin` review (safer, slower) vs auto-accept
  `qualified` submissions and only review `needs_review`? Recommend review-all for the first N, then relax.
- **Cert verification depth:** trust number+issuer, or actually check against a registry (e.g. certifikat-DB)?
- **Utilization/capacity:** ask for it (M&A gold) or omit (friction, suppliers may not share)? Recommend
  optional, clearly framed as "helps us send you the right requests."
- **Where the form lives:** standalone `/for-leverantorer` only, or also embeddable in the outbound email?
  Recommend hosted page + emailed link (deliverability + tokenized pre-fill), not an in-email form.
- **Incentive/messaging:** lead with "free buyer requests" (demand pull) — the strongest hook for a supplier.

## 13. Success metrics

- Coverage lift: `har_capabilities` share of the cohort from self-input vs scraping.
- Channel yield: invites sent → forms opened → submitted → approved (vs scrape success rate).
- Data quality: % submissions needing review; conflict rate vs scraped; cert-verification rate.
- Downstream: self-input suppliers that appear in a delivered match (the real payoff).
