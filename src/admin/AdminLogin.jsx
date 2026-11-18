import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AdminStyles.css';

export default function AdminLogin() {
  const { user, login, ready } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  if (ready && user) return <Navigate to="/admin" replace />;

  const submit = async (event) => {
    event.preventDefault(); setError(''); setBusy(true);
    try { await login(email, password); navigate(location.state?.from || '/admin', { replace: true }); }
    catch (err) { setError(err.message || 'No fue posible iniciar sesión.'); }
    finally { setBusy(false); }
  };

  return <div className="admin-login-page"><div className="admin-login-decoration" /><div className="admin-login-card"><Link to="/" className="admin-login-back">← Volver al portafolio</Link><div className="admin-login-brand"><span className="admin-brand-mark">JM</span><div><strong>PORTAFOLIO</strong><small>ADMINISTRACIÓN</small></div></div><span className="admin-eyebrow">ACCESO PRIVADO</span><h1>Bienvenido de nuevo</h1><p>Inicia sesión con tu cuenta autorizada para administrar el contenido de tu portafolio.</p>{error && <div className="admin-alert error">{error}</div>}<form onSubmit={submit} className="admin-form"><label>Correo electrónico<input type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="correo@ejemplo.com" required /></label><label>Contraseña<input type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Tu contraseña" required minLength={8} /></label><button className="admin-button primary full" disabled={busy}>{busy ? 'Validando acceso...' : 'Iniciar sesión'} <span>→</span></button></form><div className="admin-login-foot">El acceso está limitado a usuarios administrativos habilitados.</div></div></div>;
}
