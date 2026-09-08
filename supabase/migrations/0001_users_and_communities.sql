create extension if not exists "uuid-ossp";

create type user_role as enum ('tourist', 'community', 'guide', 'admin');

create table if not exists users (
  id uuid primary key references auth.users(id) on delete cascade,
  role user_role not null default 'tourist',
  full_name text,
  email text,
  created_at timestamptz not null default now()
);

create table if not exists communities (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  location text not null,
  history text,
  culture text,
  contact_info jsonb,
  verified boolean not null default false,
  created_by uuid references users(id),
  created_at timestamptz not null default now()
);

alter table users enable row level security;
alter table communities enable row level security;

-- PLACEHOLDER POLICIES (Phase 3, no auth wired yet — Phase 2 must replace these)
-- Anyone can read communities.
create policy "communities_public_read" on communities
  for select using (true);

-- TEMP: anyone can insert/update. Replace with `auth.uid() = created_by` once Phase 2 auth exists.
create policy "communities_temp_write" on communities
  for all using (true) with check (true);
