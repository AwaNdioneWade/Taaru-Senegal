import React, { useState } from 'react'
import Button from '../components/forms/Button';
import InputField from '../components/forms/InputField';
import { useNavigate } from 'react-router-dom';

function Connexion() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
  
      // Pour le moment on simule une connexion réussie
      const fakeUser = {
        email,
        role: 'Client', // plus tard : récupérer depuis l'API
      };
  
      localStorage.setItem('taaru_user', JSON.stringify(fakeUser));
      navigate('/');
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
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-semibold text-center mb-6">Connexion</h2>
  
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
      </div>
    );
  }
  
export default Connexion
