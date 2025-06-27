import { Star } from "lucide-react"

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "David Peñas",
      text: "Gracias a la ayuda de GCM he podido ahorrar muchos impuestos, lo que más valoro es el trato de cercanía con sus clientes y su disponibilidad 24/7.",
      avatar: "/images/testimonials/david-penas.jpg",
      rating: 5,
    },
    {
      name: "Samanta De Lourdes",
      text: "Me ha resuelto todas las dudas que tenía de montar una LLC. Además de ser un profesional resolutivo y práctico al momento de resolver dudas. Todo el proceso muy simple y fácil de su parte sin tener que preocuparse por nada.",
      avatar: "/images/testimonials/samanta-de-lourdes.jpg",
      rating: 5,
    },
    {
      name: "David Fernández",
      text: "Este año queríamos abrir nuestra LLC en EE.UU y contactamos por Instagram con GCM la decisión más acertada que podíamos hacer, el proceso súper rápido el trato tanto de Miguel su CEO como el resto de su equipo joven pero que nos hicimos partners de ellos y nuestra red... si tenéis que hacer una LLC no pensarlo súper recomendado.",
      avatar: "/images/testimonials/david-fernandez.jpg",
      rating: 5,
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.text}"</p>
              <div className="flex items-center">
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
