import { Check, Send, Gift, Headphones, Zap, Calendar } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ServicesSection() {
  const services = [
    {
      text: "Creación de la LLC en el estado más conveniente para tu actividad.",
      icon: Check,
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      text: "Obtención del EIN (Número de Identificación del Empleador).",
      icon: Check,
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      text: "Dirección virtual en Estados Unidos para tu LLC.",
      icon: Check,
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      text: "Documentación legal completa (Articles of Organization, Operating Agreement).",
      icon: Check,
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      text: "Apertura de cuenta bancaria empresarial en neobanco (Wise, Mercury, etc.).",
      icon: Check,
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      text: "Configuración fiscal inicial y estrategia de optimización.",
      icon: Check,
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      text: "Presentación de formularios anuales (5472, 1120) en Estados Unidos.",
      icon: Check,
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      text: "Asesoría para declaración en España (IRPF, régimen de transparencia fiscal).",
      icon: Check,
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      text: "Soporte continuo para cumplimiento fiscal en ambos países.",
      icon: Check,
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      text: "Gestión de reportes BOI (Beneficial Ownership Information).",
      icon: Check,
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      text: "Renovación anual del registered agent y mantenimiento de la LLC.",
      icon: Check,
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      text: "Set Up 1a1 para gestionar todos los procesos iniciales (apertura de cuentas bancarias, transacciones y retiradas de dinero, facturación etc) + Estrategias fiscales.",
      icon: Send,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      text: "Bonus: Generación de sentido económico para la empresa.",
      icon: Gift,
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      text: "Bonus: Te damos de baja como autónomo.",
      icon: Gift,
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      text: "Asesorías y soporte fiscal ilimitado tanto de la parte de España como de EE.UU.",
      icon: Headphones,
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
    },
  ]

  return (
    <section id="creacion-llc" className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/3 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 lg:px-6 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Todo lo que incluye nuestro servicio</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Servicio completo para la creación y gestión de tu LLC
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const IconComponent = service.icon
            const isSpecialService = service.icon !== Check

            return (
              <div key={index} className="flex items-start gap-4 group">
                <div
                  className={`flex-shrink-0 w-8 h-8 ${isSpecialService ? service.bgColor : "bg-green-50"} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}
                >
                  <IconComponent className={`h-5 w-5 ${isSpecialService ? service.iconColor : "text-green-600"}`} />
                </div>
                <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm border-2 border-white/50 hover:shadow-modern hover:border-blue-200/50 transition-all duration-300 flex-1">
                  <p className="text-gray-700 leading-relaxed font-medium">{service.text}</p>
                </div>
              </div>
            )
          })}
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
          <Button
            size="lg"
            className="btn-primary text-lg md:text-xl px-8 md:px-12 py-4 md:py-6 text-white font-bold rounded-2xl"
            asChild
          >
            <Link href="#consulta" className="inline-flex items-center gap-3">
              <Calendar className="w-5 md:w-6 h-5 md:h-6" />
              ASESORÍA FISCAL GRATUITA
            </Link>
          </Button>
          <p className="text-sm text-gray-500 mt-4">
            ⚡ Sin compromiso • 🔒 Consulta confidencial • 📞 Respuesta inmediata
          </p>
        </div>
      </div>
    </section>
  )
}
