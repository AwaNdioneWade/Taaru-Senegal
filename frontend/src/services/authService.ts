import axios from 'axios';
import { API_ENDPOINTS, AXIOS_CONFIG, logError, logInfo } from '../../environnements/environnement';

export interface RegisterData {
  name: string;
  email: string;
  role: string;
  profile_name?: string;
  password?: string;
  password_confirmation?: string;
  // Champs spécifiques aux tailleurs
  prenom?: string;
  telephone?: string;
  specialite?: 'homme' | 'femme' | 'enfant' | 'tous';
  experience?: number;
  adresse?: string;
  nom_atelier?: string;
  photo?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
    email_verified_at?: string;
    created_at: string;
    updated_at: string;
  };
  token: string;
}

export async function register(data: RegisterData) {
  try {
    logInfo('Tentative d\'inscription utilisateur', { email: data.email, role: data.role });
    logInfo('URL de l\'API:', API_ENDPOINTS.AUTH.REGISTER);
    logInfo('Configuration Axios:', { timeout: AXIOS_CONFIG.timeout, baseURL: AXIOS_CONFIG.baseURL });
    
    const response = await axios.post(API_ENDPOINTS.AUTH.REGISTER, data, {
      ...AXIOS_CONFIG,
      timeout: 30000, // Timeout explicite de 30 secondes
    });
    
    logInfo('Inscription réussie', { email: data.email });
    return response;
  } catch (error) {
    logError(error, 'Erreur lors de l\'inscription');
    
    // Gestion spécifique des erreurs de timeout
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        throw new Error('La requête a pris trop de temps. Veuillez réessayer.');
      }
      if (error.response) {
        // Erreur avec réponse du serveur
        throw new Error(error.response.data?.message || 'Erreur serveur');
      } else if (error.request) {
        // Erreur de connexion
        throw new Error('Impossible de se connecter au serveur. Vérifiez votre connexion.');
      }
    }
    
    throw error;
  }
}

export async function login(data: LoginData): Promise<LoginResponse> {
  try {
    logInfo('Tentative de connexion utilisateur', { email: data.email });
    logInfo('URL de l\'API:', API_ENDPOINTS.AUTH.LOGIN);
    
    const response = await axios.post(API_ENDPOINTS.AUTH.LOGIN, data, {
      ...AXIOS_CONFIG,
      timeout: 30000,
    });
    
    logInfo('Connexion réussie', { email: data.email });
    return response.data;
  } catch (error) {
    logError(error, 'Erreur lors de la connexion');
    
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        throw new Error('La requête a pris trop de temps. Veuillez réessayer.');
      }
      if (error.response) {
        // Erreur avec réponse du serveur
        const errorMessage = error.response.data?.message || 'Email ou mot de passe incorrect';
        throw new Error(errorMessage);
      } else if (error.request) {
        // Erreur de connexion
        throw new Error('Impossible de se connecter au serveur. Vérifiez votre connexion.');
      }
    }
    
    throw error;
  }
} 