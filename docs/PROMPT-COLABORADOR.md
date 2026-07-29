# Prompt de retomada para colaborador (Claude Code)

Este documento tem duas partes:

1. **O que o dono do projeto libera antes** (acessos — só o Sérgio consegue fazer).
2. **O PROMPT** que o colaborador cola no Claude Code dele — o Claude executa o setup e passa a trabalhar igual à equipe, **sem nenhuma chave escrita no prompt** (os segredos vêm da Vercel via `vercel env pull`).

---

## Parte 1 — Acessos a liberar antes (feito pelo dono do projeto)

O Claude não consegue conceder acessos; estes passos são manuais e feitos uma vez:

1. **GitHub** — adicionar o colaborador ao repositório
   `github.com/akamitatrush/CareerTwin-MVP` → **Settings → Collaborators → Add people**.
   (O colaborador usa a conta **própria** dele no GitHub — não se compartilha credencial de Git.)
2. **Vercel** — adicionar o colaborador à equipe `log-null-sec`
   Vercel → **Team → Members → Invite**.
   Isso dá a ele acesso ao projeto `career-twin-mvp`, às variáveis de ambiente e ao deploy — ou seja, ele deploya "com os seus acessos" pela equipe, **sem** você repassar chaves.
3. Avisar o colaborador para ter instalados: **Node ≥ 20**, **git**, **Vercel CLI** (`npm i -g vercel`) e o **Claude Code**.

> Modelo de segurança: **Git é com a conta do próprio colaborador** (colaborador do repo). **Vercel, env e deploy fluem pela equipe** — os segredos (Supabase, Anthropic) são baixados da Vercel com `vercel env pull`, nunca colados manualmente.

---

## Parte 2 — PROMPT para o colaborador colar no Claude Code

> Copie tudo dentro do bloco abaixo e cole no Claude Code, já dentro da pasta do projeto (ou peça ao Claude para clonar no passo 1).

```
Você é meu parceiro de engenharia no projeto CareerTwin AI (mentor de carreira com IA).
Vou trabalhar exatamente como a equipe já vem trabalhando. Siga os passos abaixo em ordem,
reportando cada etapa, e pare e me avise se algo falhar por permissão ou faltar credencial.

## 0. Leia o contexto primeiro
Leia nesta ordem e siga as diretrizes:
1. CLAUDE.md (raiz)
2. docs/CONTEXTO-DE-TRABALHO.md  (metodologia, decisões e o porquê, armadilhas, pendências)
3. docs/ONBOARDING.md            (setup)
4. README.md                     (visão geral e arquitetura)
Depois, confirme em 3-5 linhas o que entendeu do produto, da stack e da metodologia
antes de qualquer ação.

## 1. Repositório
Se você ainda não está numa cópia do projeto, clone e entre na pasta:
  git clone https://github.com/akamitatrush/CareerTwin-MVP.git
  cd CareerTwin-MVP
Se já está na pasta do projeto, siga.

## 2. Pré-requisitos
Verifique Node >= 20, git e a Vercel CLI (npm i -g vercel). Se faltar algo, me avise.

## 3. Setup do ambiente (rode os comandos)
- npm install
- vercel login            (vou autenticar com minha conta; me avise se abrir o navegador)
- vercel link             (selecione a equipe "log-null-sec" e o projeto "career-twin-mvp")
- vercel env pull .env.local --environment=development
  (isso baixa as chaves de Supabase e Anthropic da Vercel para o .env.local.
   NUNCA me peça para colar chaves manualmente — elas vêm da Vercel.)
- npm run dev             (confirme que sobe em http://localhost:3000)

## 4. Como trabalhamos (siga sempre)
- Antes de concluir QUALQUER tarefa: npm run lint, npm run typecheck e npm run build
  devem passar sem erros.
- Commits pequenos, mensagem em português no formato tipo(escopo): descrição
  (feat, fix, docs, perf...). Eu uso a minha própria conta de Git (sou colaborador do repo).
- git push na branch main dispara DEPLOY AUTOMÁTICO na Vercel.
  Para deploy manual de produção: vercel deploy --prod.
- Segredos NUNCA vão para o Git (só .env.example). Não altere arquivos fora do escopo
  da tarefa. Prefira sempre a solução menos destrutiva.
- Confirme comigo antes de ações irreversíveis/externas (deploy de produção,
  mudanças em painel do Supabase/Vercel/Google).
- Todo o produto e a comunicação são em português brasileiro.

## 5. Estado atual e próximo passo
Leia a seção "Estado atual e pendências" do docs/CONTEXTO-DE-TRABALHO.md, me diga em
tópicos o que já está pronto e o que falta, e pergunte por onde eu quero começar.

Comece agora pelo passo 0 (ler o contexto) e siga até o passo 3 (setup), reportando cada etapa.
```

---

## Observações

- **Nenhum segredo aparece no prompt.** As chaves chegam ao `.env.local` do colaborador via `vercel env pull`, que só funciona porque ele é membro da equipe na Vercel.
- Se o colaborador **não** puder ser adicionado à equipe Vercel, a alternativa é o dono enviar as chaves por um **canal seguro** (gerenciador de senhas), e o colaborador preencher o `.env.local` a partir do `.env.example`. Menos elegante, mas funciona.
- O deploy que o colaborador fizer usa o **projeto da equipe** (mesmas variáveis, mesmo domínio) — portanto, na prática, "com os seus acessos".
