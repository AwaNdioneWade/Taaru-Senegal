import { useState } from 'react';
import {
  Plus,
  Search,
  Filter,
  ChevronDown,
  Image as ImageIcon,
  Edit,
  Trash2,
  Tag,
  Calendar,
} from 'lucide-react';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const models = [
    {
      id: 1,
      title: 'Boubou traditionnel',
      image: '/models/boubou-1.jpg',
      fabric: 'Bazin riche',
      category: 'Boubou',
      event: 'Tabaski',
      date: '2024-03-15',
    },
    {
      id: 2,
      title: 'Caftan moderne',
      image: '/models/caftan-1.jpg',
      fabric: 'Wax',
      category: 'Caftan',
      event: 'Mariage',
      date: '2024-03-14',
    },
    {
      id: 3,
      title: 'Grand boubou',
      image: '/models/boubou-2.jpg',
      fabric: 'Bazin',
      category: 'Boubou',
      event: 'Magal',
      date: '2024-03-13',
    },
  ];

  const categories = [
    { id: 'all', name: 'Toutes les catégories' },
    { id: 'boubou', name: 'Boubou' },
    { id: 'caftan', name: 'Caftan' },
    { id: 'grande-robe', name: 'Grande robe' },
  ];

  const events = [
    { id: 'all', name: 'Tous les événements' },
    { id: 'tabaski', name: 'Tabaski' },
    { id: 'mariage', name: 'Mariage' },
    { id: 'magal', name: 'Magal' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Ma Galerie</h1>
        <button className="px-4 py-2 text-sm font-medium text-white bg-[#00853F] rounded-lg hover:bg-[#123d26]">
          <Plus className="inline-block w-4 h-4 mr-2" />
          Ajouter un modèle
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher un modèle..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="relative">
            <select
              className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="inline-block w-4 h-4 mr-2" />
            Filtres
          </button>
        </div>
      </div>

      {/* Models Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {models.map((model) => (
          <div
            key={model.id}
            className="bg-white rounded-xl shadow-sm overflow-hidden group"
          >
            <div className="relative aspect-[3/4] bg-gray-100">
              <img
                src={model.image}
                alt={model.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-200">
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-200">
                  <div className="flex justify-end space-x-2">
                    <button className="p-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                      <Edit className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-white bg-red-600 rounded-lg hover:bg-red-700">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900">{model.title}</h3>
              <div className="mt-2 space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                  <Tag className="w-4 h-4 mr-2" />
                  {model.fabric}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-2" />
                  {model.event}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Model Button (Mobile) */}
      <div className="fixed bottom-6 right-6 sm:hidden">
        <button className="p-4 text-white bg-blue-600 rounded-full shadow-lg hover:bg-blue-700">
          <Plus className="w-6 h-6" />
        </button>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Affichage de 1 à 3 sur 12 modèles
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            Précédent
          </button>
          <button className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
            1
          </button>
          <button className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            2
          </button>
          <button className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            3
          </button>
          <button className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
};

export default Gallery; 