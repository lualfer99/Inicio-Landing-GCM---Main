"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { name: "Inicio", href: "/" },
    { name: "Crear LLC", href: "#crear-llc" },
    { name: "Gestoría para LLCs", href: "/gestoria-para-llcs" },
    { name: "Sobre nosotros", href: "#sobre-nosotros" },
    { name: "Blog", href: "#blog" },
  ]

  const handleNavClick = (href: string) => {
    if (href.startsWith("#")) {
      // If it's an anchor link and we're not on the home page, go to home first
      if (pathname !== "/") {
        window.location.href = "/" + href
      } else {
        // If we're on the home page, scroll to the section
        const element = document.querySelector(href)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      }
    }
    setIsOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-gray-50/95 via-white/95 to-blue-50/95 backdrop-blur-sm border-b border-gray-100 shadow-lg">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="container mx-auto px-4 lg:px-6 relative">
        {/* Desktop Layout */}
        <div className="hidden lg:flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img src="/images/logo-blue.png" alt="GCMAsesores Logo" className="h-10 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  if (item.href.startsWith("#")) {
                    e.preventDefault()
                    handleNavClick(item.href)
                  }
                }}
                className={`font-medium transition-colors hover:text-blue-600 ${
                  pathname === item.href || (item.href === "/gestoria-para-llcs" && pathname === "/gestoria-para-llcs")
                    ? "text-blue-600 font-semibold"
                    : "text-gray-700"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div>
            <Button
              className="btn-primary text-white px-6 py-2 rounded-2xl font-bold shadow-primary border-2 border-blue-600 hover:border-blue-700 hover:shadow-primary-lg transition-all duration-300"
              asChild
            >
              <Link
                href="#consulta"
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick("#consulta")
                }}
              >
                AGENDAR ASESORÍA GRATUITA
              </Link>
            </Button>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="flex lg:hidden items-center justify-between h-16">
          {/* Mobile Menu Button (Left) */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-blue-50">
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[300px] sm:w-[400px] bg-gradient-to-br from-gray-50 via-white to-blue-50/30 border-r border-gray-200"
            >
              {/* Background decoration for mobile menu */}
              <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-2xl"></div>

              <nav className="flex flex-col space-y-4 mt-8 relative">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      if (item.href.startsWith("#")) {
                        e.preventDefault()
                        handleNavClick(item.href)
                      } else {
                        setIsOpen(false)
                      }
                    }}
                    className={`font-medium py-3 px-4 rounded-xl transition-all duration-200 hover:bg-white/50 hover:text-blue-600 ${
                      pathname === item.href ||
                      (item.href === "/gestoria-para-llcs" && pathname === "/gestoria-para-llcs")
                        ? "text-blue-600 font-semibold bg-white/30"
                        : "text-gray-700"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <Button
                  className="btn-primary text-white mt-6 rounded-2xl font-bold shadow-primary border-2 border-blue-600 hover:border-blue-700 hover:shadow-primary-lg transition-all duration-300"
                  asChild
                >
                  <Link
                    href="#consulta"
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavClick("#consulta")
                    }}
                  >
                    AGENDAR ASESORÍA GRATUITA
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo (Center) */}
          <div className="flex-1 flex justify-center">
            <Link href="/" className="flex items-center">
              <img src="/images/logo-blue.png" alt="GCMAsesores Logo" className="h-10 w-auto" />
            </Link>
          </div>

          {/* Mobile CTA Button (Right) */}
          <Button
            className="btn-primary text-xs px-3 py-2 h-9 text-white font-bold rounded-xl whitespace-nowrap shadow-primary border border-blue-600 hover:border-blue-700 transition-all duration-300"
            asChild
          >
            <Link
              href="#consulta"
              onClick={(e) => {
                e.preventDefault()
                handleNavClick("#consulta")
              }}
            >
              ASESORÍA
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
