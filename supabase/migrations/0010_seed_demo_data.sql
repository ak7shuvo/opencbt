-- =============================================================================
-- 0010_seed_demo_data.sql
-- Demo/showcase data so no public page (/destinations, /experiences,
-- /homestays, /heritage, /communities, /impact) ever renders empty.
-- Modelled loosely on the ILO/BTB Jaflong Community-Based Tourism pilot in
-- Sylhet: Jaflong, a Khasia Punji, "Rena", and a tea-garden-belt village.
-- No real family/person names are used anywhere in this file.
--
-- =============================================================================
-- READ THIS FIRST — SCHEMA ASSUMPTIONS
-- =============================================================================
-- This upload did not include supabase/migrations/0001-0009 or
-- tailwind.config.ts, so the table/column names below are INFERRED from the
-- entities referenced across app/page.tsx (community, destination,
-- experience, homestay, heritage content, impact_metrics) and from the
-- filename you gave for the impact-metrics migration
-- (0009_impact_metrics.sql) — not read directly from your real schema.
--
-- Before running this migration:
--   1. Diff the "ASSUMED SHAPE" comments below against your actual
--      0001-0009 migrations and rename any table/column that doesn't
--      match (e.g. if your `experiences` table is called `activities`, or
--      a homestay capacity column is `max_guests` instead of
--      `room_capacity`). The comments are reference only — none of them
--      run, so they won't collide with tables you've already created.
--   2. Check the OWNER / RLS section below against what
--      `0002_auth_policies.sql` / `0003_user_signup_trigger.sql` actually
--      define — I don't have those files, so this seed takes the simpler
--      of the two common approaches (run as service_role, which bypasses
--      RLS) and leaves the alternative (real auth.users + owner_id rows)
--      as a clearly-marked, commented-out block.
--   3. Share those migration files with me in a follow-up and I'll adjust
--      this file to match column-for-column.
--
-- This file is idempotent (safe to re-run): every insert uses
-- `on conflict (slug) do nothing` or an equivalent natural key, and it
-- assumes `gen_random_uuid()` / `crypt()` are available (Supabase enables
-- the `pgcrypto` extension by default).
-- =============================================================================


-- -----------------------------------------------------------------------------
-- OWNER / RLS
-- -----------------------------------------------------------------------------
-- Recommended: run this migration as the Postgres / service_role user
-- (`supabase db push`, `supabase db reset`, or the SQL Editor in the
-- Supabase dashboard, which connects as service_role by default). That
-- bypasses row-level security, so this seed data doesn't need to satisfy
-- owner-based RLS policies to be inserted, and owner_id columns below are
-- left NULL.
--
-- If your policies instead require every row to reference a real
-- auth.users(id) owner, uncomment and adapt this block to create a
-- handful of demo host accounts first, then swap the NULLs in the
-- experiences/homestays inserts below for these ids:
--
-- insert into auth.users (
--   instance_id, id, aud, role, email, encrypted_password,
--   email_confirmed_at, created_at, updated_at,
--   raw_app_meta_data, raw_user_meta_data
-- ) values
--   ('00000000-0000-0000-0000-000000000000', 'a1000000-0000-4000-8000-000000000001',
--    'authenticated', 'authenticated', 'demo.jaflong@opencbt.example',
--    crypt('replace-with-a-real-password', gen_salt('bf')), now(), now(), now(),
--    '{"provider":"email","providers":["email"]}', '{"full_name":"Jaflong Demo Host"}'),
--   ('00000000-0000-0000-0000-000000000000', 'a1000000-0000-4000-8000-000000000002',
--    'authenticated', 'authenticated', 'demo.khasiapunji@opencbt.example',
--    crypt('replace-with-a-real-password', gen_salt('bf')), now(), now(), now(),
--    '{"provider":"email","providers":["email"]}', '{"full_name":"Khasia Punji Demo Host"}'),
--   ('00000000-0000-0000-0000-000000000000', 'a1000000-0000-4000-8000-000000000003',
--    'authenticated', 'authenticated', 'demo.rena@opencbt.example',
--    crypt('replace-with-a-real-password', gen_salt('bf')), now(), now(), now(),
--    '{"provider":"email","providers":["email"]}', '{"full_name":"Rena Demo Host"}'),
--   ('00000000-0000-0000-0000-000000000000', 'a1000000-0000-4000-8000-000000000004',
--    'authenticated', 'authenticated', 'demo.lakkatura@opencbt.example',
--    crypt('replace-with-a-real-password', gen_salt('bf')), now(), now(), now(),
--    '{"provider":"email","providers":["email"]}', '{"full_name":"Lakkatura Demo Host"}')
-- on conflict (id) do nothing;
-- -- 0003_user_signup_trigger.sql may also expect a matching row in a
-- -- public `profiles`/`users` table — check that trigger and mirror it
-- -- here if so.


-- -----------------------------------------------------------------------------
-- COMMUNITIES  (4)
-- -----------------------------------------------------------------------------
-- ASSUMED SHAPE — adjust to match your actual `communities` table.
-- create table if not exists communities (
--   id uuid primary key default gen_random_uuid(),
--   name text not null,
--   slug text unique not null,
--   region text,
--   description text,
--   created_at timestamptz not null default now()
-- );

insert into communities (id, name, slug, region, description) values
  ('c1000000-0000-4000-8000-000000000001', 'Jaflong', 'jaflong', 'Sylhet Division',
   'A riverside community on the India-Bangladesh border known for the Piyain River, stone-collection livelihoods, and views of the Khasi hills across the water.'),
  ('c1000000-0000-4000-8000-000000000002', 'Khasia Punji', 'khasia-punji', 'Sylhet Division',
   'An indigenous Khasi punji (village) set among betel-leaf and betel-nut groves, organised around its own traditional community leadership.'),
  ('c1000000-0000-4000-8000-000000000003', 'Rena', 'rena', 'Sylhet Division',
   'A small village bordering the Jaintiapur hills, where farming and seasonal stone-and-sand work shape daily life.'),
  ('c1000000-0000-4000-8000-000000000004', 'Lakkatura Tea Garden Village', 'lakkatura-tea-garden-village', 'Sylhet Division',
   'A settlement within the Lakkatura tea garden belt on the edge of Sylhet city, home to generations of tea-plucking families.')
on conflict (slug) do nothing;


-- -----------------------------------------------------------------------------
-- DESTINATIONS  (4, one per community, real Sylhet-area coordinates)
-- -----------------------------------------------------------------------------
-- ASSUMED SHAPE — adjust to match your actual `destinations` table.
-- create table if not exists destinations (
--   id uuid primary key default gen_random_uuid(),
--   community_id uuid references communities(id),
--   name text not null,
--   slug text unique not null,
--   description text,
--   latitude numeric,
--   longitude numeric,
--   created_at timestamptz not null default now()
-- );

insert into destinations (id, community_id, name, slug, description, latitude, longitude) values
  ('d1000000-0000-4000-8000-000000000001', 'c1000000-0000-4000-8000-000000000001',
   'Jaflong Riverside', 'jaflong-riverside',
   'The stretch of the Piyain River and stone gardens at Jaflong, with hills visible across the border.', 25.1687, 92.1428),
  ('d1000000-0000-4000-8000-000000000002', 'c1000000-0000-4000-8000-000000000002',
   'Khasia Punji Hillside', 'khasia-punji-hillside',
   'Hillside paths through betel-leaf groves surrounding the punji.', 25.1523, 92.1204),
  ('d1000000-0000-4000-8000-000000000003', 'c1000000-0000-4000-8000-000000000003',
   'Rena Village Trail', 'rena-village-trail',
   'A quiet walking trail through Rena''s farmland toward the Jaintiapur hills.', 25.1214, 92.0839),
  ('d1000000-0000-4000-8000-000000000004', 'c1000000-0000-4000-8000-000000000004',
   'Lakkatura Tea Garden', 'lakkatura-tea-garden',
   'Rolling tea gardens on the edge of Sylhet city, walkable from the community.', 24.9214, 91.8721)
on conflict (slug) do nothing;


-- -----------------------------------------------------------------------------
-- EXPERIENCES  (2-3 per community)
-- -----------------------------------------------------------------------------
-- ASSUMED SHAPE — adjust to match your actual `experiences` table.
-- create table if not exists experiences (
--   id uuid primary key default gen_random_uuid(),
--   community_id uuid references communities(id),
--   destination_id uuid references destinations(id),
--   owner_id uuid references auth.users(id),
--   title text not null,
--   slug text unique not null,
--   category text,
--   description text,
--   duration_hours numeric,
--   price_bdt numeric,
--   created_at timestamptz not null default now()
-- );

insert into experiences (id, community_id, destination_id, owner_id, title, slug, category, description, duration_hours, price_bdt) values
  ('e1000000-0000-4000-8000-000000000001', 'c1000000-0000-4000-8000-000000000001', 'd1000000-0000-4000-8000-000000000001', null,
   'Jaflong River & Stone Trail Walk', 'jaflong-river-stone-trail-walk', 'cultural tour',
   'A guided walk along the Piyain River with a community guide explaining stone-collection livelihoods and border-hill views.', 3, 600),
  ('e1000000-0000-4000-8000-000000000002', 'c1000000-0000-4000-8000-000000000001', 'd1000000-0000-4000-8000-000000000001', null,
   'Jaflong Village Cycling Route', 'jaflong-village-cycling-route', 'cycling',
   'A half-day cycling route connecting Jaflong''s riverside paths and nearby hamlets, bikes provided by the community.', 4, 750),
  ('e1000000-0000-4000-8000-000000000003', 'c1000000-0000-4000-8000-000000000002', 'd1000000-0000-4000-8000-000000000002', null,
   'Khasi Betel-Leaf Farming Workshop', 'khasi-betel-leaf-farming-workshop', 'craft workshop',
   'Hands-on time in a punji betel-leaf grove, learning cultivation and harvesting techniques from local growers.', 2.5, 500),
  ('e1000000-0000-4000-8000-000000000004', 'c1000000-0000-4000-8000-000000000002', 'd1000000-0000-4000-8000-000000000002', null,
   'Khasia Punji Cultural Walk', 'khasia-punji-cultural-walk', 'cultural tour',
   'An introduction to Khasi community life, matrilineal customs, and the punji''s traditional leadership structure.', 2, 450),
  ('e1000000-0000-4000-8000-000000000005', 'c1000000-0000-4000-8000-000000000003', 'd1000000-0000-4000-8000-000000000003', null,
   'Rena Farm-to-Table Morning', 'rena-farm-to-table-morning', 'food & craft',
   'A morning spent with a farming family, from harvesting seasonal vegetables to preparing a shared village-style meal.', 3, 550),
  ('e1000000-0000-4000-8000-000000000006', 'c1000000-0000-4000-8000-000000000003', 'd1000000-0000-4000-8000-000000000003', null,
   'Rena Hillside Trekking Route', 'rena-hillside-trekking-route', 'cycling',
   'A moderate trek from Rena village toward the Jaintiapur foothills, with a local guide.', 4, 650),
  ('e1000000-0000-4000-8000-000000000007', 'c1000000-0000-4000-8000-000000000004', 'd1000000-0000-4000-8000-000000000004', null,
   'Tea Garden Plucking Experience', 'tea-garden-plucking-experience', 'cultural tour',
   'Join tea workers for a morning of leaf-plucking and a tour of the processing floor, ending with a tasting.', 3, 600),
  ('e1000000-0000-4000-8000-000000000008', 'c1000000-0000-4000-8000-000000000004', 'd1000000-0000-4000-8000-000000000004', null,
   'Lakkatura Craft & Weaving Session', 'lakkatura-craft-weaving-session', 'craft workshop',
   'A small-group weaving session with women from the tea garden community, using traditional looms.', 2.5, 500)
on conflict (slug) do nothing;


-- -----------------------------------------------------------------------------
-- HOMESTAYS  (2-4 per community, deliberately limited room capacity)
-- -----------------------------------------------------------------------------
-- ASSUMED SHAPE — adjust to match your actual `homestays` table.
-- create table if not exists homestays (
--   id uuid primary key default gen_random_uuid(),
--   community_id uuid references communities(id),
--   owner_id uuid references auth.users(id),
--   name text not null,
--   slug text unique not null,
--   description text,
--   room_capacity int not null,
--   price_per_night_bdt numeric,
--   created_at timestamptz not null default now()
-- );

insert into homestays (id, community_id, owner_id, name, slug, description, room_capacity, price_per_night_bdt) values
  ('a4000000-0000-4000-8000-000000000001', 'c1000000-0000-4000-8000-000000000001', null,
   'Piyain Riverside Homestay', 'piyain-riverside-homestay',
   'A two-room family homestay overlooking the Piyain River, run by a local household.', 2, 1200),
  ('a4000000-0000-4000-8000-000000000002', 'c1000000-0000-4000-8000-000000000001', null,
   'Jaflong Hillview Homestay', 'jaflong-hillview-homestay',
   'A small guesthouse with views toward the border hills, limited to one booking party at a time.', 1, 1500),
  ('a4000000-0000-4000-8000-000000000003', 'c1000000-0000-4000-8000-000000000002', null,
   'Khasi Punji Bamboo House', 'khasi-punji-bamboo-house',
   'A traditional bamboo-and-tin homestay within the punji, hosted by a Khasi family.', 2, 1100),
  ('a4000000-0000-4000-8000-000000000004', 'c1000000-0000-4000-8000-000000000002', null,
   'Betel Grove Guest Room', 'betel-grove-guest-room',
   'A single guest room set among the punji''s betel-leaf groves.', 1, 1000),
  ('a4000000-0000-4000-8000-000000000005', 'c1000000-0000-4000-8000-000000000002', null,
   'Punji Hillside Homestay', 'punji-hillside-homestay',
   'A three-room homestay on the upper slope of the punji, popular for sunrise views.', 3, 1300),
  ('a4000000-0000-4000-8000-000000000006', 'c1000000-0000-4000-8000-000000000003', null,
   'Rena Farmhouse Stay', 'rena-farmhouse-stay',
   'A working farmhouse offering two rooms and shared family meals.', 2, 950),
  ('a4000000-0000-4000-8000-000000000007', 'c1000000-0000-4000-8000-000000000003', null,
   'Rena Hillside Cottage', 'rena-hillside-cottage',
   'A single-room cottage at the edge of Rena village, near the trailhead.', 1, 900),
  ('a4000000-0000-4000-8000-000000000008', 'c1000000-0000-4000-8000-000000000004', null,
   'Tea Garden Family Homestay', 'tea-garden-family-homestay',
   'A two-room homestay hosted by a tea-plucking family within the garden.', 2, 1250),
  ('a4000000-0000-4000-8000-000000000009', 'c1000000-0000-4000-8000-000000000004', null,
   'Lakkatura Garden View Room', 'lakkatura-garden-view-room',
   'A single room with a private balcony overlooking the tea rows.', 1, 1400)
on conflict (slug) do nothing;


-- -----------------------------------------------------------------------------
-- HERITAGE CONTENT  (story / music / food / craft / festival)
-- -----------------------------------------------------------------------------
-- ASSUMED SHAPE — adjust to match your actual `heritage_content` table.
-- create table if not exists heritage_content (
--   id uuid primary key default gen_random_uuid(),
--   community_id uuid references communities(id),
--   title text not null,
--   slug text unique not null,
--   type text check (type in ('story','music','food','craft','festival')),
--   body text,
--   created_at timestamptz not null default now()
-- );

insert into heritage_content (id, community_id, title, slug, type, body) values
  ('a5000000-0000-4000-8000-000000000001', 'c1000000-0000-4000-8000-000000000001',
   'The Stones of the Piyain', 'the-stones-of-the-piyain', 'story',
   'For generations, families in Jaflong have gathered stone and sand from the Piyain River, a livelihood shaped by the seasons and the river''s changing course.'),
  ('a5000000-0000-4000-8000-000000000002', 'c1000000-0000-4000-8000-000000000002',
   'Khasi Weaving Traditions', 'khasi-weaving-traditions', 'craft',
   'Khasi households in the punji continue a tradition of handloom weaving, passed informally from mother to daughter rather than taught in a workshop.'),
  ('a5000000-0000-4000-8000-000000000003', 'c1000000-0000-4000-8000-000000000002',
   'Songs of the Betel Grove', 'songs-of-the-betel-grove', 'music',
   'Work songs sung during betel-leaf harvesting carry rhythms tied to the pace of picking, still sung by older members of the community.'),
  ('a5000000-0000-4000-8000-000000000004', 'c1000000-0000-4000-8000-000000000003',
   'Rena''s Harvest Festival', 'renas-harvest-festival', 'festival',
   'An annual gathering marking the end of the harvest season, with shared food, music, and games across the village.'),
  ('a5000000-0000-4000-8000-000000000005', 'c1000000-0000-4000-8000-000000000003',
   'Village Kitchen Staples', 'village-kitchen-staples', 'food',
   'Everyday Rena cooking leans on home-grown vegetables and river fish, prepared in ways that vary subtly from household to household.'),
  ('a5000000-0000-4000-8000-000000000006', 'c1000000-0000-4000-8000-000000000004',
   'A Day in the Tea Garden', 'a-day-in-the-tea-garden', 'story',
   'Tea-plucking families describe a working rhythm set by sunrise starts and the weighing of the day''s leaf at dusk.'),
  ('a5000000-0000-4000-8000-000000000007', 'c1000000-0000-4000-8000-000000000004',
   'Tea Garden Community Feast', 'tea-garden-community-feast', 'festival',
   'A shared seasonal feast marking the close of the main plucking season, open to visiting travellers by invitation from host families.')
on conflict (slug) do nothing;


-- -----------------------------------------------------------------------------
-- IMPACT METRICS  (multi-year upward trend, so /impact isn't empty)
-- -----------------------------------------------------------------------------
-- ASSUMED SHAPE — adjust to match your actual `impact_metrics` table
-- from 0009_impact_metrics.sql.
-- create table if not exists impact_metrics (
--   id uuid primary key default gen_random_uuid(),
--   year int not null,
--   metric text not null,
--   value numeric not null,
--   unit text,
--   created_at timestamptz not null default now(),
--   unique (year, metric)
-- );

insert into impact_metrics (id, year, metric, value, unit) values
  ('a6000000-0000-4000-8000-000000000001', 2022, 'local_income_generated', 1850000, 'BDT'),
  ('a6000000-0000-4000-8000-000000000002', 2023, 'local_income_generated', 2760000, 'BDT'),
  ('a6000000-0000-4000-8000-000000000003', 2024, 'local_income_generated', 3920000, 'BDT'),
  ('a6000000-0000-4000-8000-000000000004', 2025, 'local_income_generated', 5140000, 'BDT'),

  ('a6000000-0000-4000-8000-000000000005', 2022, 'community_members_employed', 34, 'people'),
  ('a6000000-0000-4000-8000-000000000006', 2023, 'community_members_employed', 52, 'people'),
  ('a6000000-0000-4000-8000-000000000007', 2024, 'community_members_employed', 71, 'people'),
  ('a6000000-0000-4000-8000-000000000008', 2025, 'community_members_employed', 96, 'people'),

  ('a6000000-0000-4000-8000-000000000009', 2022, 'women_participation_rate', 28, 'percent'),
  ('a6000000-0000-4000-8000-00000000000a', 2023, 'women_participation_rate', 35, 'percent'),
  ('a6000000-0000-4000-8000-00000000000b', 2024, 'women_participation_rate', 41, 'percent'),
  ('a6000000-0000-4000-8000-00000000000c', 2025, 'women_participation_rate', 47, 'percent'),

  ('a6000000-0000-4000-8000-00000000000d', 2022, 'youth_participation_rate', 21, 'percent'),
  ('a6000000-0000-4000-8000-00000000000e', 2023, 'youth_participation_rate', 27, 'percent'),
  ('a6000000-0000-4000-8000-00000000000f', 2024, 'youth_participation_rate', 33, 'percent'),
  ('a6000000-0000-4000-8000-000000000010', 2025, 'youth_participation_rate', 39, 'percent'),

  ('a6000000-0000-4000-8000-000000000011', 2022, 'homestay_bookings', 96, 'bookings'),
  ('a6000000-0000-4000-8000-000000000012', 2023, 'homestay_bookings', 168, 'bookings'),
  ('a6000000-0000-4000-8000-000000000013', 2024, 'homestay_bookings', 245, 'bookings'),
  ('a6000000-0000-4000-8000-000000000014', 2025, 'homestay_bookings', 331, 'bookings')
on conflict (year, metric) do nothing;
