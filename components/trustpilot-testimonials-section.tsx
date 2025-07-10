"use client"

import type React from "react"

import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"

export default function TrustpilotTestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  // Minimum distance for swipe detection
  const minSwipeDistance = 50

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

  const reviewsPerPage = isMobile ? 1 : 4
  const maxIndex = Math.max(0, reviews.length - reviewsPerPage)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, maxIndex))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0))
  }

  // Touch handlers for swipe gestures
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe && currentIndex < maxIndex) {
      nextSlide()
    }
    if (isRightSwipe && currentIndex > 0) {
      prevSlide()
    }
  }

  const getVisibleReviews = () => {
    return reviews.slice(currentIndex, currentIndex + reviewsPerPage)
  }

  const canGoPrev = currentIndex > 0
  const canGoNext = currentIndex < maxIndex

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
          <div
            className="overflow-hidden"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div
              className={`flex transition-transform duration-500 ease-in-out ${isMobile ? "gap-4" : "gap-6"}`}
              style={{
                transform: `translateX(-${currentIndex * (100 / reviewsPerPage)}%)`,
                width: `${(reviews.length / reviewsPerPage) * 100}%`,
              }}
            >
              {reviews.map((review, index) => (
                <div key={index} className={`flex-shrink-0 ${isMobile ? "w-full" : "w-1/4"}`}>
                  <ReviewCard review={review} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons - Always visible on both mobile and desktop */}
          <button
            onClick={prevSlide}
            disabled={!canGoPrev}
            className={`absolute left-0 top-1/2 -translate-y-1/2 ${
              isMobile ? "-translate-x-2" : "-translate-x-4"
            } w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105 z-10 ${
              canGoPrev ? "hover:bg-gray-50 text-gray-600" : "opacity-50 cursor-not-allowed text-gray-400"
            }`}
            aria-label="Anterior testimonio"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <button
            onClick={nextSlide}
            disabled={!canGoNext}
            className={`absolute right-0 top-1/2 -translate-y-1/2 ${
              isMobile ? "translate-x-2" : "translate-x-4"
            } w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105 z-10 ${
              canGoNext ? "hover:bg-gray-50 text-gray-600" : "opacity-50 cursor-not-allowed text-gray-400"
            }`}
            aria-label="Siguiente testimonio"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: Math.ceil(reviews.length / reviewsPerPage) }).map((_, index) => {
            const isActive = Math.floor(currentIndex / reviewsPerPage) === index
            return (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * reviewsPerPage)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-200 ${
                  isActive ? "bg-[#225DF6] scale-125" : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Ir al grupo de testimonios ${index + 1}`}
              />
            )
          })}
        </div>

        {/* Navigation info */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            {currentIndex + 1} - {Math.min(currentIndex + reviewsPerPage, reviews.length)} de {reviews.length} reseñas
          </p>
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
        <p className="text-gray-700 leading-relaxed text-sm">{review.text}</p>
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
