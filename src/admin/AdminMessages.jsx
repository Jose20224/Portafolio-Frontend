import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const statusLabels = { new: 'Nuevo', read: 'Leído', replied: 'Respondido', archived: 'Archivado' };

export default function AdminMessages() {
  const { request } = useAuth();
  const [stats, setStats] = useState({ total: 0, byStatus: {} });
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const params = new URLSearchParams({ page: '1', limit: '50' });
      if (filter) params.set('status', filter);
      if (search.trim()) params.set('q', search.trim());
      const [list, counts] = await Promise.all([request(`/admin/contact-messages?${params}`), request('/admin/contact-messages/stats')]);
      setItems(list.items || []); setStats(counts);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }, [request, filter, search]);
  useEffect(() => { const t = setTimeout(load, 200); return () => clearTimeout(t); }, [load]);

  const updateStatus = async (id, status) => {
    setBusy(true); setError('');
    try { const updated = await request(`/admin/contact-messages/${id}/status`, { method: 'PATCH', body: { status } }); setSelected(updated); await load(); }
    catch (err) { setError(err.message); }
    finally { setBusy(false); }
  };

  return <div className="admin-page"><div className="admin-page-heading"><div><span className="admin-eyebrow">COMUNICACIÓN</span><h1>Mensajes</h1><p>Revisa y organiza los mensajes recibidos desde el formulario público.</p></div></div>{error && <div className="admin-alert error">{error}</div>}
    <div className="admin-message-stats"><div><span>Total</span><strong>{stats.total}</strong></div><div><span>Nuevos</span><strong>{stats.byStatus?.new || 0}</strong></div><div><span>Leídos</span><strong>{stats.byStatus?.read || 0}</strong></div><div><span>Respondidos</span><strong>{stats.byStatus?.replied || 0}</strong></div><div><span>Archivados</span><strong>{stats.byStatus?.archived || 0}</strong></div></div>
    <div className="admin-messages-layout"><section className="admin-panel admin-inbox"><div className="admin-inbox-tools"><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar por nombre, correo o asunto..." /><select value={filter} onChange={(e) => setFilter(e.target.value)}><option value="">Todos los estados</option>{Object.entries(statusLabels).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select></div>{loading ? <div className="admin-empty">Cargando bandeja...</div> : items.length ? items.map((item) => <button className={`admin-message-row ${selected?.id === item.id ? 'selected' : ''}`} key={item.id} onClick={() => setSelected(item)}><span className={`admin-status-dot ${item.status}`} /><span className="admin-message-main"><strong>{item.name}</strong><small>{item.subject || 'Sin asunto'}</small><small>{item.email}</small></span><time>{new Date(item.created_at).toLocaleDateString('es-NI')}</time></button>) : <div className="admin-empty">No se encontraron mensajes.</div>}</section>
    <section className="admin-panel admin-message-detail">{selected ? <><div className="admin-detail-heading"><div><span className={`admin-pill ${selected.status}`}>{statusLabels[selected.status]}</span><time>{new Date(selected.created_at).toLocaleString('es-NI')}</time></div><button className="admin-icon-button" onClick={() => setSelected(null)}>×</button></div><h2>{selected.subject || 'Mensaje sin asunto'}</h2><div className="admin-sender"><span className="admin-avatar">{selected.name.slice(0, 1).toUpperCase()}</span><div><strong>{selected.name}</strong><a href={`mailto:${selected.email}`}>{selected.email}</a></div></div><div className="admin-message-body">{selected.message}</div><div className="admin-detail-actions"><a className="admin-button secondary" href={`mailto:${selected.email}?subject=${encodeURIComponent(`Re: ${selected.subject || 'Tu mensaje'}`)}`}>Responder por correo ↗</a><label>Cambiar estado<select value={selected.status} disabled={busy} onChange={(e) => updateStatus(selected.id, e.target.value)}>{Object.entries(statusLabels).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select></label></div><p className="admin-form-note">Marcar un mensaje como “Respondido” solo actualiza su estado; el backend no envía correos electrónicos.</p></> : <div className="admin-empty admin-empty-centered"><span>✉</span><strong>Selecciona un mensaje</strong><p>El contenido del mensaje aparecerá aquí.</p></div>}</section></div>
  </div>;
}
