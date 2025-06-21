import axios from 'axios';
import { API_ENDPOINTS, AXIOS_CONFIG, logError, logInfo } from '../../environnements/environnement';

export interface TailleurData {
  name: string;
  email: string;
  role: 'Tailleur';
  profile_name: string;
  prenom: string;
  telephone: string;
  specialite: 'homme' | 'femme' | 'enfant' | 'tous';
  experience: number;
  adresse: string;
  nom_atelier: string;
  photo?: string;
}

export interface Tailleur {
  id: string;
  name: string;
  email: string;
  email_verified_at: string | null;
  role: string;
  profile_name: string | null;
  slug: string | null;
  prenom: string | null;
  telephone: string | null;
  specialite: 'homme' | 'femme' | 'enfant' | 'tous' | null;
  experience: number | null;
  adresse: string | null;
  nom_atelier: string | null;
  photo?: string | null;
  created_at: string;
  updated_at: string;
  createdAt: string;
  updatedAt: string;
}

export interface TailleurListResponse {
  success: boolean;
  message: string;
  data: Tailleur[];
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
  };
}

export interface TailleurStatistics {
  total_tailleurs: number;
  specialites: Array<{ specialite: string; count: number }>;
  moyenne_experience: number;
  repartition_experience: {
    debutant: number;
    intermediaire: number;
    expert: number;
  };
}

export interface TailleurRegistrationResponse {
  success: boolean;
  message: string;
  user: Tailleur;
  temporary_password?: string;
}

// Fonction utilitaire pour obtenir la configuration avec token d'authentification
const getAuthConfig = () => {
  const token = localStorage.getItem('auth_token');
  console.log('Token récupéré:', token ? 'Token présent' : 'Aucun token');
  
  const config = {
    ...AXIOS_CONFIG,
    headers: {
      ...AXIOS_CONFIG.headers,
      ...(token && { 'Authorization': `Bearer ${token}` })
    }
  };
  
  console.log('Configuration avec headers:', config.headers);
  return config;
};

// Inscription d'un nouveau tailleur
export async function registerTailleur(data: TailleurData): Promise<TailleurRegistrationResponse> {
  try {
    logInfo('Tentative d\'inscription tailleur', { email: data.email, atelier: data.nom_atelier });
    const response = await axios.post(API_ENDPOINTS.ADMIN.CREATE_USER, data, getAuthConfig());
    logInfo('Inscription tailleur réussie', { email: data.email });
    return response.data;
  } catch (error) {
    logError(error, 'Erreur lors de l\'inscription du tailleur');
    throw error;
  }
}

// Récupérer tous les tailleurs avec pagination et filtres
export async function getTailleurs(params?: {
  search?: string;
  specialite?: string;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
  per_page?: number;
  page?: number;
}): Promise<TailleurListResponse> {
  try {
    logInfo('Récupération de la liste des tailleurs', params);
    const response = await axios.get(API_ENDPOINTS.TAILLEURS.LIST, {
      ...getAuthConfig(),
      params
    });
    logInfo('Liste des tailleurs récupérée', { count: response.data.data?.length });
    return response.data;
  } catch (error) {
    logError(error, 'Erreur lors de la récupération des tailleurs');
    throw error;
  }
}

// Récupérer un tailleur par ID
export async function getTailleur(id: string) {
  try {
    logInfo('Récupération du tailleur', { id });
    const response = await axios.get(API_ENDPOINTS.TAILLEURS.SHOW(id), getAuthConfig());
    logInfo('Tailleur récupéré', { id });
    return response.data;
  } catch (error) {
    logError(error, 'Erreur lors de la récupération du tailleur');
    throw error;
  }
}

// Mettre à jour un tailleur
export async function updateTailleur(id: string, data: Partial<TailleurData>) {
  try {
    logInfo('Mise à jour du tailleur', { id });
    const response = await axios.put(API_ENDPOINTS.TAILLEURS.UPDATE(id), data, getAuthConfig());
    logInfo('Tailleur mis à jour', { id });
    return response.data;
  } catch (error) {
    logError(error, 'Erreur lors de la mise à jour du tailleur');
    throw error;
  }
}

// Supprimer un tailleur
export async function deleteTailleur(id: string) {
  try {
    logInfo('Suppression du tailleur', { id });
    const response = await axios.delete(API_ENDPOINTS.TAILLEURS.DELETE(id), getAuthConfig());
    logInfo('Tailleur supprimé', { id });
    return response.data;
  } catch (error) {
    logError(error, 'Erreur lors de la suppression du tailleur');
    throw error;
  }
}

// Récupérer les statistiques des tailleurs
export async function getTailleurStatistics(): Promise<{ success: boolean; message: string; data: TailleurStatistics }> {
  try {
    logInfo('Récupération des statistiques des tailleurs');
    const response = await axios.get(`${API_ENDPOINTS.TAILLEURS.LIST}/statistics`, getAuthConfig());
    logInfo('Statistiques des tailleurs récupérées');
    return response.data;
  } catch (error) {
    logError(error, 'Erreur lors de la récupération des statistiques');
    throw error;
  }
} 