# Claude Code prompt — Category landing pages

## Task
Implement 20 category landing pages as statically generated routes using a shared dynamic template. All content and copy is pre-written in `content/categories/index.ts` — do not invent or alter any copy.

---

## Project context

- Framework: Next.js 16.2.9, React 19, TypeScript, App Router
- Styling: Tailwind CSS v4 + global CSS custom properties in `src/app/globals.css`
- Root layout (`src/app/layout.tsx`) wraps all pages with Navbar, `<main>`, and Footer — do not re-add these
- Path alias: `@/` maps to `src/`
- Existing components to reuse: `IntentForm` at `src/components/IntentForm.tsx`
- Existing icons in use: lucide-react v1.22.0 — the icon names in the data file (`Zap`, `Scale`, `Lock`, `Network`, `ShieldCheck`, `Award`, `Clock`, `Search`, `FileCheck`, `MapPin`, `Layers`, `Cpu`, `Leaf`) must all be imported from lucide-react

### Design tokens (from `:root` in globals.css)
```
--slate-navy: #1e2633       headings, primary text
--slate-navy-light: #334155 body text
--indigo: #635bff           CTAs, accents, links
--indigo-hover: #534ae8
--turquoise: #008b8b        eyebrow / metadata labels
--canvas: #f4f6f9           page background
--surface: #ffffff          cards
--border: #e2e8f0
--radius-sm: 6px
--radius-md: 12px
--font-main: var(--font-inter)
--font-meta: var(--font-roboto-mono)
```

### Existing utility classes (use these, do not reinvent)
- `.container` — max-width 1100px, centered, padded
- `.metadata` — turquoise, mono, uppercase, small — use for eyebrow labels
- `.btn-primary` — indigo button with hover/shadow
- `.page-header` — see `src/app/strategy/page.tsx` for reference usage

---

## Content source

All copy lives in `content/categories/index.ts`. Import from there:

```ts
import { categoryPages, getCategoryBySlug, type CategoryPage } from "content/categories/index";
```

Add `content` to `tsconfig.json` paths if needed:
```json
"content/*": ["./content/*"]
```

Or use a relative import path from the app directory. Do not hardcode any copy in the component.

---

## Files to create or modify

### 1. `src/app/[category]/page.tsx` — Dynamic category route

This is the only page file needed. It generates all 22 pages statically.

**Routing:**
- URL pattern: `/[category]` (e.g., `/cnc-bearbetning`, `/legotillverkare-goteborg`)
- `generateStaticParams()`: return all slugs from `categoryPages` as `{ category: slug }`
- `generateMetadata({ params })`: return `metaTitle` and `metaDescription` from the matching category data
- If slug not found: call `notFound()`

**All 20 slugs** (for generateStaticParams reference):
```
cnc-bearbetning
plat-och-svets
gjutning
formsprutning
3d-printing
legotillverkning-aluminium
legotillverkning-rostfritt
titan-bearbetning
legotillverkning-plast
kompositmaterial
legotillverkare-goteborg
legotillverkare-stockholm
legotillverkare-smaland
legotillverkare-skane
legotillverkare-blekinge
legotillverkare-halland
as9100-certifierade-leverantorer
fordonsindustri
medicinteknik
energi
```

**Page layout (top to bottom):**

```
1. HERO SECTION
   Background: --surface, generous vertical padding (80px top, 60px bottom)
   Max-width: 760px, centered text

   - eyebrow: render as <span className="metadata"> — turquoise, mono, uppercase
   - h1: large (clamp 32px–48px), --slate-navy, font-weight 800, letter-spacing -0.03em, margin-bottom 20px
   - intro: 17px, --slate-navy-light, line-height 1.7, max-width 640px, margin 0 auto 36px

   - CTA button: .btn-primary linking to #intent-form (anchor on the page, not the homepage)
     Label: "Starta kostnadsfri matchning →"
     Subtext below button (not inside button): 13px, --slate-navy-light
     "{ctaSubtext}"

2. PAIN SECTION
   Background: --canvas
   Padding: 64px 0
   .container, max-width 680px centered

   - painHeading: h2, 24px, --slate-navy, font-weight 800, margin-bottom 16px
   - painBody: p, 16px, --slate-navy-light, line-height 1.75

3. VALUE PROPS SECTION
   Background: --surface
   Padding: 72px 0

   - Section heading (hardcoded): h2 "Så fungerar matchningen" — centered, 28px
   - Three cards in a responsive 3-column grid (stack to 1 column on mobile <768px)
   - Each card:
       Background: --canvas
       Border: 1px solid --border
       Border-radius: --radius-md
       Padding: 28px
       Icon: lucide-react icon (size 24, color --indigo), margin-bottom 16px
       Heading: h3, 17px, --slate-navy, font-weight 700, margin-bottom 8px
       Body: p, 14px, --slate-navy-light, line-height 1.6

4. HOW IT WORKS SECTION
   Background: --canvas
   Padding: 72px 0

   - Section heading (hardcoded): h2 "Tre steg till rätt leverantör" — centered, 28px, margin-bottom 48px
   - Three steps in a horizontal row (stack to column on mobile)
   - Each step:
       Step number: large mono digit (48px, --indigo, --font-meta, opacity 0.3), positioned above
       Step text: 15px, --slate-navy-light, line-height 1.6, max-width 280px per step

5. INTENT FORM SECTION
   id="intent-form" (this is what the CTA button anchors to)
   Render <IntentForm /> directly
   
   IMPORTANT — IntentForm pre-selection:
   The IntentForm component currently initialises method and material from its own internal state.
   Modify IntentForm to accept two optional props:
     defaultMethod?: string
     defaultMaterial?: string
   When these props are provided, use them as the initial useState values instead of the hardcoded defaults.
   Pass `category.preselectedMethod` and `category.preselectedMaterial` from the category data.
   If undefined, the form falls back to its existing defaults. Do not break the homepage usage of IntentForm (it passes no props).
```

**Mobile responsiveness:**
- Value props grid: 3 columns ≥768px, 1 column below
- How it works steps: row ≥768px, column below
- Hero h1: font-size clamp(28px, 5vw, 44px)
- Container padding: 24px on mobile

---

### 2. Update `src/components/Footer.tsx`

Add four category link sections to the footer. **Do not modify `src/components/Navbar.tsx`** — the navigation stays as Start / Concierge / Om oss only.

Add the following four sections to the footer (after existing footer content, or integrated with the existing column layout — match the visual style of whatever is already in Footer.tsx):

**Section: Bearbetningsmetoder**
- CNC-bearbetning → `/cnc-bearbetning`
- Plåt & svets → `/plat-och-svets`
- Gjutning → `/gjutning`
- Formsprutning → `/formsprutning`
- 3D-printing → `/3d-printing`

**Section: Material**
- Aluminium → `/legotillverkning-aluminium`
- Rostfritt stål → `/legotillverkning-rostfritt`
- Titan → `/titan-bearbetning`
- Plast & polymerer → `/legotillverkning-plast`
- Komposit → `/kompositmaterial`

**Section: Regioner**
- Göteborg → `/legotillverkare-goteborg`
- Stockholm → `/legotillverkare-stockholm`
- Småland → `/legotillverkare-smaland`
- Skåne → `/legotillverkare-skane`
- Blekinge → `/legotillverkare-blekinge`
- Halland → `/legotillverkare-halland`

**Section: Branscher**
- Försvar & flyg → `/as9100-certifierade-leverantorer`
- Fordonsindustri → `/fordonsindustri`
- Medicinteknik → `/medicinteknik`
- Energi → `/energi`

Link styling: match existing footer link style (no underline by default, underline or color on hover, --slate-navy-light color). Each section has a bold/uppercase heading label above the links. Follow the existing footer's visual language exactly.

---

### 3. Add page-level CSS

Add a `category.css` file at `src/app/[category]/category.css` (or extend `globals.css`) with styles for:

```css
/* Category hero */
.cat-hero { ... }
.cat-hero h1 { font-size: clamp(28px, 5vw, 44px); }

/* Value prop grid */
.valueprops-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
@media (max-width: 768px) {
  .valueprops-grid { grid-template-columns: 1fr; }
}

/* Steps row */
.steps-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  text-align: center;
}
@media (max-width: 768px) {
  .steps-row { grid-template-columns: 1fr; }
}

.step-number {
  font-family: var(--font-meta);
  font-size: 48px;
  font-weight: 700;
  color: var(--indigo);
  opacity: 0.25;
  line-height: 1;
  margin-bottom: 12px;
}
```

Follow the existing CSS patterns in `globals.css` — class-based, no Tailwind utilities for layout, CSS variables for all colours.

---

## Constraints

- Server components only — no `"use client"` in the page or layout (IntentForm is already client-side)
- Fully static: all 20 pages must be pre-rendered at build time via `generateStaticParams`
- Do not hardcode any copy in the component — all text comes from `content/categories/index.ts`
- Do not create a `layout.tsx` inside `[category]/` — the root layout handles everything
- Do not modify the homepage (`src/app/page.tsx`) — the IntentForm there passes no props and must continue to work
- Do not modify `src/components/Navbar.tsx` — nav stays as Start / Concierge / Om oss
- Confirm build passes: `source ~/.zprofile && npm run build`

---

## Expected output URLs (20 total)

```
/cnc-bearbetning
/plat-och-svets
/gjutning
/formsprutning
/3d-printing
/legotillverkning-aluminium
/legotillverkning-rostfritt
/titan-bearbetning
/legotillverkning-plast
/kompositmaterial
/legotillverkare-goteborg
/legotillverkare-stockholm
/legotillverkare-smaland
/legotillverkare-skane
/legotillverkare-blekinge
/legotillverkare-halland
/as9100-certifierade-leverantorer
/fordonsindustri
/medicinteknik
/energi
```
