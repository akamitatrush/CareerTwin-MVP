import Link from "next/link";
import { Building2 } from "lucide-react";

import { OrganicShape } from "@/components/shared/organic-shape";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { finalCta } from "@/data/landing-page";

/** Faixa curta "Para empresas" — âncora da navegação (#empresas). */
export function ForCompaniesStrip() {
  return (
    <section
      id="empresas"
      aria-labelledby="empresas-title"
      className="scroll-mt-16 border-t border-border bg-surface-subtle py-12"
    >
      <div className="container-page flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-8">
        <div className="flex items-start gap-4">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary">
            <Building2 aria-hidden="true" strokeWidth={1.75} className="size-6" />
          </span>
          <div>
            <h2 id="empresas-title" className="text-lg font-bold">
              CareerTwin para empresas
            </h2>
            <p className="mt-1 max-w-[60ch] text-sm text-muted-foreground">
              Leve o desenvolvimento de carreira com IA para o seu time — programas
              de outplacement, mobilidade interna e evolução profissional.
            </p>
          </div>
        </div>
        <Badge variant="secondary" className="shrink-0">
          Em breve
        </Badge>
      </div>
    </section>
  );
}

export function FinalCtaSection() {
  return (
    <section aria-labelledby="final-cta-title" className="section-padding overflow-x-clip">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-2xl bg-primary-soft px-6 py-12 md:px-12 md:py-16">
          <OrganicShape
            className="absolute -top-40 -right-24 w-[28rem] text-primary-soft-hover"
          />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
            <div className="max-w-2xl">
              <h2 id="final-cta-title" className="text-h3 text-balance md:text-h2">
                {finalCta.title}
              </h2>
              <p className="mt-3 text-base text-muted-foreground md:text-lg">
                {finalCta.description}
              </p>
            </div>
            <Button
              size="lg"
              className="w-full shrink-0 lg:w-auto"
              render={<Link href={finalCta.ctaHref} />}
            >
              {finalCta.cta}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
