"use client";

import Link from "next/link";
import { useActionState } from "react";

import { loginAction, type AuthFormState } from "@/app/(auth)/actions";
import { FormAlert } from "@/components/auth/form-alert";
import { GoogleButton } from "@/components/auth/google-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";

const initialState: AuthFormState = {};

export function LoginForm({ next, urlError }: { next?: string; urlError?: string }) {
  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  return (
    <Card className="w-full max-w-md shadow-card">
      <CardHeader>
        <CardTitle className="text-h3">Entrar na CareerTwin</CardTitle>
        <CardDescription>
          Acesse seus relatórios e continue sua evolução profissional.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <GoogleButton />

        <div className="flex items-center gap-3">
          <Separator className="flex-1" />
          <span className="text-xs text-muted-foreground">ou</span>
          <Separator className="flex-1" />
        </div>

        {urlError ? (
          <FormAlert
            variant="error"
            message="Não foi possível concluir a autenticação. Tente novamente."
          />
        ) : null}
        {state.error ? <FormAlert variant="error" message={state.error} /> : null}

        <form action={formAction} className="flex flex-col gap-4">
          <input type="hidden" name="next" value={next ?? "/dashboard"} />
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="voce@exemplo.com"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Sua senha"
              required
            />
          </div>
          <Button type="submit" className="mt-2 w-full" disabled={isPending}>
            {isPending ? <Spinner aria-label="Entrando" /> : null}
            Entrar
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Ainda não tem conta?{" "}
          <Link
            href="/cadastro"
            className="font-semibold text-primary-active underline-offset-4 hover:underline"
          >
            Criar conta gratuita
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
