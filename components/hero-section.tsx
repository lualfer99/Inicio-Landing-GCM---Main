"use client"

import { Button } from "@/components/ui/button"
import { Calendar, Shield, Zap, TrendingUp } from "lucide-react"
import { useEffect, useState } from "react"

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleCTAClick = () => {
    const element = document.querySelector("#consulta")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      id="inicio"
      className="pt-32 pb-20 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 relative overflow-hidden min-h-screen flex items-center"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-20 right-10 w-72 h-72 bg-blue-600/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-600/3 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 lg:px-6 relative w-full">
        <div
          className={`max-w-5xl mx-auto text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-600/10 text-blue-600 px-6 py-3 rounded-full text-sm font-semibold mb-8">
            <Shield className="w-4 h-4" />
            100% Legal y Seguro
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            OPTIMIZA TU FISCALIDAD DE{" "}
            <span className="text-blue-600 relative">
              MANERA 100% LEGAL
            </span>
          </h1>

          <h2 className="text-xl md:text-2xl lg:text-3xl text-blue-600 font-bold mb-8">
            Si vendes servicios digitales
          </h2>

          <p className="text-md md:text-xl lg:text-xl text-gray-600 mb-12 max-w-5xl mx-auto leading-relaxed">
            En GCM, ayudamos a cientos de empresarios digitales como tú a{" "}
            <span className="text-blue-600 font-semibold">optimizarse fiscalmente</span> aprovechando las ventajas de
            crear una LLC en EE.UU.
          </p>
          {/* Video Section */}
          <div className="relative max-w-4xl mx-auto mb-12">
            <div className="aspect-video bg-gray-900 rounded-2xl md:rounded-3xl overflow-hidden relative shadow-2xl border-4 border-white">
              <iframe
                src="https://dailymotion.com/embed/video/k5UwAMFEaaUzFADifdI?autoplay=0&playsinline=1&ui-highlight&start&endscreen-enable=0&controls=1&mute=0&ui-start-screen-info=1&ui-logo=1"
                width="100%"
                height="100%"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
                title="Video estrategia fiscal LLC"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
            </div>
          </div>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-12">
            <div className="flex items-center gap-2 bg-white px-4 md:px-6 py-3 rounded-full shadow-md border border-gray-100">
              <Zap className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-gray-700 text-sm md:text-base">Proceso en 7 días</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 md:px-6 py-3 rounded-full shadow-md border border-gray-100">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-gray-700 text-sm md:text-base">0% Impuestos en EE.UU</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 md:px-6 py-3 rounded-full shadow-md border border-gray-100">
              <Shield className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-gray-700 text-sm md:text-base">100% Online</span>
            </div>
          </div>
          <div>
            <Button
              size="lg"
              className="btn-primary text-lg md:text-xl px-8 md:px-12 py-4 md:py-6 text-white font-bold rounded-2xl"
              onClick={handleCTAClick}
            >
              <Calendar className="w-5 md:w-6 h-5 md:h-6 mr-2" />
              ASESORÍA FISCAL GRATUITA
            </Button>
            <p className="text-sm text-gray-500 mt-4">⚡ Respuesta en menos de 24 horas • 🔒 Sin compromiso</p>
          </div>
        </div>
      </div>
    </section>
  )
}
