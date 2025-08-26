"use client"

import { useState, useEffect } from "react"
import { Building2, Zap, TrendingUp, CheckCircle, ArrowRight } from "lucide-react"

const processSteps = [
  {
    number: "1",
    title: "CREACIÓN DE L.L.C",
    subtitle: "¡Enhorabuena!",
    description:
      "Creamos tu empresa (LLC) en EE.UU en el estado que elijas, solicitamos tu EIN (Número de identificación del empleador estadounidense) necesario para recibir pagos legalmente, te entregamos todos tus papeles en menos de 10 días laborables, de manera totalmente online y segura.",
    icon: Building2,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  {
    number: "2",
    title: "ACCIÓN",
    subtitle: "Es tu momento...",
    description:
      "Tendrás tu empresa lista para facturar y una planificación fiscal clara y definida punto por punto, te ayudaremos con todos los cambios necesarios a aplicar en tu negocio digital. Empezarás a ahorrar en impuestos y gastos excesivos y te podrás centrar en escalar tu negocio.",
    icon: Zap,
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
  },
  {
    number: "3",
    title: "OPTIMIZACIÓN",
    subtitle: "Perfecciona tu estrategia",
    description:
      "Nos encargaremos de la gestión integral de tu LLC. Ahora que ya tienes optimizado tu negocio, es hora de dar un paso más avanzado, una estrategia fiscal no es algo sencillo si no tienes experiencia. Te ayudaremos paso a paso a optimizar tus estrategia fiscal para poder seguir creciendo y asegurar el éxito de tu empresa en el largo plazo.",
    icon: TrendingUp,
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
  },
]

export default function ProcessSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("process-section")
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % processSteps.length)
      }, 4000)

      return () => clearInterval(interval)
    }
  }, [isVisible])

  return (
    <section id="process-section" className="py-20 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-6 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#225DF6]/10 text-[#225DF6] px-6 py-3 rounded-full text-sm font-semibold mb-6">
            <CheckCircle className="w-4 h-4" />
            Nuestro Proceso
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            NUESTRO PROCESO DE <span className="text-[#225DF6]">TRABAJO</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#225DF6] to-blue-600 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Crear una LLC requiere de conocimiento especializado en tributación internacional, estaremos contigo en cada
            parte del proceso para asegurarnos de tu éxito.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {processSteps.map((step, index) => {
            const Icon = step.icon
            const isActive = activeStep === index

            return (
              <div
                key={index}
                className={`relative group transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
                onMouseEnter={() => setActiveStep(index)}
              >
                {/* Connection line (hidden on mobile) */}
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-gray-300 to-transparent z-0">
                    <div
                      className={`h-full bg-gradient-to-r ${step.color} transition-all duration-1000 ${
                        isActive ? "w-full" : "w-0"
                      }`}
                    />
                  </div>
                )}

                <div
                  className={`relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 ${
                    isActive ? step.borderColor : "border-gray-100"
                  } ${isActive ? "scale-105" : "hover:scale-102"} min-h-[480px] flex flex-col`}
                >
                  {/* Step number and icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-bold text-xl shadow-lg`}
                    >
                      {step.number}
                    </div>
                    <div
                      className={`w-12 h-12 rounded-xl ${step.bgColor} flex items-center justify-center transition-all duration-300 ${
                        isActive ? "scale-110" : ""
                      }`}
                    >
                      <Icon className={`w-6 h-6 ${isActive ? "text-gray-700" : "text-gray-500"}`} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                    <h4
                      className={`text-lg font-semibold mb-4 bg-gradient-to-r ${step.color} bg-clip-text text-transparent`}
                    >
                      {step.subtitle}
                    </h4>
                    <p className="text-gray-600 leading-relaxed flex-1">{step.description}</p>
                  </div>

                  {/* Action indicator */}
                  <div
                    className={`mt-6 flex items-center gap-2 text-sm font-medium transition-all duration-300 ${
                      isActive ? "text-gray-700" : "text-gray-400"
                    }`}
                  >
                    <span>Paso {step.number}</span>
                    <ArrowRight
                      className={`w-4 h-4 transition-transform duration-300 ${isActive ? "translate-x-1" : ""}`}
                    />
                  </div>

                  {/* Hover overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`}
                  />
                </div>
              </div>
            )
          })}
        </div>

        {/* Progress indicators */}
        <div className="flex justify-center mt-12 gap-3">
          {processSteps.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveStep(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeStep === index ? "bg-[#225DF6] scale-125" : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Ir al paso ${index + 1}`}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 bg-gradient-to-r from-[#225DF6] to-blue-600 text-white px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CheckCircle className="w-6 h-6" />
            <span className="font-semibold text-lg">¿Listo para empezar tu proceso?</span>
          </div>
        </div>
      </div>
    </section>
  )
}
