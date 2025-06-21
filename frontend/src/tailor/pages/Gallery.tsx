import { useState, useEffect } from 'react';
import {
  Plus,
  Search,
  ChevronDown,
  Edit,
  Trash2,
  Tag,
  Calendar,
  Loader2,
} from 'lucide-react';
import { getModeles, Modele } from '../../services/modeleService';

const Gallery = () => {
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatut, setSelectedStatut] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [modeles, setModeles] = useState<Modele[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 12,
    total: 0,
    from: 0,
    to: 0,
  });

  const types = [
    { id: 'all', name: 'Tous les types' },
    { id: 'homme', name: 'Homme' },
    { id: 'femme', name: 'Femme' },
    { id: 'enfant', name: 'Enfant' },
    { id: 'mixte', name: 'Mixte' },
  ];

  const statuts = [
    { id: 'all', name: 'Tous les statuts' },
    { id: 'actif', name: 'Actif' },
    { id: 'inactif', name: 'Inactif' },
    { id: 'en_revision', name: 'En révision' },
  ];

  // Charger les modèles
  const loadModeles = async (page = 1) => {
    setLoading(true);
    setError(null);
    
    try {
      const params: {
        page: number;
        per_page: number;
        search?: string;
        type?: string;
        statut?: string;
      } = {
        page,
        per_page: pagination.per_page,
      };

      if (searchQuery) {
        params.search = searchQuery;
      }

      if (selectedType !== 'all') {
        params.type = selectedType;
      }

      if (selectedStatut !== 'all') {
        params.statut = selectedStatut;
      }

      const response = await getModeles(params);
      setModeles(response.data);
      setPagination(response.pagination);
    } catch (error) {
      console.error('Erreur lors du chargement des modèles:', error);
      setError('Erreur lors du chargement des modèles');
    } finally {
      setLoading(false);
    }
  };

  // Charger les modèles au montage et lors des changements de filtres
  useEffect(() => {
    loadModeles(1);
  }, [selectedType, selectedStatut]);

  // Recherche avec délai
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadModeles(1);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Gestion de la pagination
  const handlePageChange = (page: number) => {
    loadModeles(page);
  };

  // Gestion de la suppression (à implémenter)
  const handleDelete = (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce modèle ?')) {
      console.log('Suppression du modèle:', id);
      // TODO: Implémenter la suppression
    }
  };

  // Gestion de l'édition (à implémenter)
  const handleEdit = (id: number) => {
    console.log('Édition du modèle:', id);
    // TODO: Implémenter l'édition
  };

  // Formater la date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  // Obtenir la première photo du modèle
  const getFirstPhoto = (modele: Modele) => {
    if (modele.photos && modele.photos.length > 0) {
      // Le chemin retourné par l'API est déjà relatif, on ajoute juste le domaine
      return `http://localhost:8000/${modele.photos[0]}`;
    }
    return '/placeholder-image.jpg'; // Image par défaut
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-[#00853F]" />
          <span className="ml-2 text-gray-600">Chargement des modèles...</span>
        </div>
      </div>
    );
  }

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
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853F] focus:border-[#00853F]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="relative">
            <select
              className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853F] focus:border-[#00853F]"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              {types.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
          <div className="relative">
            <select
              className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853F] focus:border-[#00853F]"
              value={selectedStatut}
              onChange={(e) => setSelectedStatut(e.target.value)}
            >
              {statuts.map((statut) => (
                <option key={statut.id} value={statut.id}>
                  {statut.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
          <button 
            onClick={() => loadModeles(1)}
            className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
          >
            Réessayer
          </button>
        </div>
      )}

      {/* Models Grid */}
      {!loading && !error && (
        <>
          {modeles.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun modèle trouvé</h3>
              <p className="text-gray-600">
                {searchQuery || selectedType !== 'all' || selectedStatut !== 'all'
                  ? 'Aucun modèle ne correspond à vos critères de recherche.'
                  : 'Vous n\'avez pas encore créé de modèles.'
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {modeles.map((modele) => (
                <div
                  key={modele.id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden group"
                >
                  <div className="relative aspect-[3/4] bg-gray-100">
                    <img
                      src={getFirstPhoto(modele)}
                      alt={modele.nom}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.log('Erreur de chargement image:', e.currentTarget.src);
                        e.currentTarget.src = '/placeholder-image.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-200">
                      <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-200">
                        <div className="flex justify-end space-x-2">
                          <button 
                            onClick={() => handleEdit(modele.id)}
                            className="p-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => handleDelete(modele.id)}
                            className="p-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* Badge de statut */}
                    <div className="absolute top-2 left-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        modele.statut === 'actif' ? 'bg-green-100 text-green-800' :
                        modele.statut === 'inactif' ? 'bg-gray-100 text-gray-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {modele.statut === 'actif' ? 'Actif' :
                         modele.statut === 'inactif' ? 'Inactif' : 'En révision'}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900">{modele.nom}</h3>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{modele.description}</p>
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center text-sm text-gray-500">
                        <Tag className="w-4 h-4 mr-2" />
                        <span className="capitalize">{modele.type}</span>
                        {modele.prix && (
                          <span className="ml-2 font-medium text-[#00853F]">
                            {Number(modele.prix).toLocaleString()} FCFA
                          </span>
                        )}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-2" />
                        {formatDate(modele.created_at)}
                      </div>
                      {modele.tags && modele.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {modele.tags.slice(0, 3).map((tag, index) => (
                            <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                              {tag}
                            </span>
                          ))}
                          {modele.tags.length > 3 && (
                            <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                              +{modele.tags.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Pagination */}
      {!loading && !error && modeles.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Affichage de {pagination.from} à {pagination.to} sur {pagination.total} modèle{pagination.total > 1 ? 's' : ''}
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => handlePageChange(pagination.current_page - 1)}
              disabled={pagination.current_page === 1}
              className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Précédent
            </button>
            
            {Array.from({ length: Math.min(5, pagination.last_page) }, (_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 text-sm font-medium rounded-md ${
                    page === pagination.current_page
                      ? 'text-white bg-[#00853F]'
                      : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              );
            })}
            
            <button 
              onClick={() => handlePageChange(pagination.current_page + 1)}
              disabled={pagination.current_page === pagination.last_page}
              className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Suivant
            </button>
          </div>
        </div>
      )}

      {/* Add Model Button (Mobile) */}
      <div className="fixed bottom-6 right-6 sm:hidden">
        <button className="p-4 text-white bg-[#00853F] rounded-full shadow-lg hover:bg-[#123d26]">
          <Plus className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Gallery; 