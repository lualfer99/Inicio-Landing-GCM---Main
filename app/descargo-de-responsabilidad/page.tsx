// app/descargo-responsabilidad/page.tsx
import type { Metadata } from "next";
import OptimizedHeader from "@/components/optimized-header";
import OptimizedFooter from "@/components/optimized-footer";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300","400","500","600","700","800","900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gcmasesores.io"),
  title: "Descargo de Responsabilidad | GCMAsesores.io - Información y Riesgos",
  description: "La información proporcionada en GCM Social Media es únicamente para fines informativos y no debe interpretarse como asesoramiento profesional.",
  keywords: [
    "Descargo de Responsabilidad", "GCM Social Media", "asesoramiento profesional", "información educativa", "riesgo sitio web"
  ],
  alternates: { canonical: "/descargo-responsabilidad" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Descargo de Responsabilidad | GCMAsesores.io",
    description: "Consulta el Descargo de Responsabilidad de GCM Social Media en GCMAsesores.io.",
    url: "https://gcmasesores.io/descargo-responsabilidad",
    siteName: "GCMAsesores.io",
    locale: "es_ES",
    type: "article",
  },
};

export default function DescargoResponsabilidadPage() {
  return (
    <div className={`${poppins.variable} min-h-screen flex flex-col bg-white text-gray-900`}>
      <OptimizedHeader />
      <main className="flex-grow container mx-auto px-4 py-20 prose prose-lg">
        <h1 className="text-4xl font-bold mb-6">Descargo de Responsabilidad</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Descargo de Responsabilidad</h2>
          <p>
            La información proporcionada en{' '}
            <a
              href="https://gcmasesores.io/"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              https://gcmasesores.io/
            </a>{' '}
            es únicamente para fines informativos y no debe interpretarse como consejo o asesoramiento profesional en ninguna de sus formas. No pretende ser un sustituto de asesoramiento legal, fiscal, financiero o cualquier otro tipo de asesoramiento profesional.
          </p>
          <p>
            Recomendamos encarecidamente que antes de tomar cualquier decisión basada en el contenido de este sitio, consulte con un profesional calificado en el área relevante, como un abogado, contador o asesor financiero. La información en GCM Social Media se ofrece con fines educativos y como una guía general basada en nuestro conocimiento y experiencia, pero no garantizamos su exactitud, completitud, actualización o aplicabilidad en situaciones específicas.
          </p>
          <p>
            Cualquier acción que tome basada en la información proporcionada en este sitio web es estrictamente bajo su propio riesgo. GCM Social Media no asume responsabilidad alguna por decisiones tomadas o acciones realizadas basadas en el contenido de este sitio web.
          </p>
        </section>
      </main>
      <OptimizedFooter />
    </div>
  );
}
