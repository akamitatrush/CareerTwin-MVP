# Contexto de Trabalho & Metodologia — CareerTwin AI

> **Para o Claude Code:** leia este arquivo ao entrar no projeto. Ele registra **como trabalhamos**, **as decisões já tomadas (e o porquê)** e **onde paramos**. Combine com o [`CLAUDE.md`](../CLAUDE.md) (diretrizes técnicas/design), o [`README.md`](../README.md) (visão geral) e o [`ONBOARDING.md`](./ONBOARDING.md) (setup). Este documento é a "memória" da nossa jornada de construção.

---

## 1. Como trabalhamos (metodologia)

Princípios que seguimos ao longo de todo o projeto — mantenha-os:

- **Execução por módulos, validando cada etapa.** Construímos na ordem de dependência: fundação (dados/auth) → landing → autenticação → onboarding → dashboard → relatórios com IA. Cada módulo é finalizado e validado antes do próximo.
- **Checks obrigatórios antes de concluir qualquer tarefa:** `npm run lint`, `npm run typecheck` e `npm run build` devem passar **sem erros**. Nunca considere uma tarefa pronta com algum deles quebrado.
- **Commit + push a cada marco.** Commits pequenos, mensagens em **português**, no formato `tipo(escopo): descrição` (ex.: `feat`, `fix`, `docs`, `perf`). Push em `main` dispara **deploy automático na Vercel**.
- **Segurança em primeiro lugar.** Segredos (`.env.local`, chaves) **nunca** vão para o Git. Só o `.env.example` (template sem valores) é versionado. Antes de commitar, conferimos que nenhum `.env` real ou artefato de build entrou.
- **Solução menos destrutiva.** Não alteramos arquivos fora do escopo da tarefa; reutilizamos o que já existe; preservamos o package manager (npm) e os padrões do projeto.
- **Decisões documentadas.** Quando algo não está especificado, adotamos um default sensato, seguimos e explicamos a decisão (é o que este arquivo faz).
- **Confirmar antes de ações irreversíveis/externas.** Deploy, mudanças em painel (Supabase/Vercel/Google) e qualquer coisa "para fora" são sinalizadas ao usuário; o que depende de credencial/painel fica como passo manual dele.
- **Idioma:** todo o produto e a comunicação são em **português brasileiro**.

---

## 2. Decisões técnicas (e o porquê)

| Decisão | Por quê |
|---|---|
| **Supabase** (Postgres + Auth + Storage) | Resolve dados, autenticação (e-mail/senha + Google) e upload de PDFs numa só fundação, com RLS. |
| **Regras de negócio no banco** | Créditos gratuitos, pacotes e isolamento por usuário são aplicados via funções + triggers + RLS no Postgres — não só no cliente, evitando burlas. |
| **`claude-opus-4-8` com structured outputs** | PDFs entram como *document blocks*; a saída em JSON Schema garante relatórios sempre válidos e renderizáveis. |
| **Geração de relatório em background (`after()`)** | A action redireciona na hora para a página do relatório (que tem auto-refresh) e a IA processa em segundo plano — não trava o usuário. |
| **`effort: "low"` na Claude API** | Reduz muito a latência mantendo boa qualidade em extração/análise estruturada. |
| **`maxDuration = 300`** na rota de geração | Impede que o processamento em background seja cortado pela plataforma em produção. |
| **`vercel.json` com `framework: nextjs`** | O projeto na Vercel estava com `framework: null`, o que fazia o build Next.js não conectar as rotas (404 em tudo). Fixar o framework resolveu e deixa o problema versionado. |
| **Pagamento mock** | O MVP mede intenção de compra; o checkout insere `payment_status = 'mock_paid'` sem gateway real. |
| **Sem chave secreta no MVP** | A migration 0002 adiciona policies que permitem operar só com a *publishable key* (o servidor age com a sessão do próprio usuário via RLS). |

---

## 3. Linha do tempo do que foi construído

1. **CLAUDE.md** criado a partir do brief de design (design system "Human-Centered Editorial SaaS").
2. **Escopo** incorporado do one-pager (5 módulos, freemium, monetização, guardrails).
3. **Fundação Supabase** — clients browser/server, `.env.example`, schema inicial (tabelas, RLS, regras de crédito, Storage privado).
4. **Landing page** completa (8 seções) com conteúdo centralizado e tipado em `data/landing-page.ts`.
5. **Autenticação, onboarding, dashboard e relatórios com IA** — os 5 módulos do MVP.
6. **README** no estilo "vitrine" (banner ASCII, badges, tabelas, seções com emojis).
7. **Deploy na Vercel** + repositório no GitHub, com deploy automático a cada push.
8. **Migration 0002** aplicada (update de análise + checkout mock).
9. **Otimização de performance** dos relatórios (background + effort low + maxDuration).
10. **Guias** de onboarding e este contexto de trabalho.

---

## 4. Armadilhas que já resolvemos (não repita)

Coisas que nos custaram tempo — se aparecerem de novo, a causa já é conhecida:

- **404 em tudo na Vercel** → projeto com `framework: null`. Corrigido via `vercel.json` (`"framework": "nextjs"`).
- **Nome do diretório com maiúsculas** quebra o `create-next-app` (npm não aceita nome com maiúscula). Scaffold foi feito em pasta temporária e movido.
- **Ícones do Lucide** — nomes exatos importam (`Linkedin`/`Instagram`/`Youtube` não existiam como esperado; conferir antes de importar).
- **SQL com banners decorativos** (`-- =====`) quebra ao copiar de views que descartam o prefixo `--`. Mantemos comentários SQL simples.
- **Cadastro por e-mail com erro 429** → confirmação de e-mail ligada no Supabase dispara envio e estoura o rate limit do mailer embutido. Solução: desligar "Confirm email" no MVP.
- **Login com Google falha (400)** → provider Google não habilitado no Supabase. Requer credenciais OAuth do Google Cloud.
- **Deployment Protection** na Vercel bloqueia o site público (404/redirect SSO). Desativar em Settings → Deployment Protection.

---

## 5. Estado atual e pendências

**Funcionando:** os 5 módulos implementados; site público no ar (`career-twin-mvp.vercel.app`); banco com schema + migration 0002; `ANTHROPIC_API_KEY` configurada e validada; geração de relatório otimizada.

**Pendências (dependem de configuração de painel — passos do usuário):**
1. **Supabase Auth:** desligar "Confirm email" e configurar Site URL + Redirect URLs de produção.
2. **Login com Google:** habilitar o provider no Supabase com credenciais OAuth do Google Cloud (ver README, seção de auth).
3. **Rotacionar a `ANTHROPIC_API_KEY`** se o histórico da conversa tiver sido compartilhado (boa prática).

**Débitos técnicos conhecidos (fora do escopo do MVP):** pagamento real (hoje é mock); conformidade LGPD; testes automatizados (unit + e2e).

---

## 6. Como continuar a partir daqui

- Confirme os checks (`lint`, `typecheck`, `build`) antes e depois de mexer.
- Ao criar/alterar telas, siga os **tokens e o design system** do `CLAUDE.md` (laranja com parcimônia, WCAG AA, Roboto, componentes shadcn/ui adaptados — nunca o visual padrão).
- Textos da landing ficam **sempre** em `data/landing-page.ts`, nunca hardcoded nos componentes.
- Mudanças de schema entram como **novas migrations incrementais** em `supabase/migrations/` (não edite as existentes já aplicadas).
- Chamadas de IA sempre no **servidor** (nunca expor `ANTHROPIC_API_KEY` no cliente).
- Ao concluir um marco, **commit + push** com mensagem descritiva em português.

> Dúvida sobre o produto? `docs/CareerTwin AI — One-page …`. Dúvida técnica/design? `CLAUDE.md`. Setup? `docs/ONBOARDING.md`.
