"use client";

import Link from "next/link";
import { useActionState } from "react";

import { signupAction, type AuthFormState } from "@/app/(auth)/actions";
import { FormAlert } from "@/components/auth/form-alert";
import { GoogleButton } from "@/components/auth/google-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";

const initialState: AuthFormState = {};

export function SignupForm() {
  const [state, formAction, isPending] = useActionState(signupAction, initialState);

  return (
    <Card className="w-full max-w-md shadow-card">
      <CardHeader>
        <CardTitle className="text-h3">Criar conta gratuita</CardTitle>
        <CardDescription>
          3 análises gratuitas para começar. Sem cartão de crédito.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <GoogleButton label="Cadastrar com Google" />

        <div className="flex items-center gap-3">
          <Separator className="flex-1" />
          <span className="text-xs text-muted-foreground">ou</span>
          <Separator className="flex-1" />
        </div>

        {state.error ? <FormAlert variant="error" message={state.error} /> : null}
        {state.success ? (
          <FormAlert variant="success" message={state.success} />
        ) : null}

        <form action={formAction} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="full_name">Nome completo</Label>
            <Input
              id="full_name"
              name="full_name"
              autoComplete="name"
              placeholder="Seu nome"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="cpf">
              CPF{" "}
              <span className="font-normal text-muted-foreground">(opcional)</span>
            </Label>
            <Input
              id="cpf"
              name="cpf"
              inputMode="numeric"
              autoComplete="off"
              placeholder="Somente números"
            />
          </div>
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
              autoComplete="new-password"
              placeholder="Mínimo de 8 caracteres"
              minLength={8}
              required
            />
          </div>
          <Button type="submit" className="mt-2 w-full" disabled={isPending}>
            {isPending ? <Spinner aria-label="Criando conta" /> : null}
            Criar conta
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Já tem conta?{" "}
          <Link
            href="/login"
            className="font-semibold text-primary-active underline-offset-4 hover:underline"
          >
            Entrar
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
