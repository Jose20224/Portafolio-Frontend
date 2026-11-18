import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminLayout from './AdminLayout';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import AdminProjects from './AdminProjects';
import AdminMessages from './AdminMessages';
import AdminProfile from './AdminProfile';
import AdminAssets from './AdminAssets';
import './AdminStyles.css';

function ProtectedAdmin() {
  const { user, ready } = useAuth();
  const location = useLocation();
  if (!ready) return <div className="admin-loading"><span className="admin-spinner" /> Verificando sesión...</div>;
  if (!user) return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  return <AdminLayout />;
}

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="login" element={<AdminLogin />} />
      <Route element={<ProtectedAdmin />}>
        <Route index element={<AdminDashboard />} />
        <Route path="proyectos" element={<AdminProjects />} />
        <Route path="mensajes" element={<AdminMessages />} />
        <Route path="perfil" element={<AdminProfile />} />
        <Route path="archivos" element={<AdminAssets />} />
      </Route>
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}
