"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { heroContent, navigationItems } from "@/data/landing-page";
import { cn } from "@/lib/utils";

function Wordmark() {
  return (
    <span className="text-xl font-extrabold tracking-tight">
      Career<span className="text-primary">Twin</span>
    </span>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background shadow-header">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          aria-label="CareerTwin — página inicial"
          className="rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/25"
        >
          <Wordmark />
        </Link>

        <nav aria-label="Navegação principal" className="hidden items-center gap-1 lg:flex">
          {navigationItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/25"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button variant="ghost" render={<Link href="/login" />}>
            Entrar
          </Button>
          <Button render={<Link href={heroContent.primaryCtaHref} />}>
            {heroContent.primaryCta}
          </Button>
        </div>

        <Sheet>
          <SheetTrigger
            render={
              <Button
                variant="outline"
                size="icon"
                className="lg:hidden"
                aria-label="Abrir menu"
              />
            }
          >
            <Menu strokeWidth={1.75} aria-hidden="true" />
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>
                <Wordmark />
              </SheetTitle>
            </SheetHeader>
            <nav aria-label="Menu" className="flex flex-col gap-1 px-4">
              {navigationItems.map((item) => (
                <SheetClose
                  key={item.href}
                  render={
                    <a
                      href={item.href}
                      className="rounded-lg px-3 py-3 text-base font-medium text-foreground transition-colors outline-none hover:bg-secondary focus-visible:ring-3 focus-visible:ring-ring/25"
                    />
                  }
                >
                  {item.label}
                </SheetClose>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-3 p-4">
              <SheetClose
                render={
                  <Link
                    href="/login"
                    className={cn(buttonVariants({ variant: "outline" }), "w-full")}
                  />
                }
              >
                Entrar
              </SheetClose>
              <SheetClose
                render={
                  <Link
                    href={heroContent.primaryCtaHref}
                    className={cn(buttonVariants(), "w-full")}
                  />
                }
              >
                {heroContent.primaryCta}
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
