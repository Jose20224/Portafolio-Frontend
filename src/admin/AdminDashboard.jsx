import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminDashboard() {
  const { request, user } = useAuth();
  const [stats, setStats] = useState({ projects: 0, published: 0, messages: 0, newMessages: 0 });
  const [recent, setRecent] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    Promise.all([
      request('/admin/portfolio/projects?page=1&limit=1'),
      request('/admin/portfolio/projects?page=1&limit=1&is_published=true'),
      request('/admin/contact-messages/stats'),
      request('/admin/contact-messages?page=1&limit=5'),
    ]).then(([all, published, messages, latest]) => {
      if (!active) return;
      setStats({ projects: all.pagination?.total ?? 0, published: published.pagination?.total ?? 0, messages: messages.total ?? 0, newMessages: messages.byStatus?.new ?? 0 });
      setRecent(latest.items || []);
    }).catch((err) => { if (active) setError(err.message); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [request]);

  const cards = [
    { label: 'Proyectos registrados', value: stats.projects, note: `${stats.published} publicados`, icon: '◇' },
    { label: 'Mensajes recibidos', value: stats.messages, note: `${stats.newMessages} sin revisar`, icon: '✉' },
    { label: 'Proyectos publicados', value: stats.published, note: 'Visibles en el sitio', icon: '↗' },
  ];

  return <div className="admin-page"><div className="admin-page-heading"><div><span className="admin-eyebrow">PANEL GENERAL</span><h1>Hola, {user?.displayName || 'bienvenido'}.</h1><p>Este es el estado actual de tu portafolio.</p></div><a href="/" target="_blank" rel="noreferrer" className="admin-button secondary">Abrir sitio público ↗</a></div>
    {error && <div className="admin-alert error">{error}</div>}
    <div className="admin-stats-grid">{cards.map((card) => <article className="admin-stat-card" key={card.label}><div className="admin-stat-top"><span>{card.label}</span><i>{card.icon}</i></div><strong>{loading ? '—' : card.value}</strong><small>{card.note}</small></article>)}</div>
    <div className="admin-dashboard-grid"><section className="admin-panel"><div className="admin-panel-heading"><div><h2>Mensajes recientes</h2><p>Últimas personas que se pusieron en contacto.</p></div><Link to="/admin/mensajes">Ver bandeja →</Link></div>{loading ? <div className="admin-empty">Cargando mensajes...</div> : recent.length ? <div className="admin-recent-list">{recent.map((item) => <div className="admin-recent-row" key={item.id}><span className={`admin-status-dot ${item.status}`} /><div><strong>{item.name}</strong><small>{item.subject || item.email}</small></div><time>{new Date(item.created_at).toLocaleDateString('es-NI')}</time></div>)}</div> : <div className="admin-empty">Todavía no hay mensajes.</div>}</section>
    <section className="admin-panel"><div className="admin-panel-heading"><div><h2>Accesos rápidos</h2><p>Administra el contenido de tu sitio.</p></div></div><div className="admin-quick-actions"><Link to="/admin/proyectos"><span>◇</span><div><strong>Gestionar proyectos</strong><small>Crear, editar y publicar proyectos</small></div><b>→</b></Link><Link to="/admin/perfil"><span>◎</span><div><strong>Editar perfil</strong><small>Actualizar la información principal</small></div><b>→</b></Link><Link to="/admin/archivos"><span>▧</span><div><strong>Biblioteca multimedia</strong><small>Administrar imágenes del portafolio</small></div><b>→</b></Link></div></section></div>
  </div>;
}
