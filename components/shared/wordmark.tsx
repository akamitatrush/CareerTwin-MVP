import { cn } from "@/lib/utils";

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("text-xl font-extrabold tracking-tight", className)}>
      Career<span className="text-primary">Twin</span>
    </span>
  );
}
