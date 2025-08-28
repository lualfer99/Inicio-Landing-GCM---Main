"use client"

import Link from "next/link"
import { Instagram, Facebook, Youtube, Mail, Phone, Building } from "lucide-react"
import OptimizedImage from "./image-optimization"

export default function OptimizedFooter() {
  const handleConsultaClick = () => {
    const element = document.querySelector("#consulta")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="bg-gray-950 text-white py-16 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#225DF6]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#225DF6]/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 lg:px-6 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <OptimizedImage
                src="/images/logo-footer-white.png"
                alt="GCMAsesores Logo"
                width={140}
                height={45}
                className="h-12 w-auto"
              />
            </div>
            <p className="text-gray-400 mb-8 max-w-md text-base md:text-lg leading-relaxed">
              ¡Agenda ya tu asesoría fiscal gratuita y descubre la mejor estructura para tu negocio digital!
            </p>

            {/* Contact info */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-gray-400">
                <Mail className="w-5 h-5 text-[#225DF6] flex-shrink-0" />
                <span className="text-sm md:text-base">info@gcmasesores.io</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Phone className="w-5 h-5 text-[#225DF6] flex-shrink-0" />
                <span className="text-sm md:text-base">+1 352 608 0344</span>
              </div>
            </div>

            {/* Social media */}
            <div className="flex space-x-6">
              <Link
                href="https://www.instagram.com/gcmsociety/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#225DF6] transition-all duration-300 hover:scale-110"
              >
                <Instagram className="h-6 w-6 md:h-7 md:w-7" />
              </Link>
              <Link
                href="https://www.facebook.com/people/Global-Community-Management-LLC/100091921369533/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#225DF6] transition-all duration-300 hover:scale-110"
              >
                <Facebook className="h-6 w-6 md:h-7 md:w-7" />
              </Link>
              <Link
                href="https://www.youtube.com/channel/UCe0BfgldW1X_i-RL-nkq1aA"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#225DF6] transition-all duration-300 hover:scale-110"
              >
                <Youtube className="h-6 w-6 md:h-7 md:w-7" />
              </Link>
            </div>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-bold text-lg md:text-xl mb-6 text-white">Legal</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/aviso-legal"
                  className="text-gray-400 hover:text-[#225DF6] transition-colors text-base md:text-lg"
                >
                  Aviso legal
                </Link>
              </li>
              <li>
                <Link
                  href="/politica-privacidad"
                  className="text-gray-400 hover:text-[#225DF6] transition-colors text-base md:text-lg"
                >
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link
                  href="/politica-de-cookies"
                  className="text-gray-400 hover:text-[#225DF6] transition-colors text-base md:text-lg"
                >
                  Política de cookies
                </Link>
              </li>
              <li>
                <Link
                  href="/descargo-de-responsabilidad"
                  className="text-gray-400 hover:text-[#225DF6] transition-colors text-base md:text-lg"
                >
                  Descargo de responsabilidad
                </Link>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div>
            <div className="bg-gradient-to-br from-[#225DF6] to-[#1e52d9] p-6 md:p-8 rounded-3xl text-center shadow-primary-lg border border-[#225DF6]/20">
              <h3 className="font-bold text-base md:text-lg mb-4 text-white">¿Listo para empezar?</h3>
              <p className="text-white/90 text-sm mb-6 leading-relaxed">
                ¡Agenda ya tu asesoría fiscal gratuita y descubre la mejor estructura para tu negocio digital!
              </p>
              <button
                onClick={handleConsultaClick}
                className="inline-block bg-white text-[#225DF6] px-6 md:px-8 py-3 md:py-4 rounded-2xl font-bold text-sm md:text-base hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg cursor-pointer"
              >
                ASESORÍA FISCAL GRATUITA
              </button>
            </div>
          </div>
        </div>

        {/* Company Information */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="bg-gray-900/50 rounded-2xl p-6 md:p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Building className="w-6 h-6 text-[#225DF6]" />
              <h3 className="font-bold text-lg text-white">Información de la Empresa</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm md:text-base text-gray-300 leading-relaxed">
              <div>
                <p className="mb-2">
                  <strong className="text-white">Razón Social:</strong> GCM SERVICES LLC.
                </p>
                <p className="mb-2">
                  <strong className="text-white">EIN:</strong> 99-1045312
                </p>
                <p className="mb-2">
                  <strong className="text-white">Sitio Web:</strong>{" "}
                  <Link href="https://gcmasesores.io" className="text-[#225DF6] hover:underline">
                    https://gcmasesores.io
                  </Link>
                </p>
              </div>
              <div>
                <p className="mb-2">
                  <strong className="text-white">Dirección:</strong>
                </p>
                <p className="text-gray-400">
                  4300 RIDGECREST DR SE SUITE L 1277
                  <br />
                  RIO RANCHO, NM 87124
                  <br />
                  Estados Unidos
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-gray-800 pt-8">
          <div className="bg-gray-900/50 rounded-2xl p-6 md:p-8 mb-8">
            <div className="text-xs md:text-sm text-gray-400 leading-relaxed mb-6">
              <strong className="text-white">Descargo de responsabilidad:</strong> La información proporcionada en GCM
              es únicamente para fines informativos y no debe interpretarse como consejo o asesoramiento profesional en
              ninguna de sus formas. No pretende ser ni sustituir el asesoramiento legal, fiscal, financiero o cualquier
              otro tipo de asesoramiento profesional.
            </div>
            <div className="text-xs md:text-sm text-gray-400 leading-relaxed">
              Antes de tomar decisiones basadas en el contenido de este sitio, se recomienda encarecidamente consultar
              con un profesional calificado en el área relevante, como un abogado, contador o asesor financiero. La
              información en GCM se ofrece con fines educativos y como una guía general basada en nuestro conocimiento y
              experiencia, pero no constituye asesoramiento profesional específico. Cualquier acción tomada en base a la
              información de este sitio web es estrictamente bajo su propio riesgo. GCM no asume responsabilidad por
              decisiones tomadas o acciones realizadas basadas en el contenido de este sitio web.
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center text-gray-400">
            <p className="text-base md:text-lg">
              © {new Date().getFullYear()} GCM SERVICES LLC. Todos los derechos reservados.
            </p>
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 mt-4 md:mt-0">
              <p className="text-base md:text-lg">Sitio web con fines informativos únicamente.</p>
              <span className="hidden md:block text-gray-600">|</span>
              <p className="text-sm text-gray-500">
                Desarrollado por{" "}
                <Link
                  href="https://amai.solutions/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#225DF6] hover:text-[#1e52d9] transition-colors font-medium"
                >
                  AMAI
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
