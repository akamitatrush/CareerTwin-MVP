import { CheckCircle2 } from "lucide-react";

import { SectionHeading } from "@/components/shared/section-heading";
import {
  AdherencePreview,
  ChecklistPreview,
  PlanPreview,
  TranslationPreview,
} from "@/components/shared/product-preview";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { features, featuresSection, heroPreview } from "@/data/landing-page";
import type { Feature } from "@/data/landing-page";

function FeaturePreview({ feature }: { feature: Feature }) {
  switch (feature.id) {
    case "aderencia":
      return (
        <AdherencePreview
          title="Aderência à vaga"
          role={heroPreview.role}
          badge={heroPreview.badge}
          score={heroPreview.score}
          recommendation={heroPreview.recommendation}
        />
      );
    case "traducao-contextual":
      return feature.example ? (
        <TranslationPreview
          before={feature.example.before}
          after={feature.example.after}
        />
      ) : null;
    case "plano-evolucao":
      return <PlanPreview />;
    default:
      return <ChecklistPreview />;
  }
}

function FeaturePanel({
  feature,
  headingLevel = "h3",
}: {
  feature: Feature;
  headingLevel?: "h3" | "p";
}) {
  const Heading = headingLevel;
  return (
    <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
      <div className="flex flex-col items-start gap-4">
        <Heading className="text-h3 text-balance">{feature.title}</Heading>
        <p className="text-base text-muted-foreground">{feature.description}</p>
        {feature.benefits ? (
          <ul className="mt-2 flex flex-col gap-3">
            {feature.benefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-3 text-sm">
                <CheckCircle2
                  aria-hidden="true"
                  strokeWidth={1.75}
                  className="size-4.5 shrink-0 text-primary"
                />
                {benefit}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      <div className="w-full max-w-md lg:justify-self-end">
        <FeaturePreview feature={feature} />
      </div>
    </div>
  );
}

export function FeaturesSection() {
  return (
    <section
      id="solucoes"
      aria-labelledby="solucoes-title"
      className="section-padding scroll-mt-16 border-y border-border bg-surface-subtle"
    >
      <div className="container-page">
        <SectionHeading
          id="solucoes-title"
          align="center"
          title={featuresSection.title}
        />

        {/* Desktop e tablet: Tabs */}
        <Tabs
          defaultValue={features[0].id}
          className="mt-10 hidden md:flex md:gap-8"
        >
          <TabsList className="mx-auto w-full max-w-full justify-start overflow-x-auto xl:w-fit">
            {features.map((feature) => (
              <TabsTrigger key={feature.id} value={feature.id}>
                {feature.tabLabel}
              </TabsTrigger>
            ))}
          </TabsList>
          {features.map((feature) => (
            <TabsContent key={feature.id} value={feature.id}>
              <FeaturePanel feature={feature} />
            </TabsContent>
          ))}
        </Tabs>

        {/* Mobile: Accordion */}
        <Accordion className="mt-8 md:hidden" defaultValue={[features[0].id]}>
          {features.map((feature) => (
            <AccordionItem key={feature.id} value={feature.id}>
              <AccordionTrigger>{feature.title}</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-6">
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                  {feature.benefits ? (
                    <ul className="flex flex-col gap-3">
                      {feature.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-center gap-3 text-sm">
                          <CheckCircle2
                            aria-hidden="true"
                            strokeWidth={1.75}
                            className="size-4.5 shrink-0 text-primary"
                          />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  <FeaturePreview feature={feature} />
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
