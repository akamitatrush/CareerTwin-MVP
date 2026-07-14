/**
 * Conteúdo da landing page do CareerTwin AI.
 * Fonte única de textos, links e métricas — nunca hardcodar nos componentes.
 * Métricas da seção Resultados são demonstrativas até haver dados reais.
 */

export interface NavigationItem {
  label: string;
  href: string;
}

export const navigationItems: NavigationItem[] = [
  { label: "Soluções", href: "#solucoes" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Resultados", href: "#resultados" },
  { label: "Para empresas", href: "#empresas" },
];

export const heroContent = {
  eyebrow: "Seu próximo passo profissional começa aqui",
  titleLines: ["Evolua.", "Reposicione-se.", "Conquiste."],
  highlight: "Conquiste.",
  description:
    "A plataforma completa para impulsionar sua carreira com clareza, estratégia e oportunidades reais.",
  primaryCta: "Começar agora",
  primaryCtaHref: "/cadastro",
  secondaryCta: "Conhecer a plataforma",
  secondaryCtaHref: "#solucoes",
  microcopy: "Comece gratuitamente. Sem cartão de crédito.",
} as const;

export const heroPreview = {
  title: "Aderência à vaga",
  role: "Product Manager Sênior",
  badge: "Alta aderência",
  score: 82,
  recommendation:
    "Destaque resultados mensuráveis no resumo do seu perfil para fortalecer a candidatura.",
} as const;

export const trustBar = {
  message:
    "Profissionais de diferentes empresas já estão evoluindo com a CareerTwin.",
  companies: ["TechCorp", "Nexa Digital", "Grupo Vetor", "Lumen Bank", "Alta Consultoria"],
} as const;

export interface HowItWorksStep {
  title: string;
  description: string;
  icon: "FileUser" | "Target" | "SearchCheck" | "Trophy";
}

export const howItWorksSection = {
  title: "Como a CareerTwin funciona",
  description:
    "Um processo inteligente e objetivo para transformar sua experiência em oportunidades.",
} as const;

export const howItWorksSteps: HowItWorksStep[] = [
  {
    title: "Envie seu perfil",
    description:
      "Adicione seu currículo e as informações principais da sua trajetória profissional.",
    icon: "FileUser",
  },
  {
    title: "Defina sua meta",
    description:
      "Informe o cargo, a área ou a oportunidade que deseja conquistar.",
    icon: "Target",
  },
  {
    title: "Analise sua aderência",
    description:
      "Identifique pontos fortes, lacunas e melhorias prioritárias para seu posicionamento.",
    icon: "SearchCheck",
  },
  {
    title: "Conquiste seu lugar",
    description:
      "Receba um plano prático para fortalecer sua candidatura e evoluir profissionalmente.",
    icon: "Trophy",
  },
];

export interface Feature {
  id: string;
  tabLabel: string;
  title: string;
  description: string;
  benefits?: string[];
  example?: { before: string; after: string };
}

export const featuresSection = {
  title: "Tudo o que você precisa para avançar na carreira",
} as const;

export const features: Feature[] = [
  {
    id: "curriculo-linkedin",
    tabLabel: "Currículo e LinkedIn",
    title: "Recomendações para currículo e LinkedIn",
    description:
      "Receba orientações práticas para melhorar clareza, posicionamento, palavras-chave e aderência aos padrões atuais de recrutamento.",
    benefits: [
      "Melhoria do resumo profissional",
      "Destaque de resultados mensuráveis",
      "Otimização de palavras-chave",
      "Reorganização das experiências",
      "Priorização das ações de maior impacto",
    ],
  },
  {
    id: "aderencia",
    tabLabel: "Aderência à vaga",
    title: "Diagnóstico de aderência ao cargo e à vaga",
    description:
      "Compare sua trajetória com um cargo-alvo ou uma vaga específica e compreenda sua compatibilidade de maneira objetiva.",
    benefits: [
      "Percentual de aderência",
      "Pontos fortes",
      "Lacunas profissionais",
      "Riscos da candidatura",
      "Melhorias recomendadas",
    ],
  },
  {
    id: "traducao-contextual",
    tabLabel: "Tradução da experiência",
    title: "Tradução contextual da experiência",
    description:
      "Transforme descrições informais em uma linguagem clara, estratégica e compatível com o mercado.",
    example: {
      before: "Organizava as tarefas do setor.",
      after:
        "Coordenava a rotina operacional e acompanhava a execução das atividades da área.",
    },
  },
  {
    id: "plano-evolucao",
    tabLabel: "Plano de evolução",
    title: "Plano de evolução profissional",
    description:
      "Receba um plano priorizado com ações de curto, médio e longo prazo para alcançar seu próximo objetivo profissional.",
    benefits: [
      "Ações prioritárias",
      "Nível de impacto",
      "Nível de esforço",
      "Prazo recomendado",
      "Acompanhamento da evolução",
    ],
  },
];

export interface Metric {
  value: string;
  label: string;
}

export const resultsSection = {
  title: "Resultados que transformam carreiras",
} as const;

/** Conteúdo demonstrativo — substituir quando houver dados reais. */
export const metrics: Metric[] = [
  { value: "4x", label: "mais clareza no posicionamento" },
  { value: "70%", label: "mais confiança nas candidaturas" },
  { value: "85%", label: "identificam melhorias prioritárias" },
  { value: "2.500+", label: "recomendações personalizadas" },
];

export const testimonial = {
  quote:
    "A CareerTwin me ajudou a enxergar o que realmente precisava mudar no meu currículo e no meu posicionamento. Passei a me candidatar com muito mais clareza e confiança.",
  name: "Mariana Alves",
  role: "Product Designer",
  rating: 5,
} as const;

export const finalCta = {
  title: "Pronto para evoluir, se reposicionar e conquistar seu próximo capítulo?",
  description:
    "Descubra como transformar sua experiência em um posicionamento mais competitivo.",
  cta: "Começar agora gratuitamente",
  ctaHref: "/cadastro",
} as const;

export interface FooterGroup {
  title: string;
  links: { label: string; href: string }[];
}

export const footerDescription =
  "A CareerTwin ajuda profissionais a compreender, comunicar e desenvolver melhor sua trajetória profissional.";

export const footerGroups: FooterGroup[] = [
  {
    title: "Produto",
    links: [
      { label: "Como funciona", href: "#como-funciona" },
      { label: "Funcionalidades", href: "#solucoes" },
      { label: "Para empresas", href: "#empresas" },
      { label: "Preços", href: "/cadastro" },
    ],
  },
  {
    title: "Recursos",
    links: [
      { label: "Conteúdos", href: "#" },
      { label: "Guia de carreira", href: "#" },
      { label: "Modelos de currículo", href: "#" },
      { label: "Central de ajuda", href: "#" },
    ],
  },
  {
    title: "Institucional",
    links: [
      { label: "Sobre nós", href: "#" },
      { label: "Contato", href: "#" },
      { label: "Trabalhe conosco", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Termos de uso", href: "#" },
      { label: "Política de privacidade", href: "#" },
      { label: "Cookies", href: "#" },
    ],
  },
];

export const socialNetworks = ["LinkedIn", "Instagram", "YouTube"] as const;
