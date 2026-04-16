alter table public.profiles
add column if not exists avatar_url text;

comment on column public.profiles.avatar_url is 'Optional uploaded avatar used across the DigiCard workspace account UI.';
