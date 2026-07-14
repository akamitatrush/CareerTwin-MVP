/** Tipos das tabelas do Supabase e dos resultados de relatório da IA. */

export type DocumentKind = "curriculo" | "linkedin";
export type DocumentStatus = "uploaded" | "processing" | "ready" | "error";

export interface DocumentRow {
  id: string;
  user_id: string;
  kind: DocumentKind;
  storage_path: string;
  file_name: string;
  mime_type: string | null;
  size_bytes: number | null;
  extracted_text: string | null;
  status: DocumentStatus;
  error_message: string | null;
  created_at: string;
  updated_at: string;
}

export type AnalysisKind = "perfil" | "aderencia_vaga";
export type AnalysisStatus = "pending" | "processing" | "completed" | "failed";

export interface PlanoAcao {
  acao: string;
  impacto: "alto" | "medio" | "baixo";
  esforco: "alto" | "medio" | "baixo";
  prazo: "curto" | "medio" | "longo";
}

export interface PerfilResult {
  resumo_executivo: string;
  posicionamento_sugerido: string;
  pontos_fortes: string[];
  pontos_de_melhoria: string[];
  recomendacoes_curriculo: string[];
  recomendacoes_linkedin: string[];
  plano_evolucao: PlanoAcao[];
}

export interface AderenciaResult {
  score: number;
  resumo_veredicto: string;
  pontos_fortes: string[];
  lacunas: string[];
  riscos: string[];
  melhorias_recomendadas: string[];
  palavras_chave_ausentes: string[];
  plano_acao: PlanoAcao[];
}

export type AnalysisResult = PerfilResult | AderenciaResult;

export interface AnalysisRow {
  id: string;
  user_id: string;
  kind: AnalysisKind;
  status: AnalysisStatus;
  curriculo_document_id: string | null;
  linkedin_document_id: string | null;
  job_title: string | null;
  job_description: string | null;
  score: number | null;
  result: AnalysisResult | null;
  model: string | null;
  input_tokens: number | null;
  output_tokens: number | null;
  consumed_free_credit: boolean;
  error_message: string | null;
  created_at: string;
  completed_at: string | null;
}

export interface EntitlementsRow {
  user_id: string;
  free_limit: number;
  free_used: number;
  free_remaining: number;
  has_active_package: boolean;
  package_expires_at: string | null;
}

export interface ProfileRow {
  id: string;
  full_name: string | null;
  cpf: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}
