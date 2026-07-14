import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, FileText } from "lucide-react";

import { AppHeader } from "@/components/app/app-header";
import { NewAnalysisForm } from "@/components/dashboard/new-analysis-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import type { DocumentRow, EntitlementsRow } from "@/lib/types";

export const metadata: Metadata = {
  title: "Nova análise | CareerTwin",
};

// A geração do relatório roda em background (after) nesta rota; dá folga
// para a chamada à Claude API terminar sem ser cortada pela plataforma.
export const maxDuration = 300;

export default async function NovaAnalisePage({
  searchParams,
}: {
  searchParams: Promise<{ tipo?: string }>;
}) {
  const { tipo } = await searchParams;
  const kind = tipo === "aderencia" ? "aderencia_vaga" : "perfil";

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [documentsRes, entitlementsRes] = await Promise.all([
    supabase.from("documents").select("*").eq("status", "ready"),
    supabase.from("user_entitlements").select("*").single<EntitlementsRow>(),
  ]);

  const documents = (documentsRes.data ?? []) as DocumentRow[];
  if (documents.length === 0) redirect("/onboarding");

  const entitlements = entitlementsRes.data;
  if (
    entitlements &&
    !entitlements.has_active_package &&
    entitlements.free_remaining <= 0
  ) {
    redirect("/dashboard");
  }

  const usedDocuments = ["curriculo", "linkedin"]
    .map((docKind) => documents.find((doc) => doc.kind === docKind))
    .filter(Boolean) as DocumentRow[];

  return (
    <>
      <AppHeader userLabel={user.email ?? undefined} />
      <main className="flex-1 bg-surface-subtle">
        <div className="container-page py-10 md:py-14">
          <Button variant="ghost" size="sm" render={<Link href="/dashboard" />}>
            <ArrowLeft aria-hidden="true" strokeWidth={1.75} />
            Voltar ao dashboard
          </Button>

          <div className="mt-6 max-w-2xl">
            <h1 className="text-h3 md:text-h2">
              {kind === "perfil" ? "Análise de Perfil" : "Aderência à Vaga"}
            </h1>
            <p className="mt-2 text-base text-muted-foreground">
              {kind === "perfil"
                ? "Diagnóstico completo do seu currículo, LinkedIn e posicionamento profissional, com recomendações práticas e plano de evolução."
                : "Informe a vaga desejada e compare com seu perfil: score de aderência, pontos fortes, lacunas, riscos e plano de ação."}
            </p>
          </div>

          <Card className="mt-8 max-w-2xl">
            <CardContent className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <p className="text-sm font-semibold">Documentos analisados</p>
                <ul className="flex flex-wrap gap-2">
                  {usedDocuments.map((doc) => (
                    <li key={doc.id}>
                      <Badge variant="secondary">
                        <FileText aria-hidden="true" strokeWidth={1.75} />
                        {doc.kind === "curriculo" ? "Currículo" : "LinkedIn"} ·{" "}
                        {doc.file_name}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </div>

              <NewAnalysisForm kind={kind} />
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
