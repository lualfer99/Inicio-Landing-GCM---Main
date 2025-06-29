"use client"

import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { useState, useEffect } from "react"
import OptimizedImage from "./image-optimization"

export default function TrustpilotTestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

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
      avatar: "/professional-woman-avatar.png",
    },
    {
      name: "Sergio",
      initials: "SE",
      country: "ES",
      date: "13 may 2025",
      rating: 5,
      text: "Saben muy bien el proceso que hay que seguir y como guiarte en el paso a paso!",
      avatar: "/professional-man-avatar.png",
    },
    {
      name: "Jean Martinez",
      initials: "JM",
      country: "NI",
      date: "25 abr 2025",
      rating: 5,
      text: "Miguel y el equipo de GCM Asesores son los mejores en lo que hacen. Desde la creación y asesoramiento para tu LLC y cuenta de Stripe. Han estado conmigo desde el día 1, guiandome y respondiendo a todas mis preguntas. Super contento con sus servicios.",
      avatar: "/professional-latino-man-avatar.png",
    },
    {
      name: "Arnau",
      initials: "AR",
      country: "ES",
      date: "24 abr 2025",
      rating: 5,
      text: "No puedo hacer más que recomendar a estos grandes profesionales, sobretodo por su atención, y por la agilidad en la resolución de problemas. Siempre están ahí cuando los necesitas y con toda la predisposición del mundo.",
      avatar: "/young-professional-man-avatar.png",
    },
    {
      name: "Sandra DSJ",
      initials: "SD",
      country: "ES",
      date: "22 abr 2025",
      rating: 5,
      text: "Me gusta mucho lo atentos y disponibles que están siempre a resolver dudas, además de que están muy bien organizados y su servicio es excelente. Siento que mi LLC está en las mejores manos.",
      avatar: "/professional-woman-business-avatar.png",
    },
    {
      name: "Marina Dias",
      initials: "MD",
      country: "ES",
      date: "28 mar 2025",
      rating: 5,
      text: "Hace unos 6 meses vi una publicidad en redes sociales, pero no sabía si era una opción para mí. Tenía muchas dudas y miedos. Me llamaron y me lo explicaron todo de una forma muy simple. Todo el equipo es muy profesional y competente.",
      avatar: "/professional-woman-smiling-avatar.png",
    },
  ]

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1 >= reviews.length ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 < 0 ? reviews.length - 1 : prevIndex - 1))
  }

  const getVisibleReviews = () => {
    const visibleCount = 3 // Show 3 reviews at a time on desktop
    const result = []
    for (let i = 0; i < visibleCount; i++) {
      const index = (currentIndex + i) % reviews.length
      result.push(reviews[index])
    }
    return result
  }

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <section id="trustpilot-testimonials" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-6">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center gap-2 bg-[#225DF6]/10 text-[#225DF6] px-6 py-3 rounded-full text-sm font-semibold mb-6">
            <Star className="w-4 h-4 fill-current" />
            Testimonios Reales
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Lo que dicen nuestros <span className="text-[#225DF6]">clientes</span>
          </h2>

          {/* Trustpilot-style header */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-2xl font-bold text-gray-900">4.8</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#00B67A] rounded-full flex items-center justify-center">
                <Star className="w-4 h-4 text-white fill-current" />
              </div>
              <span className="font-semibold text-gray-700">Trustpilot</span>
            </div>
          </div>
        </div>

        {/* Reviews Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
            >
              {reviews.map((review, index) => (
                <div key={index} className="w-full md:w-1/3 flex-shrink-0 px-3">
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 h-full flex flex-col">
                    {/* Header with avatar and info */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="relative">
                        <OptimizedImage
                          src={review.avatar}
                          alt={review.name}
                          width={48}
                          height={48}
                          className="w-12 h-12 rounded-full"
                        />
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#00B67A] rounded-full flex items-center justify-center">
                          <Star className="w-3 h-3 text-white fill-current" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-gray-900">{review.name}</h4>
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{review.country}</span>
                        </div>
                        <div className="text-xs text-gray-500 mb-2">{review.date}</div>
                        <div className="flex">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Review text */}
                    <div className="flex-1">
                      <p className="text-gray-700 leading-relaxed text-sm">{review.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
            aria-label="Anterior testimonio"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
            aria-label="Siguiente testimonio"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center mt-8 gap-2">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? "bg-[#225DF6]" : "bg-gray-300"
              }`}
              aria-label={`Ir al testimonio ${index + 1}`}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Más de 500 emprendedores ya han optimizado su fiscalidad con nosotros</p>
          <a
            href="https://es.trustpilot.com/review/gcmasesores.io"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#225DF6] hover:text-[#1e4fd6] font-medium transition-colors"
          >
            Ver todas las reseñas en Trustpilot
            <div className="w-5 h-5 bg-[#00B67A] rounded-full flex items-center justify-center">
              <Star className="w-3 h-3 text-white fill-current" />
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}
