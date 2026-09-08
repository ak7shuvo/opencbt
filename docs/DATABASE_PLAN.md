# OpenCBT — Database Plan

## Philosophy
Start simple, expand later. All tables in a single Supabase PostgreSQL instance.

## Initial Tables (Phase 1–2 scope)

### users
| Column | Type | Notes |
|---|---|---|
| id | uuid | PK, from Supabase Auth |
| role | text | tourist / community / guide / admin |
| full_name | text | |
| email | text | |
| created_at | timestamptz | |

### communities
| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| name | text | |
| location | text | e.g. Jaflong, Khasia Punji |
| history | text | |
| culture | text | |
| contact_info | jsonb | |
| verified | boolean | admin-controlled |
| created_by | uuid | FK → users |

### destinations — ✅ implemented Phase 4 (`0004_destinations.sql`)
| id uuid PK | name text | slug text | description text | region text | gallery jsonb |

Seeded with the four confirmed pilot destinations: Jaflong, Khasia Punji, Rena, Sylhet Tea Garden Belt.

### experiences — ✅ implemented Phase 5 (`0005_experiences_and_bookings.sql`)
| id uuid PK | community_id FK | title text | description text | duration text | price numeric | host_id FK users |

### homestays — ✅ implemented Phase 6 (`0006_homestays.sql`)
| id uuid PK | community_id FK | family_name text | rooms int | availability jsonb | price numeric |

### bookings — ✅ implemented Phase 5 (`0005_experiences_and_bookings.sql`)
| id uuid PK | user_id FK | experience_id/homestay_id FK (exactly one, enforced by check constraint) | status text | date date |

### reviews
| id uuid PK | user_id FK | target_type text | target_id uuid | rating int | comment text |

### heritage_content — ✅ implemented Phase 7 (`0007_heritage_content.sql`)
| id uuid PK | community_id FK | type enum (story/music/food/craft/festival) | title text | media_url text | description text |

`title` was added beyond the original spec below — entries need a display name to list and link them.

## Later Additions (Phase 9+)
- `impact_metrics` (income, employment, women/youth participation)
- `guides` (separate from users if guide profile grows complex)

## Notes
- Row Level Security (RLS) is implemented as of Phase 2 — see `supabase/migrations/0002_auth_policies.sql`. Communities are owned via `auth.uid() = created_by`; users can only read/write their own `users` row.
- A DB trigger (`0003_user_signup_trigger.sql`) auto-creates each `users` row from signup metadata, so it works whether or not email confirmation is on.
- Keep migrations in `supabase/migrations/` for reproducibility.
