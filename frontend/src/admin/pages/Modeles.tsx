import { useState } from 'react';
import {
  Search,
  Filter,
  MoreVertical,
  Plus,
  Download,
  Edit,
  Image,
  Calendar,
} from 'lucide-react';
import { DataTable } from '../components/DataTable';
import { FilterConfig } from '../components/tableUtils';
import { AddFormModal } from '../components/AddFormModal';
import { PreviewModeleModal } from '../components/PreviewModeleModal';

interface Modele {
  id: string;
  name: string;
  description: string;
  category: 'homme' | 'femme' | 'enfant' | 'accessoire';
  price: number;
  status: 'disponible' | 'indisponible' | 'en_revision';
  createdAt: string;
  updatedAt: string;
  imageUrl: string;
  tags: string[];
}

type ModeleFormData = {
  name: string;
  description: string;
  category: 'homme' | 'femme' | 'enfant' | 'accessoire';
  price: number;
  status: 'disponible' | 'indisponible' | 'en_revision';
  tags: string[];
  imageUrl: string;
};

const Modeles = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewModele, setPreviewModele] = useState<Modele | null>(null);

  // Données de démonstration
  const modeles: Modele[] = [
    {
      id: '1',
      name: 'Boubou Traditionnel',
      description: 'Boubou traditionnel sénégalais en wax',
      category: 'homme',
      price: 45000,
      status: 'disponible',
      createdAt: '2024-01-15',
      updatedAt: '2024-03-20',
      imageUrl: '/images/modeles/boubou.jpg',
      tags: ['traditionnel', 'cérémonie', 'wax'],
    },
    {
      id: '2',
      name: 'Robe de Mariée',
      description: 'Robe de mariée moderne avec broderies',
      category: 'femme',
      price: 120000,
      status: 'disponible',
      createdAt: '2024-02-01',
      updatedAt: '2024-03-19',
      imageUrl: '/images/modeles/robe-mariee.jpg',
      tags: ['mariage', 'broderie', 'luxe'],
    },
    {
      id: '3',
      name: 'Costume d\'Enfant',
      description: 'Costume traditionnel pour enfant',
      category: 'enfant',
      price: 25000,
      status: 'en_revision',
      createdAt: '2024-03-10',
      updatedAt: '2024-03-15',
      imageUrl: '/images/modeles/costume-enfant.jpg',
      tags: ['enfant', 'traditionnel', 'cérémonie'],
    },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'homme':
        return 'bg-blue-100 text-blue-800';
      case 'femme':
        return 'bg-pink-100 text-pink-800';
      case 'enfant':
        return 'bg-green-100 text-green-800';
      case 'accessoire':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'disponible':
        return 'bg-green-100 text-green-800';
      case 'indisponible':
        return 'bg-red-100 text-red-800';
      case 'en_revision':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const columns = [
    {
      header: 'Modèle',
      accessor: (modele: Modele) => (
        <div className="flex items-center">
          <div className="h-16 w-16 rounded-lg bg-gray-200 flex items-center justify-center overflow-hidden">
            <Image className="w-8 h-8 text-gray-400" />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{modele.name}</div>
            <div className="text-sm text-gray-500">{modele.description}</div>
          </div>
        </div>
      ),
      sortable: true,
    },
    {
      header: 'Catégorie',
      accessor: (modele: Modele) => (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getCategoryColor(modele.category)}`}>
          {modele.category.charAt(0).toUpperCase() + modele.category.slice(1)}
        </span>
      ),
      sortable: true,
    },
    {
      header: 'Prix',
      accessor: (modele: Modele) => (
        <div className="text-sm text-gray-900">
          {modele.price.toLocaleString('fr-FR')} FCFA
        </div>
      ),
      sortable: true,
    },
    {
      header: 'Statut',
      accessor: (modele: Modele) => (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(modele.status)}`}>
          {modele.status.replace('_', ' ').charAt(0).toUpperCase() + modele.status.slice(1)}
        </span>
      ),
      sortable: true,
    },
    {
      header: 'Mise à jour',
      accessor: (modele: Modele) => (
        <div className="text-sm text-gray-500">
          {new Date(modele.updatedAt).toLocaleDateString('fr-FR')}
        </div>
      ),
      sortable: true,
    },
    {
      header: 'Actions',
      accessor: (modele: Modele) => (
        <div className="flex items-center justify-end space-x-2">
          <button 
            className="text-gray-400 hover:text-gray-500"
            onClick={(e) => {
              e.stopPropagation();
              console.log('Edit modele:', modele);
            }}
          >
            <Edit className="w-5 h-5" />
          </button>
          <button 
            className="text-gray-400 hover:text-gray-500"
            onClick={(e) => {
              e.stopPropagation();
              console.log('More options for modele:', modele);
            }}
          >
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      ),
    },
  ];

  const mobileView = (modele: Modele) => (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="h-16 w-16 rounded-lg bg-gray-200 flex items-center justify-center overflow-hidden">
            <Image className="w-8 h-8 text-gray-400" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900">{modele.name}</h3>
            <p className="text-xs text-gray-500">{modele.description}</p>
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
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getCategoryColor(modele.category)}`}>
              {modele.category.charAt(0).toUpperCase() + modele.category.slice(1)}
            </span>
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(modele.status)}`}>
              {modele.status.replace('_', ' ').charAt(0).toUpperCase() + modele.status.slice(1)}
            </span>
          </div>
          <p className="text-sm text-gray-900 mt-2">
            {modele.price.toLocaleString('fr-FR')} FCFA
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Tags</p>
          <div className="flex flex-wrap gap-1 mt-1">
            {modele.tags.map((tag) => (
              <span key={tag} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-1" />
          <span>Mis à jour le {new Date(modele.updatedAt).toLocaleDateString('fr-FR')}</span>
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
    {
      field: 'status',
      value: selectedStatus,
      operator: 'equals',
    },
  ];

  const handleSubmit = (data: Record<string, unknown>) => {
    // Validation des types
    const validatedData: ModeleFormData = {
      name: String(data.name),
      description: String(data.description),
      category: data.category as 'homme' | 'femme' | 'enfant' | 'accessoire',
      price: Number(data.price),
      status: data.status as 'disponible' | 'indisponible' | 'en_revision',
      tags: Array.isArray(data.tags) ? data.tags : [],
      imageUrl: String(data.imageUrl),
    };

    // TODO: Implémenter l'ajout du modèle dans la base de données
    console.log('Nouveau modèle à ajouter:', validatedData);
    // Pour l'instant, on ajoute juste à la liste locale
    const modele: Modele = {
      id: String(modeles.length + 1),
      ...validatedData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    modeles.push(modele);
    setIsModalOpen(false);
  };

  const handlePreviewModele = (modele: Modele) => {
    setPreviewModele(modele);
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des modèles</h1>
          <p className="text-sm text-gray-600">Gérez les modèles de vêtements</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-[#00853F] rounded-lg hover:bg-[#006B32] flex items-center justify-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Ajouter un modèle</span>
          </button>
          <button className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Exporter</span>
          </button>
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher un modèle..."
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
            <option value="homme">Homme</option>
            <option value="femme">Femme</option>
            <option value="enfant">Enfant</option>
            <option value="accessoire">Accessoire</option>
          </select>
          <select
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#00853F] focus:border-transparent"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="all">Tous les statuts</option>
            <option value="disponible">Disponible</option>
            <option value="indisponible">Indisponible</option>
            <option value="en_revision">En révision</option>
          </select>
          <button className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Plus de filtres</span>
          </button>
        </div>
      </div>

      {/* Table des modèles */}
      <DataTable
        columns={columns}
        data={modeles}
        itemsPerPage={10}
        searchable={false}
        mobileView={mobileView}
        onRowClick={() => {}}
        searchFields={['name', 'description']}
        initialFilters={initialFilters}
        showPreviewButton={true}
        onPreviewClick={handlePreviewModele}
      />

      {/* Modal de formulaire */}
      <AddFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        type="modele"
      />

      {/* Modal de prévisualisation */}
      <PreviewModeleModal
        isOpen={!!previewModele}
        onClose={() => setPreviewModele(null)}
        modele={previewModele}
      />
    </div>
  );
};

export default Modeles; 