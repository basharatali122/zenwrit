-- ROLES -------------------------------------------------------------
create type public.app_role as enum ('admin', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;

alter table public.user_roles enable row level security;

create policy "user_roles_select_own" on public.user_roles
  for select to authenticated using (auth.uid() = user_id);

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and role = _role
  )
$$;

-- TOOLS -------------------------------------------------------------
create table public.tools (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  short_description text not null default '',
  icon text not null default 'resume',
  category text not null default 'Job seekers',
  form_fields jsonb not null default '[]'::jsonb,
  system_prompt text not null default '',
  output_label text not null default 'Your result',
  faqs jsonb not null default '[]'::jsonb,
  article_title text not null default '',
  article_content text not null default '',
  meta_title text not null default '',
  meta_description text not null default '',
  is_published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

grant select on public.tools to anon;
grant select, insert, update, delete on public.tools to authenticated;
grant all on public.tools to service_role;

alter table public.tools enable row level security;

create policy "tools_public_read" on public.tools
  for select to anon, authenticated using (is_published = true);
create policy "tools_admin_read" on public.tools
  for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "tools_admin_insert" on public.tools
  for insert to authenticated with check (public.has_role(auth.uid(), 'admin'));
create policy "tools_admin_update" on public.tools
  for update to authenticated using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));
create policy "tools_admin_delete" on public.tools
  for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

-- BLOG POSTS --------------------------------------------------------
create table public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category text not null default 'General',
  excerpt text not null default '',
  content text not null default '',
  cover_image_url text,
  reading_time text not null default '5 min read',
  meta_title text not null default '',
  meta_description text not null default '',
  is_published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

grant select on public.blog_posts to anon;
grant select, insert, update, delete on public.blog_posts to authenticated;
grant all on public.blog_posts to service_role;

alter table public.blog_posts enable row level security;

create policy "blog_public_read" on public.blog_posts
  for select to anon, authenticated using (is_published = true);
create policy "blog_admin_read" on public.blog_posts
  for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "blog_admin_insert" on public.blog_posts
  for insert to authenticated with check (public.has_role(auth.uid(), 'admin'));
create policy "blog_admin_update" on public.blog_posts
  for update to authenticated using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));
create policy "blog_admin_delete" on public.blog_posts
  for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

-- TIMESTAMPS ---------------------------------------------------------
create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger update_tools_updated_at before update on public.tools
  for each row execute function public.update_updated_at_column();
create trigger update_blog_posts_updated_at before update on public.blog_posts
  for each row execute function public.update_updated_at_column();

-- STORAGE POLICIES ---------------------------------------------------
create policy "content_images_admin_insert" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'content-images' and public.has_role(auth.uid(), 'admin'));
create policy "content_images_admin_update" on storage.objects
  for update to authenticated
  using (bucket_id = 'content-images' and public.has_role(auth.uid(), 'admin'));
create policy "content_images_admin_delete" on storage.objects
  for delete to authenticated
  using (bucket_id = 'content-images' and public.has_role(auth.uid(), 'admin'));
create policy "content_images_admin_read" on storage.objects
  for select to authenticated
  using (bucket_id = 'content-images' and public.has_role(auth.uid(), 'admin'));