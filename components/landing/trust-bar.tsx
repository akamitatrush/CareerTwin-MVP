import { trustBar } from "@/data/landing-page";

export function TrustBar() {
  return (
    <section
      aria-label="Empresas cujos profissionais usam a CareerTwin"
      className="border-y border-border bg-surface-subtle py-8"
    >
      <div className="container-page flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-8">
        <p className="max-w-[36ch] text-sm text-muted-foreground">
          {trustBar.message}
        </p>
        <ul className="flex flex-wrap items-center gap-x-8 gap-y-3">
          {trustBar.companies.map((company) => (
            <li
              key={company}
              className="text-sm font-bold tracking-wider text-text-muted uppercase"
            >
              {company}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
