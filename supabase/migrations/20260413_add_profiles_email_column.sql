alter table public.profiles
add column if not exists email text;

update public.profiles
set email = owner_email
where email is null or btrim(email) = '';

alter table public.profiles
alter column email set not null;

comment on column public.profiles.email is 'Public contact email shown on the DigiCard profile.';
