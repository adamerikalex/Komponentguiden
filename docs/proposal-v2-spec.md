# Proposal v2 — supplier profile pages + brokered intro ("ta kontakt via oss")

*Spec v1 · 2026-08-17 · Komponentguiden*
*Turns the tokenized proposal (`/forslag/[token]`) from a static 5-supplier list into an interactive
shortlist: each supplier gets a private profile page, the buyer's engagement is tracked per supplier,
and a "ta kontakt via oss" action brokers a warm intro — the connective tissue between the demand
funnel and the supplier-input channel.*

---

## 1. Why (strategic role)

Today the proposal is a flat list with two feedback buttons. Two upgrades make it far more valuable:

1. **Per-supplier engagement data.** Right now we only get the explicit "tog kontakt / inte relevant"
   clicks. Profile *views* are passive, low-friction signal — *which* of the five a buyer actually
   looked at — which is much richer for learning match quality (does rank predict interest? which
   capability profiles win attention?).
2. **A brokered intro changes our position in the deal.** Instead of "here are five names, go contact
   them," "ta kontakt via oss" lets us facilitate the connection. That gives us the connection event (a
   strong outcome signal) and — crucially — it's the *supplier's* value prop: they receive a qualified
   lead **from Komponentguiden**, which drives supplier engagement and consent. It closes the loop with
   the supplier-input channel (a supplier who got a warm lead is a supplier who'll keep their profile
   current).

## 2. Non-negotiables

- **Private + tokenized.** The proposal and every profile page are visible only to the buyer holding
  the link. Never public, never browsable, `robots`-disallowed (`/forslag` already is).
- **Respect consent + `reklamsparr`.** Any outreach to a supplier honors their `consent_contact`
  (self-input) or, for scraped-only suppliers, is brokered manually — never a cold auto-email to a
  `reklamsparr`-flagged company.
- **No financials to buyers.** Profiles show capability + banded size/stability (via `metalbase_public`),
  never raw revenue/scores.
- **Preserve buyer relationship ownership.** "Ni behåller kundrelationen" stays true — we *introduce*,
  we don't insert ourselves into the commercial deal.

## 3. Buyer experience

```
/forslag/[token]                     five-supplier shortlist (as today, restyled)
   └─ click a supplier ──▶ /forslag/[token]/[matchId]   private profile page
                              · capability profile (rich once the JWT lands; match info in v0)
                              · "Låt oss introducera er" (primary — brokered intro)
                              · "Vi tog kontakt" / "Inte relevant" (existing feedback)
```

The shortlist cards become clickable into a profile. The profile's primary CTA is the brokered intro;
the existing feedback stays.

## 4. Engagement events (append-only `intent_events`)

Reuse the existing log; add two stages (the column is free-text `stage`, no schema change needed):

- `engaged` — proposal opened (already logged).
- **`viewed_supplier`** (new) — buyer opened a specific supplier's profile. `meta: { supplier, match_id }`.
  Passive interest signal, logged once per supplier.
- `responded` — existing "tog kontakt / inte relevant" feedback.
- **`intro_requested`** (new) — buyer clicked "ta kontakt via oss". `meta: { supplier, match_id }`. The
  connection event — the strongest demand-side outcome signal short of a closed deal.

## 5. The "ta kontakt via oss" flow

Buyer clicks on a profile → server action:
1. Logs `intro_requested`.
2. **Notifies Alexander** (Resend) that an intro was requested, with the buyer + request + supplier, and
   a link to `/admin/[id]` — so it can be brokered/tracked.
3. **Emails the supplier** *only if* they're contactable (self-input `consent_contact = true`, or an
   existing relationship) — a warm "en köpare vill prata med er" with the technical request. Otherwise
   Alexander brokers manually (the notify email is enough to act on).

**What the intro email shares:** the buyer *chose* to be introduced, so sharing their company + the
technical request (material, method, volume, timeframe, drawing note) is appropriate. NDA still applies
to drawings (the intent's `nda_accepted`). Open decision on anonymization (§10).

**Broker-first, not broker-only.** Lead with "Låt oss introducera er" (warm, gives us the data + the
supplier a qualified lead). A secondary "kontakta direkt" (exposing the supplier's contact) is possible
*for consented suppliers* but is a later option — and note the brokered path is actually *simpler* for
v0 because it never needs to expose supplier contact details.

## 6. Supplier profile page — content (and the JWT dependency)

- **v0 (today's data, no dependency):** rank, `supplier_name`, `supplier_org_nr`, `supplier_lan`, and the
  `supplier_note` the admin wrote when building the match. Enough to make the page real and track views.
- **v1 (needs the `metalbase_reader` JWT — pending, §8 of the backlog):** the rich profile — readable
  capabilities (slugs → labels), certifications, machine-park highlights, `storleksklass` +
  `stabilitetsklass` bands, location — read from `metalbase_public` / `company_capabilities_public`.
  **This is where the supplier-input channel pays off:** a supplier who submitted their own profile
  (`source='sjalvrapporterad'`) has richer, consented, corrected data to show.

## 7. Data model

No new tables required for v0. `matches` already holds the per-supplier rows; `intent_events` carries the
new `viewed_supplier` / `intro_requested` stages via its `meta` jsonb. If intro volume grows, promote
intros to a `supplier_intros` table (buyer, supplier, status: requested → introduced → responded) — but
events suffice to start.

## 8. Architecture

```
matches (per supplier) ──┐
intent_events (events) ──┼──▶ /forslag/[token]  +  /forslag/[token]/[matchId]  (service-role reads)
metalbase_public ────────┘        (v1 rich profile — via metalbase_reader JWT)
        │
"ta kontakt via oss" ──▶ server action ──▶ log intro_requested
                                           ──▶ Resend: notify Alexander (always) + supplier (if consented)
                                           ──▶ /admin/[id] shows the intro; funnel gains a stage
```

## 9. Build phasing

- **v0 (buildable now, no JWT):** clickable shortlist → per-supplier profile route showing current match
  data; log `viewed_supplier` on open + `intro_requested` on the CTA; "ta kontakt via oss" → Resend notify
  to Alexander (broker manually); surface intros in `/admin/[id]` and the demand funnel.
- **v1 (JWT + populated capabilities):** rich profiles from `metalbase_public`/`company_capabilities`;
  auto-email the consented supplier on intro; supply-side engagement view.
- **v2:** optional "kontakta direkt" for consented suppliers; two-way intro status; profile-view →
  match-quality analytics loop.

## 10. Open decisions

- **Broker-only vs broker + direct contact** — how much do we facilitate vs. hand over? (Recommend
  broker-first, direct as a later opt-in for consented suppliers.)
- **Anonymize the buyer in the intro email** (share material/method/region/volume but withhold company
  until the supplier engages) vs. full disclosure? (Recommend full, since the buyer chose the intro — but
  offer an "anonym förfrågan" toggle later.)
- **Auto-email the supplier vs. always KG-brokered** for v0 — start KG-brokered (simpler, safer on
  consent), auto-email consented self-input suppliers in v1.
- **Profile as a route (`/forslag/[token]/[matchId]`) vs. expandable inline** — route is cleaner for view
  tracking + linking; recommend route.
- **Does "ta kontakt via oss" replace or complement "vi tog kontakt"?** (Complement — intro_requested is
  "please connect us"; tog-kontakt is "we've already reached out ourselves".)

## 11. Success metrics

- Profile-view rate per proposal, and per rank (does rank predict interest?).
- Intro-request rate (intros ÷ proposals) — the key engagement KPI.
- Intro → confirmed connection → (eventually) won deal.
- Supplier response rate to brokered intros (supply-side health).
- Feeds the outcome-writeback (backlog item 25) and match-quality learning.
