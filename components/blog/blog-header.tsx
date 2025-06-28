"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { SessionManager } from "@/lib/auth"
import { useEffect, useState } from "react"
import { User, LogOut, Settings } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function BlogHeader() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userSession, setUserSession] = useState<any>(null)

  useEffect(() => {
    const session = SessionManager.getSession()
    setIsAuthenticated(SessionManager.isAuthenticated())
    setUserSession(session)
  }, [])

  const handleLogout = () => {
    SessionManager.clearSession()
    setIsAuthenticated(false)
    setUserSession(null)
    window.location.href = "/blog"
  }

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image src="/images/logo-blue.png" alt="GCM Asesores" width={120} height={40} className="h-8 w-auto" />
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/blog" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Blog
            </Link>
            <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Inicio
            </Link>
            <Link
              href="/gestoria-para-llcs"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Servicios
            </Link>
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {isAuthenticated && userSession ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">{userSession.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{userSession.name}</p>
                    <p className="text-xs text-gray-500">{userSession.email}</p>
                    <p className="text-xs text-blue-600 capitalize">{userSession.role}</p>
                  </div>
                  <DropdownMenuSeparator />
                  {SessionManager.hasEditorAccess() && (
                    <DropdownMenuItem asChild>
                      <Link href="/blog/admin" className="flex items-center">
                        <Settings className="h-4 w-4 mr-2" />
                        Panel de Admin
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    <LogOut className="h-4 w-4 mr-2" />
                    Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild variant="outline">
                <Link href="/blog/admin">Iniciar Sesión</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
