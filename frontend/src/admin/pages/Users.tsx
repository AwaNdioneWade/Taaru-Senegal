import { useState } from 'react';
import {
  Search,
  Filter,
  MoreVertical,
  Mail,
  UserPlus,
  Download,
  Edit,
  MapPin,
} from 'lucide-react';
import { DataTable } from '../components/DataTable';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'user' | 'moderator';
  status: 'active' | 'inactive' | 'suspended';
  location: string;
  joinDate: string;
  lastActive: string;
}

const Users = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Données de démonstration
  const users: User[] = [
    {
      id: '1',
      name: 'Moussa Sarr',
      email: 'moussa.sarr@email.com',
      phone: '+221 76 234 56 78',
      role: 'user',
      status: 'active',
      location: 'Saint-Louis, Sénégal',
      joinDate: '2023-11-20',
      lastActive: '2024-03-19',
    },
    {
      id: '2',
      name: 'Fatou Ndiaye',
      email: 'fatou.ndiaye@email.com',
      phone: '+221 77 345 67 89',
      role: 'admin',
      status: 'active',
      location: 'Dakar, Sénégal',
      joinDate: '2023-09-01',
      lastActive: '2024-03-20',
    },
    {
      id: '3',
      name: 'Amadou Ba',
      email: 'amadou.ba@email.com',
      phone: '+221 77 456 78 90',
      role: 'moderator',
      status: 'suspended',
      location: 'Thiès, Sénégal',
      joinDate: '2024-03-15',
      lastActive: '2024-03-15',
    },
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800';
      case 'moderator':
        return 'bg-blue-100 text-blue-800';
      case 'user':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'suspended':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const columns = [
    {
      header: 'Utilisateur',
      accessor: (user: User) => (
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600">
              {user.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{user.name}</div>
            <div className="text-sm text-gray-500">ID: {user.id}</div>
          </div>
        </div>
      ),
      sortable: true,
    },
    {
      header: 'Contact',
      accessor: (user: User) => (
        <div>
          <div className="text-sm text-gray-900">{user.email}</div>
          <div className="text-sm text-gray-500">{user.phone}</div>
          <div className="text-sm text-gray-500 flex items-center mt-1">
            <MapPin className="w-4 h-4 mr-1" />
            {user.location}
          </div>
        </div>
      ),
    },
    {
      header: 'Rôle',
      accessor: (user: User) => (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleColor(user.role)}`}>
          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
        </span>
      ),
      sortable: true,
    },
    {
      header: 'Statut',
      accessor: (user: User) => (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(user.status)}`}>
          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
        </span>
      ),
      sortable: true,
    },
    {
      header: 'Dernière activité',
      accessor: (user: User) => (
        <div className="text-sm text-gray-500">
          {new Date(user.lastActive).toLocaleDateString('fr-FR')}
        </div>
      ),
      sortable: true,
    },
    {
      header: 'Actions',
      accessor: (user: User) => (
        <div className="flex items-center justify-end space-x-2">
          <button 
            className="text-gray-400 hover:text-gray-500"
            onClick={(e) => {
              e.stopPropagation();
              window.location.href = `mailto:${user.email}`;
            }}
          >
            <Mail className="w-5 h-5" />
          </button>
          <button 
            className="text-gray-400 hover:text-gray-500"
            onClick={(e) => {
              e.stopPropagation();
              console.log('Edit user:', user);
            }}
          >
            <Edit className="w-5 h-5" />
          </button>
          <button 
            className="text-gray-400 hover:text-gray-500"
            onClick={(e) => {
              e.stopPropagation();
              console.log('More options for user:', user);
            }}
          >
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      ),
    },
  ];

  const mobileView = (user: User) => (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600">
              {user.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900">{user.name}</h3>
            <p className="text-xs text-gray-500">ID: {user.id}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="text-gray-400 hover:text-gray-500">
            <Mail className="w-5 h-5" />
          </button>
          <button className="text-gray-400 hover:text-gray-500">
            <Edit className="w-5 h-5" />
          </button>
          <button className="text-gray-400 hover:text-gray-500">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-gray-500">Contact</p>
          <p className="text-sm text-gray-900">{user.email}</p>
          <p className="text-sm text-gray-900">{user.phone}</p>
          <p className="text-sm text-gray-500 flex items-center mt-1">
            <MapPin className="w-4 h-4 mr-1" />
            {user.location}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Informations</p>
          <div className="flex items-center space-x-2">
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleColor(user.role)}`}>
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Inscrit le {new Date(user.joinDate).toLocaleDateString('fr-FR')}
          </p>
          <p className="text-sm text-gray-500">
            Dernière activité: {new Date(user.lastActive).toLocaleDateString('fr-FR')}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(user.status)}`}>
          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
        </span>
      </div>
    </div>
  );

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des utilisateurs</h1>
          <p className="text-sm text-gray-600">Gérez les utilisateurs de la plateforme</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4">
          <button className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-[#00853F] rounded-lg hover:bg-[#006B32] flex items-center justify-center space-x-2">
            <UserPlus className="w-4 h-4" />
            <span>Ajouter un utilisateur</span>
          </button>
          <button className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Exporter</span>
          </button>
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher un utilisateur..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853F] focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#00853F] focus:border-transparent"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="all">Tous les rôles</option>
            <option value="admin">Administrateur</option>
            <option value="moderator">Modérateur</option>
            <option value="user">Utilisateur</option>
          </select>
          <select
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#00853F] focus:border-transparent"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="all">Tous les statuts</option>
            <option value="active">Actif</option>
            <option value="inactive">Inactif</option>
            <option value="suspended">Suspendu</option>
          </select>
          <button className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Plus de filtres</span>
          </button>
        </div>
      </div>

      {/* Table des utilisateurs */}
      <DataTable
        columns={columns}
        data={filteredUsers}
        itemsPerPage={10}
        searchable={false}
        mobileView={mobileView}
        onRowClick={() => {}}
      />
    </div>
  );
};

export default Users; 