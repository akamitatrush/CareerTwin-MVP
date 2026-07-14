import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import {
  footerDescription,
  footerGroups,
  socialNetworks,
} from "@/data/landing-page";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container-page py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-6">
          <div className="flex flex-col gap-4 lg:col-span-2 lg:pr-8">
            <p className="text-xl font-extrabold tracking-tight">
              Career<span className="text-primary">Twin</span>
            </p>
            <p className="max-w-[40ch] text-sm text-muted-foreground">
              {footerDescription}
            </p>
            <ul className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Redes sociais">
              {socialNetworks.map((network) => (
                <li key={network}>
                  <a
                    href="#"
                    className="rounded text-sm font-semibold text-muted-foreground transition-colors outline-none hover:text-primary-active focus-visible:ring-3 focus-visible:ring-ring/25"
                  >
                    {network}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {footerGroups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="text-sm font-semibold">{group.title}</h2>
              <ul className="mt-4 flex flex-col gap-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("/") ? (
                      <Link
                        href={link.href}
                        className="rounded text-sm text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/25"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="rounded text-sm text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/25"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <Separator className="my-8" />

        <p className="text-sm text-muted-foreground">
          © 2026 CareerTwin. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
