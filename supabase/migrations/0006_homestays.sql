create table if not exists homestays (
  id uuid primary key default uuid_generate_v4(),
  community_id uuid not null references communities(id) on delete cascade,
  family_name text not null,
  rooms integer,
  availability jsonb,
  price numeric,
  created_at timestamptz not null default now()
);

alter table homestays enable row level security;

-- public read; write restricted to the owning community's creator
create policy "homestays_public_read" on homestays
  for select using (true);

create policy "homestays_insert_own_community" on homestays
  for insert with check (
    auth.uid() = (select created_by from communities where id = homestays.community_id)
  );

create policy "homestays_update_own_community" on homestays
  for update using (
    auth.uid() = (select created_by from communities where id = homestays.community_id)
  );

-- Now that homestays exists, add the FK that 0005 left off, and extend
-- bookings RLS to cover homestay hosts the same way it already covers
-- experience hosts.
alter table bookings
  add constraint bookings_homestay_id_fkey
  foreign key (homestay_id) references homestays(id) on delete cascade;

drop policy if exists "bookings_select_own_or_host" on bookings;
create policy "bookings_select_own_or_host" on bookings
  for select using (
    auth.uid() = user_id
    or auth.uid() = (select host_id from experiences where id = bookings.experience_id)
    or auth.uid() = (
      select c.created_by from homestays h
      join communities c on c.id = h.community_id
      where h.id = bookings.homestay_id
    )
  );

drop policy if exists "bookings_update_own_or_host" on bookings;
create policy "bookings_update_own_or_host" on bookings
  for update using (
    auth.uid() = user_id
    or auth.uid() = (select host_id from experiences where id = bookings.experience_id)
    or auth.uid() = (
      select c.created_by from homestays h
      join communities c on c.id = h.community_id
      where h.id = bookings.homestay_id
    )
  );
