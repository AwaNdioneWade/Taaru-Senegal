import { useState } from 'react';
import {
  Play,
  FileText,
  CheckCircle,
  Clock,
  Award,
  ChevronRight,
  Lock,
  Star,
} from 'lucide-react';

const Trainings = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Toutes les formations' },
    { id: 'basics', name: 'Bases' },
    { id: 'advanced', name: 'Avancé' },
    { id: 'business', name: 'Business' },
  ];

  const trainings = [
    {
      id: 1,
      title: 'Comment prendre des mesures numériques',
      description: 'Apprenez à prendre des mesures précises pour vos clients à distance.',
      category: 'basics',
      duration: '45 min',
      progress: 100,
      isCompleted: true,
      isPremium: false,
      thumbnail: '/trainings/measurements.jpg',
    },
    {
      id: 2,
      title: 'Gestion des commandes diaspora',
      description: 'Optimisez votre processus de commande pour les clients de la diaspora.',
      category: 'business',
      duration: '1h 30',
      progress: 60,
      isCompleted: false,
      isPremium: true,
      thumbnail: '/trainings/diaspora.jpg',
    },
    {
      id: 3,
      title: 'Techniques de couture avancées',
      description: 'Maîtrisez les techniques de couture pour des finitions parfaites.',
      category: 'advanced',
      duration: '2h 15',
      progress: 0,
      isCompleted: false,
      isPremium: true,
      thumbnail: '/trainings/sewing.jpg',
    },
  ];

  const getProgressColor = (progress: number) => {
    if (progress === 100) return 'bg-green-500';
    if (progress > 0) return 'bg-blue-500';
    return 'bg-gray-200';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Formations</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Progression globale</span>
          <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full"
              style={{ width: '45%' }}
            />
          </div>
          <span className="text-sm font-medium text-gray-900">45%</span>
        </div>
      </div>

      {/* Categories */}
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap ${
              selectedCategory === category.id
                ? 'bg-[#00853F] text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Training Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {trainings.map((training) => (
          <div
            key={training.id}
            className="bg-white rounded-xl shadow-sm overflow-hidden group"
          >
            <div className="relative aspect-video bg-gray-100">
              <img
                src={training.thumbnail}
                alt={training.title}
                className="w-full h-full object-cover"
              />
              {training.isPremium && (
                <div className="absolute top-2 right-2">
                  <span className="px-2 py-1 text-xs font-medium text-yellow-800 bg-yellow-100 rounded-full">
                    Premium
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-200">
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="p-3 text-white bg-[#00853F] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Play className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">{training.duration}</span>
                {training.isCompleted ? (
                  <span className="inline-flex items-center text-sm text-green-600">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Terminé
                  </span>
                ) : (
                  <span className="inline-flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    En cours
                  </span>
                )}
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {training.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4">{training.description}</p>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Progression</span>
                  <span className="text-sm font-medium text-gray-900">
                    {training.progress}%
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${getProgressColor(
                      training.progress
                    )}`}
                    style={{ width: `${training.progress}%` }}
                  />
                </div>
              </div>

              <button className="w-full mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center justify-center">
                {training.isCompleted ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Revoir la formation
                  </>
                ) : (
                  <>
                    {training.isPremium ? (
                      <>
                        <Lock className="w-4 h-4 mr-2" />
                        Débloquer
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Continuer
                      </>
                    )}
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Premium Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-2">Passez à Premium</h3>
            <p className="text-purple-100 mb-4">
              Accédez à toutes les formations avancées et boostez votre carrière
            </p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                Formations avancées
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                Support prioritaire
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                Certification professionnelle
              </li>
            </ul>
          </div>
          <button className="px-6 py-3 text-sm font-medium text-purple-600 bg-white rounded-lg hover:bg-purple-50">
            En savoir plus
          </button>
        </div>
      </div>
    </div>
  );
};

export default Trainings; 