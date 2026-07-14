import {
  AlertTriangle,
  CheckCircle2,
  KeyRound,
  Lightbulb,
  ListChecks,
  Quote,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type {
  AderenciaResult,
  AnalysisRow,
  PerfilResult,
  PlanoAcao,
} from "@/lib/types";

const impactLabels = { alto: "Alto impacto", medio: "Médio impacto", baixo: "Baixo impacto" };
const effortLabels = { alto: "Esforço alto", medio: "Esforço médio", baixo: "Esforço baixo" };
const termLabels = { curto: "Curto prazo", medio: "Médio prazo", longo: "Longo prazo" };

interface ListCardProps {
  title: string;
  items: string[];
  icon: LucideIcon;
  tone?: "success" | "warning" | "error" | "primary";
}

const toneClasses = {
  success: "text-success",
  warning: "text-warning",
  error: "text-error",
  primary: "text-primary",
} as const;

function ListCard({ title, items, icon: Icon, tone = "primary" }: ListCardProps) {
  if (items.length === 0) return null;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-3">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm">
              <Icon
                aria-hidden="true"
                strokeWidth={1.75}
                className={`mt-0.5 size-4.5 shrink-0 ${toneClasses[tone]}`}
              />
              {item}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function PlanCard({ title, items }: { title: string; items: PlanoAcao[] }) {
  if (items.length === 0) return null;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>
          Ações priorizadas por impacto, esforço e prazo recomendado.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ol className="flex flex-col gap-3">
          {items.map((item, index) => (
            <li
              key={item.acao}
              className="flex items-start gap-3 rounded-lg border border-border bg-surface-subtle px-4 py-3"
            >
              <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary-soft text-xs font-bold text-primary-active tabular-nums">
                {index + 1}
              </span>
              <span className="flex flex-col gap-2">
                <span className="text-sm font-medium">{item.acao}</span>
                <span className="flex flex-wrap gap-1.5">
                  <Badge>{impactLabels[item.impacto] ?? item.impacto}</Badge>
                  <Badge variant="secondary">
                    {effortLabels[item.esforco] ?? item.esforco}
                  </Badge>
                  <Badge variant="outline">
                    {termLabels[item.prazo] ?? item.prazo}
                  </Badge>
                </span>
              </span>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}

function PerfilReport({ result }: { result: PerfilResult }) {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Resumo executivo</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <p className="text-base leading-relaxed">{result.resumo_executivo}</p>
          <div className="flex items-start gap-3 rounded-lg border border-primary-soft-hover bg-primary-soft p-4">
            <Quote
              aria-hidden="true"
              strokeWidth={1.75}
              className="mt-0.5 size-4.5 shrink-0 text-primary"
            />
            <div>
              <p className="text-xs font-semibold tracking-wide text-primary-active uppercase">
                Posicionamento sugerido
              </p>
              <p className="mt-1 text-sm">{result.posicionamento_sugerido}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <ListCard
          title="Pontos fortes"
          items={result.pontos_fortes}
          icon={CheckCircle2}
          tone="success"
        />
        <ListCard
          title="Pontos de melhoria"
          items={result.pontos_de_melhoria}
          icon={AlertTriangle}
          tone="warning"
        />
        <ListCard
          title="Recomendações para o currículo"
          items={result.recomendacoes_curriculo}
          icon={ListChecks}
        />
        <ListCard
          title="Recomendações para o LinkedIn"
          items={result.recomendacoes_linkedin}
          icon={Sparkles}
        />
      </div>

      <PlanCard title="Plano de evolução profissional" items={result.plano_evolucao} />
    </div>
  );
}

function AderenciaReport({
  result,
  analysis,
}: {
  result: AderenciaResult;
  analysis: AnalysisRow;
}) {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Score de aderência</CardTitle>
          {analysis.job_title ? (
            <CardDescription>{analysis.job_title}</CardDescription>
          ) : null}
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <p className="text-6xl font-extrabold tracking-tight text-primary tabular-nums">
            {result.score}%
          </p>
          <Progress
            value={result.score}
            aria-label={`Score de aderência: ${result.score}%`}
          />
          <p className="text-base leading-relaxed">{result.resumo_veredicto}</p>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <ListCard
          title="Pontos fortes"
          items={result.pontos_fortes}
          icon={CheckCircle2}
          tone="success"
        />
        <ListCard
          title="Lacunas profissionais"
          items={result.lacunas}
          icon={AlertTriangle}
          tone="warning"
        />
        <ListCard
          title="Riscos da candidatura"
          items={result.riscos}
          icon={ShieldAlert}
          tone="error"
        />
        <ListCard
          title="Melhorias recomendadas"
          items={result.melhorias_recomendadas}
          icon={Lightbulb}
        />
      </div>

      {result.palavras_chave_ausentes.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Palavras-chave ausentes</CardTitle>
            <CardDescription>
              Termos da vaga que não aparecem no seu perfil — avalie incluir os
              que refletem sua experiência real.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-wrap gap-2">
              {result.palavras_chave_ausentes.map((keyword) => (
                <li key={keyword}>
                  <Badge variant="secondary">
                    <KeyRound aria-hidden="true" strokeWidth={1.75} />
                    {keyword}
                  </Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ) : null}

      <PlanCard title="Plano de ação" items={result.plano_acao} />
    </div>
  );
}

export function ReportView({ analysis }: { analysis: AnalysisRow }) {
  if (!analysis.result) return null;
  if (analysis.kind === "perfil") {
    return <PerfilReport result={analysis.result as PerfilResult} />;
  }
  return (
    <AderenciaReport
      result={analysis.result as AderenciaResult}
      analysis={analysis}
    />
  );
}
