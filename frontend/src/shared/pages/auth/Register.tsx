import React, { useState } from 'react'
import Button from '../../components/forms/Button';
import InputField from '../../components/forms/InputField';
import Select from '../../components/forms/Select';
import { useNavigate } from 'react-router-dom';
import { register as registerService } from '../../../services/authService';
import { testApiConnection } from '../../../services/apiTestService';
import axios from 'axios';

const roles = [
  { label: 'Client', value: 'Client' },
  { label: 'Tailleur', value: 'Tailleur' },
  { label: 'Vendeur', value: 'Vendeur' },
];

const specialites = [
  { label: 'Vêtements pour hommes', value: 'homme' },
  { label: 'Vêtements pour femmes', value: 'femme' },
  { label: 'Vêtements pour enfants', value: 'enfant' },
  { label: 'Tous les types de vêtements', value: 'tous' },
];

function Toast({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) {
  return (
    <div className={`fixed top-6 right-6 z-50 px-4 py-3 rounded shadow-lg text-white ${type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}
      role="alert">
      <div className="flex items-center justify-between gap-4">
        <span>{message}</span>
        <button onClick={onClose} className="ml-4 font-bold">&times;</button>
      </div>
    </div>
  );
}

function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<string>('Client');
  const [profileName, setProfileName] = useState('');
  
  // Champs spécifiques aux tailleurs
  const [prenom, setPrenom] = useState('');
  const [telephone, setTelephone] = useState('');
  const [specialite, setSpecialite] = useState<string>('homme');
  const [experience, setExperience] = useState('');
  const [adresse, setAdresse] = useState('');
  const [nomAtelier, setNomAtelier] = useState('');
  
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [loading, setLoading] = useState(false);
  const [testingConnection, setTestingConnection] = useState(false);
  const navigate = useNavigate();

  // Affiche les champs spécifiques si tailleur
  const isTailleur = role === 'Tailleur';
  const showProfileName = role === 'Tailleur' || role === 'Vendeur';
  const profileLabel = role === 'Tailleur' ? "Nom de l'atelier" : (role === 'Vendeur' ? "Nom de la boutique" : '');

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value);
    // Réinitialiser les champs spécifiques si on change de rôle
    if (e.target.value !== 'Tailleur') {
      setPrenom('');
      setTelephone('');
      setSpecialite('homme');
      setExperience('');
      setAdresse('');
      setNomAtelier('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) {
      setToast({ message: 'Veuillez sélectionner un rôle.', type: 'error' });
      return;
    }
    if (showProfileName && !profileName.trim()) {
      setToast({ message: `Veuillez renseigner le ${profileLabel.toLowerCase()}.`, type: 'error' });
      return;
    }
    
    // Validation spécifique pour les tailleurs
    if (isTailleur) {
      if (!prenom.trim()) {
        setToast({ message: 'Veuillez renseigner le prénom.', type: 'error' });
        return;
      }
      if (!telephone.trim()) {
        setToast({ message: 'Veuillez renseigner le téléphone.', type: 'error' });
        return;
      }
      if (!experience.trim() || parseInt(experience) < 0) {
        setToast({ message: 'Veuillez renseigner les années d\'expérience.', type: 'error' });
        return;
      }
      if (!adresse.trim()) {
        setToast({ message: 'Veuillez renseigner l\'adresse.', type: 'error' });
        return;
      }
      if (!nomAtelier.trim()) {
        setToast({ message: 'Veuillez renseigner le nom de l\'atelier.', type: 'error' });
        return;
      }
    }
    
    setLoading(true);
    try {
      const data = {
        name: fullName,
        email,
        role: role,
        ...(showProfileName ? { profile_name: profileName } : {}),
        // Champs spécifiques aux tailleurs
        ...(isTailleur ? {
          prenom,
          telephone,
          specialite: specialite as 'homme' | 'femme' | 'enfant' | 'tous',
          experience: parseInt(experience),
          adresse,
          nom_atelier: nomAtelier,
        } : {}),
      };
      await registerService(data);
      setToast({ message: 'Inscription réussie !', type: 'success' });
      setTimeout(() => {
        navigate('/login');
      }, 1200);
    } catch (err: unknown) {
      let msg = 'Erreur lors de l\'inscription.';
      if (axios.isAxiosError(err)) {
        if (err.code === 'ECONNABORTED') {
          msg = 'La requête a pris trop de temps. Veuillez réessayer.';
        } else if (err.response) {
          msg = err.response?.data?.message || msg;
        } else if (err.request) {
          msg = 'Impossible de se connecter au serveur. Vérifiez votre connexion.';
        }
      } else if (err instanceof Error) {
        msg = err.message;
      }
      setToast({ message: msg, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const testConnection = async () => {
    setTestingConnection(true);
    try {
      const result = await testApiConnection();
      if (result.success) {
        setToast({ message: 'Connexion API réussie !', type: 'success' });
      } else {
        setToast({ message: `Erreur de connexion: ${result.error}`, type: 'error' });
      }
    } catch (error) {
      setToast({ message: `Erreur lors du test de connexion: ${error instanceof Error ? error.message : 'Erreur inconnue'}`, type: 'error' });
    } finally {
      setTestingConnection(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <form
        onSubmit={handleSubmit}
        className={`bg-white p-8 rounded-xl shadow-md w-full ${isTailleur ? 'max-w-2xl' : 'max-w-md'}`}
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Créer un compte</h2>

        <div className={`grid ${isTailleur ? 'grid-cols-1 md:grid-cols-2 gap-6' : 'grid-cols-1 gap-4'}`}>
          <InputField
            label="Nom complet"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            placeholder="Ex : Fatou Ndiaye"
            required
          />

          <InputField
            label="Adresse Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Ex : fatou@mail.com"
            required
          />

          <Select
            label="Type de compte"
            value={role}
            onChange={handleRoleChange}
            options={roles.map(r => r.value)}
          />

          {showProfileName && (
            <InputField
              label={profileLabel}
              value={profileName}
              onChange={e => setProfileName(e.target.value)}
              placeholder={profileLabel}
              required
            />
          )}

          {/* Champs spécifiques aux tailleurs */}
          {isTailleur && (
            <>
              <InputField
                label="Prénom"
                value={prenom}
                onChange={e => setPrenom(e.target.value)}
                placeholder="Entrez le prénom"
                required
              />

              <InputField
                label="Téléphone"
                type="tel"
                value={telephone}
                onChange={e => setTelephone(e.target.value)}
                placeholder="Entrez le numéro de téléphone"
                required
              />

              <Select
                label="Spécialité"
                value={specialite}
                onChange={e => setSpecialite(e.target.value)}
                options={specialites.map(s => s.value)}
              />

              <InputField
                label="Années d'expérience"
                type="number"
                value={experience}
                onChange={e => setExperience(e.target.value)}
                placeholder="Entrez le nombre d'années d'expérience"
              />

              <InputField
                label="Nom de l'atelier"
                value={nomAtelier}
                onChange={e => setNomAtelier(e.target.value)}
                placeholder="Entrez le nom de l'atelier"
                required
              />

              <div className={`${isTailleur ? 'md:col-span-2' : ''}`}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adresse <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={adresse}
                  onChange={e => setAdresse(e.target.value)}
                  placeholder="Entrez l'adresse complète"
                  rows={3}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#00853F] focus:ring-[#00853F]"
                  required
                />
              </div>
            </>
          )}
        </div>

        <div className="mt-6">
          <Button type="submit" disabled={loading}>
            {loading ? 'Inscription...' : "S'inscrire"}
          </Button>
          
          {/* Bouton de test de connexion */}
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={testConnection}
              disabled={testingConnection}
              className="text-sm text-gray-500 hover:text-gray-700 underline"
            >
              {testingConnection ? 'Test en cours...' : 'Tester la connexion API'}
            </button>
          </div>
        </div>

        <p className="text-sm text-center mt-4">
          Déjà un compte ?{' '}
          <a href="/login" className="text-[#00853F] hover:underline">
            Connexion
          </a>
        </p>
      </form>
    </div>
  );
}

export default Register 