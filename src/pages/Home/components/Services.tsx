import React from 'react'

interface Service {
  id: number
  title: string
  description: string
  icon: React.ReactNode
  color: string
}

const services: Service[] = [
  {
    id: 1,
    title: 'Sur-mesure pour les tailleurs',
    description: 'Des créations uniques et personnalisées réalisées par nos artisans talentueux.',
    color: '#00853F',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    )
  },
  {
    id: 2,
    title: 'Vente de tissus',
    description: 'Une sélection exclusive de tissus traditionnels et modernes de qualité.',
    color: '#FDEF00',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    )
  },
  {
    id: 3,
    title: 'Accessoires artisanaux',
    description: 'Des accessoires uniques fabriqués à la main par nos artisans locaux.',
    color: '#E30B17',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    )
  },
  {
    id: 4,
    title: 'Formations & ateliers',
    description: 'Apprenez les techniques traditionnelles auprès de nos maîtres artisans.',
    color: '#00853F',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    )
  }
]

function Services() {
  return (
    <section className="py-20 bg-[#F4F4F4]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#333333] mb-6">Nos Services</h2>
          <div className="w-24 h-1 bg-[#00853F] mx-auto mb-6"></div>
          <p className="text-lg text-[#333333] max-w-2xl mx-auto">
            Découvrez notre gamme complète de services pour répondre à tous vos besoins en matière de mode traditionnelle
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="group bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: service.color }}></div>
              <div className="flex flex-col items-center text-center">
                <div 
                  className="mb-6 p-4 rounded-full transition-all duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${service.color}20` }}
                >
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-[#333333] mb-3 group-hover:text-[#00853F] transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-[#666666]">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
