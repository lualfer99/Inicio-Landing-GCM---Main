import type { Metadata } from "next"
import OptimizedHeader from "@/components/optimized-header"
import HeroSection from "@/components/hero-section"
import StatsSection from "@/components/stats-section"
import OptimizedTestimonialsSection from "@/components/optimized-testimonials-section"
import BenefitsSection from "@/components/benefits-section"
import ServicesSection from "@/components/services-section"
import ProcessSection from "@/components/process-section"
import FAQSection from "@/components/faq-section"
import ConsultationSection from "@/components/consultation-section"
import OptimizedFooter from "@/components/optimized-footer"

export const metadata: Metadata = {
  title: "GCMAsesores.io - Optimiza tu fiscalidad creando una LLC en EE.UU.",
  description:
    "Especialistas en creación y gestión fiscal de LLCs para emprendedores digitales. Optimiza tu fiscalidad de manera 100% legal con nuestros expertos.",
  keywords: "LLC Estados Unidos, optimización fiscal, emprendedores digitales, gestoría fiscal, crear LLC EEUU",
  openGraph: {
    title: "GCMAsesores.io - Optimiza tu fiscalidad creando una LLC en EE.UU.",
    description: "Especialistas en creación y gestión fiscal de LLCs para emprendedores digitales.",
    type: "website",
    locale: "es_ES",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <OptimizedHeader />
      <HeroSection />
      <StatsSection />
      <OptimizedTestimonialsSection />
      <BenefitsSection />
      <ServicesSection />
      <ProcessSection />
      <FAQSection />
      <ConsultationSection />
      <OptimizedFooter />
    </main>
  )
}
