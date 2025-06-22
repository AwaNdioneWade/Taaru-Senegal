import axios, { AxiosError } from 'axios';
import { logError, logInfo } from '../../environnements/environnement';

// Temporairement, l'URL est définie ici. Idéalement, elle proviendrait du fichier d'environnement.
const API_URL = 'http://localhost:8000/api/modeles';

// Fonction pour vérifier si le token est valide
const checkTokenValidity = () => {
  const token = localStorage.getItem('auth_token');
  const user = localStorage.getItem('taaru_user');
  
  console.log('🔍 Vérification du token:', {
    tokenExists: !!token,
    userExists: !!user,
    tokenLength: token ? token.length : 0,
    tokenPreview: token ? `${token.substring(0, 20)}...` : 'Aucun token'
  });
  
  if (!token) {
    console.error('❌ Token d\'authentification non trouvé dans localStorage');
    throw new Error('Token d\'authentification non trouvé. Veuillez vous reconnecter.');
  }
  
  if (!user) {
    console.error('❌ Informations utilisateur non trouvées dans localStorage');
    throw new Error('Informations utilisateur non trouvées. Veuillez vous reconnecter.');
  }
  
  console.log('✅ Token valide trouvé');
  return token;
};

// Configuration Axios avec le token d'authentification
const getAxiosConfig = () => {
  const token = checkTokenValidity();
  
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`,
    },
  };
  
  console.log('Configuration modeleService avec headers:', config.headers);
  return config;
};

// Configuration pour les requêtes JSON (GET, PUT, DELETE)
const getJsonConfig = () => {
  const token = checkTokenValidity();

  return {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  };
};

export interface Modele {
  id: number;
  user_id: number;
  nom: string;
  slug: string;
  description: string;
  type: 'homme' | 'femme' | 'enfant' | 'mixte';
  prix?: number;
  tags?: string[];
  materiaux?: string[];
  photos?: string[];
  videos?: string[];
  statut: 'actif' | 'inactif' | 'en_revision';
  created_at: string;
  updated_at: string;
  user?: {
    id: number;
    name: string;
    email: string;
    nom_atelier?: string;
  };
}

export interface ModeleListResponse {
  success: boolean;
  message: string;
  data: Modele[];
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
  };
}

export interface ModeleResponse {
  success: boolean;
  message: string;
  data: Modele;
}

/**
 * Récupère la liste des modèles avec pagination et filtres
 * Utilise la version publique par défaut, mais peut utiliser l'authentification si disponible
 */
export async function getModeles(params?: {
  search?: string;
  type?: string;
  statut?: string;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
  per_page?: number;
  page?: number;
  useAuth?: boolean; // Option pour forcer l'utilisation de l'authentification
}): Promise<ModeleListResponse> {
  try {
    const useAuth = params?.useAuth || false;
    const requestParams = params ? { ...params } : {};
    delete requestParams.useAuth;
    
    logInfo('🚀 Récupération de la liste des modèles', { ...requestParams, useAuth });
    
    // Vérifier si on doit utiliser l'authentification
    if (useAuth) {
      const config = getJsonConfig();
      console.log('📤 Configuration de la requête (avec auth):', {
        url: API_URL,
        headers: config.headers,
        params: requestParams
      });
      
      const response = await axios.get(API_URL, {
        ...config,
        params: requestParams
      });
      
      logInfo('✅ Liste des modèles récupérée (avec auth)', { count: response.data.data?.length });
      return response.data;
    } else {
      // Version publique
      const response = await axios.get(API_URL, {
        headers: {
          'Content-Type': 'application/json',
        },
        params: requestParams
      });
      
      logInfo('✅ Liste publique des modèles récupérée', { count: response.data.data?.length });
      return response.data;
    }
  } catch (error) {
    console.error('❌ Erreur détaillée lors de la récupération des modèles:', {
      error: error,
      status: (error as AxiosError)?.response?.status,
      statusText: (error as AxiosError)?.response?.statusText,
      data: (error as AxiosError)?.response?.data,
      headers: (error as AxiosError)?.response?.headers
    });
    logError(error, 'Erreur lors de la récupération des modèles');
    throw error;
  }
}

/**
 * Récupère un modèle spécifique par ID
 * Utilise la version publique par défaut, mais peut utiliser l'authentification si disponible
 */
export async function getModele(id: string, useAuth: boolean = false): Promise<ModeleResponse> {
  try {
    logInfo('Récupération du modèle', { id, useAuth });
    
    if (useAuth) {
      const response = await axios.get(`${API_URL}/${id}`, getJsonConfig());
      logInfo('Modèle récupéré (avec auth)', { id });
      return response.data;
    } else {
      const response = await axios.get(`${API_URL}/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      logInfo('Modèle public récupéré', { id });
      return response.data;
    }
  } catch (error) {
    logError(error, 'Erreur lors de la récupération du modèle');
    throw error;
  }
}

/**
 * Crée un nouveau modèle en envoyant les données du formulaire à l'API.
 * @param formData - Le FormData contenant les informations du modèle et les fichiers.
 * @returns La réponse de l'API.
 */
export async function createModele(formData: FormData) {
  try {
    logInfo('🚀 Tentative de création d\'un nouveau modèle');
    
    // Vérifier le token avant l'envoi
    const token = localStorage.getItem('auth_token');
    const user = localStorage.getItem('taaru_user');
    
    console.log('🔍 Vérification du token pour création:', {
      tokenExists: !!token,
      userExists: !!user,
      tokenLength: token ? token.length : 0,
      tokenPreview: token ? `${token.substring(0, 20)}...` : 'Aucun token',
      userData: user ? JSON.parse(user) : null
    });
    
    if (!token) {
      throw new Error('Token d\'authentification non trouvé. Veuillez vous reconnecter.');
    }
    
    // Configuration avec authentification
    const config = getAxiosConfig();
    console.log('📤 Configuration pour création:', {
      url: API_URL,
      headers: config.headers,
      hasAuthorization: !!config.headers.Authorization,
      authorizationPreview: config.headers.Authorization ? `${config.headers.Authorization.substring(0, 30)}...` : 'Aucune'
    });
    
    // Vérifier que le serveur est accessible
    const response = await axios.post(API_URL, formData, {
      ...config,
      timeout: 30000, // 30 secondes de timeout
      validateStatus: (status) => {
        return status >= 200 && status < 300; // Accepter seulement les statuts 2xx
      }
    });
    
    logInfo('✅ Modèle créé avec succès', { modeleId: response.data.data.id });
    return response.data;
  } catch (error) {
    console.error('❌ Erreur détaillée lors de la création du modèle:', {
      error: error,
      status: (error as AxiosError)?.response?.status,
      statusText: (error as AxiosError)?.response?.statusText,
      data: (error as AxiosError)?.response?.data,
      headers: (error as AxiosError)?.response?.headers,
      requestHeaders: (error as AxiosError)?.config?.headers
    });
    
    if (axios.isAxiosError(error)) {
      if (error.code === 'ERR_NETWORK') {
        logError(error, 'Erreur de réseau - Vérifiez que le serveur backend est démarré sur http://localhost:8000');
        throw new Error('Erreur de connexion au serveur. Vérifiez que le serveur backend est démarré.');
      } else if (error.response?.status === 401) {
        logError(error, 'Erreur d\'authentification - Token invalide ou expiré');
        throw new Error('Erreur d\'authentification. Veuillez vous reconnecter.');
      } else if (error.response?.status === 0) {
        logError(error, 'Erreur CORS - Le serveur ne répond pas aux requêtes cross-origin');
        throw new Error('Erreur CORS. Vérifiez la configuration du serveur backend.');
      } else {
        logError(error, 'Erreur lors de la création du modèle');
        throw error;
      }
    } else {
      logError(error, 'Erreur inattendue lors de la création du modèle');
      throw error;
    }
  }
}

/**
 * Récupère la liste des modèles avec pagination et filtres (version publique)
 */
export async function getModelesPublic(params?: {
  search?: string;
  type?: string;
  statut?: string;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
  per_page?: number;
  page?: number;
}): Promise<ModeleListResponse> {
  try {
    logInfo('🚀 Récupération publique de la liste des modèles', params);
    
    const response = await axios.get(API_URL, {
      headers: {
        'Content-Type': 'application/json',
      },
      params
    });
    
    logInfo('✅ Liste publique des modèles récupérée', { count: response.data.data?.length });
    return response.data;
  } catch (error) {
    console.error('❌ Erreur détaillée lors de la récupération publique des modèles:', {
      error: error,
      status: (error as AxiosError)?.response?.status,
      statusText: (error as AxiosError)?.response?.statusText,
      data: (error as AxiosError)?.response?.data,
      headers: (error as AxiosError)?.response?.headers
    });
    logError(error, 'Erreur lors de la récupération publique des modèles');
    throw error;
  }
}

/**
 * Récupère un modèle spécifique par ID (version publique)
 */
export async function getModelePublic(id: string): Promise<ModeleResponse> {
  try {
    logInfo('Récupération publique du modèle', { id });
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    logInfo('Modèle public récupéré', { id });
    return response.data;
  } catch (error) {
    logError(error, 'Erreur lors de la récupération publique du modèle');
    throw error;
  }
} 