# Komponentguiden — Review & Items Backlog
*Codebase, design, content, business model, SEO/AI-search, Metalbase integration — plus the categorized backlog (§7)*
*2026-07-07 · Based on full read of both repos + live site at komponentguiden.vercel.app*

---

## Executive summary

The product is in unusually good shape for its stage. The codebase is small, clean, and does exactly what the GTM plan says it should: 20 keyword-targeted category pages, 5 substantive blog posts, a fully wired intent form, and an /akut page that correctly routes urgency to a human instead of the 48h form. The design system is coherent and the copy is confident and professional.

The two biggest problems are not in the code. First: **the site is effectively invisible** — komponentguiden.se is not connected (the domain returns an error page), the site lives on a vercel.app subdomain, has no sitemap, no robots.txt, no structured data, and is not in Google's index. All SEO/content investment is currently earning zero return. Second: **the Metalbase integration is designed but only half landed.** The taxonomy, architecture, and draft migrations exist in an unmerged Masterbase PR (`docs/metalbase-datamall`); nothing is yet applied to the Masterbase live DB. The buyer side was completed 2026-07-07 during this review: the IntentForm now saves taxonomy slugs on every submission (and old rows were backfilled), so intent data is match-ready.

---

## 1. Design & UX

**What works.** The design token system in `globals.css` gives the site a consistent, credible B2B identity — Stripe-adjacent indigo/slate palette, Roboto Mono metadata labels that signal "technical platform," restrained use of animation. The category-page template (hero → pain → value props → steps → form) is a correct conversion architecture: every page ends in the form, pre-selected with the right method/material. The /akut page's problem/solution grid is the strongest page on the site — concrete, empathetic, and tonally distinct as the GTM plan demands.

**What undercuts it.**

- **The metrics section actively hurts trust.** *(RESOLVED 2026-07-08, commit `7122738` — SSR now renders real finals, metrics reframed as database facets, "0 matchningar" removed, hero reconciled. Original finding kept below for context.)* Crawlers and any non-JS reader see the scramble start values — "1 000 företag, 10 kartlagda, 0 presenterade matchningar" — not the real 8 860/171. And even the real numbers tell a weak story: "171 kartlagda / 0 matchningar" publicly admits the database is thin and no match has ever been delivered. Meanwhile the hero claims "vi har kartlagt tusentals svenska legotillverkare." That's a direct internal contradiction (171 ≠ tusentals) visible on a single scroll, and precisely the kind of inconsistency an AI answer engine will surface verbatim.
- **Footer LinkedIn links to `#`.** A dead social link on a trust-driven B2B site is worse than no link.
- **Blog cards are gradient placeholders** — already on your backlog, worth prioritizing since the blog is a primary SEO asset.
- **`/about` is the only English route** on an otherwise Swedish-slugged site (GTM plan specified `/om-oss/`). Minor, but fix before indexing, not after.
- The form's "Tidsram: Akut / Brandsläckning" option quietly contradicts the GTM rule that urgent needs must never enter the 48h flow. Selecting it should redirect or at least interstitial to /akut.

## 2. Content

The five blog posts map one-to-one onto the GTM plan's prioritized topics, at ~800–930 words each — real content, not filler, targeting the right funnel stages (broad research query → price guide → technical comparison → procurement checklist → defense/AS9100 niche). The 20 category pages have genuinely differentiated copy; the Småland page referencing Gnosjöandan is exactly the kind of local-knowledge signal that both buyers and language models reward.

Gaps: no author bylines or publish/update dates in metadata (E-E-A-T), no FAQ sections anywhere (the single highest-leverage format for AI search citation), and blog posts don't consistently link to their sibling category pages as the GTM plan requires. Content cadence also matters: everything is dated 2026-06-01; a site whose entire corpus shares one date looks generated. Stagger and keep publishing 1–2/month.

## 3. Business model

The three-layer model (free matching → Concierge margin → intent-data M&A) is coherent and the strategic logic compounds: every free match generates intent data, intent data prices the Concierge deals, and matched-but-underutilized workshops surface the "Lazy Twins" acquisition pipeline. The free wedge is correctly identified as the risk-eliminator in conservative procurement culture, and the reshoring/defense macro thesis is real.

Honest risks worth stating:

- **The 48h/5-match SLA is a promise the system can't yet keep automatically.** With 171 enriched companies and no matching engine, every match is manual. That's fine (the GTM plan says so explicitly), but the site promises "proprietär algoritm" — the gap between marketing claim and operational reality is currently large. Deliverable quality on the first 20 manual matches will define the brand.
- **Supply-side data provenance.** Matching against scraped/registry-derived supplier data means recommending workshops that never opted in. The first email a workshop gets from Komponentguiden ("a buyer wants you") is actually a great cold-open — but have the story ready for "how do you know my maskinpark?", and honor `reklamsparr`.
- **Concierge margin (8–12 % cost-plus) sits on top of SME workshop pricing** — viable for urgency and defense-certified work, thin for competitive commodity parts. The /akut and AS9100 funnels are therefore not just marketing channels; they're the margin story. Prioritize them accordingly.
- **The no-directory SEO tradeoff is consciously accepted**, but it makes the 20 category pages + blog + backlinks the *entire* organic engine. That engine is currently switched off (see §5).

## 4. Codebase vs. stated goals — validation

Everything CLAUDE.md marks as done **is** done and works as described: all routes live, IntentForm inserts to `intent_requests` with Storage upload, RLS anon-INSERT, hamburger nav, ScrollyTelling, metrics animation. Code quality is high — small components, server components by default, `generateStaticParams`/`generateMetadata` used correctly on both dynamic routes.

Findings that need attention:

1. **IntentForm ≠ taxonomy.** ~~The form submits raw labels only.~~ **Resolved 2026-07-07:** the form now maps selections to `capability_slugs`/`material_slugs`/`cert_slugs` at insert (`src/lib/taxonomy.ts`), columns + GIN indexes added, existing rows backfilled.
2. **No region/location field in the form.** Matching is defined as "slugs ∩ region ∩ size," and six landing pages sell regional matching — but the form never asks where the buyer is or where delivery must happen. Org-nr can proxy HQ location, but not delivery site.
3. **Silent drawing loss.** If the Storage upload fails, submission proceeds with `drawing_url: null` and the buyer is never told their ritning didn't attach. For a product whose accuracy pitch is "ladda upp ritning," this should at minimum warn.
4. **NDA checkbox is pre-checked.** Pre-ticked consent is both a GDPR anti-pattern and a signal-quality loss (you can't distinguish deliberate acceptance).
5. **No spam defense** on a public anon-INSERT table — no honeypot, no rate limit. Fine today, painful the week a bot finds the form.
6. **Doc drift:** CLAUDE.md says `content/posts/`; reality is `content/blogg/`. CLAUDE.md references `docs/taxonomi.md` and `docs/metalbase-strategi.md` in Masterbase — neither file exists (see §6).

## 5. SEO & AI-search readiness

**Verdict: the on-page foundation is good; the technical layer is almost entirely missing, and the site is not currently discoverable at all.**

Verified against the live deployment:

| Layer | Status |
|---|---|
| Custom domain | ✗ komponentguiden.se not connected (error page); site lives on vercel.app |
| Google index | ✗ Site absent from search results |
| sitemap.xml | ✗ Missing (no `app/sitemap.ts`) |
| robots.txt | ✗ Missing (no `app/robots.ts`) |
| Canonical URLs / `metadataBase` | ✗ Not set — risk of vercel.app being indexed as the canonical when indexing does start |
| Structured data (JSON-LD) | ✗ None — no Organization, Service, BlogPosting, FAQPage, BreadcrumbList |
| Per-page titles/descriptions | ✓ Good — keyword-targeted on all 20 category pages and blog posts |
| OG/Twitter cards | ✓ Working, but one generic teal image for all pages (and off-brand vs. indigo) |
| `lang="sv"`, semantic H1s, SSG HTML | ✓ Good — content fully readable without JS |
| Search Console | ✗ No evidence of setup (GTM plan action #5) |

**For AI search specifically** (ChatGPT, Perplexity, Claude, Google AI Overviews): the fundamentals are better than most sites — static HTML, clean heading hierarchy, definitional content in the blog. What's missing is what makes a site *citable*: structured data, FAQ-formatted Q&A blocks ("Vad kostar CNC-bearbetning i Sverige?" with a direct answer), named authors, an About page with verifiable facts (org.nr, address, founders), and consistent numbers (the 171-vs-tusentals contradiction is exactly what an LLM will flag or repeat). Since answer engines lean heavily on entity establishment: get the company into Bolagsverket-linked directories, LinkedIn, and at least one Ny Teknik/Verkstadstidningen mention — those are the sources LLMs retrieve when asked "hur hittar man legotillverkare i Sverige?"

One deliberate caveat: with the directory model off the table, you'll never win generic head terms on volume. The realistic SEO win is owning the ~30 long-tail commercial queries the category pages target, plus AI-search citations from the blog. That's achievable — but only after the technical layer exists.

## 6. Metalbase integration — desired vs. actual

**Desired (per CLAUDE.md):** shared capability taxonomy (~70 process slugs) defined in Masterbase `docs/taxonomi.md`; supplier side exposed via scoped read-only view `metalbase_public` over `company_capabilities`/`company_certifications`; IntentForm mapping selections to the same slugs; matching = SQL join on slugs ∩ region ∩ size with embeddings as tiebreaker; demand data written back on org_nr (flywheel per `docs/metalbase-strategi.md`).

**Actual (verified 2026-07-07 — including the open PR branch `docs/metalbase-datamall`, not yet merged to main):**

- `docs/taxonomi.md`, `docs/metalbase-strategi.md`, `docs/arkitektur.md`, `docs/datamall-metalbase.md`, `docs/sni-universum.md`, `docs/berikning-runbook.md` — **all exist in the PR** and are high quality: ~70 process slugs across 8 groups with capacity dimensions, cert types, explicit IntentForm→taxonomy and legacy-maskinpark→taxonomy mapping tables, plus normalization rules (AI-normalized, raw data never overwritten, confidence-scored)
- Draft migrations exist in `supabase/migrations-utkast/`: taxonomy + satellite tables (`capabilities`, `cert_types`, `company_capabilities`, `company_certifications`, `company_events`), the `metalbase` universe view (SNI tiers + size floor), `enrichment_queue` with a sensible priority formula, and a `coverage` materialized view. Marked as drafts pending verification against the live DB — correctly so
- Not yet done: PR unmerged; drafts not applied to the live DB; `company_capabilities` unpopulated; the `metalbase_public` scoped view exists as architecture (arkitektur.md §5) but not yet as DDL in the drafts
- On the Komponentguiden side: IntentForm still stores raw labels — the slug columns and insert-mapping remain unimplemented, though the exact mapping to build against is now specified in taxonomi.md
- `companies` (~689k rows) with `maskinpark` jsonb, `certifieringar text[]`, `profile_embedding` pgvector, rich financials — the raw material is all there and it's excellent
- Anon key / project access — still blocked on co-founder

**Assessment.** The architecture is right and now properly documented: slug-join matching is debuggable and explainable (which matters when you must justify five matches to a skeptical inköpschef), embeddings as tiebreaker only, scoped view instead of service-key sharing, and source-tracked satellite tables with confidence scores rather than overwriting raw data. The strategy doc also upgrades the M&A thesis into something screenable ("lazy twin" = capability-profile peer group + below-P25 margin + fresh maskinpark + weak commercial signals — distinguishing lazy from worn-out via capex-vs-depreciation). The buyer side of the contract is now implemented (slug mapping live as of 2026-07-07). The remaining work is on the Masterbase side: **merge the PR, verify the draft DDL against the live DB, and populate the capability tables** — until then, intents are match-ready but there is nothing to match them against.

Also note the financial dimension is underused in the plan: `companies` already has soliditet, marginals, and health scores — "filtrering på finansiell stabilitet" is promised on the homepage and is a real differentiator vs. any directory. Make it an explicit scoring input, not just marketing copy.

## 7. Backlog

Each item below has a plain-language explanation of what it is and why it matters. Categories: **✅ Already implemented**, **🔴 Must-have** (the business doesn't work, or gets hurt, without it), **🟡 Nice-to-have** (real improvement, safe to postpone).

### ✅ Already implemented

**The website foundation** (built before this review): all pages live on Vercel — homepage, 20 landing pages targeting specific search phrases ("hitta CNC-leverantör", "legotillverkare Småland"…), 5 in-depth blog articles, the Concierge and Akut pages, and the intent form that saves requests and uploaded drawings into your Supabase database.

**IntentForm v2** (implemented 2026-07-07, commit `ef27d71`, live): material-first flow with soft-filtered methods ("Visa alla metoder" escape hatch, "Osäker / öppen för förslag" option, new "Komposittillverkning" option), optional process-level precision chips, ytbehandling as taxonomy chips + "Annat" fallback, projektnamn moved to first field, and a län-level "Begränsa geografiskt" multi-select behind progressive disclosure (`region_slugs text[]`, empty = hela Sverige, GIN-indexed). Spec: `docs/intentform-v2-spec.md`. All option lists map 1:1 to slugs in Masterbase `docs/taxonomi.md` (PR #98). Refinements queued as item 26 below.

**Technical SEO layer — sitemap, robots.txt, canonical** (implemented 2026-07-07, commit `c9e9e82`, verified live same day): `src/app/sitemap.ts` (all ~32 routes with priorities), `src/app/robots.ts` (all crawlers allowed, incl. AI-search bots — deliberate), `metadataBase` + canonical in `layout.tsx`. Base URL comes from the `NEXT_PUBLIC_SITE_URL` env var with vercel.app as fallback, so **when the domain is purchased, no code changes are needed** — see must-have item 1.

**FAQ blocks + FAQPage structured data, 6 priority pages** (implemented 2026-07-07, commit `4add617`): 24 Q&As on the CNC, plåt/svets, aluminium, rostfritt, AS9100 and Småland pages, written to be quotable by AI search engines, each emitting FAQPage JSON-LD. Content lives in `content/categories/faq.ts`; rendering is automatic for any slug with entries. Remaining 14 pages tracked in item 16. Hard numbers deliberately hedged pending fact-check (item 11).

**Taxonomy slug mapping** (implemented 2026-07-07, during this session): when a buyer submits the form, the code now translates their choices into standardized machine-readable tags ("slugs") and saves those alongside the readable text. *Plain version: "Plåt & svets" is a label for humans; `platbearbetning` + `svetsning` are the tags the matching engine will use to find suppliers. Both are now saved on every submission, and older submissions were back-translated too. This means the matching engine can be built on clean data from day one.* Includes: `src/lib/taxonomy.ts`, updated form, database columns + backfill.

**Metrics section reframed as live Metalbase content + hero reconciled + SSR fix** (implemented 2026-07-08, commit `7122738`, live): the homepage metrics now read as three *facets* of the database instead of a shrinking funnel. (1) `8860` — "Företag inom bearbetning av metall, plast och komposit" (thousand separator removed per owner); (2) `171` — "Analyserade företag i vår databas" (was "Kartlagda" — that word now belongs to the 8860); (3) NEW "Registrerade maskintyper" replacing the trust-damaging "0 presenterade matchningar". The third metric is the aggregate of `maskinpark` machine/process records across the analysed companies — *one registered machine type = one identified machine/process in a supplier's park, NOT a physical-unit count* (chosen over certs/län because it speaks to the fragmented-overcapacity → attractive-pricing thesis). **SSR bug (A5) fixed:** `MetricsSection.tsx` now initialises state to the real finals, so server HTML and non-JS crawlers see the true numbers; the scramble is decoration layered on after hydration. **Hero reconciled** (`src/app/page.tsx`): "kartlagt tusentals" now maps to the 8860, and "bedömt finansiell stabilitet, maskinpark, certifieringar" → "analyserar löpande …" so the deep-assessment claim maps to the growing 171 instead of contradicting it. **NOTE: the third metric value is a PLACEHOLDER (`1240`, isolated in the `REGISTERED_MACHINE_TYPES` constant with a loud TODO)** — deliberately left until the live DB connection lands. See item 21.

**IntentForm integrity trio — drawing-failure warning, Akut routing, marketing consent** (implemented 2026-07-10, commit `be51227`, live): **B8** — the Storage upload error is now captured; on failure the request still submits (the lead is never dropped) but the success card shows an amber warning telling the buyer to email the drawing to info@komponentguiden.se (`drawingFailed` state). **B9** — selecting tidsram "Akut / Brandsläckning" now surfaces a red inline callout routing to `/akut` (same-day, human). *Design note:* implemented as flag-and-route, NOT a hard block — the buyer can still submit; the GTM plan's stricter reading ("never enter the 48h flow") would mean hard-blocking the submit, an easy follow-up if wanted. **B10** — a separate, **unticked** marketing opt-in checkbox in section 6, stored as `marketing_consent boolean` (migration `supabase/migrations/20260710_intent_requests_marketing_consent.sql`, run manually in Supabase before deploy), plus a "Marknadsföring och nyhetsbrev" section in `/sekretesspolicy` (legal basis = consent, withdrawal noted) and the policy date bumped to juli 2026. tsc + eslint clean.

### 🔴 Must-have

**A. Make the site findable (the "visibility layer") — nothing else pays off until this is done**

1. **Buy komponentguiden.se — then two 5-minute steps** (owner, no code needed): (a) connect the domain in Vercel (Domains tab; pick www or apex, 301 the other), (b) set `NEXT_PUBLIC_SITE_URL=https://komponentguiden.se` in Vercel → Settings → Environment Variables (Production) and redeploy — sitemap, robots and canonicals all switch to the new domain automatically. Google treats a real domain as the identity of your business, and needs weeks-to-months to build trust in a new one — this starts the clock.
2. **Register with Google Search Console** (search.google.com/search-console, ~10 min, owner) **and submit the sitemap URL** (`/sitemap.xml`). Free tool showing whether pages are indexed, what people searched for, and where you rank — the instrument panel for the GTM plan's SEO channel. Redo/re-verify for komponentguiden.se once the domain is live.
3. ~~**Fix the numbers story.**~~ **DONE 2026-07-08 (commit `7122738`)** — see the ✅ "Metrics section reframed" entry above. SSR now renders real finals, the three metrics are reframed as database facets (8860 / 171 / "Registrerade maskintyper"), the "0 presenterade matchningar" metric is gone, and the hero's "tusentals" vs 171 contradiction is reconciled ("kartlagt tusentals" → 8860; "analyserar löpande" → the growing 171). *Residual:* third metric shows placeholder `1240` pending live DB counts (item 21).

**B. Protect the data and the funnel**

6. **Merge Masterbase PR #98 and apply its database changes.** The shared "dictionary" (taxonomy) and the supplier-side tables the matching engine needs exist only as an unmerged proposal. Until merged and applied, the supplier half of the matching equation doesn't exist.
7. ~~**Ask where the buyer is.**~~ **ALREADY DONE — landed in IntentForm v2 (commit `ef27d71`), this item was a stale leftover.** The form has a "Geografiskt krav på leverantör" progressive-disclosure section: `regionSlugs` in form state, 21 län (matching Masterbase `companies.lan` granularity, defined in `src/lib/taxonomy.ts`), stored in `region_slugs text[]` (GIN-indexed, migration `20260707_intent_requests_region_slugs.sql`), sent on insert; empty = hela Sverige. It's delivery-oriented as the matching rule requires. (See also the ✅ IntentForm v2 entry, which already listed this — the must-have copy was never struck.)
8. ~~**Tell buyers when their drawing upload fails.**~~ **DONE 2026-07-10 (commit `be51227`)** — upload error captured; submission proceeds (lead kept) with an amber warning in the success card directing the buyer to email the drawing. See ✅ "IntentForm integrity trio".
9. ~~**Route "Akut" form selections to the /akut page.**~~ **DONE 2026-07-10 (commit `be51227`)** — Akut tidsram now shows a red callout routing to `/akut`. Implemented as flag-and-route (non-blocking); upgrade to a hard block if the GTM "never enter the 48h flow" rule should be enforced strictly. See ✅ "IntentForm integrity trio".
10. ~~**Marketing consent checkbox + sekretesspolicy update.**~~ **DONE 2026-07-10 (commit `be51227`)** — separate unticked `marketing_consent` opt-in + policy section + migration (run manually in Supabase). See ✅ "IntentForm integrity trio".
11. **Fact-check the two risky blog posts.** *(from the GTM session)* The price-guide numbers and the AS9100 post's FMV claims are already live and unverified. A wrong number in a price guide is the most damaging content error a sourcing platform can make — buyers benchmark against it, and AI assistants may quote it verbatim with your name attached.

**C. Build the matching engine (after the Masterbase access key lands)**

12. **The `matches` table and matching function.** The automated piece that takes a buyer request, queries Masterbase for suppliers with overlapping tags, scores them, and stores the top 5 for your review. Everything above (slugs, region field, PR #98) is preparation for this.
13. **Email notifications + a simple admin page.** You get an email when a request arrives (Resend); an internal page shows pending matches; one click approves and sends the buyer their 5 suppliers. Replaces copy-paste manual work before volume grows.
14. **Populate supplier capabilities.** Run the scraping/AI pipeline that reads company websites and maskinpark data and fills the supplier-side tag tables. The matching engine has nothing to match against until this runs.

### 🟡 Nice-to-have

15. **Structured data (JSON-LD).** Invisible labels in the page code that tell Google and AI assistants exactly what things are ("this is a company, org.nr X", "this is an article, published Y"). Makes you more likely to be quoted correctly by ChatGPT/Perplexity and eligible for richer Google results. Cheap to add, compounding payoff — first candidate to promote to must-have.
16. **FAQ blocks on landing pages.** 3–5 real questions with direct answers — the format AI search engines quote most readily. **6 of 20 pages DONE 2026-07-07** (commit `4add617`: CNC, plåt/svets, aluminium, rostfritt, AS9100, Småland) incl. FAQPage JSON-LD rendering in `[category]/page.tsx`. Remaining 14: add entries to `content/categories/faq.ts` (keyed by slug) — rendering and JSON-LD are already automatic for any slug with entries.
17. **Fix the footer LinkedIn link** (currently goes nowhere) and create the company LinkedIn page — also an identity signal AI assistants use to verify you're a real company.
18. **Rename `/about` to `/om-oss`** (the only English address on a Swedish site) and add org.nr, founder names, and photos. Team section is blocked on you providing names and bios *(carried over from the GTM session)*.
19. **Author names and dates on blog posts; cross-links between articles and landing pages.** Both are credibility/SEO refinements of already-good content.
20. **Un-precheck the NDA box + add spam protection to the form.** The consent box being pre-ticked is a GDPR anti-pattern; the form having no bot protection is fine today, painful the week a bot finds it.
21. **Connect the metrics section to the live database (and swap the `1240` placeholder).** *(Updated 2026-07-08.)* The reframing is DONE (see ✅ section) — the three metrics now tell a good story as database facets, so the earlier "don't publish live 171/0" objection no longer applies. **What remains, blocked on the Masterbase anon key (item 6/§6):** convert `MetricsSection.tsx` to fetch real counts server-side — (1) total companies in the SNI universe → metric 1, (2) count of analysed/enriched companies → metric 2, (3) aggregate of `maskinpark` machine/process records → metric 3, replacing the hardcoded `REGISTERED_MACHINE_TYPES = 1240` placeholder. All three then update on their own as enrichment progresses through the ~8 000 companies (the owner's intent). Until the key lands the placeholder stays; it is the only made-up number currently live on the site.
22. **Real blog thumbnails** instead of gradient placeholders.
23. **Homepage section clarifying free matching vs. Concierge.** *(from the GTM session)* The two offers have different prices (free vs. cost-plus), different promises (48h list vs. full responsibility) — one short comparison section prevents buyers from conflating them.
24. **ScrollyTelling mobile fallback.** The component currently renders nothing on mobile, so phone visitors miss the entire "how it works" story. (The step-4 content rework from the GTM session is DONE per owner 2026-07-07 — do not redo.)
25. **Write matching outcomes back to Masterbase.** Each delivered match and its outcome, recorded per supplier — this is what slowly builds the proprietary demand dataset behind the M&A thesis. Strategically must-have, but only becomes actionable once matches actually flow.
26. **IntentForm v2.1 — refinements + one scope decision.** *(v2 itself is DONE — see ✅ section. These are the follow-ups identified in owner review 2026-07-07.)*

    *Context a future session needs:* all v2 options come 1:1 from Masterbase `docs/taxonomi.md`. The ytbehandling chips are that group's complete 10 slugs. The **precision chips are a deliberately curated subset** (UI readability), and the **material×method matrix is Claude's engineering-judgment draft** — safe to be wrong since it only affects display ranking (a mis-ranked method sits one click behind "Visa alla metoder"), never data or availability.

    - **Rename "Gjutning" → "Gjutning & smide".** Smide exists only as a chip under Gjutning; a buyer needing smide won't click "Gjutning". Label change MUST update `preselectedMethod` in `content/categories/index.ts` (gjutning entry) + the `METHOD_TO_SLUGS`/`MATERIAL_TO_PRIMARY_METHODS`/`METHOD_TO_PROCESSES` keys in `src/lib/taxonomy.ts` in the same commit (character-for-character invariant).
    - **Consider restoring omitted chips.** Left out of v2: `brotschning-driftning` (skärande); `plasmaskarning`, `gasskarning`, `djuppressning`, `klippning` (plåt); `pinnsvets`, `punktsvets`, `lodning` (svets); `pressning-stansning-formande`, `rullformning` (gjutning-formande); `skumning` (polymer). Judgment: niche or rarely buyer-specified. Add back selectively if intent data or co-founder says otherwise.
    - **Scope decision (owner + co-founder): expose the taxonomy's 8th group `montering-kvalitet`?** Montering, kablage, legopackning have no method option today — "do we match assembly work, not just parts manufacturing?" If yes: new option "Montering & kablage" → group slug, plus chips. Business decision, not a bug.
    - **Co-founder validates the material×method matrix** against what the 689k-company dataset shows (5 min; debatable cells noted in spec, e.g. Rostfritt+Gjutning as secondary despite precision-cast stainless being common).

**Ongoing habits:** 1–2 blog posts/month (staggered dates — a site where everything is published the same day looks generated); pursue press mentions in Ny Teknik/Verkstadstidningen (backlinks are your main ranking lever since you chose no public directory); Elmia Subcontractor prep; cold-outreach setup per GTM plan (Apollo.io prospect list, LinkedIn sequences); keep CLAUDE.md in sync with reality.

---

## Appendix: plain-language glossary

**Slug / taxonomy** — a fixed, machine-readable tag (`platbearbetning`) behind a human label ("Plåt & svets"). The taxonomy is the agreed dictionary of all such tags, shared between the form (buyer side) and the supplier database. Computers match tags reliably; they match free text badly.

**Sitemap / robots.txt** — two small files search engines look for on every site: the table of contents ("index these pages") and the door policy ("these crawlers are welcome").

**Canonical URL** — the declared "official" address of a page, so search engines know which copy counts when the same page is reachable at several addresses.

**Structured data / JSON-LD** — invisible machine-readable labels in a page describing what it contains (company, article, FAQ). Search engines and AI assistants read them to understand and quote you correctly.

**RLS (Row Level Security)** — database rules deciding who may read or write which rows. Your form's rule: anonymous visitors may *add* requests but never *read* them.

**Edge Function** — a small program hosted by Supabase that runs on demand — e.g., "when a new request arrives, find matching suppliers." Server-side logic without running a server.

**Migration** — a saved SQL script that changes the database's structure (new columns, tables). Kept in the repo so every change is documented and repeatable.

**GIN index** — a database lookup structure that makes "which rows share tags with this list?" fast. Matters once the matching engine queries thousands of rows.

**Backfill** — retroactively filling a new column for rows that existed before the column did (done for your pre-existing form submissions).

---

## Appendix B: Technical implementation notes (for future Claude/dev sessions)

Precise context so a future session can pick up any backlog item without re-deriving it. Read together with CLAUDE.md. Verified against the codebase and live systems 2026-07-07.

### Current state — facts a future session should not have to rediscover

- **Live URL:** https://komponentguiden.vercel.app — custom domain komponentguiden.se NOT purchased yet. Vercel auto-deploys on push to `main` (repo: github.com/adamerikalex/Komponentguiden).
- **Blog content lives in `content/blogg/`** (CLAUDE.md previously said `content/posts/` — wrong).
- **Slug mapping is DONE** (commit `c9b64ee`): `src/lib/taxonomy.ts` exports `METHOD_TO_SLUGS`, `MATERIAL_TO_SLUGS`, `CERT_TO_SLUGS`, `methodToSlugs()` (adds `ytbehandling` when the free-text surface-treatment field is non-empty), `materialToSlugs()`, `certsToSlugs()`. IntentForm insert includes `capability_slugs`, `material_slugs`, `cert_slugs`. Migration `supabase/migrations/20260707_intent_requests_taxonomy_slugs.sql` was run manually in the Supabase SQL editor (there is NO Supabase CLI link in this repo — all migrations are applied by hand via the dashboard) and included a backfill. The backfill ran without error, which confirms `intent_requests.certs` is `text[]`, not jsonb.
- **Slug source of truth:** Masterbase repo, `docs/taxonomi.md`, on branch `docs/metalbase-datamall` (PR #98, unmerged as of 2026-07-07). Rule from that doc: slugs are NEVER renamed, only aliased. Masterbase's draft DDL sits in `supabase/migrations-utkast/` (three files dated 20260703) and is NOT applied to the Masterbase live DB. `company_capabilities` / `company_certifications` / `metalbase_public` do not exist yet in the live Masterbase DB.
- **Masterbase access:** still no anon key. Masterbase Supabase project: `yvggpetxbfopwhqarebh`. The `companies` table (~689k rows) has `maskinpark jsonb`, `certifieringar text[]`, `profile_embedding` (pgvector), `sni_kod`/`sni_alla`, financials incl. `soliditet_pct`, `halsa_score`, `rorelsemarginal_pct`, plus `reklamsparr` (respect it in any outreach).
- **lucide-react v1.22.0 has no `Linkedin` icon** (noted in CLAUDE.md; footer uses a text link).
- **No sitemap.ts / robots.ts / metadataBase / JSON-LD anywhere** — verified live: /robots.txt and /sitemap.xml return empty, no canonical tags, single shared OG image from `src/app/opengraph-image.tsx` (teal gradient, edge runtime).

### Must-have item specifics

**A1–A3 (domain, sitemap/robots, canonical).**
- `src/app/layout.tsx`: extend the `metadata` export with `metadataBase: new URL("https://komponentguiden.se")` and `alternates: { canonical: "./" }`. Until the domain exists, use an env var (`NEXT_PUBLIC_SITE_URL`) so the vercel.app deployment still works.
- Create `src/app/sitemap.ts`: static routes (`/`, `/concierge`, `/about`, `/akut`, `/support`, `/sekretesspolicy`, `/blogg`) + `categoryPages.map(p => p.slug)` from `content/categories` + `getAllPosts()` from `src/lib/posts` (use `publishedAt` as `lastModified`).
- Create `src/app/robots.ts`: allow all (including GPTBot/ClaudeBot/PerplexityBot — deliberate, for AI-search presence), point to sitemap.
- Domain redirect vercel.app → custom domain is configured in the Vercel dashboard (Domains tab), not in code. www vs apex: pick one, 301 the other.

**A5 (metrics/hero fix). — DONE 2026-07-08 (commit `7122738`).**
- `src/components/MetricsSection.tsx`: state now initialises to the real finals (`METRICS.map((m) => m.final)`), so SSR HTML shows the true numbers; the scramble runs on top after hydration as decoration only. `format` for metric 1 is plain `String(n)` (no thousand separator). The "0 presenterade matchningar" metric was replaced entirely by "Registrerade maskintyper" (constant `REGISTERED_MACHINE_TYPES`, currently placeholder `1240` — item 21).
- Hero copy conflict resolved in `src/app/page.tsx`: "bedömt finansiell stabilitet, maskinpark, certifieringar" → "analyserar löpande …", so "kartlagt tusentals" maps to the 8860 and the ongoing-analysis claim maps to the growing 171.

**B7 (region field). — ALREADY DONE in IntentForm v2 (commit `ef27d71`); this note was stale.**
- Implemented as `regionSlugs` in `FormState` + a "Geografiskt krav på leverantör" progressive-disclosure multi-select (21 län, slugs in `src/lib/taxonomy.ts` matching Masterbase `companies.lan`). Column: `region_slugs text[]` (GIN-indexed, migration `20260707_intent_requests_region_slugs.sql`), sent on insert; empty array = hela Sverige. Delivery-oriented, as the matching rule requires. No further work needed.

**B8 (drawing upload failure). — DONE 2026-07-10 (commit `be51227`).**
- `IntentForm.tsx` `handleSubmit` now destructures `{ data, error }` from the upload; on error it sets `uploadFailed`, keeps the submission (lead not lost), and carries `drawingFailed` state into the success card, which renders an amber warning with a `mailto:info@komponentguiden.se` fallback.

**B9 (akut routing). — DONE 2026-07-10 (commit `be51227`).**
- When `form.timeframe === "Akut / Brandsläckning"`, a red inline callout renders under the tidsram select with a `next/link` to `/akut`. Non-blocking (flag-and-route). If the GTM "never enter the 48h flow" rule should be strict, upgrade to a hard block (disable/redirect submit when Akut is selected) — small follow-up.

**B10 (marketing consent). — DONE 2026-07-10 (commit `be51227`).**
- Separate unticked checkbox `#marketing-consent` in section 6 (distinct from NDA); `marketingConsent` in `FormState`, inserted as `marketing_consent`. Column added via `supabase/migrations/20260710_intent_requests_marketing_consent.sql` (run manually in Supabase). `sekretesspolicy/page.tsx` gained a "Marknadsföring och nyhetsbrev" section (legal basis = samtycke, withdrawal via unsubscribe/mail), date → juli 2026.

**B11 (blog fact-check).**
- `content/blogg/vad-kostar-kontraktstillverkning-i-sverige.md` (price levels, hourly rates) and `content/blogg/as9100-vs-iso-9001-forsvarsupphandlingar.md` (FMV/defense-procurement claims). Verify against current sources via web search; both posts are live. Update `publishedAt` when revised.

**C12–C14 (matching engine, blocked on Masterbase anon key + PR #98 merge).**
- `matches` table (Komponentguiden Supabase), schema already sketched in CLAUDE.md: `intent_request_id uuid → intent_requests`, `supplier_id` (Masterbase companies.id or org_nr — prefer org_nr, it's the cross-system key per metalbase-strategi.md), `score numeric`, `rank int`, `status text ('pending'|'approved'|'sent')`.
- Edge Function `match-intent`, triggered by DB webhook on `intent_requests` INSERT. Query Masterbase REST (`metalbase_public` view once it exists — never the service key) filtering: `capability_slugs && intent.capability_slugs`, region, size class; score = slug overlap + cert match (hard filter, not score, when buyer checked certs) + financial health (`soliditet_pct`, `halsa_score`) + `profile_embedding` similarity as tiebreak only. Matching at GROUP level per taxonomi.md ("Intents matchas på GRUPP-nivå som default").
- Resend: API key not yet configured (CLAUDE.md: "not yet integrated"). Notification to Alexander on new intent; buyer email only after manual approval in `/admin`.
- `/admin`: needs auth (Supabase Auth, single user is fine) — the anon-only RLS on `intent_requests` means the current anon client cannot read rows; admin needs an authenticated role with SELECT policy.

### Nice-to-have item specifics

- **JSON-LD (15):** PARTIALLY DONE — FAQPage JSON-LD live on 6 category pages via `content/categories/faq.ts` + `[category]/page.tsx` (2026-07-07). Still pending: Organization in `layout.tsx` (name, url, logo, contactPoint info@komponentguiden.se — add org.nr when public), Service on category pages, BlogPosting in `blogg/[slug]/page.tsx` using frontmatter `title/description/publishedAt/tags`.
- **/om-oss (18):** rename `src/app/about/` → `src/app/om-oss/`, add `redirects()` in `next.config.ts` (`/about` → `/om-oss`, permanent). Update Navbar/Footer links. Team section blocked on owner input (names/bios/photos).
- **NDA + honeypot (20):** `ndaAccepted: true` in initial `FormState` → `false`; require it before submit (it gates sharing uploaded material with suppliers). Honeypot: hidden text input; if filled, fake-success without insert.
- **Blog internal links (19):** posts currently link only to `/#intent-form` (+2 post-to-post links); zero links to category pages. Verified via grep. Add contextual links in each post to its sibling category page.
- **Matching vs. Concierge section (23):** homepage, likely between MetricsSection and the security section in `src/app/page.tsx`; two-column comparison (kostnadsfri matchning: 5 förslag/48h/ni tar kontakten — Concierge: helhetsansvar/offert-till-leverans/cost-plus), each with its own CTA (form vs. `/concierge`).
- **ScrollyTelling mobile fallback (24):** `src/components/ScrollyTelling.tsx` is desktop-only (hidden on mobile, 400vh scroll container). Fallback: render the four stages as a static stacked list under a media query instead of nothing. (Step-4 content rework: DONE per owner 2026-07-07 — do not redo.)

### IntentForm v2 spec — IMPLEMENTED 2026-07-07 (commit ef27d71; see item 26 for v2.1 follow-ups)

**Goal.** Material-first flow with dynamically filtered methods and optional process-level precision, producing higher-resolution slugs without adding mandatory friction. The GTM wedge is "free + low friction" — every design decision below errs toward fewer required choices.

**Flow.** Single page (no wizard). Section order becomes: 1. Materialgrupp (radio) → 2. Primär bearbetningsmetod (radio, filtered by material) → 3. *optional* precision chips (process level) → rest of form unchanged.

**Filtering is SOFT, never hard.** The material×method matrix defines *primary* methods (shown prominently) vs. *secondary* (collapsed under a "Visa alla metoder"-expander). No combination is ever impossible to select — rare combos are often the highest-value intents (e.g., Stål + 3D-printing = metal SLM, a real defense/aero niche). Draft matrix (validate with co-founder against taxonomi.md before building):

| Material | Primary methods | Secondary (under "visa alla") |
|---|---|---|
| Aluminium | Skärande, Plåt & svets, Gjutning | 3D-printing |
| Stål | Skärande, Plåt & svets, Gjutning | 3D-printing |
| Rostfritt | Skärande, Plåt & svets | Gjutning, 3D-printing |
| Titan / Special | Skärande, 3D-printing (SLM) | Plåt & svets, Gjutning (precisionsgjutning) |
| Plast | Formsprutning, 3D-printing, Skärande | — |
| Komposit | Komposittillverkning (NEW option) | 3D-printing, Skärande |

**Method list changes v2 requires.** (a) NEW option "Komposittillverkning" → slugs `komposit-laminering` + `komposit-rtm` (group `polymer`) — komposit currently hides awkwardly under "Formsprutning". (b) NEW option "Osäker / öppen för förslag" → `capability_slugs` = union of the material's primary groups; these buyers are the highest-help-need intents and today are forced to guess. (c) Ytbehandling stays a free-text field (already maps to `ytbehandling` slug when non-empty).

**Optional precision chips (level 3).** After method selection, show an optional multi-select chip row "Vill du precisera? (frivilligt)" with that method's process slugs from taxonomi.md nivå 2 — e.g., Skärande → `cnc-svarvning`, `cnc-frasning-3ax`, `cnc-frasning-5ax`, `langsvarvning`, `slipning`, `gnistbearbetning`; Plåt & svets → `laserskarning`, `kantpressning`, `vattenskarning`, `mig-mag`, `tig`, `robotsvets`. Rules: NEVER mandatory; skipping stores group-level slugs (current behavior); selecting stores BOTH the group slug(s) AND the chosen process slugs in `capability_slugs` (rollup-safe — matching engine can use whichever level it needs; taxonomi.md: "Intents matchas på GRUPP-nivå som default; processnivå när köparen specificerat").

**Category-page pre-selection works in BOTH directions and must survive the order flip.** `/legotillverkning-aluminium` passes `defaultMaterial` (natural fit); `/cnc-bearbetning` passes `defaultMethod` — when only a method is preset, do not force a material first; render the preset method as chosen and let material selection re-rank (not clear) it. The exact `preselectedMethod`/`preselectedMaterial` strings in `content/categories/index.ts` MUST match the option labels character-for-character (existing invariant, noted in that file's header comment) — if labels change in v2, update all 20 entries + `METHOD_TO_SLUGS` keys in the same commit.

**Implementation surface.** All new mappings live in `src/lib/taxonomy.ts` next to the existing ones (single file = form logic and slug scheme can't drift): `MATERIAL_TO_METHODS` (primary/secondary), `METHOD_TO_PROCESSES` (chip definitions, labels + slugs). No database changes — the `text[]` columns already hold mixed group/process granularity. No Masterbase-side changes. `IntentForm.tsx` layout reorder + conditional rendering.

**What NOT to do:** no multi-step wizard, no mandatory precision level, no hard-blocking of combos, no renaming existing slugs (aliases only, per taxonomy rules).

### Verification notes (what was actually tested 2026-07-07)

- `npx tsc --noEmit` and `npx eslint` pass after the slug changes.
- Live fetches: homepage + `/legotillverkare-smaland` render full content server-side (good for crawlers); robots.txt/sitemap.xml empty; Google has zero pages indexed for komponentguiden (searched).
- Masterbase branch `docs/metalbase-datamall` inspected via `git show` — contents as described in §6; it also contains `docs/arkitektur.md`, `docs/sni-universum.md` (SNI tier universe incl. the 25620 ≥3-employee floor), `docs/berikning-runbook.md` and `docs/datamall-metalbase.md`.

---

*Sources: full read of Komponentguiden repo (all src/, content/, GTM-Plan.md, CLAUDE.md) and Masterbase repo (CLAUDE.md, README, docs/schema.md, migrations, src/lib/companies.js) including the unmerged PR branch `docs/metalbase-datamall` (taxonomi.md, metalbase-strategi.md, draft migrations); live checks of komponentguiden.vercel.app (/, /legotillverkare-smaland, robots.txt, sitemap.xml), komponentguiden.se (domain not yet purchased), and Google search (site not indexed).*
