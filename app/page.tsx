import type { Metadata } from "next"
import OptimizedHeader from "@/components/optimized-header"
import HeroSection from "@/components/hero-section"
import StatsSection from "@/components/stats-section"
import TrustpilotTestimonialsSection from "@/components/trustpilot-testimonials-section"
import BenefitsSection from "@/components/benefits-section"
import ServicesSection from "@/components/services-section"
import ProcessSection from "@/components/process-section"
import FAQSection from "@/components/faq-section"
import ConsultationSection from "@/components/consultation-section"
import OptimizedFooter from "@/components/optimized-footer"
import { Poppins } from "next/font/google"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://gcmasesores.io"),
  title: {
    default: "GCMAsesores.io - Optimiza tu fiscalidad creando una LLC en EE.UU.",
    template: "%s | GCMAsesores.io",
  },
  description:
    "Especialistas en creación y gestión fiscal de LLCs para emprendedores digitales. Optimiza tu fiscalidad de manera 100% legal con nuestros expertos.",
  keywords: [
    "LLC Estados Unidos",
    "crear LLC EEUU",
    "abrir LLC USA",
    "constitución LLC",
    "registro LLC EEUU",
    "gestoría LLC",
    "gestoría fiscal LLC",
    "asesoría LLC online",
    "servicios fiscales LLC",
    "contabilidad LLC",
    "optimización fiscal LLC",
    "beneficios fiscales LLC",
    "obligaciones fiscales LLC",
    "reportes BOI LLC",
    "compliance LLC",
    "EIN LLC",
    "ITIN trámite",
    "impuestos LLC EEUU",
    "tax benefits LLC",
    "offshoring fiscal",
    "emprendedores digitales",
    "digital nomad tax",
    "residencia fiscal digital",
    "planificación fiscal internacional",
    "tratados fiscales EEUU España",
    "mejores estados para LLC",
    "protección patrimonial LLC",
    "cómo abrir LLC desde España",
    "gestoría online para LLC",
    "ventajas y desventajas LLC",
    "guía completa creación LLC",
  ],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "GCMAsesores.io - Optimiza tu fiscalidad creando una LLC en EE.UU.",
    description: "Especialistas en creación y gestión fiscal de LLCs para emprendedores digitales.",
    url: "https://gcmasesores.io",
    siteName: "GCMAsesores.io",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "https://gcmasesores.io/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "GCMAsesores.io - Optimiza tu fiscalidad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@gcmasesores",
    creator: "@gcmasesores",
    title: "GCMAsesores.io - Optimiza tu fiscalidad creando una LLC en EE.UU.",
    description: "Especialistas en creación y gestión fiscal de LLCs para emprendedores digitales.",
    images: ["https://gcmasesores.io/twitter-home.jpg"],
  },
}

export default function HomePage() {
  return (
    <div className={`${poppins.variable} min-h-screen flex flex-col bg-white text-gray-900`}>
      <OptimizedHeader />
      <main className="flex-grow">
        <HeroSection />
        <StatsSection />
        <TrustpilotTestimonialsSection />
        <BenefitsSection />
        <ServicesSection />
        <ProcessSection />
        <FAQSection />
        <ConsultationSection />
      </main>
      <OptimizedFooter />
    </div>
  )
}
