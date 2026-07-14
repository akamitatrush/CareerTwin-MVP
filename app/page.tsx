import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { FeaturesSection } from "@/components/landing/features-section";
import {
  FinalCtaSection,
  ForCompaniesStrip,
} from "@/components/landing/final-cta-section";
import { HeroSection } from "@/components/landing/hero-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { ResultsSection } from "@/components/landing/results-section";
import { TrustBar } from "@/components/landing/trust-bar";

export default function LandingPage() {
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:shadow-floating"
      >
        Pular para o conteúdo
      </a>
      <SiteHeader />
      <main id="conteudo" className="flex-1">
        <HeroSection />
        <TrustBar />
        <HowItWorksSection />
        <FeaturesSection />
        <ResultsSection />
        <ForCompaniesStrip />
        <FinalCtaSection />
      </main>
      <SiteFooter />
    </>
  );
}
