import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import fashionShowcase from '../../../../assets/images/fashion-showcase.png'
import CardCreation from './CardCreation'

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

const creations: Creation[] = [
  {
    id: 1,
    title: 'Boubou Traditionnel',
    description: 'Création sur mesure en tissu wax, parfait pour les cérémonies traditionnelles',
    image: fashionShowcase,
    images: [fashionShowcase, fashionShowcase, fashionShowcase],
    color: '#00853F',
    price: 'À partir de 45 000 FCFA',
    category: 'Tenue Traditionnelle',
    materials: ['Tissu Wax', 'Soie', 'Perles'],
    rating: 4.8,
    artisan: {
      id: 1,
      name: 'Mamadou Diop',
      phone: '+221 77 123 45 67',
      email: 'mamadou.diop@email.com',
      address: '123 Rue des Artisans',
      city: 'Dakar'
    }
  },
  {
    id: 2,
    title: 'Robe Moderne',
    description: 'Inspiration traditionnelle, style contemporain pour femme élégante',
    image: fashionShowcase,
    images: [fashionShowcase, fashionShowcase],
    color: '#FDEF00',
    price: 'À partir de 35 000 FCFA',
    category: 'Prêt-à-porter',
    materials: ['Bazin', 'Dentelle', 'Perles'],
    rating: 4.9,
    artisan: {
      id: 2,
      name: 'Aïssatou Fall',
      phone: '+221 77 234 56 78',
      email: 'aissatou.fall@email.com',
      address: '456 Avenue des Créateurs',
      city: 'Dakar'
    }
  },
  {
    id: 3,
    title: 'Accessoires',
    description: 'Collection exclusive de sacs et bijoux artisanaux',
    image: fashionShowcase,
    images: [fashionShowcase],
    color: '#E30B17',
    price: 'À partir de 15 000 FCFA',
    category: 'Accessoires',
    materials: ['Cuir', 'Perles', 'Bois'],
    rating: 4.7,
    artisan: {
      id: 3,
      name: 'Ousmane Ndiaye',
      phone: '+221 77 345 67 89',
      email: 'ousmane.ndiaye@email.com',
      address: '789 Boulevard des Artisans',
      city: 'Dakar'
    }
  },
  {
    id: 4,
    title: 'Costume Homme',
    description: 'Élégance africaine moderne pour homme d\'affaires',
    image: fashionShowcase,
    images: [fashionShowcase, fashionShowcase],
    color: '#00853F',
    price: 'À partir de 55 000 FCFA',
    category: 'Tenue de Ville',
    materials: ['Bazin', 'Soie', 'Laine'],
    rating: 4.9,
    artisan: {
      id: 4,
      name: 'Cheikh Mbaye',
      phone: '+221 77 456 78 90',
      email: 'cheikh.mbaye@email.com',
      address: '101 Rue des Artisans',
      city: 'Dakar'
    }
  },
  {
    id: 5,
    title: 'Tenue Cérémonie',
    description: 'Collection spéciale pour les grands événements',
    image: fashionShowcase,
    images: [fashionShowcase, fashionShowcase, fashionShowcase],
    color: '#FDEF00',
    price: 'À partir de 65 000 FCFA',
    category: 'Cérémonie',
    materials: ['Bazin riche', 'Soie', 'Perles'],
    rating: 5.0,
    artisan: {
      id: 5,
      name: 'Fatou Diouf',
      phone: '+221 77 567 89 01',
      email: 'fatou.diouf@email.com',
      address: '222 Rue des Créateurs',
      city: 'Dakar'
    }
  },
  {
    id: 6,
    title: 'Collection Enfant',
    description: 'Mode traditionnelle adaptée pour les plus petits',
    image: fashionShowcase,
    images: [fashionShowcase],
    color: '#E30B17',
    price: 'À partir de 25 000 FCFA',
    category: 'Enfant',
    materials: ['Coton', 'Wax', 'Perles'],
    rating: 4.8,
    artisan: {
      id: 6,
      name: 'Marième Sarr',
      phone: '+221 77 678 90 12',
      email: 'marieeme.sarr@email.com',
      address: '333 Boulevard des Artisans',
      city: 'Dakar'
    }
  }
]

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
  const navigate = useNavigate()

  // Ajout d'un carrousel d'images dans le modal
  const [currentImage, setCurrentImage] = useState(0);
  const selectedCreation = selectedImage !== null ? creations[selectedImage - 1] : null;

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

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#333333] mb-6">Nos Créations</h2>
          <div className="w-24 h-1 bg-[#00853F] mx-auto mb-6"></div>
          <p className="text-lg text-[#333333] max-w-2xl mx-auto">
            Découvrez notre sélection de créations uniques, alliant tradition et modernité
          </p>
        </div>

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
    </section>
  )
}

export default Creation

export { creations };
