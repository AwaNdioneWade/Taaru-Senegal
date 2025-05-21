import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './shared/context/AuthContext';
import PublicLayout from './layouts/PublicLayout';
import Home from './client/pages/Home/Home';
import NotFound from './shared/pages/NotFound';
import { ClientLayout } from './layouts/ClientLayout';
import { TailorLayout } from './layouts/TailorLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { ProtectedRoute } from './shared/components/ProtectedRoute';
import Login from './shared/pages/auth/Login';
import Register from './shared/pages/auth/Register';

// Client Pages
import ClientHome from './client/pages/Home/Home';
import Galeries from './client/pages/Galeries/Galeries';

// Tailor Pages
import TailorDashboard from './tailor/pages/Dashboard';
import Orders from './tailor/pages/Orders';
import Gallery from './tailor/pages/Gallery';
import Profile from './tailor/pages/Profile';
import Trainings from './tailor/pages/Trainings';
import Clients from './tailor/pages/Clients';
import Messages from './tailor/pages/Messages';

// Admin Pages
import AdminDashboard from './admin/pages/Dashboard';

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<div>À propos</div>} />
          <Route path="/contact" element={<div>Contact</div>} />
        </Route>

        {/* Client Routes */}
        <Route path="/client">
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route
            element={
              <ProtectedRoute allowedRoles={['Client']}>
                <ClientLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<ClientHome />} />
            <Route path="galeries" element={<Galeries />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>

        {/* Tailor Routes */}
        <Route path="/tailor">
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route
            element={
              <ProtectedRoute allowedRoles={['Tailleur']}>
                <TailorLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<TailorDashboard />} />
            <Route path="dashboard" element={<TailorDashboard />} />
            <Route path="orders" element={<Orders />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="profile" element={<Profile />} />
            <Route path="trainings" element={<Trainings />} />
            <Route path="clients" element={<Clients />} />
            <Route path="messages" element={<Messages />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>

        {/* Admin Routes */}
        <Route path="/admin">
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route
            element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>

        {/* Fallback Routes */}
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
