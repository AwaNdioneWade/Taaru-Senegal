import { Outlet, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import {
  Home,
  Users,
  Settings,
  Menu,
  X,
  BarChart2,
  LogOut,
  Scissors,
  ShoppingBag,
  FileText,
  GraduationCap,
  AlertTriangle,
  Layers,
  Package,
  Calendar,
} from 'lucide-react';
import { useAuth } from '../shared/context/AuthContext';

export const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const { logout } = useAuth();

  const navigation = [
    { name: 'Tableau de bord', href: '/admin', icon: Home },
    { name: 'Utilisateurs', href: '/admin/users', icon: Users },
    { name: 'Tailleurs', href: '/admin/tailleurs', icon: Scissors },
    { name: 'Modèles', href: '/admin/modeles', icon: FileText },
    { name: 'Commandes', href: '/admin/commandes', icon: ShoppingBag },
    { name: 'Tissus', href: '/admin/tissus', icon: Layers },
    { name: 'Accessoires', href: '/admin/accessoires', icon: Package },
    { name: 'Événements', href: '/admin/evenements', icon: Calendar },
    { name: 'Formations', href: '/admin/formations', icon: GraduationCap },
    { name: 'Modération', href: '/admin/moderation', icon: AlertTriangle },
    { name: 'Statistiques', href: '/admin/stats', icon: BarChart2 },
    { name: 'Paramètres', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Overlay pour mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white shadow-lg transition-all duration-300 z-30
          ${isSidebarOpen ? 'w-64' : 'w-20'}
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="flex flex-col h-full">
          {/* Header de la sidebar */}
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center space-x-2">
                <span className={`text-xl font-bold ${isSidebarOpen ? 'block' : 'hidden'}`}>
                  Taaru Sénégal
                </span>
              </Link>
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
              >
                <X className="w-5 h-5 text-[#00853F]" />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <div className="px-2 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-[#00853F] text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {isSidebarOpen && <span>{item.name}</span>}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Footer de la sidebar */}
          <div className="p-4 border-t">
            <button
              onClick={logout}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 w-full"
            >
              <LogOut className="w-5 h-5" />
              {isSidebarOpen && <span>Déconnexion</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Contenu principal */}
      <div className="lg:pl-64">
        {/* Header mobile */}
        <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b z-10">
          <div className="flex items-center justify-between h-full px-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <Menu className="w-5 h-5 text-[#00853F]" />
            </button>
            <Link to="/" className="text-xl font-bold">
              Taaru Sénégal
            </Link>
            <div className="w-10" />
          </div>
        </header>

        {/* Espace pour le header mobile */}
        <div className="h-16 lg:hidden" />

        {/* Contenu de la page */}
        <main className="min-h-[calc(100vh-4rem)] p-4 lg:p-8">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="bg-white border-t">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-sm text-gray-500">
                © 2024 Taaru. Tous droits réservés.
              </div>
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                <Link to="/admin/mentions-legales" className="text-sm text-gray-500 hover:text-gray-700">
                  Mentions légales
                </Link>
                <Link to="/admin/confidentialite" className="text-sm text-gray-500 hover:text-gray-700">
                  Politique de confidentialité
                </Link>
                <Link to="/admin/contact" className="text-sm text-gray-500 hover:text-gray-700">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}; 