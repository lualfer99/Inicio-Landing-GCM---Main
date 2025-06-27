"use client"

import { Button } from "@/components/ui/button"
import { Check, Building2, Calendar } from "lucide-react"

export default function GestoriaFullServiceSection() {
  const services = [
    "Dirección virtual en EE.UU.",
    "Obtención del EIN",
    "Documentación legal completa",
    "Gestión de obligaciones fiscales",
    "Reportes oficiales (5472, 1120, BOI)",
    "Baja como autónomo en España",
    "Estrategia fiscal personalizada",
    "Soporte fiscal USA + España ilimitado",
  ]

  const handleCTAClick = () => {
    const element = document.querySelector("#consulta")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-gray-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/3 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 lg:px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-600/10 text-blue-600 px-6 py-3 rounded-full text-sm font-semibold mb-6">
              <Building2 className="w-4 h-4" />
              Servicio 360°
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Creamos y gestionamos tu LLC <span className="text-blue-600">360°</span>
            </h2>

            <p className="text-lg text-gray-600 mb-8">
              Desde la creación hasta la gestión fiscal continua, nos encargamos de todo para que tú te enfoques en
              hacer crecer tu negocio.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {services.map((service, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700 font-medium">{service}</span>
                </div>
              ))}
            </div>

            <Button
              size="lg"
              className="btn-primary text-lg px-8 py-4 text-white font-bold rounded-2xl shadow-primary-lg hover:shadow-primary border-2 border-blue-600 hover:border-blue-700 transition-all duration-300"
              onClick={handleCTAClick}
            >
              <Calendar className="w-5 h-5 mr-2" />
              ¡GESTIONA TU LLC CON SEGURIDAD!
            </Button>
          </div>

          {/* Right Content - Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <img
                src="/placeholder.svg?height=500&width=600"
                alt="Oficina profesional"
                className="rounded-3xl shadow-2xl border-4 border-white"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">100% Legal</div>
                    <div className="text-sm text-gray-600">Cumplimiento garantizado</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
