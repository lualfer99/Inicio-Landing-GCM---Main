// app/aviso-legal/page.tsx
import type { Metadata } from "next";
import OptimizedHeader from "@/components/optimized-header";
import OptimizedFooter from "@/components/optimized-footer";
import { Poppins } from "next/font/google";
import "./globals.css";

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
    "Aviso Legal", "términos de uso", "protección de datos", "propiedad intelectual", "responsabilidades legales", "GCMAsesores.io",
    "cumplimiento legal", "condiciones de servicio", "Ley de Propiedad Intelectual", "política de privacidad"
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
    images: []
  }
};

export default function AvisoLegalPage() {
  return (
    <>      
      <div className={poppins.variable}>
        <OptimizedHeader />
        <main className="container mx-auto py-20 prose prose-lg">
          <h1>Aviso Legal</h1>
          <section>
            <h2>1. Derecho de la información</h2>
            <p>
              Le informamos que este Sitio Web{' '}
              <a href="https://gcmasesores.io" className="text-blue-600 hover:underline">
                https://gcmasesores.io
              </a>{' '}
              (en adelante, el “Sitio Web”) es titularidad de GCM SERVICES LLC, con EIN 99-1045312,
              domiciliada en 4300 RIDGECREST DR SE SUITE L 1277, RIO RANCHO, NM 87124.
            </p>
            <p>
              El acceso y uso del Sitio Web le atribuye la condición de Usuario y supone la aceptación
              de este Aviso Legal. Puede contactar con GCM en{' '}
              <a href="mailto:info@gcmasesores.io" className="text-blue-600 hover:underline">
                info@gcmasesores.io
              </a>{' '}
              o al teléfono +1 352 608 0344.
            </p>
          </section>

          <section>
            <h2>2. Uso del Sitio Web</h2>
            <p>
              El Usuario se compromete a hacer un uso adecuado de los contenidos y servicios,
              y a no emplearlos para:
            </p>
            <ul>
              <li>Incurrir en actividades ilícitas o contrarias al orden público.</li>
              <li>Provocar daños en los sistemas de GCM, proveedores o terceros.</li>
              <li>Introducir virus u otros elementos dañinos.</li>
              <li>Manipular datos o contenidos sin autorización.</li>
              <li>Reproducir, distribuir o modificar contenidos sin permiso.</li>
              <li>Ocultar o manipular información de propiedad intelectual.</li>
            </ul>
            <p>
              GCM se reserva el derecho de suspender temporalmente el Sitio Web por motivos
              de mantenimiento o mejoras, notificándolo con antelación siempre que sea posible.
            </p>
          </section>

          <section>
            <h2>3. Propiedad Intelectual e Industrial</h2>
            <p>
              Todos los derechos de contenido y diseño gráfico del Sitio Web (textos, imágenes,
              marcas, logotipos, software, etc.) son propiedad exclusiva de GCM o de terceros
              autorizados. Queda prohibida cualquier explotación comercial sin autorización.
            </p>
          </section>

          <section>
            <h2>4. Protección de datos</h2>
            <p>
              GCM trata los datos personales conforme a la legislación aplicable. Consulte nuestra{' '}
              <a href="/politica-privacidad" className="text-blue-600 hover:underline">
                Política de Privacidad
              </a>{' '}
              para más información.
            </p>
          </section>

          <section>
            <h2>5. Responsabilidad y Garantías</h2>
            <p>
              GCM adopta medidas razonables para asegurar el buen funcionamiento del Sitio Web,
              pero no garantiza la continuidad, disponibilidad o ausencia de errores. No se
              responsabiliza de daños causados por errores, virus o actos de terceros.
            </p>
          </section>

          <section>
            <h2>6. Duración y Modificación</h2>
            <p>
              Este Aviso Legal permanecerá vigente hasta su modificación. GCM podrá actualizarlo
              en cualquier momento y publicará la versión vigente en el Sitio Web.
            </p>
          </section>

          <section>
            <h2>7. Hipervínculos</h2>
            <p>
              GCM no asume responsabilidad sobre contenidos de terceros enlazados. El acceso
              se realiza bajo responsabilidad del Usuario.
            </p>
          </section>

          <section>
            <h2>8. Salvaguardia e Interpretación</h2>
            <p>
              Si alguna cláusula se declara inválida, las demás permanecerán vigentes. La no
              exigencia de cumplimiento no implica renuncia a derechos futuros.
            </p>
          </section>

          <section>
            <h2>9. Información General y Notificaciones</h2>
            <p>
              GCM podrá ejercer acciones legales por incumplimiento del Aviso Legal. Las
              notificaciones se enviarán a través de los datos facilitados por el Usuario.
            </p>
          </section>
        </main>
        <OptimizedFooter />
      </div>
    </>
  );
}
