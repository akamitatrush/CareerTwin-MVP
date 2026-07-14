<div align="center">

```
 ██████╗ █████╗ ██████╗ ███████╗███████╗██████╗ ████████╗██╗    ██╗██╗███╗   ██╗
██╔════╝██╔══██╗██╔══██╗██╔════╝██╔════╝██╔══██╗╚══██╔══╝██║    ██║██║████╗  ██║
██║     ███████║██████╔╝█████╗  █████╗  ██████╔╝   ██║   ██║ █╗ ██║██║██╔██╗ ██║
██║     ██╔══██║██╔══██╗██╔══╝  ██╔══╝  ██╔══██╗   ██║   ██║███╗██║██║██║╚██╗██║
╚██████╗██║  ██║██║  ██║███████╗███████╗██║  ██║   ██║   ╚███╔███╔╝██║██║ ╚████║
 ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝   ╚═╝    ╚══╝╚══╝ ╚═╝╚═╝  ╚═══╝
```

# CareerTwin AI

### Seu mentor de carreira com IA para recolocação profissional
*Evolua. Reposicione-se. Conquiste. — Copiloto de carreira em **pt-BR** que transforma currículo e LinkedIn em diagnóstico, score de aderência e plano de ação.*

<br/>

[![Version](https://img.shields.io/badge/version-0.1.0-1f1f1f?style=for-the-badge)](./package.json)
[![Status](https://img.shields.io/badge/status-MVP%20funcional-2F7D5B?style=for-the-badge)](#)
[![Node](https://img.shields.io/badge/node-%E2%89%A520-339933?style=for-the-badge&logo=node.js&logoColor=white)](#)
[![License](https://img.shields.io/badge/license-private-grey?style=for-the-badge)](#)
[![Made in BR](https://img.shields.io/badge/made%20in-Brasil-009C3B?style=for-the-badge)](#)

<br/>

![Next.js](https://img.shields.io/badge/Next.js%2016-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React%2019-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript%205-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind%20CSS%204-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Anthropic](https://img.shields.io/badge/Claude%20Opus%204.8-D97757?style=for-the-badge&logo=anthropic&logoColor=white)

<br/>

[**O que é**](#-o-que-é) · [**Highlights**](#-highlights) · [**Regras de negócio**](#-regras-de-negócio) · [**Arquitetura**](#%EF%B8%8F-arquitetura) · [**Quick start**](#-quick-start) · [**Stack**](#-stack) · [**Estrutura**](#-estrutura-de-pastas) · [**Variáveis**](#-variáveis-de-ambiente) · [**Deploy**](#-deploy) · [**Segurança**](#%EF%B8%8F-segurança-e-dados) · [**Roadmap**](#%EF%B8%8F-roadmap) · [**Time**](#-time)

</div>

---

## ✨ O que é

**CareerTwin AI** é um aplicativo web B2C, **responsivo e mobile-first**, que atua como um mentor de carreira com IA para profissionais brasileiros de **tecnologia, negócios e marketing** em recolocação, transição de carreira ou busca por melhores oportunidades.

O produto analisa **currículo** e **PDF do LinkedIn** para responder as quatro perguntas críticas de quem está se reposicionando:

1. Para quais vagas eu realmente tenho aderência?
2. Como devo me posicionar profissionalmente?
3. O que preciso ajustar no currículo e no LinkedIn?
4. Quais lacunas realmente importam para evoluir?

A IA atua de forma **consultiva**: estrutura informações, explica lacunas e sugere melhorias práticas — **sem inventar experiências** e **sem prometer contratação**. A proposta é clareza, posicionamento e competitividade.

## 🚀 Highlights

- 🧭 **Dois relatórios com IA** — *Análise de Perfil* (diagnóstico de currículo, LinkedIn e posicionamento) e *Aderência à Vaga* (match perfil × vaga com **score de 0 a 100**).
- 📄 **Leitura direta de PDFs** — currículo e LinkedIn entram como *document blocks* na Claude API; nada de copiar e colar.
- 🎯 **Saída estruturada e confiável** — *structured outputs* (JSON Schema) garantem relatórios sempre válidos e renderizáveis.
- 🎨 **Design system próprio** — *Human-Centered Editorial SaaS*: minimalista, humano, laranja usado com parcimônia, WCAG AA.
- 🔐 **Auth completa** — cadastro por e-mail/CPF, login por senha e **Google OAuth**, com proteção de rotas via middleware.
- 💳 **Freemium + paywall simulado** — 3 análises grátis e pacote de 7 dias ilimitados (pagamento *mock* nesta fase).
- 🧱 **Regras de negócio no banco** — créditos, pacotes e RLS aplicados no Postgres do Supabase, não só no cliente.

## 📊 Regras de negócio

| Regra | Definição no MVP |
|---|---|
| **Análises gratuitas** | 3 por conta, **compartilhadas** entre Análise de Perfil e Aderência à Vaga (não 3 + 3) |
| **Monetização** | **R$ 30 / 7 dias** de análises ilimitadas — sem assinatura mensal |
| **Pagamento** | **Simulado (mock)** — mede intenção de compra, sem gateway real nesta fase |
| **Falhas** | Análises com erro **não consomem** crédito gratuito |
| **IA** | Claude API (`claude-opus-4-8`) para extração, diagnóstico, score e plano de ação |
| **LGPD** | Fora do escopo do MVP — **débito técnico explícito** antes de lançamento comercial |

**Métricas de sucesso** (one-pager, seção 4): conversão landing → cadastro, conclusão do onboarding, % que gera ao menos um relatório, uso das análises gratuitas, conversão gratuito → pagante e recompra do pacote — instrumentadas via a tabela `events`.

## 🏗️ Arquitetura

```
┌──────────────────────────── Next.js 16 (App Router) ────────────────────────────┐
│                                                                                  │
│  Landing (SSG)         (auth)              (app) — rotas protegidas               │
│  ┌───────────┐    ┌──────────────┐    ┌────────────────────────────────────┐     │
│  │ 8 seções  │    │ login        │    │ onboarding → dashboard → relatório  │     │
│  │ + CTAs    │──▶ │ cadastro     │──▶ │ (uploads)    (créditos)   (IA view) │     │
│  └───────────┘    │ Google OAuth │    └───────────────┬────────────────────┘     │
│                   └──────┬───────┘                    │ Server Actions            │
│                          │                            │                           │
│                   proxy.ts (renova sessão + protege rotas)                        │
└──────────────────────────┼────────────────────────────┼─────────────────────────┘
                           │                            │
                     ┌─────▼──────┐        ┌────────────▼────────────┐
                     │  Supabase  │        │      Claude API         │
                     │ Auth·RLS   │        │  claude-opus-4-8        │
                     │ Postgres   │        │  PDFs → structured JSON │
                     │ Storage    │        └─────────────────────────┘
                     └────────────┘
```

- **Server Components por padrão**; `"use client"` só onde há estado/eventos.
- **Mutações via Server Actions** com a sessão do próprio usuário — o **RLS** do Postgres aplica as regras de crédito e o isolamento de dados.
- **Geração de relatório síncrona** na action (adaptive thinking, ~30–60s com feedback visual); a chamada de IA nunca ocorre no cliente.

<details>
<summary><b>Fluxo 1 — Do cadastro ao primeiro relatório</b></summary>

<br/>

1. Visitante clica em **Começar agora** na landing → `/cadastro`.
2. Cria conta (e-mail/CPF + senha, ou Google) → trigger cria o `profile` automaticamente.
3. **Onboarding**: envia currículo e/ou PDF do LinkedIn ao bucket privado `documents`.
4. **Dashboard**: escolhe *Análise de Perfil* ou *Aderência à Vaga*.
5. A Server Action baixa os PDFs do Storage, chama a Claude API com *structured outputs* e persiste o relatório.
6. Redireciona para `/dashboard/relatorios/[id]` — a página faz *auto-refresh* enquanto o status é `processing`.

</details>

<details>
<summary><b>Fluxo 2 — Créditos e paywall simulado</b></summary>

<br/>

- A view `user_entitlements` calcula, no banco, quantas análises grátis restam e se há pacote ativo.
- Antes de inserir uma análise, a policy de RLS (`can_run_analysis`) bloqueia quem não tem direito de uso.
- Ao esgotar as 3 grátis, o dashboard exibe o **paywall** (Dialog) com o pacote **R$ 30 / 7 dias**.
- A "compra" insere um registro em `access_packages` com `payment_status = 'mock_paid'` — sem cobrança real.

</details>

## 🚀 Quick start

**Pré-requisitos:** Node ≥ 20, uma conta no [Supabase](https://supabase.com) e uma chave da [Claude API](https://console.anthropic.com).

```bash
# 1. Instalar dependências
npm install

# 2. Configurar ambiente
cp .env.example .env.local
# preencha NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY e ANTHROPIC_API_KEY

# 3. Aplicar o schema no Supabase (SQL Editor do painel)
#    execute em ordem os arquivos de supabase/migrations/

# 4. Rodar em desenvolvimento
npm run dev
```

Acesse **http://localhost:3000**.

**Configuração do Supabase:** no painel, desative **Authentication → Email → Confirm email** para testar o cadastro sem confirmação e (opcional) configure o provider **Google** com credenciais OAuth do Google Cloud.

```bash
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
npm run build      # build de produção
```

## 🧰 Stack

| Camada | Tecnologia |
|---|---|
| **Framework** | Next.js 16 (App Router) + React 19 |
| **Linguagem** | TypeScript 5 |
| **Estilo** | Tailwind CSS 4 + design system próprio (tokens semânticos CSS) |
| **Componentes** | shadcn/ui (Base UI) — totalmente adaptados à identidade CareerTwin |
| **Ícones** | Lucide React |
| **Fonte** | Roboto via `next/font/google` |
| **Backend / Dados** | Supabase — Postgres + Auth + Storage, com RLS |
| **IA** | Claude API (Anthropic) — `claude-opus-4-8`, structured outputs |
| **Deploy** | Vercel + Supabase |

## 📁 Estrutura de pastas

```
app/
  layout.tsx                      # Roboto, metadata, lang pt-BR
  page.tsx                        # landing page (8 seções)
  globals.css                     # tokens semânticos + escala tipográfica
  (auth)/                         # login, cadastro + server actions
  auth/callback|confirm/route.ts  # OAuth/PKCE e confirmação de e-mail
  (app)/onboarding/               # uploads de currículo e LinkedIn
  (app)/dashboard/                # dashboard, nova-analise, relatorios/[id]
proxy.ts                          # sessão Supabase + proteção de rotas
components/
  layout/ landing/ app/ auth/     # UI por contexto
  onboarding/ dashboard/ reports/ # módulos da área logada
  shared/ ui/                     # compartilhados + shadcn/ui adaptado
lib/
  supabase/                       # client, server, proxy
  ai/generate-report.ts           # Claude API: PDFs + structured outputs
  events.ts  types.ts             # métricas de produto + tipos
data/landing-page.ts              # conteúdo da landing, centralizado e tipado
supabase/migrations/              # schema SQL versionado
```

## 🔑 Variáveis de ambiente

Copie `.env.example` para `.env.local` e preencha:

| Variável | Descrição |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL do projeto Supabase (`https://<ref>.supabase.co`) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Chave pública (*publishable* `sb_publishable_…` ou anon key) |
| `SUPABASE_SECRET_KEY` | Chave secreta *server-only* (opcional no MVP) |
| `ANTHROPIC_API_KEY` | Chave da Claude API (*server-only*) — necessária para gerar relatórios |
| `NEXT_PUBLIC_SITE_URL` | URL base para redirects de OAuth (ex.: `http://localhost:3000`) |

> ⚠️ `.env.local` **nunca** é versionado. Apenas o `.env.example` (template sem segredos) vai para o Git.

## 🚢 Deploy

Recomendado: **Vercel** (frontend + Server Actions) + **Supabase** (Postgres, Auth, Storage).

1. Importe o repositório na Vercel.
2. Configure as variáveis de ambiente no painel (as mesmas do `.env.local`).
3. Aplique as migrations de `supabase/migrations/` no SQL Editor do Supabase.
4. Ajuste `NEXT_PUBLIC_SITE_URL` e as **Redirect URLs** do Supabase Auth para o domínio de produção.

## 🛡️ Segurança e dados

- **RLS em todas as tabelas** — cada usuário acessa apenas os próprios dados; inserir análise sem crédito é bloqueado no banco.
- **Storage privado** — currículos e PDFs isolados por pasta do usuário (`documents/<uid>/…`).
- **Segredos server-only** — `ANTHROPIC_API_KEY` e chaves secretas nunca são expostas ao cliente; chamadas de IA rodam apenas no servidor.
- **Guardrails de IA** — o system prompt proíbe inventar experiências e prometer contratação.
- **LGPD** — retenção formal de dados e conformidade **não** estão no escopo desta fase: é um **débito técnico explícito**, obrigatório antes de qualquer lançamento comercial real.

## 🗺️ Roadmap

- [x] Landing page completa (8 seções)
- [x] Autenticação (cadastro, login, Google OAuth)
- [x] Onboarding com upload de currículo e LinkedIn
- [x] Dashboard com créditos e paywall simulado
- [x] Relatórios com IA (Análise de Perfil e Aderência à Vaga)
- [ ] Testes automatizados (unit + e2e)
- [ ] Gateway de pagamento real (substituir o mock)
- [ ] Conformidade LGPD (retenção, exportação, exclusão)
- [ ] Evolução para pacotes/assinatura e modelo B2B

## 👥 Time

Projeto do curso **AugmenteDesign / AIPL (Artificial Intelligence Product Leaders)** — Tera.

Proprietário: **Cicero Janiel**

---

<div align="center">

*Construído com Claude API e Claude Code · Evolua. Reposicione-se. Conquiste.*

</div>
