"use client";

import { useActionState } from "react";

import {
  createAnalysisAction,
  type ActionState,
} from "@/app/(app)/dashboard/actions";
import { FormAlert } from "@/components/auth/form-alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import type { AnalysisKind } from "@/lib/types";

const initialState: ActionState = {};

export function NewAnalysisForm({ kind }: { kind: AnalysisKind }) {
  const [state, formAction, isPending] = useActionState(
    createAnalysisAction,
    initialState,
  );

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <input type="hidden" name="kind" value={kind} />

      {state.error ? <FormAlert variant="error" message={state.error} /> : null}

      {kind === "aderencia_vaga" ? (
        <>
          <div className="flex flex-col gap-2">
            <Label htmlFor="job_title">Cargo-alvo</Label>
            <Input
              id="job_title"
              name="job_title"
              placeholder="Ex.: Product Manager Sênior"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="job_description">Descrição da vaga</Label>
            <Textarea
              id="job_description"
              name="job_description"
              placeholder="Cole aqui a descrição completa da vaga…"
              className="min-h-48"
              required
            />
          </div>
        </>
      ) : null}

      <Button type="submit" size="lg" disabled={isPending} className="w-full sm:w-auto">
        {isPending ? <Spinner aria-label="Gerando" /> : null}
        {isPending
          ? "Gerando relatório… isso pode levar até um minuto"
          : kind === "perfil"
            ? "Gerar Análise de Perfil"
            : "Gerar Aderência à Vaga"}
      </Button>
    </form>
  );
}
