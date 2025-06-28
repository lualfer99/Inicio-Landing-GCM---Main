// app/politica-privacidad/page.tsx
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
  title: "Política de Privacidad | GCMAsesores.io - Protección de Datos",
  description: "Consulta la Política de Privacidad de GCMAsesores.io: responsable, datos recogidos, derechos y seguridad.",
  keywords: [
    "Política de Privacidad", "protección de datos", "RGPD", "datos personales", "GCMAsesores.io",
    "responsable del tratamiento", "derechos ARCO", "seguridad de datos", "consentimiento", "newsletter"
  ],
  alternates: { canonical: "/politica-privacidad" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Política de Privacidad | GCMAsesores.io",
    description: "Consulta la Política de Privacidad de GCMAsesores.io: responsable, datos recogidos, derechos y seguridad.",
    url: "https://gcmasesores.io/politica-privacidad",
    siteName: "GCMAsesores.io",
    locale: "es_ES",
    type: "article",
  },
};

export default function PoliticaPrivacidadPage() {
  return (
    <div className={`${poppins.variable} min-h-screen flex flex-col bg-white text-gray-900`}>
      <OptimizedHeader />
      <main className="flex-grow container mx-auto px-4 py-20 prose prose-lg">
        <h1 className="text-4xl font-bold mb-6">Política de Privacidad</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">1. Responsable del Tratamiento</h2>
          <p>
            El responsable del tratamiento de sus datos personales es GCM SERVICES LLC &quot;GCM&quot;,
            con EIN 99-1045312, domiciliada en 4300 RIDGECREST DR SE SUITE L 1277, RIO RANCHO, NM 87124.
            Correo de contacto: <a href="mailto:info@gcmasesores.io" className="text-blue-600 hover:underline">info@gcmasesores.io</a>.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">2. Finalidad y Legitimación</h2>
          <p>
            GCM trata datos personales para gestionar solicitudes de información, remitir comunicaciones comerciales y
            newsletters. La legitimación se basa en el consentimiento otorgado por el Usuario.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">3. Datos Recogidos</h2>
          <p>GCM puede recopilar los siguientes datos facilitados por el Usuario:</p>
          <ul>
            <li>Nombre y apellidos.</li>
            <li>Correo electrónico y teléfono.</li>
            <li>Dirección IP e información del dispositivo.</li>
            <li>Preferencias y cookies.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">4. Derechos de los Usuarios</h2>
          <p>
            El Usuario puede acceder, rectificar, suprimir, limitar el tratamiento, oponerse y solicitar
            la portabilidad de sus datos. Para ejercerlos, envíe un correo a
            <a href="mailto:info@gcmasesores.io" className="text-blue-600 hover:underline">info@gcmasesores.io</a>.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">5. Seguridad de los Datos</h2>
          <p>
            GCM adopta medidas técnicas y organizativas apropiadas para garantizar la seguridad,
            integridad y confidencialidad de los datos personales.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">6. Conservación de los Datos</h2>
          <p>
            Los datos se conservarán mientras exista relación contractual o hasta que el Usuario
            solicite su supresión. En caso de newsletter, hasta retirar el consentimiento.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">7. Modificaciones de la Política</h2>
          <p>
            GCM podrá actualizar esta Política de Privacidad en cualquier momento. Se publicará
            la versión vigente en este Sitio Web con la fecha de última actualización.
          </p>
        </section>

      </main>
      <OptimizedFooter />
    </div>
  );
}
