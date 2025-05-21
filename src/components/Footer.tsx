import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo et Description */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00853F] to-[#FDEF00]">Taaru Sénégal</h3>
            <p className="mt-4 text-gray-500">
              Valoriser et diffuser l’artisanat sénégalais à l’international, en soutenant l’innovation, la durabilité et l’excellence locale.
            </p>
          </div>

          {/* Liens Rapides */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Services</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/tailleurs" className="text-gray-500 hover:text-[#00853F]">
                  Pour les Tailleurs
                </Link>
              </li>
              <li>
                <Link to="/clients" className="text-gray-500 hover:text-[#00853F]">
                  Pour les Clients
                </Link>
              </li>
              <li>
                <Link to="/tissus" className="text-gray-500 hover:text-[#00853F]">
                  Vendeurs de Tissus
                </Link>
              </li>
              <li>
                <Link to="/accessoires" className="text-gray-500 hover:text-[#00853F]">
                  Vendeurs d'Accessoires
                </Link>
              </li>
            </ul>
          </div>

          {/* Liens Légaux */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Légal</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/confidentialite" className="text-gray-500 hover:text-[#00853F]">
                  Confidentialité
                </Link>
              </li>
              <li>
                <Link to="/conditions" className="text-gray-500 hover:text-[#00853F]">
                  Conditions d'utilisation
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-500 hover:text-[#00853F]">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} Taaru Sénégal. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
