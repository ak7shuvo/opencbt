# Installation

## Local development
```bash
npm install
cp .env.example .env.local   # fill in Supabase (+ optionally Anthropic) values
npm run dev
```

## Environment variables
```
NEXT_PUBLIC_SUPABASE_URL=       # required
NEXT_PUBLIC_SUPABASE_ANON_KEY=  # required
ANTHROPIC_API_KEY=              # optional — powers the AI assistant widget (Phase 10);
                                 # without it /api/assistant returns 503, rest of the app is unaffected
```

## Database
Run every file in `supabase/migrations/` against your Supabase project, in
numeric order (`0001` through `0009`). See `docs/DATABASE_PLAN.md` for what
each one adds.

Optionally, run `supabase/seed.sql` afterward to populate destinations,
communities, homestays, heritage entries, and impact metrics with realistic
pilot data for local development and demos. It only inserts into tables that
are still empty, so it's safe to run once after the migrations. (It doesn't
seed `experiences`, since `host_id` requires a real authenticated user —
create those from the app once a community host signs up.)

## Production deployment
See `docs/DEPLOYMENT.md` for the full Vercel + Supabase Cloud walkthrough
(Phase 11).
