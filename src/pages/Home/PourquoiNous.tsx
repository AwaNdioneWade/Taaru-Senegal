import React from 'react'

interface Valeur {
  id: number
  title: string
  description: string
  icon: React.ReactNode
  color: string
}

const valeurs: Valeur[] = [
  {
    id: 1,
    title: 'Valorisation de l\'artisanat local',
    description: 'Nous mettons en lumière le savoir-faire unique des artisans sénégalais, préservant ainsi notre patrimoine culturel.',
    color: '#00853F',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    id: 2,
    title: 'Qualité premium & éthique',
    description: 'Chaque création est le fruit d\'un travail méticuleux, utilisant des matériaux de qualité et des techniques traditionnelles.',
    color: '#FDEF00',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  {
    id: 3,
    title: 'Co-création & transparence',
    description: 'Nous travaillons main dans la main avec nos artisans, assurant une rémunération juste et un suivi personnalisé.',
    color: '#E30B17',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  },
  {
    id: 4,
    title: 'Impact social & culturel',
    description: 'Notre engagement va au-delà de la mode, en contribuant au développement économique local et à la préservation de notre culture.',
    color: '#00853F',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    )
  }
]

function PourquoiNous() {
  return (
    <section className="py-20 bg-[#F4F4F4]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#333333] mb-6">Pourquoi Taaru Sénégal ?</h2>
          <div className="w-24 h-1 bg-[#00853F] mx-auto mb-6"></div>
          <p className="text-lg text-[#333333] max-w-2xl mx-auto">
            Notre engagement pour une mode éthique et authentique, au service de l'artisanat sénégalais
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {valeurs.map((valeur) => (
            <div
              key={valeur.id}
              className="group bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="flex flex-col items-center text-center">
                <div 
                  className="mb-6 p-4 rounded-full transition-all duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${valeur.color}20` }}
                >
                  {valeur.icon}
                </div>
                <h3 className="text-xl font-semibold text-[#333333] mb-4 group-hover:text-[#00853F] transition-colors duration-300">
                  {valeur.title}
                </h3>
                <p className="text-[#666666]">{valeur.description}</p>
                

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PourquoiNous
