import React, { useState, useEffect } from 'react'

interface Partenaire {
  id: number
  nom: string
  logo: string
  type: 'partenaire' | 'presse'
  lien?: string
}

const partenaires: Partenaire[] = [
  {
    id: 1,
    nom: 'Fashion Week Dakar',
    logo: '/images/partenaires/fashion-week-dakar.png',
    type: 'partenaire',
    lien: 'https://fashionweekdakar.com'
  },
  {
    id: 2,
    nom: 'Le Quotidien',
    logo: '/images/partenaires/quotidien.png',
    type: 'presse',
    lien: 'https://lequotidien.sn'
  },
  {
    id: 3,
    nom: 'Artisanat Sénégal',
    logo: '/images/partenaires/artisanat-senegal.png',
    type: 'partenaire',
    lien: 'https://artisanat.sn'
  },
  {
    id: 4,
    nom: 'Vogue Afrique',
    logo: '/images/partenaires/vogue-afrique.png',
    type: 'presse',
    lien: 'https://vogueafrique.com'
  },
  {
    id: 5,
    nom: 'Ministère de la Culture',
    logo: '/images/partenaires/ministere-culture.png',
    type: 'partenaire',
    lien: 'https://culture.gouv.sn'
  },
  {
    id: 6,
    nom: 'Elle Afrique',
    logo: '/images/partenaires/elle-afrique.png',
    type: 'presse',
    lien: 'https://elleafrique.com'
  }
]

function Partenaires() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % partenaires.length)
    }, 3000)

    return () => clearInterval(timer)
  }, [isAutoPlaying])

  const nextSlide = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % partenaires.length)
  }

  const prevSlide = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + partenaires.length) % partenaires.length)
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#333333] mb-6">Partenaires & Presse</h2>
          <div className="w-24 h-1 bg-[#00853F] mx-auto mb-6"></div>
          <p className="text-lg text-[#333333] max-w-2xl mx-auto">
            Découvrez nos partenaires et les médias qui parlent de nous
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {partenaires.map((partenaire) => (
                <div key={partenaire.id} className="w-full flex-shrink-0 px-4">
                  <div className="bg-[#F4F4F4] rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300">
                    <a 
                      href={partenaire.lien} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <div className="flex flex-col items-center">
                        <img
                          src={partenaire.logo}
                          alt={partenaire.nom}
                          className="h-24 object-contain mb-4 grayscale hover:grayscale-0 transition-all duration-300"
                        />
                        <span className="text-[#666666] text-sm">{partenaire.nom}</span>
                        <span className="text-[#00853F] text-xs font-medium mt-1">
                          {partenaire.type === 'presse' ? 'Média' : 'Partenaire'}
                        </span>
                      </div>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-md hover:bg-[#00853F] hover:text-white transition-colors duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-md hover:bg-[#00853F] hover:text-white transition-colors duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="mt-20">
          <h3 className="text-3xl font-bold text-[#333333] text-center mb-12">Ils parlent de nous</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partenaires
              .filter(p => p.type === 'presse')
              .map((media) => (
                <div key={media.id} className="bg-[#F4F4F4] rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                  <a 
                    href={media.lien} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div className="flex items-center mb-4">
                      <img
                        src={media.logo}
                        alt={media.nom}
                        className="h-12 object-contain mr-4 grayscale hover:grayscale-0 transition-all duration-300"
                      />
                      <h4 className="text-lg font-semibold text-[#333333]">{media.nom}</h4>
                    </div>
                    <p className="text-[#666666] text-sm">
                      Découvrez notre article dans {media.nom} et plongez dans l'univers de Taaru Sénégal.
                    </p>
                  </a>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Partenaires
