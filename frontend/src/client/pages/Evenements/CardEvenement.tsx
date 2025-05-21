import React from 'react';
import { Link } from 'react-router-dom';

export interface Evenement {
  id: number;
  titre: string;
  date: string;
  lieu: string;
  description: string;
  image: string;
  categorie: string;
}

interface CardEvenementProps {
  event: Evenement;
}

const CardEvenement: React.FC<CardEvenementProps> = ({ event }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Image de l'événement */}
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>
        <div
          className="h-full w-full bg-[#F4F4F4]"
          style={{
            backgroundImage: `url(${event.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
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
  );
};

export default CardEvenement;
