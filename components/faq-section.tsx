"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HelpCircle, Plus } from "lucide-react"

export default function FAQSection() {
  const faqs = [
    {
      question: "¿Qué es una LLC?",
      answer: (
        <>
          Una <strong>LLC</strong> (Limited Liability Company) es un tipo de <strong>sociedad</strong> en los{" "}
          <strong>Estados Unidos</strong> que puede ser creada de forma totalmente <strong>online</strong> desde
          cualquier parte del mundo, incluyendo <strong>España</strong>. Las LLCs son consideradas{" "}
          <strong>«pass-through entities»</strong>, lo que significa que los beneficios o pérdidas deben de pasarse a
          los propietarios a <strong>final</strong> del año a través de la <strong>empresa</strong>. Son estructuras
          fiscales ideales para la creación de <strong>negocios online</strong> u <strong>optimización</strong> fiscal
          si ya tienes una <strong>empresa</strong>.
        </>
      ),
    },
    {
      question: "¿Es legal tener una LLC en EEUU si vivo en España o Latinoamérica?",
      answer: (
        <>
          <strong>SÍ</strong>, es <strong>legal</strong> tener una <strong>LLC</strong> en EEUU si vives en{" "}
          <strong>España o Latinoamérica</strong>. La fórmula de las LLC en USA para extranjeros está específicamente
          diseñada para atraer actividades económicas de <strong>no residentes</strong> a Estados Unidos, que es donde
          se <strong>declaran</strong> los ingresos. Pero no donde se <strong>pagan</strong> los{" "}
          <strong>impuestos</strong>. Los beneficios o pérdidas de las LLC son «pass through entity». Es decir, que
          pasan al propietario final a través de la empresa. Además es obligatorio al final de cada año, traspasar los
          beneficios a los <strong>propietarios</strong>. Y los impuestos de esos beneficios, se pagan en el{" "}
          <strong>país</strong> en el que <strong>resida</strong> el <strong>propietario</strong>. Si resides en{" "}
          <strong>España</strong>, tendrás que declarar esos beneficios a la <strong>Hacienda</strong> española en el{" "}
          <strong>IRPF</strong> como beneficios por sociedades transparentes.
        </>
      ),
    },
    {
      question: "¿Cómo se crea una LLC en los Estados Unidos desde España?",
      answer: (
        <>
          La creación de una LLC en los Estados Unidos puede realizarse de forma <strong>online</strong>. El proceso
          incluye la obtención de una <strong>dirección</strong> en los Estados Unidos para la <strong>empresa</strong>{" "}
          (A través de cualquier mail box), <strong>constitución</strong> de la sociedad, obtención del{" "}
          <strong>EIN</strong>, hacer un acuerdo operativo, creación de una <strong>cuenta</strong> en un{" "}
          <strong>banco</strong> extranjero para asociarla a la LLC…, la creación de la LLC suele oscilar entre{" "}
          <strong>15 días y 2 meses</strong> para tenerla operativa y con todos los papeles, pero en GCM, gestionamos
          todo el proceso en menos de <strong>5 días</strong> listo para <strong>facturar</strong> a{" "}
          <strong>tus clientes</strong>, gracias a nuestra red de <strong>colaboradores</strong> en EEUU.
        </>
      ),
    },
    {
      question: "¿Por qué no pago impuestos en EEUU?",
      answer: (
        <>
          <strong>No pagas impuestos</strong> en EEUU porque los beneficios o pérdidas de las LLC son pass through
          entity. Es decir, que pasan al propietario final a través de la empresa. Los impuestos de esos beneficios, se{" "}
          <strong>pagan</strong> en el <strong>país</strong> en el que resida el <strong>propietario</strong>. Si
          resides en <strong>España</strong>, tendrás que declarar esos beneficios a la Hacienda española en el{" "}
          <strong>IRPF</strong> como imputación de rentas en régimen de imputación fiscal internacional.
        </>
      ),
    },
    {
      question: "¿Cómo recibo los pagos de mis clientes?",
      answer: (
        <>
          Con tu <strong>LLC</strong>, <strong>tendrás</strong> una cuenta <strong>multidivisa</strong> en un{" "}
          <strong>neobanco</strong> como Wise, ya que es el que más ventajas, <strong>facilidad</strong> y rapidez tiene
          para crear una cuenta bancaria a nombre de tu empresa, pudiendo <strong>recibir pagos</strong> en{" "}
          <strong>USD</strong>, <strong>EUR</strong>, y más de <strong>50 divisas</strong>, <strong>y sin</strong>{" "}
          ningún tipo de <strong>coste</strong> de conversión, <strong>ni comisiones</strong> por transferencias{" "}
          <strong>ni gastos</strong> de mantenimiento mensual.
        </>
      ),
    },
    {
      question: "¿Cuáles son las obligaciones fiscales de una LLC en los Estados Unidos y en España?",
      answer: (
        <>
          En los Estados Unidos, una empresa estadounidense con propietarios extranjeros debe presentar el{" "}
          <strong>Formulario 5472</strong> y <strong>1120</strong> <strong>cada año</strong> el 15 de abril en la
          mayoría de los casos. Estos formularios son <strong>INFORMATIVOS</strong> y <strong>NO</strong> una{" "}
          <strong>declaración</strong> de <strong>impuestos</strong> y se envían vía fax. En España, las obligaciones
          fiscales se reducen a pagar el <strong>IRPF</strong> de los <strong>beneficios</strong> que haya tenido la
          LLC.
        </>
      ),
    },
    {
      question: "¿Cuáles son las ventajas de una LLC en comparación con una SL española?",
      answer: (
        <>
          Las <strong>LLCs</strong> en los Estados Unidos tienen varias <strong>ventajas</strong> en comparación con las
          Sociedades <strong>Limitadas españolas o Latinoamericanas</strong>. Estas incluyen la liberación de la carga{" "}
          <strong>burocrática</strong>, la posibilidad de abrir <strong>cuentas</strong> en el{" "}
          <strong>extranjero</strong> a nombre de la <strong>empresa</strong>, la capacidad de aplicar estrategias de
          optimización fiscal y la presentación de impuestos limitada a <strong>dos formularios</strong> informativos
          muy <strong>sencillos</strong> al <strong>final</strong> del año.
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
