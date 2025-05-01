import React from 'react'
import { Link } from 'react-router-dom'

interface Evenement {
  id: number
  titre: string
  date: string
  lieu: string
  description: string
  image: string
  categorie: string
}

const evenementsProchains: Evenement[] = [
  {
    id: 1,
    titre: "Meet Gala Sénégalaise",
    date: "06 Avril 2025",
    lieu: "Radisson Blu Dakar",
    description: "La plus prestigieuse soirée de la mode sénégalaise. Une célébration du talent et de la créativité de nos tailleurs avec défilés exclusifs.",
    image: "/events/meet-gala.jpg",
    categorie: "Gala"
  },
  {
    id: 2,
    titre: "Korité Fashion Week",
    date: "10 Avril 2024",
    lieu: "Dakar",
    description: "Une semaine dédiée aux créations pour la Korité. Rencontrez nos tailleurs, découvrez les dernières tendances et commandez votre tenue festive.",
    image: "/events/korite.jpg",
    categorie: "Festival"
  },
  {
    id: 3,
    titre: "Collection Spéciale Tabaski",
    date: "15 Juin 2024",
    lieu: "Tout le Sénégal",
    description: "Découvrez nos collections exclusives pour Tabaski. Nos tailleurs partenaires créent vos tenues sur-mesure pour célébrer cette fête en élégance.",
    image: "/events/tabaski.jpg",
    categorie: "Festival"
  }
]

function Evenements() {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête de la section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#333333]">
            Événements à venir
          </h2>
          <div className="mt-2 h-1 w-24 bg-gradient-to-r from-[#00853F] via-[#FDEF00] to-[#E30B17] mx-auto"></div>
          <p className="mt-4 text-xl text-gray-600">
            Rejoignez-nous pour célébrer la mode et l'artisanat sénégalais
          </p>
        </div>

        {/* Grille d'événements */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {evenementsProchains.map((event) => (
            <div 
              key={event.id}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {/* Image de l'événement */}
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>
                <div 
                  className="h-full w-full bg-[#F4F4F4]"
                  style={{
                    backgroundImage: `url(${event.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                ></div>
                <span className="absolute top-4 left-4 px-3 py-1 bg-[#00853F] text-white text-sm font-semibold rounded-full">
                  {event.categorie}
                </span>
              </div>

              {/* Contenu de l'événement */}
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <svg className="w-5 h-5 text-[#E30B17]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="ml-2 text-gray-600">{event.date}</span>
                  <svg className="w-5 h-5 ml-4 text-[#00853F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="ml-2 text-gray-600">{event.lieu}</span>
                </div>

                <h3 className="text-xl font-bold text-[#333333] mb-2">{event.titre}</h3>
                <p className="text-gray-600 mb-4">{event.description}</p>

                <Link
                  to={`/evenements/${event.id}`}
                  className="inline-flex items-center text-[#00853F] font-semibold hover:text-[#00853F]/80 transition-colors"
                >
                  En savoir plus
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bouton "Voir tous les événements" */}
        <div className="text-center mt-12">
          <Link
            to="/evenements"
            className="inline-flex items-center justify-center px-6 py-3 text-lg font-semibold text-white bg-[#00853F] rounded-lg hover:bg-[#00853F]/90 transition-all duration-300 shadow-lg hover:-translate-y-1"
          >
            Voir tous les événements
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Evenements
