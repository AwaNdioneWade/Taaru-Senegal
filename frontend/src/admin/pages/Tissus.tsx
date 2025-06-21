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

interface Tissu {
  id: string;
  name: string;
  description: string;
  type: 'wax' | 'bazin' | 'soie' | 'coton' | 'lin' | 'autre';
  couleur: string;
  prix: number;
  stock: number;
  fournisseur: string;
  imageUrl: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

type TissuFormData = {
  name: string;
  description: string;
  type: 'wax' | 'bazin' | 'soie' | 'coton' | 'lin' | 'autre';
  couleur: string;
  prix: number;
  stock: number;
  fournisseur: string;
  imageUrl: string;
  tags: string[];
};

const Tissus = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Données de démonstration
  const tissus: Tissu[] = [
    {
      id: '1',
      name: 'Wax Africain',
      description: 'Wax traditionnel aux motifs géométriques',
      type: 'wax',
      couleur: 'Bleu et blanc',
      prix: 15000,
      stock: 50,
      fournisseur: 'Textiles Africains SARL',
      imageUrl: '/images/tissus/wax-bleu.jpg',
      tags: ['traditionnel', 'cérémonie'],
      createdAt: '2024-03-15',
      updatedAt: '2024-03-20',
    },
    {
      id: '2',
      name: 'Bazin Riche',
      description: 'Bazin de qualité supérieure',
      type: 'bazin',
      couleur: 'Or',
      prix: 25000,
      stock: 30,
      fournisseur: 'Luxe Textiles',
      imageUrl: '/images/tissus/bazin-or.jpg',
      tags: ['luxe', 'cérémonie'],
      createdAt: '2024-03-10',
      updatedAt: '2024-03-10',
    },
    {
      id: '3',
      name: 'Soie Naturelle',
      description: 'Soie 100% naturelle',
      type: 'soie',
      couleur: 'Rouge',
      prix: 35000,
      stock: 20,
      fournisseur: 'Soieries du Sénégal',
      imageUrl: '/images/tissus/soie-rouge.jpg',
      tags: ['luxe', 'soie'],
      createdAt: '2024-03-01',
      updatedAt: '2024-03-20',
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'wax':
        return 'bg-blue-100 text-blue-800';
      case 'bazin':
        return 'bg-purple-100 text-purple-800';
      case 'soie':
        return 'bg-pink-100 text-pink-800';
      case 'coton':
        return 'bg-green-100 text-green-800';
      case 'lin':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const columns = [
    {
      header: 'Tissu',
      accessor: (tissu: Tissu) => (
        <div className="flex items-center">
          <div className="h-16 w-16 rounded-lg bg-gray-200 flex items-center justify-center overflow-hidden">
            <img src={tissu.imageUrl} alt={tissu.name} className="h-full w-full object-cover" />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{tissu.name}</div>
            <div className="text-sm text-gray-500">{tissu.description}</div>
          </div>
        </div>
      ),
      sortable: true,
    },
    {
      header: 'Type',
      accessor: (tissu: Tissu) => (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeColor(tissu.type)}`}>
          {tissu.type.charAt(0).toUpperCase() + tissu.type.slice(1)}
        </span>
      ),
      sortable: true,
    },
    {
      header: 'Stock',
      accessor: (tissu: Tissu) => (
        <div className="flex items-center text-sm text-gray-900">
          <Package className="w-4 h-4 mr-1" />
          {tissu.stock} m
        </div>
      ),
      sortable: true,
    },
    {
      header: 'Prix',
      accessor: (tissu: Tissu) => (
        <div className="flex items-center text-sm text-gray-900">
          <DollarSign className="w-4 h-4 mr-1" />
          {tissu.prix.toLocaleString('fr-FR')} FCFA/m
        </div>
      ),
      sortable: true,
    },
    {
      header: 'Fournisseur',
      accessor: (tissu: Tissu) => (
        <div className="flex items-center text-sm text-gray-900">
          <Store className="w-4 h-4 mr-1" />
          {tissu.fournisseur}
        </div>
      ),
      sortable: true,
    },
    {
      header: 'Actions',
      accessor: (tissu: Tissu) => (
        <div className="flex items-center justify-end space-x-2">
          <button 
            className="text-gray-400 hover:text-gray-500"
            onClick={(e) => {
              e.stopPropagation();
              console.log('Edit tissu:', tissu);
            }}
          >
            <Edit className="w-5 h-5" />
          </button>
          <button 
            className="text-gray-400 hover:text-gray-500"
            onClick={(e) => {
              e.stopPropagation();
              console.log('More options for tissu:', tissu);
            }}
          >
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      ),
    },
  ];

  const mobileView = (tissu: Tissu) => (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="h-16 w-16 rounded-lg bg-gray-200 flex items-center justify-center overflow-hidden">
            <img src={tissu.imageUrl} alt={tissu.name} className="h-full w-full object-cover" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900">{tissu.name}</h3>
            <p className="text-xs text-gray-500">{tissu.description}</p>
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
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeColor(tissu.type)}`}>
              {tissu.type.charAt(0).toUpperCase() + tissu.type.slice(1)}
            </span>
          </div>
          <div className="flex items-center mt-2">
            <Package className="w-4 h-4 mr-1" />
            <span className="text-sm text-gray-900">{tissu.stock} mètres</span>
          </div>
          <div className="flex items-center mt-2">
            <DollarSign className="w-4 h-4 mr-1" />
            <span className="text-sm text-gray-900">{tissu.prix.toLocaleString('fr-FR')} FCFA/m</span>
          </div>
        </div>
        <div>
          <p className="text-xs text-gray-500">Fournisseur</p>
          <div className="flex items-center mt-1">
            <Store className="w-4 h-4 mr-1" />
            <span className="text-sm text-gray-900">{tissu.fournisseur}</span>
          </div>
          <p className="text-sm text-gray-900 mt-2">
            Couleur: {tissu.couleur}
          </p>
        </div>
      </div>

      {tissu.tags.length > 0 && (
        <div>
          <p className="text-xs text-gray-500">Tags</p>
          <div className="flex flex-wrap gap-2 mt-1">
            {tissu.tags.map((tag) => (
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
          <span>Mis à jour le {new Date(tissu.updatedAt).toLocaleDateString('fr-FR')}</span>
        </div>
      </div>
    </div>
  );

  // Filtres initiaux
  const initialFilters: FilterConfig[] = [
    {
      field: 'type',
      value: selectedType,
      operator: 'equals',
    },
  ];

  const handleSubmit = (data: Record<string, unknown>) => {
    // Validation des types
    const validatedData: TissuFormData = {
      name: String(data.name),
      description: String(data.description),
      type: data.type as 'wax' | 'bazin' | 'soie' | 'coton' | 'lin' | 'autre',
      couleur: String(data.couleur),
      prix: Number(data.prix),
      stock: Number(data.stock),
      fournisseur: String(data.fournisseur),
      imageUrl: String(data.imageUrl),
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    };

    // TODO: Implémenter l'ajout du tissu dans la base de données
    console.log('Nouveau tissu à ajouter:', validatedData);
    // Pour l'instant, on ajoute juste à la liste locale
    const tissu: Tissu = {
      id: String(tissus.length + 1),
      ...validatedData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    tissus.push(tissu);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des tissus</h1>
          <p className="text-sm text-gray-600">Gérez le stock de tissus de la plateforme</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-[#00853F] rounded-lg hover:bg-[#006B32] flex items-center justify-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Ajouter un tissu</span>
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
              placeholder="Rechercher un tissu..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853F] focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#00853F] focus:border-transparent"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="all">Tous les types</option>
            <option value="wax">Wax</option>
            <option value="bazin">Bazin</option>
            <option value="soie">Soie</option>
            <option value="coton">Coton</option>
            <option value="lin">Lin</option>
            <option value="autre">Autre</option>
          </select>
          <button className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Plus de filtres</span>
          </button>
        </div>
      </div>

      {/* Table des tissus */}
      <DataTable
        columns={columns}
        data={tissus}
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
        type="tissu"
      />
    </div>
  );
};

export default Tissus; 