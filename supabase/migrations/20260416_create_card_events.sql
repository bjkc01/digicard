-- card_events: tracks QR scan events per card.
-- card_id is TEXT (not a FK) because the primary card uses the hardcoded id "primary"
-- which is never stored in workspace_cards.

create table if not exists public.card_events (
  id uuid primary key default gen_random_uuid(),
  card_id text not null,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  event_type text not null default 'qr_scan',
  created_at timestamptz not null default timezone('utc', now())
);

-- If the table already exists with a FK on card_id, remove it.
-- This handles the case where it was previously created with a FK constraint.
do $$
begin
  if exists (
    select 1 from information_schema.table_constraints
    where table_name = 'card_events'
      and constraint_type = 'FOREIGN KEY'
      and constraint_name like '%card_id%'
  ) then
    execute (
      select 'alter table public.card_events drop constraint ' || constraint_name
      from information_schema.table_constraints
      where table_name = 'card_events'
        and constraint_type = 'FOREIGN KEY'
        and constraint_name like '%card_id%'
      limit 1
    );
  end if;
end $$;

create index if not exists card_events_profile_id_idx on public.card_events(profile_id);
create index if not exists card_events_card_id_idx on public.card_events(card_id);
create index if not exists card_events_created_at_idx on public.card_events(created_at desc);

alter table public.card_events enable row level security;
