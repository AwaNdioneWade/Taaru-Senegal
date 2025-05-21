import { useState } from 'react';
import {
  TrendingUp,
  ShoppingBag,
  Star,
  Users,
  Eye,
  MessageSquare,
  Calendar,
} from 'lucide-react';

const Dashboard = () => {
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

  return (
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
            <button className="w-full px-4 py-2 text-sm font-medium text-white bg-[#00853F] rounded-lg hover:bg-[#00853F]">
              Ajouter un nouveau modèle
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
  );
};

export default Dashboard; 