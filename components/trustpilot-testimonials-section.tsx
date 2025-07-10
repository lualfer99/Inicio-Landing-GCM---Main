"use client"

import type React from "react"

import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect, useRef } from "react"

export default function TrustpilotTestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const autoSlideRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("trustpilot-testimonials")
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

  const reviews = [
    {
      name: "Ale",
      initials: "AL",
      country: "ES",
      date: "9 jun 2025",
      rating: 5,
      text: "Solo llevo unos meses trabajando con el equipo y su atención es impecable. Me siento super acompañada en el proceso y siempre tienen alternativas o ideas para un mejor resultado. He estado trabajando con Miguel y Dani de la mano, y estoy super agradecida por su trabajo.",
      verified: true,
    },
    {
      name: "Sergio",
      initials: "SE",
      country: "ES",
      date: "13 may 2025",
      rating: 5,
      text: "Saben muy bien el proceso que hay que seguir y como guiarte en el paso a paso!",
      verified: true,
    },
    {
      name: "Jean Martinez",
      initials: "JM",
      country: "NI",
      date: "25 abr 2025",
      rating: 5,
      text: "Miguel y el equipo de GCM Asesores son los mejores en lo que hacen. Desde la creación y asesoramiento para tu LLC y cuenta de Stripe. Han estado conmigo desde el día 1, guiandome y respondiendo a todas mis preguntas. Super contento con sus servicios.",
      verified: true,
    },
    {
      name: "Arnau",
      initials: "AR",
      country: "ES",
      date: "24 abr 2025",
      rating: 5,
      text: "No puedo hacer más que recomendar a estos grandes profesionales, sobretodo por su atención, y por la agilidad en la resolución de problemas. Siempre están ahí cuando los necesitas y con toda la predisposición del mundo.",
      verified: true,
    },
    {
      name: "Sandra DSJ",
      initials: "SD",
      country: "ES",
      date: "22 abr 2025",
      rating: 5,
      text: "Me gusta mucho lo atentos y disponibles que están siempre a resolver dudas, además de que están muy bien organizados y su servicio es excelente. Siento que mi LLC está en las mejores manos.",
      verified: true,
    },
    {
      name: "Marina Dias",
      initials: "MD",
      country: "ES",
      date: "28 mar 2025",
      rating: 5,
      text: "Hace unos 6 meses vi una publicidad en redes sociales, pero no sabía si era una opción para mí. Tenía muchas dudas y miedos. Me llamaron y me lo explicaron todo de una forma muy simple. Todo el equipo es muy profesional y competente.",
      verified: true,
    },
    {
      name: "Marcel Fernández",
      initials: "MF",
      country: "ES",
      date: "28 mar 2025",
      rating: 5,
      text: "Es una empresa excepcional, un personal muy atento y te ayudan y solucionan cualquier cosa que necesites, un soporte y asesoramiento de 10, siempre estan alli cuando los necesitas.",
      verified: true,
    },
    {
      name: "Jordi Ramos",
      initials: "JR",
      country: "ES",
      date: "9 abr 2025",
      rating: 5,
      text: "Servicio y atención al cliente de 10, muy buen equipo",
      verified: true,
    },
  ]

  const nextSlide = () => {
    const maxIndex = reviews.length - (isMobile ? 1 : 3)
    setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    const maxIndex = reviews.length - (isMobile ? 1 : 3)
    setCurrentIndex((prevIndex) => (prevIndex <= 0 ? maxIndex : prevIndex - 1))
  }

  // Auto-slide functionality (disabled on mobile)
  useEffect(() => {
    if (!isMobile && !isDragging) {
      autoSlideRef.current = setInterval(() => {
        nextSlide()
      }, 6000) // Slower auto-slide
    }

    return () => {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current)
      }
    }
  }, [isMobile, isDragging])

  // Touch/Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - containerRef.current.offsetLeft)
    setScrollLeft(containerRef.current.scrollLeft)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!containerRef.current) return
    setIsDragging(true)
    setStartX(e.touches[0].pageX - containerRef.current.offsetLeft)
    setScrollLeft(containerRef.current.scrollLeft)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return
    e.preventDefault()
    const x = e.pageX - containerRef.current.offsetLeft
    const walk = (x - startX) * 2
    containerRef.current.scrollLeft = scrollLeft - walk
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return
    const x = e.touches[0].pageX - containerRef.current.offsetLeft
    const walk = (x - startX) * 2
    containerRef.current.scrollLeft = scrollLeft - walk
  }

  const handleDragEnd = () => {
    setIsDragging(false)
  }

  const getVisibleReviews = () => {
    if (isMobile) {
      return reviews.slice(currentIndex, currentIndex + 1)
    }
    return reviews.slice(currentIndex, currentIndex + 3)
  }

  return (
    <section id="trustpilot-testimonials" className="py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-6">
        <div
          className={`text-center mb-12 md:mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Trustpilot-style header */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 max-w-2xl mx-auto mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">Nuestras reseñas en</h3>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#00B67A] rounded-full flex items-center justify-center">
                  <Star className="w-4 h-4 text-white fill-current" />
                </div>
                <span className="text-xl md:text-2xl font-bold text-[#00B67A]">Trustpilot</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 md:h-8 md:w-8 text-[#00B67A] fill-current" />
                ))}
              </div>
              <div className="text-2xl md:text-3xl font-bold text-gray-900">4.8</div>
            </div>

            <div className="text-sm md:text-base text-gray-600">
              <span className="font-semibold">Excelente</span> • Basado en{" "}
              <span className="font-semibold">51+ opiniones</span>
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Lo que dicen nuestros <span className="text-[#225DF6]">clientes</span>
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Más de 500 emprendedores ya han optimizado su fiscalidad con nosotros
          </p>
        </div>

        {/* Reviews Container */}
        <div className="relative">
          {/* Mobile: Swipeable container */}
          {isMobile ? (
            <div
              ref={containerRef}
              className="overflow-x-auto scrollbar-hide"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleDragEnd}
              style={{ cursor: isDragging ? "grabbing" : "grab" }}
            >
              <div className="flex gap-4 pb-4" style={{ width: `${reviews.length * 100}%` }}>
                {reviews.map((review, index) => (
                  <div key={index} className="flex-shrink-0 w-full">
                    <ReviewCard review={review} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Desktop: Carousel */
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out gap-6"
                style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
              >
                {reviews.map((review, index) => (
                  <div key={index} className="w-1/3 flex-shrink-0">
                    <ReviewCard review={review} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation buttons (desktop only) */}
          {!isMobile && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all duration-200 hover:scale-105 z-10"
                aria-label="Anterior testimonio"
              >
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all duration-200 hover:scale-105 z-10"
                aria-label="Siguiente testimonio"
              >
                <ChevronRight className="w-6 h-6 text-gray-600" />
              </button>
            </>
          )}
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: Math.ceil(reviews.length / (isMobile ? 1 : 3)) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index * (isMobile ? 1 : 3))}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-200 ${
                Math.floor(currentIndex / (isMobile ? 1 : 3)) === index
                  ? "bg-[#225DF6] scale-125"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Ir al grupo de testimonios ${index + 1}`}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <a
            href="https://es.trustpilot.com/review/gcmasesores.io"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-[#00B67A] hover:bg-[#00B67A] hover:text-white font-semibold px-6 py-3 rounded-full border-2 border-[#00B67A] transition-all duration-200 hover:scale-105"
          >
            Ver todas las reseñas en Trustpilot
            <div className="w-5 h-5 bg-current rounded-full flex items-center justify-center">
              <Star className="w-3 h-3 text-white fill-current" />
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}

// Review Card Component
function ReviewCard({ review }: { review: any }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 h-full flex flex-col hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="relative">
          <div className="w-12 h-12 bg-gradient-to-br from-[#225DF6] to-[#1e4fd6] rounded-full flex items-center justify-center text-white font-semibold text-sm">
            {review.initials}
          </div>
          {review.verified && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#00B67A] rounded-full flex items-center justify-center">
              <Star className="w-3 h-3 text-white fill-current" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-gray-900 truncate">{review.name}</h4>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded flex-shrink-0">{review.country}</span>
          </div>
          <div className="text-xs text-gray-500 mb-2">{review.date}</div>
          <div className="flex">
            {[...Array(review.rating)].map((_, i) => (
              <Star key={i} className="h-4 w-4 text-[#00B67A] fill-current" />
            ))}
          </div>
        </div>
      </div>

      {/* Review text */}
      <div className="flex-1">
        <p className="text-gray-700 leading-relaxed text-sm line-clamp-4">{review.text}</p>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Verificado por Trustpilot</span>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-[#00B67A] fill-current" />
            <span className="text-[#00B67A] font-medium">Trustpilot</span>
          </div>
        </div>
      </div>
    </div>
  )
}
