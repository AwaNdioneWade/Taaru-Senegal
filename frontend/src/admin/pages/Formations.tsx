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
  Clock,
  BookOpen,
  Users,
  DollarSign,
} from 'lucide-react';
import { DataTable } from '../components/DataTable';
import { FilterConfig } from '../components/tableUtils';
import { AddFormModal } from '../components/AddFormModal';

interface Formation {
  id: string;
  name: string;
  description: string;
  type: 'couture' | 'broderie' | 'design' | 'business' | 'autre';
  niveau: 'debutant' | 'intermediaire' | 'avance';
  dateDebut: string;
  dateFin: string;
  duree: number;
  formateur: string;
  prix: number;
  capacite: number;
  lieu: string;
  statut: 'planifie' | 'en_cours' | 'termine' | 'annule';
  imageUrl: string;
  prerequis?: string;
  programme: string;
  createdAt: string;
  updatedAt: string;
}

type FormationFormData = {
  name: string;
  description: string;
  type: 'couture' | 'broderie' | 'design' | 'business' | 'autre';
  niveau: 'debutant' | 'intermediaire' | 'avance';
  dateDebut: string;
  dateFin: string;
  duree: number;
  formateur: string;
  prix: number;
  capacite: number;
  lieu: string;
  statut: 'planifie' | 'en_cours' | 'termine' | 'annule';
  imageUrl: string;
  prerequis?: string;
  programme: string;
};

const Formations = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedNiveau, setSelectedNiveau] = useState<string>('all');
  const [selectedStatut, setSelectedStatut] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Données de démonstration
  const formations: Formation[] = [
    {
      id: '1',
      name: 'Couture Traditionnelle',
      description: 'Apprenez les techniques de base de la couture traditionnelle africaine',
      type: 'couture',
      niveau: 'debutant',
      dateDebut: '2024-04-01',
      dateFin: '2024-06-30',
      duree: 120,
      formateur: 'Aminata Diop',
      prix: 150000,
      capacite: 15,
      lieu: 'Atelier de couture, Dakar',
      statut: 'planifie',
      imageUrl: '/images/formations/couture.jpg',
      prerequis: 'Aucun prérequis nécessaire',
      programme: 'Module 1: Introduction à la couture\nModule 2: Techniques de base\nModule 3: Projet final',
      createdAt: '2024-03-15',
      updatedAt: '2024-03-20',
    },
    {
      id: '2',
      name: 'Broderie Avancée',
      description: 'Perfectionnez vos techniques de broderie traditionnelle',
      type: 'broderie',
      niveau: 'avance',
      dateDebut: '2024-05-15',
      dateFin: '2024-07-15',
      duree: 80,
      formateur: 'Fatou Sow',
      prix: 200000,
      capacite: 10,
      lieu: 'Centre de formation, Dakar',
      statut: 'planifie',
      imageUrl: '/images/formations/broderie.jpg',
      prerequis: '2 ans d\'expérience en broderie',
      programme: 'Module 1: Techniques avancées\nModule 2: Création de motifs\nModule 3: Projet personnel',
      createdAt: '2024-03-10',
      updatedAt: '2024-03-10',
    },
    {
      id: '3',
      name: 'Business de la Mode',
      description: 'Développez votre entreprise dans le secteur de la mode',
      type: 'business',
      niveau: 'intermediaire',
      dateDebut: '2024-06-01',
      dateFin: '2024-08-31',
      duree: 100,
      formateur: 'Moussa Diallo',
      prix: 250000,
      capacite: 20,
      lieu: 'Centre d\'affaires, Dakar',
      statut: 'planifie',
      imageUrl: '/images/formations/business.jpg',
      prerequis: 'Expérience en gestion ou entrepreneuriat',
      programme: 'Module 1: Marketing de la mode\nModule 2: Gestion financière\nModule 3: Stratégie commerciale',
      createdAt: '2024-03-01',
      updatedAt: '2024-03-20',
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'couture':
        return 'bg-blue-100 text-blue-800';
      case 'broderie':
        return 'bg-purple-100 text-purple-800';
      case 'design':
        return 'bg-pink-100 text-pink-800';
      case 'business':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getNiveauColor = (niveau: string) => {
    switch (niveau) {
      case 'debutant':
        return 'bg-green-100 text-green-800';
      case 'intermediaire':
        return 'bg-yellow-100 text-yellow-800';
      case 'avance':
        return 'bg-red-100 text-red-800';
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
      header: 'Formation',
      accessor: (formation: Formation) => (
        <div className="flex items-center">
          <div className="h-16 w-16 rounded-lg bg-gray-200 flex items-center justify-center overflow-hidden">
            <img src={formation.imageUrl} alt={formation.name} className="h-full w-full object-cover" />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{formation.name}</div>
            <div className="text-sm text-gray-500">{formation.description}</div>
          </div>
        </div>
      ),
      sortable: true,
    },
    {
      header: 'Type & Niveau',
      accessor: (formation: Formation) => (
        <div className="space-y-1">
          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeColor(formation.type)}`}>
            {formation.type.charAt(0).toUpperCase() + formation.type.slice(1)}
          </span>
          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getNiveauColor(formation.niveau)}`}>
            {formation.niveau.charAt(0).toUpperCase() + formation.niveau.slice(1)}
          </span>
        </div>
      ),
      sortable: true,
    },
    {
      header: 'Dates',
      accessor: (formation: Formation) => (
        <div className="flex items-center text-sm text-gray-900">
          <Calendar className="w-4 h-4 mr-1" />
          <div>
            <div>Du {new Date(formation.dateDebut).toLocaleDateString('fr-FR')}</div>
            <div>Au {new Date(formation.dateFin).toLocaleDateString('fr-FR')}</div>
          </div>
        </div>
      ),
      sortable: true,
    },
    {
      header: 'Formateur',
      accessor: (formation: Formation) => (
        <div className="flex items-center text-sm text-gray-900">
          <User className="w-4 h-4 mr-1" />
          {formation.formateur}
        </div>
      ),
      sortable: true,
    },
    {
      header: 'Capacité',
      accessor: (formation: Formation) => (
        <div className="flex items-center text-sm text-gray-900">
          <Users className="w-4 h-4 mr-1" />
          {formation.capacite} places
        </div>
      ),
      sortable: true,
    },
    {
      header: 'Statut',
      accessor: (formation: Formation) => (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatutColor(formation.statut)}`}>
          {formation.statut.charAt(0).toUpperCase() + formation.statut.slice(1)}
        </span>
      ),
      sortable: true,
    },
    {
      header: 'Actions',
      accessor: (formation: Formation) => (
        <div className="flex items-center justify-end space-x-2">
          <button 
            className="text-gray-400 hover:text-gray-500"
            onClick={(e) => {
              e.stopPropagation();
              console.log('Edit formation:', formation);
            }}
          >
            <Edit className="w-5 h-5" />
          </button>
          <button 
            className="text-gray-400 hover:text-gray-500"
            onClick={(e) => {
              e.stopPropagation();
              console.log('More options for formation:', formation);
            }}
          >
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      ),
    },
  ];

  const mobileView = (formation: Formation) => (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="h-16 w-16 rounded-lg bg-gray-200 flex items-center justify-center overflow-hidden">
            <img src={formation.imageUrl} alt={formation.name} className="h-full w-full object-cover" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900">{formation.name}</h3>
            <p className="text-xs text-gray-500">{formation.description}</p>
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
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeColor(formation.type)}`}>
              {formation.type.charAt(0).toUpperCase() + formation.type.slice(1)}
            </span>
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getNiveauColor(formation.niveau)}`}>
              {formation.niveau.charAt(0).toUpperCase() + formation.niveau.slice(1)}
            </span>
          </div>
          <div className="flex items-center mt-2">
            <Calendar className="w-4 h-4 mr-1" />
            <span className="text-sm text-gray-900">
              Du {new Date(formation.dateDebut).toLocaleDateString('fr-FR')} au {new Date(formation.dateFin).toLocaleDateString('fr-FR')}
            </span>
          </div>
          <div className="flex items-center mt-2">
            <Clock className="w-4 h-4 mr-1" />
            <span className="text-sm text-gray-900">{formation.duree} heures</span>
          </div>
          <div className="flex items-center mt-2">
            <DollarSign className="w-4 h-4 mr-1" />
            <span className="text-sm text-gray-900">{formation.prix.toLocaleString('fr-FR')} FCFA</span>
          </div>
        </div>
        <div>
          <p className="text-xs text-gray-500">Détails</p>
          <div className="flex items-center mt-1">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm text-gray-900">{formation.lieu}</span>
          </div>
          <div className="flex items-center mt-2">
            <User className="w-4 h-4 mr-1" />
            <span className="text-sm text-gray-900">{formation.formateur}</span>
          </div>
          <div className="flex items-center mt-2">
            <Users className="w-4 h-4 mr-1" />
            <span className="text-sm text-gray-900">{formation.capacite} places</span>
          </div>
          <div className="flex items-center mt-2">
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatutColor(formation.statut)}`}>
              {formation.statut.charAt(0).toUpperCase() + formation.statut.slice(1)}
            </span>
          </div>
        </div>
      </div>

      {formation.prerequis && (
        <div>
          <p className="text-xs text-gray-500">Prérequis</p>
          <p className="text-sm text-gray-900 mt-1">{formation.prerequis}</p>
        </div>
      )}

      <div>
        <p className="text-xs text-gray-500">Programme</p>
        <p className="text-sm text-gray-900 mt-1 whitespace-pre-line">{formation.programme}</p>
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center">
          <Clock className="w-3 h-3 mr-1" />
          <span>Mis à jour le {new Date(formation.updatedAt).toLocaleDateString('fr-FR')}</span>
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
      field: 'niveau',
      value: selectedNiveau,
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
    const validatedData: FormationFormData = {
      name: String(data.name),
      description: String(data.description),
      type: data.type as 'couture' | 'broderie' | 'design' | 'business' | 'autre',
      niveau: data.niveau as 'debutant' | 'intermediaire' | 'avance',
      dateDebut: String(data.dateDebut),
      dateFin: String(data.dateFin),
      duree: Number(data.duree),
      formateur: String(data.formateur),
      prix: Number(data.prix),
      capacite: Number(data.capacite),
      lieu: String(data.lieu),
      statut: data.statut as 'planifie' | 'en_cours' | 'termine' | 'annule',
      imageUrl: String(data.imageUrl),
      prerequis: data.prerequis ? String(data.prerequis) : undefined,
      programme: String(data.programme),
    };

    // TODO: Implémenter l'ajout de la formation dans la base de données
    console.log('Nouvelle formation à ajouter:', validatedData);
    // Pour l'instant, on ajoute juste à la liste locale
    const formation: Formation = {
      id: String(formations.length + 1),
      ...validatedData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    formations.push(formation);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des formations</h1>
          <p className="text-sm text-gray-600">Gérez les formations de la plateforme</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-[#00853F] rounded-lg hover:bg-[#006B32] flex items-center justify-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Ajouter une formation</span>
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
              placeholder="Rechercher une formation..."
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
            <option value="couture">Couture</option>
            <option value="broderie">Broderie</option>
            <option value="design">Design de mode</option>
            <option value="business">Business de la mode</option>
            <option value="autre">Autre</option>
          </select>
          <select
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#00853F] focus:border-transparent"
            value={selectedNiveau}
            onChange={(e) => setSelectedNiveau(e.target.value)}
          >
            <option value="all">Tous les niveaux</option>
            <option value="debutant">Débutant</option>
            <option value="intermediaire">Intermédiaire</option>
            <option value="avance">Avancé</option>
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
        </div>
      </div>

      {/* Table des formations */}
      <DataTable
        columns={columns}
        data={formations}
        itemsPerPage={10}
        searchable={false}
        mobileView={mobileView}
        onRowClick={() => {}}
        searchFields={['name', 'description', 'formateur', 'lieu']}
        initialFilters={initialFilters}
      />

      {/* Modal de formulaire */}
      <AddFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        type="formation"
      />
    </div>
  );
};

export default Formations; 