"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Star, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Review {
  id: number
  name: string
  initials: string
  country: string
  date: string
  rating: number
  text: string
  reviewUrl: string
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Ale",
    initials: "AL",
    country: "ES",
    date: "9 jun 2025",
    rating: 5,
    text: "Solo llevo unos meses trabajando con el equipo y su atención es impecable. Me siento super acompañada en el proceso y siempre tienen alternativas o ideas para un mejor resultado. He estado trabajando con Miguel y Dani de la mano, y estoy super agradecida por su trabajo.",
    reviewUrl: "https://es.trustpilot.com/users/684675442824b5731e08a8a4",
  },
  {
    id: 2,
    name: "Sergio",
    initials: "SE",
    country: "ES",
    date: "13 may 2025",
    rating: 5,
    text: "Saben muy bien el proceso que hay que seguir y como guiarte en el paso a paso!",
    reviewUrl: "https://es.trustpilot.com/review/gcmasesores.io",
  },
  {
    id: 3,
    name: "Consumer",
    initials: "CO",
    country: "ES",
    date: "6 may 2025",
    rating: 5,
    text: "No hay palabras para agradecer la labor de estos profesionales, de los pies a la cabeza, en un nicho de influencers y sabelotodos fiscalistas se agradece tener un equipo como el suyo, brutal.",
    reviewUrl: "https://es.trustpilot.com/review/gcmasesores.io",
  },
  {
    id: 4,
    name: "Jean Martinez",
    initials: "JM",
    country: "NI",
    date: "25 abr 2025",
    rating: 5,
    text: "Miguel y el equipo de GCM Asesores son los mejores en lo que hacen. Desde la creación y asesoramiento para tu LLC y cuenta de Stripe. Han estado conmigo desde el día 1, guiandome y respondiendo a todas mis preguntas. Super contento con sus servicios. Muchas gracias por todo lo que continuan haciendo por nosotros Miguel & Dani. Un abrazo!",
    reviewUrl: "https://es.trustpilot.com/review/gcmasesores.io",
  },
  {
    id: 5,
    name: "Arnau",
    initials: "AR",
    country: "ES",
    date: "24 abr 2025",
    rating: 5,
    text: "No puedo hacer más que recomendar a estos grandes profesionales, sobretodo por su atención, y por la agilidad en la resolución de problemas. Siempre están ahí cuando los necesitas y con toda la predisposición del mundo. Es lo que uno espera cuando se pone en manos de profesionales. Muchas gracias por acompañarme.",
    reviewUrl: "https://es.trustpilot.com/review/gcmasesores.io",
  },
  {
    id: 6,
    name: "Sandra DSJ",
    initials: "SD",
    country: "ES",
    date: "22 abr 2025",
    rating: 5,
    text: "Me gusta mucho lo atentos y disponibles que están siempre a resolver dudas, además de que están muy bien organizados y su servicio es excelente. Siento que mi LLC está en las mejores manos y me siento tranquila pudiendo delegarles esta tarea mientras yo me dedico a mi negocio.",
    reviewUrl: "https://es.trustpilot.com/review/gcmasesores.io",
  },
  {
    id: 7,
    name: "Jordi Ramos",
    initials: "JR",
    country: "ES",
    date: "9 abr 2025",
    rating: 5,
    text: "Servicio y atención al cliente de 10, muy buen equipo",
    reviewUrl: "https://es.trustpilot.com/review/gcmasesores.io",
  },
  {
    id: 8,
    name: "Centro Mia Técnicas Naturales",
    initials: "CM",
    country: "ES",
    date: "3 abr 2025",
    rating: 5,
    text: "Son muy profesionales y el trato exquisito. Rápidos cuando tienes duda o alguna situación. Me han ayudado en todo y los recomiendo 100%",
    reviewUrl: "https://es.trustpilot.com/review/gcmasesores.io",
  },
  {
    id: 9,
    name: "Marcos Pastoriza",
    initials: "MP",
    country: "ES",
    date: "2 abr 2025",
    rating: 5,
    text: "Tienen un equipo profesional muy atento siempre a resolver cualquier duda y asesorarte. Muy recomendable",
    reviewUrl: "https://es.trustpilot.com/review/gcmasesores.io",
  },
  {
    id: 10,
    name: "Rio",
    initials: "RI",
    country: "ES",
    date: "2 abr 2025",
    rating: 5,
    text: "Experiencia 10/10 trabajando con ellos. Atención y ayuda en todo momento, todo muy profesional. 100% recomendado",
    reviewUrl: "https://es.trustpilot.com/review/gcmasesores.io",
  },
  {
    id: 11,
    name: "Raul Solana",
    initials: "RS",
    country: "ES",
    date: "2 abr 2025",
    rating: 5,
    text: "La experiencia con GCM esta siendo muy buena, son atentos y eficientes. Totalmente recomendable :)",
    reviewUrl: "https://es.trustpilot.com/review/gcmasesores.io",
  },
  {
    id: 12,
    name: "PIXSTRAT AGENCY LLC",
    initials: "PA",
    country: "ES",
    date: "30 mar 2025",
    rating: 5,
    text: "Excelente trato, y muy cercanos a los clientes",
    reviewUrl: "https://es.trustpilot.com/review/gcmasesores.io",
  },
  {
    id: 13,
    name: "Marina Dias",
    initials: "MD",
    country: "ES",
    date: "28 mar 2025",
    rating: 5,
    text: "Hace unos 6 meses vi una publicidad en redes sociales, pero no sabía si era una opción para mí. Tenía muchas dudas y miedos. Me llamaron y me lo explicaron todo de una forma muy simple, porque para mí todo el tema fiscal me parece un mundo... Cada vez que tenía una duda, me respondía muy rápidamente o incluso hacíamos videollamadas para orientarme en todo. Todo el equipo es muy profesional y competente. Me he sentido muy segura en todo el proceso y estoy muy satisfecha.",
    reviewUrl: "https://es.trustpilot.com/review/gcmasesores.io",
  },
  {
    id: 14,
    name: "Marcel Fernández",
    initials: "MF",
    country: "ES",
    date: "28 mar 2025",
    rating: 5,
    text: "Es una empresa excepcional, un personal muy atento y te ayudan y solucionan cualquier cosa que necesites, un soporte y asesoramiento de 10, siempre estan alli cuando los necesitas, todo perfecto, Dani y Vansh en especial son los mejores sin duda, unos expertos y cracks en lo suyo. Estoy muy agradecido de haberme decidido en trabajar con esta empresa.",
    reviewUrl: "https://es.trustpilot.com/review/gcmasesores.io",
  },
  {
    id: 15,
    name: "Monkey Art",
    initials: "MA",
    country: "ES",
    date: "28 mar 2025",
    rating: 5,
    text: "Siempre son muy profesionales y te ayudan con todo. Lo hacen todo muy fácil. Con ellos me siento en buenas manos. No te dejan sola si tienes algún problema con las cuentas o lo que sea. Trato muy cercano.",
    reviewUrl: "https://es.trustpilot.com/review/gcmasesores.io",
  },
  {
    id: 16,
    name: "Entrena Tu Centro",
    initials: "ET",
    country: "ES",
    date: "26 mar 2025",
    rating: 5,
    text: "Te dan todas las facilidades posibles y el asesoramiento necesario para llevar al día tu empresa sin ningún imprevisto.",
    reviewUrl: "https://es.trustpilot.com/review/gcmasesores.io",
  },
  {
    id: 17,
    name: "Alejandra Beltramen",
    initials: "AB",
    country: "ES",
    date: "24 mar 2025",
    rating: 5,
    text: "Estoy hace poquitos meses con ellos pero estoy muy contenta de la personalización que recibo (fue una de las cosas q me convenció a la hora de decidir elegirlos para mi gestión). Siempre he obtenido respuestas de manera rápida y se nota que se preocupan por hacer lo mejor, ofrecer soluciones y ayuda por chat en cualquier momento.",
    reviewUrl: "https://es.trustpilot.com/review/gcmasesores.io",
  },
  {
    id: 18,
    name: "cienciaConciencia",
    initials: "CC",
    country: "ES",
    date: "21 mar 2025",
    rating: 5,
    text: "La verdad que es un lujo contar con un equipo tan profesional, cercano y de buenas personas en un ámbito tan crítico y complejo como es el fiscal. Estoy súper agradecido de haber encontrado GCM en mi camino, y convencido de que son mi partner ideal para ayudarme a llevar mi empresa al siguiente nivel. Súper recomendables. Gracias de corazón para Miguel, Vansh y todo el equipo de GCM.",
    reviewUrl: "https://es.trustpilot.com/review/gcmasesores.io",
  },
  {
    id: 19,
    name: "Victor Semper García",
    initials: "VS",
    country: "ES",
    date: "20 mar 2025",
    rating: 5,
    text: "Son rápidos a la hora de responder y me han ofrecido una vía que no sabía que ni existía para optimizar mis ingresos, la verdad que estoy contento con ellos porque además de lo anterior cuando he tenido problemas me los han sabido resolver y han estado ahí hasta que todo se ha solucionado",
    reviewUrl: "https://es.trustpilot.com/review/gcmasesores.io",
  },
  {
    id: 20,
    name: "Paul",
    initials: "PA",
    country: "ES",
    date: "20 mar 2025",
    rating: 5,
    text: "Buen servicio, buenos trabajadores, siempre están al tanto de todo y te solucionan las dudas al momento, lo recomiendo al 200%",
    reviewUrl: "https://es.trustpilot.com/review/gcmasesores.io",
  },
]

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
    "@id": `https://gcmasesores.io/#review-${review.id}`,
    author: {
      "@type": "Person",
      name: review.name,
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

export default function TrustpilotTestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const reviewsPerPage = isMobile ? 1 : 3
  const totalPages = Math.ceil(reviews.length / reviewsPerPage)

  const nextReviews = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages)
  }

  const prevReviews = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages)
  }

  const currentReviews = reviews.slice(currentIndex * reviewsPerPage, (currentIndex + 1) * reviewsPerPage)

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
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

      <section className="py-20 bg-gray-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-[#00B67A]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#225DF6]/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 lg:px-6 relative">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#00B67A]/10 text-[#00B67A] px-6 py-3 rounded-full text-sm font-semibold mb-6">
              <Star className="w-4 h-4 fill-current" />
              Trustpilot Reviews
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Lo que dicen nuestros <span className="text-[#225DF6]">clientes</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#00B67A] to-[#225DF6] mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Más de 500 emprendedores ya han optimizado su fiscalidad con nosotros
            </p>

            {/* Aggregate Rating Display */}
            <div className="mt-8 inline-flex items-center gap-4 bg-white rounded-2xl px-8 py-4 shadow-lg">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <div className="text-2xl font-bold text-gray-900">4.8</div>
              <div className="text-gray-600">
                <span className="font-semibold">Excelente</span> • {reviews.length} reseñas
              </div>
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="relative">
            <div className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-3"} gap-6 mb-8`}>
              {currentReviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden min-h-[420px] flex flex-col"
                  itemScope
                  itemType="https://schema.org/Review"
                >
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00B67A]/5 to-[#225DF6]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#225DF6] to-[#1e52d9] rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {review.initials}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3
                            className="font-semibold text-gray-900"
                            itemProp="author"
                            itemScope
                            itemType="https://schema.org/Person"
                          >
                            <span itemProp="name">{review.name}</span>
                          </h3>
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{review.country}</span>
                        </div>
                        <div className="text-sm text-gray-500">
                          <time itemProp="datePublished" dateTime={formatDateForStructuredData(review.date)}>
                            {review.date}
                          </time>
                        </div>
                      </div>
                    </div>

                    {/* Rating */}
                    <div
                      className="flex items-center gap-1 mb-4"
                      itemProp="reviewRating"
                      itemScope
                      itemType="https://schema.org/Rating"
                    >
                      <meta itemProp="ratingValue" content={review.rating.toString()} />
                      <meta itemProp="bestRating" content="5" />
                      <meta itemProp="worstRating" content="1" />
                      {renderStars(review.rating)}
                    </div>

                    {/* Review text */}
                    <div className="flex-1 mb-6">
                      <p className="text-gray-700 leading-relaxed line-clamp-6" itemProp="reviewBody">
                        {review.text}
                      </p>
                    </div>

                    {/* Link to review */}
                    <div className="mt-auto">
                      <a
                        href={review.reviewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[#00B67A] hover:text-[#00B67A]/80 font-medium text-sm transition-colors duration-200"
                        itemProp="url"
                      >
                        Ver reseña completa
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>

                    {/* Trustpilot verification */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>
                          Verificado por{" "}
                          <span itemProp="publisher" itemScope itemType="https://schema.org/Organization">
                            <span itemProp="name">Trustpilot</span>
                          </span>
                        </span>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-[#00B67A] text-[#00B67A]" />
                          <span className="text-[#00B67A] font-medium">Trustpilot</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={prevReviews}
                disabled={currentIndex === 0}
                className="rounded-full border-2 hover:bg-[#225DF6] hover:text-white hover:border-[#225DF6] transition-all duration-200 bg-transparent"
                aria-label="Ver reseñas anteriores"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>

              {/* Dots indicator */}
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      i === currentIndex ? "bg-[#225DF6] w-8" : "bg-gray-300"
                    }`}
                    aria-label={`Ir a la página ${i + 1} de reseñas`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={nextReviews}
                disabled={currentIndex === totalPages - 1}
                className="rounded-full border-2 hover:bg-[#225DF6] hover:text-white hover:border-[#225DF6] transition-all duration-200 bg-transparent"
                aria-label="Ver siguientes reseñas"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Review counter */}
            <div className="text-center mt-6">
              <p className="text-sm text-gray-500">
                {currentIndex * reviewsPerPage + 1} - {Math.min((currentIndex + 1) * reviewsPerPage, reviews.length)} de{" "}
                {reviews.length} reseñas
              </p>
            </div>
          </div>

          {/* CTA to Trustpilot */}
          <div className="text-center mt-12">
            <a
              href="https://es.trustpilot.com/review/gcmasesores.io"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#00B67A] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#00B67A]/90 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Ver todas las reseñas en Trustpilot
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
