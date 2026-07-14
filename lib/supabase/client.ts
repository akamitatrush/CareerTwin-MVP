import { createBrowserClient } from "@supabase/ssr";

/**
 * Cliente Supabase para uso em Client Components ("use client").
 * Para Server Components, Route Handlers e Server Actions, use lib/supabase/server.ts.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
