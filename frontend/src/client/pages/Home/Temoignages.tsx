import React from 'react'

interface Temoignage {
  id: number
  nom: string
  role: string
  photo: string
  citation: string
  note: number
}

const temoignages: Temoignage[] = [
  {
    id: 1,
    nom: 'Aminata Diop',
    role: 'Client fidèle',
    photo: '/images/temoignages/aminata.jpg',
    citation: 'La qualité des créations Taaru Sénégal est exceptionnelle. Mon boubou sur mesure est parfaitement ajusté et le tissu est d\'une qualité remarquable.',
    note: 5
  },
  {
    id: 2,
    nom: 'Cheikh Ndiaye',
    role: 'Homme d\'affaires',
    photo: '/images/temoignages/cheikh.jpg',
    citation: 'Le costume que j\'ai commandé est d\'une élégance rare. L\'attention aux détails et le savoir-faire des artisans sont impressionnants.',
    note: 5
  },
  {
    id: 3,
    nom: 'Fatou Sow',
    role: 'Artiste',
    photo: '/images/temoignages/fatou.jpg',
    citation: 'Je suis ravie de ma robe de cérémonie. Le travail des artisans est remarquable et le service client est au top. Je recommande vivement !',
    note: 5
  },
  {
    id: 4,
    nom: 'Moussa Fall',
    role: 'Entrepreneur',
    photo: '/images/temoignages/moussa.jpg',
    citation: 'La collection homme est d\'une grande qualité. Les tissus sont magnifiques et les finitions impeccables. Un vrai plaisir de porter ces créations.',
    note: 5
  }
]

function Temoignages() {
  const renderStars = (note: number) => {
    return Array(5).fill(0).map((_, index) => (
      <svg
        key={index}
        className={`w-4 h-4 ${index < note ? 'text-[#FDEF00]' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))
  }

  return (
    <section className="py-20 bg-[#F4F4F4]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#333333] mb-6">Témoignages</h2>
          <div className="w-24 h-1 bg-[#00853F] mx-auto mb-6"></div>
          <p className="text-lg text-[#333333] max-w-2xl mx-auto">
            Découvrez ce que nos clients pensent de nos créations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {temoignages.map((temoignage) => (
            <div
              key={temoignage.id}
              className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center mb-6">
                  <div className="relative">
                    <img
                      src={temoignage.photo}
                      alt={temoignage.nom}
                      className="w-16 h-16 rounded-full object-cover ring-4 ring-[#00853F]/10 group-hover:ring-[#00853F]/30 transition-all duration-300"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-[#00853F] text-white rounded-full p-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-[#333333] group-hover:text-[#00853F] transition-colors duration-300">
                      {temoignage.nom}
                    </h3>
                    <p className="text-sm text-[#666666]">{temoignage.role}</p>
                  </div>
                </div>

                <div className="flex mb-4">
                  {renderStars(temoignage.note)}
                </div>

                <p className="text-[#333333] italic mb-6 flex-grow">
                  "{temoignage.citation}"
                </p>

                <div className="mt-auto pt-4 border-t border-[#00853F]/10">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#666666]">Témoignage vérifié</span>
                    <svg className="w-5 h-5 text-[#00853F]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-[#00853F] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#006B32] transition-colors duration-300 shadow-lg hover:shadow-xl">
            Voir tous les témoignages
          </button>
        </div>
      </div>
    </section>
  )
}

export default Temoignages

