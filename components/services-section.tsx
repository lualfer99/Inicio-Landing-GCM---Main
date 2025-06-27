"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Check, Send, Gift, Headphones, Calendar, Zap } from "lucide-react"

export default function ServicesSection() {
  const services = [
    {
      text: "Creación de la LLC en Delaware (el estado más favorable fiscalmente).",
      icon: Check,
      iconColor: "text-white",
      bgColor: "bg-green-500",
    },
    {
      text: "Obtención del EIN (número de identificación fiscal de la empresa).",
      icon: Check,
      iconColor: "text-white",
      bgColor: "bg-green-500",
    },
    {
      text: "Registro como agente registrado en Delaware.",
      icon: Check,
      iconColor: "text-white",
      bgColor: "bg-green-500",
    },
    {
      text: "Apertura de cuenta bancaria empresarial en EE.UU. (100% online).",
      icon: Check,
      iconColor: "text-white",
      bgColor: "bg-green-500",
    },
    {
      text: "Configuración de Stripe para recibir pagos internacionales.",
      icon: Check,
      iconColor: "text-white",
      bgColor: "bg-green-500",
    },
    {
      text: "Asesoría fiscal personalizada para tu caso específico.",
      icon: Check,
      iconColor: "text-white",
      bgColor: "bg-green-500",
    },
    {
      text: "Documentación legal completa y traducida al español.",
      icon: Check,
      iconColor: "text-white",
      bgColor: "bg-green-500",
    },
    {
      text: "Soporte durante todo el proceso de creación.",
      icon: Check,
      iconColor: "text-white",
      bgColor: "bg-green-500",
    },
    {
      text: "Set Up 1a1 para gestionar todos los procesos iniciales (apertura de cuentas bancarias, transacciones y retiradas de dinero, facturación etc) + Estrategias fiscales.",
      icon: Send,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      text: "Bonus: Generación de sentido económico para la empresa.",
      icon: Gift,
      iconColor: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      text: "Bonus: Te damos de baja como autónomo.",
      icon: Gift,
      iconColor: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      text: "Asesorías y soporte fiscal ilimitado tanto de la parte de España como de EE.UU.",
      icon: Headphones,
      iconColor: "text-green-600",
      bgColor: "bg-green-100",
    },
  ]

  return (
    <section
      id="servicios"
      className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 relative overflow-hidden"
    >
      {/* Background decoration matching hero */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-20 right-10 w-72 h-72 bg-blue-600/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-600/3 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 lg:px-6 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-600/10 text-blue-600 px-6 py-3 rounded-full text-sm font-semibold mb-8">
            <Check className="w-4 h-4" />
            Servicios Incluidos
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Todo lo que necesitas para crear tu <span className="text-blue-600">LLC en EE.UU.</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Servicio completo y personalizado para empresarios digitales que quieren optimizar su fiscalidad de manera
            100% legal.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <Card
              key={index}
              className="card-modern p-6 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] bg-white/80 backdrop-blur-sm border-2 border-white/50"
            >
              <CardContent className="flex items-start gap-4 p-0">
                <div
                  className={`flex-shrink-0 w-10 h-10 ${service.bgColor} rounded-full flex items-center justify-center shadow-lg`}
                >
                  <service.icon className={`w-5 h-5 ${service.iconColor}`} />
                </div>
                <p className="text-gray-700 font-medium leading-relaxed">{service.text}</p>
              </CardContent>
            </Card>
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
    </section>
  )
}
