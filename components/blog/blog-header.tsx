"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Settings } from "lucide-react"

interface BlogHeaderProps {
  showBackButton?: boolean
  showAdminButton?: boolean
  title?: string
}

export function BlogHeader({ showBackButton = true, showAdminButton = false, title }: BlogHeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/images/logo-blue.png" alt="GCM Asesores" width={40} height={40} className="w-10 h-10" />
              <span className="text-xl font-bold text-gray-900">GCM Asesores</span>
            </Link>

            {title && (
              <div className="hidden md:block">
                <h1 className="text-lg font-semibold text-gray-700">{title}</h1>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            {showBackButton && (
              <Button variant="ghost" asChild>
                <Link href="/" className="flex items-center space-x-2">
                  <ArrowLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">Volver al sitio</span>
                </Link>
              </Button>
            )}

            {showAdminButton && (
              <Button variant="outline" asChild>
                <Link href="/blog/admin" className="flex items-center space-x-2">
                  <Settings className="h-4 w-4" />
                  <span className="hidden sm:inline">Admin</span>
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
