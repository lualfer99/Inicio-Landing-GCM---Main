"use client"

import { Calendar, Clock, Phone, Mail, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CalendlyFallback() {
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

  return (
    <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-200">
      <div className="text-center mb-8">
        <Calendar className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Agenda tu Asesoría Fiscal Gratuita</h3>
        <p className="text-gray-600">Elige la forma más conveniente para contactarnos</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* WhatsApp */}
        <div className="text-center p-6 bg-green-50 rounded-2xl border border-green-200 hover:border-green-300 transition-colors">
          <MessageCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <h4 className="font-bold text-gray-900 mb-2">WhatsApp</h4>
          <p className="text-sm text-gray-600 mb-4">Respuesta inmediata</p>
          <Button onClick={handleWhatsAppClick} className="w-full bg-green-600 hover:bg-green-700 text-white">
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
          <Button onClick={handleEmailClick} className="w-full bg-purple-600 hover:bg-purple-700 text-white">
            Enviar Email
          </Button>
        </div>
      </div>

      <div className="mt-8 p-6 bg-gray-50 rounded-2xl">
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
  )
}
