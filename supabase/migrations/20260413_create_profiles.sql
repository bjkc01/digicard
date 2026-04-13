create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id text not null unique,
  owner_email text not null unique,
  email text not null,
  name text not null,
  title text,
  company text,
  phone text,
  website text,
  linkedin text,
  default_template_id text not null default 'blueprint',
  notifications jsonb not null default '{"cardOpens": true, "newSaves": false, "qrScans": true, "weeklyDigest": true}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint profiles_owner_email_lowercase check (owner_email = lower(owner_email))
);

comment on table public.profiles is 'Stores one DigiCard workspace profile per authenticated user.';

drop trigger if exists handle_profiles_updated_at on public.profiles;

create trigger handle_profiles_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();

alter table public.profiles enable row level security;
