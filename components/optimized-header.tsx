"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import OptimizedImage from "./image-optimization"

export default function OptimizedHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Inicio", href: "#inicio" },
    { name: "Crear LLC", href: "#servicios" },
    { name: "Gestoría para LLCs", href: "#beneficios" },
    { name: "Sobre nosotros", href: "#proceso" },
    { name: "FAQ", href: "#faq" },
  ]

  const handleNavClick = (href: string) => {
    setIsOpen(false)
    if (href.startsWith("#")) {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm"
          : "bg-white/90 backdrop-blur-sm border-b border-gray-100"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-between w-full">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center transition-transform hover:scale-105"
              onClick={() => handleNavClick("#inicio")}
            >
              <OptimizedImage
                src="/images/logo-blue.png"
                alt="GCMAsesores Logo"
                width={140}
                height={45}
                className="h-12 w-auto"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 relative group cursor-pointer"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="flex items-center">
              <Button className="btn-primary text-base" asChild>
                <Link href="#consulta">AGENDAR ASESORÍA GRATUITA</Link>
              </Button>
            </div>
          </div>

          {/* Mobile Navigation - Three Column Layout */}
          <div className="flex lg:hidden items-center justify-between w-full">
            {/* Left: Hamburger Menu */}
            <div className="flex items-center">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="hover:bg-gray-100 p-2">
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[320px] sm:w-[400px] bg-white">
                  <nav className="flex flex-col space-y-6 mt-12">
                    {navItems.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => handleNavClick(item.href)}
                        className="text-gray-700 hover:text-blue-600 font-medium py-3 text-lg transition-colors border-b border-gray-100 last:border-0 text-left"
                      >
                        {item.name}
                      </button>
                    ))}
                    <Button className="btn-primary mt-8 text-base" asChild>
                      <Link href="#consulta" onClick={() => setIsOpen(false)}>
                        AGENDAR ASESORÍA
                      </Link>
                    </Button>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>

            {/* Center: Logo */}
            <div className="flex items-center justify-center flex-1">
              <Link
                href="/"
                className="flex items-center transition-transform hover:scale-105"
                onClick={() => handleNavClick("#inicio")}
              >
                <OptimizedImage
                  src="/images/logo-blue.png"
                  alt="GCMAsesores Logo"
                  width={120}
                  height={38}
                  className="h-10 w-auto"
                  priority
                />
              </Link>
            </div>

            {/* Right: CTA Button */}
            <div className="flex items-center">
              <Button className="btn-primary text-xs px-3 py-2 h-9 whitespace-nowrap" asChild>
                <Link href="#consulta">ASESORÍA GRATUITA</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
