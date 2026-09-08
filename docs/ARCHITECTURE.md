# OpenCBT — Architecture

## Overview
Standalone platform, independent from OpenDMO. Monolithic-friendly, lightweight, single deployable unit for early phases.

## Stack
- **Frontend:** Next.js (App Router) + TypeScript + Tailwind CSS + Shadcn UI
- **Backend:** Next.js API routes (server actions) — Supabase as managed backend layer
- **Database:** PostgreSQL via Supabase
- **Auth:** Supabase Auth (email + OAuth)
- **Storage:** Supabase Storage (images/audio/video for heritage archive)
- **Maps:** OpenStreetMap + Leaflet
- **Deployment:** Vercel (frontend/API), Supabase Cloud (DB/Auth/Storage)

## High-Level Structure
```
OpenCBT/
├── app/                # Next.js routes
│   ├── (public)/       # Explorer, experiences, communities
│   ├── (dashboard)/    # Community/host dashboard
│   ├── (admin)/        # Admin moderation panel
│   └── api/            # API routes
├── components/
├── lib/                # Supabase client, utils
├── docs/
└── public/
```

## Module → Route Mapping
| Module | Routes |
|---|---|
| Community Profile | `/communities`, `/communities/[id]` |
| Destination Explorer | `/destinations`, `/destinations/[slug]` |
| Experience Marketplace | `/experiences`, `/experiences/[id]` |
| Homestay System | `/homestays`, `/homestays/[id]` |
| Local Guide System | `/guides`, `/guides/[id]` |
| Heritage Archive | `/heritage`, `/heritage/[id]` |
| Sustainability Tracker | `/impact` |
| Admin | `/admin/*` |

## Design Principles
- Mobile-first, low-bandwidth (image optimization, lazy loading)
- Minimal dependencies, no heavy backend infra in early phases
- Clear module boundaries so later phases don't break earlier ones
