import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

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

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Rediriger vers la page d'accueil appropriée selon le rôle
    switch (user.role) {
      case 'Admin':
        return <Navigate to="/admin" replace />;
      case 'Tailleur':
        return <Navigate to="/tailor" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
} 