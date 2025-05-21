import React from 'react';

interface CardCreationProps {
  creation: {
    id: number;
    title: string;
    description: string;
    image: string;
    images: string[];
    color: string;
    price: string;
    category: string;
    materials: string[];
    rating: number;
    artisan: {
      id: number;
      name: string;
      phone: string;
      email: string;
      address: string;
      city: string;
    };
  };
  getArtisanType: (category: string) => string;
  renderStars: (rating: number) => React.ReactNode;
  onSelect: (id: number) => void;
  onArtisanClick: (artisanId: number, e: React.MouseEvent) => void;
}

const CardCreation: React.FC<CardCreationProps> = ({ creation, getArtisanType, renderStars, onSelect, onArtisanClick }) => {
  return (
    <div
      className="group relative overflow-hidden rounded-xl cursor-pointer bg-white shadow-md hover:shadow-xl transition-all duration-300"
      onClick={() => onSelect(creation.id)}
    >
      <div className="relative aspect-square">
        <img
          src={creation.images[0]}
          alt={creation.title}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:grayscale"
        />
        <div
          className="absolute inset-0 transition-all duration-500 group-hover:bg-black/40"
          style={{ border: `2px solid ${creation.color}` }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <span className="absolute top-4 left-4 bg-white/90 text-[#333333] px-3 py-1 rounded-full text-sm font-medium">
            {creation.category}
          </span>
          <h3 className="text-2xl font-bold mb-2">{creation.title}</h3>
          <p className="text-center mb-4">{creation.description}</p>
          <div className="flex items-center mb-2">
            {renderStars(creation.rating)}
            <span className="ml-2 text-sm">({creation.rating})</span>
          </div>
          <div
            className="text-sm mb-2 cursor-pointer hover:text-[#00853F] transition-colors duration-200 group/artisan relative"
            onClick={e => onArtisanClick(creation.artisan.id, e)}
          >
            <span className="flex items-center gap-2">
              {getArtisanType(creation.category)}: {creation.artisan.name}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            <div className="absolute left-0 top-full mt-2 w-64 bg-white text-gray-800 p-3 rounded-lg shadow-lg opacity-0 invisible group-hover/artisan:opacity-100 group-hover/artisan:visible transition-all duration-200 z-50">
              <div className="space-y-2">
                <div className="sticky top-0 bg-white pb-2 border-b">
                  <p className="font-semibold text-[#00853F]">{creation.artisan.name}</p>
                  <p className="text-sm text-gray-600">{getArtisanType(creation.category)}</p>
                </div>
                <div className="space-y-1 text-sm">
                  <p className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="break-words">{creation.artisan.phone}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="break-words">{creation.artisan.email}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="break-words">{creation.artisan.address}, {creation.artisan.city}</span>
                  </p>
                </div>
                <div className="sticky bottom-0 pt-2 border-t bg-white">
                  <button
                    className="w-full bg-[#00853F] text-white py-1 px-3 rounded-md text-sm hover:bg-[#FDEF00] transition-colors duration-200"
                    onClick={e => onArtisanClick(creation.artisan.id, e)}
                  >
                    Voir le profil du {getArtisanType(creation.category).toLowerCase()}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="text-lg font-semibold mb-2">{creation.price}</div>
          <div className="flex flex-wrap gap-2 justify-center">
            {creation.materials.map((material, index) => (
              <span key={index} className="bg-white/20 px-2 py-1 rounded-full text-xs">
                {material}
              </span>
            ))}
          </div>
          <div
            className="absolute bottom-0 left-0 w-full h-1 transition-all duration-500"
            style={{ backgroundColor: creation.color }}
          />
        </div>
      </div>
    </div>
  );
};

export default CardCreation;
