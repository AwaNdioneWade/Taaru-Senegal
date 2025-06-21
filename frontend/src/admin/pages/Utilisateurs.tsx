import { useState } from 'react';
import {
  Search,
  Filter,
  MoreVertical,
  Plus,
  Download,
  Edit,
  User,
  Calendar,
} from 'lucide-react';
import { DataTable } from '../components/DataTable';
import { FilterConfig } from '../components/tableUtils';
import { AddFormModal } from '../components/AddFormModal';

interface Utilisateur {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  role: 'admin' | 'utilisateur' | 'client';
  adresse: string;
  createdAt: string;
  updatedAt: string;
}

type UtilisateurFormData = {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  role: 'admin' | 'utilisateur' | 'client';
  adresse: string;
};

const Utilisateurs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Données de démonstration
  const utilisateurs: Utilisateur[] = [
    {
      id: '1',
      nom: 'Diop',
      prenom: 'Amadou',
      email: 'amadou.diop@example.com',
      telephone: '+221 77 123 45 67',
      role: 'admin',
      adresse: 'Dakar, Sénégal',
      createdAt: '2024-01-15',
      updatedAt: '2024-03-20',
    },
    {
      id: '2',
      nom: 'Sow',
      prenom: 'Fatou',
      email: 'fatou.sow@example.com',
      telephone: '+221 76 234 56 78',
      role: 'utilisateur',
      adresse: 'Thiès, Sénégal',
      createdAt: '2024-02-01',
      updatedAt: '2024-03-19',
    },
    {
      id: '3',
      nom: 'Diallo',
      prenom: 'Moussa',
      email: 'moussa.diallo@example.com',
      telephone: '+221 75 345 67 89',
      role: 'client',
      adresse: 'Saint-Louis, Sénégal',
      createdAt: '2024-03-10',
      updatedAt: '2024-03-15',
    },
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800';
      case 'utilisateur':
        return 'bg-blue-100 text-blue-800';
      case 'client':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const columns = [
    {
      header: 'Utilisateur',
      accessor: (utilisateur: Utilisateur) => (
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
            <User className="w-6 h-6 text-gray-400" />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {utilisateur.prenom} {utilisateur.nom}
            </div>
            <div className="text-sm text-gray-500">{utilisateur.email}</div>
          </div>
        </div>
      ),
      sortable: true,
    },
    {
      header: 'Rôle',
      accessor: (utilisateur: Utilisateur) => (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleColor(utilisateur.role)}`}>
          {utilisateur.role.charAt(0).toUpperCase() + utilisateur.role.slice(1)}
        </span>
      ),
      sortable: true,
    },
    {
      header: 'Téléphone',
      accessor: (utilisateur: Utilisateur) => (
        <div className="text-sm text-gray-900">{utilisateur.telephone}</div>
      ),
      sortable: true,
    },
    {
      header: 'Adresse',
      accessor: (utilisateur: Utilisateur) => (
        <div className="text-sm text-gray-500">{utilisateur.adresse}</div>
      ),
      sortable: true,
    },
    {
      header: 'Mise à jour',
      accessor: (utilisateur: Utilisateur) => (
        <div className="text-sm text-gray-500">
          {new Date(utilisateur.updatedAt).toLocaleDateString('fr-FR')}
        </div>
      ),
      sortable: true,
    },
    {
      header: 'Actions',
      accessor: (utilisateur: Utilisateur) => (
        <div className="flex items-center justify-end space-x-2">
          <button 
            className="text-gray-400 hover:text-gray-500"
            onClick={(e) => {
              e.stopPropagation();
              console.log('Edit utilisateur:', utilisateur);
            }}
          >
            <Edit className="w-5 h-5" />
          </button>
          <button 
            className="text-gray-400 hover:text-gray-500"
            onClick={(e) => {
              e.stopPropagation();
              console.log('More options for utilisateur:', utilisateur);
            }}
          >
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      ),
    },
  ];

  const mobileView = (utilisateur: Utilisateur) => (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
            <User className="w-6 h-6 text-gray-400" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900">
              {utilisateur.prenom} {utilisateur.nom}
            </h3>
            <p className="text-xs text-gray-500">{utilisateur.email}</p>
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
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleColor(utilisateur.role)}`}>
              {utilisateur.role.charAt(0).toUpperCase() + utilisateur.role.slice(1)}
            </span>
          </div>
          <p className="text-sm text-gray-900 mt-2">{utilisateur.telephone}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Adresse</p>
          <p className="text-sm text-gray-900 mt-1">{utilisateur.adresse}</p>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-1" />
          <span>Mis à jour le {new Date(utilisateur.updatedAt).toLocaleDateString('fr-FR')}</span>
        </div>
      </div>
    </div>
  );

  // Filtres initiaux
  const initialFilters: FilterConfig[] = [
    {
      field: 'role',
      value: selectedRole,
      operator: 'equals',
    },
  ];

  const handleSubmit = (data: Record<string, unknown>) => {
    // Validation des types
    const validatedData: UtilisateurFormData = {
      nom: String(data.nom),
      prenom: String(data.prenom),
      email: String(data.email),
      telephone: String(data.telephone),
      role: data.role as 'admin' | 'utilisateur' | 'client',
      adresse: String(data.adresse),
    };

    // TODO: Implémenter l'ajout de l'utilisateur dans la base de données
    console.log('Nouvel utilisateur à ajouter:', validatedData);
    // Pour l'instant, on ajoute juste à la liste locale
    const utilisateur: Utilisateur = {
      id: String(utilisateurs.length + 1),
      ...validatedData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    utilisateurs.push(utilisateur);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des utilisateurs</h1>
          <p className="text-sm text-gray-600">Gérez les utilisateurs de la plateforme</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-[#00853F] rounded-lg hover:bg-[#006B32] flex items-center justify-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Ajouter un utilisateur</span>
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
              placeholder="Rechercher un utilisateur..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853F] focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#00853F] focus:border-transparent"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="all">Tous les rôles</option>
            <option value="admin">Administrateur</option>
            <option value="utilisateur">Utilisateur</option>
            <option value="client">Client</option>
          </select>
          <button className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Plus de filtres</span>
          </button>
        </div>
      </div>

      {/* Table des utilisateurs */}
      <DataTable
        columns={columns}
        data={utilisateurs}
        itemsPerPage={10}
        searchable={false}
        mobileView={mobileView}
        onRowClick={() => {}}
        searchFields={['nom', 'prenom', 'email']}
        initialFilters={initialFilters}
      />

      {/* Modal de formulaire */}
      <AddFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        type="utilisateur"
      />
    </div>
  );
};

export default Utilisateurs; 