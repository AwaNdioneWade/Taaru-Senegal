import React from 'react';
import CardEvenement, { Evenement } from './CardEvenement';

const evenements: Evenement[] = [
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
];

const EvenementsPage: React.FC = () => {
  return (
    <section className="py-12 bg-white min-h-screen mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête de la page */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#333333]">Tous les événements</h1>
          <div className="mt-2 h-1 w-32 bg-gradient-to-r from-[#00853F] via-[#FDEF00] to-[#E30B17] mx-auto"></div>
          <p className="mt-4 text-xl text-gray-600">Découvrez tous les événements autour de la mode et de l'artisanat sénégalais</p>
        </div>
        {/* Grille d'événements */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {evenements.map((event) => (
            <CardEvenement key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EvenementsPage;
