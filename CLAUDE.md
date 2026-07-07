@AGENTS.md

# Komponentguiden — Project Context for Claude Code

## What this is
B2B managed marketplace for industrial sourcing in Sweden. Matches buyers (large OEMs) with contract manufacturers (SME workshops) based on technical requirements. See `/Users/alexander.backstrom/Documents/AI Development/02-Project-Komponentguiden/` for full business/strategy docs in Obsidian.

## Business model (brief)
1. **Free matching** (Intent Engine) — buyer uploads spec, gets 5 supplier matches in 48h. Builds intent data.
2. **Concierge** (monetization) — Komponentguiden acts as tier-1 supplier, takes 8–12% Cost-Plus margin.
3. **Data-driven M&A** — use intent data to acquire underutilized workshops ("Lazy Twins").

## Tech stack
- **Framework:** Next.js 16.2.9, React 19, TypeScript, App Router
- **Styling:** Tailwind CSS v4 + CSS custom properties in `globals.css` (design tokens)
- **Icons:** lucide-react v1.22.0 (note: no `Linkedin` icon in this version)
- **Fonts:** Inter (body) + Roboto Mono (metadata/badges), loaded via `next/font/google`
- **Backend:** Supabase (PostgreSQL + Storage + RLS) — live
- **Email:** Resend API — not yet integrated
- **Supplier data:** Masterbase (co-founder's platform) — see Matching Architecture below

## Project structure
```
src/
  app/
    layout.tsx               # Root layout — Navbar + Footer + font setup
    globals.css              # All design tokens + CSS (not utility-first Tailwind)
    page.tsx                 # Home: Hero → ScrollyTelling → MetricsSection → Security → IntentForm → Blog
    concierge/page.tsx       # Concierge service page (6-step process, pricing, features)
    about/page.tsx           # Om oss
    akut/page.tsx            # Akut behov — urgent supplier need page
    support/page.tsx         # Support page
    sekretesspolicy/page.tsx # Privacy policy
    blogg/page.tsx           # Blog index
    blogg/[slug]/page.tsx    # Individual blog posts (remark/rehype pipeline)
    [category]/page.tsx      # 20 SEO landing pages (methods, materials, regions, industries)
  components/
    Navbar.tsx               # 'use client' — hamburger menu, usePathname active state
    Footer.tsx               # Server component — links to support + sekretesspolicy
    ScrollyTelling.tsx       # 'use client' — 4-stage scroll animation, desktop only
    MetricsSection.tsx       # 'use client' — IntersectionObserver number scramble animation
    IntentForm.tsx           # 'use client' — Supabase insert + Storage file upload
content/
  blogg/                     # 5 markdown blog posts (gray-matter frontmatter)
  categories/index.ts        # Data for 20 category landing pages
public/
  part.png, map.png, network.png, team.png
```

## Design tokens (CSS variables in :root)
```
--slate-navy: #1e2633       (headings, primary text)
--slate-navy-light: #334155 (body text)
--indigo: #635bff           (primary buttons, accents)
--turquoise: #008b8b        (metadata labels)
--canvas: #f4f6f9           (page background)
--surface: #ffffff          (cards, form)
--border: #e2e8f0
--font-main: var(--font-inter)
--font-meta: var(--font-roboto-mono)
```

## Supabase
- **Komponentguiden project:** see `.env.local` for URL + anon key
- **Table:** `intent_requests` — all form fields, `status` column ('new' | 'matched' | 'sent'), RLS anon INSERT only. Since 2026-07-07 also `capability_slugs`/`material_slugs`/`cert_slugs text[]` (GIN-indexed), populated at insert via `src/lib/taxonomy.ts`; `certs` is `text[]`
- **Storage:** `drawings` bucket — private, anon INSERT RLS for file uploads
- **Migrations:** applied MANUALLY via Supabase SQL editor (no CLI link); SQL files tracked in `supabase/migrations/`

## Matching architecture (planned, not yet built)
Supplier data lives in **Masterbase** — the co-founder's separate platform at `https://github.com/studio-shields/Masterbase` (Supabase project `yvggpetxbfopwhqarebh`). The `companies` table (~689k rows) contains industrial suppliers filtered by SNI 22–25 with AI-extracted `maskinpark` (JSONB: machine inventory by category) and `certifieringar` (text[]).

**Planned flow:**
1. Buyer submits intent → `intent_requests` INSERT (status: 'new')
2. DB webhook triggers Edge Function `match-intent`
3. Edge Function queries Masterbase REST API live (SNI filter + maskinpark/cert overlap + region)
4. Top 5 scored results → `matches` table (new, not yet created): `intent_request_id`, `supplier_id`, `score`, `rank`, `status`
5. Alexander gets Resend notification → reviews in `/admin` dashboard → approves → buyer email sent

**Shared capability taxonomy (2026-07, replaces raw maskinpark categories):**
Matching is based on taxonomy slugs defined in the Masterbase repo —
`docs/taxonomi.md` (8 groups, ~70 process slugs, materials, cert types).
IntentForm options map to the SAME slugs: **DONE 2026-07-07** — `intent_requests`
has `capability_slugs text[]`, `material_slugs text[]`, `cert_slugs text[]`,
mapped at insert via `src/lib/taxonomy.ts`; old rows backfilled
(migration `supabase/migrations/20260707_intent_requests_taxonomy_slugs.sql`).
Taxonomy source: Masterbase branch `docs/metalbase-datamall` (PR #98,
unmerged 2026-07-07; DDL drafts in `migrations-utkast/`, NOT applied to live DB).
Slugs are never renamed, only aliased. Supplier side exposes
`company_capabilities`/`company_certifications` via a scoped read-only view
`metalbase_public` — never the service key. Legacy `maskinpark` jsonb
(categories: Laser & stans | Kantpress | Svets | Skärande bearbetning |
Robot & automation | Ytbehandling | Mät & kvalitet) is the raw evidence layer,
being normalized into the taxonomy. Matching = SQL join on slugs ∩ region ∩
size, embedding as tiebreaker. See also Masterbase `docs/metalbase-strategi.md`
for the demand-data flywheel (intents + outcomes written back on org_nr).

**Blocker:** Need Masterbase anon key to query their REST API. Co-founder must share it or grant Supabase project access.

## Review & backlog
`REVIEW-AND-BACKLOG.md` (repo root, last updated 2026-07-07) is the current full
review AND the living backlog: design/content/business reflection, SEO & AI-search
audit (site NOT indexed; domain komponentguiden.se not yet purchased — live at
komponentguiden.vercel.app), Metalbase integration status, and a categorized backlog
(must-have / nice-to-have / done). **Appendix B there has per-item implementation
notes — read it before starting any backlog item.** Notable spec'd items: IntentForm
v2 (material-first dynamic form, item 26 + full spec in Appendix B).

## Current status (as of July 2026)
- [x] HTML prototype → Next.js migration complete
- [x] All routes live: `/`, `/concierge`, `/about`, `/akut`, `/support`, `/sekretesspolicy`, `/blogg`, 20× `/[category]`
- [x] IntentForm fully wired to Supabase (`intent_requests`) with file upload to Storage
- [x] Supabase `intent_requests` table + RLS (anon INSERT only)
- [x] Supabase Storage `drawings` bucket (private, anon INSERT RLS)
- [x] Hamburger mobile nav
- [x] MetricsSection with animated number scramble (hardcoded values, to be replaced with live DB counts) — NOTE: SSR HTML shows scramble-min values (1000/10/0), not finals; fix per REVIEW Appendix B item A5
- [x] ScrollyTelling — 4 stages, 400vh
- [x] Taxonomy slug mapping at insert (`src/lib/taxonomy.ts`, 2026-07-07)
- [ ] Masterbase anon key — needed before matching engine can be built
- [ ] `matches` table in Komponentguiden Supabase — schema ready to create once key is available
- [ ] Match-intent Edge Function — queries Masterbase live, scores, inserts into `matches`
- [ ] Resend email — Alexander notification + buyer email (triggered from `/admin` approval)
- [ ] `/admin` dashboard — review pending matches, approve sends, funnel analytics
- [ ] Live metrics — convert MetricsSection to server component fetching real counts
- [ ] SEO metadata — per-page titles, descriptions, Open Graph tags
- [ ] Blog thumbnails — replace gradient cards with real images

## Local dev
```bash
source ~/.zprofile   # required — Node/npm not in default shell PATH
npm run dev          # http://localhost:3000
```

## Git conventions
- `main` = always deployable
- Commit after each meaningful working unit
- Co-author commits with Claude Sonnet 4.6
