import Anthropic from "@anthropic-ai/sdk";

import type {
  AderenciaResult,
  AnalysisKind,
  AnalysisResult,
  DocumentKind,
} from "@/lib/types";

const MODEL = "claude-opus-4-8";

const SYSTEM_PROMPT = `Você é o mentor de carreira da CareerTwin AI, especializado no mercado de trabalho brasileiro (tecnologia, negócios e marketing).

Regras invioláveis:
- Baseie-se EXCLUSIVAMENTE nas informações presentes nos documentos fornecidos (currículo e/ou PDF do LinkedIn). Nunca invente experiências, formações, competências ou resultados que não estejam nos documentos.
- Nunca prometa contratação, aprovação em processos seletivos ou resultados garantidos. A proposta é clareza, posicionamento e competitividade.
- Escreva em português brasileiro, com linguagem clara, objetiva e encorajadora, sem jargões técnicos desnecessários.
- Seja consultivo: explique lacunas e recomende melhorias práticas e acionáveis, sempre priorizadas por impacto.
- Ao atribuir scores, seja criterioso e realista: use a escala completa de 0 a 100, onde 85+ indica aderência excepcional e rara.`;

const PLANO_ITEM_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["acao", "impacto", "esforco", "prazo"],
  properties: {
    acao: { type: "string", description: "Ação prática e específica" },
    impacto: { type: "string", enum: ["alto", "medio", "baixo"] },
    esforco: { type: "string", enum: ["alto", "medio", "baixo"] },
    prazo: { type: "string", enum: ["curto", "medio", "longo"] },
  },
} as const;

const PERFIL_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: [
    "resumo_executivo",
    "posicionamento_sugerido",
    "pontos_fortes",
    "pontos_de_melhoria",
    "recomendacoes_curriculo",
    "recomendacoes_linkedin",
    "plano_evolucao",
  ],
  properties: {
    resumo_executivo: {
      type: "string",
      description: "Diagnóstico objetivo do perfil em 2-4 frases",
    },
    posicionamento_sugerido: {
      type: "string",
      description: "Como o profissional deve se posicionar no mercado",
    },
    pontos_fortes: { type: "array", items: { type: "string" } },
    pontos_de_melhoria: { type: "array", items: { type: "string" } },
    recomendacoes_curriculo: { type: "array", items: { type: "string" } },
    recomendacoes_linkedin: {
      type: "array",
      items: { type: "string" },
      description: "Vazio se o PDF do LinkedIn não foi fornecido",
    },
    plano_evolucao: { type: "array", items: PLANO_ITEM_SCHEMA },
  },
} as const;

const ADERENCIA_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: [
    "score",
    "resumo_veredicto",
    "pontos_fortes",
    "lacunas",
    "riscos",
    "melhorias_recomendadas",
    "palavras_chave_ausentes",
    "plano_acao",
  ],
  properties: {
    score: {
      type: "integer",
      description: "Score de aderência entre 0 e 100",
    },
    resumo_veredicto: {
      type: "string",
      description: "Veredicto objetivo da compatibilidade em 2-4 frases",
    },
    pontos_fortes: { type: "array", items: { type: "string" } },
    lacunas: { type: "array", items: { type: "string" } },
    riscos: {
      type: "array",
      items: { type: "string" },
      description: "Riscos da candidatura",
    },
    melhorias_recomendadas: { type: "array", items: { type: "string" } },
    palavras_chave_ausentes: {
      type: "array",
      items: { type: "string" },
      description: "Palavras-chave da vaga ausentes no perfil",
    },
    plano_acao: { type: "array", items: PLANO_ITEM_SCHEMA },
  },
} as const;

export interface GenerateReportInput {
  kind: AnalysisKind;
  documents: { kind: DocumentKind; base64: string }[];
  jobTitle?: string | null;
  jobDescription?: string | null;
}

export interface GenerateReportOutput {
  result: AnalysisResult;
  model: string;
  inputTokens: number;
  outputTokens: number;
}

function buildUserPrompt(input: GenerateReportInput) {
  const available = input.documents
    .map((doc) => (doc.kind === "curriculo" ? "currículo" : "PDF do LinkedIn"))
    .join(" e ");

  if (input.kind === "perfil") {
    return `Documentos fornecidos: ${available}.

Gere a Análise de Perfil completa: diagnóstico do currículo, do LinkedIn (se fornecido) e do posicionamento profissional, com pontos fortes, pontos de melhoria, recomendações práticas e um plano de evolução priorizado.`;
  }

  return `Documentos fornecidos: ${available}.

Cargo-alvo: ${input.jobTitle || "não informado"}

Descrição da vaga:
"""
${input.jobDescription}
"""

Gere o diagnóstico de Aderência à Vaga: compare o perfil do candidato com a vaga acima e produza o score de aderência (0 a 100), veredicto, pontos fortes, lacunas, riscos da candidatura, melhorias recomendadas, palavras-chave ausentes e um plano de ação priorizado.`;
}

/**
 * Gera um relatório estruturado com a Claude API.
 * PDFs entram como document blocks (base64); a resposta é validada
 * pelo próprio modelo contra o JSON Schema via structured outputs.
 */
export async function generateReport(
  input: GenerateReportInput,
): Promise<GenerateReportOutput> {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error(
      "ANTHROPIC_API_KEY não configurada. Adicione a chave no arquivo .env.local para gerar relatórios.",
    );
  }
  if (input.documents.length === 0) {
    throw new Error("Nenhum documento disponível para análise.");
  }

  const client = new Anthropic();

  const content: Anthropic.ContentBlockParam[] = [
    ...input.documents.map(
      (doc): Anthropic.ContentBlockParam => ({
        type: "document",
        source: {
          type: "base64",
          media_type: "application/pdf",
          data: doc.base64,
        },
        title: doc.kind === "curriculo" ? "Currículo" : "Perfil do LinkedIn",
      }),
    ),
    { type: "text", text: buildUserPrompt(input) },
  ];

  const stream = client.messages.stream({
    model: MODEL,
    max_tokens: 16000,
    thinking: { type: "adaptive" },
    system: SYSTEM_PROMPT,
    output_config: {
      format: {
        type: "json_schema",
        schema: input.kind === "perfil" ? PERFIL_SCHEMA : ADERENCIA_SCHEMA,
      },
    },
    messages: [{ role: "user", content }],
  });

  const message = await stream.finalMessage();

  if (message.stop_reason === "refusal") {
    throw new Error(
      "A análise não pôde ser concluída pelos filtros de segurança. Revise os documentos enviados.",
    );
  }

  const text = message.content
    .filter((block) => block.type === "text")
    .map((block) => block.text)
    .join("");

  if (!text) {
    throw new Error("A IA não retornou conteúdo. Tente novamente.");
  }

  const result = JSON.parse(text) as AnalysisResult;

  if (input.kind === "aderencia_vaga") {
    const aderencia = result as AderenciaResult;
    aderencia.score = Math.max(0, Math.min(100, Math.round(aderencia.score)));
  }

  return {
    result,
    model: message.model,
    inputTokens: message.usage.input_tokens,
    outputTokens: message.usage.output_tokens,
  };
}
