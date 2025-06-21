import { useState } from 'react';
import {
  Users,
  Scissors,
  ShoppingBag,
  DollarSign,
  FileText,
  Layers,
  Package,
  MessageSquare,
  TrendingUp,
  Calendar,
  Download,
} from 'lucide-react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Enregistrement des composants Chart.js nécessaires
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const StatsCard = ({ title, value, icon: Icon, color, trend }) => (
  <div className="p-6 bg-white rounded-xl shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
        {trend && (
          <p className={`text-sm ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {trend > 0 ? '+' : ''}{trend}% ce mois-ci
          </p>
        )}
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);

const Statistics = () => {
  // Statistiques principales
  const [stats] = useState({
    totalUsers: { value: 1250, trend: 12 },
    totalTailors: { value: 156, trend: 8 },
    totalOrders: { value: 892, trend: 15 },
    totalRevenue: { value: '12.5M FCFA', trend: 20 },
  });

  // Statistiques secondaires
  const [secondaryStats] = useState({
    totalModels: 450,
    totalFabrics: 280,
    totalAccessories: 150,
    totalMessages: 89,
  });

  // Données pour le graphique d'évolution des revenus
  const revenueData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
    datasets: [
      {
        label: 'Revenus',
        data: [2.5, 3.2, 4.1, 3.8, 5.2, 6.1],
        borderColor: '#00853F',
        backgroundColor: 'rgba(0, 133, 63, 0.1)',
        tension: 0.4,
      },
    ],
  };

  // Données pour le graphique des utilisateurs par rôle
  const usersByRoleData = {
    labels: ['Clients', 'Tailleurs', 'Vendeurs', 'Admins'],
    datasets: [
      {
        data: [65, 25, 15, 5],
        backgroundColor: [
          '#00853F',
          '#FDEF00',
          '#FF6B6B',
          '#4A90E2',
        ],
      },
    ],
  };

  // Données pour le graphique des commandes par statut
  const ordersByStatusData = {
    labels: ['En attente', 'En cours', 'Livrées', 'Annulées'],
    datasets: [
      {
        label: 'Commandes',
        data: [45, 120, 85, 15],
        backgroundColor: [
          '#FFA500',
          '#00853F',
          '#4A90E2',
          '#FF6B6B',
        ],
      },
    ],
  };

  // Données pour le top 10 des tailleurs
  const topTailorsData = {
    labels: [
      'Moussa Diallo',
      'Fatou Ndiaye',
      'Amadou Ba',
      'Aminata Sow',
      'Ibrahima Diop',
      'Mariama Cissé',
      'Omar Sy',
      'Aïcha Kane',
      'Mamadou Fall',
      'Khadija Mbaye'
    ],
    datasets: [
      {
        label: 'Nombre de commandes',
        data: [156, 142, 128, 115, 98, 87, 76, 65, 54, 43],
        backgroundColor: '#00853F',
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Statistiques</h1>
          <p className="text-sm text-gray-600">Vue détaillée des statistiques de la plateforme</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 text-sm font-medium text-white bg-[#00853F] rounded-lg hover:bg-[#006B32] flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Exporter les données
          </button>
        </div>
      </div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Utilisateurs actifs"
          value={stats.totalUsers.value}
          icon={Users}
          color="bg-blue-500"
          trend={stats.totalUsers.trend}
        />
        <StatsCard
          title="Tailleurs inscrits"
          value={stats.totalTailors.value}
          icon={Scissors}
          color="bg-[#00853F]"
          trend={stats.totalTailors.trend}
        />
        <StatsCard
          title="Commandes en cours"
          value={stats.totalOrders.value}
          icon={ShoppingBag}
          color="bg-[#FDEF00]"
          trend={stats.totalOrders.trend}
        />
        <StatsCard
          title="Revenus du mois"
          value={stats.totalRevenue.value}
          icon={DollarSign}
          color="bg-green-500"
          trend={stats.totalRevenue.trend}
        />
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Évolution des revenus */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Évolution des revenus</h2>
          <Line
            data={revenueData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    callback: (value) => `${value}M FCFA`,
                  },
                },
              },
            }}
          />
        </div>

        {/* Répartition des utilisateurs */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Répartition des utilisateurs</h2>
          <Pie
            data={usersByRoleData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'right',
                },
              },
            }}
          />
        </div>
      </div>

      {/* Commandes par statut et Top 10 des tailleurs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Commandes par statut */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Commandes par statut</h2>
          <div className="h-64">
            <Bar
              data={ordersByStatusData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      stepSize: 20
                    }
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Top 10 des tailleurs */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Top 10 des tailleurs les plus sollicités</h2>
          <div className="h-64">
            <Bar
              data={topTailorsData}
              options={{
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    beginAtZero: true,
                    ticks: {
                      stepSize: 20
                    }
                  }
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Statistiques secondaires */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Modèles</p>
              <p className="text-xl font-semibold text-gray-900">{secondaryStats.totalModels}</p>
            </div>
            <FileText className="w-6 h-6 text-[#00853F]" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tissus</p>
              <p className="text-xl font-semibold text-gray-900">{secondaryStats.totalFabrics}</p>
            </div>
            <Layers className="w-6 h-6 text-[#00853F]" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Accessoires</p>
              <p className="text-xl font-semibold text-gray-900">{secondaryStats.totalAccessories}</p>
            </div>
            <Package className="w-6 h-6 text-[#00853F]" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Messages</p>
              <p className="text-xl font-semibold text-gray-900">{secondaryStats.totalMessages}</p>
            </div>
            <MessageSquare className="w-6 h-6 text-[#00853F]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics; 