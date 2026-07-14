"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Recarrega os dados da rota em intervalos — usado enquanto um relatório processa. */
export function AutoRefresh({ intervalMs = 5000 }: { intervalMs?: number }) {
  const router = useRouter();

  useEffect(() => {
    const id = setInterval(() => router.refresh(), intervalMs);
    return () => clearInterval(id);
  }, [router, intervalMs]);

  return null;
}
