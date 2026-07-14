# CareerTwin AI — One-page

Proprietário: Cicero Janiel

# CareerTwin AI — Mentor de carreira com IA para recolocação profissional

**Grupo:** [nomes dos integrantes]

> **Nota de atualização (09/07/2026):** esta é a v2 do One-Pager, atualizada com decisões confirmadas por Jamar durante a estruturação dos PRDs de implementação. Mudanças em relação à v1 estão marcadas com ⟶ **[ATUALIZADO]**.

---

## 1. Problema e Contexto

Profissionais brasileiros em recolocação, transição de carreira ou busca por melhores oportunidades enfrentam um mercado de trabalho mais competitivo, digitalizado, automatizado e menos transparente.

A pesquisa de desk research indica que a dificuldade de recolocação não está apenas na falta de vagas ou na qualidade do currículo. O problema é mais amplo e envolve cinco fricções principais:

- maior exigência por competências específicas
- descrições de vagas extensas e pouco claras
- triagens automatizadas e critérios pouco visíveis
- dificuldade de adaptar currículo e LinkedIn para cada oportunidade
- desgaste emocional causado por rejeições, silêncio das empresas e ausência de feedback

Embora o mercado brasileiro apresente sinais macroeconômicos positivos, a dor individual de recolocação permanece relevante. A pesquisa cita a **PNAD Contínua/IBGE**, com taxa de desocupação de **5,8%** no trimestre encerrado em abril de 2026, e o **Novo Caged**, com geração de **85,8 mil** empregos formais em abril e saldo positivo próximo de **700 mil vagas** no acumulado do ano. Mesmo nesse cenário, profissionais em transição, pessoas buscando vagas qualificadas e trabalhadores de áreas impactadas por automação continuam enfrentando alta competição, desalinhamento de competências e baixa previsibilidade no processo seletivo.

O contexto global reforça essa oportunidade. Relatórios analisados na pesquisa, como *World Economic Forum — Future of Jobs 2025*, *LinkedIn Work Change Report*, *OECD Employment Outlook 2025* e *ILO World Employment and Social Outlook 2025*, apontam para mudanças aceleradas nas ocupações, crescimento da lógica de contratação baseada em habilidades e impacto crescente da IA nos processos de trabalho e recrutamento.

Na prática, o candidato muitas vezes não sabe se o problema está no currículo, na experiência, na falta de competências, na forma de se comunicar, no canal de candidatura ou simplesmente na baixa aderência à vaga. Essa falta de diagnóstico gera tentativa e erro, candidaturas em massa e perda de confiança.

A pesquisa de benchmarking analisou **26 soluções** nacionais e internacionais relacionadas a vagas, currículos, LinkedIn, ATS, aprendizagem, mentorias e IA. O principal insight é que o mercado ainda é fragmentado: plataformas de vagas ajudam no acesso a oportunidades, ferramentas de currículo melhoram a forma do documento, plataformas de cursos desenvolvem competências e redes profissionais ampliam visibilidade. Porém, poucas soluções conectam tudo em uma jornada integrada de reposicionamento profissional.

A oportunidade estratégica do CareerTwin AI está justamente nessa lacuna: criar um mentor de carreira com IA que ajude o profissional a entender sua aderência às vagas, melhorar currículo e LinkedIn, traduzir experiências reais em uma narrativa mais competitiva, identificar lacunas de competências e receber recomendações práticas de evolução.

O problema central, portanto, não é apenas "ter um currículo melhor". É ajudar o usuário a responder quatro perguntas críticas:

1. Para quais vagas eu realmente tenho aderência?
2. Como devo me posicionar profissionalmente?
3. O que preciso ajustar no currículo e LinkedIn?
4. Quais lacunas realmente importam para evoluir?

**Fonte dos achados:** [Relatório de Benchmarking](https://app.notion.com/p/Relat-rio-de-Benchmarking-382c32d94bbf80dc91f9e65fb85848fd?pvs=21) · [Relatório de desk research](https://app.notion.com/p/Relat-rio-de-desk-research-382c32d94bbf80aeb391f0038c9d69ae?pvs=21)

---

## 2. Solução Proposta com IA

O CareerTwin AI é um aplicativo web que atua como um mentor de carreira com IA para profissionais brasileiros de tecnologia, negócios e marketing.

O produto ajuda o usuário a:

- analisar currículo e LinkedIn
- identificar pontos fortes e pontos de melhoria
- avaliar aderência entre perfil e vagas específicas
- gerar sugestões de melhoria para currículo e LinkedIn
- traduzir experiências reais em uma narrativa profissional mais competitiva
- receber um plano prático de evolução profissional

### Papel da IA na solução

A IA é aplicada para:

- **Análise de documentos:** leitura e interpretação de currículo e PDF do LinkedIn
- **Classificação:** avaliação do nível de aderência entre perfil e vaga
- **Geração de recomendações:** sugestões de melhoria para currículo, LinkedIn e posicionamento
- **Personalização:** recomendações baseadas no perfil, cargo-alvo, senioridade e vaga analisada
- **Síntese:** criação de relatórios objetivos com diagnóstico, score e plano de ação

### Modelo / ferramenta utilizada ⟶ **[ATUALIZADO]**

O MVP utiliza **Claude API (Anthropic)** como modelo de IA generativa para extração de dados, análise de perfil e cálculo de aderência à vaga. Toda a construção técnica do MVP é realizada com **Claude Code**.

*(Decisão anterior, em aberto na v1: avaliação entre GPT-4/GPT-4o, Gemini ou equivalente — resolvida em 09/07/2026.)*

---

## 3. MVP Desenvolvido

O MVP do CareerTwin AI será um aplicativo web B2C, **responsivo e mobile-first**, com uma jornada simples de cadastro, onboarding, geração de relatórios e monetização por pacote de acesso (pagamento simulado nesta fase).

### Estrutura do MVP

O produto contempla:

1. **Landing page**
    - apresentação institucional
    - explicação da proposta de valor
    - exemplo de relatório
    - chamada para começar análise grátis
2. **Login e cadastro** ⟶ **[ATUALIZADO]**
    - cadastro com CPF ou e-mail e senha
    - login com Google
    - ~~login com LinkedIn~~ *(removido do MVP — LinkedIn permanece apenas como fonte de dado via upload de PDF, não como método de autenticação)*
3. **Onboarding** ⟶ **[ATUALIZADO]**
    - upload do currículo
    - upload do PDF do LinkedIn
    - ~~coleta de dados complementares de carreira~~ *(removido do MVP — o produto trabalha apenas com o dado extraído de currículo e LinkedIn)*
4. **Dashboard**
    - perfil do usuário
    - histórico de relatórios
    - controle de análises gratuitas
    - acesso a novas análises
5. **Relatórios com IA**
    - Análise de Perfil: diagnóstico do currículo, LinkedIn e posicionamento profissional
    - Aderência à Vaga: análise de match entre perfil e vaga específica, com score de 0 a 100

### Modelo gratuito e monetização ⟶ **[ATUALIZADO]**

O usuário recebe inicialmente:

- **3 análises gratuitas por conta**, compartilhadas entre Análise de Perfil e Aderência à Vaga (não mais 3 + 3 separadas)

Após o uso gratuito, novas análises custam:

**R$ 30 por 7 dias de análises verdadeiramente ilimitadas** (sem limite técnico de uso dentro do período).

Não haverá assinatura mensal no MVP.

No MVP, o pagamento do pacote é **simulado (mock)** — não há integração real com gateway financeiro nesta fase. O objetivo é validar a intenção de compra, não processar receita real.

### Tratamento de dados ⟶ **[NOVO]**

Retenção formal de dados e conformidade LGPD **não serão tratadas nesta fase do MVP**. Este ponto é um débito técnico explícito a ser endereçado antes de qualquer lançamento comercial real (ver Riscos, item 5).

### Links relevantes

- Protótipo: \[inserir link\]
- Repositório: \[inserir link\]
- Demonstração / automação: \[inserir link\]
- Relatório exemplo: \[inserir link\]

---

## 4. Métricas e Resultados Esperados

O sucesso da solução será medido por métricas de ativação, uso, valor percebido, conversão paga e desempenho da IA.

### Impacto de negócio

Principais métricas:

- taxa de conversão da landing page para cadastro
- taxa de conclusão do onboarding
- percentual de usuários que fazem upload de currículo e LinkedIn
- percentual de usuários que geram pelo menos um relatório
- número médio de relatórios gerados por usuário
- percentual de usuários que usam todas as análises gratuitas
- conversão de usuário gratuito para pagante
- receita gerada por pacotes de acesso (simulada no MVP)
- recompra de pacote após o primeiro pagamento

> Metas numéricas por métrica: ver propostas (conservadora vs. agressiva) em `CareerTwin_AI_Estrutura_PRDs_MVP.md`, Página 1.
> 

### Desempenho da IA

Métricas de qualidade e operação:

- tempo médio para geração de relatório
- custo médio de IA por relatório
- taxa de erro na leitura de documentos
- taxa de reprocessamento de relatórios
- clareza percebida das recomendações
- utilidade percebida do score de aderência
- satisfação do usuário com as sugestões de currículo e LinkedIn

### Resultado esperado

Validar se usuários percebem valor suficiente nos relatórios gratuitos para continuar usando a plataforma e pagar por novos pacotes de acesso.

---

## 5. Aprendizados e Próximos Passos

### Aprendizados até aqui

O discovery indicou que profissionais em recolocação não precisam apenas de um gerador de currículo. Eles precisam de clareza sobre posicionamento, aderência às vagas e próximos passos de evolução.

Também foi identificado que a IA pode gerar valor quando atua de forma consultiva, estruturando informações profissionais, explicando lacunas e sugerindo melhorias práticas sem inventar experiências.

Outro aprendizado importante é que o produto deve evitar promessas de contratação. A proposta central deve ser melhorar clareza, posicionamento e competitividade profissional.

### Principais desafios

- Diferenciar o CareerTwin AI de um uso genérico do ChatGPT
- garantir qualidade na extração de dados de currículos e PDFs do LinkedIn
- criar relatórios claros, úteis e acionáveis
- manter baixo o custo por análise (atenção redobrada: pacote de 7 dias é ilimitado, sem rate limit técnico)
- tratar privacidade e LGPD de forma adequada — **fora de escopo do MVP, mas obrigatório antes de lançamento comercial real**
- validar disposição de pagamento por pacote de acesso (validação parcial no MVP, já que o pagamento é mockado — mede intenção de clique, não fricção real de checkout)

### Próximos passos

1. Finalizar o escopo funcional do MVP.
2. ~~Definir o modelo de IA a ser utilizado~~ — **concluído: Claude API, construção via Claude Code.**
3. Criar o protótipo navegável da landing, onboarding e dashboard.
4. Estruturar o layout dos relatórios.
5. Criar exemplos fictícios de Análise de Perfil e Aderência à Vaga.
6. Implementar fluxo de upload e análise de documentos.
7. Testar o MVP com usuários reais.
8. Medir ativação, qualidade percebida e conversão para análise paga (mockada).
9. Ajustar o produto com base nos feedbacks.
10. Avaliar evolução futura para pacotes, assinatura, gateway de pagamento real, LGPD formal ou modelo B2B.

---

## Resumo Executivo ⟶ **[ATUALIZADO]**

O CareerTwin AI é uma solução de IA aplicada à recolocação e transição de carreira. O produto analisa currículo, LinkedIn e vagas específicas para entregar relatórios personalizados com diagnóstico, score de aderência e recomendações práticas.

O MVP será construído com Claude API e Claude Code, e validado com uma experiência gratuita inicial de **3 relatórios por conta** (compartilhados entre Análise de Perfil e Aderência à Vaga) e monetização por pacote de acesso de R$ 30 para 7 dias de análises ilimitadas — pagamento **simulado** nesta fase. A hipótese central é que profissionais que percebem valor nos diagnósticos gerados por IA estarão dispostos a pagar por novos pacotes de acesso durante sua jornada de reposicionamento profissional.