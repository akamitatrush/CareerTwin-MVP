import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { AppHeader } from "@/components/app/app-header";
import { UploadCard } from "@/components/onboarding/upload-card";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import type { DocumentRow } from "@/lib/types";

export const metadata: Metadata = {
  title: "Onboarding | CareerTwin",
};

export default async function OnboardingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: documents } = await supabase
    .from("documents")
    .select("*")
    .eq("status", "ready")
    .order("created_at", { ascending: false });

  const docs = (documents ?? []) as DocumentRow[];
  const curriculo = docs.find((doc) => doc.kind === "curriculo") ?? null;
  const linkedin = docs.find((doc) => doc.kind === "linkedin") ?? null;
  const hasAnyDocument = Boolean(curriculo || linkedin);

  return (
    <>
      <AppHeader userLabel={user.email ?? undefined} />
      <main className="flex-1 bg-surface-subtle">
        <div className="container-page py-12 md:py-16">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-primary-active">
              Passo 1 de 2
            </p>
            <h1 className="mt-2 text-h3 text-balance md:text-h2">
              Envie seus documentos
            </h1>
            <p className="mt-3 text-base text-muted-foreground">
              A CareerTwin trabalha apenas com o que está no seu currículo e no
              PDF do LinkedIn — nada de formulários longos. Envie ao menos um
              documento para liberar suas análises gratuitas.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <UploadCard
              kind="curriculo"
              title="Currículo"
              description="Seu currículo atualizado em PDF."
              existing={curriculo}
            />
            <UploadCard
              kind="linkedin"
              title="Perfil do LinkedIn"
              description="Exportação do seu perfil em PDF."
              hint="No LinkedIn: seu perfil → Mais → Salvar como PDF."
              existing={linkedin}
            />
          </div>

          <div className="mt-10 flex flex-col items-start gap-3">
            <Button
              size="lg"
              disabled={!hasAnyDocument}
              render={hasAnyDocument ? <Link href="/dashboard" /> : undefined}
            >
              Ir para o dashboard
              <ArrowRight aria-hidden="true" strokeWidth={1.75} />
            </Button>
            {!hasAnyDocument ? (
              <p className="text-sm text-muted-foreground">
                Envie ao menos um documento para continuar.
              </p>
            ) : null}
          </div>
        </div>
      </main>
    </>
  );
}
