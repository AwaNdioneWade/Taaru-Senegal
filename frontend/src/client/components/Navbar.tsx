import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
    const location = useLocation();
    const isAuthPage = ['/login', '/register'].includes(location.pathname);
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const servicesDropdownRef = useRef<HTMLDivElement>(null);
    const espaceDropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrolled]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target as Node) &&
                espaceDropdownRef.current && !espaceDropdownRef.current.contains(event.target as Node)) {
                setActiveDropdown(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
  
    // Cache la navbar si on est sur login/register
    if (isAuthPage) return null;

    const toggleDropdown = (name: string) => {
        setActiveDropdown(activeDropdown === name ? null : name);
    };

    const handleSubmenuClick = () => {
        setActiveDropdown(null);
    };
  
    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
            scrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-white'
        }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link 
                        to="/" 
                        className="flex items-center space-x-2"
                    >
                        <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00853F] to-[#FDEF00]">
          Taaru Sénégal
                        </span>
                    </Link>

                    {/* Menu Desktop */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link 
                            to="/" 
                            className={`text-gray-700 hover:text-[#00853F] transition-colors duration-200 ${
                                location.pathname === '/' ? 'text-[#00853F] font-medium' : ''
                            }`}
                        >
                            Accueil
                        </Link>

                        {/* Menu déroulant Services */}
                        <div className="relative group" ref={servicesDropdownRef}>
                            <button 
                                onClick={() => toggleDropdown('services')}
                                className="text-gray-700 hover:text-[#00853F] transition-colors duration-200 flex items-center gap-2"
                            >
                                <span>
                                    <i className="fas fa-concierge-bell text-[#FDEF00]"></i>
                                </span>
                                Services
                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div className={`absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-xl py-2 ${activeDropdown === 'services' ? 'block' : 'hidden'} border border-gray-100 z-50`}>
                                <Link to="/services#tailleurs" onClick={handleSubmenuClick} className="flex items-center gap-3 px-4 py-3 hover:bg-[#00853F]/10 rounded-lg transition">
                                    <i className="fas fa-scissors text-[#00853F]"></i>
                                    <span>Pour les Tailleurs</span>
                                </Link>
                                <Link to="/services#clients" onClick={handleSubmenuClick} className="flex items-center gap-3 px-4 py-3 hover:bg-[#00853F]/10 rounded-lg transition">
                                    <i className="fas fa-user-friends text-[#FDEF00]"></i>
                                    <span>Pour les Clients</span>
                                </Link>
                                <Link to="/services#tissus" onClick={handleSubmenuClick} className="flex items-center gap-3 px-4 py-3 hover:bg-[#00853F]/10 rounded-lg transition">
                                    <i className="fas fa-tshirt text-[#E30B17]"></i>
                                    <span>Tissus</span>
                                </Link>
                                <Link to="/services#accessoires" onClick={handleSubmenuClick} className="flex items-center gap-3 px-4 py-3 hover:bg-[#00853F]/10 rounded-lg transition">
                                    <i className="fas fa-gem text-[#00853F]"></i>
                                    <span>Accessoires</span>
                                </Link>
                            </div>
                        </div>

                        <Link 
                            to="/galeries" 
                            className={`text-gray-700 hover:text-[#00853F] transition-colors duration-200 ${
                                location.pathname === '/galeries' ? 'text-[#00853F] font-medium' : ''
                            }`}
                        >
                            Galerie
                        </Link>

                        <Link 
                            to="/formations" 
                            className={`text-gray-700 hover:text-[#00853F] transition-colors duration-200 ${
                                location.pathname === '/formations' ? 'text-[#00853F] font-medium' : ''
                            }`}
                        >
                            Formations & Ateliers
                        </Link>

                        <Link 
                            to="/evenements" 
                            className={`text-gray-700 hover:text-[#00853F] transition-colors duration-200 ${
                                location.pathname === '/evenements' ? 'text-[#00853F] font-medium' : ''
                            }`}
                        >
                            Événements
                        </Link>

                        <Link 
                            to="/a-propos" 
                            className={`text-gray-700 hover:text-[#00853F] transition-colors duration-200 ${
                                location.pathname === '/a-propos' ? 'text-[#00853F] font-medium' : ''
                            }`}
                        >
                            À propos
                        </Link>

                        <Link 
                            to="/contact" 
                            className={`text-gray-700 hover:text-[#00853F] transition-colors duration-200 ${
                                location.pathname === '/contact' ? 'text-[#00853F] font-medium' : ''
                            }`}
                        >
                            Contact
                        </Link>
  
                        {/* Menu déroulant Mon Espace */}
                        <div className="relative group" ref={espaceDropdownRef}>
                            <button 
                                onClick={() => toggleDropdown('espace')}
                                className="text-gray-700 hover:text-[#00853F] transition-colors duration-200 flex items-center"
                            >
                                Mon Espace
                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div className={`absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 ${activeDropdown === 'espace' ? 'block' : 'hidden'} border border-gray-100`}>
                                <Link to="/login" onClick={handleSubmenuClick} className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#00853F]">
                                    Connexion
                                </Link>
                                <Link to="/register" onClick={handleSubmenuClick} className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#00853F]">
                                    Inscription
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Menu Mobile */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-700 hover:text-[#00853F] focus:outline-none"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Menu Mobile Dropdown */}
                {isMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:bg-[#00853F] rounded-md">
                                Accueil
                            </Link>
                            <div className="space-y-1">
                                <button className="w-full text-left px-3 py-2 text-gray-700 hover:bg-[#00853F] rounded-md">
                                    Services
                                </button>
                                <div className="pl-4 space-y-1">
                                    <Link to="/services#tailleurs" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:bg-[#00853F] rounded-md">
                                        Pour les Tailleurs
                                    </Link>
                                    <Link to="/services#clients" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:bg-[#00853F] rounded-md">
                                        Pour les Clients
                                    </Link>
                                    <Link to="/services#tissus" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:bg-[#00853F] rounded-md">
                                        Tissus
                                    </Link>
                                    <Link to="/services#accessoires" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:bg-[#00853F] rounded-md">
                                        Accessoires
                                    </Link>
                                </div>
                            </div>
                            <Link to="/galerie" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:bg-[#00853F] rounded-md">
                                Galerie
                            </Link>
                            <Link to="/formations" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:bg-[#00853F] rounded-md">
                                Formations & Ateliers
                            </Link>
                            <Link to="/evenements" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:bg-[#00853F] rounded-md">
                                Événements
                            </Link>
                            <Link to="/a-propos" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:bg-[#00853F] rounded-md">
                                À propos
                            </Link>
                            <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:bg-[#00853F] rounded-md">
                                Contact
                            </Link>
                            <div className="space-y-1">
                                <button className="w-full text-left px-3 py-2 text-gray-700 hover:bg-[#00853F] rounded-md">
                                    Mon Espace
                                </button>
                                <div className="pl-4 space-y-1">
                                    <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:bg-[#00853F] rounded-md">
                                        Connexion
                                    </Link>
                                    <Link to="/register" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:bg-[#00853F] rounded-md">
                                        Inscription
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar
