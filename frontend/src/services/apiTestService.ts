import axios from 'axios';
import { API_ENDPOINTS, AXIOS_CONFIG, logInfo, logError } from '../../environnements/environnement';

export interface ApiTestResult {
  success: boolean;
  message: string;
  error?: string;
  details?: any;
}

/**
 * Teste la connexion à l'API
 */
export async function testApiConnection(): Promise<ApiTestResult> {
  try {
    logInfo('Test de connexion à l\'API', { url: API_ENDPOINTS.AUTH.LOGIN });
    
    // Utiliser une route qui existe réellement
    const response = await axios.get(`${config.API_BASE_URL}/auth/login`, {
      timeout: 5000,
    });
    
    return {
      success: true,
      message: 'Connexion API réussie',
      details: { status: response.status }
    };
  } catch (error) {
    logError(error, 'Erreur lors du test de connexion API');
    
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        return {
          success: false,
          message: 'Timeout de connexion',
          error: 'Le serveur ne répond pas dans les temps'
        };
      } else if (error.response) {
        // Si on reçoit une réponse (même 405 Method Not Allowed), le serveur fonctionne
        if (error.response.status === 405) {
          return {
            success: true,
            message: 'Connexion API réussie (méthode non autorisée attendue)',
            details: { status: error.response.status }
          };
        }
        return {
          success: false,
          message: 'Erreur serveur',
          error: `Status: ${error.response.status} - ${error.response.statusText}`
        };
      } else if (error.request) {
        return {
          success: false,
          message: 'Erreur de connexion',
          error: 'Impossible de se connecter au serveur'
        };
      }
    }
    
    return {
      success: false,
      message: 'Erreur inconnue',
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    };
  }
}

/**
 * Teste l'authentification avec des identifiants de test
 */
export async function testAuthentication(): Promise<ApiTestResult> {
  try {
    logInfo('Test d\'authentification');
    
    const testCredentials = {
      email: 'admin@taarusenegal.com',
      password: 'password'
    };
    
    const response = await axios.post(API_ENDPOINTS.AUTH.LOGIN, testCredentials, {
      timeout: 10000,
    });
    
    if (response.data.token) {
      return {
        success: true,
        message: 'Authentification réussie',
        details: { 
          user: response.data.user,
          hasToken: !!response.data.token,
          tokenLength: response.data.token.length
        }
      };
    } else {
      return {
        success: false,
        message: 'Authentification échouée',
        error: 'Token non reçu dans la réponse'
      };
    }
  } catch (error) {
    logError(error, 'Erreur lors du test d\'authentification');
    
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        return {
          success: false,
          message: 'Identifiants incorrects',
          error: 'Email ou mot de passe invalide'
        };
      } else if (error.response?.status === 422) {
        return {
          success: false,
          message: 'Données invalides',
          error: error.response.data?.message || 'Validation échouée'
        };
      }
    }
    
    return {
      success: false,
      message: 'Erreur d\'authentification',
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    };
  }
}

/**
 * Teste la récupération des modèles avec un token valide
 */
export async function testModelesAccess(): Promise<ApiTestResult> {
  try {
    logInfo('Test d\'accès aux modèles');
    
    // D'abord s'authentifier
    const authResult = await testAuthentication();
    if (!authResult.success) {
      return authResult;
    }
    
    // Récupérer le token de la réponse d'authentification
    const testCredentials = {
      email: 'admin@taarusenegal.com',
      password: 'password'
    };
    
    const authResponse = await axios.post(API_ENDPOINTS.AUTH.LOGIN, testCredentials);
    const token = authResponse.data.token;
    
    // Tester l'accès aux modèles avec le token
    const modelesResponse = await axios.get(API_ENDPOINTS.MODELES.LIST, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    });
    
    return {
      success: true,
      message: 'Accès aux modèles réussi',
      details: { 
        status: modelesResponse.status,
        dataCount: modelesResponse.data?.data?.length || 0
      }
    };
  } catch (error) {
    logError(error, 'Erreur lors du test d\'accès aux modèles');
    
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        return {
          success: false,
          message: 'Accès non autorisé',
          error: 'Token invalide ou expiré'
        };
      } else if (error.response?.status === 403) {
        return {
          success: false,
          message: 'Accès interdit',
          error: 'Permissions insuffisantes'
        };
      }
    }
    
    return {
      success: false,
      message: 'Erreur d\'accès aux modèles',
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    };
  }
}

/**
 * Teste l'accès public aux modèles sans authentification
 */
export async function testPublicModelesAccess(): Promise<ApiTestResult> {
  try {
    logInfo('Test d\'accès public aux modèles');
    
    // Tester l'accès aux modèles sans token
    const modelesResponse = await axios.get(API_ENDPOINTS.MODELES.LIST, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    });
    
    return {
      success: true,
      message: 'Accès public aux modèles réussi',
      details: { 
        status: modelesResponse.status,
        dataCount: modelesResponse.data?.data?.length || 0,
        hasData: !!modelesResponse.data?.data
      }
    };
  } catch (error) {
    logError(error, 'Erreur lors du test d\'accès public aux modèles');
    
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        return {
          success: false,
          message: 'Accès public refusé',
          error: 'Les modèles nécessitent encore une authentification'
        };
      } else if (error.response?.status === 403) {
        return {
          success: false,
          message: 'Accès interdit',
          error: 'Permissions insuffisantes pour l\'accès public'
        };
      } else if (error.response?.status === 404) {
        return {
          success: false,
          message: 'Route non trouvée',
          error: 'L\'endpoint des modèles n\'existe pas'
        };
      }
    }
    
    return {
      success: false,
      message: 'Erreur d\'accès public aux modèles',
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    };
  }
}

export async function testBackendHealth() {
  try {
    logInfo('Test de santé du backend...');
    
    // Test de l'endpoint de santé (si disponible)
    const response = await axios.get('http://localhost:8000/api/health', {
      timeout: 5000,
    });
    
    logInfo('Backend en bonne santé', { status: response.status });
    return { success: true, status: response.status };
  } catch (error) {
    logError(error, 'Erreur de santé du backend');
    return { success: false, error: 'Backend non accessible' };
  }
}

/**
 * Teste la création de modèles avec authentification
 */
export async function testCreateModele(): Promise<ApiTestResult> {
  try {
    logInfo('Test de création de modèle avec authentification');
    
    // D'abord s'authentifier
    const authResult = await testAuthentication();
    if (!authResult.success) {
      return authResult;
    }
    
    // Récupérer le token de la réponse d'authentification
    const testCredentials = {
      email: 'admin@taarusenegal.com',
      password: 'password'
    };
    
    const authResponse = await axios.post(API_ENDPOINTS.AUTH.LOGIN, testCredentials);
    const token = authResponse.data.token;
    
    // Créer un FormData de test
    const formData = new FormData();
    formData.append('nom', 'Modèle de test');
    formData.append('description', 'Description du modèle de test');
    formData.append('type', 'homme');
    formData.append('prix', '50000');
    formData.append('materiaux_utilises', 'Coton, Wax');
    formData.append('tags', 'test, création');
    
    // Tester la création avec le token
    const createResponse = await axios.post(API_ENDPOINTS.MODELES.CREATE, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
      timeout: 10000,
    });
    
    return {
      success: true,
      message: 'Création de modèle réussie',
      details: { 
        status: createResponse.status,
        modeleId: createResponse.data?.data?.id
      }
    };
  } catch (error) {
    logError(error, 'Erreur lors du test de création de modèle');
    
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        return {
          success: false,
          message: 'Création non autorisée',
          error: 'Token invalide ou expiré pour la création'
        };
      } else if (error.response?.status === 422) {
        return {
          success: false,
          message: 'Données invalides',
          error: error.response.data?.message || 'Validation échouée'
        };
      } else if (error.response?.status === 403) {
        return {
          success: false,
          message: 'Accès interdit',
          error: 'Permissions insuffisantes pour créer des modèles'
        };
      }
    }
    
    return {
      success: false,
      message: 'Erreur de création de modèle',
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    };
  }
}

/**
 * Teste l'authentification avec le token actuel du localStorage
 */
export async function testCurrentAuth(): Promise<ApiTestResult> {
  try {
    logInfo('Test d\'authentification avec le token actuel');
    
    const token = localStorage.getItem('auth_token');
    const user = localStorage.getItem('taaru_user');
    
    if (!token) {
      return {
        success: false,
        message: 'Aucun token trouvé',
        error: 'Token manquant dans le localStorage'
      };
    }
    
    if (!user) {
      return {
        success: false,
        message: 'Aucun utilisateur trouvé',
        error: 'Données utilisateur manquantes dans le localStorage'
      };
    }
    
    // Tester l'authentification avec le token actuel
    const response = await axios.get(`${API_ENDPOINTS.AUTH.LOGIN.replace('/login', '/test')}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    });
    
    return {
      success: true,
      message: 'Authentification réussie avec le token actuel',
      details: { 
        status: response.status,
        user: response.data.user,
        debug: response.data.debug
      }
    };
  } catch (error) {
    logError(error, 'Erreur lors du test d\'authentification avec le token actuel');
    
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        return {
          success: false,
          message: 'Token invalide',
          error: 'Le token actuel n\'est pas valide'
        };
      }
    }
    
    return {
      success: false,
      message: 'Erreur d\'authentification',
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    };
  }
}

/**
 * Teste directement l'authentification avec le token actuel
 */
export async function testDirectAuth(): Promise<ApiTestResult> {
  try {
    logInfo('Test direct d\'authentification');
    
    const token = localStorage.getItem('auth_token');
    
    if (!token) {
      return {
        success: false,
        message: 'Aucun token trouvé',
        error: 'Token manquant dans le localStorage'
      };
    }
    
    // Tester directement l'authentification
    const response = await axios.get(`${config.API_BASE_URL}/auth/test`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    });
    
    return {
      success: true,
      message: 'Authentification directe réussie',
      details: { 
        status: response.status,
        user: response.data.user,
        debug: response.data.debug
      }
    };
  } catch (error) {
    logError(error, 'Erreur lors du test d\'authentification directe');
    
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        return {
          success: false,
          message: 'Authentification directe échouée',
          error: 'Token invalide ou problème d\'authentification',
          details: error.response.data
        };
      }
    }
    
    return {
      success: false,
      message: 'Erreur d\'authentification directe',
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    };
  }
} 