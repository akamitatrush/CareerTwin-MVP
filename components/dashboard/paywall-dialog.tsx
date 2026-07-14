"use client";

import { useState, useTransition } from "react";
import { Sparkles } from "lucide-react";

import { purchasePackageAction } from "@/app/(app)/dashboard/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";

export function PaywallDialog() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handlePurchase() {
    setError(null);
    startTransition(async () => {
      const result = await purchasePackageAction();
      if (result.error) {
        setError(result.error);
        return;
      }
      setOpen(false);
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button />}>
        <Sparkles aria-hidden="true" strokeWidth={1.75} />
        Desbloquear análises ilimitadas
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">
            Pacote de 7 dias — R$ 30
          </DialogTitle>
          <DialogDescription>
            Análises verdadeiramente ilimitadas por 7 dias: Análise de Perfil e
            Aderência à Vaga, sem limite de uso no período.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3">
          <p className="text-4xl font-extrabold tracking-tight text-primary">
            R$ 30
            <span className="text-base font-medium text-muted-foreground">
              {" "}
              / 7 dias
            </span>
          </p>
          <Badge variant="warning">Pagamento simulado — fase de validação</Badge>
          <p className="text-sm text-muted-foreground">
            Nesta fase do MVP nenhuma cobrança real é feita. Ao confirmar, o
            pacote é ativado imediatamente na sua conta.
          </p>
          {error ? (
            <p role="alert" className="text-sm text-error">
              {error}
            </p>
          ) : null}
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isPending}
          >
            Cancelar
          </Button>
          <Button type="button" onClick={handlePurchase} disabled={isPending}>
            {isPending ? <Spinner aria-label="Processando" /> : null}
            Confirmar compra simulada
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
