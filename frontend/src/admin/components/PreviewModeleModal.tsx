import { X } from 'lucide-react';

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

interface PreviewModeleModalProps {
  isOpen: boolean;
  onClose: () => void;
  modele: Modele | null;
}

export const PreviewModeleModal = ({ isOpen, onClose, modele }: PreviewModeleModalProps) => {
  if (!isOpen || !modele) return null;

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Prévisualisation du modèle</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Image du modèle */}
            <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
              {modele.imageUrl ? (
                <img
                  src={modele.imageUrl}
                  alt={modele.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  Aucune image disponible
                </div>
              )}
            </div>

            {/* Informations du modèle */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{modele.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{modele.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Catégorie</p>
                  <span className={`mt-1 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(modele.category)}`}>
                    {modele.category.charAt(0).toUpperCase() + modele.category.slice(1)}
                  </span>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">Statut</p>
                  <span className={`mt-1 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(modele.status)}`}>
                    {modele.status.replace('_', ' ').charAt(0).toUpperCase() + modele.status.slice(1)}
                  </span>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">Prix</p>
                  <p className="mt-1 text-sm text-gray-900">{modele.price.toLocaleString('fr-FR')} FCFA</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">Dernière mise à jour</p>
                  <p className="mt-1 text-sm text-gray-900">
                    {new Date(modele.updatedAt).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500 mb-2">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {modele.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00853F]"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 