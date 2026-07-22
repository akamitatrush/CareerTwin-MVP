# CLAUDE.md

Este arquivo orienta o Claude Code ao trabalhar neste repositório.

## Projeto: CareerTwin AI

Aplicativo web B2C, responsivo e mobile-first: um mentor de carreira com IA para profissionais brasileiros (foco em tecnologia, negócios e marketing) em recolocação, transição de carreira ou busca por melhores oportunidades. O produto analisa currículo, PDF do LinkedIn e vagas específicas para entregar relatórios com diagnóstico, score de aderência e recomendações práticas.

### Documentação do projeto (ordem de leitura)

Ao assumir/continuar este projeto, leia nesta ordem:

1. **`README.md`** — visão geral, arquitetura e quick start.
2. **`docs/CONTEXTO-DE-TRABALHO.md`** — metodologia, decisões técnicas (e o porquê), armadilhas já resolvidas e o estado/pendências atuais. **É a "memória" da nossa forma de trabalho — leia antes de codar.**
3. **`docs/ONBOARDING.md`** — setup passo a passo (clone → `.env.local` → migrations → rodar).
4. **`docs/CareerTwin AI — One-page 398c32d94bbf806295f4c82e1a33102c.md`** — escopo completo do produto.

- **Mensagem principal:** "Evolua. Reposicione-se. Conquiste."
- **CTA primário:** "Começar agora" · **CTA secundário:** "Conhecer a plataforma"
- **Público:** profissionais em recolocação, transição de carreira ou busca por melhor posicionamento.
- **Idioma de todo o conteúdo:** português brasileiro (`lang="pt-BR"`).

### Escopo do MVP (5 módulos)

1. **Landing page** — apresentação institucional, proposta de valor, exemplo de relatório, CTA para começar a análise grátis (design detalhado nas seções abaixo).
2. **Login e cadastro** — CPF ou e-mail + senha; login com Google. **Sem** login via LinkedIn (o LinkedIn entra apenas como fonte de dados via upload de PDF).
3. **Onboarding** — upload do currículo e do PDF do LinkedIn. Sem coleta de dados complementares de carreira.
4. **Dashboard** — perfil do usuário, histórico de relatórios, controle de análises gratuitas, acesso a novas análises.
5. **Relatórios com IA** — "Análise de Perfil" (diagnóstico de currículo, LinkedIn e posicionamento) e "Aderência à Vaga" (match perfil × vaga com score de 0 a 100).

### Regras de negócio do MVP

- **Freemium:** 3 análises gratuitas por conta, compartilhadas entre os dois tipos de relatório (não são 3 + 3).
- **Monetização:** R$ 30 por 7 dias de análises ilimitadas (sem limite técnico no período); sem assinatura mensal. O pagamento é **simulado (mock)** — nenhuma integração real com gateway nesta fase; o objetivo é medir intenção de compra.
- **IA:** Claude API (Anthropic) para extração de dados de documentos, análise de perfil, score de aderência, recomendações e síntese de relatórios. Construção técnica com Claude Code.
- **LGPD e retenção de dados:** fora do escopo do MVP — débito técnico explícito, obrigatório antes de qualquer lançamento comercial real.

### Guardrails de produto

- Nunca prometer contratação: a proposta de valor é clareza, posicionamento e competitividade profissional.
- A IA é consultiva: estrutura informações, explica lacunas e sugere melhorias — **nunca inventa experiências** do usuário.
- Diferenciar-se de um uso genérico de chatbot: relatórios estruturados, objetivos e acionáveis.
- Atenção contínua ao custo de IA por análise (o pacote de 7 dias é ilimitado).

## Stack

- **Framework:** Next.js (App Router) + TypeScript
- **Estilo:** Tailwind CSS
- **Design system:** shadcn/ui (base estrutural, aparência totalmente customizada — nunca manter o visual padrão)
- **Ícones:** Lucide React (única biblioteca de ícones; importação individual; stroke 1.75)
- **Fonte:** Roboto via `next/font/google` (pesos 400, 500, 600, 700, 800; fallback Arial, sans-serif)
- **Aliases:** `@/` para imports
- **Backend/dados:** Supabase (Postgres + Auth + Storage) via `@supabase/supabase-js` + `@supabase/ssr`
  - Cliente browser: `lib/supabase/client.ts` · Cliente server (por request): `lib/supabase/server.ts`
  - Variáveis em `.env.local` (nunca commitar; template em `.env.example`): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SECRET_KEY` (server-only)
  - Migrations SQL versionadas em `supabase/migrations/` — aplicar no SQL Editor do painel (ou `supabase db push` quando o CLI estiver configurado)
  - Regras de crédito aplicadas no banco: funções `can_run_analysis`/`free_analyses_used`/`has_active_package`, trigger de crédito em `analyses` e view `user_entitlements`; RLS em todas as tabelas (usuário só acessa os próprios dados)
- **IA:** Claude API (Anthropic) — `ANTHROPIC_API_KEY` server-only; chamadas de IA sempre em código de servidor, nunca no cliente

### Princípios de implementação

- Server Components por padrão; `"use client"` apenas onde há estado, eventos ou APIs do navegador.
- Não instalar bibliotecas desnecessárias nem duas libs para o mesmo problema.
- Não usar `any` sem justificativa técnica clara.
- Classes condicionais centralizadas com a função `cn`.
- Componentes pequenos, reutilizáveis e semanticamente nomeados.
- Preservar o package manager já em uso no projeto.
- Não alterar arquivos não relacionados à tarefa; adotar sempre a solução menos destrutiva.

## Comandos

Identifique os scripts reais no `package.json` e use o package manager do projeto. Checks obrigatórios antes de concluir qualquer tarefa:

```bash
# lint, typecheck e build devem passar sem erros
npm run lint
npm run typecheck   # ou npx tsc --noEmit se não houver script
npm run build
npm run dev         # desenvolvimento local
```

## Direção de design: "Human-Centered Editorial SaaS"

Interface SaaS minimalista e contemporânea: hierarquia editorial forte, fotografia humana, tecnologia acessível e uso controlado de uma cor vibrante (laranja). Atributos: minimalista, humano, editorial, profissional, acolhedor, premium acessível, orientado à conversão.

A direção de design e os tokens abaixo valem para **todo o produto** (landing, login/cadastro, onboarding, dashboard e relatórios), não apenas para a landing page.

**Características visuais:** grandes áreas de respiro; fundos predominantemente brancos; títulos grandes e diretos com palavras estratégicas em laranja; fotografias profissionais de pessoas reais; formas orgânicas em tons claros; cards com bordas discretas; ícones lineares; sombras muito suaves; layouts modulares; mockups de produto integrados à narrativa.

**Evitar sempre:** glassmorphism, neomorphism, neon, gradientes intensos, fundos escuros predominantes, sombras pesadas, bordas excessivamente arredondadas, visual futurista exagerado, ilustrações infantis, animações decorativas contínuas, uso excessivo de laranja, aparência genérica de template, blocos longos de texto centralizado, componentes com cara de shadcn/ui padrão.

## Tokens de cor

Definir como variáveis CSS semânticas no CSS global (integradas ao tema do shadcn/ui):

| Token | Valor | Uso |
|---|---|---|
| `brand-primary` | `#FB5302` | CTAs, ícones, links ativos, números, palavras de destaque |
| `brand-primary-hover` | `#E64B02` | hover do primário |
| `brand-primary-active` | `#CC4200` | active do primário |
| `brand-primary-soft` | `#FFF0E8` | formas orgânicas, superfícies de destaque, badges |
| `brand-primary-soft-hover` | `#FFE4D6` | hover de superfícies suaves |
| `brand-secondary` | `#000000` | contraste elevado, com moderação |
| `text-primary` | `#322D2D` | textos principais (grafite) |
| `text-secondary` | `#68615F` | textos de apoio |
| `text-muted` | `#8A8380` | textos discretos |
| `text-inverse` | `#FFFFFF` | texto sobre fundos escuros/laranja |
| `surface-page` | `#FFFFFF` | fundo predominante |
| `surface-subtle` | `#FAF9F8` | seções alternadas, hovers |
| `surface-dark` | `#000000` | áreas escuras pontuais |
| `border-default` | `#E7E1DE` | bordas padrão |
| `border-strong` | `#D4CDCA` | bordas de inputs e botões secundários |
| `success` / `success-soft` | `#23855A` / `#EAF7F0` | semântico |
| `warning` / `warning-soft` | `#B86B00` / `#FFF5E3` | semântico |
| `error` / `error-soft` | `#C9362B` / `#FDECEA` | semântico |

**Regras:** branco como fundo predominante; laranja com parcimônia (nunca várias seções consecutivas com fundo laranja); grafite nos textos; contraste mínimo WCAG AA.

## Tipografia (Roboto)

| Estilo | Tamanho/Altura | Peso | Extra |
|---|---|---|---|
| Display desktop | 64/68px | 800 | tracking -0.03em |
| Display tablet | 48/54px | 800 | tracking -0.025em |
| Display mobile | 38/44px | 800 | tracking -0.02em |
| H1 | 48/56px | 700 | |
| H2 | 36/44px | 700 | |
| H3 | 24/32px | 700 | |
| Body large | 18/28px | 400 | |
| Body | 16/24px | 400 | |
| Body small | 14/20px | 400 | |
| Label | 14/20px | 600 | |

**Regras:** apenas um `h1` por página; títulos curtos (máx. ~3 linhas); destacar somente palavras estratégicas em laranja; peso 700–800 em títulos, 400 em texto corrido; evitar parágrafos longos centralizados.

## Layout e geometria

- **Container:** max-width 1200px, centralizado; padding lateral 32px (desktop) / 24px (tablet) / 20px (mobile).
- **Grid:** 12 col gap 24px (desktop) / 8 col gap 20px (tablet) / 4 col gap 16px (mobile).
- **Espaçamento entre seções:** 112px desktop / 88px tablet / 64px mobile. Escala geral em múltiplos de 8px.
- **Alinhamento:** conteúdo principal à esquerda; centralizado apenas em introduções curtas de seção; sem alturas fixas; sem rolagem horizontal jamais.
- **Raios:** botão/input 8px · card 12px · card grande/imagem 16px · pill 999px.
- **Sombras:** card `0 4px 16px rgba(50,45,45,0.06)` · flutuante `0 12px 32px rgba(50,45,45,0.10)` · header `0 1px 0 rgba(50,45,45,0.08)`.
- **Breakpoints:** mobile < 768px · tablet 768–1199px · desktop ≥ 1200px. Larguras de teste: 390, 768, 1024, 1440px.

## Especificações de componentes-chave

- **Botão primário:** 44px de altura, padding-x 20px, fundo `#FB5302`, texto branco, peso 600, raio 8px; hover `#E64B02`, active `#CC4200`, focus ring `0 0 0 3px rgba(251,83,2,0.25)`.
- **Botão secundário:** 44px, fundo branco, texto `#322D2D`, borda `#D4CDCA`, raio 8px, hover `#FAF9F8`.
- **Card:** fundo branco, borda `#E7E1DE`, raio 12px, padding 24px, sombra suave.
- **Input:** min-height 44px, borda `#D4CDCA`, raio 8px, foco com borda laranja + ring `rgba(251,83,2,0.16)`.
- **Badge:** fundo `#FFF0E8`, texto `#CC4200`, pill, peso 600.
- **Estados obrigatórios:** default, hover, active, focus-visible, disabled, loading quando aplicável.
- **Motion:** 150ms (rápido) / 240ms (padrão), ease-out; hover de cards desloca no máx. 2px; sem animações automáticas contínuas; respeitar `prefers-reduced-motion`.

## Estrutura do projeto

```
app/
  layout.tsx                      # Roboto, metadata, lang pt-BR
  page.tsx                        # landing page (composição das seções)
  globals.css                     # tokens semânticos CSS
  (auth)/                         # login, cadastro + actions de auth
  auth/callback|confirm/route.ts  # OAuth/PKCE e confirmação de e-mail
  (app)/onboarding/               # uploads de currículo e LinkedIn
  (app)/dashboard/                # dashboard, nova-analise, relatorios/[id], actions
proxy.ts                          # sessão Supabase + proteção de rotas
components/
  layout/    # site-header, site-footer (landing)
  landing/   # hero, trust-bar, how-it-works, features, results, final-cta
  app/       # app-header (área logada)
  auth/      # login-form, signup-form, google-button, form-alert
  onboarding/, dashboard/, reports/  # módulos da área logada
  shared/    # section-heading, product-preview, organic-shape, wordmark
  ui/        # componentes shadcn/ui adaptados
lib/
  supabase/  # client, server, proxy (updateSession)
  ai/generate-report.ts  # Claude API: PDFs + structured outputs
  events.ts  # métricas de produto  ·  types.ts  # tipos das tabelas/relatórios
data/
  landing-page.ts   # TODO o conteúdo textual da landing, centralizado e tipado
supabase/migrations/  # schema SQL versionado
```

### Convenções da área logada

- Mutações via Server Actions com a **sessão do usuário** (RLS aplica as regras); a chave secreta não é necessária no MVP (migration 0002).
- Geração de relatório é síncrona na action (`claude-opus-4-8`, adaptive thinking, PDFs como document blocks, structured outputs via `output_config.format`). Análises com falha não consomem créditos.
- Eventos de produto: registrar via `logEvent` (landing_cta_click, signup_completed, report_generated, package_mock_purchased…).

### Arquitetura de conteúdo

Todos os textos, links, métricas e funcionalidades vivem em `data/landing-page.ts` com exports tipados: `navigationItems`, `heroContent`, `trustedCompanies`, `howItWorksSteps`, `features`, `metrics`, `testimonials`, `footerGroups`. Nunca hardcodar conteúdo dentro dos componentes de seção. As métricas da seção Resultados são **conteúdo demonstrativo** até haver dados reais.

## Seções da landing page (ordem)

1. **Header** — sticky, fundo branco, borda inferior sutil; logo à esquerda, navegação (Soluções `#solucoes`, Como funciona `#como-funciona`, Resultados `#resultados`, Para empresas `#empresas`), CTA à direita; `Sheet` no mobile; âncoras com scroll suave.
2. **Hero** (`HeroSection`) — 2 colunas desktop / 1 mobile (texto antes da imagem). Eyebrow "Seu próximo passo profissional começa aqui"; título "Evolua. / Reposicione-se. / Conquiste." com "Conquiste." em laranja; foto profissional com forma orgânica laranja-suave atrás; preview discreto do produto (aderência ao cargo, percentual, progress bar, recomendação); microcopy "Comece gratuitamente. Sem cartão de crédito." Não sobrecarregar com cards flutuantes.
3. **TrustBar** — faixa leve em escala de cinza, nomes textuais como placeholder de logos, baixo contraste.
4. **HowItWorksSection** (`#como-funciona`) — 4 passos (FileUser, Target, SearchCheck, Trophy); 4 col desktop / 2 tablet / 1 mobile.
5. **FeaturesSection** (`#solucoes`) — `Tabs` no desktop, `Accordion` no mobile; 4 funcionalidades (recomendações currículo/LinkedIn, diagnóstico de aderência, tradução contextual com exemplo antes/depois, plano de evolução); cada uma com texto + preview visual que pareça interface real; conteúdo acessível sem JavaScript.
6. **ResultsSection** (`#resultados`) — métricas à esquerda (4x, 70%, 85%, 2.500+) e depoimento (Mariana Alves, Product Designer, 5 estrelas) à direita no desktop; empilhado no mobile.
7. **FinalCtaSection** — fundo laranja suave, forma orgânica discreta; conteúdo à esquerda e CTA "Começar agora gratuitamente" à direita no desktop; botão full-width no mobile.
8. **Footer** — descrição da marca + grupos Produto, Recursos, Institucional, Legal + redes (LinkedIn, Instagram, YouTube).

## Imagens e marca

- Priorizar assets do repositório; **nunca** depender de URLs externas instáveis.
- Usar `next/image` com `width`, `height`, `sizes` e `alt` adequados.
- Sem assets disponíveis: criar placeholders elegantes e facilmente substituíveis.
- Não usar logos de empresas reais como prova social sem arquivos autorizados.
- Usar os arquivos oficiais do logo quando existirem; não redesenhar nem distorcer.
- Estilo fotográfico: editorial, profissionais brasileiros (25–50 anos), diversidade, luz suave, fundos claros.

## Acessibilidade (WCAG AA)

- HTML semântico: `header`, `nav`, `main`, `section` (com `aria-labelledby`), `footer`.
- Um único `h1`; hierarquia de headings respeitada.
- `alt` descritivo em imagens relevantes; `alt=""` em decorativas.
- Navegação completa por teclado; foco claramente visível; área mínima de toque 44px.
- `aria-label` em botões só com ícone; status nunca comunicado apenas por cor.
- Respeitar `prefers-reduced-motion`.

## SEO

- `lang="pt-BR"`; title: "CareerTwin | Evolua, reposicione-se e conquiste".
- Description: "Use inteligência artificial para melhorar seu currículo e LinkedIn, analisar sua aderência a vagas e construir um plano prático de evolução profissional."
- Open Graph básico + Twitter Card + favicon. Não inventar domínio nem URLs de produção; canonical só quando o domínio existir.

## Performance

Minimizar JS no cliente; sem dependências desnecessárias; imagens otimizadas; sem layout shift; ícones importados individualmente; fonte com carregamento otimizado; sem vídeo automático no hero.

## Critérios de aceitação (checklist antes de concluir)

- [ ] Visual coerente com a referência e identidade CareerTwin reconhecível
- [ ] Roboto global; shadcn/ui adaptado (sem aparência genérica)
- [ ] Funciona em desktop, tablet e mobile; menu mobile funcional e acessível
- [ ] CTAs com todos os estados; componentes reutilizáveis; conteúdo em pt-BR
- [ ] Sem rolagem horizontal; sem erros de TypeScript ou lint; build passa
- [ ] WCAG AA nos elementos principais; laranja usado de forma controlada
