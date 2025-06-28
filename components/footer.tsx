import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image
                src="/images/logo-footer-white.png"
                alt="GCM Asesores"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <span className="text-xl font-bold">GCM Asesores</span>
            </div>
            <p className="text-gray-300 text-sm">
              Especialistas en asesoría fiscal internacional y constitución de LLCs en Estados Unidos para emprendedores
              españoles.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="w-4 h-4 text-blue-400" />
                <span>+34 123 456 789</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Mail className="w-4 h-4 text-blue-400" />
              <span>info@gcmasesores.io</span>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Servicios</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/gestoria-para-llcs" className="hover:text-white transition-colors">
                  Constitución de LLCs
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-white transition-colors">
                  Asesoría Fiscal Internacional
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-white transition-colors">
                  Optimización Tributaria
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-white transition-colors">
                  Compliance y Reporting
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-white transition-colors">
                  Planificación Patrimonial
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Empresa</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/#about" className="hover:text-white transition-colors">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="/#team" className="hover:text-white transition-colors">
                  Nuestro Equipo
                </Link>
              </li>
              <li>
                <Link href="/#testimonials" className="hover:text-white transition-colors">
                  Testimonios
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-white transition-colors">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/#consultation" className="hover:text-white transition-colors">
                  Consulta Gratuita
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contacto</h3>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <span>
                  Madrid, España
                  <br />
                  Atención online en toda España
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <Clock className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p>Lunes - Viernes: 9:00 - 18:00</p>
                  <p>Sábados: 10:00 - 14:00</p>
                  <p>Domingos: Cerrado</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">© 2024 GCM Asesores. Todos los derechos reservados.</div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <Link href="/politica-privacidad" className="hover:text-white transition-colors">
                Política de Privacidad
              </Link>
              <Link href="/politica-de-cookies" className="hover:text-white transition-colors">
                Política de Cookies
              </Link>
              <Link href="/aviso-legal" className="hover:text-white transition-colors">
                Aviso Legal
              </Link>
              <Link href="/descargo-de-responsabilidad" className="hover:text-white transition-colors">
                Descargo de Responsabilidad
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
