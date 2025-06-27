import OptimizedHeader from "@/components/optimized-header"
import OptimizedFooter from "@/components/optimized-footer"

const DescargoResponsabilidadPage = () => {
  return (
    <div>
      <OptimizedHeader />
      <div className="container mx-auto py-8">
        <h1>Descargo de Responsabilidad</h1>
        <div
          dangerouslySetInnerHTML={{
            __html: `
        <h2>Descargo de Responsabilidad</h2><p>La información proporcionada en GCM Social Media (<a href="https://gcmasesores.io/" target="_new" rel="noreferrer">https://gcmasesores.io/</a>) es únicamente para fines informativos y no debe interpretarse como consejo o asesoramiento profesional en ninguna de sus formas. No pretende ser un sustituto de asesoramiento legal, fiscal, financiero o cualquier otro tipo de asesoramiento profesional.</p><p>Recomendamos encarecidamente que antes de tomar cualquier decisión basada en el contenido de este sitio, consulte con un profesional calificado en el área relevante, como un abogado, contador o asesor financiero. La información en GCM Social Media se ofrece con fines educativos y como una guía general basada en nuestro conocimiento y experiencia, pero no garantizamos su exactitud, completitud, actualización o aplicabilidad en situaciones específicas.</p><p>Cualquier acción que tome basada en la información proporcionada en este sitio web es estrictamente bajo su propio riesgo. GCM Social Media no asume responsabilidad alguna por decisiones tomadas o acciones realizadas basadas en el contenido de este sitio web.</p>
        `,
          }}
        />
      </div>
      <OptimizedFooter />
    </div>
  )
}

export default DescargoResponsabilidadPage
