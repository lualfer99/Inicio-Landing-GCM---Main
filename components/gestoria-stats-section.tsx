import { Users, Building, DollarSign } from "lucide-react"

export default function GestoriaStatsSection() {
  const stats = [
    {
      number: "+90",
      label: "Colaboradores",
      icon: Users,
      color: "text-white",
    },
    {
      number: "+4.100",
      label: "LLCs gestionadas",
      icon: Building,
      color: "text-white",
    },
    {
      number: "+2M",
      label: "De euros optimizados",
      icon: DollarSign,
      color: "text-white",
    },
  ]

  return (
    <section className="py-20 gradient-bg relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-black/5"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 lg:px-6 relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Números que nos respaldan</h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Más de 500 emprendedores digitales confían en nuestra gestoría especializada
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <div key={index} className="text-center group">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-5xl md:text-6xl font-bold text-white mb-4 group-hover:scale-105 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-lg md:text-xl text-white/90 font-medium leading-relaxed">{stat.label}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
