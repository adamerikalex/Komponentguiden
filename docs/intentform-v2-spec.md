# IntentForm v2 — Proposal & Build Spec

*2026-07-07 · **IMPLEMENTED** same day (commit `ef27d71`), live on komponentguiden.vercel.app.
Follow-ups (v2.1: "Gjutning & smide" rename, omitted chips, montering-kvalitet scope
decision, matrix validation) tracked as item 26 in REVIEW-AND-BACKLOG.md.
Nothing here changes existing slugs, Supabase contracts, or category-page routes — v2 is additive.*

## Design principles (settled in owner discussion 2026-07-07)

1. **Material first.** The buyer has a drawing; material is on it, method is often negotiable.
2. **Soft filtering, never hard.** Rare combos (Stål + 3D-printing = metal SLM) are often the
   highest-value intents. Nothing is ever unselectable.
3. **Precision is always optional.** The GTM wedge is low friction. Group-level intent
   (today's behavior) must remain a complete, valid submission.
4. **Slugs are the contract.** UI labels may change; slugs never do. All new mappings live in
   `src/lib/taxonomy.ts`.

## New section order

```
0. Projektnamn / benämning          (text, frivilligt — MOVED to very first field, from Volym)
1. Materialgrupp                    (radio — moved to first choice)
2. Bearbetningsmetod                (radio — filtered by material; + 2 new options)
   └─ optional: "Vill du precisera?" process chips (multi-select)
3. Kvalitet & certifiering          (tolerans, certs unchanged; ytbehandling → CHIPS, see below)
4. Volym & leverans                 (minus projektnamn; + NEW: Geografiskt krav)
5. Ritningar & underlag             (unchanged)
6. Kontaktuppgifter                 (unchanged)
7. NDA + submit                     (unchanged)
```

## Step 1 — Materialgrupp

Same six options, same labels (category-page `preselectedMaterial` strings depend on them):
`Aluminium · Stål · Rostfritt · Titan / Special · Plast · Komposit`. Default: none selected
(v1 defaulted to Aluminium — a real choice beats a silent default; keep Aluminium as fallback
if user skips straight to submit).

## Step 2 — Bearbetningsmetod, filtered by material

Method list gains two options (existing five keep their exact labels — category pages depend
on them):

| Option | New? | → capability_slugs |
|---|---|---|
| Skärande bearbetning | | `skarande-bearbetning` |
| Plåt & svets | | `platbearbetning`, `svetsning` |
| Gjutning | | `gjutning-formande` |
| Formsprutning | | `polymer` |
| 3D-printing | | `additiv-tillverkning` |
| **Komposittillverkning** | NEW | `komposit-laminering`, `komposit-rtm` (grupp polymer) |
| **Osäker / öppen för förslag** | NEW | union of the material's *primary* groups |

**Material → method matrix** (primary shown prominently; secondary collapsed behind a
"Visa alla metoder"-link; "Osäker" always visible last):

| Material | Primary | Secondary (visa alla) |
|---|---|---|
| Aluminium | Skärande, Plåt & svets, Gjutning | 3D-printing, Formsprutning*¹ |
| Stål | Skärande, Plåt & svets, Gjutning | 3D-printing |
| Rostfritt | Skärande, Plåt & svets | Gjutning, 3D-printing |
| Titan / Special | Skärande, 3D-printing | Plåt & svets, Gjutning |
| Plast | Formsprutning, 3D-printing, Skärande | — |
| Komposit | Komposittillverkning | 3D-printing, Skärande |

*¹ Formsprutning under Aluminium/metals is arguably noise — matrix line item to validate
with co-founder along with the rest. **The matrix is a UI-ranking concern only; it never
affects slug storage.**

No material chosen yet → all seven methods visible unfiltered (v1 behavior).

## Step 2b — Optional precision chips

Rendered only after a method is chosen. Multi-select chips, header
**"Vill du precisera? (frivilligt — hjälper matchningen)"**. Labels Swedish, values = process
slugs from Masterbase `docs/taxonomi.md`:

| Method | Chips (label → slug) |
|---|---|
| Skärande bearbetning | Svarvning→`cnc-svarvning` · Fleroperationssvarvning→`fleroperationssvarvning` · Långsvarvning→`langsvarvning` · Fräsning 3-axlig→`cnc-frasning-3ax` · Fräsning 5-axlig→`cnc-frasning-5ax` · Slipning→`slipning` · Gnistbearbetning→`gnistbearbetning` · Borrning/arborrning→`borrning-arborrning` |
| Plåt & svets | Laserskärning→`laserskarning` · Stansning→`stansning` · Vattenskärning→`vattenskarning` · Kantpressning→`kantpressning` · Valsning→`valsning-rundning` · MIG/MAG→`mig-mag` · TIG→`tig` · Robotsvets→`robotsvets` · Lasersvets→`lasersvets` |
| Gjutning | Pressgjutning→`pressgjutning` · Sandgjutning→`sandgjutning` · Kokillgjutning→`kokillgjutning` · Precisionsgjutning→`precisionsgjutning` · Smide→`smide` · Pulvermetallurgi→`pulvermetallurgi` |
| Formsprutning | Formsprutning→`formsprutning` · Extrudering→`extrudering` · Formblåsning→`formblasning` · Vakuumformning→`vakuumformning` · Rotationsgjutning→`rotationsgjutning` · Gummipressning→`gummipressning-vulkning` |
| 3D-printing | FDM→`3dp-fdm` · SLS→`3dp-sls` · Metall (SLM)→`3dp-slm-metall` · SLA→`3dp-sla` · MJF→`3dp-mjf` |
| Komposittillverkning | Laminering→`komposit-laminering` · RTM→`komposit-rtm` |
| Osäker | (no chips) |

**Storage rule:** `capability_slugs` = group slug(s) **always**, + selected process slugs
appended. Skipping chips = exactly v1 output. Matching engine per taxonomi.md: group-level
default, process-level when specified. No schema change.

## Step 3 change — Ytbehandling: free text → chips (owner decision 2026-07-07)

Replace the free-text field with an optional multi-select chip row (same pattern as certs),
labels → slugs from taxonomi.md's ytbehandling group:

Anodisering→`anodisering` · Pulverlackering→`pulverlackering` · Våtlackering→`vatlackering`
· Elförzinkning→`elforzinkning` · Varmförzinkning→`varmforzinkning`
· Härdning/värmebehandling→`hardning-varmebehandling` · Blästring→`blastring`
· Polering/ytfinish→`polering-slipning-ytfinish` · Fosfatering→`fosfatering`
· Kemisk ytbehandling→`kemisk-ytbehandling` · **Annat** (reveals small free-text input)

**Storage:** selected chips append their process slugs to `capability_slugs` (replaces v1's
blanket `ytbehandling` group tag — strictly more precise). "Annat" free text still writes
`surface_treatment` (column unchanged) and appends the group slug `ytbehandling`. No chips,
no text → nothing appended (v1-compatible).

## Step 4 addition — Geografiskt krav (region/län)

New field in "Volym & leverans". UI: one select/chip-row —
**"Geografiskt krav på leverantören"**, default **"Hela Sverige (rekommenderas)"**, plus
multi-select of län grouped by landsdel (Götaland/Svealand/Norrland). Microcopy:
*"Ett geografiskt krav minskar antalet möjliga leverantörer — välj bara om närhet är ett
skarpt krav."* (Nudges toward the bigger funnel; regional intent still captured when real.)

**Storage:** new column, empty array = no requirement:

```sql
alter table intent_requests
  add column if not exists region_slugs text[] not null default '{}';
create index if not exists intent_requests_region_slugs_idx
  on intent_requests using gin (region_slugs);
```

Slug format: `<län>-lan` kebab-case (`stockholms-lan`, `vastra-gotalands-lan`,
`jonkopings-lan`, `skane-lan`, …all 21). Mapping constant `LAN` in `taxonomy.ts`.
Masterbase `companies.lan` holds län names — match-intent maps slug↔name trivially;
lat/lon distance matching is a later upgrade, this doesn't preclude it.

**Region category pages** get optional pre-selection via a new optional field
`preselectedRegions?: string[]` on `CategoryPage` (additive — no existing entry changes):
göteborg→`['vastra-gotalands-lan']`, stockholm→`['stockholms-lan']`,
småland→`['jonkopings-lan','kronobergs-lan','kalmar-lan']`, skåne, blekinge, halland → own län.

## Category-page pre-selection — both directions (unchanged invariant)

- `defaultMaterial` set (material pages): material pre-chosen → methods render filtered. Natural.
- `defaultMethod` set (method pages, e.g. /cnc-bearbetning): method pre-chosen **before** any
  material. Render it as selected in the unfiltered list; when the user then picks a material
  that ranks the preset method as secondary, **keep the selection** (auto-expand "visa alla"
  so it's visible) — never clear a pre-selection.
- Invariant stays: `preselectedMethod`/`preselectedMaterial` strings in
  `content/categories/index.ts` must equal option labels character-for-character. The five
  existing method labels and six material labels are unchanged in v2, so **no category-page
  edits are required** (region pre-selection is optional enhancement).

## What does NOT change

Supabase contract (only the additive `region_slugs` column), existing slugs and
`METHOD_TO_SLUGS`/`MATERIAL_TO_SLUGS`/`CERT_TO_SLUGS`, category-page routes and copy,
sections 3/5/6/7 of the form, the success card, drawing upload. Single-page form — **no
wizard/steps**.

## Implementation map

| Piece | File | Est. |
|---|---|---|
| `MATERIAL_TO_METHODS` (primary/secondary), `METHOD_TO_PROCESSES`, `LAN` + region helpers, `UNSURE_METHOD` handling | `src/lib/taxonomy.ts` | small |
| Section reorder, filtered method render + "visa alla", chips row, region field, insert payload (`+ region_slugs`, process slugs into `capability_slugs`) | `src/components/IntentForm.tsx` | medium |
| `region_slugs` migration (SQL above) | `supabase/migrations/` — run in SQL editor BEFORE deploy | tiny |
| Optional: `preselectedRegions` | `content/categories/index.ts` + `[category]/page.tsx` | small |

Order: migration → taxonomy.ts → IntentForm → (optional) category regions. Verify like the
slug work: `tsc --noEmit`, eslint, test submit on live, SQL check of newest row incl.
`region_slugs`.

## Decisions needed before/at build

- [ ] Co-founder validates the material×method matrix (5 min — it's UI ranking only)
- [ ] Owner: confirm län granularity for region (vs. landsdel or fritext ort) — spec assumes län
- [ ] Owner: confirm "Osäker / öppen för förslag" wording
- [ ] New process slugs used here must exist in Masterbase `capabilities` seed (they all come
      from taxonomi.md, so merging PR #98 unchanged covers it)
