import React, { useState } from 'react'
import Button from '../../components/forms/Button';
import InputField from '../../components/forms/InputField';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { login } from '../../../services/authService';
import { testApiConnection, testAuthentication, testModelesAccess, testPublicModelesAccess, testCreateModele, testCurrentAuth, testDirectAuth } from '../../../services/apiTestService';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [testResults, setTestResults] = useState<string[]>([]);
    const [isTesting, setIsTesting] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { login: authLogin } = useAuth();
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError('');
      setIsLoading(true);

      try {
        // Appel à l'API Laravel pour la connexion
        const response = await login({ email, password });
        
        // Connexion réussie
        const userData = {
          id: response.user.id,
          email: response.user.email,
          role: response.user.role,
          name: response.user.name,
          token: response.token
        };

        // Stocker le token dans localStorage
        localStorage.setItem('auth_token', response.token);
        
        // Mettre à jour le contexte d'authentification
        authLogin(userData, response.token);
        
        // Redirection basée sur le rôle
        const from = location.state?.from?.pathname || '/';
        const userRole = response.user.role.toLowerCase();
        
        console.log('Rôle utilisateur:', userRole);
        console.log('Données utilisateur:', response.user);
        
        switch (userRole) {
          case 'admin':
            console.log('Redirection vers /admin');
            navigate('/admin');
            break;
          case 'tailleur':
            console.log('Redirection vers /tailor');
            navigate('/tailor');
            break;
          case 'client':
            console.log('Redirection vers la page d\'accueil');
            navigate(from);
            break;
          default:
            console.log('Rôle non reconnu, redirection vers la page d\'accueil');
            navigate(from);
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Une erreur est survenue lors de la connexion');
      } finally {
        setIsLoading(false);
      }
    };

    const runDiagnostics = async () => {
      setIsTesting(true);
      setTestResults([]);
      
      try {
        // Test 1: Connexion API
        setTestResults(prev => [...prev, '🔍 Test 1: Connexion à l\'API...']);
        const connectionTest = await testApiConnection();
        setTestResults(prev => [...prev, `✅ ${connectionTest.message}`]);
        
        if (!connectionTest.success) {
          setTestResults(prev => [...prev, `❌ Erreur: ${connectionTest.error}`]);
          return;
        }
        
        // Test 2: Accès public aux modèles
        setTestResults(prev => [...prev, '🔍 Test 2: Accès public aux modèles...']);
        const publicModelesTest = await testPublicModelesAccess();
        setTestResults(prev => [...prev, `✅ ${publicModelesTest.message}`]);
        
        if (!publicModelesTest.success) {
          setTestResults(prev => [...prev, `❌ Erreur: ${publicModelesTest.error}`]);
        }
        
        // Test 3: Authentification
        setTestResults(prev => [...prev, '🔍 Test 3: Authentification...']);
        const authTest = await testAuthentication();
        setTestResults(prev => [...prev, `✅ ${authTest.message}`]);
        
        if (!authTest.success) {
          setTestResults(prev => [...prev, `❌ Erreur: ${authTest.error}`]);
          return;
        }
        
        // Test 3.5: Authentification avec le token actuel
        setTestResults(prev => [...prev, '🔍 Test 3.5: Token actuel...']);
        const currentAuthTest = await testCurrentAuth();
        setTestResults(prev => [...prev, `✅ ${currentAuthTest.message}`]);
        
        if (!currentAuthTest.success) {
          setTestResults(prev => [...prev, `❌ Erreur: ${currentAuthTest.error}`]);
        }
        
        // Test 3.6: Authentification directe
        setTestResults(prev => [...prev, '🔍 Test 3.6: Authentification directe...']);
        const directAuthTest = await testDirectAuth();
        setTestResults(prev => [...prev, `✅ ${directAuthTest.message}`]);
        
        if (!directAuthTest.success) {
          setTestResults(prev => [...prev, `❌ Erreur: ${directAuthTest.error}`]);
        }
        
        // Test 4: Accès aux modèles avec authentification
        setTestResults(prev => [...prev, '🔍 Test 4: Accès aux modèles (avec auth)...']);
        const modelesTest = await testModelesAccess();
        setTestResults(prev => [...prev, `✅ ${modelesTest.message}`]);
        
        if (!modelesTest.success) {
          setTestResults(prev => [...prev, `❌ Erreur: ${modelesTest.error}`]);
        }
        
        // Test 5: Création de modèle avec authentification
        setTestResults(prev => [...prev, '🔍 Test 5: Création de modèle...']);
        const createTest = await testCreateModele();
        setTestResults(prev => [...prev, `✅ ${createTest.message}`]);
        
        if (!createTest.success) {
          setTestResults(prev => [...prev, `❌ Erreur: ${createTest.error}`]);
        }
        
      } catch (error) {
        setTestResults(prev => [...prev, `❌ Erreur inattendue: ${error instanceof Error ? error.message : 'Erreur inconnue'}`]);
      } finally {
        setIsTesting(false);
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
              disabled={isLoading}
            />
    
            <InputField
              label="Mot de passe"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
    
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Connexion en cours...' : 'Se connecter'}
            </Button>
    
            <p className="text-sm text-center mt-4">
              Pas encore de compte ?{' '}
              <a href="/register" className="text-[#00853F] hover:underline">
                Inscription
              </a>
            </p>
          </form>

          {/* Bouton de diagnostic */}
          <div className="mt-4">
            <button 
              onClick={runDiagnostics} 
              disabled={isTesting}
              className="w-full py-3 px-6 rounded-lg font-medium transition bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isTesting ? 'Diagnostic en cours...' : '🔧 Diagnostiquer les problèmes'}
            </button>
            
            {testResults.length > 0 && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-semibold mb-2">Résultats du diagnostic :</h3>
                <div className="text-xs space-y-1">
                  {testResults.map((result, index) => (
                    <div key={index} className="font-mono">{result}</div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Informations de test */}
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-semibold mb-2">Compte administrateur :</h3>
            <div className="text-xs space-y-1">
              <p><strong>Email:</strong> admin@taarusenegal.com</p>
              <p><strong>Mot de passe:</strong> password</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
export default Login 