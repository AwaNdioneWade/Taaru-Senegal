import { Route } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import Dashboard from '../admin/pages/Dashboard';
import NotFound from '../shared/pages/NotFound';
import Login from '../shared/pages/auth/Login';
import Register from '../shared/pages/auth/Register';
import { ProtectedRoute } from '../shared/components/ProtectedRoute';

export const AdminRoutes = () => {
  return (
    <>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route
        path="/"
        element={
          <ProtectedRoute allowedRoles={['Admin']}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </>
  );
}; 