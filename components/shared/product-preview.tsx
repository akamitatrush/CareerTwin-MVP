import {
  ArrowDown,
  CheckCircle2,
  Lightbulb,
  ListChecks,
  Sparkles,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

/**
 * Previews visuais do produto usados na landing page.
 * Parecem interfaces reais, mas são demonstrações estáticas.
 */

interface AdherencePreviewProps {
  title: string;
  role: string;
  badge: string;
  score: number;
  recommendation: string;
  className?: string;
}

export function AdherencePreview({
  title,
  role,
  badge,
  score,
  recommendation,
  className,
}: AdherencePreviewProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{role}</CardDescription>
        <CardAction>
          <Badge>{badge}</Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <p className="text-5xl font-extrabold tracking-tight text-primary tabular-nums">
          {score}%
        </p>
        <Progress value={score} aria-label={`Aderência à vaga: ${score}%`} />
        <dl className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <div className="flex items-center gap-2">
            <span aria-hidden="true" className="size-2 rounded-full bg-success" />
            <dt className="text-muted-foreground">Pontos fortes</dt>
            <dd className="font-semibold tabular-nums">8</dd>
          </div>
          <div className="flex items-center gap-2">
            <span aria-hidden="true" className="size-2 rounded-full bg-warning" />
            <dt className="text-muted-foreground">Lacunas</dt>
            <dd className="font-semibold tabular-nums">3</dd>
          </div>
        </dl>
      </CardContent>
      <CardFooter className="gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary">
          <Lightbulb aria-hidden="true" strokeWidth={1.75} className="size-4.5" />
        </span>
        <p className="text-sm text-muted-foreground">{recommendation}</p>
      </CardFooter>
    </Card>
  );
}

const checklistItems = [
  { text: "Reescreva o resumo destacando resultados", priority: "Alta" },
  { text: "Adicione métricas às últimas experiências", priority: "Alta" },
  { text: "Inclua palavras-chave do cargo-alvo", priority: "Média" },
];

export function ChecklistPreview({ className }: { className?: string }) {
  return (
    <Card className={className}>
      <CardHeader>
        <span className="mb-1 flex size-10 items-center justify-center rounded-lg bg-primary-soft text-primary">
          <ListChecks aria-hidden="true" strokeWidth={1.75} className="size-5" />
        </span>
        <CardTitle className="text-lg">Recomendações priorizadas</CardTitle>
        <CardDescription>Currículo · LinkedIn</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-3">
          {checklistItems.map((item) => (
            <li
              key={item.text}
              className="flex items-center justify-between gap-3 rounded-lg border border-border bg-surface-subtle px-3 py-2.5"
            >
              <span className="flex items-center gap-2 text-sm">
                <CheckCircle2
                  aria-hidden="true"
                  strokeWidth={1.75}
                  className="size-4.5 shrink-0 text-primary"
                />
                {item.text}
              </span>
              <Badge variant={item.priority === "Alta" ? "default" : "secondary"}>
                {item.priority}
              </Badge>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

interface TranslationPreviewProps {
  before: string;
  after: string;
  className?: string;
}

export function TranslationPreview({
  before,
  after,
  className,
}: TranslationPreviewProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <span className="mb-1 flex size-10 items-center justify-center rounded-lg bg-primary-soft text-primary">
          <Sparkles aria-hidden="true" strokeWidth={1.75} className="size-5" />
        </span>
        <CardTitle className="text-lg">Tradução contextual</CardTitle>
        <CardDescription>Da descrição informal à linguagem do mercado</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="rounded-lg border border-border bg-surface-subtle p-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Antes
          </p>
          <p className="mt-1 text-sm text-muted-foreground">“{before}”</p>
        </div>
        <ArrowDown
          aria-hidden="true"
          strokeWidth={1.75}
          className="mx-auto size-4.5 text-primary"
        />
        <div className="rounded-lg border border-primary-soft-hover bg-primary-soft p-4">
          <p className="text-xs font-semibold text-primary-active uppercase tracking-wide">
            Depois
          </p>
          <p className="mt-1 text-sm text-foreground">“{after}”</p>
        </div>
      </CardContent>
    </Card>
  );
}

const planItems = [
  { text: "Reposicionar título e resumo do LinkedIn", impact: "Alto impacto", term: "Curto prazo" },
  { text: "Certificação na principal lacuna técnica", impact: "Alto impacto", term: "Médio prazo" },
  { text: "Construir portfólio de casos e resultados", impact: "Médio impacto", term: "Longo prazo" },
];

export function PlanPreview({ className }: { className?: string }) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg">Plano de evolução</CardTitle>
        <CardDescription>Ações priorizadas para o próximo objetivo</CardDescription>
        <CardAction>
          <Badge variant="success">Em progresso</Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <ol className="flex flex-col gap-3">
          {planItems.map((item, index) => (
            <li
              key={item.text}
              className="flex items-start gap-3 rounded-lg border border-border bg-surface-subtle px-3 py-2.5"
            >
              <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary-soft text-xs font-bold text-primary-active tabular-nums">
                {index + 1}
              </span>
              <span className="flex flex-col gap-1.5">
                <span className="text-sm font-medium">{item.text}</span>
                <span className="flex flex-wrap gap-1.5">
                  <Badge>{item.impact}</Badge>
                  <Badge variant="secondary">{item.term}</Badge>
                </span>
              </span>
            </li>
          ))}
        </ol>
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold">Evolução do plano</p>
          <Progress value={40} aria-label="Evolução do plano: 40%" />
        </div>
      </CardContent>
    </Card>
  );
}
