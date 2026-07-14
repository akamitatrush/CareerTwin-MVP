import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Registra um evento de produto (métricas do one-pager, seção 4).
 * Nunca deve quebrar o fluxo principal — falhas são ignoradas.
 */
export async function logEvent(
  supabase: SupabaseClient,
  name: string,
  properties: Record<string, unknown> = {},
  userId?: string,
) {
  try {
    await supabase
      .from("events")
      .insert({ name, properties, user_id: userId ?? null });
  } catch {
    // silencioso por design
  }
}
