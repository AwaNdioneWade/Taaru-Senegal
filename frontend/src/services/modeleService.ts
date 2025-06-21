import axios from 'axios';
import { logError, logInfo } from '../../environnements/environnement';

// Temporairement, l'URL est définie ici. Idéalement, elle proviendrait du fichier d'environnement.
const API_URL = 'http://localhost:8000/api/modeles';

// Configuration Axios avec le token d'authentification
const getAxiosConfig = () => {
  const token = localStorage.getItem('auth_token');
  
  console.log('Token récupéré dans modeleService:', token ? 'Token présent' : 'Aucun token');
  
  if (!token) {
    logError(new Error('Token d\'authentification non trouvé'), 'Authorization');
    throw new Error('Utilisateur non authentifié');
  }

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
  const token = localStorage.getItem('auth_token');
  
  if (!token) {
    logError(new Error('Token d\'authentification non trouvé'), 'Authorization');
    throw new Error('Utilisateur non authentifié');
  }

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
 */
export async function getModeles(params?: {
  search?: string;
  type?: string;
  statut?: string;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
  per_page?: number;
  page?: number;
}): Promise<ModeleListResponse> {
  try {
    logInfo('Récupération de la liste des modèles', params);
    const response = await axios.get(API_URL, {
      ...getJsonConfig(),
      params
    });
    logInfo('Liste des modèles récupérée', { count: response.data.data?.length });
    return response.data;
  } catch (error) {
    logError(error, 'Erreur lors de la récupération des modèles');
    throw error;
  }
}

/**
 * Récupère un modèle spécifique par ID
 */
export async function getModele(id: string): Promise<ModeleResponse> {
  try {
    logInfo('Récupération du modèle', { id });
    const response = await axios.get(`${API_URL}/${id}`, getJsonConfig());
    logInfo('Modèle récupéré', { id });
    return response.data;
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
    logInfo('Tentative de création d\'un nouveau modèle');
    const response = await axios.post(API_URL, formData, getAxiosConfig());
    logInfo('Modèle créé avec succès', { modeleId: response.data.data.id });
    return response.data;
  } catch (error) {
    logError(error, 'Erreur lors de la création du modèle');
    throw error;
  }
} 