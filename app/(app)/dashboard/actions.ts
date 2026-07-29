"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { after } from "next/server";

import { generateReport } from "@/lib/ai/generate-report";
import { logEvent } from "@/lib/events";
import { createClient } from "@/lib/supabase/server";
import type {
  AderenciaResult,
  AnalysisKind,
  DocumentKind,
  DocumentRow,
  EntitlementsRow,
} from "@/lib/types";

export interface ActionState {
  error?: string;
}

export async function purchasePackageAction(): Promise<ActionState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { error } = await supabase.from("access_packages").insert({
    user_id: user.id,
  });

  if (error) {
    return {
      error:
        "Não foi possível concluir a compra simulada. Verifique se a migration 0002 foi aplicada no Supabase.",
    };
  }

  await logEvent(
    supabase,
    "package_mock_purchased",
    { price_cents: 3000, duration_days: 7 },
    user.id,
  );

  revalidatePath("/dashboard");
  return {};
}

/**
 * Direito ao esquecimento (LGPD art. 18): exclui todos os dados do usuário.
 * Remove os arquivos do Storage e apaga a conta (cascade limpa profiles,
 * documents, analyses e access_packages). Encerra a sessão ao final.
 */
export async function deleteAccountAction(): Promise<ActionState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // 1. Remove os arquivos da pasta do usuário no Storage (não é coberto por cascade)
  const { data: files } = await supabase.storage.from("documents").list(user.id);
  if (files && files.length > 0) {
    await supabase.storage
      .from("documents")
      .remove(files.map((file) => `${user.id}/${file.name}`));
  }

  // 2. Registra o evento antes de apagar (user_id vira null via ON DELETE SET NULL)
  await logEvent(supabase, "account_deleted", {}, user.id);

  // 3. Apaga a conta — cascade remove profiles, documents, analyses e pacotes
  const { error } = await supabase.rpc("delete_own_account");
  if (error) {
    return {
      error:
        "Não foi possível excluir a conta. Verifique se a migration 0003 foi aplicada e tente novamente.",
    };
  }

  // 4. Encerra a sessão e volta para a home
  await supabase.auth.signOut();
  redirect("/?conta=excluida");
}

export async function createAnalysisAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const kind = String(formData.get("kind")) as AnalysisKind;
  if (kind !== "perfil" && kind !== "aderencia_vaga") {
    return { error: "Tipo de análise inválido." };
  }

  const jobTitle = String(formData.get("job_title") ?? "").trim();
  const jobDescription = String(formData.get("job_description") ?? "").trim();
  if (kind === "aderencia_vaga" && (!jobTitle || !jobDescription)) {
    return { error: "Informe o cargo-alvo e a descrição da vaga." };
  }

  // Verificação rápida de direito de uso (o banco também bloqueia via RLS)
  const { data: entitlements } = await supabase
    .from("user_entitlements")
    .select("*")
    .single<EntitlementsRow>();
  if (
    entitlements &&
    !entitlements.has_active_package &&
    entitlements.free_remaining <= 0
  ) {
    return {
      error:
        "Suas análises gratuitas acabaram. Adquira o pacote de 7 dias para continuar.",
    };
  }

  const { data: documents } = await supabase
    .from("documents")
    .select("*")
    .eq("status", "ready")
    .order("created_at", { ascending: false });

  const docs = (documents ?? []) as DocumentRow[];
  const curriculo = docs.find((doc) => doc.kind === "curriculo") ?? null;
  const linkedin = docs.find((doc) => doc.kind === "linkedin") ?? null;
  if (!curriculo && !linkedin) {
    return {
      error: "Envie ao menos um documento no onboarding antes de gerar análises.",
    };
  }

  const { data: analysis, error: insertError } = await supabase
    .from("analyses")
    .insert({
      user_id: user.id,
      kind,
      status: "processing",
      curriculo_document_id: curriculo?.id ?? null,
      linkedin_document_id: linkedin?.id ?? null,
      job_title: jobTitle || null,
      job_description: jobDescription || null,
    })
    .select("id")
    .single<{ id: string }>();

  if (insertError || !analysis) {
    return {
      error:
        "Não foi possível iniciar a análise. Verifique seus créditos e tente novamente.",
    };
  }

  await logEvent(supabase, "report_requested", { kind }, user.id);

  const analysisId = analysis.id;
  const userId = user.id;

  // Geração em background: a resposta (redirect) é enviada imediatamente e a
  // análise continua sendo processada. A página do relatório faz auto-refresh
  // e reflete o status quando a IA terminar (completed/failed).
  after(async () => {
    try {
      const payload: { kind: DocumentKind; base64: string }[] = [];
      for (const doc of [curriculo, linkedin]) {
        if (!doc) continue;
        const { data: blob, error: downloadError } = await supabase.storage
          .from("documents")
          .download(doc.storage_path);
        if (downloadError || !blob) {
          throw new Error("Falha ao ler o documento no Storage.");
        }
        payload.push({
          kind: doc.kind,
          base64: Buffer.from(await blob.arrayBuffer()).toString("base64"),
        });
      }

      const generated = await generateReport({
        kind,
        documents: payload,
        jobTitle,
        jobDescription,
      });

      const score =
        kind === "aderencia_vaga"
          ? (generated.result as AderenciaResult).score
          : null;

      const { error: updateError } = await supabase
        .from("analyses")
        .update({
          status: "completed",
          result: generated.result,
          score,
          model: generated.model,
          input_tokens: generated.inputTokens,
          output_tokens: generated.outputTokens,
          completed_at: new Date().toISOString(),
        })
        .eq("id", analysisId);

      if (updateError) {
        throw new Error(
          "Relatório gerado, mas não foi possível salvá-lo. Verifique se a migration 0002 foi aplicada no Supabase.",
        );
      }

      await logEvent(supabase, "report_generated", { kind }, userId);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro inesperado na geração.";
      await supabase
        .from("analyses")
        .update({ status: "failed", error_message: message })
        .eq("id", analysisId);
      await logEvent(supabase, "report_failed", { kind, message }, userId);
    }
  });

  revalidatePath("/dashboard");
  redirect(`/dashboard/relatorios/${analysisId}`);
}
