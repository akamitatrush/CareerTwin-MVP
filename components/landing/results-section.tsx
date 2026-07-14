import { Star } from "lucide-react";

import { SectionHeading } from "@/components/shared/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { metrics, resultsSection, testimonial } from "@/data/landing-page";

export function ResultsSection() {
  return (
    <section
      id="resultados"
      aria-labelledby="resultados-title"
      className="section-padding scroll-mt-16"
    >
      <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading id="resultados-title" title={resultsSection.title} />
          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8">
            {metrics.map((metric) => (
              <div key={metric.label} className="flex flex-col gap-1">
                <dd className="order-1 text-4xl font-extrabold tracking-tight text-primary tabular-nums md:text-5xl">
                  {metric.value}
                </dd>
                <dt className="order-2 max-w-[22ch] text-sm text-muted-foreground">
                  {metric.label}
                </dt>
              </div>
            ))}
          </dl>
          <p className="mt-8 text-xs text-muted-foreground">
            Dados demonstrativos da fase de validação do produto.
          </p>
        </div>

        <Card className="lg:justify-self-end lg:max-w-lg">
          <CardContent className="flex flex-col gap-6">
            <div
              className="flex gap-1"
              role="img"
              aria-label={`Avaliação: ${testimonial.rating} de 5 estrelas`}
            >
              {Array.from({ length: testimonial.rating }).map((_, index) => (
                <Star
                  key={index}
                  aria-hidden="true"
                  className="size-4.5 fill-primary text-primary"
                />
              ))}
            </div>
            <blockquote className="text-lg leading-relaxed">
              “{testimonial.quote}”
            </blockquote>
            <figcaption className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="flex size-11 items-center justify-center rounded-full bg-primary-soft text-sm font-bold text-primary-active"
              >
                {testimonial.name
                  .split(" ")
                  .map((part) => part[0])
                  .slice(0, 2)
                  .join("")}
              </span>
              <span className="flex flex-col">
                <span className="text-sm font-semibold">{testimonial.name}</span>
                <span className="text-sm text-muted-foreground">
                  {testimonial.role}
                </span>
              </span>
            </figcaption>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
