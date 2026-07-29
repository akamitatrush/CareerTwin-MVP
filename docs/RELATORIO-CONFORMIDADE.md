# Relatório de Conformidade e Privacidade — CareerTwin AI

> Documento de prestação de contas para a gestão do projeto (GP). Resume **o que foi entregue** em privacidade/LGPD e segurança, **por que**, e o **status atual**. Complementa o [`SEGURANCA-E-LGPD.md`](./SEGURANCA-E-LGPD.md) (técnico-jurídico detalhado) e o [`ROADMAP-IMPLEMENTACAO.md`](./ROADMAP-IMPLEMENTACAO.md) (pendências).

**Data:** 22 de julho de 2026 · **Fase do produto:** MVP (validação) · **Responsável técnico:** equipe CareerTwin

---

## 1. Contexto e objetivo

O CareerTwin AI trata dados pessoais sensíveis ao propósito (currículo, LinkedIn, CPF opcional). No escopo original do MVP, a adequação à LGPD foi registrada como **débito técnico**. Este ciclo iniciou a **quitação desse débito**, priorizando os itens de maior risco e maior valor de confiança para o usuário, sem bloquear a validação do produto.

**Objetivo desta entrega:** dar ao usuário transparência e controle sobre seus dados, e formalizar as regras de uso — requisitos mínimos de responsabilidade antes de expor o produto a usuários reais.

---

## 2. O que foi entregue neste ciclo

| Entrega | Descrição | Onde |
|---|---|---|
| **Exclusão de conta e dados** | O usuário apaga permanentemente perfil, documentos (Storage) e relatórios, em fluxo com confirmação. | `/dashboard/conta` |
| **Política de Privacidade** | Documento real: dados coletados, finalidade, base legal, uso de IA, transferência internacional, direitos e contato. | `/privacidade` |
| **Termos de Uso** | Natureza consultiva da IA (sem promessa de contratação), planos, pagamento mock, uso aceitável e responsabilidades. | `/termos` |
| **Links legais ativos** | Rodapé passou a apontar para as páginas reais (antes eram placeholders). | Rodapé do site |

---

## 3. Mapeamento LGPD — o que cada entrega atende

| Requisito LGPD | Como foi atendido | Status |
|---|---|---|
| **Direito à eliminação** (art. 18, VI) | Exclusão total de conta e dados na plataforma | ✅ Em produção |
| **Transparência** (art. 6º, VI; art. 9º) | Política de Privacidade informando tratamento e finalidades | ✅ Publicada |
| **Informação sobre compartilhamento** (art. 18, VII) | Aviso explícito do processamento pela Anthropic (EUA) | ✅ Na Política |
| **Transferência internacional** (art. 33) | Declarada e baseada em consentimento no uso | ⚠️ Declarada; DPA formal pendente |
| **Direitos do titular** (art. 18) | Acesso, correção e eliminação; portabilidade sinalizada | ⚠️ Parcial |
| **Segurança** (art. 46) | RLS por usuário, Storage privado, HTTPS, segredos no servidor | ✅ Implementado |

---

## 4. Base de segurança já existente (contexto)

Estas proteções sustentam a conformidade e já estavam implementadas:

- **Isolamento por usuário no banco (RLS)** — cada pessoa acessa apenas os próprios dados; a proteção é aplicada no banco, não só na interface.
- **Armazenamento privado de arquivos** — currículos/PDFs isolados por usuário.
- **Renderização no servidor** — dados sensíveis não são expostos como consultas no navegador.
- **Segredos server-only** — chaves de IA e de serviço nunca chegam ao cliente.

Detalhamento técnico e diagramas em [`SEGURANCA-E-LGPD.md`](./SEGURANCA-E-LGPD.md).

---

## 5. O que ainda falta (transparência de pendências)

**Antes de usuários reais (curto prazo):**
- Banner/checkbox de **consentimento** no cadastro e no upload (vinculando à Política).
- Tornar **CPF** removido/opcional de fato (minimização).

**Antes de operar comercialmente:**
- **Retenção com expurgo automático** e **exportação de dados** (portabilidade).
- **DPA (contrato de operador)** com a Anthropic e registro de operações (ROPA).
- **Headers de segurança** e **rate limiting**.

Lista completa e priorizada em [`ROADMAP-IMPLEMENTACAO.md`](./ROADMAP-IMPLEMENTACAO.md).

---

## 6. Justificativa de valor (para a gestão)

- **Reduz risco legal e reputacional:** o produto deixa de expor usuários sem qualquer aviso ou controle, endereçando os pontos de maior risco (exclusão, transparência, transferência internacional).
- **Aumenta a confiança e a conversão:** transparência e controle são fatores de decisão para o público-alvo (profissionais entregando dados de carreira).
- **Não bloqueia a validação:** as entregas são incrementais e já estão em produção, mantendo o cronograma do MVP.
- **Base auditável:** todo o tratamento está documentado e versionado, facilitando uma futura revisão jurídica.

---

## 7. Recomendação

Prosseguir com o **consentimento explícito** e a **minimização do CPF** antes de abrir para usuários reais, e agendar **revisão jurídica** do texto das políticas antes de qualquer operação comercial.

> **Ressalva:** este relatório descreve a postura técnica e o mapeamento de conformidade; **não substitui parecer jurídico**. A adequação final à LGPD deve ser validada por profissional de Direito/Privacidade.
