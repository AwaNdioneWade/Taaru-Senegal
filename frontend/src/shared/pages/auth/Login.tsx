import React, { useState } from 'react'
import Button from '../../components/forms/Button';
import InputField from '../../components/forms/InputField';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { testUsers } from '../../config/auth';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setError('');

      // Vérification des identifiants
      const user = testUsers.find(
        u => u.email === email && u.password === password
      );

      if (!user) {
        setError('Email ou mot de passe incorrect');
        return;
      }

      // Connexion réussie
      const userData = {
        email: user.email,
        role: user.role,
        fullName: user.fullName
      };

      login(userData);
      
      // Redirection basée sur le rôle
      const from = location.state?.from?.pathname || '/';
      switch (user.role) {
        case 'Admin':
          navigate('/admin');
          break;
        case 'Tailleur':
          navigate('/tailor');
          break;
        default:
          navigate(from);
      }
    };
  
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        {/* Bouton retour accueil */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:bg-gray-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
          <span className="text-sm font-medium">Retour à l'accueil</span>
        </button>

        <div className="w-full max-w-md">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-xl shadow-md"
          >
            <h2 className="text-2xl font-semibold text-center mb-6">Connexion</h2>

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}
    
            <InputField
              label="Adresse Email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Ex : user@mail.com"
              required
            />
    
            <InputField
              label="Mot de passe"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
    
            <Button type="submit">Se connecter</Button>
    
            <p className="text-sm text-center mt-4">
              Pas encore de compte ?{' '}
              <a href="/register" className="text-[#00853F] hover:underline">
                Inscription
              </a>
            </p>
          </form>

          {/* Informations de test */}
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-semibold mb-2">Comptes de test :</h3>
            <div className="text-xs space-y-1">
              <p><strong>Admin:</strong> admin@taaru.com / admin123</p>
              <p><strong>Tailleur:</strong> tailleur@taaru.com / tailleur123</p>
              <p><strong>Client:</strong> client@taaru.com / client123</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
export default Login 