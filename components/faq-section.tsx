"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HelpCircle, Plus } from "lucide-react"

export default function FAQSection() {
  const faqs = [
    {
      question: "¿Cómo se crea una LLC en los Estados Unidos desde España?",
      answer: (
        <>
          <p className="text-gray-700 leading-relaxed">Nosotros nos encargamos de todo, sin que tengas que viajar a EE.UU. y sin complicaciones.</p><p className="text-gray-700 mb-2 leading-relaxed">Otros tardan de 2 a 6 meses, pero con nosotros tendrás tu LLC lista en solo <span className="font-semibold">7-10 días</span>.</p><ol className="list-decimal list-inside space-y-2 text-gray-700"><li>Registramos tu LLC en el estado más conveniente.</li><li>Obtenemos tu EIN para que puedas operar legalmente.</li><li>Abrimos tu cuenta bancaria en EE.UU.</li><li>Te guiamos en todo el proceso para que empieces a facturar cuanto antes.</li></ol><p className="text-gray-700 mt-2 leading-relaxed font-medium">Tú solo te enfocas en tu negocio, nosotros hacemos el resto.</p>
        </>
      ),
    },
    {
      question: "¿Porqué no puedo utilizar la tarjeta de Mercury en España?",
      answer: (
        <>
          <p className="text-gray-700 leading-relaxed">Mercury es un banco digital estadounidense que no opera en España debido a regulaciones bancarias internacionales.</p>
        </>
      ),
    },
    {
      question: "¿Porqué no pago impuestos en EEUU?",
      answer: (
        <>
          <p className="text-gray-700 leading-relaxed">Como no residente de EEUU, no estás sujeto a impuestos federales estadounidenses en ciertos tipos de ingresos.</p>
        </>
      ),
    },
    {
      question: "¿Cómo recibo los pagos de mis clientes?",
      answer: (
        <>
          <p className="text-gray-700 leading-relaxed">Puedes recibir pagos a través de diversos métodos como transferencias bancarias, procesadores de pago internacionales, etc.</p>
        </>
      ),
    },
    {
      question: "¿Qué es el CRS?",
      answer: (
        <>
          <p className="text-gray-700 leading-relaxed">
          El <strong>Tratado estándar internacional (CRS)</strong> es utilizado para el 
          <strong> intercambio automático de información fiscal entre países</strong>, diseñado para combatir la evasión fiscal. 
          Aunque la cuenta bancaria esté a nombre de una empresa, siempre se utiliza o administra desde tu cuenta; 
          en este caso, <strong>el CRS aplica igual para no residentes de EEUU</strong>.  
          En <strong>EEUU no existe CRS</strong>, pero se aplica a nivel internacional en multitud de países.  
          Si tienes una <strong>cuenta de empresa en Wise</strong>, la cuenta de <strong>Euro se ubica en Bélgica 
          (Bélgica tiene CRS)</strong>, y tu cuenta de <strong>USD se ubica en EEUU</strong>.  
          El <strong>CRS aplica solo para la cuenta de Euro</strong> y <strong>no es riesgoso para los clientes de EEUU</strong>.  
          En EEUU hay un sistema similar llamado <strong>FACTA</strong>, pero <strong>eso solo aplica dentro de EEUU 
          y no es riesgoso para los clientes</strong>.
          </p>
        </>
      ),
    },
  ]

  return (
    <section id="faq" className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#225DF6]/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 lg:px-6 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#225DF6]/10 text-[#225DF6] px-6 py-3 rounded-full text-sm font-semibold mb-6">
            <HelpCircle className="w-4 h-4" />
            FAQ
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#225DF6] mb-6">Preguntas frecuentes</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Resolvemos todas tus dudas sobre la creación de LLCs
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-6">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="card-modern border-2 border-gray-100 hover:border-[#225DF6]/30 transition-all duration-300"
              >
                <AccordionTrigger className="px-8 py-6 text-left font-bold text-gray-900 hover:no-underline hover:text-[#225DF6] transition-colors text-lg group">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-[#225DF6]/10 rounded-full flex items-center justify-center group-hover:bg-[#225DF6] transition-colors">
                      <Plus className="w-4 h-4 text-[#225DF6] group-hover:text-white transition-colors" />
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
          <div className="bg-gradient-to-r from-[#225DF6]/10 to-[#1e52d9]/10 rounded-3xl p-8 border border-[#225DF6]/20 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">¿Tienes más preguntas?</h3>
            <p className="text-gray-600 mb-6">Nuestros expertos están listos para resolver todas tus dudas</p>
            <div className="inline-flex items-center gap-2 bg-[#225DF6]/10 text-[#225DF6] px-4 py-2 rounded-full text-sm font-semibold">
              <HelpCircle className="w-4 h-4" />
              Consulta gratuita disponible
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
