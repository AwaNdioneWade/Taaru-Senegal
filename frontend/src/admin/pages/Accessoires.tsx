import { useState } from 'react';
import {
  Search,
  Filter,
  MoreVertical,
  Plus,
  Download,
  Edit,
  Tag,
  DollarSign,
  Package,
  Store,
} from 'lucide-react';
import { DataTable } from '../components/DataTable';
import { FilterConfig } from '../components/tableUtils';
import { AddFormModal } from '../components/AddFormModal';

interface Accessoire {
  id: string;
  name: string;
  description: string;
  category: 'bijoux' | 'chaussures' | 'sacs' | 'ceintures' | 'chapeaux' | 'autre';
  prix: number;
  stock: number;
  fournisseur: string;
  imageUrl: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

type AccessoireFormData = {
  name: string;
  description: string;
  category: 'bijoux' | 'chaussures' | 'sacs' | 'ceintures' | 'chapeaux' | 'autre';
  prix: number;
  stock: number;
  fournisseur: string;
  imageUrl: string;
  tags: string[];
};

const Accessoires = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Données de démonstration
  const accessoires: Accessoire[] = [
    {
      id: '1',
      name: 'Collier en Perles',
      description: 'Collier traditionnel en perles multicolores',
      category: 'bijoux',
      prix: 25000,
      stock: 15,
      fournisseur: 'Bijoux Traditionnels SARL',
      imageUrl: '/images/accessoires/collier-perles.jpg',
      tags: ['traditionnel', 'cérémonie'],
      createdAt: '2024-03-15',
      updatedAt: '2024-03-20',
    },
    {
      id: '2',
      name: 'Sandales en Cuir',
      description: 'Sandales en cuir véritable',
      category: 'chaussures',
      prix: 35000,
      stock: 20,
      fournisseur: 'Chaussures Africaines',
      imageUrl: '/images/accessoires/sandales-cuir.jpg',
      tags: ['cuir', 'confortable'],
      createdAt: '2024-03-10',
      updatedAt: '2024-03-10',
    },
    {
      id: '3',
      name: 'Sac en Rafia',
      description: 'Sac à main en rafia tressé',
      category: 'sacs',
      prix: 15000,
      stock: 25,
      fournisseur: 'Artisanat Local',
      imageUrl: '/images/accessoires/sac-rafia.jpg',
      tags: ['artisanal', 'rafia'],
      createdAt: '2024-03-01',
      updatedAt: '2024-03-20',
    },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'bijoux':
        return 'bg-purple-100 text-purple-800';
      case 'chaussures':
        return 'bg-blue-100 text-blue-800';
      case 'sacs':
        return 'bg-green-100 text-green-800';
      case 'ceintures':
        return 'bg-yellow-100 text-yellow-800';
      case 'chapeaux':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const columns = [
    {
      header: 'Accessoire',
      accessor: (accessoire: Accessoire) => (
        <div className="flex items-center">
          <div className="h-16 w-16 rounded-lg bg-gray-200 flex items-center justify-center overflow-hidden">
            <img src={accessoire.imageUrl} alt={accessoire.name} className="h-full w-full object-cover" />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{accessoire.name}</div>
            <div className="text-sm text-gray-500">{accessoire.description}</div>
          </div>
        </div>
      ),
      sortable: true,
    },
    {
      header: 'Catégorie',
      accessor: (accessoire: Accessoire) => (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getCategoryColor(accessoire.category)}`}>
          {accessoire.category.charAt(0).toUpperCase() + accessoire.category.slice(1)}
        </span>
      ),
      sortable: true,
    },
    {
      header: 'Stock',
      accessor: (accessoire: Accessoire) => (
        <div className="flex items-center text-sm text-gray-900">
          <Package className="w-4 h-4 mr-1" />
          {accessoire.stock} unités
        </div>
      ),
      sortable: true,
    },
    {
      header: 'Prix',
      accessor: (accessoire: Accessoire) => (
        <div className="flex items-center text-sm text-gray-900">
          <DollarSign className="w-4 h-4 mr-1" />
          {accessoire.prix.toLocaleString('fr-FR')} FCFA
        </div>
      ),
      sortable: true,
    },
    {
      header: 'Fournisseur',
      accessor: (accessoire: Accessoire) => (
        <div className="flex items-center text-sm text-gray-900">
          <Store className="w-4 h-4 mr-1" />
          {accessoire.fournisseur}
        </div>
      ),
      sortable: true,
    },
    {
      header: 'Actions',
      accessor: (accessoire: Accessoire) => (
        <div className="flex items-center justify-end space-x-2">
          <button 
            className="text-gray-400 hover:text-gray-500"
            onClick={(e) => {
              e.stopPropagation();
              console.log('Edit accessoire:', accessoire);
            }}
          >
            <Edit className="w-5 h-5" />
          </button>
          <button 
            className="text-gray-400 hover:text-gray-500"
            onClick={(e) => {
              e.stopPropagation();
              console.log('More options for accessoire:', accessoire);
            }}
          >
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      ),
    },
  ];

  const mobileView = (accessoire: Accessoire) => (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="h-16 w-16 rounded-lg bg-gray-200 flex items-center justify-center overflow-hidden">
            <img src={accessoire.imageUrl} alt={accessoire.name} className="h-full w-full object-cover" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900">{accessoire.name}</h3>
            <p className="text-xs text-gray-500">{accessoire.description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="text-gray-400 hover:text-gray-500">
            <Edit className="w-5 h-5" />
          </button>
          <button className="text-gray-400 hover:text-gray-500">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-gray-500">Informations</p>
          <div className="flex items-center space-x-2 mt-1">
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getCategoryColor(accessoire.category)}`}>
              {accessoire.category.charAt(0).toUpperCase() + accessoire.category.slice(1)}
            </span>
          </div>
          <div className="flex items-center mt-2">
            <Package className="w-4 h-4 mr-1" />
            <span className="text-sm text-gray-900">{accessoire.stock} unités</span>
          </div>
          <div className="flex items-center mt-2">
            <DollarSign className="w-4 h-4 mr-1" />
            <span className="text-sm text-gray-900">{accessoire.prix.toLocaleString('fr-FR')} FCFA</span>
          </div>
        </div>
        <div>
          <p className="text-xs text-gray-500">Fournisseur</p>
          <div className="flex items-center mt-1">
            <Store className="w-4 h-4 mr-1" />
            <span className="text-sm text-gray-900">{accessoire.fournisseur}</span>
          </div>
        </div>
      </div>

      {accessoire.tags.length > 0 && (
        <div>
          <p className="text-xs text-gray-500">Tags</p>
          <div className="flex flex-wrap gap-2 mt-1">
            {accessoire.tags.map((tag) => (
              <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center">
          <span>Mis à jour le {new Date(accessoire.updatedAt).toLocaleDateString('fr-FR')}</span>
        </div>
      </div>
    </div>
  );

  // Filtres initiaux
  const initialFilters: FilterConfig[] = [
    {
      field: 'category',
      value: selectedCategory,
      operator: 'equals',
    },
  ];

  const handleSubmit = (data: Record<string, unknown>) => {
    // Validation des types
    const validatedData: AccessoireFormData = {
      name: String(data.name),
      description: String(data.description),
      category: data.category as 'bijoux' | 'chaussures' | 'sacs' | 'ceintures' | 'chapeaux' | 'autre',
      prix: Number(data.prix),
      stock: Number(data.stock),
      fournisseur: String(data.fournisseur),
      imageUrl: String(data.imageUrl),
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    };

    // TODO: Implémenter l'ajout de l'accessoire dans la base de données
    console.log('Nouvel accessoire à ajouter:', validatedData);
    // Pour l'instant, on ajoute juste à la liste locale
    const accessoire: Accessoire = {
      id: String(accessoires.length + 1),
      ...validatedData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    accessoires.push(accessoire);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des accessoires</h1>
          <p className="text-sm text-gray-600">Gérez le stock d'accessoires de la plateforme</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-[#00853F] rounded-lg hover:bg-[#006B32] flex items-center justify-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Ajouter un accessoire</span>
          </button>
          <button className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Exporter</span>
          </button>
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher un accessoire..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853F] focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#00853F] focus:border-transparent"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">Toutes les catégories</option>
            <option value="bijoux">Bijoux</option>
            <option value="chaussures">Chaussures</option>
            <option value="sacs">Sacs</option>
            <option value="ceintures">Ceintures</option>
            <option value="chapeaux">Chapeaux</option>
            <option value="autre">Autre</option>
          </select>
          <button className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Plus de filtres</span>
          </button>
        </div>
      </div>

      {/* Table des accessoires */}
      <DataTable
        columns={columns}
        data={accessoires}
        itemsPerPage={10}
        searchable={false}
        mobileView={mobileView}
        onRowClick={() => {}}
        searchFields={['name', 'description', 'fournisseur']}
        initialFilters={initialFilters}
      />

      {/* Modal de formulaire */}
      <AddFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        type="accessoire"
      />
    </div>
  );
};

export default Accessoires; 