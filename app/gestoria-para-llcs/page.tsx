import type { Metadata } from "next"
import GestoriaHeroSection from "@/components/gestoria-hero-section"
import GestoriaServicesSection from "@/components/gestoria-services-section"
import GestoriaFullServiceSection from "@/components/gestoria-full-service-section"
import ConsultationSection from "@/components/consultation-section"
import StatsSection from "@/components/stats-section"
import TrustpilotTestimonialsSection from "@/components/trustpilot-testimonials-section"
import ProcessSection from "@/components/process-section"
import FAQSection from "@/components/faq-section"
import OptimizedHeader from "@/components/optimized-header"
import OptimizedFooter from "@/components/optimized-footer"

export const metadata: Metadata = {
  metadataBase: new URL("https://gcmasesores.io"),
  title: {
    default: "Gestoría para LLCs | GCMAsesores.io - Gestión Fiscal Completa",
    template: "%s | GCMAsesores.io",
  },
  description:
    "Gestoría especializada en LLCs para emprendedores digitales. Nos encargamos de todos los trámites fiscales y administrativos en EE.UU. y España de manera 100% legal.",
  keywords: [
    "gestoría LLC",
    "gestoría fiscal LLC",
    "gestoría online LLC",
    "gestoría digital LLC",
    "servicios gestoría LLC",
    "asesoría fiscal LLC",
    "gestoría LLC España",
    "gestoría LLC EEUU",
    "gestoría international LLC",
    "gestoría multimercado LLC",
    "gestor fiscal para LLC",
    "contabilidad LLC",
    "servicios contables LLC",
    "preparación impuestos LLC",
    "declaración impuestos LLC",
    "reportes BOI LLC",
    "compliance LLC",
    "compliance fiscal internacional",
    "FATCA LLC",
    "CRS LLC",
    "asistencia tributaria LLC",
    "tax compliance LLC",
    "gestión administrativa LLC",
    "administración LLC",
    "servicio contable para LLC",
    "LLC Estados Unidos",
    "crear LLC EEUU",
    "abrir LLC USA",
    "constitución LLC",
    "registro LLC EEUU",
    "formación de LLC",
    "trámites LLC",
    "LLC online",
    "EIN LLC",
    "ITIN trámite",
    "optimización fiscal LLC",
    "beneficios fiscales LLC",
    "tax benefits LLC",
    "planificación fiscal internacional",
    "tratados fiscales EEUU España",
    "emprendedores digitales",
    "digital nomad LLC",
    "nomadismo digital fiscal",
    "residencia fiscal digital",
    "vida de nómada digital",
    "gestoría LLC desde España",
    "gestoría LLC desde Madrid",
    "gestoría LLC Barcelona",
    "gestoría LLC Valencia",
    "cómo contratar gestoría LLC",
    "¿qué hace una gestoría LLC?",
    "¿por qué necesitar gestoría LLC?",
    "mejor gestoría LLC 2025",
    "asesoría fiscal digital LLC",
    "mejor gestoría LLC",
    "rápida gestoría LLC",
    "económico gestoría LLC",
    "profesional gestoría LLC",
    "100% legal gestoría LLC",
  ],
  authors: [{ name: "GCMAsesores.io", url: "https://gcmasesores.io/#proceso" }],
  creator: "GCMAsesores.io",
  publisher: "GCMAsesores.io",
  alternates: { canonical: "/gestoria-para-llcs" },
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  verification: {
    google: "google-site-verification-code",
    bing: "bing-site-verification-code",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Gestoría para LLCs | GCMAsesores.io",
    description:
      "Gestión fiscal completa para tu LLC. Declaraciones en EE.UU. y España, reportes BOI, y soporte fiscal ilimitado.",
    url: "https://gcmasesores.io/gestoria-para-llcs",
    siteName: "GCMAsesores.io",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "https://gcmasesores.io/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Gestoría para LLCs | GCMAsesores.io",
      },
    ],
  },
}

export default function GestoriaParaLLCsPage() {
  return (
    <div className="min-h-screen bg-white">
      <OptimizedHeader />
      <main>
        <GestoriaHeroSection />
        <StatsSection />
        <TrustpilotTestimonialsSection />
        <GestoriaServicesSection />
        <GestoriaFullServiceSection />
        <ProcessSection />
        <FAQSection />
        <ConsultationSection />
      </main>
      <OptimizedFooter />
    </div>
  )
}
