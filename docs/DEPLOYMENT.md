# OpenCBT — Deployment Guide (Phase 11)

This is a step-by-step guide for taking OpenCBT from local dev to a live URL on
Vercel + Supabase Cloud, per `docs/ARCHITECTURE.md`. It assumes no infra exists yet.

## 1. Supabase Cloud project

1. Create a project at supabase.com (choose a region close to Bangladesh, e.g.
   Singapore, for lower latency).
2. In the Supabase SQL editor, run every migration in `supabase/migrations/`
   **in numeric order**, 0001 through 0009:
   ```
   0001_users_and_communities.sql
   0002_auth_policies.sql
   0003_user_signup_trigger.sql
   0004_destinations.sql
   0005_experiences_and_bookings.sql
   0006_homestays.sql
   0007_heritage_content.sql
   0008_destinations_lat_lng.sql
   0009_impact_metrics.sql
   ```
   Do not skip or reorder — later migrations assume earlier tables/columns exist.
3. In Project Settings → API, copy the **Project URL** and **anon public key** —
   you'll need these for step 2.
4. In Authentication → Providers, confirm Email is enabled (this is what
   `(auth)/sign-up` and `(auth)/sign-in` use).
5. Spot-check RLS: open Table Editor → `communities` → confirm RLS is "Enabled"
   and the `auth.uid() = created_by` policy from `0002_auth_policies.sql` is
   listed. Repeat for `experiences`, `homestays`, `heritage_content`,
   `impact_metrics`, `bookings`.

## 2. Vercel project

1. Import this repository into Vercel (or drag-and-drop deploy from this zip).
2. Framework preset: Next.js (auto-detected — no `vercel.json` needed).
3. Set Environment Variables (Project Settings → Environment Variables),
   for Production, Preview, and Development:

   | Variable | Value | Required |
   |---|---|---|
   | `NEXT_PUBLIC_SUPABASE_URL` | from Supabase step 1.3 | yes |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | from Supabase step 1.3 | yes |
   | `ANTHROPIC_API_KEY` | your Anthropic API key | no — without it, `/api/assistant` returns a 503 and the rest of the site works normally |

4. Deploy. Vercel runs `npm install && npm run build` automatically.

## 3. Production build check

Before or after deploying, you can verify the production build locally if you
have network access to Google Fonts (Fraunces, Public Sans are loaded via
`next/font/google` in `app/layout.tsx`):
```bash
npm install
npm run build
npm run start
```
If this fails specifically on font fetching in a sandboxed/offline
environment, that's a network restriction, not a code issue — Vercel's build
environment has open internet access and will fetch them fine.

The Leaflet map (`components/map.tsx` + `components/map-loader.tsx`) is
already dynamically imported with `ssr: false`, which is required for it to
work in a production (SSR) build — no changes needed there.

## 4. Monitoring

`GET /api/health` (added this phase) reports `{ status, checks, time }` —
checks the app itself, the Supabase connection, and whether the assistant is
configured. Point Vercel's built-in monitoring, or any external uptime
checker (UptimeRobot, Better Uptime, etc.), at
`https://<your-domain>/api/health`. No new dependency required — this is
enough for pilot scale per `docs/ARCHITECTURE.md`'s "minimal dependencies"
principle.

## 5. Post-deploy smoke test

Walk through every module on the live URL:

- [ ] Sign up a test account, sign in, sign out
- [ ] Create a community (`/communities/new`)
- [ ] `/destinations` map loads with all four pilot points; `/destinations/[slug]` shows one zoomed in
- [ ] Create an experience, book it, confirm the booking appears for the host
- [ ] Create a homestay, book it
- [ ] Add heritage content, filter by type
- [ ] `/impact` shows totals
- [ ] `/search?q=jaflong` (or any known name) returns results
- [ ] Assistant widget answers a question about a real destination/experience
- [ ] `/api/health` returns `"status": "healthy"`

## Rollback

Vercel keeps every deployment; if something breaks, use "Instant Rollback" to
the previous deployment from the Vercel dashboard. No database rollback should
be needed for this phase since it makes no schema changes.
