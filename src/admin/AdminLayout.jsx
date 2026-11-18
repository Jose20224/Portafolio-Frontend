import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const links = [
  { to: '/admin', label: 'Resumen', icon: '▦', end: true },
  { to: '/admin/proyectos', label: 'Proyectos', icon: '◇' },
  { to: '/admin/mensajes', label: 'Mensajes', icon: '✉' },
  { to: '/admin/perfil', label: 'Perfil público', icon: '◎' },
  { to: '/admin/archivos', label: 'Biblioteca', icon: '▧' },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const closeSession = async () => { try { await logout(); } finally { navigate('/admin/login', { replace: true }); } };
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand"><span className="admin-brand-mark">JM</span><span><strong>PORTAFOLIO</strong><small>Panel de administración</small></span></div>
        <div className="admin-nav-label">GESTIÓN</div>
        <nav className="admin-nav">
          {links.map((link) => <NavLink key={link.to} to={link.to} end={link.end} className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}><span className="admin-nav-icon">{link.icon}</span>{link.label}</NavLink>)}
        </nav>
        <div className="admin-sidebar-bottom"><div className="admin-user"><span className="admin-avatar">{(user?.displayName || user?.email || 'A').slice(0, 1).toUpperCase()}</span><span><strong>{user?.displayName || 'Administrador'}</strong><small>{user?.role === 'owner' ? 'Propietario' : 'Editor'}</small></span></div><button className="admin-logout" onClick={closeSession}>↗ Cerrar sesión</button></div>
      </aside>
      <main className="admin-main"><header className="admin-topbar"><div><span className="admin-topbar-kicker">ESPACIO DE TRABAJO</span><strong>Administración del portafolio</strong></div><a href="/" target="_blank" rel="noreferrer" className="admin-public-link">Ver sitio público ↗</a></header><div className="admin-content"><Outlet /></div></main>
    </div>
  );
}
