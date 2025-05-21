import React from 'react'
import { Link } from 'react-router-dom'
import CardEvenement from '../../Evenements/CardEvenement'

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
            <CardEvenement key={event.id} event={event} />
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
