# Onboarding — CareerTwin AI

Guia rápido para um novo colaborador começar a trabalhar no projeto. Do zero ao app rodando localmente em poucos minutos.

> Contexto do produto e diretrizes técnicas estão no [`CLAUDE.md`](../CLAUDE.md) (raiz) e no [`README.md`](../README.md). Ao abrir esta pasta no **Claude Code**, o `CLAUDE.md` é carregado automaticamente.

## Pré-requisitos

- **Node.js ≥ 20** e **npm**
- Conta no [Supabase](https://supabase.com) (ou acesso à organização do projeto)
- Chave da [Claude API](https://console.anthropic.com) (Anthropic)
- Git

## 1. Clonar o repositório

```bash
git clone https://github.com/akamitatrush/CareerTwin-MVP.git
cd CareerTwin-MVP
```

## 2. Instalar dependências

```bash
npm install
```

## 3. Configurar variáveis de ambiente

Copie o template e preencha com os valores reais:

```bash
cp .env.example .env.local
```

Preencha o `.env.local` (nunca commite este arquivo — ele está no `.gitignore`):

| Variável | Onde obter |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Project Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Project Settings → API Keys → publishable/anon |
| `SUPABASE_SECRET_KEY` | Supabase → Project Settings → API Keys → secret (opcional no MVP) |
| `ANTHROPIC_API_KEY` | console.anthropic.com → API Keys (server-only) |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` no ambiente local |

> As chaves reais **não** ficam no repositório. Peça a alguém do time por um canal seguro, ou use as suas próprias.

## 4. Aplicar o schema do banco (Supabase)

Se estiver usando um projeto Supabase **novo**, aplique as migrations em ordem no **SQL Editor** do painel:

1. [`supabase/migrations/20260713000000_initial_schema.sql`](../supabase/migrations/20260713000000_initial_schema.sql) — tabelas, RLS, regras de crédito, Storage
2. [`supabase/migrations/20260713000001_mvp_publishable_key_policies.sql`](../supabase/migrations/20260713000001_mvp_publishable_key_policies.sql) — policies para operar com a publishable key

Se for entrar no projeto Supabase **já existente** do time, o schema já está aplicado — pule este passo.

### Configuração de Auth (painel Supabase)

- **Authentication → Providers → Email:** desmarcar **Confirm email** (evita rate limit de e-mail no cadastro de teste).
- **Authentication → URL Configuration:** adicionar `http://localhost:3000/**` em Redirect URLs.
- **Login com Google** (opcional): habilitar o provider Google com credenciais OAuth do Google Cloud (ver README).

## 5. Rodar em desenvolvimento

```bash
npm run dev
```

Acesse **http://localhost:3000**.

## 6. Checks antes de commitar

Sempre rode os três antes de abrir um PR — devem passar sem erros:

```bash
npm run lint
npm run typecheck
npm run build
```

## Fluxo de trabalho com Git

- Branch a partir de `main`, com nome descritivo (ex.: `feat/relatorio-pdf`).
- Commits pequenos e descritivos, em português.
- Abra Pull Request para `main`.
- O push em `main` dispara **deploy automático na Vercel** (produção).

## Estrutura essencial

```
app/            # rotas (App Router): landing, (auth), (app)/dashboard, onboarding
components/     # UI por contexto (landing, auth, dashboard, shared, ui)
lib/            # supabase/ (clients) · ai/generate-report.ts (Claude API)
data/           # landing-page.ts (conteúdo tipado)
supabase/       # migrations SQL versionadas
docs/           # escopo (one-pager) e este guia
```

## Onde pedir ajuda

- Escopo do produto: [`docs/CareerTwin AI — One-page …`](./CareerTwin%20AI%20%E2%80%94%20One-page%20398c32d94bbf806295f4c82e1a33102c.md)
- Diretrizes técnicas e de design: [`CLAUDE.md`](../CLAUDE.md)
- Visão geral e arquitetura: [`README.md`](../README.md)
