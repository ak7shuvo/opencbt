# OpenCBT — Current Status

**Phase:** 11 (Production Deployment) — App is deployment-ready
**Date:** 2026-09-08

## Completed
- Phase 0–6: docs, UI foundation, Auth, Communities, Destinations, Experiences + Bookings, Homestays
- Phase 7: `heritage_content` table (migration `0007_heritage_content.sql`), types: story/music/food/craft/festival. Added a `title` column beyond the original DATABASE_PLAN.md spec — entries need a display name to list/link them.
- API: `GET/POST /api/heritage` (filterable by `community_id`, `type`), `GET/PATCH /api/heritage/:id`
- `/heritage` with type filter tabs, `/heritage/[id]` detail with optional external media link
- `/communities/[id]` now links to experiences, homestays, and heritage
- `media_url` accepts any external URL — no Supabase Storage upload UI yet (later phase)
- Phase 8: `destinations.lat`/`destinations.lng` (migration `0008_destinations_lat_lng.sql`), backfilled for the four pilot destinations. `leaflet` + `react-leaflet` added. `components/map.tsx` (client) + `components/map-loader.tsx` (dynamic import, `ssr: false`) render OpenStreetMap tiles with pins. `/destinations` shows all pilot points; `/destinations/[slug]` shows a single zoomed-in point. Existing list views kept as-is — map is additive only.
- Phase 9: `impact_metrics` table (migration `0009_impact_metrics.sql`) — income, employment, women/youth participation per community per year; owner-based RLS. API: `GET/POST /api/impact`. `/impact` shows aggregate totals + per-year breakdown. Nav updated.
- Phase 10: `app/api/assistant/route.ts` — AI travel assistant that answers only from a live pull of destinations/experiences/homestays/heritage/communities (no invented facts), calling Claude via `ANTHROPIC_API_KEY`. `components/assistant-widget.tsx` floating "Ask OpenCBT" chat widget, mounted site-wide in `app/layout.tsx`. Advanced feature: `GET /api/search?q=` + `/search` page — ilike search across all five content tables, one result list with type labels. "Search" added to nav. No API key set → assistant returns a 503 with a clear message rather than crashing.
- Phase 11: `app/api/health/route.ts` — liveness/monitoring endpoint checking the app, Supabase connectivity, and whether the assistant is configured. `docs/DEPLOYMENT.md` — full Supabase Cloud + Vercel walkthrough (migration order, env vars, production build notes, post-deploy smoke test, rollback). `INSTALLATION.md` rewritten (was stale since before Phase 1). No application code changed beyond the health route — this phase is deployment prep, not new features. **The actual live deploy (creating the Supabase Cloud project and Vercel project) has not been done and can't be done from this side — it requires the project owner's Vercel/Supabase accounts.** Everything needed to do it is in `docs/DEPLOYMENT.md`.

## Not Started
- Guides — placeholder page only
- Routing/directions, visitor geolocation, and community/experience/homestay map pins (out of scope for Phase 8)
- Admin role checks
- File upload UI for heritage media (currently URL-only)
- Per-community breakdown / charts on `/impact` (currently platform-wide totals + flat year list only)
- Assistant has no conversation memory across questions (each question is answered independently) and no streaming — both reasonable Phase 11+ upgrades
- Search is exact-substring (`ilike`) only, no fuzzy/typo tolerance or ranking

## Decisions Locked In
- Standalone project, separate from OpenDMO (own DB/backend)
- Stack: Next.js + TypeScript + Tailwind + Shadcn + Supabase
- Deployment target: Vercel + Supabase Cloud
