"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function BlogHeader() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image src="/images/logo.png" alt="GCM Asesores" width={120} height={40} className="h-10 w-auto" />
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Inicio
            </Link>
            <Link
              href="/gestoria-para-llcs"
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              Gestoría para LLCs
            </Link>
            <Link href="/blog" className="text-blue-600 font-semibold">
              Blog
            </Link>
          </nav>

          {/* CTA Button */}
          <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium">
            <Link href="/#consulta">Agendar Asesoría</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
