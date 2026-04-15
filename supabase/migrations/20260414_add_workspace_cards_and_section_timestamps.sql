alter table public.profiles
add column if not exists profile_updated_at timestamptz,
add column if not exists template_updated_at timestamptz,
add column if not exists notifications_updated_at timestamptz,
add column if not exists cards_updated_at timestamptz;

update public.profiles
set
  profile_updated_at = coalesce(profile_updated_at, updated_at),
  template_updated_at = coalesce(template_updated_at, updated_at),
  notifications_updated_at = coalesce(notifications_updated_at, updated_at),
  cards_updated_at = coalesce(cards_updated_at, updated_at);

comment on column public.profiles.profile_updated_at is 'Last time account/profile details were saved.';
comment on column public.profiles.template_updated_at is 'Last time the default template selection changed.';
comment on column public.profiles.notifications_updated_at is 'Last time notification preferences changed.';
comment on column public.profiles.cards_updated_at is 'Last time card content or card inventory changed.';

create table if not exists public.workspace_cards (
  id text primary key,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  user_id text not null,
  label text not null default '',
  email text not null,
  name text not null,
  title text not null,
  website text,
  company text,
  phone text,
  linkedin text,
  qr_preference text not null default 'auto',
  template_id text not null default 'blueprint',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint workspace_cards_qr_preference_valid check (qr_preference in ('auto', 'website', 'linkedin'))
);

create index if not exists workspace_cards_profile_id_idx on public.workspace_cards(profile_id);
create index if not exists workspace_cards_user_id_idx on public.workspace_cards(user_id);

comment on table public.workspace_cards is 'Stores extra DigiCard variants beyond the primary workspace profile card.';

drop trigger if exists handle_workspace_cards_updated_at on public.workspace_cards;

create trigger handle_workspace_cards_updated_at
before update on public.workspace_cards
for each row
execute function public.set_updated_at();

alter table public.workspace_cards enable row level security;
