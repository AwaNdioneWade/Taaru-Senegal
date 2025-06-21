import { useState } from 'react';
import {
  Search,
  Filter,
  MoreVertical,
  Plus,
  Download,
  Edit,
  Calendar,
  MapPin,
  User,
  Phone,
  DollarSign,
  Clock,
} from 'lucide-react';
import { DataTable } from '../components/DataTable';
import { FilterConfig } from '../components/tableUtils';
import { AddFormModal } from '../components/AddFormModal';

interface Evenement {
  id: string;
  name: string;
  description: string;
  type: 'mariage' | 'bapteme' | 'communion' | 'anniversaire' | 'autre';
  dateDebut: string;
  dateFin: string;
  lieu: string;
  organisateur: string;
  contact: string;
  budget: number;
  statut: 'planifie' | 'en_cours' | 'termine' | 'annule';
  imageUrl: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

type EvenementFormData = {
  name: string;
  description: string;
  type: 'mariage' | 'bapteme' | 'communion' | 'anniversaire' | 'autre';
  dateDebut: string;
  dateFin: string;
  lieu: string;
  organisateur: string;
  contact: string;
  budget: number;
  statut: 'planifie' | 'en_cours' | 'termine' | 'annule';
  imageUrl: string;
  notes?: string;
};

const Evenements = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatut, setSelectedStatut] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Données de démonstration
  const evenements: Evenement[] = [
    {
      id: '1',
      name: 'Mariage de Fatou et Amadou',
      description: 'Cérémonie traditionnelle et réception',
      type: 'mariage',
      dateDebut: '2024-06-15',
      dateFin: '2024-06-16',
      lieu: 'Hôtel Terrou-Bi, Dakar',
      organisateur: 'Mariama Diop',
      contact: '+221 77 123 45 67',
      budget: 5000000,
      statut: 'planifie',
      imageUrl: '/images/evenements/mariage.jpg',
      notes: 'Prévoir 300 invités',
      createdAt: '2024-03-15',
      updatedAt: '2024-03-20',
    },
    {
      id: '2',
      name: 'Baptême de Khady',
      description: 'Cérémonie religieuse et réception',
      type: 'bapteme',
      dateDebut: '2024-05-20',
      dateFin: '2024-05-20',
      lieu: 'Église Saint-Michel, Dakar',
      organisateur: 'Omar Sow',
      contact: '+221 77 234 56 78',
      budget: 1500000,
      statut: 'en_cours',
      imageUrl: '/images/evenements/bapteme.jpg',
      createdAt: '2024-03-10',
      updatedAt: '2024-03-10',
    },
    {
      id: '3',
      name: 'Anniversaire de Moussa',
      description: 'Fête d\'anniversaire des 50 ans',
      type: 'anniversaire',
      dateDebut: '2024-04-30',
      dateFin: '2024-04-30',
      lieu: 'Villa des Palmiers, Dakar',
      organisateur: 'Aminata Diallo',
      contact: '+221 77 345 67 89',
      budget: 2000000,
      statut: 'planifie',
      imageUrl: '/images/evenements/anniversaire.jpg',
      createdAt: '2024-03-01',
      updatedAt: '2024-03-20',
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'mariage':
        return 'bg-pink-100 text-pink-800';
      case 'bapteme':
        return 'bg-blue-100 text-blue-800';
      case 'communion':
        return 'bg-purple-100 text-purple-800';
      case 'anniversaire':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'planifie':
        return 'bg-blue-100 text-blue-800';
      case 'en_cours':
        return 'bg-green-100 text-green-800';
      case 'termine':
        return 'bg-gray-100 text-gray-800';
      case 'annule':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const columns = [
    {
      header: 'Événement',
      accessor: (evenement: Evenement) => (
        <div className="flex items-center">
          <div className="h-16 w-16 rounded-lg bg-gray-200 flex items-center justify-center overflow-hidden">
            <img src={evenement.imageUrl} alt={evenement.name} className="h-full w-full object-cover" />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{evenement.name}</div>
            <div className="text-sm text-gray-500">{evenement.description}</div>
          </div>
        </div>
      ),
      sortable: true,
    },
    {
      header: 'Type',
      accessor: (evenement: Evenement) => (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeColor(evenement.type)}`}>
          {evenement.type.charAt(0).toUpperCase() + evenement.type.slice(1)}
        </span>
      ),
      sortable: true,
    },
    {
      header: 'Dates',
      accessor: (evenement: Evenement) => (
        <div className="flex items-center text-sm text-gray-900">
          <Calendar className="w-4 h-4 mr-1" />
          <div>
            <div>Du {new Date(evenement.dateDebut).toLocaleDateString('fr-FR')}</div>
            <div>Au {new Date(evenement.dateFin).toLocaleDateString('fr-FR')}</div>
          </div>
        </div>
      ),
      sortable: true,
    },
    {
      header: 'Lieu',
      accessor: (evenement: Evenement) => (
        <div className="flex items-center text-sm text-gray-900">
          <MapPin className="w-4 h-4 mr-1" />
          {evenement.lieu}
        </div>
      ),
      sortable: true,
    },
    {
      header: 'Organisateur',
      accessor: (evenement: Evenement) => (
        <div className="flex items-center text-sm text-gray-900">
          <User className="w-4 h-4 mr-1" />
          {evenement.organisateur}
        </div>
      ),
      sortable: true,
    },
    {
      header: 'Statut',
      accessor: (evenement: Evenement) => (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatutColor(evenement.statut)}`}>
          {evenement.statut.charAt(0).toUpperCase() + evenement.statut.slice(1)}
        </span>
      ),
      sortable: true,
    },
    {
      header: 'Actions',
      accessor: (evenement: Evenement) => (
        <div className="flex items-center justify-end space-x-2">
          <button 
            className="text-gray-400 hover:text-gray-500"
            onClick={(e) => {
              e.stopPropagation();
              console.log('Edit evenement:', evenement);
            }}
          >
            <Edit className="w-5 h-5" />
          </button>
          <button 
            className="text-gray-400 hover:text-gray-500"
            onClick={(e) => {
              e.stopPropagation();
              console.log('More options for evenement:', evenement);
            }}
          >
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      ),
    },
  ];

  const mobileView = (evenement: Evenement) => (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="h-16 w-16 rounded-lg bg-gray-200 flex items-center justify-center overflow-hidden">
            <img src={evenement.imageUrl} alt={evenement.name} className="h-full w-full object-cover" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900">{evenement.name}</h3>
            <p className="text-xs text-gray-500">{evenement.description}</p>
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
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeColor(evenement.type)}`}>
              {evenement.type.charAt(0).toUpperCase() + evenement.type.slice(1)}
            </span>
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatutColor(evenement.statut)}`}>
              {evenement.statut.charAt(0).toUpperCase() + evenement.statut.slice(1)}
            </span>
          </div>
          <div className="flex items-center mt-2">
            <Calendar className="w-4 h-4 mr-1" />
            <span className="text-sm text-gray-900">
              Du {new Date(evenement.dateDebut).toLocaleDateString('fr-FR')} au {new Date(evenement.dateFin).toLocaleDateString('fr-FR')}
            </span>
          </div>
          <div className="flex items-center mt-2">
            <DollarSign className="w-4 h-4 mr-1" />
            <span className="text-sm text-gray-900">{evenement.budget.toLocaleString('fr-FR')} FCFA</span>
          </div>
        </div>
        <div>
          <p className="text-xs text-gray-500">Contact</p>
          <div className="flex items-center mt-1">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm text-gray-900">{evenement.lieu}</span>
          </div>
          <div className="flex items-center mt-2">
            <User className="w-4 h-4 mr-1" />
            <span className="text-sm text-gray-900">{evenement.organisateur}</span>
          </div>
          <div className="flex items-center mt-2">
            <Phone className="w-4 h-4 mr-1" />
            <span className="text-sm text-gray-900">{evenement.contact}</span>
          </div>
        </div>
      </div>

      {evenement.notes && (
        <div>
          <p className="text-xs text-gray-500">Notes</p>
          <p className="text-sm text-gray-900 mt-1">{evenement.notes}</p>
        </div>
      )}

      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center">
          <Clock className="w-3 h-3 mr-1" />
          <span>Mis à jour le {new Date(evenement.updatedAt).toLocaleDateString('fr-FR')}</span>
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
    {
      field: 'statut',
      value: selectedStatut,
      operator: 'equals',
    },
  ];

  const handleSubmit = (data: Record<string, unknown>) => {
    // Validation des types
    const validatedData: EvenementFormData = {
      name: String(data.name),
      description: String(data.description),
      type: data.type as 'mariage' | 'bapteme' | 'communion' | 'anniversaire' | 'autre',
      dateDebut: String(data.dateDebut),
      dateFin: String(data.dateFin),
      lieu: String(data.lieu),
      organisateur: String(data.organisateur),
      contact: String(data.contact),
      budget: Number(data.budget),
      statut: data.statut as 'planifie' | 'en_cours' | 'termine' | 'annule',
      imageUrl: String(data.imageUrl),
      notes: data.notes ? String(data.notes) : undefined,
    };

    // TODO: Implémenter l'ajout de l'événement dans la base de données
    console.log('Nouvel événement à ajouter:', validatedData);
    // Pour l'instant, on ajoute juste à la liste locale
    const evenement: Evenement = {
      id: String(evenements.length + 1),
      ...validatedData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    evenements.push(evenement);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des événements</h1>
          <p className="text-sm text-gray-600">Gérez les événements de la plateforme</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-[#00853F] rounded-lg hover:bg-[#006B32] flex items-center justify-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Ajouter un événement</span>
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
              placeholder="Rechercher un événement..."
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
            <option value="mariage">Mariage</option>
            <option value="bapteme">Baptême</option>
            <option value="communion">Communion</option>
            <option value="anniversaire">Anniversaire</option>
            <option value="autre">Autre</option>
          </select>
          <select
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#00853F] focus:border-transparent"
            value={selectedStatut}
            onChange={(e) => setSelectedStatut(e.target.value)}
          >
            <option value="all">Tous les statuts</option>
            <option value="planifie">Planifié</option>
            <option value="en_cours">En cours</option>
            <option value="termine">Terminé</option>
            <option value="annule">Annulé</option>
          </select>
          <button className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Plus de filtres</span>
          </button>
        </div>
      </div>

      {/* Table des événements */}
      <DataTable
        columns={columns}
        data={evenements}
        itemsPerPage={10}
        searchable={false}
        mobileView={mobileView}
        onRowClick={() => {}}
        searchFields={['name', 'description', 'lieu', 'organisateur']}
        initialFilters={initialFilters}
      />

      {/* Modal de formulaire */}
      <AddFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        type="evenement"
      />
    </div>
  );
};

export default Evenements; 