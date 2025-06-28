"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"

export function BlogHeader() {
  const pathname = usePathname()

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center">
              <Image src="/images/logo.png" alt="GCM Asesores" width={120} height={40} className="h-10 w-auto" />
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                Inicio
              </Link>
              <Link
                href="/gestoria-para-llcs"
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                Gestoría para LLCs
              </Link>
              <Link
                href="/blog"
                className={`font-medium transition-colors ${
                  pathname?.startsWith("/blog") ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
                }`}
              >
                Blog
              </Link>
              <Link href="/blog/admin" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                Admin
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
              <Link href="/#consulta">Asesoría Gratuita</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
