import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import fashionShowcase from '../../../../assets/images/fashion-showcase.png'
import CardCreation from './CardCreation'
import { getModeles, Modele } from '../../../../../services/modeleService'

interface Creation {
  id: number
  title: string
  description: string
  image: string
  images: string[]
  color: string
  price: string
  category: string
  materials: string[]
  rating: number
  artisan: {
    id: number
    name: string
    phone: string
    email: string
    address: string
    city: string
  }
}

// Fonction pour convertir un Modele en Creation
const convertModeleToCreation = (modele: Modele): Creation => {
  // Obtenir la première photo du modèle
  const getFirstPhoto = (modele: Modele) => {
    if (modele.photos && modele.photos.length > 0) {
      return `http://localhost:8000/${modele.photos[0]}`;
    }
    return fashionShowcase; // Image par défaut
  };

  // Obtenir toutes les photos du modèle
  const getAllPhotos = (modele: Modele) => {
    if (modele.photos && modele.photos.length > 0) {
      return modele.photos.map(photo => `http://localhost:8000/${photo}`);
    }
    return [fashionShowcase]; // Image par défaut
  };

  // Déterminer la couleur en fonction du type
  const getColorByType = (type: string) => {
    const colors: { [key: string]: string } = {
      'homme': '#00853F',
      'femme': '#FDEF00',
      'enfant': '#E30B17',
      'mixte': '#00853F'
    };
    return colors[type] || '#00853F';
  };

  // Déterminer la catégorie en fonction du type
  const getCategoryByType = (type: string) => {
    const categories: { [key: string]: string } = {
      'homme': 'Tenue de Ville',
      'femme': 'Prêt-à-porter',
      'enfant': 'Enfant',
      'mixte': 'Tenue Traditionnelle'
    };
    return categories[type] || 'Création';
  };

  return {
    id: modele.id,
    title: modele.nom,
    description: modele.description,
    image: getFirstPhoto(modele),
    images: getAllPhotos(modele),
    color: getColorByType(modele.type),
    price: modele.prix ? `À partir de ${Number(modele.prix).toLocaleString()} FCFA` : 'Prix sur demande',
    category: getCategoryByType(modele.type),
    materials: modele.materiaux || [],
    rating: 4.8, // Note par défaut
    artisan: {
      id: modele.user?.id || 0,
      name: modele.user?.name || 'Artisan',
      phone: '+221 00 000 00 00',
      email: modele.user?.email || 'artisan@taaru.sn',
      address: 'Dakar',
      city: 'Dakar'
    }
  };
};

// Fonction pour déterminer le type d'artisan en fonction de la catégorie
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
  }

  return artisanTypes[category] || 'Artisan'
}

function Creation() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [creations, setCreations] = useState<Creation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  // Ajout d'un carrousel d'images dans le modal
  const [currentImage, setCurrentImage] = useState(0);
  const selectedCreation = selectedImage !== null ? creations.find(c => c.id === selectedImage) : null;

  // Charger les modèles depuis l'API
  useEffect(() => {
    const fetchModeles = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Utiliser la version publique (sans authentification)
        const response = await getModeles({ 
          per_page: 6, 
          statut: 'actif',
          useAuth: false // Forcer l'utilisation de la version publique
        });
        
        const convertedCreations = response.data.map(convertModeleToCreation);
        setCreations(convertedCreations);
      } catch (err) {
        console.error('Erreur lors du chargement des modèles:', err);
        setError('Erreur lors du chargement des créations');
      } finally {
        setLoading(false);
      }
    };

    fetchModeles();
  }, []);

  const handleArtisanClick = (artisanId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/artisan/${artisanId}`)
  }

  const handlePrevImage = () => {
    if (!selectedCreation) return;
    setCurrentImage((prev) => (prev === 0 ? selectedCreation.images.length - 1 : prev - 1));
  };
  const handleNextImage = () => {
    if (!selectedCreation) return;
    setCurrentImage((prev) => (prev === selectedCreation.images.length - 1 ? 0 : prev + 1));
  };
  React.useEffect(() => {
    setCurrentImage(0);
  }, [selectedImage]);

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, index) => (
      <svg
        key={index}
        className={`w-4 h-4 ${index < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))
  }

  if (loading) {
    return (
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nos Créations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
                <div className="bg-gray-300 h-4 rounded mb-2"></div>
                <div className="bg-gray-300 h-4 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nos Créations</h2>
          <div className="text-center text-red-600">
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Réessayer
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Nos Créations</h2>
        
        {creations.length === 0 ? (
          <div className="text-center text-gray-600">
            <p>Aucune création disponible pour le moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {creations.map((creation) => (
              <CardCreation
                key={creation.id}
                creation={creation}
                getArtisanType={getArtisanType}
                renderStars={renderStars}
                onSelect={setSelectedImage}
                onArtisanClick={handleArtisanClick}
              />
            ))}
          </div>
        )}

        {selectedImage !== null && selectedCreation && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <button
              className="fixed top-4 right-4 text-white text-4xl hover:text-[#00853F] transition-colors duration-300 z-50"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
            <div className="relative w-full max-w-4xl mx-auto my-8">
              <div className="bg-white rounded-xl overflow-hidden shadow-2xl">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* Carrousel d'images */}
                  <div className="relative aspect-square lg:aspect-auto lg:h-[600px] flex items-center justify-center bg-black/5">
                    {selectedCreation.images.length > 1 && (
                      <>
                        <button
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 rounded-full p-2 z-10 shadow"
                          onClick={handlePrevImage}
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                        </button>
                        <button
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 rounded-full p-2 z-10 shadow"
                          onClick={handleNextImage}
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        </button>
                      </>
                    )}
                    <img
                      src={selectedCreation.images[currentImage]}
                      alt={selectedCreation.title}
                      className="w-full h-full object-cover rounded-xl transition-all duration-500"
                      onError={(e) => {
                        e.currentTarget.src = fashionShowcase;
                      }}
                />
                    {/* Miniatures */}
                    {selectedCreation.images.length > 1 && (
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-white/70 rounded-full px-3 py-1">
                        {selectedCreation.images.map((img, idx) => (
                          <button
                            key={idx}
                            className={`w-4 h-4 rounded-full border-2 ${idx === currentImage ? 'border-[#00853F] bg-[#00853F]' : 'border-gray-300 bg-white'} transition-all`}
                            onClick={() => setCurrentImage(idx)}
                          />
                        ))}
                      </div>
                    )}
                    <div className="absolute top-4 left-4 bg-white/90 text-[#333333] px-3 py-1 rounded-full text-sm font-medium">
                      {selectedCreation.category}
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 lg:p-8 flex flex-col h-full">
                    <h3 className="text-2xl lg:text-3xl font-bold mb-4">{selectedCreation.title}</h3>
                    <p className="text-gray-600 mb-6">{selectedCreation.description}</p>
                    
                    <div className="flex items-center mb-6">
                      {renderStars(selectedCreation.rating)}
                      <span className="ml-2 text-gray-600">({selectedCreation.rating})</span>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-lg mb-3">
                        {getArtisanType(selectedCreation.category)}
                      </h4>
                      <div 
                        className="bg-gray-50 p-4 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                        onClick={(e) => handleArtisanClick(selectedCreation.artisan.id, e)}
                      >
                        <p className="font-semibold text-[#00853F] mb-2">{selectedCreation.artisan.name}</p>
                        <div className="space-y-2 text-sm text-gray-600">
                          <p className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            {selectedCreation.artisan.phone}
                          </p>
                          <p className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            {selectedCreation.artisan.email}
                          </p>
                          <p className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {selectedCreation.artisan.address}, {selectedCreation.artisan.city}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-lg mb-3">Prix</h4>
                      <p className="text-2xl font-bold text-[#00853F]">{selectedCreation.price}</p>
                </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-lg mb-3">Matériaux</h4>
                <div className="flex flex-wrap gap-2">
                        {selectedCreation.materials.map((material, index) => (
                          <span 
                            key={index} 
                            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                          >
                      {material}
                    </span>
                  ))}
                      </div>
                    </div>

                    <div className="mt-auto pt-6 border-t">
                      <button 
                        className="w-full bg-[#00853F] text-white py-3 px-6 rounded-lg hover:bg-[#FDEF00] hover:text-[#00853F] transition-colors duration-200"
                        onClick={(e) => handleArtisanClick(selectedCreation.artisan.id, e)}
                      >
                        Voir le profil du {getArtisanType(selectedCreation.category).toLowerCase()}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Creation
