import { Outlet, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import {
  Home,
  ShoppingBag,
  Image,
  User,
  Menu,
  X,
  BookOpen,
  Users,
  MessageSquare,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../shared/context/AuthContext';

export const TailorLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { logout } = useAuth();

  const navigation = [
    { name: 'Tableau de bord', href: '/tailor', icon: Home },
    { name: 'Commandes', href: '/tailor/orders', icon: ShoppingBag },
    { name: 'Galerie', href: '/tailor/gallery', icon: Image },
    { name: 'Formations', href: '/tailor/trainings', icon: BookOpen },
    { name: 'Clients', href: '/tailor/clients', icon: Users },
    { name: 'Messages', href: '/tailor/messages', icon: MessageSquare },
    { name: 'Profil', href: '/tailor/profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00853F] to-[#FDEF00]">
                    Taaru Sénégal
                  </span>
                </Link>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                      location.pathname === item.href
                        ? 'text-[#00853F] border-b-2 border-[#00853F]'
                        : 'text-gray-600 hover:text-[#00853F] hover:border-[#00853F]'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-2" />
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center sm:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-[#00853F] hover:bg-gray-100"
              >
                {isMenuOpen ? (
                  <X className="block h-6 w-6" />
                ) : (
                  <Menu className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center px-3 py-2 text-base font-medium ${
                      location.pathname === item.href
                        ? 'text-[#00853F] bg-blue-50'
                        : 'text-gray-600 hover:text-[#00853F] hover:bg-blue-50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </Link>
                );
              })}
              <button
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
                className="flex items-center w-full px-3 py-2 text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="w-5 h-5 mr-3" />
                Déconnexion
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              © 2024 Taaru. Tous droits réservés.
            </div>
            <div className="flex space-x-6">
              <Link to="/tailor/mentions-legales" className="text-sm text-gray-600 hover:text-[#00853F]">
                Mentions légales
              </Link>
              <Link to="/tailor/confidentialite" className="text-sm text-gray-600 hover:text-[#00853F]">
                Politique de confidentialité
              </Link>
              <Link to="/tailor/contact" className="text-sm text-gray-600 hover:text-[#00853F]">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}; 