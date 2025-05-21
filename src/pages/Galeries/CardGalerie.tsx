import React from 'react';

export interface GalerieItem {
  id: number;
  image: string;
  title: string;
  auteur: string;
}

interface CardGalerieProps {
  item: GalerieItem;
  onClick: (id: number) => void;
}

const CardGalerie: React.FC<CardGalerieProps> = ({ item, onClick }) => {
  return (
    <div
      className="relative group cursor-pointer rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white mt-10"
      onClick={() => onClick(item.id)}
    >
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <h3 className="text-lg font-bold text-white mb-1 drop-shadow-lg">{item.title}</h3>
        <p className="text-sm text-white/80 drop-shadow">par {item.auteur}</p>
      </div>
      <div className="absolute top-3 right-3 bg-white/80 text-[#00853F] px-2 py-1 rounded-full text-xs font-semibold shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300">Voir</div>
    </div>
  );
};

export default CardGalerie; 