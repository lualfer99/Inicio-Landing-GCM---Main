import { FileText, Calculator, Building, AlertCircle, MessageSquare, Shield } from "lucide-react"

export default function GestoriaServicesSection() {
  const services = [
    {
      title: "Declaración en España",
      description: "Gestión completa de tus obligaciones fiscales españolas como propietario de LLC",
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Declaración USA",
      description: "Formularios 5472 y 1120 presentados correctamente y a tiempo",
      icon: Calculator,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Reportes BOI y estatales",
      description: "Cumplimiento de todas las obligaciones de reporte a nivel federal y estatal",
      icon: Building,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "PTO, informes contables",
      description: "Gestión de marcas, informes financieros y documentación contable",
      icon: FileText,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Resolución de requerimientos",
      description: "Atención y resolución de cualquier requerimiento fiscal o administrativo",
      icon: AlertCircle,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: "Respuesta a Hacienda española",
      description: "Comunicación directa con Hacienda para resolver cualquier consulta",
      icon: MessageSquare,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-600/10 text-blue-600 px-6 py-3 rounded-full text-sm font-semibold mb-6">
            <Shield className="w-4 h-4" />
            Servicios Completos
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nosotros nos encargamos de todo</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Gestión fiscal completa para tu LLC, tanto en Estados Unidos como en España
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <div key={index} className="group">
                <div className="bg-white p-8 rounded-2xl shadow-modern border-2 border-gray-100 hover:border-blue-200 hover:shadow-modern-lg transition-all duration-300 h-full">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 ${service.bgColor} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className={`w-8 h-8 ${service.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
