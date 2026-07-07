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

- **The metrics section actively hurts trust.** Crawlers and any non-JS reader see the scramble start values — "1 000 företag, 10 kartlagda, 0 presenterade matchningar" — not the real 8 860/171. And even the real numbers tell a weak story: "171 kartlagda / 0 matchningar" publicly admits the database is thin and no match has ever been delivered. Meanwhile the hero claims "vi har kartlagt tusentals svenska legotillverkare." That's a direct internal contradiction (171 ≠ tusentals) visible on a single scroll, and precisely the kind of inconsistency an AI answer engine will surface verbatim.
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

**Taxonomy slug mapping** (implemented 2026-07-07, during this session): when a buyer submits the form, the code now translates their choices into standardized machine-readable tags ("slugs") and saves those alongside the readable text. *Plain version: "Plåt & svets" is a label for humans; `platbearbetning` + `svetsning` are the tags the matching engine will use to find suppliers. Both are now saved on every submission, and older submissions were back-translated too. This means the matching engine can be built on clean data from day one.* Includes: `src/lib/taxonomy.ts`, updated form, database columns + backfill.

### 🔴 Must-have

**A. Make the site findable (the "visibility layer") — nothing else pays off until this is done**

1. **Buy komponentguiden.se and connect it in Vercel.** Google treats a real domain as the identity of your business; a vercel.app address is like running a shop out of someone else's mall. Google also needs weeks-to-months to build trust in a new domain, so this starts a clock — start it now.
2. **Add a sitemap and robots.txt.** The sitemap is a machine-readable table of contents that tells Google "here are all my pages, please index them." robots.txt is the note at the door saying which crawlers are welcome. Both are missing; both are small code files.
3. **Set the canonical address in the code.** Right now the site doesn't declare which address is the "official" one. Without this, Google may index the vercel.app copy as the real site and treat komponentguiden.se as the duplicate — the wrong way around.
4. **Register with Google Search Console.** Free Google tool that shows whether your pages are indexed, what people searched for, and where you rank. It's the instrument panel for everything in the GTM plan's SEO channel — without it you're flying blind.
5. **Fix the numbers story.** The animated counters start at fake values (1 000 / 10 / 0) and count up via JavaScript — but Google reads the page *before* the animation runs, so it records the fake values. Meanwhile the hero text claims "tusentals kartlagda företag" while the counter says 171 — a contradiction on one scroll. Fix: put the real numbers directly in the page (animation as decoration only), align the hero claim, and hide "0 presenterade matchningar" until it's not zero.

**B. Protect the data and the funnel**

6. **Merge Masterbase PR #98 and apply its database changes.** The shared "dictionary" (taxonomy) and the supplier-side tables the matching engine needs exist only as an unmerged proposal. Until merged and applied, the supplier half of the matching equation doesn't exist.
7. **Ask where the buyer is.** The matching recipe is capabilities ∩ region ∩ size, and six landing pages sell regional matching — but the form never asks about location or delivery place. One extra field.
8. **Tell buyers when their drawing upload fails.** Today, if the file upload breaks, the form still submits and the buyer believes their ritning was received. For a service whose pitch is "ladda upp ritning, få bättre matchning," silently losing the drawing is a trust-killer.
9. **Route "Akut" form selections to the /akut page.** Your own GTM plan says urgent needs must reach a human the same day, never the 48-hour queue — but the form quietly accepts "Akut / Brandsläckning" into the 48h flow.
10. **Marketing consent checkbox + sekretesspolicy update.** *(from the GTM session)* A separate, unticked opt-in checkbox ("håll mig uppdaterad…") stored on the request, plus a matching paragraph in /sekretesspolicy. Without explicit opt-in, GDPR only permits emailing buyers about their own match — no follow-ups, no nurture emails, no newsletter. Cheap now; every request collected without it is a contact you can't legally re-approach.
11. **Fact-check the two risky blog posts.** *(from the GTM session)* The price-guide numbers and the AS9100 post's FMV claims are already live and unverified. A wrong number in a price guide is the most damaging content error a sourcing platform can make — buyers benchmark against it, and AI assistants may quote it verbatim with your name attached.

**C. Build the matching engine (after the Masterbase access key lands)**

12. **The `matches` table and matching function.** The automated piece that takes a buyer request, queries Masterbase for suppliers with overlapping tags, scores them, and stores the top 5 for your review. Everything above (slugs, region field, PR #98) is preparation for this.
13. **Email notifications + a simple admin page.** You get an email when a request arrives (Resend); an internal page shows pending matches; one click approves and sends the buyer their 5 suppliers. Replaces copy-paste manual work before volume grows.
14. **Populate supplier capabilities.** Run the scraping/AI pipeline that reads company websites and maskinpark data and fills the supplier-side tag tables. The matching engine has nothing to match against until this runs.

### 🟡 Nice-to-have

15. **Structured data (JSON-LD).** Invisible labels in the page code that tell Google and AI assistants exactly what things are ("this is a company, org.nr X", "this is an article, published Y"). Makes you more likely to be quoted correctly by ChatGPT/Perplexity and eligible for richer Google results. Cheap to add, compounding payoff — first candidate to promote to must-have.
16. **FAQ blocks on landing pages.** 3–5 real questions with direct answers ("Vad kostar CNC-bearbetning i Sverige?"). Question-and-answer format is what AI search engines quote most readily.
17. **Fix the footer LinkedIn link** (currently goes nowhere) and create the company LinkedIn page — also an identity signal AI assistants use to verify you're a real company.
18. **Rename `/about` to `/om-oss`** (the only English address on a Swedish site) and add org.nr, founder names, and photos. Team section is blocked on you providing names and bios *(carried over from the GTM session)*.
19. **Author names and dates on blog posts; cross-links between articles and landing pages.** Both are credibility/SEO refinements of already-good content.
20. **Un-precheck the NDA box + add spam protection to the form.** The consent box being pre-ticked is a GDPR anti-pattern; the form having no bot protection is fine today, painful the week a bot finds it.
21. **Live counters from real database numbers** — only once the real numbers tell a good story. *(The GTM session ranked this must-have; kept here deliberately: publishing live counts of 171/0 makes the weak-numbers problem worse, not better. Promote once the database and match count have grown.)*
22. **Real blog thumbnails** instead of gradient placeholders.
23. **Homepage section clarifying free matching vs. Concierge.** *(from the GTM session)* The two offers have different prices (free vs. cost-plus), different promises (48h list vs. full responsibility) — one short comparison section prevents buyers from conflating them.
24. **ScrollyTelling mobile fallback.** The component currently renders nothing on mobile, so phone visitors miss the entire "how it works" story. (The step-4 content rework from the GTM session is DONE per owner 2026-07-07 — do not redo.)
25. **Write matching outcomes back to Masterbase.** Each delivered match and its outcome, recorded per supplier — this is what slowly builds the proprietary demand dataset behind the M&A thesis. Strategically must-have, but only becomes actionable once matches actually flow.
26. **IntentForm v2 — material-first, dynamic, with optional precision.** *(owner-initiated, 2026-07-07)* Redesign the form so the buyer picks material first, then sees only the production methods that make sense for that material (no more "Komposit + Gjutning" noise), with an optional third level where buyers who know their process can specify it ("Fräsning 5-ax" instead of just "Skärande bearbetning"). Sequencing: build directly after the must-have visibility layer (A1–A5) — a clunky form Google can find beats an elegant form nobody sees. Full design decisions and the material×method matrix are in Appendix B — read that spec before building; it encodes several non-obvious guardrails (soft filtering with escape hatch, the "Osäker" option, category-page pre-selection in both directions, and keeping the third level strictly optional).

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

**A5 (metrics/hero fix).**
- `src/components/MetricsSection.tsx`: `METRICS` constant holds finals 8860 / 171 / 0 with `scrambleMin` 1000 / 10 / 0. The component initializes state to `scrambleMin`, so SSR HTML contains the WRONG numbers. Fix: render `metric.final` in the server HTML (initialize state to `final`, or render plain text and layer the scramble purely client-side after hydration). Remove or conditionally hide the third metric ("Antal presenterade matchningar") while it's 0.
- Hero copy conflict: `src/app/page.tsx` (~line 20) says "kartlagt tusentals svenska legotillverkare" — reconcile with the 171 figure. Owner decision on wording needed.

**B7 (region field).**
- Add `region` to `FormState` in `src/components/IntentForm.tsx` + a select (suggest: the six landing-page regions + "Hela Sverige" default + fritt). New column: `alter table intent_requests add column region text;`. Consider `delivery_region` vs buyer HQ — the GTM matching rule is delivery-oriented.

**B8 (drawing upload failure).**
- `IntentForm.tsx` `handleSubmit`: the storage upload destructures only `data`, ignores `error`, and proceeds with `drawing_url: null`. Fix: capture error; on failure either block with a retry message or submit but show a persistent warning ("ritningen kunde inte laddas upp — mejla den till info@…"). Also surface it in the success card.

**B9 (akut routing).**
- The `timeframe` select contains "Akut / Brandsläckning". On selection, render an inline notice linking to `/akut` (mailto flow, 2h response) instead of allowing 48h submission — or allow submission but flag it. GTM plan §"What NOT to Do" is explicit: urgent must not enter the 48h flow.

**B10 (marketing consent).**
- New unticked checkbox in IntentForm section 6, separate from the NDA checkbox; new column `alter table intent_requests add column marketing_consent boolean not null default false;`. Update `src/app/sekretesspolicy/page.tsx` with a paragraph on the processing purpose (updates/nyhetsbrev, withdrawal via mail). Do NOT bundle it into the NDA consent — they are different legal bases.

**B11 (blog fact-check).**
- `content/blogg/vad-kostar-kontraktstillverkning-i-sverige.md` (price levels, hourly rates) and `content/blogg/as9100-vs-iso-9001-forsvarsupphandlingar.md` (FMV/defense-procurement claims). Verify against current sources via web search; both posts are live. Update `publishedAt` when revised.

**C12–C14 (matching engine, blocked on Masterbase anon key + PR #98 merge).**
- `matches` table (Komponentguiden Supabase), schema already sketched in CLAUDE.md: `intent_request_id uuid → intent_requests`, `supplier_id` (Masterbase companies.id or org_nr — prefer org_nr, it's the cross-system key per metalbase-strategi.md), `score numeric`, `rank int`, `status text ('pending'|'approved'|'sent')`.
- Edge Function `match-intent`, triggered by DB webhook on `intent_requests` INSERT. Query Masterbase REST (`metalbase_public` view once it exists — never the service key) filtering: `capability_slugs && intent.capability_slugs`, region, size class; score = slug overlap + cert match (hard filter, not score, when buyer checked certs) + financial health (`soliditet_pct`, `halsa_score`) + `profile_embedding` similarity as tiebreak only. Matching at GROUP level per taxonomi.md ("Intents matchas på GRUPP-nivå som default").
- Resend: API key not yet configured (CLAUDE.md: "not yet integrated"). Notification to Alexander on new intent; buyer email only after manual approval in `/admin`.
- `/admin`: needs auth (Supabase Auth, single user is fine) — the anon-only RLS on `intent_requests` means the current anon client cannot read rows; admin needs an authenticated role with SELECT policy.

### Nice-to-have item specifics

- **JSON-LD (15):** inject via `<script type="application/ld+json">` in server components. `layout.tsx`: Organization (name, url, logo, contactPoint info@komponentguiden.se — add org.nr when public). `[category]/page.tsx`: Service + FAQPage (FAQ content needs writing first — add a `faq: {q,a}[]` field to `CategoryPage` type in `content/categories/index.ts`). `blogg/[slug]/page.tsx`: BlogPosting using frontmatter `title/description/publishedAt/tags`.
- **/om-oss (18):** rename `src/app/about/` → `src/app/om-oss/`, add `redirects()` in `next.config.ts` (`/about` → `/om-oss`, permanent). Update Navbar/Footer links. Team section blocked on owner input (names/bios/photos).
- **NDA + honeypot (20):** `ndaAccepted: true` in initial `FormState` → `false`; require it before submit (it gates sharing uploaded material with suppliers). Honeypot: hidden text input; if filled, fake-success without insert.
- **Blog internal links (19):** posts currently link only to `/#intent-form` (+2 post-to-post links); zero links to category pages. Verified via grep. Add contextual links in each post to its sibling category page.
- **Matching vs. Concierge section (23):** homepage, likely between MetricsSection and the security section in `src/app/page.tsx`; two-column comparison (kostnadsfri matchning: 5 förslag/48h/ni tar kontakten — Concierge: helhetsansvar/offert-till-leverans/cost-plus), each with its own CTA (form vs. `/concierge`).
- **ScrollyTelling mobile fallback (24):** `src/components/ScrollyTelling.tsx` is desktop-only (hidden on mobile, 400vh scroll container). Fallback: render the four stages as a static stacked list under a media query instead of nothing. (Step-4 content rework: DONE per owner 2026-07-07 — do not redo.)

### IntentForm v2 spec (item 26) — full design decisions

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
