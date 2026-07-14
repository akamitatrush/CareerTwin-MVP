"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export interface AuthFormState {
  error?: string;
  success?: string;
}

async function siteOrigin() {
  const requestHeaders = await headers();
  return (
    requestHeaders.get("origin") ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    "http://localhost:3000"
  );
}

function safeNext(value: FormDataEntryValue | null, fallback: string) {
  const next = String(value ?? "");
  return next.startsWith("/") && !next.startsWith("//") ? next : fallback;
}

export async function loginAction(
  _prev: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Informe e-mail e senha para entrar." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    if (error.code === "email_not_confirmed") {
      return { error: "Confirme seu e-mail antes de entrar. Verifique sua caixa de entrada." };
    }
    return { error: "E-mail ou senha inválidos." };
  }

  redirect(safeNext(formData.get("next"), "/dashboard"));
}

export async function signupAction(
  _prev: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const fullName = String(formData.get("full_name") ?? "").trim();
  const cpf = String(formData.get("cpf") ?? "").replace(/\D/g, "");
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (fullName.length < 2) {
    return { error: "Informe seu nome completo." };
  }
  if (cpf && cpf.length !== 11) {
    return { error: "CPF inválido. Informe os 11 dígitos ou deixe em branco." };
  }
  if (!email) {
    return { error: "Informe um e-mail válido." };
  }
  if (password.length < 8) {
    return { error: "A senha precisa ter pelo menos 8 caracteres." };
  }

  const supabase = await createClient();
  const origin = await siteOrigin();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName, cpf: cpf || null },
      emailRedirectTo: `${origin}/auth/callback?next=/onboarding`,
    },
  });

  if (error) {
    if (error.code === "user_already_exists") {
      return { error: "Este e-mail já está cadastrado. Faça login." };
    }
    if (error.code === "email_address_invalid") {
      return { error: "E-mail inválido. Verifique o endereço informado." };
    }
    if (error.code === "weak_password") {
      return { error: "Senha muito fraca. Use uma combinação mais forte." };
    }
    return { error: "Não foi possível concluir o cadastro. Tente novamente." };
  }

  // Sessão criada imediatamente = confirmação de e-mail desativada no projeto
  if (data.session) {
    redirect("/onboarding");
  }

  return {
    success:
      "Cadastro criado! Enviamos um link de confirmação para o seu e-mail.",
  };
}

export async function googleLoginAction() {
  const supabase = await createClient();
  const origin = await siteOrigin();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/auth/callback?next=/dashboard`,
    },
  });

  if (error || !data.url) {
    redirect("/login?erro=google");
  }

  redirect(data.url);
}

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
