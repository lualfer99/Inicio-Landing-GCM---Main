import { Star } from "lucide-react"

export default function GestoriaTestimonialsSection() {
  const testimonials = [
    {
      name: "María González",
      text: "GCM se encarga de toda la gestión fiscal de mi LLC. No tengo que preocuparme por nada, ellos manejan tanto las declaraciones en USA como en España. Excelente servicio.",
      avatar: "/placeholder.svg?height=48&width=48",
      rating: 5,
      business: "Consultora Digital",
    },
    {
      name: "Carlos Ruiz",
      text: "La tranquilidad de saber que mi LLC está en manos de expertos no tiene precio. Reportes BOI, declaraciones, todo al día. Recomiendo 100% su gestoría.",
      avatar: "/placeholder.svg?height=48&width=48",
      rating: 5,
      business: "E-commerce",
    },
    {
      name: "Ana Martín",
      text: "Desde que contraté su gestoría, mi LLC funciona perfectamente. Se encargan de todo: desde la creación hasta la gestión fiscal continua. Profesionales de primer nivel.",
      avatar: "/placeholder.svg?height=48&width=48",
      rating: 5,
      business: "Marketing Digital",
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Lo que dicen nuestros clientes</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Emprendedores digitales que confían en nuestra gestoría especializada
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-modern border border-gray-100 hover:shadow-modern-lg transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed text-lg">"{testimonial.text}"</p>
              <div className="flex items-center">
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-blue-600 font-medium">{testimonial.business}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
