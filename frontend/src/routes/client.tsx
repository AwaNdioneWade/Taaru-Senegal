import { Route } from 'react-router-dom';
import { ClientLayout } from '../layouts/ClientLayout';
import Home from '../client/pages/Home/Home';
import Galeries from '../client/pages/Galeries/Galeries';
import NotFound from '../shared/pages/NotFound';
import Login from '../shared/pages/auth/Login';
import Register from '../shared/pages/auth/Register';
import { ProtectedRoute } from '../shared/components/ProtectedRoute';

export const ClientRoutes = () => {
  return (
    <>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route
        path="/"
        element={
          <ProtectedRoute allowedRoles={['Client']}>
            <ClientLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Home />} />
        <Route path="galeries" element={<Galeries />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </>
  );
}; 