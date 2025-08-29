"use client"

import type React from "react"
import { Star, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
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
      setIsMobile(window.innerWidth < 1024)
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
      initials: "A.L",
      country: "ES",
      date: "9 jun 2025",
      rating: 5,
      text: "Solo llevo unos meses trabajando con el equipo y su atención es impecable. Me siento super acompañada en el proceso y siempre tienen alternativas o ideas para un mejor resultado. He estado trabajando con Miguel y Dani de la mano, y estoy super agradecida por su trabajo.",
      verified: true,
      reviewUrl: "https://es.trustpilot.com/users/684675442824b5731e08a8a4",
    },
    {
      name: "Sergio",
      initials: "S.E",
      country: "ES",
      date: "13 may 2025",
      rating: 5,
      text: "Saben muy bien el proceso que hay que seguir y como guiarte en el paso a paso!",
      verified: true,
      reviewUrl: "https://es.trustpilot.com/review/gcmasesores.io",
    },
    {
      name: "Consumer",
      initials: "C.O",
      country: "ES",
      date: "6 may 2025",
      rating: 5,
      text: "No hay palabras para agradecer la labor de estos profesionales, de los pies a la cabeza, en un nicho de influencers y sabelotodos fiscalistas se agradece tener un equipo como el suyo, brutal.",
      verified: true,
      reviewUrl: "https://es.trustpilot.com/review/gcmasesores.io",
    },
    {
      name: "Jean Martinez",
      initials: "J.M",
      country: "NI",
      date: "25 abr 2025",
      rating: 5,
      text: "Miguel y el equipo de GCM Asesores son los mejores en lo que hacen. Desde la creación y asesoramiento para tu LLC y cuenta de Stripe. Han estado conmigo desde el día 1, guiandome y respondiendo a todas mis preguntas. Super contento con sus servicios. Muchas gracias por todo lo que continuan haciendo por nosotros Miguel & Dani. Un abrazo!",
      verified: true,
      reviewUrl: "https://es.trustpilot.com/review/gcmasesores.io",
    },
    {
      name: "Arnau",
      initials: "A.R",
      country: "ES",
      date: "24 abr 2025",
      rating: 5,
      text: "No puedo hacer más que recomendar a estos grandes profesionales, sobretodo por su atención, y por la agilidad en la resolución de problemas. Siempre están ahí cuando los necesitas y con toda la predisposición del mundo. Es lo que uno espera cuando se pone en manos de profesionales. Muchas gracias por acompañarme.",
      verified: true,
      reviewUrl: "https://es.trustpilot.com/review/gcmasesores.io",
    },
    {
      name: "Sandra DSJ",
      initials: "S.D",
      country: "ES",
      date: "22 abr 2025",
      rating: 5,
      text: "Me gusta mucho lo atentos y disponibles que están siempre a resolver dudas, además de que están muy bien organizados y su servicio es excelente. Siento que mi LLC está en las mejores manos y me siento tranquila pudiendo delegarles esta tarea mientras yo me dedico a mi negocio.",
      verified: true,
      reviewUrl: "https://es.trustpilot.com/review/gcmasesores.io",
    },
    {
      name: "Jordi Ramos",
      initials: "J.R",
      country: "ES",
      date: "9 abr 2025",
      rating: 5,
      text: "Servicio y atención al cliente de 10, muy buen equipo",
      verified: true,
      reviewUrl: "https://es.trustpilot.com/review/gcmasesores.io",
    },
    {
      name: "Centro Mia Técnicas Naturales",
      initials: "C.M",
      country: "ES",
      date: "3 abr 2025",
      rating: 5,
      text: "Son muy profesionales y el trato exquisito. Rápidos cuando tienes duda o alguna situación. Me han ayudado en todo y los recomiendo 100%",
      verified: true,
      reviewUrl: "https://es.trustpilot.com/review/gcmasesores.io",
    },
    {
      name: "Marcos Pastoriza",
      initials: "M.P",
      country: "ES",
      date: "2 abr 2025",
      rating: 5,
      text: "Tienen un equipo profesional muy atento siempre a resolver cualquier duda y asesorarte. Muy recomendable",
      verified: true,
      reviewUrl: "https://es.trustpilot.com/review/gcmasesores.io",
    },
    {
      name: "Rio",
      initials: "R.I",
      country: "ES",
      date: "2 abr 2025",
      rating: 5,
      text: "Experiencia 10/10 trabajando con ellos. Atención y ayuda en todo momento, todo muy profesional. 100% recomendado",
      verified: true,
      reviewUrl: "https://es.trustpilot.com/review/gcmasesores.io",
    },
    {
      name: "Raul Solana",
      initials: "R.S",
      country: "ES",
      date: "2 abr 2025",
      rating: 5,
      text: "La experiencia con GCM esta siendo muy buena, son atentos y eficientes. Totalmente recomendable :)",
      verified: true,
      reviewUrl: "https://es.trustpilot.com/review/gcmasesores.io",
    },
    {
      name: "PIXSTRAT AGENCY LLC",
      initials: "P.A",
      country: "ES",
      date: "30 mar 2025",
      rating: 5,
      text: "Excelente trato, y muy cercanos a los clientes",
      verified: true,
      reviewUrl: "https://es.trustpilot.com/review/gcmasesores.io",
    },
    {
      name: "Marina Dias",
      initials: "M.D",
      country: "ES",
      date: "28 mar 2025",
      rating: 5,
      text: "Hace unos 6 meses vi una publicidad en redes sociales, pero no sabía si era una opción para mí. Tenía muchas dudas y miedos. Me llamaron y me lo explicaron todo de una forma muy simple, porque para mí todo el tema fiscal me parece un mundo... Cada vez que tenía una duda, me respondía muy rápidamente o incluso hacíamos videollamadas para orientarme en todo. Todo el equipo es muy profesional y competente. Me he sentido muy segura en todo el proceso y estoy muy satisfecha.",
      verified: true,
      reviewUrl: "https://es.trustpilot.com/review/gcmasesores.io",
    },
    {
      name: "Marcel Fernández",
      initials: "M.F",
      country: "ES",
      date: "28 mar 2025",
      rating: 5,
      text: "Es una empresa excepcional, un personal muy atento y te ayudan y solucionan cualquier cosa que necesites, un soporte y asesoramiento de 10, siempre estan alli cuando los necesitas, todo perfecto, Dani y Vansh en especial son los mejores sin duda, unos expertos y cracks en lo suyo. Estoy muy agradecido de haberme decidido en trabajar con esta empresa.",
      verified: true,
      reviewUrl: "https://es.trustpilot.com/review/gcmasesores.io",
    },
    {
      name: "Monkey Art",
      initials: "M.A",
      country: "ES",
      date: "28 mar 2025",
      rating: 5,
      text: "Siempre son muy profesionales y te ayudan con todo. Lo hacen todo muy fácil. Con ellos me siento en buenas manos. No te dejan sola si tienes algún problema con las cuentas o lo que sea. Trato muy cercano.",
      verified: true,
      reviewUrl: "https://es.trustpilot.com/review/gcmasesores.io",
    },
    {
      name: "Entrena Tu Centro",
      initials: "E.T",
      country: "ES",
      date: "26 mar 2025",
      rating: 5,
      text: "Te dan todas las facilidades posibles y el asesoramiento necesario para llevar al día tu empresa sin ningún imprevisto.",
      verified: true,
      reviewUrl: "https://es.trustpilot.com/review/gcmasesores.io",
    },
    {
      name: "Alejandra Beltramen",
      initials: "A.B",
      country: "ES",
      date: "24 mar 2025",
      rating: 5,
      text: "Estoy hace poquitos meses con ellos pero estoy muy contenta de la personalización que recibo (fue una de las cosas q me convenció a la hora de decidir elegirlos para mi gestión). Siempre he obtenido respuestas de manera rápida y se nota que se preocupan por hacer lo mejor, ofrecer soluciones y ayuda por chat en cualquier momento.",
      verified: true,
      reviewUrl: "https://es.trustpilot.com/review/gcmasesores.io",
    },
    {
      name: "cienciaConciencia",
      initials: "C.C",
      country: "ES",
      date: "21 mar 2025",
      rating: 5,
      text: "La verdad que es un lujo contar con un equipo tan profesional, cercano y de buenas personas en un ámbito tan crítico y complejo como es el fiscal. Estoy súper agradecido de haber encontrado GCM en mi camino, y convencido de que son mi partner ideal para ayudarme a llevar mi empresa al siguiente nivel. Súper recomendables. Gracias de corazón para Miguel, Vansh y todo el equipo de GCM.",
      verified: true,
      reviewUrl: "https://es.trustpilot.com/review/gcmasesores.io",
    },
    {
      name: "Victor Semper García",
      initials: "V.S",
      country: "ES",
      date: "20 mar 2025",
      rating: 5,
      text: "Son rápidos a la hora de responder y me han ofrecido una vía que no sabía que ni existía para optimizar mis ingresos, la verdad que estoy contento con ellos porque además de lo anterior cuando he tenido problemas me los han sabido resolver y han estado ahí hasta que todo se ha solucionado",
      verified: true,
      reviewUrl: "https://es.trustpilot.com/review/gcmasesores.io",
    },
    {
      name: "Paul",
      initials: "P.A",
      country: "ES",
      date: "20 mar 2025",
      rating: 5,
      text: "Buen servicio, buenos trabajadores, siempre están al tanto de todo y te solucionan las dudas al momento, lo recomiendo al 200%",
      verified: true,
      reviewUrl: "https://es.trustpilot.com/review/gcmasesores.io",
    },
  ]

  // Desktop shows 3 cards, mobile shows 1
  const reviewsPerPage = isMobile ? 1 : 3
  const maxIndex = Math.max(0, reviews.length - reviewsPerPage)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + reviewsPerPage
      return nextIndex > maxIndex ? maxIndex : nextIndex
    })
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex - reviewsPerPage
      return nextIndex < 0 ? 0 : nextIndex
    })
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

  const canGoPrev = currentIndex > 0
  const canGoNext = currentIndex < maxIndex

  // Calculate visible reviews
  const visibleReviews = reviews.slice(currentIndex, currentIndex + reviewsPerPage)

  // Function to convert date format for structured data
  const formatDateForStructuredData = (dateStr: string): string => {
    const months: { [key: string]: string } = {
      ene: "01",
      feb: "02",
      mar: "03",
      abr: "04",
      may: "05",
      jun: "06",
      jul: "07",
      ago: "08",
      sep: "09",
      oct: "10",
      nov: "11",
      dic: "12",
    }

    const parts = dateStr.split(" ")
    if (parts.length === 3) {
      const day = parts[0].padStart(2, "0")
      const month = months[parts[1]] || "01"
      const year = parts[2]
      return `${year}-${month}-${day}`
    }
    return "2025-01-01" // fallback date
  }

  // Generate structured data for reviews
  const generateStructuredData = () => {
    const aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: reviews.length.toString(),
      bestRating: "5",
      worstRating: "1",
    }

    const reviewsStructuredData = reviews.map((review, index) => ({
      "@type": "Review",
      "@id": `https://gcmasesores.io/#review-${index + 1}`,
      author: {
        "@type": "Person",
        name: review.initials,
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.rating.toString(),
        bestRating: "5",
        worstRating: "1",
      },
      reviewBody: review.text,
      datePublished: formatDateForStructuredData(review.date),
      publisher: {
        "@type": "Organization",
        name: "Trustpilot",
      },
      url: review.reviewUrl,
    }))

    const organizationStructuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "GCM Asesores",
      url: "https://gcmasesores.io",
      logo: "https://gcmasesores.io/images/logo.png",
      description:
        "Especialistas en creación de LLC en Estados Unidos y optimización fiscal para emprendedores digitales",
      aggregateRating: aggregateRating,
      review: reviewsStructuredData,
      address: {
        "@type": "PostalAddress",
        addressCountry: "ES",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        availableLanguage: ["Spanish", "English"],
      },
      sameAs: ["https://es.trustpilot.com/review/gcmasesores.io"],
    }

    return organizationStructuredData
  }

  const structuredData = generateStructuredData()

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <section id="trustpilot-testimonials" className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div
            className={`text-center mb-12 md:mb-16 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {/* Trustpilot-style header */}
            <div className="hidden bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 max-w-2xl mx-auto mb-8">
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
                className={`grid transition-all duration-500 ease-in-out ${
                  isMobile ? "grid-cols-1 gap-4" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                }`}
              >
                {visibleReviews.map((review, index) => (
                  <div
                    key={`${review.initials}-${currentIndex}-${index}`}
                    className={`transform transition-all duration-500 ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <ReviewCard review={review} isMobile={isMobile} />
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation buttons */}
            <button
              onClick={prevSlide}
              disabled={!canGoPrev}
              className={`absolute left-0 top-1/2 -translate-y-1/2 ${
                isMobile ? "-translate-x-2" : "-translate-x-6"
              } w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105 z-10 ${
                canGoPrev
                  ? "hover:bg-gray-50 text-gray-600 hover:shadow-xl"
                  : "opacity-50 cursor-not-allowed text-gray-400"
              }`}
              aria-label="Testimonios anteriores"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextSlide}
              disabled={!canGoNext}
              className={`absolute right-0 top-1/2 -translate-y-1/2 ${
                isMobile ? "translate-x-2" : "translate-x-6"
              } w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105 z-10 ${
                canGoNext
                  ? "hover:bg-gray-50 text-gray-600 hover:shadow-xl"
                  : "opacity-50 cursor-not-allowed text-gray-400"
              }`}
              aria-label="Siguientes testimonios"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Progress indicator */}
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({
              length: Math.ceil(reviews.length / reviewsPerPage),
            }).map((_, index) => {
              const isActive = Math.floor(currentIndex / reviewsPerPage) === index
              return (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index * reviewsPerPage)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
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
          <div className="hidden text-center mt-12">
            <a
              href="https://es.trustpilot.com/review/gcmasesores.io"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-[#00B67A] hover:bg-[#00B67A] hover:text-white font-semibold px-6 py-3 rounded-full border-2 border-[#00B67A] transition-all duration-200 hover:scale-105 hover:shadow-lg"
            >
              Ver todas las reseñas en Trustpilot
              <div className="w-5 h-5 bg-current rounded-full flex items-center justify-center">
                <Star className="w-3 h-3 text-white fill-current" />
              </div>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

// Optimized ReviewCard component
function ReviewCard({ review, isMobile }: { review: any; isMobile: boolean }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col hover:shadow-lg transition-all duration-300 hover:-translate-y-1 min-h-[420px] max-h-[420px] relative group">
      {/* Header Section */}
      <div className="flex items-start gap-3 mb-4 flex-shrink-0">
        <div className="relative flex-shrink-0">
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
            <h4 className="font-semibold text-gray-900 truncate text-base">{review.initials}</h4>
            <span className="text-gray-500 bg-gray-100 px-2 py-1 rounded text-xs flex-shrink-0">{review.country}</span>
          </div>

          <div className="text-gray-500 mb-2 text-xs">{review.date}</div>

          <div className="flex">
            {[...Array(review.rating)].map((_, i) => (
              <Star key={i} className="h-4 w-4 text-[#00B67A] fill-current" />
            ))}
          </div>
        </div>
      </div>

      {/* Review Content */}
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex-1 mb-4">
          <p className="text-gray-700 leading-relaxed text-sm break-words hyphens-auto overflow-hidden line-clamp-6">
            {review.text}
          </p>
        </div>

        {/* Footer with Trustpilot link */}
        <div className="pt-3 border-t border-gray-100 flex-shrink-0">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
            <span>Verificado por GCM</span>
            <div className="hidden flex items-center gap-1">
              <Star className="w-3 h-3 text-[#00B67A] fill-current" />
              <span className="text-[#00B67A] font-medium">Trustpilot</span>
            </div>
          </div>

          {/* Individual review link */}
          <a
            href={review.reviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden inline-flex items-center gap-2 text-[#00B67A] hover:text-[#008a5a] font-medium text-sm transition-colors duration-200 group-hover:underline"
          >
            <span>Ver reseña completa</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Hover overlay for better UX */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none" />
    </div>
  )
}
