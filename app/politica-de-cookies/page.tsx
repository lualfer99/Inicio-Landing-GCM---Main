// app/politica-cookies/page.tsx
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
  title: "Política de Cookies | GCMAsesores.io - Uso de Cookies",
  description: "Conoce nuestra Política de Cookies: tipos, uso y cómo gestionarlas para mejorar tu experiencia en GCMAsesores.io.",
  keywords: [
    "Política de Cookies", "cookies técnicas", "cookies analíticas", "cookies publicidad", "GCMAsesores.io",
    "gestión cookies", "consentimiento cookies", "configuración cookies", "datos navegación"
  ],
  alternates: { canonical: "/politica-cookies" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Política de Cookies | GCMAsesores.io",
    description: "Conoce nuestra Política de Cookies: tipos, uso y cómo gestionarlas para mejorar tu experiencia en GCMAsesores.io.",
    url: "https://gcmasesores.io/politica-cookies",
    siteName: "GCMAsesores.io",
    locale: "es_ES",
    type: "article",
  },
};

export default function PoliticaCookiesPage() {
  return (
    <div className={`${poppins.variable} min-h-screen flex flex-col bg-white text-gray-900`}>
      <OptimizedHeader />
      <main className="flex-grow container mx-auto px-4 py-12 prose prose-lg">
        <h1 className="text-4xl font-bold mb-6">Política de Cookies</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">¿Qué son las Cookies?</h2>
          <p>
            Las cookies son pequeños archivos de texto que se descargan en tu dispositivo
            al acceder a un sitio web. Se utilizan para almacenar información sobre tu
            navegación y preferencias, mejorando la experiencia de usuario.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Tipos de Cookies Utilizadas</h2>
          <ul>
            <li><strong>Técnicas:</strong> necesarias para el funcionamiento y navegación en la web.</li>
            <li><strong>Personalización:</strong> recuerdan tus preferencias de idioma, tema u otras.</li>
            <li><strong>Analíticas:</strong> permiten medir el uso y rendimiento del sitio.</li>
            <li><strong>Publicidad:</strong> gestionan espacios publicitarios y su frecuencia.</li>
            <li><strong>Publicidad Personalizada:</strong> adaptan anuncios según tu comportamiento.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Cookies Propias y de Terceros</h2>
          <p>
            En GCMAsesores.io utilizamos tanto cookies propias como de terceros.
            Las cookies de terceros proceden de servicios externos como Google Analytics.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Gestión y Desactivación</h2>
          <p>
            Puedes aceptar o rechazar cookies mediante el banner inicial y gestionarlas
            desde la configuración de tu navegador:
          </p>
          <ul>
            <li><strong>Chrome:</strong> Configuración &gt; Privacidad y seguridad &gt; Cookies y otros datos de sitios.</li>
            <li><strong>Firefox:</strong> Preferencias &gt; Privacidad & Seguridad &gt; Cookies y datos del sitio.</li>
            <li><strong>Safari:</strong> Preferencias &gt; Privacidad &gt; Cookies y datos de sitios web.</li>
            <li><strong>Edge:</strong> Configuración &gt; Cookies y permisos del sitio.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Más Información</h2>
          <p>
            Para más detalles sobre la gestión de cookies, visita la ayuda de tu navegador
            o consulta los sitios oficiales:
          </p>
          <ul>
            <li><a href="https://support.google.com/accounts/answer/61416?hl=es" className="text-blue-600 hover:underline">Soporte Chrome</a></li>
            <li><a href="https://support.mozilla.org/es/kb/cookies" className="text-blue-600 hover:underline">Soporte Firefox</a></li>
            <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" className="text-blue-600 hover:underline">Soporte Safari</a></li>
            <li><a href="https://privacy.microsoft.com/es-es/windows-10-microsoft-edge-and-privacy" className="text-blue-600 hover:underline">Soporte Edge</a></li>
          </ul>
        </section>

      </main>
      <OptimizedFooter />
    </div>
  );
}
