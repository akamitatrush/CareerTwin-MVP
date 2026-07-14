"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
      .eq("id", analysis.id);

    if (updateError) {
      throw new Error(
        "Relatório gerado, mas não foi possível salvá-lo. Verifique se a migration 0002 foi aplicada no Supabase.",
      );
    }

    await logEvent(supabase, "report_generated", { kind }, user.id);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erro inesperado na geração.";
    await supabase
      .from("analyses")
      .update({ status: "failed", error_message: message })
      .eq("id", analysis.id);
    await logEvent(supabase, "report_failed", { kind, message }, user.id);
  }

  revalidatePath("/dashboard");
  redirect(`/dashboard/relatorios/${analysis.id}`);
}
