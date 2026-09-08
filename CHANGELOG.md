# Changelog

## Consolidation fix — 2026-09-08
- Merged Phases 0–11 into a single tree. Phase 3's zip was excluded from the merge: its own changelog documents it as a broken branch built without auth ("Phase 2 skipped"), fully superseded by the Phase 2 zip (uploaded later as a backfill) which contains Phase 3's community feature plus the correct auth layer and replaces Phase 3's temporary permissive RLS policy. Effective merge order used: 0 → 1 → 2 → 4 → 5 → 6 → 7 → 8 → 9 → 10 → 11.
- No other files added or removed; no code changes beyond this exclusion. `npx tsc --noEmit` passes clean on the merged tree.

## Phase 11 — 2026-09-08
- `app/api/health/route.ts` — `GET /api/health` reports app/database/assistant status for uptime monitoring (Vercel built-in or any external checker)
- `docs/DEPLOYMENT.md` — step-by-step guide: Supabase Cloud project + migrations 0001-0009 in order, Vercel env vars, production build notes (Leaflet SSR, font fetching), post-deploy smoke-test checklist, rollback notes
- `INSTALLATION.md` rewritten — was still the pre-Phase-1 placeholder
- No other application code touched — this phase is deployment preparation only, per its own "out of scope: new features" rule
- Note: the actual Vercel + Supabase Cloud deployment (creating projects, running migrations against a live database) requires the project owner's accounts and hasn't been performed here — `docs/DEPLOYMENT.md` has the exact steps to do it

## Phase 10 — 2026-09-08
- `app/api/assistant/route.ts` — AI travel assistant endpoint; pulls a small live slice of destinations/experiences/homestays/heritage/communities as context and calls Claude (`ANTHROPIC_API_KEY`, model `claude-sonnet-4-6`) to answer visitor questions from that data only
- `components/assistant-widget.tsx` — floating chat widget ("Ask OpenCBT"), mounted globally in `app/layout.tsx`
- Advanced feature: platform-wide search — `GET /api/search?q=` (ilike across all five content tables) and `/search` page with a query form and typed result list; "Search" added to nav
- No env key set → `/api/assistant` returns a clear 503 instead of failing silently; everything else (auth, bookings, maps, impact) untouched — purely additive
- Docs updated: CURRENT_STATUS.md, FEATURE_ROADMAP.md, NEXT_PHASE_GUIDE.md
- Bugfix: `lib/types.ts` referenced `HeritageType` without defining it (left over from Phase 7), which failed `tsc --noEmit`; added the missing type alias

## Phase 9 — 2026-09-08
- `impact_metrics` table (migration `0009_impact_metrics.sql`): community_id FK, year, income, employment, women_participation, youth_participation; owner-based RLS (same pattern as heritage/homestays)
- API: `GET/POST /api/impact` (filterable by `community_id`)
- `/impact` — Sustainability Tracker: aggregate totals + per-year breakdown across all communities
- Nav updated with an "Impact" link
- All other modules untouched — purely additive

## Phase 8 — 2026-09-08
- `destinations.lat` / `destinations.lng` columns (migration `0008_destinations_lat_lng.sql`), backfilled with real approximate coordinates for Jaflong, Khasia Punji, Rena, and the Tea Garden Belt
- Added `leaflet` + `react-leaflet`; `components/map.tsx` (client component, OpenStreetMap tiles) and `components/map-loader.tsx` (dynamic-imports the map with `ssr: false`, since App Router Server Components can't do that directly)
- `/destinations` now shows a map with all four pilot points above the existing list; `/destinations/[slug]` shows a single zoomed-in point
- Existing list views, cards, and all other modules (auth, communities, experiences, homestays, heritage) untouched — purely additive

## Phase 7 — 2026-09-08
- `heritage_content` table (migration `0007_heritage_content.sql`), enum type story/music/food/craft/festival, `communities.created_by`-based RLS
- API: `GET/POST /api/heritage` (filterable by `community_id`, `type`), `GET/PATCH /api/heritage/:id`
- `/heritage` with type filter tabs, `/heritage/[id]` detail with optional external media link
- `/communities/[id]` links to experiences, homestays, and heritage

## Phase 6 — 2026-09-08
- `homestays` table (migration `0006_homestays.sql`); also adds the `bookings.homestay_id` FK and extends bookings RLS to homestay-owning hosts
- API: `GET/POST /api/homestays` (filterable by `community_id`), `GET/PATCH /api/homestays/:id`
- `/homestays` (filterable), `/homestays/[id]` reusing the Phase 5 `BookingForm`
- `/communities/[id]` links to both experiences and homestays

## Phase 5 — 2026-09-08
- `experiences` + `bookings` tables (migration `0005_experiences_and_bookings.sql`), owner-based RLS on experiences, booker/host RLS on bookings
- API: `GET/POST /api/experiences` (filterable by `community_id`), `GET/PATCH /api/experiences/:id`, `GET/POST /api/bookings`
- `/experiences` (filterable), `/experiences/[id]` with a reusable `BookingForm` component
- `/communities/[id]` links to that community's experiences

## Phase 4 — 2026-09-08
- `destinations` table (migration `0004_destinations.sql`), seeded with Jaflong, Khasia Punji, Rena, and the Tea Garden Belt
- `GET /api/destinations`
- `/destinations` real list, `/destinations/[slug]` detail page (404 via `notFound()` for unknown slugs)
- Discarded a broken third-party Phase 4 attempt that had dropped all Phase 2 auth work and used hardcoded destination data — rebuilt cleanly on top of Phase 2

## Phase 2 — 2026-09-08 (backfilled after Phase 3)
- Supabase Auth via `@supabase/ssr`: browser client (`lib/supabase/client.ts`), server client (`lib/supabase/server.ts`), session-refresh `middleware.ts`
- `/sign-in`, `/sign-up` (with role selection), sign-out button, protected `/dashboard`
- `0002_auth_policies.sql` replaces the Phase 3 temporary permissive policy with real `auth.uid() = created_by` checks
- `0003_user_signup_trigger.sql` auto-creates each `users` row on signup
- `/communities/new` and `POST /api/communities` now require sign-in; `created_by` is set server-side from the session, not the client

## Phase 3 — 2026-09-08
- `users` + `communities` tables (migration: `supabase/migrations/0001_users_and_communities.sql`)
- API: `GET/POST /api/communities`, `GET/PATCH /api/communities/:id`
- `/communities` real list, `/communities/[id]` detail, `/communities/new` create form
- ⚠️ Phase 2 (Auth) skipped — communities write policy is temporarily permissive

## Phase 1 — 2026-09-08
- Next.js + TypeScript + Tailwind app skeleton
- Design tokens: forest/sand/turmeric/river palette, Fraunces + Public Sans
- Nav, footer, root layout
- Home page + placeholder pages for Destinations, Experiences, Communities, Homestays, Heritage
- Supabase client stub (not yet wired to auth/data)

## Phase 0 — 2026-09-08
- Initial project documentation and blueprint created
- Architecture, database plan, and API contract drafted
- Feature roadmap (Phases 0–11) established
- Sylhet pilot scope defined (Jaflong, Khasia community, tea garden region)
