import axios from 'axios';
import { API_ENDPOINTS, AXIOS_CONFIG, logInfo, logError } from '../../environnements/environnement';

export async function testApiConnection() {
  try {
    logInfo('Test de connexion à l\'API...');
    
    // Test simple de connectivité
    const response = await axios.get(`${API_ENDPOINTS.AUTH.REGISTER.replace('/register', '')}`, {
      ...AXIOS_CONFIG,
      timeout: 5000, // Timeout court pour le test
    });
    
    logInfo('Connexion API réussie', { status: response.status });
    return { success: true, status: response.status };
  } catch (error) {
    logError(error, 'Erreur de connexion API');
    
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        return { success: false, error: 'Timeout - Le serveur ne répond pas' };
      }
      if (error.response) {
        return { success: false, error: `Erreur ${error.response.status}: ${error.response.statusText}` };
      }
      if (error.request) {
        return { success: false, error: 'Aucune réponse du serveur' };
      }
    }
    
    return { success: false, error: 'Erreur inconnue' };
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