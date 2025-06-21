import { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  MoreVertical,
  Plus,
  Download,
  Edit,
  User,
  Calendar,
  Star,
  CheckCircle,
  XCircle,
  Hash,
  Copy,
  Check,
} from 'lucide-react';
import { DataTable } from '../components/DataTable';
import { AddFormModal } from '../components/AddFormModal';
import { registerTailleur, getTailleurs, TailleurData, Tailleur } from '../../services/tailleurService';
import axios from 'axios';

// Nouveau composant pour le modal de succès
const SuccessModal = ({ title, message, password, onClose }: { title: string, message: string, password?: string, onClose: () => void }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Réinitialiser après 2s
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full text-center shadow-xl">
        <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        {password && (
          <div className="mb-6">
            <p className="text-sm text-gray-500">Mot de passe temporaire :</p>
            <div className="mt-2 flex items-center justify-center bg-gray-100 p-3 rounded-lg">
              <span className="font-mono text-lg text-gray-800 mr-4">{password}</span>
              <button onClick={handleCopy} className="text-gray-500 hover:text-[#00853F]">
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
          </div>
        )}
        <button
          onClick={onClose}
          className="w-full px-4 py-2 text-sm font-medium text-white bg-[#00853F] rounded-lg hover:bg-[#006B32]"
        >
          Terminé
        </button>
      </div>
    </div>
  );
};

const Tailleurs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialite, setSelectedSpecialite] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successInfo, setSuccessInfo] = useState<{ title: string; message: string; password?: string } | null>(null);
  const [tailleurs, setTailleurs] = useState<Tailleur[]>([]);
  const [loading, setLoading] = useState(true);

  // Charger les tailleurs au montage du composant
  useEffect(() => {
    loadTailleurs();
  }, []);

  // Charger les tailleurs avec filtres
  const loadTailleurs = async (page = 1) => {
    setLoading(true);
    try {
      const params: {
        page: number;
        per_page: number;
        search?: string;
        specialite?: string;
      } = {
        page,
        per_page: 15,
      };

      if (searchQuery) {
        params.search = searchQuery;
      }

      if (selectedSpecialite !== 'all') {
        params.specialite = selectedSpecialite;
      }

      const response = await getTailleurs(params);
      setTailleurs(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des tailleurs:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filtrage par spécialité
  const handleSpecialiteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSpecialite(e.target.value);
    loadTailleurs(1);
  };

  // Recherche avec délai
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    // Recherche automatique après 500ms d'inactivité
    setTimeout(() => {
      loadTailleurs(1);
    }, 500);
  };

  const getSpecialiteColor = (specialite: string) => {
    switch (specialite) {
      case 'homme':
        return 'bg-blue-100 text-blue-800';
      case 'femme':
        return 'bg-pink-100 text-pink-800';
      case 'enfant':
        return 'bg-green-100 text-green-800';
      case 'tous':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Fonction pour formater les valeurs null
  const formatValue = (value: string | number | null | undefined, defaultValue = 'Non renseigné'): string => {
    if (value === null || value === undefined) return defaultValue;
    return String(value);
  };

  // Fonction pour formater la date
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Non renseigné';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const columns = [
    {
      header: 'Tailleur',
      accessor: (tailleur: Tailleur) => (
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            {tailleur.photo ? (
              <img src={tailleur.photo} alt={`${formatValue(tailleur.prenom)} ${formatValue(tailleur.name)}`} className="h-full w-full object-cover" />
            ) : (
              <User className="w-6 h-6 text-gray-400" />
            )}
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {formatValue(tailleur.prenom)} {formatValue(tailleur.name)}
            </div>
            <div className="text-sm text-gray-500">{formatValue(tailleur.email)}</div>
            <div className="text-xs text-gray-400 flex items-center mt-1">
              {tailleur.email_verified_at ? (
                <CheckCircle className="w-3 h-3 text-green-500 mr-1" />
              ) : (
                <XCircle className="w-3 h-3 text-red-500 mr-1" />
              )}
              {tailleur.email_verified_at ? 'Email vérifié' : 'Email non vérifié'}
            </div>
          </div>
        </div>
      ),
      sortable: true,
    },
    {
      header: 'Spécialité',
      accessor: (tailleur: Tailleur) => (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getSpecialiteColor(formatValue(tailleur.specialite, 'Non renseigné'))}`}>
          {formatValue(tailleur.specialite, 'Non renseigné').charAt(0).toUpperCase() + formatValue(tailleur.specialite, 'Non renseigné').slice(1)}
        </span>
      ),
      sortable: true,
    },
    {
      header: 'Expérience',
      accessor: (tailleur: Tailleur) => (
        <div className="flex items-center text-sm text-gray-900">
          <Star className="w-4 h-4 text-yellow-400 mr-1" />
          {tailleur.experience ? `${tailleur.experience} ans` : 'Non renseigné'}
        </div>
      ),
      sortable: true,
    },
    {
      header: 'Téléphone',
      accessor: (tailleur: Tailleur) => (
        <div className="text-sm text-gray-900">{formatValue(tailleur.telephone)}</div>
      ),
      sortable: true,
    },
    {
      header: 'Atelier',
      accessor: (tailleur: Tailleur) => (
        <div className="text-sm text-gray-500">{formatValue(tailleur.nom_atelier)}</div>
      ),
      sortable: true,
    },
    {
      header: 'Adresse',
      accessor: (tailleur: Tailleur) => (
        <div className="text-sm text-gray-500 max-w-xs truncate" title={formatValue(tailleur.adresse)}>
          {formatValue(tailleur.adresse)}
        </div>
      ),
      sortable: true,
    },
    {
      header: 'Slug',
      accessor: (tailleur: Tailleur) => (
        <div className="flex items-center text-sm text-gray-500">
          <Hash className="w-4 h-4 mr-1" />
          <span className="font-mono text-xs">{formatValue(tailleur.slug, 'Non généré')}</span>
        </div>
      ),
      sortable: true,
    },
    {
      header: 'Date création',
      accessor: (tailleur: Tailleur) => (
        <div className="text-sm text-gray-500">
          {formatDate(tailleur.created_at)}
        </div>
      ),
      sortable: true,
    },
    {
      header: 'Actions',
      accessor: (tailleur: Tailleur) => (
        <div className="flex items-center justify-end space-x-2">
          <button 
            className="text-gray-400 hover:text-gray-500"
            onClick={(e) => {
              e.stopPropagation();
              console.log('Edit tailleur:', tailleur);
            }}
          >
            <Edit className="w-5 h-5" />
          </button>
          <button 
            className="text-gray-400 hover:text-gray-500"
            onClick={(e) => {
              e.stopPropagation();
              console.log('More options for tailleur:', tailleur);
            }}
          >
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      ),
    },
  ];

  const mobileView = (tailleur: Tailleur) => (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            {tailleur.photo ? (
              <img src={tailleur.photo} alt={`${formatValue(tailleur.prenom)} ${formatValue(tailleur.name)}`} className="h-full w-full object-cover" />
            ) : (
              <User className="w-6 h-6 text-gray-400" />
            )}
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900">
              {formatValue(tailleur.prenom)} {formatValue(tailleur.name)}
            </h3>
            <p className="text-xs text-gray-500">{formatValue(tailleur.email)}</p>
            <div className="text-xs text-gray-400 flex items-center mt-1">
              {tailleur.email_verified_at ? (
                <CheckCircle className="w-3 h-3 text-green-500 mr-1" />
              ) : (
                <XCircle className="w-3 h-3 text-red-500 mr-1" />
              )}
              {tailleur.email_verified_at ? 'Email vérifié' : 'Email non vérifié'}
            </div>
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
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getSpecialiteColor(formatValue(tailleur.specialite, 'Non renseigné'))}`}>
              {formatValue(tailleur.specialite, 'Non renseigné').charAt(0).toUpperCase() + formatValue(tailleur.specialite, 'Non renseigné').slice(1)}
            </span>
          </div>
          <div className="flex items-center mt-2">
            <Star className="w-4 h-4 text-yellow-400 mr-1" />
            <span className="text-sm text-gray-900">
              {tailleur.experience ? `${tailleur.experience} ans d'expérience` : 'Expérience non renseignée'}
            </span>
          </div>
          <p className="text-sm text-gray-900 mt-2">{formatValue(tailleur.telephone)}</p>
          <p className="text-sm text-gray-900 mt-1">{formatValue(tailleur.nom_atelier)}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Adresse</p>
          <p className="text-sm text-gray-900 mt-1">{formatValue(tailleur.adresse)}</p>
          <p className="text-xs text-gray-500 mt-2">Slug</p>
          <p className="text-xs text-gray-900 font-mono">{formatValue(tailleur.slug, 'Non généré')}</p>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-1" />
          <span>Créé le {formatDate(tailleur.created_at)}</span>
        </div>
      </div>
    </div>
  );

  const handleSubmit = async (data: Record<string, unknown>) => {
    // Étape 1: Reconstruire l'objet TailleurData attendu par l'API
    const tailleurData: TailleurData = {
      name: String(data.nom),
      email: String(data.email),
      role: 'Tailleur', // Rôle défini pour cette action
      profile_name: String(data.nom_atelier),
      prenom: String(data.prenom),
      telephone: String(data.telephone),
      specialite: data.specialite as 'homme' | 'femme' | 'enfant' | 'tous',
      experience: Number(data.experience),
      adresse: String(data.adresse),
      nom_atelier: String(data.nom_atelier),
      photo: data.photo ? String(data.photo) : undefined,
    };

    try {
      // Étape 2: Appeler l'API et utiliser le type de réponse
      const response = await registerTailleur(tailleurData);
      
      setIsModalOpen(false);
      
      setSuccessInfo({
        title: "Compte créé avec succès !",
        message: response.message,
        password: response.temporary_password,
      });

      await loadTailleurs(1);
      
    } catch (error) {
      // Étape 3: Améliorer la gestion des erreurs
      console.error('Erreur lors de la création du tailleur:', error);
      let errorMessage = 'Une erreur inconnue est survenue.';
      if (axios.isAxiosError(error) && error.response) {
          errorMessage = error.response.data.message || 'Une erreur est survenue.';
          if (error.response.data.errors) {
              const errors = Object.values(error.response.data.errors).flat().join(' ');
              errorMessage += ` Détails: ${errors}`;
          }
      }
      setSuccessInfo({
        title: "Erreur de création",
        message: errorMessage,
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des tailleurs</h1>
          <p className="text-sm text-gray-600">Gérez les tailleurs de la plateforme</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-[#00853F] rounded-lg hover:bg-[#006B32] flex items-center justify-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Ajouter un tailleur</span>
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
              placeholder="Rechercher un tailleur..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853F] focus:border-transparent"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <select
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#00853F] focus:border-transparent"
            value={selectedSpecialite}
            onChange={handleSpecialiteChange}
          >
            <option value="all">Toutes les spécialités</option>
            <option value="homme">Homme</option>
            <option value="femme">Femme</option>
            <option value="enfant">Enfant</option>
            <option value="tous">Tous</option>
          </select>
          <button className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Plus de filtres</span>
          </button>
        </div>
      </div>

      {/* Indicateur de chargement */}
      {loading && (
        <div className="bg-white p-8 rounded-lg shadow-sm text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00853F] mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600">Chargement des tailleurs...</p>
        </div>
      )}

      {/* Table des tailleurs */}
      {!loading && (
        <>
          {tailleurs.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun tailleur trouvé</h3>
              <p className="text-sm text-gray-600 mb-4">
                {searchQuery || selectedSpecialite !== 'all' 
                  ? 'Aucun tailleur ne correspond à vos critères de recherche.'
                  : 'Aucun tailleur n\'a encore été ajouté à la plateforme.'
                }
              </p>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 text-sm font-medium text-white bg-[#00853F] rounded-lg hover:bg-[#006B32] flex items-center justify-center space-x-2 mx-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Ajouter le premier tailleur</span>
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">
                    {tailleurs.length} tailleur{tailleurs.length > 1 ? 's' : ''} trouvé{tailleurs.length > 1 ? 's' : ''}
                  </h3>
                  <div className="text-sm text-gray-500">
                    {searchQuery && `Résultats pour "${searchQuery}"`}
                  </div>
                </div>
              </div>
              <DataTable
                columns={columns}
                data={tailleurs}
                itemsPerPage={10}
                searchable={false}
                mobileView={mobileView}
                onRowClick={() => {}}
                searchFields={[]}
              />
            </div>
          )}
        </>
      )}

      {/* Modal de formulaire */}
      <AddFormModal
        isOpen={isModalOpen && !successInfo}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        type="tailleur"
      />

      {/* Modal de succès */}
      {successInfo && (
        <SuccessModal
          title={successInfo.title}
          message={successInfo.message}
          password={successInfo.password}
          onClose={() => setSuccessInfo(null)}
        />
      )}
    </div>
  );
};

export default Tailleurs; 