import Link from "next/link"
import { Instagram, Facebook, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <img src="/images/logo-white.png" alt="GCMAsesores Logo" className="h-10 w-auto" />
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              ¡Agenda ya tu asesoría fiscal gratuita y descubre la mejor estructura para tu negocio digital!
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="h-6 w-6" />
              </Link>
            </div>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/aviso-legal" className="text-gray-400 hover:text-white transition-colors">
                  Aviso legal
                </Link>
              </li>
              <li>
                <Link href="/politica-privacidad" className="text-gray-400 hover:text-white transition-colors">
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link href="/politica-de-cookies" className="text-gray-400 hover:text-white transition-colors">
                  Política de cookies
                </Link>
              </li>
              <li>
                <Link href="/descargo-de-responsabilidad" className="text-gray-400 hover:text-white transition-colors">
                  Descargo de responsabilidad
                </Link>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div>
            <div className="bg-blue-600 p-4 rounded-lg text-center">
              <p className="text-sm mb-3">
                ¡Agenda ya tu asesoría fiscal gratuita y descubre la mejor estructura para tu negocio digital!
              </p>
              <Link
                href="#consulta"
                className="inline-block bg-white text-blue-600 px-6 py-4 rounded-lg font-semibold text-base hover:bg-gray-100 transition-all duration-200 transform hover:scale-105"
              >
                ASESORÍA FISCAL GRATUITA
              </Link>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-gray-800 pt-8">
          <div className="text-xs text-gray-500 leading-relaxed mb-4">
            <strong>Descargo de responsabilidad:</strong> La información proporcionada en GCM es únicamente para fines
            informativos y no debe interpretarse como consejo o asesoramiento profesional en ninguna de sus formas. No
            pretende ser ni sustituir el asesoramiento legal, fiscal, financiero o cualquier otro tipo de asesoramiento
            profesional.
          </div>
          <div className="text-xs text-gray-500 leading-relaxed mb-4">
            Antes de tomar decisiones basadas en el contenido de este sitio, se recomienda encarecidamente consultar con
            un profesional calificado en el área relevante, como un abogado, contador o asesor financiero. La
            información en GCM se ofrece con fines educativos y como una guía general basada en nuestro conocimiento y
            experiencia, pero no constituye asesoramiento profesional específico. Cualquier acción tomada en base a la
            información de este sitio web es estrictamente bajo su propio riesgo. GCM no asume responsabilidad por
            decisiones tomadas o acciones realizadas basadas en el contenido de este sitio web.
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>© {new Date().getFullYear()} GCMAsesores.io. Todos los derechos reservados.</p>
            <p className="mt-2 md:mt-0">Sitio web con fines informativos únicamente.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
