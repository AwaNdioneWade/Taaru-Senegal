import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Users, Scissors, ShoppingBag, FileText, Layers, Package } from 'lucide-react';

// Enregistrer les composants Chart.js nécessaires
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const StatsCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);

export const Dashboard = () => {
  // Données fictives pour la démonstration
  const stats = {
    users: 1250,
    tailleurs: 350,
    commandes: 890,
    modeles: 450,
    tissus: 280,
    accessoires: 150,
  };

  // Données pour le graphique d'évolution des ventes
  const salesData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
    datasets: [
      {
        label: 'Ventes',
        data: [65, 59, 80, 81, 56, 55],
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

  // Données pour le graphique des top 5 tailleurs
  const topTailleursData = {
    labels: ['Tailleur 1', 'Tailleur 2', 'Tailleur 3', 'Tailleur 4', 'Tailleur 5'],
    datasets: [
      {
        label: 'Commandes',
        data: [120, 90, 75, 60, 45],
        backgroundColor: '#00853F',
      },
    ],
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCard
          title="Utilisateurs actifs"
          value={stats.users}
          icon={Users}
          color="bg-blue-500"
        />
        <StatsCard
          title="Tailleurs inscrits"
          value={stats.tailleurs}
          icon={Scissors}
          color="bg-green-500"
        />
        <StatsCard
          title="Commandes en cours"
          value={stats.commandes}
          icon={ShoppingBag}
          color="bg-yellow-500"
        />
        <StatsCard
          title="Modèles publiés"
          value={stats.modeles}
          icon={FileText}
          color="bg-purple-500"
        />
        <StatsCard
          title="Tissus en vente"
          value={stats.tissus}
          icon={Layers}
          color="bg-red-500"
        />
        <StatsCard
          title="Accessoires"
          value={stats.accessoires}
          icon={Package}
          color="bg-indigo-500"
        />
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Évolution des ventes */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Évolution des ventes</h2>
          <Line
            data={salesData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
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

        {/* Top 5 tailleurs */}
        <div className="bg-white p-6 rounded-lg shadow-sm lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Top 5 Tailleurs</h2>
          <Bar
            data={topTailleursData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}; 