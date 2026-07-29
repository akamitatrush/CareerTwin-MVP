import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { AppHeader } from "@/components/app/app-header";
import { DeleteAccountForm } from "@/components/dashboard/delete-account-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Minha conta | CareerTwin",
};

export default async function ContaPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

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
            <h1 className="text-h3 md:text-h2">Minha conta</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Gerencie seus dados e sua conta.
            </p>
          </div>

          <div className="max-w-2xl">
            <Card className="border-error/20">
              <CardHeader>
                <CardTitle className="text-lg text-error">Excluir conta</CardTitle>
                <CardDescription>
                  Ao excluir sua conta, apagamos permanentemente seu perfil, os
                  documentos enviados (currículo e LinkedIn) e todos os relatórios
                  gerados. Esta ação não pode ser desfeita.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DeleteAccountForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}
