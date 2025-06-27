"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HelpCircle, Plus } from "lucide-react"

export default function GestoriaFAQSection() {
  const faqs = [
    {
      question: "¿Qué hace diferente a una gestoría especializada en LLCs?",
      answer: (
        <>
          Una gestoría especializada en LLCs como GCM tiene <strong>conocimiento específico</strong> de las regulaciones
          tanto de <strong>Estados Unidos como de España</strong>. Manejamos las particularidades fiscales de las LLC
          para extranjeros, conocemos los formularios específicos (5472, 1120, BOI), y entendemos cómo optimizar la
          estructura fiscal de manera <strong>100% legal</strong>. No es lo mismo que una gestoría tradicional que
          maneja solo empresas españolas.
        </>
      ),
    },
    {
      question: "¿Puedo tener una LLC desde España?",
      answer: (
        <>
          <strong>Sí, absolutamente</strong>. Es completamente <strong>legal</strong> para residentes españoles tener
          una LLC en Estados Unidos. De hecho, está diseñado específicamente para atraer inversión extranjera. Nosotros
          nos encargamos de toda la <strong>documentación</strong>, <strong>registros</strong> y{" "}
          <strong>cumplimiento</strong> tanto en EE.UU. como en España, asegurándonos de que todo esté en regla con
          ambas jurisdicciones fiscales.
        </>
      ),
    },
    {
      question: "¿Ustedes presentan mis declaraciones en USA?",
      answer: (
        <>
          <strong>Sí</strong>, nos encargamos de presentar todos los <strong>formularios requeridos</strong> en Estados
          Unidos, incluyendo el <strong>Formulario 5472</strong> y <strong>1120</strong>. También gestionamos los{" "}
          <strong>reportes BOI</strong> (Beneficial Ownership Information) y cualquier otro reporte estatal que sea
          necesario. Todo se hace de manera <strong>profesional</strong> y <strong>a tiempo</strong> para evitar
          penalizaciones.
        </>
      ),
    },
    {
      question: "¿También me asesoran en España?",
      answer: (
        <>
          <strong>Por supuesto</strong>. Parte fundamental de nuestro servicio es la{" "}
          <strong>asesoría fiscal en España</strong>. Te ayudamos con la declaración de los beneficios de tu LLC en el{" "}
          <strong>IRPF</strong>, la gestión de la <strong>baja como autónomo</strong> si corresponde, y cualquier
          consulta con <strong>Hacienda española</strong>. Somos tu gestoría integral para ambos países.
        </>
      ),
    },
    {
      question: "¿Cuánto tiempo toma todo el proceso?",
      answer: (
        <>
          El proceso completo de <strong>creación y activación</strong> de tu LLC toma aproximadamente{" "}
          <strong>5-7 días hábiles</strong>. Esto incluye la constitución de la sociedad, obtención del EIN,
          configuración de la cuenta bancaria y entrega de toda la documentación. Una vez activa, la{" "}
          <strong>gestión fiscal</strong> es continua y nos encargamos de todas las obligaciones periódicas sin que
          tengas que preocuparte por fechas o formularios.
        </>
      ),
    },
  ]

  return (
    <section id="faq" className="py-20 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 lg:px-6 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-600/10 text-blue-600 px-6 py-3 rounded-full text-sm font-semibold mb-6">
            <HelpCircle className="w-4 h-4" />
            FAQ
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Preguntas frecuentes</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Resolvemos todas tus dudas sobre nuestra gestoría especializada en LLCs
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-6">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white border-2 border-gray-100 rounded-2xl shadow-modern hover:border-blue-200 hover:shadow-modern-lg transition-all duration-300"
              >
                <AccordionTrigger className="px-8 py-6 text-left font-bold text-gray-900 hover:no-underline hover:text-blue-600 transition-colors text-lg group">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-blue-600/10 rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                      <Plus className="w-4 h-4 text-blue-600 group-hover:text-white transition-colors" />
                    </div>
                    <span>{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-8 pb-6 text-gray-600 leading-relaxed text-lg border-t border-gray-100 pt-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600/10 to-blue-700/10 rounded-3xl p-8 border border-blue-600/20 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">¿Tienes más preguntas?</h3>
            <p className="text-gray-600 mb-6">Nuestros expertos en LLCs están listos para resolver todas tus dudas</p>
            <div className="inline-flex items-center gap-2 bg-blue-600/10 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold">
              <HelpCircle className="w-4 h-4" />
              Consulta gratuita disponible
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
