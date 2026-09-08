create table if not exists experiences (
  id uuid primary key default uuid_generate_v4(),
  community_id uuid not null references communities(id) on delete cascade,
  title text not null,
  description text,
  duration text,
  price numeric,
  host_id uuid not null references users(id),
  created_at timestamptz not null default now()
);

create table if not exists bookings (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references users(id),
  experience_id uuid references experiences(id) on delete cascade,
  homestay_id uuid, -- FK added in Phase 6 migration once `homestays` exists
  status text not null default 'pending', -- pending / confirmed / declined / cancelled
  date date not null,
  created_at timestamptz not null default now(),
  constraint bookings_exactly_one_target check (
    (experience_id is not null and homestay_id is null)
    or (experience_id is null and homestay_id is not null)
  )
);

alter table experiences enable row level security;
alter table bookings enable row level security;

-- experiences: public read, owner (host) write
create policy "experiences_public_read" on experiences
  for select using (true);

create policy "experiences_insert_own" on experiences
  for insert with check (auth.uid() = host_id);

create policy "experiences_update_own" on experiences
  for update using (auth.uid() = host_id);

-- bookings: the booker can see/create their own; the experience host can see
-- and update bookings made against their experience (to confirm/decline).
create policy "bookings_select_own_or_host" on bookings
  for select using (
    auth.uid() = user_id
    or auth.uid() = (select host_id from experiences where id = bookings.experience_id)
  );

create policy "bookings_insert_own" on bookings
  for insert with check (auth.uid() = user_id);

create policy "bookings_update_own_or_host" on bookings
  for update using (
    auth.uid() = user_id
    or auth.uid() = (select host_id from experiences where id = bookings.experience_id)
  );
