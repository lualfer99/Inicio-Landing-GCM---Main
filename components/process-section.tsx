import { ArrowRight, CheckCircle, Rocket, TrendingUp } from "lucide-react"

export default function ProcessSection() {
  const steps = [
    {
      number: "1",
      title: "CREACIÓN DE L.L.C",
      subtitle: "¡Enhorabuena!",
      description:
        "Creamos tu empresa (LLC) en EE.UU en el estado que elijas, solicitamos tu EIN (Número de identificación del empleador estadounidense) necesario para recibir pagos legalmente, te entregamos todos tus papeles en 10 días laborables, de manera totalmente online y segura.",
      icon: CheckCircle,
      color: "from-green-400 to-green-500",
    },
    {
      number: "2",
      title: "ACCIÓN",
      subtitle: "Es tu momento...",
      description:
        "Tendrás tu empresa lista para facturar y acceso a la zona de emprendimiento, te ayudaremos con todos los cambios necesarios a aplicar en tu negocio digital. Empezarás a ahorrar en impuestos y gastos excesivos y te podrás centrar en escalar tu negocio.",
      icon: Rocket,
      color: "from-[#225DF6] to-[#1e52d9]",
    },
    {
      number: "3",
      title: "OPTIMIZACIÓN",
      subtitle: "Perfecciona tu estrategia",
      description:
        "Nos encargaremos de la gestión integral de tu LLC. Ahora que ya tienes optimizado tu negocio, es hora de dar un paso más avanzado, escalar una empresa no es algo sencillo si no tienes experiencia. Te ayudaremos a identificar tus errores y a optimizar tus estrategias fiscales para poder seguir creciendo y asegurar el éxito de tu empresa en el largo plazo.",
      icon: TrendingUp,
      color: "from-purple-400 to-purple-500",
    },
  ]

  return (
    <section id="proceso" className="py-20 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-[#225DF6]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 lg:px-6 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#225DF6]/10 text-[#225DF6] px-6 py-3 rounded-full text-sm font-semibold mb-6">
            <Rocket className="w-4 h-4" />
            Nuestro Proceso
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#225DF6] mb-6">NUESTRO PROCESO DE TRABAJO</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#225DF6] to-[#1e52d9] mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Crear una LLC requiere de conocimiento especializado en tributación internacional, estaremos contigo en cada
            parte del proceso para asegurarnos de tu éxito.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => {
            const IconComponent = step.icon
            return (
              <div key={index} className="relative group">
                {/* Connection line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-20 left-full w-12 h-0.5 bg-gradient-to-r from-[#225DF6]/30 to-transparent z-10">
                    <ArrowRight className="absolute -right-2 -top-2 w-5 h-5 text-[#225DF6]/50" />
                  </div>
                )}

                <div className="card-modern p-8 text-center hover:scale-105 transition-all duration-300 relative overflow-hidden">
                  {/* Background gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-5 group-hover:opacity-10 transition-opacity`}
                  ></div>

                  <div className="relative z-10">
                    <div className="mb-8">
                      <div
                        className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${step.color} text-white text-2xl font-bold rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        {step.number}
                      </div>
                      <div
                        className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${step.color} rounded-xl mb-4`}
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-[#225DF6] mb-2">{step.title}</h3>
                      <p className="text-lg font-semibold text-gray-900 mb-6 bg-highlight inline-block px-4 py-2 rounded-lg">
                        {step.subtitle}
                      </p>
                    </div>
                    <div className="border-b-2 border-gray-200 mb-6 group-hover:border-[#225DF6]/30 transition-colors"></div>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-[#225DF6] mb-2">7 días</div>
            <div className="text-gray-600">Tiempo promedio</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-[#225DF6] mb-2">100%</div>
            <div className="text-gray-600">Tasa de éxito</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-[#225DF6] mb-2">24/7</div>
            <div className="text-gray-600">Soporte disponible</div>
          </div>
        </div>
      </div>
    </section>
  )
}
