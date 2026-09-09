# OpenCBT UI Update

## What changed

Only three files were touched: `app/page.tsx`, `app/globals.css`, `app/layout.tsx`.

- **`app/page.tsx`** — Fixed two structural issues found in the supplied
  file rather than a full rewrite, since the existing editorial design
  (hero, intro, explore cards, heritage, communities, principles, impact,
  final CTA) already matched the intended direction closely:
  - Removed a duplicate `<main>` landmark (the root layout already renders
    one), replacing the outer wrapper with a fragment.
  - Added a `section-bleed` class to each of the 8 full-width color
    sections so they span the true viewport edge-to-edge instead of being
    boxed in by the root layout's `max-w-5xl` content container — this is
    what makes the "editorial band" look (forest-green intro, heritage
    strip, principles block, etc.) actually work visually.
- **`app/globals.css`** — Added, without removing anything existing:
  - `.section-bleed` utility (viewport-unit based, so it works regardless
    of how deeply it's nested inside a narrower parent container).
  - `overflow-x: hidden` on `html`/`body` as a safety net against any
    accidental horizontal scroll from the full-bleed sections.
  - `scroll-behavior: smooth` (already deactivated under
    `prefers-reduced-motion: reduce`, which this file already handled).
  - `::selection` styling, a `focus-visible` outline for keyboard
    navigation (forest green, matching the brand), and light scrollbar
    styling.
- **`app/layout.tsx`** — Updated only the page `<title>` and meta
  description to the requested copy. `Nav`, `Footer`, `AssistantWidget`,
  and the existing `<main className="mx-auto max-w-5xl px-6">` wrapper
  were left untouched so every other route (`/destinations`,
  `/communities`, `/homestays`, etc.) keeps rendering exactly as before —
  the full-bleed effect on the homepage is achieved entirely from
  `page.tsx` + `globals.css`, without changing how the layout wraps other
  pages.

## What did NOT change

- No dependencies added (no `framer-motion`, no new packages).
- `package.json`, `tsconfig`, `next.config`, `middleware`, API routes,
  Supabase config, and routing structure are untouched.
- No components outside these three files were modified.
- All animations remain CSS-only (`@keyframes` + `animation-delay`,
  already present in the supplied `globals.css`), and
  `prefers-reduced-motion: reduce` is respected.

## Build

`npm run build` was **not** run in this environment (no network access,
so `node_modules` could not be installed). The changes are limited to
class-name additions, one wrapper-tag swap (`<main>` → fragment) with a
balanced JSX structure, additive CSS-only rules, and two metadata string
edits — all verified by hand for balanced tags/braces. Please run
`npm run build` locally before deploying to confirm.

---

## Round 2 — ILO/BTB Jaflong CBT alignment + real PWA (this update)

### Changed
- `app/page.tsx` — added a "Who decides" governance strip (community-led
  decision-making modelled on a Destination Management Committee), updated
  homestay-card copy to reflect deliberately limited capacity per village,
  updated the first principle to mention women/youth skills, and added an
  SDG-alignment line under the impact stats.
- `app/layout.tsx` — meta description now names the Khasi and tea garden
  communities and "community-led"; added `manifest: "/manifest.json"`,
  `appleWebApp`, a `viewport.themeColor` (`#1F3A2E`, matching the existing
  forest brand color), and mounts the new `PwaRegister` component.

### Added
- `public/manifest.json` — PWA manifest (name, colors matched to
  `tailwind.config.ts`'s `forest`/`sand`, standalone display, 3 icon sizes).
- `public/icons/icon-192.png`, `icon-512.png`, `icon-maskable-512.png` —
  placeholder icons (forest-green background, "OC" mark) — swap for real
  branding whenever ready.
- `public/sw.js` — hand-written service worker. Cache-first **only** for
  static, hashed assets (`/_next/static/`, `/icons/`, fonts, images,
  `manifest.json`); every page navigation and API/Supabase call always goes
  to the network, falling back to `/offline` only on a genuine connectivity
  failure. No library added.
- `components/pwa-register.tsx` — tiny client component that registers the
  service worker; fails silently if unsupported. Mounted in `layout.tsx`
  alongside `AssistantWidget`.
- `app/offline/page.tsx` — offline fallback page.

### Not touched
`package.json`, `next.config`, `middleware.ts`, all API routes, Supabase
config, routing structure, `Nav`, `Footer`, `AssistantWidget`, and every
other route (`/destinations`, `/communities`, etc.).

### Verified
Merged these files into the full Phase 0-11 project and ran
`npx tsc --noEmit` — passes clean, no type errors. `public/manifest.json`
validated as parseable JSON. `public/sw.js` checked with `node -c` (valid
syntax).

---

## Round 3 — visual scale/consistency polish + demo seed data (this update)

### Changed
- `app/page.tsx`
  - All 9 section wrappers now use one of four named vertical-rhythm
    classes (`section-py-hero` / `-regular` / `-compact` / `-emphasis`,
    defined in `globals.css`) instead of ad-hoc `py-*` combinations. The
    "Who decides" section keeps its smaller footprint, but as the named
    `compact` step rather than a one-off value.
  - Hero heading's arbitrary `text-[5.25rem]` → `lg:text-7xl`, so the
    hero's type scale (5xl → 6xl → 7xl) steps predictably in line with
    Tailwind's scale instead of jumping to a custom in-between value.
  - All 17 arbitrary `text-[10px]`/`text-[11px]` eyebrow/caption labels →
    `text-xs`, so every caption in the page shares one scale step.
  - Six custom `grid-cols-[...]` ratios consolidated to two reusable
    ones (documented in a comment above the component): `0.7fr_1.3fr`
    ("wide split", used by Intro/Who-decides/Principles) and
    `0.9fr_1.1fr` ("balanced split", used by Hero and Heritage, mirrored
    depending on which side carries the visual). Impact's `1fr_auto` is
    a heading+link layout, not part of this scale, and was left as-is.
- `app/globals.css` — added the four `.section-py-*` utility classes
  (mobile/`sm`/`lg` steps) backing the rhythm change above; nothing
  existing was removed.
- `public/icons/icon-192.png`, `icon-512.png`, `icon-maskable-512.png` —
  replaced the flat "OC" text placeholder with a simple geometric
  leaf mark (sand leaf + vein + stem on the existing forest-green
  background), generated from plain SVG/shape math, no design tool or
  new dependency involved. The maskable variant keeps the mark inside
  Android's ~62%-diameter safe zone so it isn't clipped when masked.

### Added
- `public/icons/mark.svg`, `mark-maskable.svg` — the vector source for
  the new leaf mark, in case you want to re-export the PNGs at other
  sizes or hand them to a designer later. (The shipped PNGs were
  rasterized programmatically rather than through an SVG renderer, since
  this environment has neither network access nor an SVG-to-PNG tool
  installed — geometry matches the SVG source, but for pixel-perfect
  anti-aliasing you may want to re-export the PNGs from the SVGs
  directly.)
- `supabase/migrations/0010_seed_demo_data.sql` — demo data for 4
  communities (Jaflong, Khasia Punji, Rena, a Lakkatura tea-garden
  village), 4 destinations with real Sylhet-area coordinates, 8
  experiences, 9 homestays with limited room capacity, 7 heritage
  entries, and 20 impact-metric rows (4 years × 5 metrics, all trending
  up). No real family/person names are used.
  **Important:** this upload didn't include `supabase/migrations/
  0001-0009`, so the table/column names are inferred from what's
  referenced in `page.tsx`, not read from your real schema — every
  `CREATE TABLE` shape is written as a commented "ASSUMED SHAPE" block
  above its inserts so you can diff it against your actual migrations
  before running it. It's written to seed as the Postgres/service-role
  user (bypassing RLS) with `owner_id` left `NULL`; a commented-out
  block shows the alternative (real `auth.users` rows + non-null
  `owner_id`) if your policies require it. All inserts use
  `on conflict ... do nothing`, so it's safe to re-run.

### Not touched
`package.json`, `next.config`, `middleware.ts`, all other API routes,
existing Supabase migrations (`0001`–`0009`), routing structure, `Nav`,
`Footer`, `AssistantWidget`, and every other route (`/destinations`,
`/communities`, etc.). No new npm packages, design tools, or icon
libraries were added — icons are plain SVG/PNG.

### Verified
- Diffed the edited `page.tsx` against the original: every change is a
  `className` string swap (plus one added comment block) — no JSX tags,
  props, or structure were touched, so the file's balanced-tag/brace
  shape is unchanged from the version that already passed `tsc`.
  **Could not re-run `npx tsc --noEmit` in this environment**, because
  this upload contains only `app/page.tsx`, `app/layout.tsx`,
  `app/globals.css`, the PWA files, and this README — not the rest of
  the Phase 0-11 project (`tsconfig.json`, `tailwind.config.ts`,
  `node_modules`, `Nav`/`Footer`/`AssistantWidget`, or the Supabase
  migrations it references). Please run `npx tsc --noEmit` in your full
  project before deploying.
- `supabase/migrations/0010_seed_demo_data.sql` was validated
  programmatically (no `psql` available in this sandbox either):
  parentheses and quotes balance, every UUID literal is valid hex, and
  every `INSERT`'s column list matches its value-tuple count row for
  row (4/4/8/9/7/20 rows across the six tables). It has **not** been run
  against a live Postgres instance — please run it against your actual
  schema and let me know if any table/column name needs adjusting.
