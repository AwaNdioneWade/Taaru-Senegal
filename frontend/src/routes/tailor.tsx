import { Route } from 'react-router-dom';
import TailorLayout from '../layouts/TailorLayout';
import Dashboard from '../tailor/pages/Dashboard';
import Orders from '../tailor/pages/Orders';
import Gallery from '../tailor/pages/Gallery';
import Profile from '../tailor/pages/Profile';
import Trainings from '../tailor/pages/Trainings';
import Clients from '../tailor/pages/Clients';
import Messages from '../tailor/pages/Messages';
import NotFound from '../shared/pages/NotFound';
import Login from '../shared/pages/auth/Login';
import Register from '../shared/pages/auth/Register';
import { ProtectedRoute } from '../shared/components/ProtectedRoute';

export const TailorRoutes = () => {
  return (
    <>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route
        path="/"
        element={
          <ProtectedRoute allowedRoles={['tailleur']}>
            <TailorLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="orders" element={<Orders />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="profile" element={<Profile />} />
        <Route path="trainings" element={<Trainings />} />
        <Route path="clients" element={<Clients />} />
        <Route path="messages" element={<Messages />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </>
  );
}; 