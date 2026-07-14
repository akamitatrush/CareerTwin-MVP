import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { OrganicShape } from "@/components/shared/organic-shape";
import { AdherencePreview } from "@/components/shared/product-preview";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { heroContent, heroPreview } from "@/data/landing-page";

export function HeroSection() {
  return (
    <section aria-labelledby="hero-title" className="section-padding overflow-x-clip">
      <div className="container-page grid items-center gap-16 lg:grid-cols-2">
        <div className="flex flex-col items-start gap-6 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-500">
          <Badge>{heroContent.eyebrow}</Badge>
          <h1
            id="hero-title"
            className="text-display-sm text-balance md:text-display-md xl:text-display"
          >
            {heroContent.titleLines.map((line) => (
              <span
                key={line}
                className={`block ${line === heroContent.highlight ? "text-primary" : ""}`}
              >
                {line}
              </span>
            ))}
          </h1>
          <p className="max-w-[52ch] text-lg text-muted-foreground">
            {heroContent.description}
          </p>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button
              className="w-full sm:w-auto"
              render={<Link href={heroContent.primaryCtaHref} />}
            >
              {heroContent.primaryCta}
              <ArrowRight aria-hidden="true" strokeWidth={1.75} />
            </Button>
            <Button
              variant="outline"
              className="w-full sm:w-auto"
              render={<a href={heroContent.secondaryCtaHref} />}
            >
              {heroContent.secondaryCta}
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">{heroContent.microcopy}</p>
        </div>

        <div className="relative motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:fill-mode-both motion-safe:delay-150 motion-safe:duration-500 lg:justify-self-end">
          <OrganicShape className="absolute left-1/2 top-1/2 w-[130%] max-w-none -translate-x-1/2 -translate-y-1/2 rotate-12 text-primary-soft" />
          <AdherencePreview
            title={heroPreview.title}
            role={heroPreview.role}
            badge={heroPreview.badge}
            score={heroPreview.score}
            recommendation={heroPreview.recommendation}
            className="relative w-full max-w-md shadow-floating"
          />
        </div>
      </div>
    </section>
  );
}
