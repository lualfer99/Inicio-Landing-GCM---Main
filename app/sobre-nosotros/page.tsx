import type { Metadata } from "next"
import OptimizedHeader from "@/components/optimized-header"
import OptimizedFooter from "@/components/optimized-footer"
import StatsSection from "@/components/stats-section"
import TrustpilotTestimonialsSection from "@/components/trustpilot-testimonials-section"
import ProcessSection from "@/components/process-section"
import FAQSection from "@/components/faq-section"
import ConsultationSection from "@/components/consultation-section"
import OptimizedImage from "@/components/image-optimization"
import { Button } from "@/components/ui/button"
import { Calendar, Monitor } from "lucide-react"

export const metadata: Metadata = {
  title: "Sobre Nosotros - GCM Asesores | Expertos en LLCs y Optimización Fiscal",
  description:
    "Conoce a GCM Asesores, expertos en fiscalidad internacional para negocios digitales. Nuestra misión es ayudarte a escalar tu empresa con optimización fiscal.",
  keywords: "sobre nosotros, GCM Asesores, LLC, fiscalidad internacional, negocios digitales, optimización fiscal",
  openGraph: {
    title: "Sobre Nosotros - GCM Asesores",
    description: "Expertos en fiscalidad internacional para negocios digitales. Nuestro compromiso es tu éxito.",
    images: ["/images/logo-blue.png"],
  },
}

export default function SobreNosotrosPage() {
  const handleConsultationClick = () => {
    const element = document.querySelector("#consulta")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <OptimizedHeader />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 lg:px-6 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-600/5 rounded-full blur-3xl"></div>
        <div className="absolute top-40 left-10 w-96 h-96 bg-blue-600/3 rounded-full blur-3xl"></div>

        <div className="container mx-auto max-w-6xl relative">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Sobre <span className="text-blue-600">Nosotros</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              Somos expertos en fiscalidad internacional especializada en negocios digitales
            </p>
          </div>

          {/* Mission, Vision, Values */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Mission */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Nuestra Misión</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Ayudar a emprendedores y empresarios digitales a escalar sus negocios mediante estrategias de
                optimización fiscal internacional, proporcionando soluciones legales y eficientes.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Nuestra Visión</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Ser la referencia en habla hispana en asesoría fiscal internacional para negocios digitales,
              </p>
            </div>

            {/* Values */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Nuestros Valores</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Transparencia, excelencia profesional, innovación constante y compromiso absoluto con el éxito de
                nuestros clientes. Creemos en relaciones a largo plazo basadas en la confianza mutua.
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center mb-4">
            <Button
              size="lg"
              className="btn-primary text-lg md:text-xl px-8 md:px-12 py-4 md:py-6 text-white font-bold rounded-2xl mb-6 flex items-center"
              onClick={() => handleConsultationClick()}
            >
              <Calendar className="w-5 md:w-6 h-5 md:h-6 mr-2" />
              ASESORÍA FISCAL GRATUITA
            </Button>
          </div>


          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-gray-100">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Content */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-8">UN ENFOQUE EN LO DIGITAL</h2>
                <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                  <p>
                    En GCM, sabemos que la era digital está en pleno crecimiento, y por eso nuestro enfoque principal se
                    basa en cubrir las necesidades que emergen en las nuevas{" "}
                    <span className="font-semibold text-blue-600">profesiones digitales</span>.
                  </p>
                  <p>
                    La <span className="font-semibold text-blue-600">optimización fiscal</span> es un elemento muy
                    importante a la hora de asegurar el éxito empresarial, en GCM{" "}
                    <span className="font-semibold text-blue-600">nos encargamos por ti</span>.
                  </p>
                </div>
              </div>

              {/* Right Side - Digital Icon */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-64 h-64 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-2xl">
                    <Monitor className="w-32 h-32 text-white" />
                  </div>
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-white rounded-full shadow-lg"></div>
                  <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-300 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Digital Focus Section */}
          <div className="mt-20 bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>

            <div className="relative z-10 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Enfoque 100% Digital</h2>
              <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
                Entendemos las necesidades específicas de los negocios digitales modernos. Desde e-commerce hasta
                servicios SaaS, nuestras estrategias están diseñadas para la economía digital del siglo XXI.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Existing Components */}
      <StatsSection />
      <TrustpilotTestimonialsSection />
      <ProcessSection />
      <FAQSection />
      <ConsultationSection />

      <OptimizedFooter />
    </div>
  )
}
