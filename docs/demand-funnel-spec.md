# Demand Funnel — spec (buyers side)

*v1 2026-07-10. Companion to REVIEW-AND-BACKLOG.md item 28. Covers the buyer
demand funnel only; supply intelligence (lazy twins etc.) is deliberately left to
Masterbase's Förvärvsradar — see the ownership-boundary note at the end. Open
decisions resolved: email = warn-and-flag (not hard-block); proposal = hosted page,
60-day validity, no email-gate (see "Proposal page — lifecycle").*

## Purpose

Turn every buyer intent into a measurable, timestamped journey so we can (a) prove
the flywheel ("Antal intents" = the data asset), (b) see where buyers drop off,
(c) surface the two strategic signals — **supply gaps** and **48h SLA adherence** —
and (d) eventually measure "lyckade matchningar". The funnel and the IntentForm are
designed together: the form must collect enough to *validate* an intent is real and
to *instrument* the funnel, without adding friction to the technical spec.

## The funnel — seven event-driven stages

Model each transition as a row in an append-only `intent_events` table
(`intent_id`, `stage`, `ts`, `meta jsonb`) — **not** a single mutable `status`
column — so both drop-off and time-in-stage are derivable.

| # | Stage | Fires on | Data captured | Drop-off it reveals |
|---|-------|----------|---------------|----------------------|
| 1 | Inskickad | `intent_requests` INSERT (`created_at`) | identity + need (see form) | — |
| 2 | Kvalificerad | auto-qualifier ± manual (`qualified_at`) | org verified vs register, SNI/bransch derived, email-domain ok, spam flag | **junk / tire-kicker rate** |
| 3 | Matchad | `match-intent` runs (`matched_at`) | ≥1 supplier, score, rank | **supply gap** — qualified intents we can't fill = recruit/M&A targets |
| 4 | Förslag skickat | admin approves → Resend (`sent_at`) | 5 suppliers, unique proposal URL | **time-to-send vs the 48h promise (SLA)** |
| 5 | Öppnat / klickat | Resend webhooks (`engaged_at`) | opens, click per supplier | proposal / email quality |
| 6 | Svarat / tog kontakt | feedback token (`responded_at`) | "tog kontakt" / "ej relevant" per supplier | match quality |
| 7 | Utfall | follow-up / writeback (`outcome_at`) | offert / order / dead | **= "lyckad matchning"** |

Stage 2→3 (supply gap) and stage 4's clock are the strategically important
signals. Stage 7 is only measurable if the feedback loop (below) is instrumented —
it is the same data as the Masterbase outcome writeback (backlog item 25).

## IntentForm redesign

**Principle:** low friction belongs on the *technical spec*, not on *identity*. A
genuine OEM buyer expects to name their company and use a work email; a mandatory
identity core mainly repels spam and tire-kickers — exactly the validation we want.
Precision fields stay optional with the existing "Osäker / öppen för förslag"
escapes so a real-but-unsure buyer is never blocked.

### Mandatory core

| Field | Rule | Why |
|-------|------|-----|
| `org_nr` | **Mandatory** + Luhn checksum + existence lookup | register-verifiable = real firm; derives SNI/bransch; cross-system key for writeback |
| `company_name` | **Mandatory** (auto-filled from org.nr lookup) | validation + readability |
| `contact_name` | **Mandatory** | accountable real person |
| `email` | **Mandatory** + company-domain check | strongest "real B2B" filter |
| `yrkesroll` | **Mandatory** (dropdown, low friction) | buyer-persona quality signal |
| `material` | **Mandatory** (with "Osäker" escape) | needed for matching |
| `method` | **Mandatory** (with "Osäker" escape) | needed for matching |

Everything else stays optional exactly as today: `project_name`, `phone`,
`tolerance`, surface treatment, `certs`, `volume`, `timeframe`, region, drawing,
marketing consent.

### Turn org.nr from friction into a feature

On org.nr blur, call a lookup (Bolagsverket / allabolag / Masterbase `companies`)
that (a) confirms the company exists, (b) autofills `company_name`, (c) resolves
`sni_kod`/`bransch`. Net effect: requiring org.nr means the buyer types *less* and
the lead is auto-qualified on identity.

### Decisions taken (override if desired)

- **Company-email rule = warn-and-flag, not hard-block.** A hard rule would
  occasionally block a legitimate sole trader on gmail. Instead warn, allow, and set
  a `low_confidence` flag surfaced in the dashboard.
- **Proposal = hosted page, not inline email** (see below).

## Steps after submit

1. **Qualification (new, automatic).** On insert, a qualifier validates org.nr
   (checksum + existence), email domain, and presence of material+method → sets
   `qualification_status = qualified | needs_review | rejected` and writes the
   `Kvalificerad` event. This gate filters junk *before* it costs manual matching
   effort.
2. **Matching.** `match-intent` (blocked on Masterbase key) writes `matches` rows +
   the `Matchad` event. If zero candidates → log a **supply-gap** event (the
   strategic signal), don't silently drop.
3. **Proposal as a hosted page** (`/forslag/[token]`). The 5 suppliers live on a
   tokenized page; the Resend email is a short notification linking to it. This buys
   page views, per-supplier click tracking, time-on-page, a place to host the
   feedback capture, and the ability to update the proposal. Looks more premium than
   an inline list.
4. **Email instrumentation.** Resend webhooks (`delivered`, `opened`, `clicked`,
   `bounced`, `complained`) → `intent_events`. Bounces double as email validation.
5. **Feedback capture = stages 6–7.** On the proposal page, one-click
   "Vi tog kontakt med X" / "Inte relevant" per supplier + a short reason, plus an
   automated N-day follow-up email. Only source of "lyckad matchning"; doubles as the
   Masterbase outcome writeback.

## Proposal page — lifecycle

- **One page per *delivered* intent.** Generated only when you approve a match in the
  admin view (stage 4) — that action creates the page and fires the Resend
  notification. Intents that never match never get a page.
- **Tokenized URL, no login.** `/forslag/[token]`, `token` = random nanoid/UUID,
  never the DB id — so pages can't be guessed or enumerated. Capability-URL security
  model (à la Stripe/DocuSign); frictionless straight from the email. The page
  exposes only the buyer's own intent + the suppliers they asked to be matched with.
  Optional future hardening: an email-gate (enter the submitting email to view) —
  **not in v1**.
- **States:** `active` from `sent_at`; `expired` after the validity window. There is
  no public page before approval.
- **Validity = 60 days from send** (configurable), mirroring the "offert
  giltighetstid" norm in the pricing post. After expiry the URL still resolves but
  renders an "det här förslaget har gått ut — starta en ny matchning" state, not the
  stale supplier list.
- **Never hard-deleted on expiry.** Funnel analytics need the history; the row is
  retained within the 24-month GDPR window the privacy policy already promises, then
  purged with the rest of the intent data.
- **Instrumentation (stages 5–7):** page view → `Öppnat` event; per-supplier link
  clicks → interest signal (which suppliers drew clicks); one-click "Vi tog kontakt"
  / "Inte relevant" per supplier → `Svarat` / `Utfall`. This is what makes the hosted
  page beat an inline email.
- **Data:** `proposal_token`, `proposal_status`, `sent_at`, `expires_at` on
  `intent_requests` — or a dedicated `proposals` table if re-proposing to the same
  buyer is ever needed (one-per-intent for MVP).

## Data artifacts

- `intent_events(intent_id, stage, ts, meta jsonb)` — the backbone.
- `intent_requests` new columns: `sni_kod` / `bransch`, `org_verified bool`,
  `qualification_status text`, `low_confidence bool`, `source` / UTM (channel
  attribution).
- `matches` table with a **denormalized supplier snapshot** (org_nr, name, key
  financials at match time) so historical funnels/top-lists don't depend on a live
  cross-DB join and stay historically accurate.
- `/forslag/[token]` proposal page + `proposal_token` / `proposal_status` /
  `sent_at` / `expires_at` (see "Proposal page — lifecycle"; 60-day default validity).
- Feedback + N-day follow-up mechanism.
- org.nr→SNI enrichment job (nightly or at insert), graceful "unknown".
- Resend webhook handler (Edge Function or route handler).

## Demand KPIs

Antal intents (total + weekly run-rate) · qualification rate · **match rate =
supply coverage** (and its inverse, the supply-gap list) · **median time-to-send vs
48h + breach rate** · engagement rate (open/click) · lyckade matchningar (tiered:
engaged → contacted → deal).

## Buildable now vs gated

**Now (zero Masterbase dependency):** mandatory-core form redesign, org.nr checksum
validation, `intent_events` log, the auto-qualifier, and a **v0 dashboard** = intake
+ submitted→qualified funnel + capability/material/region demand + the 48h clock
(times from events). org.nr→company/SNI lookup can use Bolagsverket/allabolag even
before the Masterbase key.

**Gated:** the *Matchad* stage (needs the matching engine + Masterbase key); the
proposal page / Resend / feedback stages (need `matches` to exist, then Resend
configured); "lyckad matchning" (needs the feedback loop, = item 25).

## Dependencies & boundaries

- Auth: `intent_requests` is anon-INSERT-only RLS; the dashboard + admin need an
  authenticated role with SELECT (Supabase Auth, single user).
- Related backlog: item 13 (admin review + Resend), item 21 (live metrics), item 25
  (outcome writeback — same work as stage 7), matching engine (item 12/C).
- **Ownership boundary:** supply analytics (best-in-class, lazy twins) stays in
  Masterbase's Förvärvsradar. Komponentguiden owns demand + the `matches` join.
