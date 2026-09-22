-- Private counters for send cooldowns, verification attempts and token replay.
create table if not exists public.auth_limits (
  key text primary key,
  attempts integer not null,
  expires_at timestamptz not null
);
alter table public.auth_limits enable row level security;
revoke all on public.auth_limits from anon, authenticated;
create index if not exists auth_limits_expiry on public.auth_limits (expires_at);

create or replace function public.consume_auth_limit(bucket_key text, max_attempts integer, window_seconds integer)
returns boolean language plpgsql security definer set search_path = public as $$
declare current_attempts integer;
begin
  if max_attempts < 1 or window_seconds < 1 or window_seconds > 86400 then
    raise exception 'Invalid limit configuration';
  end if;
  delete from public.auth_limits where expires_at <= now();
  insert into public.auth_limits as bucket (key, attempts, expires_at)
  values (bucket_key, 1, now() + make_interval(secs => window_seconds))
  on conflict (key) do update set attempts = bucket.attempts + 1
  where bucket.attempts < max_attempts
  returning attempts into current_attempts;
  return current_attempts is not null;
end;
$$;
revoke all on function public.consume_auth_limit(text, integer, integer) from public, anon, authenticated;
grant execute on function public.consume_auth_limit(text, integer, integer) to service_role;
