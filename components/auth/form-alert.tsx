import { AlertCircle, CheckCircle2 } from "lucide-react";

import { cn } from "@/lib/utils";

interface FormAlertProps {
  variant: "error" | "success";
  message: string;
}

export function FormAlert({ variant, message }: FormAlertProps) {
  const Icon = variant === "error" ? AlertCircle : CheckCircle2;
  return (
    <div
      role="alert"
      className={cn(
        "flex items-start gap-2.5 rounded-lg border px-3.5 py-3 text-sm",
        variant === "error"
          ? "border-error/20 bg-error-soft text-error"
          : "border-success/20 bg-success-soft text-success",
      )}
    >
      <Icon aria-hidden="true" strokeWidth={1.75} className="mt-0.5 size-4.5 shrink-0" />
      <p>{message}</p>
    </div>
  );
}
