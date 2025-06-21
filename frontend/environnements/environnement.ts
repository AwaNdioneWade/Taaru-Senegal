// Configuration des environnements pour l'API Taaru Sénégal

export interface EnvironmentConfig {
  API_BASE_URL: string;
  API_TIMEOUT: number;
  APP_NAME: string;
  APP_VERSION: string;
  DEBUG_MODE: boolean;
}

// Configuration pour le développement
const developmentConfig: EnvironmentConfig = {
  API_BASE_URL: 'http://localhost:8000/api',
  API_TIMEOUT: 30000, // 30 secondes pour le développement
  APP_NAME: 'Taaru Sénégal',
  APP_VERSION: '1.0.0',
  DEBUG_MODE: true,
};

// Configuration pour la production
const productionConfig: EnvironmentConfig = {
  API_BASE_URL: 'https://api.taaru-senegal.com/api', // À modifier selon votre domaine
  API_TIMEOUT: 15000, // 15 secondes
  APP_NAME: 'Taaru Sénégal',
  APP_VERSION: '1.0.0',
  DEBUG_MODE: false,
};

// Configuration pour les tests
const testConfig: EnvironmentConfig = {
  API_BASE_URL: 'http://localhost:8000/api',
  API_TIMEOUT: 5000, // 5 secondes
  APP_NAME: 'Taaru Sénégal Test',
  APP_VERSION: '1.0.0',
  DEBUG_MODE: true,
};

// Déterminer l'environnement actuel
const getCurrentEnvironment = (): string => {
  // Utiliser les variables d'environnement Vite
  const mode = import.meta.env?.MODE || 'development';
  
  if (mode === 'production') {
    return 'production';
  } else if (mode === 'test') {
    return 'test';
  } else {
    return 'development';
  }
};

// Obtenir la configuration selon l'environnement
export const getEnvironmentConfig = (): EnvironmentConfig => {
  const env = getCurrentEnvironment();
  
  switch (env) {
    case 'production':
      return productionConfig;
    case 'test':
      return testConfig;
    case 'development':
    default:
      return developmentConfig;
  }
};

// Configuration par défaut
export const config = getEnvironmentConfig();

// URLs spécifiques pour différentes parties de l'API
export const API_ENDPOINTS = {
  // Authentification
  AUTH: {
    REGISTER: `${config.API_BASE_URL}/auth/register`,
    LOGIN: `${config.API_BASE_URL}/auth/login`,
    LOGOUT: `${config.API_BASE_URL}/auth/logout`,
    FORGOT_PASSWORD: `${config.API_BASE_URL}/auth/forgot-password`,
    RESET_PASSWORD: `${config.API_BASE_URL}/auth/reset-password`,
    ME: `${config.API_BASE_URL}/auth/me`,
  },
  
  // Tailleurs
  TAILLEURS: {
    LIST: `${config.API_BASE_URL}/tailleurs`,
    CREATE: `${config.API_BASE_URL}/tailleurs`,
    SHOW: (id: string) => `${config.API_BASE_URL}/tailleurs/${id}`,
    UPDATE: (id: string) => `${config.API_BASE_URL}/tailleurs/${id}`,
    DELETE: (id: string) => `${config.API_BASE_URL}/tailleurs/${id}`,
  },
  
  // Modèles
  MODELES: {
    LIST: `${config.API_BASE_URL}/modeles`,
    CREATE: `${config.API_BASE_URL}/modeles`,
    SHOW: (id: string) => `${config.API_BASE_URL}/modeles/${id}`,
    UPDATE: (id: string) => `${config.API_BASE_URL}/modeles/${id}`,
    DELETE: (id: string) => `${config.API_BASE_URL}/modeles/${id}`,
  },
  
  // Utilisateurs
  USERS: {
    LIST: `${config.API_BASE_URL}/users`,
    CREATE: `${config.API_BASE_URL}/users`,
    SHOW: (id: string) => `${config.API_BASE_URL}/users/${id}`,
    UPDATE: (id: string) => `${config.API_BASE_URL}/users/${id}`,
    DELETE: (id: string) => `${config.API_BASE_URL}/users/${id}`,
  },
  
  // Commandes
  COMMANDES: {
    LIST: `${config.API_BASE_URL}/commandes`,
    CREATE: `${config.API_BASE_URL}/commandes`,
    SHOW: (id: string) => `${config.API_BASE_URL}/commandes/${id}`,
    UPDATE: (id: string) => `${config.API_BASE_URL}/commandes/${id}`,
    DELETE: (id: string) => `${config.API_BASE_URL}/commandes/${id}`,
  },
  
  // Tissus
  TISSUS: {
    LIST: `${config.API_BASE_URL}/tissus`,
    CREATE: `${config.API_BASE_URL}/tissus`,
    SHOW: (id: string) => `${config.API_BASE_URL}/tissus/${id}`,
    UPDATE: (id: string) => `${config.API_BASE_URL}/tissus/${id}`,
    DELETE: (id: string) => `${config.API_BASE_URL}/tissus/${id}`,
  },
  
  // Accessoires
  ACCESSOIRES: {
    LIST: `${config.API_BASE_URL}/accessoires`,
    CREATE: `${config.API_BASE_URL}/accessoires`,
    SHOW: (id: string) => `${config.API_BASE_URL}/accessoires/${id}`,
    UPDATE: (id: string) => `${config.API_BASE_URL}/accessoires/${id}`,
    DELETE: (id: string) => `${config.API_BASE_URL}/accessoires/${id}`,
  },
  
  // Événements
  EVENEMENTS: {
    LIST: `${config.API_BASE_URL}/evenements`,
    CREATE: `${config.API_BASE_URL}/evenements`,
    SHOW: (id: string) => `${config.API_BASE_URL}/evenements/${id}`,
    UPDATE: (id: string) => `${config.API_BASE_URL}/evenements/${id}`,
    DELETE: (id: string) => `${config.API_BASE_URL}/evenements/${id}`,
  },
  
  // Formations
  FORMATIONS: {
    LIST: `${config.API_BASE_URL}/formations`,
    CREATE: `${config.API_BASE_URL}/formations`,
    SHOW: (id: string) => `${config.API_BASE_URL}/formations/${id}`,
    UPDATE: (id: string) => `${config.API_BASE_URL}/formations/${id}`,
    DELETE: (id: string) => `${config.API_BASE_URL}/formations/${id}`,
  },
  
  // Administration
  ADMIN: {
    CREATE_USER: `${config.API_BASE_URL}/admin/users`,
  },
};

// Configuration Axios par défaut
export const AXIOS_CONFIG = {
  baseURL: config.API_BASE_URL,
  timeout: config.API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};

// Fonction utilitaire pour obtenir l'URL complète
export const getApiUrl = (endpoint: string): string => {
  return `${config.API_BASE_URL}${endpoint}`;
};

// Fonction utilitaire pour logger les erreurs en mode debug
export const logError = (error: unknown, context?: string): void => {
  if (config.DEBUG_MODE) {
    console.error(`[${context || 'API Error'}]:`, error);
  }
};

// Fonction utilitaire pour logger les informations en mode debug
export const logInfo = (message: string, data?: unknown): void => {
  if (config.DEBUG_MODE) {
    console.log(`[${config.APP_NAME}]:`, message, data || '');
  }
};
