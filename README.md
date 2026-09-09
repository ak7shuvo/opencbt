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
