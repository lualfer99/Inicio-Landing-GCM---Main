import type { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import GestoriaHeroSection from "@/components/gestoria-hero-section"
import GestoriaStatsSection from "@/components/gestoria-stats-section"
import GestoriaTestimonialsSection from "@/components/gestoria-testimonials-section"
import GestoriaServicesSection from "@/components/gestoria-services-section"
import GestoriaFullServiceSection from "@/components/gestoria-full-service-section"
import GestoriaProcessSection from "@/components/gestoria-process-section"
import GestoriaFAQSection from "@/components/gestoria-faq-section"
import ConsultationSection from "@/components/consultation-section"

export const metadata: Metadata = {
  title: "Gestoría para LLCs | GCMAsesores.io - Gestión Fiscal Completa",
  description:
    "Gestoría especializada en LLCs para emprendedores digitales. Nos encargamos de todos los trámites fiscales y administrativos en EE.UU. y España de manera 100% legal.",
  keywords: "gestoría LLC, gestión fiscal LLC, trámites LLC España, declaraciones LLC USA, asesoría fiscal digital",
  openGraph: {
    title: "Gestoría para LLCs | GCMAsesores.io",
    description:
      "Gestión fiscal completa para tu LLC. Declaraciones en EE.UU. y España, reportes BOI, y soporte fiscal ilimitado.",
    url: "https://gcmasesores.io/gestoria-para-llcs",
    siteName: "GCMAsesores.io",
    locale: "es_ES",
    type: "website",
  },
}

export default function GestoriaParaLLCsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <GestoriaHeroSection />
        <GestoriaStatsSection />
        <GestoriaTestimonialsSection />
        <GestoriaServicesSection />
        <GestoriaFullServiceSection />
        <GestoriaProcessSection />
        <GestoriaFAQSection />
        <ConsultationSection />
      </main>
      <Footer />
    </div>
  )
}
