import { Rocket, Zap, TrendingUp } from "lucide-react"

export default function GestoriaProcessSection() {
  const steps = [
    {
      number: "1",
      title: "Creación de la LLC",
      description:
        "Nos encargamos de toda la documentación, registros y trámites iniciales para crear tu LLC en el estado más conveniente.",
      icon: Rocket,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      number: "2",
      title: "Activación",
      description:
        "Configuramos tu cuenta bancaria, EIN, dirección virtual y todos los elementos necesarios para que puedas empezar a facturar.",
      icon: Zap,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      number: "3",
      title: "Optimización continua",
      description:
        "Gestión fiscal permanente, declaraciones, reportes y optimización de tu estructura para maximizar los beneficios legales.",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nuestro proceso de trabajo</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Un proceso probado que garantiza el éxito de tu LLC desde el primer día
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon
            return (
              <div key={index} className="text-center group">
                <div className="bg-white p-8 rounded-2xl shadow-modern border border-gray-100 hover:shadow-modern-lg transition-all duration-300 hover:scale-105 h-full">
                  {/* Step Number */}
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full text-2xl font-bold mb-6 group-hover:scale-110 transition-transform duration-300">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 ${step.bgColor} rounded-2xl mb-6`}>
                    <IconComponent className={`w-8 h-8 ${step.color}`} />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Process Flow Line */}
        <div className="hidden md:block relative mt-8">
          <div className="absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-blue-600 via-green-600 to-purple-600 transform -translate-y-1/2"></div>
        </div>
      </div>
    </section>
  )
}
