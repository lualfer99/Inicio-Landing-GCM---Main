"use client"

import { Button } from "@/components/ui/button"
import { Shield, Calendar, CheckCircle, Building } from "lucide-react"
import { useEffect, useState } from "react"

export default function GestoriaHeroSection() {
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
    <section className="pt-32 pb-20 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 relative overflow-hidden min-h-screen flex items-center">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-20 right-10 w-72 h-72 bg-blue-600/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-600/3 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 lg:px-6 relative w-full">
        <div
          className={`max-w-6xl mx-auto transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-blue-600/10 text-blue-600 px-6 py-3 rounded-full text-sm font-semibold mb-8">
                <Shield className="w-4 h-4" />
                Gestoría Especializada
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Gestiona tu LLC con <span className="text-blue-600 relative">seguridad</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                Somos tu gestoría especializada en LLCs para emprendedores digitales. Nos encargamos de todo, tanto en{" "}
                <span className="text-blue-600 font-semibold">EE.UU. como en España</span>.
              </p>

              {/* Features */}
              <div className="flex flex-wrap gap-4 mb-8 justify-center lg:justify-start">
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md border border-gray-100">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="font-medium text-gray-700 text-sm">Declaraciones USA</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md border border-gray-100">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="font-medium text-gray-700 text-sm">Gestión España</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md border border-gray-100">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="font-medium text-gray-700 text-sm">Soporte 24/7</span>
                </div>
              </div>

              <div>
                <Button
                  size="lg"
                  className="btn-primary text-lg px-8 py-4 text-white font-bold rounded-2xl shadow-primary-lg hover:shadow-primary border-2 border-blue-600 hover:border-blue-700 transition-all duration-300"
                  onClick={handleCTAClick}
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  AGENDAR ASESORÍA FISCAL
                </Button>
                <p className="text-sm text-gray-500 mt-4">⚡ Respuesta en menos de 24 horas • 🔒 Sin compromiso</p>
              </div>
            </div>

            {/* Right Content - Visual */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="w-80 h-80 bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl flex items-center justify-center shadow-2xl border-4 border-white">
                  <Building className="w-32 h-32 text-white" />
                </div>
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 bg-green-500 text-white p-3 rounded-2xl shadow-lg">
                  <Shield className="w-6 h-6" />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-blue-500 text-white p-3 rounded-2xl shadow-lg">
                  <CheckCircle className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
