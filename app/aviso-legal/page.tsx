// app/aviso-legal/page.tsx
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
  title: "Aviso Legal | GCMAsesores.io - Transparencia y Cumplimiento",
  description: "Consulta el Aviso Legal de GCMAsesores.io: términos de uso, propiedad intelectual, protección de datos y responsabilidades.",
  keywords: [
    "Aviso Legal", "términos de uso", "propiedad intelectual", "responsabilidades legales", "GCMAsesores.io",
    "cumplimiento legal", "condiciones de servicio", "protección de datos", "contingencias"
  ],
  alternates: { canonical: "/aviso-legal" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Aviso Legal | GCMAsesores.io",
    description: "Consulta el Aviso Legal de GCMAsesores.io: términos de uso, propiedad intelectual, protección de datos y responsabilidades.",
    url: "https://gcmasesores.io/aviso-legal",
    siteName: "GCMAsesores.io",
    locale: "es_ES",
    type: "article",
  },
};

export default function AvisoLegalPage() {
  return (
    <div className={`${poppins.variable} min-h-screen flex flex-col bg-white text-gray-900`}>
      <OptimizedHeader />
      <main className="flex-grow container mx-auto px-4 py-20 prose prose-lg">
        <h1 className="text-4xl font-bold mb-6">Aviso Legal</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Aviso legal</h2>
          <p>&nbsp;</p>
          <h3 className="font-semibold mb-2">1.- Derecho de la información</h3>
          <p>
            Le informamos que este Sitio Web{' '}
            <a href="https://gcmasesores.io" className="text-blue-600 hover:underline">
              https://gcmasesores.io
            </a>{' '}
            (en adelante, el “Sitio Web”) es titularidad de GCM SERVICES LLC (en adelante, “GCM”),
            con Nº EIN 99-1045312, y domicilio en 4300 RIDGECREST DR SE SUITE L 1277, RIO RANCHO, NM 87124.
          </p>
          <p>
            El acceso y uso del Sitio Web atribuye al Usuario la aceptación de este Aviso Legal.
            Para consultas, contacte a{' '}
            <a href="mailto:info@gcmasesores.io" className="text-blue-600 hover:underline">
              info@gcmasesores.io
            </a>{' '}
            o llame al +1 352 608 0344.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-2xl font-semibold mb-2">2.- Uso del Sitio Web</h3>
          <p>
            El Usuario asume la responsabilidad del uso del Sitio Web. Puede acceder a contenidos
            («Contenidos») pertenecientes a GCM o terceros. El Usuario se compromete a no usarlos para:
          </p>
          <ul>
            <li>Incurrir en actividades ilícitas, ilegales o contrarias al orden público.</li>
            <li>Provocar daños en sistemas de GCM, proveedores o terceros.</li>
            <li>Introducir virus o sistemas dañinos.</li>
            <li>Manipular datos sin autorización.</li>
            <li>Reproducir, distribuir o modificar Contenidos sin permiso.</li>
            <li>Ocultar o manipular información de propiedad intelectual.</li>
          </ul>
          <p>
            GCM puede suspender temporalmente el Sitio Web por mantenimiento, avisando con antelación cuando sea posible.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-2xl font-semibold mb-2">3.- Propiedad Intelectual e Industrial</h3>
          <p>
            Todos los derechos de propiedad intelectual e industrial del Sitio Web (imágenes, software,
            textos, marcas, diseño, etc.) son exclusivos de GCM o de terceros autorizados. Queda prohibida
            la reproducción, distribución o modificación sin autorización previa.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-2xl font-semibold mb-2">4.- Protección de datos</h3>
          <p>
            El uso del Sitio Web puede requerir datos personales. GCM trata esta información conforme a
            la normativa vigente. Consulte nuestra Política de Privacidad para más información.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-2xl font-semibold mb-2">5.- Responsabilidad y Garantías</h3>
          <p>
            GCM adopta medidas razonables para el correcto funcionamiento, pero no garantiza continuidad,
            ausencia de errores o virus. No se responsabiliza de daños derivados del uso del Sitio Web.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-2xl font-semibold mb-2">6.- Duración y modificación</h3>
          <p>
            Este Aviso Legal es indefinido y puede modificarse en cualquier momento. La versión vigente se
            publicará en el Sitio Web.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-2xl font-semibold mb-2">7.- Hipervínculos</h3>
          <p>
            GCM no asume responsabilidad por enlaces a sitios externos. El acceso a dichos enlaces es bajo
            responsabilidad del Usuario.
          </p>
        </section>

        <section>
          <h3 className="text-2xl font-semibold mb-2">8.- Salvaguardia e interpretación</h3>
          <p>
            Si alguna cláusula es inválida, las restantes permanecerán vigentes. La no exigencia de derechos
            no implica renuncia futura.
          </p>
        </section>
      </main>
      <OptimizedFooter />
    </div>
  );
}
