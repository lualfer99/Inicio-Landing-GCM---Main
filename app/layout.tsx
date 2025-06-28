import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "GCM Asesores - Especialistas en LLCs y Fiscalidad Internacional",
    template: "%s | GCM Asesores",
  },
  description:
    "Especialistas en asesoría fiscal internacional y constitución de LLCs en Estados Unidos para emprendedores españoles. Optimiza tu estructura fiscal de forma legal y eficiente.",
  keywords: [
    "LLC",
    "Estados Unidos",
    "asesoría fiscal",
    "fiscalidad internacional",
    "emprendedores",
    "España",
    "Delaware",
    "Wyoming",
    "Nevada",
  ],
  authors: [{ name: "GCM Asesores" }],
  creator: "GCM Asesores",
  publisher: "GCM Asesores",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://gcmasesores.io"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://gcmasesores.io",
    siteName: "GCM Asesores",
    title: "GCM Asesores - Especialistas en LLCs y Fiscalidad Internacional",
    description:
      "Especialistas en asesoría fiscal internacional y constitución de LLCs en Estados Unidos para emprendedores españoles.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "GCM Asesores - Especialistas en LLCs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GCM Asesores - Especialistas en LLCs y Fiscalidad Internacional",
    description:
      "Especialistas en asesoría fiscal internacional y constitución de LLCs en Estados Unidos para emprendedores españoles.",
    images: ["/images/og-image.jpg"],
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
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
