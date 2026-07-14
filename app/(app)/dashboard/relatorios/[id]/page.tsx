import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { AlertTriangle, ArrowLeft } from "lucide-react";

import { AppHeader } from "@/components/app/app-header";
import { AutoRefresh } from "@/components/reports/auto-refresh";
import { ReportView } from "@/components/reports/report-view";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { createClient } from "@/lib/supabase/server";
import type { AnalysisRow } from "@/lib/types";

export const metadata: Metadata = {
  title: "Relatório | CareerTwin",
};

const kindLabels = {
  perfil: "Análise de Perfil",
  aderencia_vaga: "Aderência à Vaga",
} as const;

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export default async function RelatorioPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data } = await supabase
    .from("analyses")
    .select("*")
    .eq("id", id)
    .maybeSingle<AnalysisRow>();

  if (!data) notFound();
  const analysis = data;
  const isProcessing =
    analysis.status === "pending" || analysis.status === "processing";

  return (
    <>
      <AppHeader userLabel={user.email ?? undefined} />
      <main className="flex-1 bg-surface-subtle">
        <div className="container-page py-10 md:py-14">
          <Button variant="ghost" size="sm" render={<Link href="/dashboard" />}>
            <ArrowLeft aria-hidden="true" strokeWidth={1.75} />
            Voltar ao dashboard
          </Button>

          <div className="mt-6 mb-8 max-w-3xl">
            <h1 className="text-h3 md:text-h2">{kindLabels[analysis.kind]}</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Gerado em {dateFormatter.format(new Date(analysis.created_at))}
              {analysis.job_title ? ` · ${analysis.job_title}` : ""}
            </p>
          </div>

          <div className="max-w-4xl">
            {isProcessing ? (
              <>
                <AutoRefresh />
                <Card>
                  <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
                    <Spinner
                      aria-label="Gerando relatório"
                      className="size-8 text-primary"
                    />
                    <p className="text-lg font-bold">Gerando seu relatório…</p>
                    <p className="max-w-[44ch] text-sm text-muted-foreground">
                      A IA está analisando seus documentos. Isso costuma levar
                      até um minuto — a página atualiza sozinha.
                    </p>
                  </CardContent>
                </Card>
              </>
            ) : null}

            {analysis.status === "failed" ? (
              <Card className="border-error/20 bg-error-soft">
                <CardContent className="flex flex-col items-start gap-4">
                  <p className="flex items-center gap-2 text-lg font-bold text-error">
                    <AlertTriangle
                      aria-hidden="true"
                      strokeWidth={1.75}
                      className="size-5"
                    />
                    A análise falhou
                  </p>
                  <p className="text-sm">
                    {analysis.error_message ??
                      "Ocorreu um erro inesperado durante a geração."}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Análises com falha não consomem créditos gratuitos.
                  </p>
                  <Button
                    variant="outline"
                    render={
                      <Link
                        href={`/dashboard/nova-analise?tipo=${
                          analysis.kind === "perfil" ? "perfil" : "aderencia"
                        }`}
                      />
                    }
                  >
                    Tentar novamente
                  </Button>
                </CardContent>
              </Card>
            ) : null}

            {analysis.status === "completed" ? (
              <ReportView analysis={analysis} />
            ) : null}
          </div>
        </div>
      </main>
    </>
  );
}
