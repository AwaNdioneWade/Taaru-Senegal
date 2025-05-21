import React, { useState } from 'react';
import CardGalerie, { GalerieItem } from './CardGalerie';
import fashionShowcase from '../../assets/images/fashion-showcase.png'

// Images de démonstration (à remplacer par tes vraies images)
const galerieData: GalerieItem[] = [
  {
    id: 1,
    image: fashionShowcase,
    title: 'Robe Wax Élégante',
    auteur: 'Aïssatou Fall',
  },
  {
    id: 2,
    image: '/gallery/boubou1.jpg',
    title: 'Boubou Traditionnel',
    auteur: 'Mamadou Diop',
  },
  {
    id: 3,
    image: '/gallery/accessoire1.jpg',
    title: 'Accessoires Perlés',
    auteur: 'Fatou Diouf',
  },
  {
    id: 4,
    image: '/gallery/costume1.jpg',
    title: 'Costume Homme',
    auteur: 'Cheikh Mbaye',
  },
  {
    id: 5,
    image: '/gallery/robe2.jpg',
    title: 'Robe de Cérémonie',
    auteur: 'Marième Sarr',
  },
  {
    id: 6,
    image: '/gallery/enfant1.jpg',
    title: 'Mode Enfant',
    auteur: 'Ousmane Ndiaye',
  },
  // Ajoute plus d'images pour tester la pagination
  {
    id: 7,
    image: '/gallery/robe3.jpg',
    title: 'Robe Colorée',
    auteur: 'Awa Ba',
  },
  {
    id: 8,
    image: '/gallery/accessoire2.jpg',
    title: 'Bijoux Ethniques',
    auteur: 'Fatou Diouf',
  },
  {
    id: 9,
    image: '/gallery/costume2.jpg',
    title: 'Costume Moderne',
    auteur: 'Cheikh Mbaye',
  },
  {
    id: 10,
    image: '/gallery/robe4.jpg',
    title: 'Robe de Soirée',
    auteur: 'Aïssatou Fall',
  },
  {
    id: 11,
    image: '/gallery/boubou2.jpg',
    title: 'Boubou Chic',
    auteur: 'Mamadou Diop',
  },
  {
    id: 12,
    image: '/gallery/enfant2.jpg',
    title: 'Enfant Festif',
    auteur: 'Ousmane Ndiaye',
  },
];

const IMAGES_PER_PAGE = 6;

const Galeries: React.FC = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const selectedItem = galerieData.find((item) => item.id === selected);

  // Pagination logic
  const totalPages = Math.ceil(galerieData.length / IMAGES_PER_PAGE);
  const startIdx = (page - 1) * IMAGES_PER_PAGE;
  const endIdx = startIdx + IMAGES_PER_PAGE;
  const imagesToShow = galerieData.slice(startIdx, endIdx);

  const goToPage = (p: number) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 px-2 mt-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-bold text-[#00853F] mb-3">Galerie d'inspiration</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[#00853F] via-[#FDEF00] to-[#E30B17] mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Explorez les plus belles créations de nos artisans : mode, accessoires, et inspirations sénégalaises.</p>
        </div>
        {/* Grille d'images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {imagesToShow.map((item) => (
            <CardGalerie key={item.id} item={item} onClick={setSelected} />
          ))}
        </div>
        {/* Pagination */}
        <div className="flex justify-center mt-12 gap-2 flex-wrap">
          <button
            className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600 font-semibold hover:bg-[#00853F]/10 hover:text-[#00853F] transition disabled:opacity-50"
            onClick={() => goToPage(page - 1)}
            disabled={page === 1}
          >
            Précédent
          </button>
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx + 1}
              className={`px-4 py-2 rounded-lg font-semibold transition border-2 ${page === idx + 1 ? 'bg-[#00853F] text-white border-[#00853F]' : 'bg-white text-gray-700 border-gray-200 hover:bg-[#00853F]/10 hover:text-[#00853F]'}`}
              onClick={() => goToPage(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}
          <button
            className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600 font-semibold hover:bg-[#00853F]/10 hover:text-[#00853F] transition disabled:opacity-50"
            onClick={() => goToPage(page + 1)}
            disabled={page === totalPages}
          >
            Suivant
          </button>
        </div>
      </div>
      {/* Modal d'aperçu */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <button
            className="absolute top-6 right-8 text-white text-4xl hover:text-[#FDEF00] transition-colors z-50"
            onClick={() => setSelected(null)}
          >
            ×
          </button>
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col items-center">
            <img
              src={selectedItem.image}
              alt={selectedItem.title}
              className="w-full max-h-[70vh] object-contain bg-gray-100"
            />
            <div className="p-6 w-full text-center">
              <h2 className="text-2xl font-bold text-[#00853F] mb-2">{selectedItem.title}</h2>
              <p className="text-gray-600 mb-1">par <span className="font-semibold">{selectedItem.auteur}</span></p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Galeries;
