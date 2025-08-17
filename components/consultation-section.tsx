"use client"

import { useEffect, useRef, useState } from "react"
import { Calendar, Clock, Shield, CheckCircle, MessageCircle, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"

export default function ConsultationSection() {
  const [showFallback, setShowFallback] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const isLoadingRef = useRef(true) // 🔁 Referencia para evitar stale closure
  const pathname = usePathname()
  const calendlyUrl = pathname.includes("gestoria-para-llcs")
    ? "https://calendly.com/d/cndt-ytb-8j3/consulta-fiscal-para-optimizar-una-llc"
    : "https://calendly.com/d/cncj-m4f-7xt/consulta-fiscal-para-crear-una-llc"

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://assets.calendly.com/assets/external/widget.js"
    script.async = true

    script.onload = () => {
      setIsLoading(false)
      isLoadingRef.current = false
    }

    script.onerror = () => {
      setShowFallback(true)
      setIsLoading(false)
      isLoadingRef.current = false
    }

    document.head.appendChild(script)

    const timeoutId = setTimeout(() => {
      if (isLoadingRef.current) {
        setShowFallback(true)
        setIsLoading(false)
      }
    }, 8000)

    return () => {
      clearTimeout(timeoutId)
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [])

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hola, me gustaría agendar una asesoría fiscal gratuita para crear una LLC.")
    window.open(`https://wa.me/13526080344?text=${message}`, "_blank")
  }

  const handleEmailClick = () => {
    const subject = encodeURIComponent("Solicitud de Asesoría Fiscal - LLC")
    const body = encodeURIComponent(`Hola,

Me gustaría agendar una asesoría fiscal gratuita para evaluar si crear una LLC en EE.UU. es adecuado para mi negocio.

Información de contacto:
- Nombre: 
- Email: 
- Teléfono: 
- Tipo de negocio: 

Gracias,`)

    window.open(`mailto:info@gcmasesores.io?subject=${subject}&body=${body}`, "_blank")
  }

  const handlePhoneClick = () => {
    window.open("tel:+13526080344", "_blank")
  }

  const handleRetry = () => {
    setIsLoading(true)
    setShowFallback(false)
    isLoadingRef.current = true
    window.location.reload()
  }

  return (
    <section id="consulta" className="py-10 gradient-bg relative overflow-hidden">
      {/* Backgrounds */}
      <div className="absolute inset-0 bg-black/5"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-semibold mb-8">
            <Calendar className="w-4 h-4" />
            Agenda tu Consulta
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8">Agenda ya tu asesoría</h2>

          <p className="text-lg md:text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Una reunión de 30 minutos con un asesor fiscal experto donde verás si la LLC se puede aplicar a tu empresa
            de manera segura
          </p>

          {/* Calendly Section */}
          <div className="bg-white rounded-3xl p-2 md:p-4 shadow-2xl border-4 border-white/20 backdrop-blur-sm mb-8">
            <div className="w-full overflow-hidden rounded-2xl">
              {isLoading && !showFallback && (
                <div className="flex items-center justify-center h-96 bg-gray-50 rounded-2xl">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 font-medium">Cargando calendario...</p>
                    <p className="text-sm text-gray-500 mt-2">Esto puede tomar unos segundos</p>
                  </div>
                </div>
              )}

              {!showFallback && (
              <div
                className="calendly-inline-widget"
                data-url={calendlyUrl}
                style={{
                  minWidth: "100%",
                  width: "100%",
                  height: "800px",
                }}
              />
              )}

              {showFallback && (
                <div className="p-8">
                  <div className="text-center mb-8">
                    <Calendar className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Agenda tu Asesoría Fiscal Gratuita</h3>
                    <p className="text-gray-600 mb-4">
                      El calendario no se pudo cargar. Contáctanos directamente por cualquiera de estos medios:
                    </p>
                    <Button onClick={handleRetry} variant="outline" className="mb-6 bg-transparent">
                      Reintentar cargar calendario
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* WhatsApp */}
                    <div className="text-center p-6 bg-green-50 rounded-2xl border border-green-200 hover:border-green-300 transition-colors">
                      <MessageCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                      <h4 className="font-bold text-gray-900 mb-2">WhatsApp</h4>
                      <p className="text-sm text-gray-600 mb-4">Respuesta inmediata</p>
                      <Button
                        onClick={handleWhatsAppClick}
                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                      >
                        Escribir por WhatsApp
                      </Button>
                    </div>

                    {/* Phone */}
                    <div className="text-center p-6 bg-blue-50 rounded-2xl border border-blue-200 hover:border-blue-300 transition-colors">
                      <Phone className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                      <h4 className="font-bold text-gray-900 mb-2">Llamada</h4>
                      <p className="text-sm text-gray-600 mb-4">Habla directamente</p>
                      <Button onClick={handlePhoneClick} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        +1 352 608 0344
                      </Button>
                    </div>

                    {/* Email */}
                    <div className="text-center p-6 bg-purple-50 rounded-2xl border border-purple-200 hover:border-purple-300 transition-colors">
                      <Mail className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                      <h4 className="font-bold text-gray-900 mb-2">Email</h4>
                      <p className="text-sm text-gray-600 mb-4">Consulta detallada</p>
                      <Button
                        onClick={handleEmailClick}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                      >
                        Enviar Email
                      </Button>
                    </div>
                  </div>

                  <div className="p-6 bg-gray-50 rounded-2xl">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Clock className="w-5 h-5 text-gray-600" />
                      <span className="font-semibold text-gray-900">Horarios de Atención</span>
                    </div>
                    <div className="text-center text-sm text-gray-600 space-y-1">
                      <p>
                        <strong>Lunes a Viernes:</strong> 9:00 AM - 6:00 PM (EST)
                      </p>
                      <p>
                        <strong>Sábados:</strong> 10:00 AM - 2:00 PM (EST)
                      </p>
                      <p>
                        <strong>WhatsApp:</strong> 24/7 (respuesta en menos de 2 horas)
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <Clock className="w-8 h-8 text-white mb-4 mx-auto" />
              <h3 className="font-bold text-white mb-2">30 Minutos</h3>
              <p className="text-white/80 text-sm">Consulta personalizada</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <Shield className="w-8 h-8 text-white mb-4 mx-auto" />
              <h3 className="font-bold text-white mb-2">100% Gratuita</h3>
              <p className="text-white/80 text-sm">Sin compromiso</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <CheckCircle className="w-8 h-8 text-white mb-4 mx-auto" />
              <h3 className="font-bold text-white mb-2">Expertos</h3>
              <p className="text-white/80 text-sm">Asesores certificados</p>
            </div>
          </div>
          {/* Alternative Contact Info */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-8">
            <h3 className="text-white font-bold text-lg mb-4">¿Prefieres contactarnos directamente?</h3>
            <div className="flex flex-wrap justify-center gap-6 text-white/90">
              <button
                onClick={handleWhatsAppClick}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp</span>
              </button>
              <button onClick={handlePhoneClick} className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone className="w-5 h-5" />
                <span>Llamada directa</span>
              </button>
              <button onClick={handleEmailClick} className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
                <span>Email</span>
              </button>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-white/80">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-sm md:text-base">Más de 500 clientes satisfechos</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-sm md:text-base">Respuesta en menos de 24h</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-sm md:text-base">Soporte continuo incluido</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
