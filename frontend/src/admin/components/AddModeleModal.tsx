import { useState } from 'react';
import { X, Upload, Tag } from 'lucide-react';

interface AddModeleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (modele: {
    name: string;
    description: string;
    category: 'homme' | 'femme' | 'enfant' | 'accessoire';
    price: number;
    status: 'disponible' | 'indisponible' | 'en_revision';
    tags: string[];
    imageUrl: string;
  }) => void;
}

export const AddModeleModal = ({ isOpen, onClose, onSubmit }: AddModeleModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'homme' as const,
    price: 0,
    status: 'disponible' as const,
    tags: [] as string[],
    imageUrl: '',
  });

  const [tagInput, setTagInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Ajouter un nouveau modèle</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nom et Description */}
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nom du modèle
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#00853F] focus:ring-[#00853F]"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  required
                  rows={3}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#00853F] focus:ring-[#00853F]"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
            </div>

            {/* Catégorie et Prix */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Catégorie
                </label>
                <select
                  id="category"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#00853F] focus:ring-[#00853F]"
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as const }))}
                >
                  <option value="homme">Homme</option>
                  <option value="femme">Femme</option>
                  <option value="enfant">Enfant</option>
                  <option value="accessoire">Accessoire</option>
                </select>
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Prix (FCFA)
                </label>
                <input
                  type="number"
                  id="price"
                  required
                  min="0"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#00853F] focus:ring-[#00853F]"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
                />
              </div>
            </div>

            {/* Statut et Image */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                  Statut
                </label>
                <select
                  id="status"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#00853F] focus:ring-[#00853F]"
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as const }))}
                >
                  <option value="disponible">Disponible</option>
                  <option value="indisponible">Indisponible</option>
                  <option value="en_revision">En révision</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Image du modèle
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-[#00853F] hover:text-[#006B32] focus-within:outline-none"
                      >
                        <span>Télécharger une image</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              // TODO: Implémenter le téléchargement de l'image
                              setFormData(prev => ({ ...prev, imageUrl: URL.createObjectURL(file) }));
                            }
                          }}
                        />
                      </label>
                      <p className="pl-1">ou glisser-déposer</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF jusqu'à 10MB</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tags
              </label>
              <div className="mt-1 flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#00853F] text-white"
                  >
                    {tag}
                    <button
                      type="button"
                      className="ml-1 inline-flex items-center"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="mt-2 flex">
                <input
                  type="text"
                  className="block w-full rounded-l-md border border-gray-300 px-3 py-2 focus:border-[#00853F] focus:ring-[#00853F]"
                  placeholder="Ajouter un tag"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                />
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-[#00853F] hover:bg-[#006B32] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00853F]"
                  onClick={handleAddTag}
                >
                  <Tag className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00853F]"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-[#00853F] border border-transparent rounded-md hover:bg-[#006B32] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00853F]"
              >
                Ajouter le modèle
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}; 