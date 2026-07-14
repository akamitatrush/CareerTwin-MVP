import Link from "next/link";

import { Wordmark } from "@/components/shared/wordmark";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-dvh flex-1 flex-col bg-surface-subtle">
      <header className="border-b border-border bg-background">
        <div className="container-page flex h-16 items-center">
          <Link
            href="/"
            aria-label="CareerTwin — página inicial"
            className="rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/25"
          >
            <Wordmark />
          </Link>
        </div>
      </header>
      <main className="flex flex-1 items-center justify-center px-5 py-12">
        {children}
      </main>
    </div>
  );
}
