-- 1. Auto-create a profile row for every new user
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Backfill profiles for users that predate the trigger
insert into public.profiles (id, email, full_name)
select u.id, u.email, coalesce(u.raw_user_meta_data->>'full_name', u.raw_user_meta_data->>'name', '')
from auth.users u
where not exists (select 1 from public.profiles p where p.id = u.id);

-- 2. Idempotency / audit log for payment provider webhooks
create table public.payment_events (
  id uuid primary key default gen_random_uuid(),
  event_id text not null unique,
  event_type text not null,
  environment text not null,
  occurred_at timestamp with time zone,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamp with time zone not null default now()
);

grant all on public.payment_events to service_role;

alter table public.payment_events enable row level security;

create policy "payment_events_admin_read"
  on public.payment_events for select
  to authenticated
  using (exists (select 1 from public.user_roles ur where ur.user_id = auth.uid() and ur.role = 'admin'::app_role));

create index idx_payment_events_created_at on public.payment_events (created_at desc);

-- 3. IP-based fallback for the anonymous free-tier limit
alter table public.usage_logs add column if not exists ip_hash text;
create index if not exists idx_usage_logs_ip_hash_created on public.usage_logs (ip_hash, created_at desc);
create index if not exists idx_usage_logs_visitor_created on public.usage_logs (visitor_key, created_at desc);
create index if not exists idx_usage_logs_user_created on public.usage_logs (user_id, created_at desc);

-- 4. Faster current-subscription lookups
create index if not exists idx_subscriptions_user_env_created
  on public.subscriptions (user_id, environment, created_at desc);