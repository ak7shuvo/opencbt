# OpenCBT — API Documentation (Draft)

> Populated as each phase is built. Phase 0 defines the contract only.

## Auth
Handled via Supabase Auth client SDK (no custom endpoints needed initially).

## Planned Endpoints (Next.js API routes / Supabase queries)

### Communities
- `GET /api/communities` — list, filterable by location/verified
- `GET /api/communities/:id` — detail
- `POST /api/communities` — create (auth: community role)
- `PATCH /api/communities/:id` — update own profile

### Destinations
- `GET /api/destinations`
- `GET /api/destinations/:slug`

### Experiences
- `GET /api/experiences?community_id=`
- `POST /api/experiences` (auth: community/host)
- `POST /api/bookings` (auth: tourist) — booking request

### Homestays
- `GET /api/homestays?community_id=`
- `POST /api/homestays` (auth: community/host)

### Heritage Archive
- `GET /api/heritage?community_id=&type=`
- `POST /api/heritage` (auth: community)

### Reviews
- `POST /api/reviews` (auth: tourist, after booking)

### Admin
- `PATCH /api/admin/communities/:id/verify`
- `GET /api/admin/moderation-queue`

## Conventions
- JSON responses, standard REST verbs
- Pagination via `?page=&limit=`
- Errors: `{ error: string, code: number }`
