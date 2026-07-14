import { FileUser, SearchCheck, Target, Trophy } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { SectionHeading } from "@/components/shared/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { howItWorksSection, howItWorksSteps } from "@/data/landing-page";

const stepIcons: Record<string, LucideIcon> = {
  FileUser,
  Target,
  SearchCheck,
  Trophy,
};

export function HowItWorksSection() {
  return (
    <section
      id="como-funciona"
      aria-labelledby="como-funciona-title"
      className="section-padding scroll-mt-16"
    >
      <div className="container-page">
        <SectionHeading
          id="como-funciona-title"
          align="center"
          title={howItWorksSection.title}
          description={howItWorksSection.description}
        />

        <ol className="mt-10 grid gap-6 md:mt-12 md:grid-cols-2 xl:grid-cols-4">
          {howItWorksSteps.map((step, index) => {
            const Icon = stepIcons[step.icon];
            return (
              <li key={step.title}>
                <Card className="h-full motion-safe:transition-[transform,box-shadow] motion-safe:duration-[240ms] motion-safe:ease-out motion-safe:hover:-translate-y-0.5 hover:shadow-floating">
                  <CardContent className="flex h-full flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <span className="flex size-12 items-center justify-center rounded-lg bg-primary-soft text-primary">
                        <Icon aria-hidden="true" strokeWidth={1.75} className="size-6" />
                      </span>
                      <span
                        aria-hidden="true"
                        className="text-3xl font-extrabold text-primary-soft-hover tabular-nums"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
