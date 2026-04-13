alter table public.profiles
add column if not exists qr_preference text;

update public.profiles
set qr_preference = 'auto'
where qr_preference is null or btrim(qr_preference) = '';

alter table public.profiles
alter column qr_preference set default 'auto';

alter table public.profiles
alter column qr_preference set not null;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'profiles_qr_preference_valid'
  ) then
    alter table public.profiles
    add constraint profiles_qr_preference_valid
    check (qr_preference in ('auto', 'website', 'linkedin'));
  end if;
end
$$;

comment on column public.profiles.qr_preference is 'Controls whether the card QR prefers website, LinkedIn, or auto selection.';
