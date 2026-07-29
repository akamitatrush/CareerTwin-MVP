# Roadmap de Implementação — CareerTwin AI

> Lista priorizada do que **falta implementar**, separando **código** (a equipe faz no repo) de **painel/config** (feito no Supabase/Vercel/Google) e de **jurídico/processo**. Marque `[x]` conforme concluir.
>
> **Legenda:** 🧑‍💻 Código · ⚙️ Painel/Config · ⚖️ Jurídico/Processo
>
> Contexto de segurança/privacidade em [`SEGURANCA-E-LGPD.md`](./SEGURANCA-E-LGPD.md). Metodologia em [`CONTEXTO-DE-TRABALHO.md`](./CONTEXTO-DE-TRABALHO.md).

---

## 🔴 P0 — Destravar o MVP (funcionar de ponta a ponta)

O código já está pronto e no ar. O que bloqueia hoje é **configuração de painel**.

- [ ] ⚙️ Desligar **"Confirm email"** — Supabase → Auth → Providers → Email _(senão o cadastro trava no rate limit de e-mail)_
- [ ] ⚙️ **Site URL + Redirect URLs** de produção — Supabase → Auth → URL Configuration (`https://career-twin-mvp.vercel.app` e `.../**`)
- [ ] ⚙️ Habilitar **Google OAuth** (opcional) — Google Cloud (credenciais) + Supabase → Providers → Google

> ➡️ **Este bloco é o mais importante e não depende de código.** Sem ele, o fluxo de cadastro não funciona.

---

## 🟠 P1 — Antes de qualquer usuário real (LGPD mínima)

Tudo aqui é **código**, versionado e com deploy automático.

- [x] 🧑‍💻 **Excluir minha conta e meus dados** (direito ao esquecimento) — página `/dashboard/conta`, `deleteAccountAction` (apaga Storage + cascade) e função `delete_own_account()`. ⚙️ **Requer aplicar a migration 0003 no Supabase.**
- [ ] 🧑‍💻 **Página de Política de Privacidade + Termos de Uso** (conteúdo real; hoje os links no rodapé são placeholders `#`)
- [ ] 🧑‍💻 **Consentimento explícito** no cadastro e no upload, informando o envio dos documentos à **Anthropic (EUA)**
- [ ] 🧑‍💻 **CPF**: remover ou reforçar como opcional (minimização — LGPD art. 6º)

---

## 🟡 P2 — Antes de operar comercialmente

- [ ] 🧑‍💻 **Retenção + expurgo automático** dos documentos (job periódico) + eliminação ao encerrar conta
- [ ] 🧑‍💻 **Exportar meus dados** (portabilidade, formato legível)
- [ ] 🧑‍💻 **Headers de segurança** (CSP, HSTS, X-Frame-Options)
- [ ] 🧑‍💻 **Rate limiting** aplicacional (proteção de custo de IA e abuso)
- [ ] ⚖️ **DPA (Data Processing Agreement)** com a Anthropic + registro de transferência internacional (ROPA)
- [ ] ⚖️ Definir **Controlador/Operador** e, se aplicável, **encarregado (DPO)**

---

## ⚪ P3 — Robustez e maturidade

- [ ] 🧑‍💻 **Testes automatizados** (unit + e2e) — maior débito técnico atual; rede de segurança para evoluir
- [ ] 🧑‍💻 **Gateway de pagamento real** (hoje é mock — decisão de produto, pós-validação)
- [ ] 🧑‍💻 **Trilha de auditoria** de acesso a dados pessoais
- [ ] 🧑‍💻 **MFA/2FA** para contas
- [ ] 🧑‍💻 **Saneamento anti-prompt-injection** do texto extraído antes de ir ao modelo
- [ ] ⚖️ Plano de resposta a incidentes / notificação à ANPD

---

## Sequência recomendada

1. **Você (⚙️):** fazer os toggles do **P0** agora — destrava o produto para testes reais.
2. **Equipe (🧑‍💻), em paralelo:** iniciar o **P1** na ordem: exclusão de conta → Política/Termos → consentimento → CPF.
3. Seguir para **P2** quando decidir operar comercialmente.

> **Nota:** este roadmap cobre a postura técnica. A adequação final à LGPD deve ser validada por profissional de Direito/Privacidade.
