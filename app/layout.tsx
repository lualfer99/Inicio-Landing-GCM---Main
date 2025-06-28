import type { Metadata } from "next";
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
  title: {
    default: "GCMAsesores.io - Optimiza tu fiscalidad creando una LLC en EE.UU.",
    template: "%s | GCMAsesores.io",
  },
  description: "Especialistas en creación y gestión fiscal de LLCs para emprendedores digitales. Optimiza tu fiscalidad de manera 100% legal con nuestros expertos.",
  keywords: [
    // Genéricas y de alto volumen
    "LLC Estados Unidos", "crear LLC EEUU", "abrir LLC USA", "constitución LLC", "registro LLC EEUU",
    "formación de LLC", "creación de LLC", "trámites LLC", "LLC online", "LLC USA sin residente",
    "LLC extranjero", "ventajas LLC EEUU", "requisitos LLC en EE. UU.", "tipos de LLC", "Delaware LLC",
    "Wyoming LLC", "Nevada LLC", "LLC en Florida", "LLC en Texas", "LLC en California",
    "mejor estado para LLC", "comparación de estados LLC", "LLC vs. S-Corp", "LLC vs. Corporation", "LLC vs. Partnership",
    
    // Servicios y gestoría fiscal
    "gestoría LLC", "gestor fiscal para LLC", "asesoría LLC online", "servicios fiscales LLC", "fiscalidad LLC",
    "contabilidad LLC", "contable para LLC", "reporting BOI LLC", "declaración impuestos LLC", "preparación de impuestos LLC",
    "gestoría digital LLC", "administración LLC", "compliance LLC", "servicio contable para LLC", "asesor fiscal digital",
    
    // Optimización fiscal y compliance
    "optimización fiscal LLC", "beneficios fiscales LLC", "deducciones fiscales LLC", "impuestos LLC EEUU", "tax benefits LLC",
    "planificación fiscal LLC", "offshoring fiscal", "residencia fiscal digital", "treaty benefits LLC", "tratados fiscales EEUU España",
    "reportes BOI LLC", "FATCA LLC", "CRS LLC", "compliance fiscal internacional",
    
    // Trámites técnicos
    "EIN LLC", "ITIN trámite", "ITIN para no residentes", "ITIN EEUU", "EIN online",
    "solicitar EIN", "FEIN LLC", "número fiscal LLC", "registro fiscal EEUU", "IRS LLC",
    "registro agente residente", "registered agent service", "dirección fiscal EEUU", "PO Box EEUU",
    
    // Emprendedores digitales y nomadismo
    "emprendedores digitales", "digital nomad tax", "visa nómada digital España", "visa nómada digital EEUU", "residencia nómada digital",
    "nomadismo digital fiscal", "vida de nómada digital", "trabajar remoto desde España", "cómo ser nómada digital", "digital nomad LLC",
    "LLC para nómadas digitales", "guía nómada digital",
    
    // Long-tail y preguntas frecuentes
    "cómo crear una LLC en EE. UU.", "paso a paso creación LLC EEUU", "crear LLC desde España", "abrir LLC sin residencia", "cuánto cuesta crear una LLC",
    "tiempo para crear LLC", "mejores estados para LLC en EEUU", "protección de activos LLC", "ventajas y desventajas LLC", "diferencias LLC y empresa individual",
    "preguntas frecuentes LLC", "FAQ creación LLC", "guía completa LLC EEUU", "tutorial creación LLC", "qué es una LLC?",
    "cómo funciona una LLC?", "por qué crear una LLC?", "para quién es recomendable la LLC?",
    
    // Locales / Geo-modificadores (España)
    "crear LLC EE. UU. desde Madrid", "gestoría LLC Barcelona", "asesoría fiscal Madrid LLC", "gestoría digital España LLC", "creación LLC Valencia",
    "asesor fiscal nómada digital España", "gestoría online para LLC España",
    
    // Marca y competidores
    "GCMAsesores", "GCMAsesores LLC", "Global Community Management LLC", "gcmasesores.io", "gcmsociety LLC",
    "competidores LLC EEUU", "Top asesoría LLC", "mejores gestorías LLC",
    
    // Contenido y blog
    "blog LLC EEUU", "artículos creación LLC", "noticias fiscal LLC", "tendencias fiscalidad digital", "casos de éxito LLC",
    "estudios de caso LLC", "guías fiscales LLC",
    
    // Power words y modificadores
    "mejor gestoría LLC", "rápida creación de LLC", "económico crear LLC", "fácil abrir LLC", "profesional asesoría LLC",
    "completo servicio fiscal", "100% legal LLC", "optimiza tu fiscalidad", "protege tu patrimonio"
  ],
  authors: [{ name: "GCMAsesores.io", url: "https://gcmasesores.io/#proceso" }],
  creator: "GCMAsesores.io",
  publisher: "GCMAsesores.io",
  alternates: { canonical: "/" },
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)",  color: "#000000" }
  ],
  verification: {
    google: "google-site-verification-code",
    bing:   "bing-site-verification-code",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "GCMAsesores.io - Optimiza tu fiscalidad creando una LLC en EE.UU.",
    description: "Especialistas en creación y gestión fiscal de LLCs para emprendedores digitales.",
    url: "https://gcmasesores.io",
    siteName: "GCMAsesores.io",
    locale: "es_ES",
    type: "website",
    images: [{
      url: "https://gcmasesores.io/images/logo.png",
      width: 1200,
      height: 630,
      alt: "GCMAsesores.io",
    }]
  },
    generator: 'v0.dev'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={poppins.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      </head>
      <body className="font-poppins antialiased bg-white text-gray-900">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "GCMAsesores.io",
                url: "https://gcmasesores.io",
                logo: "https://gcmasesores.io/images/logo.png",
                description: "Especialistas en creación y gestión fiscal de LLCs para emprendedores digitales",
                address: { "@type": "PostalAddress", addressCountry: "ES" },
                contactPoint: { "@type": "ContactPoint", contactType: "customer service", availableLanguage: "Spanish" },
                sameAs: [
                  "https://www.instagram.com/gcmsociety/",
                  "https://www.facebook.com/people/Global-Community-Management-LLC/100091921369533/",
                  "https://www.youtube.com/channel/UCe0BfgldW1X_i-RL-nkq1aA"
                ]
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                url: "https://gcmasesores.io",
                potentialAction: { "@type": "SearchAction", target: "https://gcmasesores.io/?s={query}", "query-input": "required name=query" }
              }
            ])
          }}
        />
        {children}
      </body>
    </html>
  );
}
