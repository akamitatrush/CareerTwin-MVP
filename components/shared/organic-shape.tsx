import { cn } from "@/lib/utils";

/**
 * Forma orgânica decorativa usada atrás de fotos e previews de produto.
 * A cor vem de `currentColor` — aplique classes como `text-primary-soft`.
 */
export function OrganicShape({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 600"
      aria-hidden="true"
      focusable="false"
      fill="currentColor"
      className={cn("pointer-events-none select-none", className)}
    >
      <path d="M437.5,306.5Q419,363,371.5,401.5Q324,440,259.5,437Q195,434,144.5,394.5Q94,355,84.5,289.5Q75,224,117,172.5Q159,121,219.5,96.5Q280,72,341.5,94.5Q403,117,429.5,183.5Q456,250,437.5,306.5Z" />
    </svg>
  );
}
