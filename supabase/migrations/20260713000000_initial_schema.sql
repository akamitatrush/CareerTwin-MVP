-- ==============================================================
-- CareerTwin AI — Schema inicial (MVP)
-- Aplicar no SQL Editor do Supabase (ou via CLI: supabase db push)
-- Fonte de escopo: docs/CareerTwin AI — One-page (v2, 09/07/2026)
--
-- Regras de negócio codificadas aqui:
--   · 3 análises gratuitas por conta, compartilhadas entre os dois
--     tipos de relatório (funções free_* e trigger de crédito)
--   · Pacote de R$ 30 por 7 dias ilimitados, pagamento mock
--   · RLS: cada usuário acessa apenas os próprios dados
-- ==============================================================

-- ---------- Funções utilitárias ----------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

-- Limite de análises gratuitas por conta (fonte única do número 3)
create or replace function public.free_analysis_limit()
returns integer
language sql
immutable
as $$ select 3 $$;

-- ---------- Tabelas ----------

-- Perfil 1:1 com auth.users (criado automaticamente no signup via trigger)
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  cpf text unique,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
comment on table public.profiles is
  'Perfil do usuário (1:1 com auth.users). O onboarding do MVP não coleta dados complementares de carreira.';

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- Documentos enviados no onboarding (currículo e PDF do LinkedIn)
create table public.documents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  kind text not null check (kind in ('curriculo', 'linkedin')),
  storage_path text not null,
  file_name text not null,
  mime_type text,
  size_bytes integer,
  extracted_text text,
  status text not null default 'uploaded'
    check (status in ('uploaded', 'processing', 'ready', 'error')),
  error_message text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
comment on table public.documents is
  'Arquivos do usuário. O binário fica no bucket privado "documents" do Storage; aqui ficam metadados e texto extraído pela IA.';

create index documents_user_id_idx on public.documents (user_id, created_at desc);

create trigger documents_set_updated_at
  before update on public.documents
  for each row execute function public.set_updated_at();

-- Pacotes de acesso (R$ 30 por 7 dias ilimitados; pagamento SIMULADO no MVP)
create table public.access_packages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  price_cents integer not null default 3000,
  payment_status text not null default 'mock_paid'
    check (payment_status in ('mock_paid', 'canceled', 'refunded')),
  starts_at timestamptz not null default now(),
  expires_at timestamptz not null default now() + interval '7 days',
  created_at timestamptz not null default now()
);
comment on table public.access_packages is
  'Pacote de 7 dias de análises ilimitadas. MVP: pagamento simulado (mock) — mede intenção de compra, sem gateway real.';

create index access_packages_user_id_idx on public.access_packages (user_id, expires_at desc);

-- Análises/relatórios gerados pela IA
create table public.analyses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  kind text not null check (kind in ('perfil', 'aderencia_vaga')),
  status text not null default 'pending'
    check (status in ('pending', 'processing', 'completed', 'failed')),
  curriculo_document_id uuid references public.documents (id) on delete set null,
  linkedin_document_id uuid references public.documents (id) on delete set null,
  job_title text,
  job_description text,
  score integer check (score between 0 and 100),
  result jsonb,
  model text,
  input_tokens integer,
  output_tokens integer,
  consumed_free_credit boolean not null default false,
  error_message text,
  created_at timestamptz not null default now(),
  completed_at timestamptz,
  constraint aderencia_requer_vaga
    check (kind <> 'aderencia_vaga' or job_description is not null)
);
comment on table public.analyses is
  'Relatórios com IA: "perfil" (diagnóstico) e "aderencia_vaga" (score 0-100). Tokens e modelo alimentam as métricas de custo/desempenho da IA.';

create index analyses_user_id_idx on public.analyses (user_id, created_at desc);

-- Eventos de produto (métricas de ativação/conversão — one-pager, seção 4)
create table public.events (
  id bigint generated always as identity primary key,
  user_id uuid references public.profiles (id) on delete set null,
  name text not null,
  properties jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
comment on table public.events is
  'Eventos de produto (ex.: landing_cta_click, signup_completed, onboarding_completed, report_generated, package_mock_purchased).';

create index events_name_idx on public.events (name, created_at desc);

-- ---------- Regras de crédito (3 grátis por conta; pacote = ilimitado) ----------

create or replace function public.has_active_package(p_user uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.access_packages ap
    where ap.user_id = p_user
      and ap.payment_status = 'mock_paid'
      and now() between ap.starts_at and ap.expires_at
  );
$$;

-- Análises com falha não consomem crédito gratuito
create or replace function public.free_analyses_used(p_user uuid)
returns integer
language sql
stable
security definer
set search_path = ''
as $$
  select count(*)::integer
  from public.analyses a
  where a.user_id = p_user
    and a.consumed_free_credit
    and a.status <> 'failed';
$$;

create or replace function public.can_run_analysis(p_user uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select public.has_active_package(p_user)
      or public.free_analyses_used(p_user) < public.free_analysis_limit();
$$;

-- Marca automaticamente se a análise consome crédito gratuito
create or replace function public.set_analysis_credit()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  new.consumed_free_credit := not public.has_active_package(new.user_id);
  return new;
end;
$$;

create trigger analyses_set_credit
  before insert on public.analyses
  for each row execute function public.set_analysis_credit();

-- Visão consolidada dos direitos do usuário (respeita o RLS das tabelas base)
create or replace view public.user_entitlements
with (security_invoker = on) as
select
  p.id as user_id,
  public.free_analysis_limit() as free_limit,
  public.free_analyses_used(p.id) as free_used,
  greatest(public.free_analysis_limit() - public.free_analyses_used(p.id), 0) as free_remaining,
  public.has_active_package(p.id) as has_active_package,
  (
    select max(ap.expires_at)
    from public.access_packages ap
    where ap.user_id = p.id
      and ap.payment_status = 'mock_paid'
      and now() between ap.starts_at and ap.expires_at
  ) as package_expires_at
from public.profiles p;

-- ---------- Criação automática de perfil no signup ----------

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, cpf, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name'),
    new.raw_user_meta_data ->> 'cpf',
    new.raw_user_meta_data ->> 'avatar_url'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------- Row Level Security ----------

alter table public.profiles enable row level security;
alter table public.documents enable row level security;
alter table public.access_packages enable row level security;
alter table public.analyses enable row level security;
alter table public.events enable row level security;

-- profiles: usuário lê e edita apenas o próprio perfil (insert é via trigger)
create policy "profiles: leitura própria" on public.profiles
  for select to authenticated
  using ((select auth.uid()) = id);

create policy "profiles: atualização própria" on public.profiles
  for update to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

-- documents: dono lê, insere e exclui (updates de extração são do servidor)
create policy "documents: leitura própria" on public.documents
  for select to authenticated
  using (user_id = (select auth.uid()));

create policy "documents: inserção própria" on public.documents
  for insert to authenticated
  with check (user_id = (select auth.uid()));

create policy "documents: exclusão própria" on public.documents
  for delete to authenticated
  using (user_id = (select auth.uid()));

-- analyses: leitura própria; inserção própria somente com direito de uso
-- (updates de status/resultado são do servidor, com a chave secreta)
create policy "analyses: leitura própria" on public.analyses
  for select to authenticated
  using (user_id = (select auth.uid()));

create policy "analyses: inserção própria" on public.analyses
  for insert to authenticated
  with check (
    user_id = (select auth.uid())
    and public.can_run_analysis((select auth.uid()))
  );

-- access_packages: leitura própria (criação/estorno apenas pelo servidor)
create policy "access_packages: leitura própria" on public.access_packages
  for select to authenticated
  using (user_id = (select auth.uid()));

-- events: qualquer visitante registra eventos; leitura apenas pelo servidor
create policy "events: inserção pública" on public.events
  for insert to anon, authenticated
  with check (user_id is null or user_id = (select auth.uid()));

-- ---------- Storage: bucket privado para documentos ----------

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'documents',
  'documents',
  false,
  10485760, -- 10 MB
  array[
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]
)
on conflict (id) do nothing;

-- Cada usuário acessa apenas a própria pasta: documents/<auth.uid()>/...
create policy "storage documents: leitura própria" on storage.objects
  for select to authenticated
  using (
    bucket_id = 'documents'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

create policy "storage documents: upload próprio" on storage.objects
  for insert to authenticated
  with check (
    bucket_id = 'documents'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

create policy "storage documents: exclusão própria" on storage.objects
  for delete to authenticated
  using (
    bucket_id = 'documents'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );
