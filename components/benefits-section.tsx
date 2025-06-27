import { Check, Globe, Shield, DollarSign, Headphones, Zap, Lock, TrendingUp } from "lucide-react"

export default function BenefitsSection() {
  const benefits = [
    {
      icon: DollarSign,
      title: "Mantenimiento Económico",
      description:
        "Puedes mantener una LLC por menos de 10/15 euros al mes. Por lo que podrás centrarte en escalar tu negocio, además de recibir pagos en multitud de divisas sin ningún tipo de comisiones o costes.",
      highlight: "10/15€/mes",
    },
    {
      icon: Globe,
      title: "Gestión Online",
      description:
        "Se gestiona de manera 100% online sin necesidad de viajar a EE.UU ni ser residente, todos los trámites son digitales, sencillos y totalmente legales.",
      highlight: "100% Online",
    },
    {
      icon: Lock,
      title: "Anonimato",
      description:
        "Las LLCs en ciertos estados pueden ser anónimas si lo eliges, la información de los miembros será privada y confidencial.",
      highlight: "Privacidad Total",
    },
    {
      icon: TrendingUp,
      title: "Ventajas Fiscales Y Personales",
      description: "¡Sin contabilidad! Y tus gastos como comida, viajes, etc. Cuentan como gastos de empresa.",
      highlight: "Sin Contabilidad",
    },
    {
      icon: Shield,
      title: "0% De Impuestos En EE.UU",
      description:
        "En EE.UU no pagarás impuestos al no ser residente y gestionar la empresa desde tu país, y te proporcionamos una guía gratuita al crear tu LLC para gestionarla de manera 100% legal.",
      highlight: "0% Impuestos",
    },
    {
      icon: Headphones,
      title: "Soporte Continuo",
      description:
        "No te preocupes, estaremos de tu lado y te guiaremos para que des tus primeros pasos para que gestiones y escales tu empresa de la manera correcta.",
      highlight: "24/7 Support",
    },
  ]

  return (
    <section id="beneficios" className="py-20 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-[#225DF6]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-[#225DF6]/3 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 lg:px-6 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#225DF6]/10 text-[#225DF6] px-6 py-3 rounded-full text-sm font-semibold mb-6">
            <Zap className="w-4 h-4" />
            Nuestras Ventajas
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="text-[#225DF6]">NUESTRO COMPROMISO</span> ES TU ÉXITO
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Te aportamos algo más que la simple creación de tu empresa. Te acompañamos en cada paso del camino, para
            asegurar tu éxito empresarial.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon
            return (
              <div
                key={index}
                className="card-modern p-8 text-center group hover:scale-105 transition-all duration-300"
              >
                <div className="relative mb-6">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#225DF6] to-[#1e52d9] rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-primary">
                    <IconComponent className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">
                    {benefit.highlight}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-[#225DF6] transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-[#225DF6]/10 to-[#1e52d9]/10 rounded-3xl p-8 border border-[#225DF6]/20">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              ¿Listo para <span className="text-[#225DF6]">optimizar tu fiscalidad</span>?
            </h3>
            <p className="text-gray-600 mb-6">Únete a más de 500 emprendedores que ya han transformado su negocio</p>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Check className="w-4 h-4 text-green-500" />
                <span>Sin compromiso</span>
              </div>
              <div className="flex items-center gap-1">
                <Check className="w-4 h-4 text-green-500" />
                <span>Asesoría gratuita</span>
              </div>
              <div className="flex items-center gap-1">
                <Check className="w-4 h-4 text-green-500" />
                <span>Respuesta en 24h</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
