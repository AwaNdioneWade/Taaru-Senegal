import { useState } from 'react';
import {
  Users,
  ShoppingBag,
  Star,
  TrendingUp,
  UserPlus,
  AlertCircle,
  CheckCircle,
  Clock,
} from 'lucide-react';

const Dashboard = () => {
  const [stats] = useState({
    totalUsers: 1250,
    totalTailors: 156,
    totalOrders: 892,
    averageRating: 4.7,
  });

  const recentActivities = [
    {
      type: 'new_user',
      title: 'Nouveau tailleur inscrit',
      description: 'Fatou Ndiaye a rejoint la plateforme',
      time: 'Il y a 2 heures',
      icon: <UserPlus className="text-blue-500" />,
    },
    {
      type: 'new_order',
      title: 'Nouvelle commande',
      description: 'Commande #CMD001 créée par Aminata Diallo',
      time: 'Il y a 3 heures',
      icon: <ShoppingBag className="text-green-500" />,
    },
    {
      type: 'review',
      title: 'Nouvel avis',
      description: 'Moussa Sarr a reçu 5 étoiles',
      time: 'Il y a 5 heures',
      icon: <Star className="text-yellow-500" />,
    },
  ];

  const pendingActions = [
    {
      type: 'tailor_verification',
      title: 'Vérification de tailleur',
      description: '5 demandes en attente',
      icon: <AlertCircle className="text-yellow-500" />,
    },
    {
      type: 'order_approval',
      title: 'Approbation de commande',
      description: '3 commandes en attente',
      icon: <Clock className="text-blue-500" />,
    },
    {
      type: 'support_tickets',
      title: 'Tickets de support',
      description: '8 tickets non résolus',
      icon: <AlertCircle className="text-red-500" />,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            Générer rapport
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="p-6 bg-white rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total utilisateurs</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalUsers}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-full">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tailleurs actifs</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalTailors}</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-full">
              <UserPlus className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Commandes totales</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalOrders}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-full">
              <ShoppingBag className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Note moyenne</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.averageRating}/5</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-full">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
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

        {/* Pending Actions */}
        <div className="p-6 bg-white rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions en attente</h2>
          <div className="space-y-4">
            {pendingActions.map((action, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50"
              >
                <div className="p-2 bg-gray-50 rounded-full">{action.icon}</div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900">{action.title}</h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </div>
                <button className="px-3 py-1 text-sm font-medium text-blue-600 hover:text-blue-700">
                  Voir
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="p-6 bg-white rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h3>
          <div className="space-y-3">
            <button className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
              Vérifier les nouveaux tailleurs
            </button>
            <button className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
              Gérer les commandes
            </button>
            <button className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
              Répondre aux tickets
            </button>
          </div>
        </div>

        <div className="p-6 bg-white rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistiques</h3>
          <div className="space-y-3">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900">Taux de conversion</h4>
              <p className="text-sm text-blue-700 mt-1">+12% ce mois-ci</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-900">Satisfaction client</h4>
              <p className="text-sm text-green-700 mt-1">4.8/5 en moyenne</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Système</h3>
          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-purple-900">État du système</h4>
                <p className="text-sm text-purple-700 mt-1">Tout fonctionne normalement</p>
              </div>
              <span className="px-3 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                En ligne
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 