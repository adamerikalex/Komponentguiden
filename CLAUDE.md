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
- **Backend (planned):** Supabase (PostgreSQL + Storage + RLS)
- **Email (planned):** Resend API

## Project structure
```
src/
  app/
    layout.tsx          # Root layout — Navbar + Footer + font setup
    globals.css         # All design tokens + CSS (not utility-first Tailwind)
    page.tsx            # Home: Hero, ScrollyTelling, Security cards, IntentForm
    concierge/page.tsx  # Concierge service page
    about/page.tsx      # Om oss — 4 sections with images
    strategy/page.tsx   # Internal roadmap (3-phase)
  components/
    Navbar.tsx          # 'use client' — usePathname for active state
    Footer.tsx          # Server component
    ScrollyTelling.tsx  # 'use client' — scroll listener, disabled on mobile <768px
    IntentForm.tsx      # 'use client' — full useState, handleSubmit logs to console
public/
  part.png, map.png, network.png, team.png  # Brand images
```

## Design tokens (CSS variables in :root)
```
--slate-navy: #1e2633      (headings, primary text)
--slate-navy-light: #334155 (body text)
--indigo: #635bff          (primary buttons, accents)
--turquoise: #008b8b       (metadata labels)
--canvas: #f4f6f9          (page background)
--surface: #ffffff         (cards, form)
--border: #e2e8f0
--font-main: var(--font-inter)
--font-meta: var(--font-roboto-mono)
```

## Current status (as of July 2026)
- [x] HTML prototype → Next.js migration complete
- [x] All routes live: `/`, `/concierge`, `/about`, `/strategy`, `/akut`, `/blogg`, 20× `/[category]`
- [x] IntentForm fully wired to Supabase with file upload (non-blocking)
- [x] Supabase `intent_requests` table + RLS (anon INSERT only)
- [x] Supabase Storage `drawings` bucket (private, anon INSERT RLS)
- [x] Hamburger menu for mobile nav
- [ ] Resend email — internal notification + buyer confirmation on submission
- [ ] SEO metadata — per-page titles, descriptions, Open Graph tags
- [ ] Blog thumbnails — replace gradient cards with real images
- [ ] Matching engine (SQL/Edge Function querying `suppliers` table)
- [ ] Analytics dashboard (funnel: visits → submissions → matches)

## Local dev
```bash
source ~/.zprofile   # required — Node/npm not in default shell PATH
npm run dev          # http://localhost:3000
```

## Git conventions
- `main` = always deployable
- Feature branches: `feature/supabase-integration`, `feature/survey-expansion`, etc.
- Commit after each meaningful working unit
- Co-author commits with Claude Sonnet 4.6
