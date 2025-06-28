"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { PenTool, Home } from "lucide-react"

export function BlogHeader() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center">
              <Image src="/images/logo.png" alt="GCM Asesores" width={120} height={40} className="h-10 w-auto" />
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                <Home className="h-4 w-4" />
                Inicio
              </Link>
              <Link href="/blog" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                Blog
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" asChild className="hidden sm:flex bg-transparent">
              <Link href="/blog/admin">
                <PenTool className="h-4 w-4 mr-2" />
                Admin
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
