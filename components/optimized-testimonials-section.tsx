"use client"

import { Star, Quote } from "lucide-react"
import OptimizedImage from "./image-optimization"
import { useState, useEffect } from "react"

export default function OptimizedTestimonialsSection() {
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

    const element = document.getElementById("testimonials")
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

  const testimonials = [
    {
      name: "David Peñas",
      text: "Gracias a la ayuda de GCM he podido ahorrar muchos impuestos, lo que más valoro es el trato de cercanía con sus clientes y su disponibilidad 24/7.",
      avatar: "/images/testimonials/david-penas.jpg",
      rating: 5,
      role: "Emprendedor Digital",
    },
    {
      name: "Samanta De Lourdes",
      text: "Me ha resuelto todas las dudas que tenía de montar una LLC. Además de ser un profesional resolutivo y práctico al momento de resolver dudas. Todo el proceso muy simple y fácil de su parte sin tener que preocuparse por nada.",
      avatar: "/images/testimonials/samanta-de-lourdes.jpg",
      rating: 5,
      role: "Consultora Online",
    },
    {
      name: "David Fernández",
      text: "Este año queríamos abrir nuestra LLC en EE.UU y contactamos por Instagram con GCM la decisión más acertada que podíamos hacer, el proceso súper rápido el trato tanto de Miguel su CEO como el resto de su equipo joven pero que nos hicimos partners de ellos y nuestra red... si tenéis que hacer una LLC no pensarlo súper recomendado.",
      avatar: "/images/testimonials/david-fernandez.jpg",
      rating: 5,
      role: "CEO & Founder",
    },
  ]

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
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
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Más de 500 emprendedores ya han optimizado su fiscalidad con nosotros
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`card-modern p-6 md:p-8 relative group hover:scale-105 transition-all duration-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Quote icon */}
              <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="w-12 h-12 text-[#225DF6]" />
              </div>

              {/* Stars */}
              <div className="flex items-center mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Testimonial text */}
              <p className="text-gray-700 mb-8 leading-relaxed text-base md:text-lg font-medium">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center">
                <div className="relative">
                  <OptimizedImage
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={56}
                    height={56}
                    className="w-14 h-14 rounded-full mr-4 border-2 border-[#225DF6]/20"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#225DF6] rounded-full flex items-center justify-center">
                    <Star className="w-3 h-3 text-white fill-current" />
                  </div>
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-lg">{testimonial.name}</div>
                  <div className="text-[#225DF6] font-medium">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
