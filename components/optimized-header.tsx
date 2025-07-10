"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Calendar } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { usePathname } from "next/navigation"
import OptimizedImage from "./image-optimization"
import { useRouter } from "next/navigation"

export default function OptimizedHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Inicio", href: "#inicio" },
    { name: "Crear LLC", href: "#creacion-llc" },
    { name: "Gestoría para LLCs", href: "/gestoria-para-llcs" },
    { name: "Sobre nosotros", href: "#proceso" },
    { name: "FAQ", href: "#faq" },
    { name: "Blog", href: "/blog" },
  ]

  const handleNavClick = (href: string) => {
    setIsOpen(false)

    if (href.startsWith("#")) {
      if (pathname !== "/") {
        router.push("/" + href)
      } else {
        const element = document.querySelector(href)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      }
    } else {
      router.push(href)
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-gradient-to-r from-gray-50/95 via-white/95 to-blue-50/95 backdrop-blur-md border-b border-gray-200 shadow-lg"
          : "bg-gradient-to-r from-gray-50/90 via-white/90 to-blue-50/90 backdrop-blur-sm border-b border-gray-100"
      }`}
    >
      {/* Background decoration matching hero */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 right-10 w-32 h-32 bg-blue-600/5 rounded-full blur-2xl"></div>
      <div className="absolute top-0 left-10 w-40 h-40 bg-blue-600/3 rounded-full blur-2xl"></div>

      <div className="container mx-auto px-4 lg:px-6 relative">
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

            {/* CTA Button - Matching Hero Style */}
            <div className="flex items-center">
              <Button
                size="sm"
                className="btn-primary text-xs md:text-xl px-8 md:px-12 py-4 md:py-6 text-white font-bold rounded-xl shadow-lg border border-white/20"
                onClick={() => handleNavClick("#consulta")}
              >
                <Calendar className="w-5 md:w-6 h-5 md:h-6" />
                AGENDAR ASESORÍA GRATUITA
              </Button>
            </div>
          </div>

          {/* Mobile Navigation - Three Column Layout */}
          <div className="flex lg:hidden items-center justify-between w-full">
            {/* Left: Hamburger Menu */}
            <div className="flex items-center">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-white/50 p-2 rounded-xl backdrop-blur-sm border border-white/20 shadow-md"
                  >
                    {isOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="w-[320px] sm:w-[400px] bg-gradient-to-br from-gray-50 via-white to-blue-50/30 backdrop-blur-md border-r border-gray-200"
                >
                  {/* Background decoration in mobile menu */}
                  <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
                  <div className="absolute top-10 right-5 w-20 h-20 bg-blue-600/5 rounded-full blur-xl"></div>

                  <nav className="flex flex-col space-y-6 mt-12 relative">
                    {navItems.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => handleNavClick(item.href)}
                        className="text-gray-700 hover:text-blue-600 font-medium py-3 text-lg transition-colors border-b border-gray-100 last:border-0 text-left hover:bg-white/30 rounded-lg px-4"
                      >
                        {item.name}
                      </button>
                    ))}
                    <Button
                      size="lg"
                      className="btn-primary mt-8 text-base px-6 py-4 text-white font-bold rounded-2xl shadow-2xl border-2 border-white/20"
                      onClick={() => handleNavClick("#consulta")}
                    >
                      <Calendar className="w-5 h-5 mr-2" />
                      AGENDAR ASESORÍA
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

            {/* Right: CTA Button - Matching Hero Style */}
            <div className="flex items-center">
              <Button
                size="sm"
                className="btn-primary text-xs md:text-xl px-8 md:px-12 py-4 md:py-6 text-white font-bold rounded-xl shadow-lg border border-white/20"
                onClick={() => handleNavClick("#consulta")}
              >
                <Calendar className="w-5 md:w-6 h-5 md:h-6" />
                ASESORÍA GRATUITA
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
