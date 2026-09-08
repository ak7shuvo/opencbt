create table if not exists impact_metrics (
  id uuid primary key default uuid_generate_v4(),
  community_id uuid not null references communities(id) on delete cascade,
  year int not null,
  income numeric,
  employment int,
  women_participation int,
  youth_participation int,
  created_at timestamptz not null default now()
);

alter table impact_metrics enable row level security;

create policy "impact_public_read" on impact_metrics
  for select using (true);

create policy "impact_insert_own_community" on impact_metrics
  for insert with check (
    auth.uid() = (select created_by from communities where id = impact_metrics.community_id)
  );

create policy "impact_update_own_community" on impact_metrics
  for update using (
    auth.uid() = (select created_by from communities where id = impact_metrics.community_id)
  );
