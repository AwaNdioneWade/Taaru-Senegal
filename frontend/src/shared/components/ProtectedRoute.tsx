import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    // Affiche un loader ou rien le temps de restaurer l'auth
    return <div>Chargement...</div>;
  }

  if (!isAuthenticated) {
    // Rediriger vers la page de connexion appropriée
    const currentPath = location.pathname;
    let loginPath = '/login';
    
    if (currentPath.startsWith('/admin')) {
      loginPath = '/admin/login';
    } else if (currentPath.startsWith('/tailor')) {
      loginPath = '/tailor/login';
    }

    return <Navigate to={loginPath} state={{ from: location }} replace />;
  }

  if (allowedRoles && user) {
    const userRole = user.role.toLowerCase();
    const hasAllowedRole = allowedRoles.some(role => role.toLowerCase() === userRole);
    
    if (!hasAllowedRole) {
      // Rediriger vers la page d'accueil appropriée selon le rôle
      switch (userRole) {
        case 'admin':
          return <Navigate to="/admin" replace />;
        case 'tailleur':
          return <Navigate to="/tailor" replace />;
        default:
          return <Navigate to="/" replace />;
      }
    }
  }

  return <>{children}</>;
} 