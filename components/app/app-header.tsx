import Link from "next/link";
import { LogOut } from "lucide-react";

import { logoutAction } from "@/app/(auth)/actions";
import { Wordmark } from "@/components/shared/wordmark";
import { Button } from "@/components/ui/button";

export function AppHeader({ userLabel }: { userLabel?: string }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background shadow-header">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link
          href="/dashboard"
          aria-label="CareerTwin — dashboard"
          className="rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/25"
        >
          <Wordmark />
        </Link>
        <div className="flex items-center gap-3">
          {userLabel ? (
            <span className="hidden max-w-[24ch] truncate text-sm text-muted-foreground sm:inline">
              {userLabel}
            </span>
          ) : null}
          <form action={logoutAction}>
            <Button type="submit" variant="ghost" size="sm">
              <LogOut aria-hidden="true" strokeWidth={1.75} />
              Sair
            </Button>
          </form>
        </div>
      </div>
    </header>
  );
}
