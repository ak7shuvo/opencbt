create table if not exists destinations (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  description text,
  region text,
  gallery jsonb,
  created_at timestamptz not null default now()
);

alter table destinations enable row level security;

-- Public read; write restricted to admins later (no admin role check exists
-- yet — for now, writes go through the seed migration below, not the app).
create policy "destinations_public_read" on destinations
  for select using (true);

-- Seed the three confirmed pilot destinations.
insert into destinations (name, slug, description, region) values
  ('Jaflong', 'jaflong', 'River landscape, stone-collection livelihoods, and nature tourism along the India border.', 'Sylhet'),
  ('Khasia Punji', 'khasia-punji', 'Indigenous Khasia community: betel leaf cultivation, heritage knowledge, and punji village life.', 'Sylhet'),
  ('Rena', 'rena', 'Rural area near Jaflong with homestay and nature-experience potential.', 'Sylhet'),
  ('Sylhet Tea Garden Belt', 'tea-garden-belt', 'Rolling tea estates, rural villages, and traditional Sylheti food.', 'Sylhet')
on conflict (slug) do nothing;
