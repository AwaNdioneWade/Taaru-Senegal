import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { creations as allCreations } from '../Home/components/Creations/Creation';

interface Creation {
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
}

const getArtisanType = (category: string): string => {
  const artisanTypes: { [key: string]: string } = {
    'Tenue Traditionnelle': 'Tailleur',
    'Prêt-à-porter': 'Couturier',
    'Accessoires': 'Commerçant',
    'Tenue de Ville': 'Tailleur',
    'Cérémonie': 'Couturier',
    'Enfant': 'Couturier',
    'Homme': 'Tailleur',
    'Femme': 'Couturier',
    'Mariage': 'Couturier',
    'Bijoux': 'Commerçant',
    'Sacs': 'Commerçant',
    'Chaussures': 'Cordonnier',
    'Tissus': 'Commerçant',
    'Tissu Wax': 'Commerçant',
    'Bazin': 'Commerçant',
    'Soie': 'Commerçant'
  };
  return artisanTypes[category] || 'Artisan';
};

const ArtisanProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const artisanId = Number(id);

  // Déplacer tous les hooks useState au début du composant
  const [currentImages, setCurrentImages] = useState<{[key:number]:number}>({});
  const [selectedCreation, setSelectedCreation] = useState<Creation | null>(null);
  const [modalImageIdx, setModalImageIdx] = useState(0);

  // Trouver la première création de cet artisan pour récupérer ses infos
  const creation = allCreations.find((c: Creation) => c.artisan.id === artisanId);
  if (!creation) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-md text-center">
          <h2 className="text-2xl font-bold mb-4">Artisan introuvable</h2>
          <button onClick={() => navigate(-1)} className="mt-4 px-4 py-2 bg-[#00853F] text-white rounded-lg hover:bg-[#00853F] transition">Retour</button>
        </div>
      </div>
    );
  }

  const artisan = creation.artisan;
  // Récupérer toutes les créations de cet artisan
  const creations = allCreations.filter((c: Creation) => c.artisan.id === artisanId);
  // Déterminer le type d'artisan à partir de la première création
  const artisanType = getArtisanType(creation.category);

  // Pour chaque création, gérer l'index de l'image courante dans la grille
  const handlePrevImage = (id: number, images: string[]) => {
    setCurrentImages(prev => ({
      ...prev,
      [id]: prev[id] === 0 || prev[id] === undefined ? images.length - 1 : prev[id] - 1
    }));
  };
  const handleNextImage = (id: number, images: string[]) => {
    setCurrentImages(prev => ({
      ...prev,
      [id]: prev[id] === undefined || prev[id] === images.length - 1 ? 0 : prev[id] + 1
    }));
  };
  const handleSetImage = (id: number, idx: number) => {
    setCurrentImages(prev => ({ ...prev, [id]: idx }));
  };

  // Pour le modal de visualisation en grand
  const openModal = (creation: Creation, idx: number) => {
    setSelectedCreation(creation);
    setModalImageIdx(idx);
  };
  const closeModal = () => {
    setSelectedCreation(null);
    setModalImageIdx(0);
  };
  const handleModalPrev = () => {
    if (!selectedCreation) return;
    setModalImageIdx(idx => idx === 0 ? selectedCreation.images.length - 1 : idx - 1);
  };
  const handleModalNext = () => {
    if (!selectedCreation) return;
    setModalImageIdx(idx => idx === selectedCreation.images.length - 1 ? 0 : idx + 1);
  };
  const handleModalSet = (idx: number) => setModalImageIdx(idx);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-2 sm:px-4 lg:px-8 mt-10">
      <div className=" px-4">
        {/* En-tête du profil */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12 relative">
          {/* Bandeau vert réduit */}
          <div className="relative h-28 bg-gradient-to-r from-[#00853F] to-[#00B050] flex items-center">
            {/* Flèche de retour plus petite et mieux alignée */}
            <button 
              onClick={() => navigate(-1)} 
              className="absolute top-4 left-4 bg-white/90 hover:bg-white text-gray-700 rounded-full p-1.5 shadow-lg transition-all duration-300 hover:scale-110 z-20"
              style={{ fontSize: '1.5rem' }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            {/* Avatar centré et qui dépasse */}
            <div className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="w-28 h-28 rounded-full bg-white p-1 shadow-2xl flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-[#00853F] to-green-100 flex items-center justify-center text-5xl font-bold text-[#00853F]">
                  {artisan.name[0]}
                </div>
              </div>
            </div>
          </div>
          {/* Infos profil */}
          <div className="pt-20 pb-8 px-6 flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-1 text-gray-800 text-center">{artisan.name}</h1>
            <p className="text-lg text-[#00853F] font-medium mb-3 text-center">{artisanType}</p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-gray-600 text-sm items-center justify-center">
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-[#00853F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>{artisan.phone}</span>
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-[#00853F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>{artisan.email}</span>
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-[#00853F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{artisan.address}, {artisan.city}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section des créations */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <span className="text-[#00853F]">Créations</span>
            <span className="text-gray-400">de {artisan.name}</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {creations.map((c: Creation) => (
              <div 
                key={c.id} 
                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="relative aspect-square w-full overflow-hidden">
                  {c.images && c.images.length > 1 && (
                    <>
                      <button
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 rounded-full p-2 z-10 shadow-lg transition-all duration-300 hover:scale-110"
                        onClick={() => handlePrevImage(c.id, c.images)}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 rounded-full p-2 z-10 shadow-lg transition-all duration-300 hover:scale-110"
                        onClick={() => handleNextImage(c.id, c.images)}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </>
                  )}
                  <img
                    src={c.images ? c.images[currentImages[c.id] || 0] : c.image}
                    alt={c.title}
                    className="w-full h-full object-cover transition-all duration-500 hover:scale-110 cursor-pointer"
                    onClick={() => openModal(c, currentImages[c.id] || 0)}
                  />
                  {c.images && c.images.length > 1 && (
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg">
                      {c.images.map((img: string, idx: number) => (
                        <button
                          key={idx}
                          className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                            idx === (currentImages[c.id] || 0) 
                              ? 'bg-[#00853F] scale-125' 
                              : 'bg-gray-300 hover:bg-gray-400'
                          }`}
                          onClick={() => handleSetImage(c.id, idx)}
                        />
                      ))}
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">{c.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{c.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="inline-block bg-[#00853F]/10 text-[#00853F] text-sm px-3 py-1 rounded-full">
                      {c.category}
                    </span>
                    <span className="text-xl font-bold text-[#00853F]">{c.price}</span>
                  </div>
                </div>
              </div>
            ))}
            {creations.length === 0 && (
              <div className="col-span-full text-center py-12">
                <div className="text-gray-400 text-lg">Aucune création pour cet artisan.</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal de visualisation en grand */}
      {selectedCreation && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <button
            className="fixed top-4 right-4 text-white hover:text-[#00853F] transition-colors duration-300 z-50 bg-black/50 rounded-full p-2"
            onClick={closeModal}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="relative w-full max-w-4xl mx-auto my-8">
            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
              <div className="relative aspect-square flex items-center justify-center bg-black/5">
                {selectedCreation.images.length > 1 && (
                  <>
                    <button
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 rounded-full p-3 z-10 shadow-lg transition-all duration-300 hover:scale-110"
                      onClick={handleModalPrev}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 rounded-full p-3 z-10 shadow-lg transition-all duration-300 hover:scale-110"
                      onClick={handleModalNext}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}
                <img
                  src={selectedCreation.images[modalImageIdx]}
                  alt={selectedCreation.title}
                  className="w-full h-full object-contain rounded-xl transition-all duration-500"
                />
                {selectedCreation.images.length > 1 && (
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                    {selectedCreation.images.map((img, idx) => (
                      <button
                        key={idx}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          idx === modalImageIdx 
                            ? 'bg-[#00853F] scale-125' 
                            : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                        onClick={() => handleModalSet(idx)}
                      />
                    ))}
                  </div>
                )}
              </div>
              <div className="p-8">
                <h3 className="text-3xl font-bold mb-3 text-gray-800">{selectedCreation.title}</h3>
                <p className="text-lg text-gray-600 mb-6">{selectedCreation.description}</p>
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="bg-[#00853F]/10 text-[#00853F] px-4 py-2 rounded-full text-sm font-medium">
                    {selectedCreation.category}
                  </span>
                  <span className="bg-blue-50 text-[#00853F] px-4 py-2 rounded-full text-sm font-medium">
                    {selectedCreation.price}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedCreation.materials.map((mat, idx) => (
                    <span 
                      key={idx} 
                      className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium"
                    >
                      {mat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtisanProfile; 