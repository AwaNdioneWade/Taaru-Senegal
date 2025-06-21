import { useState } from 'react';
import {
  Search,
  Filter,
  MoreVertical,
  AlertTriangle,
  CheckCircle,
  XCircle,
  User,
  MessageSquare,
  Image,
  Calendar,
  BookOpen,
  Flag,
  Clock,
} from 'lucide-react';
import { DataTable } from '../components/DataTable';
import { FilterConfig } from '../components/tableUtils';
import { AddFormModal } from '../components/AddFormModal';

interface ModerationItem {
  id: string;
  type: 'modele' | 'commentaire' | 'utilisateur' | 'evenement' | 'formation';
  status: 'en_attente' | 'approuve' | 'rejete' | 'supprime' | 'averti' | 'suspendu';
  content: {
    id: string;
    title?: string;
    text?: string;
    author?: string;
    imageUrl?: string;
    date?: string;
  };
  reportCount: number;
  reportedBy: string[];
  createdAt: string;
  updatedAt: string;
}

type ModerationFormData = {
  type: 'modele' | 'commentaire' | 'utilisateur' | 'evenement' | 'formation';
  action: 'approuver' | 'rejeter' | 'supprimer' | 'avertir' | 'suspendre';
  raison: 'contenu_inapproprie' | 'spam' | 'harcelement' | 'violation_droits' | 'autre';
  details: string;
  duree_suspension?: number;
  notifier_utilisateur: boolean;
};

const Moderation = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ModerationItem | null>(null);

  // Données de démonstration
  const moderationItems: ModerationItem[] = [
    {
      id: '1',
      type: 'commentaire',
      status: 'en_attente',
      content: {
        id: 'c1',
        text: 'Ce contenu est inapproprié et devrait être supprimé.',
        author: 'Amadou Diop',
        date: '2024-03-20',
      },
      reportCount: 5,
      reportedBy: ['user1', 'user2', 'user3', 'user4', 'user5'],
      createdAt: '2024-03-20',
      updatedAt: '2024-03-20',
    },
    {
      id: '2',
      type: 'modele',
      status: 'en_attente',
      content: {
        id: 'm1',
        title: 'Robe traditionnelle',
        author: 'Fatou Sow',
        imageUrl: '/images/modeles/robe.jpg',
        date: '2024-03-19',
      },
      reportCount: 3,
      reportedBy: ['user6', 'user7', 'user8'],
      createdAt: '2024-03-19',
      updatedAt: '2024-03-20',
    },
    {
      id: '3',
      type: 'utilisateur',
      status: 'en_attente',
      content: {
        id: 'u1',
        title: 'Moussa Diallo',
        author: 'Moussa Diallo',
        imageUrl: '/images/utilisateurs/moussa.jpg',
      },
      reportCount: 7,
      reportedBy: ['user9', 'user10', 'user11', 'user12', 'user13', 'user14', 'user15'],
      createdAt: '2024-03-18',
      updatedAt: '2024-03-20',
    },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'modele':
        return <Image className="w-5 h-5" />;
      case 'commentaire':
        return <MessageSquare className="w-5 h-5" />;
      case 'utilisateur':
        return <User className="w-5 h-5" />;
      case 'evenement':
        return <Calendar className="w-5 h-5" />;
      case 'formation':
        return <BookOpen className="w-5 h-5" />;
      default:
        return <AlertTriangle className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'en_attente':
        return 'bg-yellow-100 text-yellow-800';
      case 'approuve':
        return 'bg-green-100 text-green-800';
      case 'rejete':
        return 'bg-red-100 text-red-800';
      case 'supprime':
        return 'bg-gray-100 text-gray-800';
      case 'averti':
        return 'bg-orange-100 text-orange-800';
      case 'suspendu':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'en_attente':
        return <AlertTriangle className="w-4 h-4" />;
      case 'approuve':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejete':
      case 'supprime':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Flag className="w-4 h-4" />;
    }
  };

  const columns = [
    {
      header: 'Contenu',
      accessor: (item: ModerationItem) => (
        <div className="flex items-center">
          {item.content.imageUrl && (
            <div className="h-16 w-16 rounded-lg bg-gray-200 flex items-center justify-center overflow-hidden">
              <img src={item.content.imageUrl} alt={item.content.title} className="h-full w-full object-cover" />
            </div>
          )}
          <div className="ml-4">
            <div className="flex items-center space-x-2">
              {getTypeIcon(item.type)}
              <div className="text-sm font-medium text-gray-900">
                {item.content.title || item.content.text?.substring(0, 50) + '...'}
              </div>
            </div>
            <div className="text-sm text-gray-500">
              Par {item.content.author} • {item.content.date && new Date(item.content.date).toLocaleDateString('fr-FR')}
            </div>
          </div>
        </div>
      ),
      sortable: true,
    },
    {
      header: 'Type',
      accessor: (item: ModerationItem) => (
        <div className="flex items-center space-x-2">
          {getTypeIcon(item.type)}
          <span className="text-sm text-gray-900">
            {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
          </span>
        </div>
      ),
      sortable: true,
    },
    {
      header: 'Signalements',
      accessor: (item: ModerationItem) => (
        <div className="flex items-center space-x-2">
          <Flag className="w-4 h-4 text-red-500" />
          <span className="text-sm text-gray-900">{item.reportCount}</span>
        </div>
      ),
      sortable: true,
    },
    {
      header: 'Statut',
      accessor: (item: ModerationItem) => (
        <div className="flex items-center space-x-2">
          {getStatusIcon(item.status)}
          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(item.status)}`}>
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </span>
        </div>
      ),
      sortable: true,
    },
    {
      header: 'Actions',
      accessor: (item: ModerationItem) => (
        <div className="flex items-center justify-end space-x-2">
          <button 
            className="text-gray-400 hover:text-gray-500"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedItem(item);
              setIsModalOpen(true);
            }}
          >
            <AlertTriangle className="w-5 h-5" />
          </button>
          <button 
            className="text-gray-400 hover:text-gray-500"
            onClick={(e) => {
              e.stopPropagation();
              console.log('More options for item:', item);
            }}
          >
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      ),
    },
  ];

  const mobileView = (item: ModerationItem) => (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          {item.content.imageUrl && (
            <div className="h-16 w-16 rounded-lg bg-gray-200 flex items-center justify-center overflow-hidden">
              <img src={item.content.imageUrl} alt={item.content.title} className="h-full w-full object-cover" />
            </div>
          )}
          <div>
            <div className="flex items-center space-x-2">
              {getTypeIcon(item.type)}
              <h3 className="text-sm font-medium text-gray-900">
                {item.content.title || item.content.text?.substring(0, 50) + '...'}
              </h3>
            </div>
            <p className="text-xs text-gray-500">
              Par {item.content.author} • {item.content.date && new Date(item.content.date).toLocaleDateString('fr-FR')}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            className="text-gray-400 hover:text-gray-500"
            onClick={() => {
              setSelectedItem(item);
              setIsModalOpen(true);
            }}
          >
            <AlertTriangle className="w-5 h-5" />
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
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(item.status)}`}>
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </span>
          </div>
          <div className="flex items-center mt-2">
            <Flag className="w-4 h-4 mr-1 text-red-500" />
            <span className="text-sm text-gray-900">{item.reportCount} signalements</span>
          </div>
        </div>
        <div>
          <p className="text-xs text-gray-500">Détails</p>
          <div className="flex items-center mt-1">
            <Clock className="w-4 h-4 mr-1" />
            <span className="text-sm text-gray-900">
              Signalé le {new Date(item.createdAt).toLocaleDateString('fr-FR')}
            </span>
          </div>
          <div className="flex items-center mt-2">
            <span className="text-sm text-gray-900">
              Dernière mise à jour le {new Date(item.updatedAt).toLocaleDateString('fr-FR')}
            </span>
          </div>
        </div>
      </div>

      {item.content.text && (
        <div>
          <p className="text-xs text-gray-500">Contenu signalé</p>
          <p className="text-sm text-gray-900 mt-1">{item.content.text}</p>
        </div>
      )}

      <div>
        <p className="text-xs text-gray-500">Signalé par</p>
        <div className="flex flex-wrap gap-2 mt-1">
          {item.reportedBy.map((userId, index) => (
            <span key={userId} className="text-sm text-gray-900">
              Utilisateur {index + 1}
              {index < item.reportedBy.length - 1 ? ', ' : ''}
            </span>
          ))}
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
      field: 'status',
      value: selectedStatus,
      operator: 'equals',
    },
  ];

  const handleSubmit = (data: Record<string, unknown>) => {
    // Validation des types
    const validatedData: ModerationFormData = {
      type: data.type as 'modele' | 'commentaire' | 'utilisateur' | 'evenement' | 'formation',
      action: data.action as 'approuver' | 'rejeter' | 'supprimer' | 'avertir' | 'suspendre',
      raison: data.raison as 'contenu_inapproprie' | 'spam' | 'harcelement' | 'violation_droits' | 'autre',
      details: String(data.details),
      duree_suspension: data.duree_suspension ? Number(data.duree_suspension) : undefined,
      notifier_utilisateur: Boolean(data.notifier_utilisateur),
    };

    // TODO: Implémenter l'action de modération dans la base de données
    console.log('Action de modération à appliquer:', validatedData);
    console.log('Sur l\'élément:', selectedItem);

    // Pour l'instant, on met juste à jour le statut localement
    if (selectedItem) {
      const index = moderationItems.findIndex(item => item.id === selectedItem.id);
      if (index !== -1) {
        moderationItems[index].status = validatedData.action as any;
        moderationItems[index].updatedAt = new Date().toISOString();
      }
    }

    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Modération</h1>
          <p className="text-sm text-gray-600">Gérez le contenu signalé de la plateforme</p>
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher un contenu..."
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
            <option value="modele">Modèles</option>
            <option value="commentaire">Commentaires</option>
            <option value="utilisateur">Utilisateurs</option>
            <option value="evenement">Événements</option>
            <option value="formation">Formations</option>
          </select>
          <select
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#00853F] focus:border-transparent"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="all">Tous les statuts</option>
            <option value="en_attente">En attente</option>
            <option value="approuve">Approuvé</option>
            <option value="rejete">Rejeté</option>
            <option value="supprime">Supprimé</option>
            <option value="averti">Averti</option>
            <option value="suspendu">Suspendu</option>
          </select>
          <button className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Plus de filtres</span>
          </button>
        </div>
      </div>

      {/* Table des éléments à modérer */}
      <DataTable
        columns={columns}
        data={moderationItems}
        itemsPerPage={10}
        searchable={false}
        mobileView={mobileView}
        onRowClick={() => {}}
        searchFields={['content.title', 'content.text', 'content.author']}
        initialFilters={initialFilters}
      />

      {/* Modal de modération */}
      <AddFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedItem(null);
        }}
        onSubmit={handleSubmit}
        type="moderation"
      />
    </div>
  );
};

export default Moderation; 