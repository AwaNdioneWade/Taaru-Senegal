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
  DollarSign,
  Clock,
} from 'lucide-react';
import { DataTable } from '../components/DataTable';
import { FilterConfig } from '../components/tableUtils';
import { AddFormModal } from '../components/AddFormModal';

interface Commande {
  id: string;
  client: {
    id: string;
    nom: string;
    prenom: string;
    email: string;
  };
  tailleur: {
    id: string;
    nom: string;
    prenom: string;
  };
  modele: {
    id: string;
    name: string;
    imageUrl: string;
  };
  dateCommande: string;
  dateLivraison: string;
  statut: 'en_attente' | 'en_cours' | 'terminee' | 'annulee';
  prix: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

type CommandeFormData = {
  client: string;
  tailleur: string;
  modele: string;
  dateCommande: string;
  dateLivraison: string;
  statut: 'en_attente' | 'en_cours' | 'terminee' | 'annulee';
  prix: number;
  notes?: string;
};

const Commandes = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatut, setSelectedStatut] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Données de démonstration
  const commandes: Commande[] = [
    {
      id: '1',
      client: {
        id: '1',
        nom: 'Diop',
        prenom: 'Amadou',
        email: 'amadou.diop@example.com',
      },
      tailleur: {
        id: '1',
        nom: 'Diop',
        prenom: 'Mamadou',
      },
      modele: {
        id: '1',
        name: 'Boubou Traditionnel',
        imageUrl: '/images/modeles/boubou.jpg',
      },
      dateCommande: '2024-03-15',
      dateLivraison: '2024-03-30',
      statut: 'en_cours',
      prix: 45000,
      notes: 'Boubou en wax bleu',
      createdAt: '2024-03-15',
      updatedAt: '2024-03-20',
    },
    {
      id: '2',
      client: {
        id: '2',
        nom: 'Sow',
        prenom: 'Fatou',
        email: 'fatou.sow@example.com',
      },
      tailleur: {
        id: '2',
        nom: 'Sow',
        prenom: 'Aminata',
      },
      modele: {
        id: '2',
        name: 'Robe de Mariée',
        imageUrl: '/images/modeles/robe-mariee.jpg',
      },
      dateCommande: '2024-03-10',
      dateLivraison: '2024-04-15',
      statut: 'en_attente',
      prix: 120000,
      createdAt: '2024-03-10',
      updatedAt: '2024-03-10',
    },
    {
      id: '3',
      client: {
        id: '3',
        nom: 'Diallo',
        prenom: 'Moussa',
        email: 'moussa.diallo@example.com',
      },
      tailleur: {
        id: '3',
        nom: 'Diallo',
        prenom: 'Ibrahima',
      },
      modele: {
        id: '3',
        name: 'Costume d\'Enfant',
        imageUrl: '/images/modeles/costume-enfant.jpg',
      },
      dateCommande: '2024-03-01',
      dateLivraison: '2024-03-20',
      statut: 'terminee',
      prix: 25000,
      createdAt: '2024-03-01',
      updatedAt: '2024-03-20',
    },
  ];

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'en_attente':
        return 'bg-yellow-100 text-yellow-800';
      case 'en_cours':
        return 'bg-blue-100 text-blue-800';
      case 'terminee':
        return 'bg-green-100 text-green-800';
      case 'annulee':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const columns = [
    {
      header: 'Commande',
      accessor: (commande: Commande) => (
        <div className="flex items-center">
          <div className="h-16 w-16 rounded-lg bg-gray-200 flex items-center justify-center overflow-hidden">
            <img src={commande.modele.imageUrl} alt={commande.modele.name} className="h-full w-full object-cover" />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{commande.modele.name}</div>
            <div className="text-sm text-gray-500">
              Client: {commande.client.prenom} {commande.client.nom}
            </div>
          </div>
        </div>
      ),
      sortable: true,
    },
    {
      header: 'Tailleur',
      accessor: (commande: Commande) => (
        <div className="text-sm text-gray-900">
          {commande.tailleur.prenom} {commande.tailleur.nom}
        </div>
      ),
      sortable: true,
    },
    {
      header: 'Dates',
      accessor: (commande: Commande) => (
        <div className="space-y-1">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-1" />
            <span>Commande: {new Date(commande.dateCommande).toLocaleDateString('fr-FR')}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-1" />
            <span>Livraison: {new Date(commande.dateLivraison).toLocaleDateString('fr-FR')}</span>
          </div>
        </div>
      ),
      sortable: true,
    },
    {
      header: 'Statut',
      accessor: (commande: Commande) => (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatutColor(commande.statut)}`}>
          {commande.statut.replace('_', ' ').charAt(0).toUpperCase() + commande.statut.slice(1)}
        </span>
      ),
      sortable: true,
    },
    {
      header: 'Prix',
      accessor: (commande: Commande) => (
        <div className="flex items-center text-sm text-gray-900">
          <DollarSign className="w-4 h-4 mr-1" />
          {commande.prix.toLocaleString('fr-FR')} FCFA
        </div>
      ),
      sortable: true,
    },
    {
      header: 'Actions',
      accessor: (commande: Commande) => (
        <div className="flex items-center justify-end space-x-2">
          <button 
            className="text-gray-400 hover:text-gray-500"
            onClick={(e) => {
              e.stopPropagation();
              console.log('Edit commande:', commande);
            }}
          >
            <Edit className="w-5 h-5" />
          </button>
          <button 
            className="text-gray-400 hover:text-gray-500"
            onClick={(e) => {
              e.stopPropagation();
              console.log('More options for commande:', commande);
            }}
          >
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      ),
    },
  ];

  const mobileView = (commande: Commande) => (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="h-16 w-16 rounded-lg bg-gray-200 flex items-center justify-center overflow-hidden">
            <img src={commande.modele.imageUrl} alt={commande.modele.name} className="h-full w-full object-cover" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900">{commande.modele.name}</h3>
            <p className="text-xs text-gray-500">
              Client: {commande.client.prenom} {commande.client.nom}
            </p>
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
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatutColor(commande.statut)}`}>
              {commande.statut.replace('_', ' ').charAt(0).toUpperCase() + commande.statut.slice(1)}
            </span>
          </div>
          <div className="flex items-center mt-2">
            <DollarSign className="w-4 h-4 mr-1" />
            <span className="text-sm text-gray-900">{commande.prix.toLocaleString('fr-FR')} FCFA</span>
          </div>
          <p className="text-sm text-gray-900 mt-2">
            Tailleur: {commande.tailleur.prenom} {commande.tailleur.nom}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Dates</p>
          <div className="flex items-center mt-1">
            <Calendar className="w-4 h-4 mr-1" />
            <span className="text-sm text-gray-900">
              {new Date(commande.dateCommande).toLocaleDateString('fr-FR')}
            </span>
          </div>
          <div className="flex items-center mt-2">
            <Clock className="w-4 h-4 mr-1" />
            <span className="text-sm text-gray-900">
              {new Date(commande.dateLivraison).toLocaleDateString('fr-FR')}
            </span>
          </div>
        </div>
      </div>

      {commande.notes && (
        <div>
          <p className="text-xs text-gray-500">Notes</p>
          <p className="text-sm text-gray-900 mt-1">{commande.notes}</p>
        </div>
      )}

      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-1" />
          <span>Mis à jour le {new Date(commande.updatedAt).toLocaleDateString('fr-FR')}</span>
        </div>
      </div>
    </div>
  );

  // Filtres initiaux
  const initialFilters: FilterConfig[] = [
    {
      field: 'statut',
      value: selectedStatut,
      operator: 'equals',
    },
  ];

  const handleSubmit = (data: Record<string, unknown>) => {
    // Validation des types
    const validatedData: CommandeFormData = {
      client: String(data.client),
      tailleur: String(data.tailleur),
      modele: String(data.modele),
      dateCommande: String(data.dateCommande),
      dateLivraison: String(data.dateLivraison),
      statut: data.statut as 'en_attente' | 'en_cours' | 'terminee' | 'annulee',
      prix: Number(data.prix),
      notes: data.notes ? String(data.notes) : undefined,
    };

    // TODO: Implémenter l'ajout de la commande dans la base de données
    console.log('Nouvelle commande à ajouter:', validatedData);
    // Pour l'instant, on ajoute juste à la liste locale
    const commande: Commande = {
      id: String(commandes.length + 1),
      client: {
        id: validatedData.client,
        nom: 'Nouveau',
        prenom: 'Client',
        email: 'client@example.com',
      },
      tailleur: {
        id: validatedData.tailleur,
        nom: 'Nouveau',
        prenom: 'Tailleur',
      },
      modele: {
        id: validatedData.modele,
        name: 'Nouveau Modèle',
        imageUrl: '/images/modeles/default.jpg',
      },
      dateCommande: validatedData.dateCommande,
      dateLivraison: validatedData.dateLivraison,
      statut: validatedData.statut,
      prix: validatedData.prix,
      notes: validatedData.notes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    commandes.push(commande);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des commandes</h1>
          <p className="text-sm text-gray-600">Gérez les commandes de la plateforme</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-[#00853F] rounded-lg hover:bg-[#006B32] flex items-center justify-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Ajouter une commande</span>
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
              placeholder="Rechercher une commande..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853F] focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#00853F] focus:border-transparent"
            value={selectedStatut}
            onChange={(e) => setSelectedStatut(e.target.value)}
          >
            <option value="all">Tous les statuts</option>
            <option value="en_attente">En attente</option>
            <option value="en_cours">En cours</option>
            <option value="terminee">Terminée</option>
            <option value="annulee">Annulée</option>
          </select>
          <button className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Plus de filtres</span>
          </button>
        </div>
      </div>

      {/* Table des commandes */}
      <DataTable
        columns={columns}
        data={commandes}
        itemsPerPage={10}
        searchable={false}
        mobileView={mobileView}
        onRowClick={() => {}}
        searchFields={['client.nom', 'client.prenom', 'modele.name']}
        initialFilters={initialFilters}
      />

      {/* Modal de formulaire */}
      <AddFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        type="commande"
      />
    </div>
  );
};

export default Commandes; 