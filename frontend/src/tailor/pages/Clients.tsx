import { useState } from 'react';
import {
  Search,
  Filter,
  ChevronDown,
  User,
  Mail,
  Phone,
  ShoppingBag,
  Star,
  MessageSquare,
  Download,
  Plus,
} from 'lucide-react';

const Clients = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const clients = [
    {
      id: 1,
      name: 'Fatou Ndiaye',
      email: 'fatou.ndiaye@example.com',
      phone: '+221 77 123 45 67',
      totalOrders: 5,
      lastOrder: '2024-03-15',
      rating: 5,
      location: 'Dakar, Sénégal',
      isDiaspora: false,
    },
    {
      id: 2,
      name: 'Aminata Diallo',
      email: 'aminata.diallo@example.com',
      phone: '+33 6 12 34 56 78',
      totalOrders: 3,
      lastOrder: '2024-03-10',
      rating: 4,
      location: 'Paris, France',
      isDiaspora: true,
    },
    {
      id: 3,
      name: 'Moussa Sarr',
      email: 'moussa.sarr@example.com',
      phone: '+221 76 987 65 43',
      totalOrders: 2,
      lastOrder: '2024-03-05',
      rating: 5,
      location: 'Saint-Louis, Sénégal',
      isDiaspora: false,
    },
  ];

  const filters = [
    { id: 'all', name: 'Tous les clients' },
    { id: 'diaspora', name: 'Diaspora' },
    { id: 'local', name: 'Local' },
    { id: 'recent', name: 'Clients récents' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Mes Clients</h1>
        <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
          <Plus className="inline-block w-4 h-4 mr-2" />
          Ajouter un client
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher un client..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="relative">
            <select
              className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
            >
              {filters.map((filter) => (
                <option key={filter.id} value={filter.id}>
                  {filter.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="inline-block w-4 h-4 mr-2" />
            Filtres avancés
          </button>
        </div>
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {clients.map((client) => (
          <div
            key={client.id}
            className="bg-white rounded-xl shadow-sm overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {client.name}
                    </h3>
                    {client.isDiaspora && (
                      <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium text-purple-700 bg-purple-100 rounded-full">
                        Diaspora
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="ml-1 text-sm font-medium text-gray-900">
                    {client.rating}
                  </span>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  {client.email}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  {client.phone}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  {client.totalOrders} commandes
                </div>
              </div>

              <div className="mt-6 flex space-x-3">
                <button className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                  <MessageSquare className="inline-block w-4 h-4 mr-2" />
                  Contacter
                </button>
                <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Dernière commande</span>
                <span className="font-medium text-gray-900">
                  {client.lastOrder}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total clients</p>
              <p className="text-2xl font-semibold text-gray-900">156</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-full">
              <User className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Clients diaspora</p>
              <p className="text-2xl font-semibold text-gray-900">45</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-full">
              <User className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Note moyenne</p>
              <p className="text-2xl font-semibold text-gray-900">4.8</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-full">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clients; 