import { Button } from "@/components/ui/button"
import { Check, Clock, Shield, Zap, Award, Users } from "lucide-react"
import Link from "next/link"

export default function ServicesSection() {
  const services = [
    "Creación de LLC en EE.UU + obtención de EIN (todo en 7 días)",
    "Dirección virtual y agente registrador en EE.UU.",
    "Elaboración de estatutos de la empresa y acuerdo operativo.",
    "Guía para gestión legal de la LLC y obligaciones fiscales desde España.",
    "Declaración de la renta en España.",
    "Forms 1120 y 5472",
    "Reporte anual en New Mexico.",
    "Reporte BOI Fincen",
    "Designación de Manager para la LLC. (Capa de seguridad extra de cara a Hacienda Española)",
    "Set Up 1a1 para gestionar todos los procesos iniciales (apertura de cuentas bancarias, transacciones y retiradas de dinero, facturación etc.) + Estrategias fiscales.",
    "Bonus: Generación de sentido económico para la empresa.",
    "Bonus: Te damos de baja como autónomo.",
    "Asesorías y soporte fiscal ilimitado tanto de la parte de España como de EE.UU.",
  ]

  const features = [
    { icon: Clock, text: "Proceso en 7 días", color: "text-green-500" },
    { icon: Shield, text: "100% Legal", color: "text-blue-500" },
    { icon: Zap, text: "Todo Online", color: "text-yellow-500" },
    { icon: Award, text: "Garantía Total", color: "text-purple-500" },
  ]

  return (
    <section id="servicios" className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#225DF6]/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 lg:px-6 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#225DF6]/10 text-[#225DF6] px-6 py-3 rounded-full text-sm font-semibold mb-6">
            <Users className="w-4 h-4" />
            Servicio Completo
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#225DF6] mb-8">CREAMOS Y GESTIONAMOS TU LLC 360°</h2>
          <p className="text-2xl font-bold text-gray-900 mb-8">Qué incluye:</p>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md border border-gray-100"
                >
                  <IconComponent className={`w-5 h-5 ${feature.color}`} />
                  <span className="font-semibold text-gray-700">{feature.text}</span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {services.map((service, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-[#225DF6]/20 transition-all duration-300"
              >
                <div className="flex-shrink-0 mt-1">
                  <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed font-medium">{service}</p>
              </div>
            ))}
          </div>

          <div className="text-center card-modern p-12 bg-gradient-to-br from-white to-gray-50 border-2 border-[#225DF6]/20">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Zap className="w-4 h-4" />
              Garantía de Resultados
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              ¡Empieza a facturar en menos de <span className="text-[#225DF6]">10 días</span>!
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Tendremos listos todos los papeles en menos de 10 días, para que puedas empezar a recibir pagos de tus
              clientes.
            </p>
            <Button size="lg" className="btn-primary text-xl px-12 py-6 rounded-2xl" asChild>
              <Link href="#consulta" className="inline-flex items-center gap-3">
                <Clock className="w-6 h-6" />
                ASESORÍA GRATUITA
              </Link>
            </Button>
            <p className="text-sm text-gray-500 mt-4">
              ⚡ Sin compromiso • 🔒 Consulta confidencial • 📞 Respuesta inmediata
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
