create type heritage_type as enum ('story', 'music', 'food', 'craft', 'festival');

create table if not exists heritage_content (
  id uuid primary key default uuid_generate_v4(),
  community_id uuid not null references communities(id) on delete cascade,
  type heritage_type not null,
  title text not null,
  description text,
  media_url text,
  created_at timestamptz not null default now()
);

alter table heritage_content enable row level security;

-- public read; write restricted to the owning community's creator
-- (same pattern as homestays_public_read / homestays_insert_own_community)
create policy "heritage_public_read" on heritage_content
  for select using (true);

create policy "heritage_insert_own_community" on heritage_content
  for insert with check (
    auth.uid() = (select created_by from communities where id = heritage_content.community_id)
  );

create policy "heritage_update_own_community" on heritage_content
  for update using (
    auth.uid() = (select created_by from communities where id = heritage_content.community_id)
  );
