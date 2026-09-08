-- Phase 2: replace Phase 3's temporary permissive policy with real auth checks.

drop policy if exists "communities_temp_write" on communities;

create policy "communities_insert_own" on communities
  for insert with check (auth.uid() = created_by);

create policy "communities_update_own" on communities
  for update using (auth.uid() = created_by);

-- users: each person can read/write only their own row.
create policy "users_select_own" on users
  for select using (auth.uid() = id);

create policy "users_insert_own" on users
  for insert with check (auth.uid() = id);

create policy "users_update_own" on users
  for update using (auth.uid() = id);
