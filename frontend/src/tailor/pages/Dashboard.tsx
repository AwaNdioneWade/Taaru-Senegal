import { useState } from 'react';
import {
  TrendingUp,
  ShoppingBag,
  Star,
  Users,
  Eye,
  Calendar,
} from 'lucide-react';
import { FormModal, FormField } from '../../admin/components/FormModal';
import { createModele } from '../../services/modeleService';
import axios from 'axios';

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [stats] = useState({
    totalModels: 45,
    pendingOrders: 12,
    completedOrders: 28,
    totalClients: 156,
    averageRating: 4.8,
  });

  const recentActivities = [
    {
      type: 'order',
      title: 'Nouvelle commande',
      description: 'Fatou Ndiaye a commandé un boubou traditionnel',
      time: 'Il y a 2 heures',
      icon: <ShoppingBag className="text-[#00853F]" />,
    },
    {
      type: 'review',
      title: 'Nouvel avis',
      description: 'Aminata a donné 5 étoiles à votre création',
      time: 'Il y a 3 heures',
      icon: <Star className="text-yellow-500" />,
    },
    {
      type: 'view',
      title: 'Nouvelle visite',
      description: 'Votre profil a été consulté 25 fois aujourd\'hui',
      time: 'Il y a 5 heures',
      icon: <Eye className="text-[#00853F]" />,
    },
  ];

  const modelFormFields: FormField[] = [
    { name: 'nom', label: 'Nom du modèle', type: 'text', required: true, placeholder: 'Ex: Robe de soirée élégante' },
    { name: 'type', label: 'Type', type: 'select', required: true, options: [
      { value: 'femme', label: 'Femme' },
      { value: 'homme', label: 'Homme' },
      { value: 'enfant', label: 'Enfant' },
      { value: 'mixte', label: 'Mixte' },
    ]},
    { name: 'statut', label: 'Statut', type: 'select', required: true, options: [
      { value: 'en_attente', label: 'En attente' },
      { value: 'approuve', label: 'Approuvé' },
      { value: 'rejete', label: 'Rejeté' },
      { value: 'actif', label: 'Actif' },
    ]},
    { name: 'prix', label: 'Prix (FCFA)', type: 'number', required: false, placeholder: 'Ex: 25000', min: 0 },
    { name: 'tags', label: 'Tags (Mots-clés)', type: 'tags', helpText: 'Ex: mariage, traditionnel, wax. Appuyez sur Entrée pour ajouter.' },
    { name: 'description', label: 'Description', type: 'textarea', required: true, placeholder: 'Décrivez votre modèle en détail : tissus utilisés, occasions, etc.', rows: 5 },
    { name: 'materiaux', label: 'Matériaux utilisés', type: 'tags', helpText: 'Ex: Tissu wax, Bazin, Perles. Appuyez sur Entrée pour ajouter.' },
    { name: 'media', label: 'Photos et Vidéos du modèle', type: 'file', required: true, accept: 'image/*,video/*', multiple: true, helpText: 'Sélectionnez une ou plusieurs images ou vidéos.' },
  ];

  const handleAddModelSubmit = async (data: Record<string, unknown>) => {
    console.log("Début de la soumission du formulaire, données reçues:", data);
    setIsSubmitting(true);
    setSubmitError(null);

    const formData = new FormData();
    Object.keys(data).forEach(key => {
      const value = data[key];
      if (key === 'media' && Array.isArray(value)) {
        // Séparer les photos et vidéos selon leur type MIME
        const photos: File[] = [];
        const videos: File[] = [];
        
        value.forEach((file) => {
          if (file instanceof File) {
            console.log(`Analyse du fichier:`, {
              name: file.name,
              size: file.size,
              type: file.type
            });
            
            // Déterminer si c'est une photo ou une vidéo
            if (file.type.startsWith('image/')) {
              photos.push(file);
              console.log(`Fichier ajouté aux photos: ${file.name}`);
            } else if (file.type.startsWith('video/')) {
              videos.push(file);
              console.log(`Fichier ajouté aux vidéos: ${file.name}`);
            } else {
              console.warn(`Type de fichier non reconnu: ${file.type} pour ${file.name}`);
            }
          }
        });
        
        // Ajouter les photos
        photos.forEach((photo, index) => {
          formData.append(`photos[${index}]`, photo);
        });
        
        // Ajouter les vidéos
        videos.forEach((video, index) => {
          formData.append(`videos[${index}]`, video);
        });
        
        console.log(`Fichiers séparés: ${photos.length} photos, ${videos.length} vidéos`);
      } else if (value !== null && value !== undefined && typeof value === 'string') {
        formData.append(key, value);
      }
    });

    // Log du FormData pour debug
    console.log("FormData créé:");
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value instanceof File ? `${value.name} (${value.size} bytes)` : value);
    }

    try {
      await createModele(formData);
      // Succès : fermer le modal et réinitialiser
      setIsModalOpen(false);
      // Optionnel: afficher une notification de succès
    } catch (error) {
      console.error('Erreur lors de la création du modèle:', error);
      if (axios.isAxiosError(error)) {
        let errorMessage = 'Une erreur est survenue.';
        
        if (error.response?.status === 422) {
          // Erreur de validation
          const errors = error.response.data.errors;
          if (errors) {
            const errorDetails = Object.entries(errors)
              .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`)
              .join('; ');
            errorMessage = `Erreur de validation: ${errorDetails}`;
          }
        } else if (error.response?.status === 413) {
          errorMessage = 'Fichier trop volumineux. La taille maximale est de 50MB par fichier.';
        } else if (error.response?.status === 500) {
          errorMessage = error.response.data.message || 'Erreur serveur. Vérifiez les logs du serveur.';
        } else if (error.code === 'ERR_NETWORK') {
          errorMessage = 'Erreur de connexion au serveur. Vérifiez que le serveur backend est démarré.';
        } else {
          errorMessage = error.response?.data?.message || 'Une erreur inattendue est survenue.';
        }
        
        setSubmitError(errorMessage);
      } else {
        setSubmitError('Une erreur inattendue est survenue.');
      }
    } finally {
      console.log("Fin de la tentative de soumission.");
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSubmitError(null);
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 text-sm font-medium text-white bg-[#00853F] rounded-lg hover:bg-[#00853F]">
              <Calendar className="inline-block w-4 h-4 mr-2" />
              Voir le calendrier
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Modèles publiés</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalModels}</p>
              </div>
              <div className="p-3 bg-[#00853F] rounded-full">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Commandes en attente</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.pendingOrders}</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-full">
                <ShoppingBag className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Note moyenne</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.averageRating}/5</p>
              </div>
              <div className="p-3 bg-green-50 rounded-full">
                <Star className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total clients</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalClients}</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-full">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="p-6 bg-white rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Activités récentes</h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50"
              >
                <div className="p-2 bg-gray-50 rounded-full">{activity.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">{activity.title}</h3>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                  <p className="text-sm text-gray-600">{activity.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h3>
            <div className="space-y-3">
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full px-4 py-2 text-sm font-medium text-white bg-[#00853F] rounded-lg hover:bg-[#006B32]"
              >
                Ajouter un nouveau modèle
              </button>
              <button 
                onClick={async () => {
                  try {
                    console.log('🧪 Test de la configuration CORS...');
                    const response = await fetch('http://localhost:8000/api/test-cors', {
                      method: 'OPTIONS',
                      headers: {
                        'Origin': 'http://localhost:5173',
                        'Access-Control-Request-Method': 'POST',
                        'Access-Control-Request-Headers': 'Content-Type, Authorization'
                      }
                    });
                    console.log('✅ Test CORS réussi:', response.status);
                    alert('Test CORS réussi !');
                  } catch (error) {
                    console.error('❌ Test CORS échoué:', error);
                    alert('Test CORS échoué. Vérifiez la configuration.');
                  }
                }}
                className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-yellow-100 rounded-lg hover:bg-yellow-200"
              >
                Test CORS
              </button>
              <button className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
                Voir les commandes en attente
              </button>
              <button className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
                Répondre aux messages
              </button>
            </div>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Formations disponibles</h3>
            <div className="space-y-3">
              <div className="p-4 bg-[#c5f0d9] rounded-lg">
                <h4 className="font-medium text-[#00853F]">Comment prendre des mesures numériques</h4>
                <p className="text-sm text-[#00853F] mt-1">Nouvelle formation disponible</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-900">Gestion des commandes diaspora</h4>
                <p className="text-sm text-green-700 mt-1">À compléter</p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Statut de certification</h3>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-purple-900">Certification Diaspora</h4>
                  <p className="text-sm text-purple-700 mt-1">Active</p>
                </div>
                <span className="px-3 py-1 text-xs font-medium text-purple-700 bg-purple-100 rounded-full">
                  Premium
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleAddModelSubmit}
        title="Ajouter un nouveau modèle"
        fields={modelFormFields}
        submitLabel={isSubmitting ? 'Enregistrement...' : 'Enregistrer le modèle'}
        size="lg"
        error={submitError}
      />
    </>
  );
};

export default Dashboard; 