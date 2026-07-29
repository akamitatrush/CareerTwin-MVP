"use client";

import { useActionState, useState } from "react";
import { Trash2 } from "lucide-react";

import { deleteAccountAction, type ActionState } from "@/app/(app)/dashboard/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CONFIRM_WORD = "EXCLUIR";

export function DeleteAccountForm() {
  const [state, formAction, isPending] = useActionState<ActionState>(
    async () => deleteAccountAction(),
    {},
  );
  const [confirm, setConfirm] = useState("");
  const canDelete = confirm.trim().toUpperCase() === CONFIRM_WORD;

  return (
    <Dialog>
      <DialogTrigger render={<Button variant="destructive" />}>
        <Trash2 aria-hidden="true" strokeWidth={1.75} />
        Excluir minha conta
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Excluir minha conta</DialogTitle>
          <DialogDescription>
            Esta ação é permanente. Todos os seus dados — perfil, documentos
            enviados e relatórios gerados — serão apagados e não poderão ser
            recuperados.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="confirm-delete">
              Digite <span className="font-bold">{CONFIRM_WORD}</span> para
              confirmar
            </Label>
            <Input
              id="confirm-delete"
              name="confirm-delete"
              value={confirm}
              onChange={(event) => setConfirm(event.target.value)}
              autoComplete="off"
              aria-describedby={state.error ? "delete-error" : undefined}
            />
          </div>
          {state.error ? (
            <p id="delete-error" role="alert" className="text-sm text-error">
              {state.error}
            </p>
          ) : null}
          <DialogFooter>
            <DialogClose render={<Button type="button" variant="outline" />}>
              Cancelar
            </DialogClose>
            <Button
              type="submit"
              variant="destructive"
              disabled={!canDelete || isPending}
            >
              {isPending ? "Excluindo…" : "Excluir permanentemente"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
