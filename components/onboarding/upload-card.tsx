"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, FileText, Trash2, Upload } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { createClient } from "@/lib/supabase/client";
import type { DocumentKind, DocumentRow } from "@/lib/types";

const MAX_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB (limite do bucket)

interface UploadCardProps {
  kind: DocumentKind;
  title: string;
  description: string;
  hint?: string;
  existing: DocumentRow | null;
}

export function UploadCard({ kind, title, description, hint, existing }: UploadCardProps) {
  const [isBusy, setIsBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  async function handleFile(file: File) {
    setError(null);

    if (file.type !== "application/pdf") {
      setError("Envie um arquivo PDF.");
      return;
    }
    if (file.size > MAX_SIZE_BYTES) {
      setError("O arquivo excede o limite de 10 MB.");
      return;
    }

    setIsBusy(true);
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      router.push("/login");
      return;
    }

    const path = `${user.id}/${kind}-${Date.now()}.pdf`;
    const { error: uploadError } = await supabase.storage
      .from("documents")
      .upload(path, file, { contentType: "application/pdf" });

    if (uploadError) {
      setError("Falha ao enviar o arquivo. Tente novamente.");
      setIsBusy(false);
      return;
    }

    const { error: insertError } = await supabase.from("documents").insert({
      user_id: user.id,
      kind,
      storage_path: path,
      file_name: file.name,
      mime_type: file.type,
      size_bytes: file.size,
      status: "ready",
    });

    if (insertError) {
      await supabase.storage.from("documents").remove([path]);
      setError("Não foi possível registrar o documento. Tente novamente.");
      setIsBusy(false);
      return;
    }

    setIsBusy(false);
    router.refresh();
  }

  async function handleRemove() {
    if (!existing) return;
    setIsBusy(true);
    setError(null);

    const supabase = createClient();
    await supabase.storage.from("documents").remove([existing.storage_path]);
    const { error: deleteError } = await supabase
      .from("documents")
      .delete()
      .eq("id", existing.id);

    if (deleteError) {
      setError("Não foi possível remover o documento.");
    }
    setIsBusy(false);
    router.refresh();
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <span className="mb-1 flex size-10 items-center justify-center rounded-lg bg-primary-soft text-primary">
          <FileText aria-hidden="true" strokeWidth={1.75} className="size-5" />
        </span>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {existing ? (
          <div className="flex items-center justify-between gap-3 rounded-lg border border-success/20 bg-success-soft px-3.5 py-3">
            <span className="flex min-w-0 items-center gap-2.5 text-sm">
              <CheckCircle2
                aria-hidden="true"
                strokeWidth={1.75}
                className="size-4.5 shrink-0 text-success"
              />
              <span className="truncate font-medium">{existing.file_name}</span>
            </span>
            <Badge variant="success" className="shrink-0">
              Enviado
            </Badge>
          </div>
        ) : null}

        {error ? (
          <p role="alert" className="text-sm text-error">
            {error}
          </p>
        ) : null}

        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          className="sr-only"
          aria-label={`Enviar ${title}`}
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) void handleFile(file);
            event.target.value = "";
          }}
        />

        <div className="flex flex-wrap gap-3">
          <Button
            type="button"
            variant={existing ? "outline" : "default"}
            disabled={isBusy}
            onClick={() => inputRef.current?.click()}
          >
            {isBusy ? <Spinner aria-label="Enviando" /> : <Upload aria-hidden="true" strokeWidth={1.75} />}
            {existing ? "Substituir PDF" : "Enviar PDF"}
          </Button>
          {existing ? (
            <Button
              type="button"
              variant="ghost"
              disabled={isBusy}
              onClick={() => void handleRemove()}
            >
              <Trash2 aria-hidden="true" strokeWidth={1.75} />
              Remover
            </Button>
          ) : null}
        </div>

        {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
      </CardContent>
    </Card>
  );
}
