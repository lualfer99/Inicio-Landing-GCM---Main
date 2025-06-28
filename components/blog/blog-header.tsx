"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { getCurrentUser, hasAdminAccess } from "@/lib/auth"
import { Home, BookOpen, Settings } from "lucide-react"

export function BlogHeader() {
  const user = getCurrentUser()
  const isAdmin = hasAdminAccess(user)

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
            <Link href="/" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors">
              <Home className="h-4 w-4" />
              Inicio
            </Link>
            <Link href="/blog" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors">
              <BookOpen className="h-4 w-4" />
              Blog
            </Link>
            {isAdmin && (
              <Link
                href="/blog/admin"
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <Settings className="h-4 w-4" />
                Admin
              </Link>
            )}
          </nav>

          {/* User Info */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">
                  {user.name} ({user.role})
                </span>
                {!isAdmin && (
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/blog/admin">Admin</Link>
                  </Button>
                )}
              </div>
            ) : (
              <Button variant="outline" size="sm" asChild>
                <Link href="/blog/admin">Login</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
