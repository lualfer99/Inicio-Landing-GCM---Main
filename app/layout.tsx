import type React from "react"
import type { Metadata } from "next"
iimport { Poppins } from "next/font/google"
mport "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata: Metadata = {
  title: "GCMAsesores.io - Optimiza tu fiscalidad creando una LLC en EE.UU.",
  description:
    "Especialistas en creación y gestión fiscal de LLCs para emprendedores digitales. Optimiza tu fiscalidad de manera 100% legal con nuestros expertos.",
  keywords: "LLC Estados Unidos, optimización fiscal, emprendedores digitales, gestoría fiscal, crear LLC EEUU",
  authors: [{ name: "GCMAsesores.io" }],
  creator: "GCMAsesores.io",
  publisher: "GCMAsesores.io",
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
    type: "website",
    locale: "es_ES",
    url: "https://gcmasesores.io",
    title: "GCMAsesores.io - Optimiza tu fiscalidad creando una LLC en EE.UU.",
    description: "Especialistas en creación y gestión fiscal de LLCs para emprendedores digitales.",
    siteName: "GCMAsesores.io",
  },
  twitter: {
    card: "summary_large_image",
    title: "GCMAsesores.io - Optimiza tu fiscalidad creando una LLC en EE.UU.",
    description: "Especialistas en creación y gestión fiscal de LLCs para emprendedores digitales.",
  },
  verification: {
    google: "google-site-verification-code",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={poppins.variable}>
      <head>
        <link rel="canonical" href="https://gcmasesores.io" />
        <meta name="theme-color" content="#225DF6" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "GCMAsesores.io",
              url: "https://gcmasesores.io",
              logo: "https://gcmasesores.io/logo.png",
              description: "Especialistas en creación y gestión fiscal de LLCs para emprendedores digitales",
              address: {
                "@type": "PostalAddress",
                addressCountry: "ES",
              },
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                availableLanguage: "Spanish",
              },
              sameAs: [
                "https://www.instagram.com/gcmasesores",
                "https://www.facebook.com/gcmasesores",
                "https://www.youtube.com/gcmasesores",
              ],
            }),
          }}
        />
      </head>
      <body className="font-poppins antialiased bg-white text-gray-900">{children}</body>
    </html>
  )
}


import './globals.css'