import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  FileSearch,
  FileText,
  Infinity as InfinityIcon,
  Target,
} from "lucide-react";

import { AppHeader } from "@/components/app/app-header";
import { PaywallDialog } from "@/components/dashboard/paywall-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { createClient } from "@/lib/supabase/server";
import type {
  AnalysisRow,
  DocumentRow,
  EntitlementsRow,
  ProfileRow,
} from "@/lib/types";

export const metadata: Metadata = {
  title: "Dashboard | CareerTwin",
};

const kindLabels = {
  perfil: "Análise de Perfil",
  aderencia_vaga: "Aderência à Vaga",
} as const;

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

function StatusBadge({ status }: { status: AnalysisRow["status"] }) {
  if (status === "completed") return <Badge variant="success">Concluído</Badge>;
  if (status === "failed") return <Badge variant="destructive">Falhou</Badge>;
  return <Badge variant="secondary">Processando</Badge>;
}

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [profileRes, entitlementsRes, analysesRes, documentsRes] =
    await Promise.all([
      supabase.from("profiles").select("*").single<ProfileRow>(),
      supabase.from("user_entitlements").select("*").single<EntitlementsRow>(),
      supabase
        .from("analyses")
        .select("*")
        .order("created_at", { ascending: false }),
      supabase.from("documents").select("*").eq("status", "ready"),
    ]);

  const profile = profileRes.data;
  const entitlements = entitlementsRes.data;
  const analyses = (analysesRes.data ?? []) as AnalysisRow[];
  const documents = (documentsRes.data ?? []) as DocumentRow[];

  const firstName =
    profile?.full_name?.split(" ")[0] ?? user.email?.split("@")[0] ?? "";
  const hasDocuments = documents.length > 0;
  const canRun = entitlements
    ? entitlements.has_active_package || entitlements.free_remaining > 0
    : true;

  return (
    <>
      <AppHeader userLabel={user.email ?? undefined} />
      <main className="flex-1 bg-surface-subtle">
        <div className="container-page flex flex-col gap-10 py-10 md:py-14">
          <div>
            <h1 className="text-h3 md:text-h2">Olá, {firstName}</h1>
            <p className="mt-2 text-base text-muted-foreground">
              Acompanhe seus relatórios e continue evoluindo seu posicionamento.
            </p>
          </div>

          <section aria-label="Seus créditos e ações" className="grid gap-6 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Suas análises</CardTitle>
                <CardDescription>
                  {entitlements?.has_active_package
                    ? "Pacote de 7 dias ativo"
                    : "Plano gratuito"}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                {entitlements?.has_active_package ? (
                  <>
                    <p className="flex items-center gap-2 text-3xl font-extrabold tracking-tight text-primary">
                      <InfinityIcon
                        aria-hidden="true"
                        strokeWidth={1.75}
                        className="size-8"
                      />
                      Ilimitadas
                    </p>
                    {entitlements.package_expires_at ? (
                      <p className="text-sm text-muted-foreground">
                        Válido até{" "}
                        {dateFormatter.format(
                          new Date(entitlements.package_expires_at),
                        )}
                      </p>
                    ) : null}
                    <Badge variant="success">Sem limite de uso no período</Badge>
                  </>
                ) : (
                  <>
                    <p className="text-3xl font-extrabold tracking-tight">
                      <span className="text-primary tabular-nums">
                        {entitlements?.free_remaining ?? 3}
                      </span>{" "}
                      <span className="text-base font-medium text-muted-foreground">
                        de {entitlements?.free_limit ?? 3} análises gratuitas
                      </span>
                    </p>
                    <Progress
                      value={
                        ((entitlements?.free_remaining ?? 3) /
                          (entitlements?.free_limit ?? 3)) *
                        100
                      }
                      aria-label={`${entitlements?.free_remaining ?? 3} de ${entitlements?.free_limit ?? 3} análises gratuitas restantes`}
                    />
                    {!canRun ? <PaywallDialog /> : null}
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <span className="mb-1 flex size-10 items-center justify-center rounded-lg bg-primary-soft text-primary">
                  <FileSearch aria-hidden="true" strokeWidth={1.75} className="size-5" />
                </span>
                <CardTitle className="text-lg">Análise de Perfil</CardTitle>
                <CardDescription>
                  Diagnóstico do currículo, LinkedIn e posicionamento
                  profissional.
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <Button
                  className="w-full"
                  disabled={!hasDocuments || !canRun}
                  render={
                    hasDocuments && canRun ? (
                      <Link href="/dashboard/nova-analise?tipo=perfil" />
                    ) : undefined
                  }
                >
                  Nova análise
                  <ArrowRight aria-hidden="true" strokeWidth={1.75} />
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <span className="mb-1 flex size-10 items-center justify-center rounded-lg bg-primary-soft text-primary">
                  <Target aria-hidden="true" strokeWidth={1.75} className="size-5" />
                </span>
                <CardTitle className="text-lg">Aderência à Vaga</CardTitle>
                <CardDescription>
                  Compare seu perfil com uma vaga específica e receba um score
                  de 0 a 100.
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <Button
                  className="w-full"
                  disabled={!hasDocuments || !canRun}
                  render={
                    hasDocuments && canRun ? (
                      <Link href="/dashboard/nova-analise?tipo=aderencia" />
                    ) : undefined
                  }
                >
                  Nova análise
                  <ArrowRight aria-hidden="true" strokeWidth={1.75} />
                </Button>
              </CardContent>
            </Card>
          </section>

          {!hasDocuments ? (
            <Card className="border-warning/20 bg-warning-soft">
              <CardContent className="flex flex-col items-start gap-3 md:flex-row md:items-center md:justify-between">
                <p className="text-sm">
                  Você ainda não enviou nenhum documento. Envie seu currículo ou
                  o PDF do LinkedIn para liberar as análises.
                </p>
                <Button variant="outline" render={<Link href="/onboarding" />}>
                  <FileText aria-hidden="true" strokeWidth={1.75} />
                  Enviar documentos
                </Button>
              </CardContent>
            </Card>
          ) : null}

          <section aria-labelledby="historico-title" className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <h2 id="historico-title" className="text-h3">
                Histórico de relatórios
              </h2>
              <Button variant="ghost" size="sm" render={<Link href="/onboarding" />}>
                Gerenciar documentos
              </Button>
            </div>

            {analyses.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-start gap-2">
                  <p className="font-semibold">Nenhum relatório ainda</p>
                  <p className="text-sm text-muted-foreground">
                    Gere sua primeira análise gratuita — leva cerca de um
                    minuto.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <ul className="flex flex-col gap-3">
                {analyses.map((analysis) => (
                  <li key={analysis.id}>
                    <Card size="sm">
                      <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex flex-col gap-1">
                          <p className="font-semibold">
                            {kindLabels[analysis.kind]}
                            {analysis.job_title ? ` · ${analysis.job_title}` : ""}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {dateFormatter.format(new Date(analysis.created_at))}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          {analysis.score !== null ? (
                            <span className="text-lg font-extrabold text-primary tabular-nums">
                              {analysis.score}%
                            </span>
                          ) : null}
                          <StatusBadge status={analysis.status} />
                          <Button
                            variant="outline"
                            size="sm"
                            render={
                              <Link href={`/dashboard/relatorios/${analysis.id}`} />
                            }
                          >
                            Ver relatório
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
