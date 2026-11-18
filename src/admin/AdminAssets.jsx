import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const folders = [{ id: 'profile', label: 'Perfil' }, { id: 'projects', label: 'Proyectos' }, { id: 'collaborators', label: 'Colaboradores' }];
const accepted = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif'];

export default function AdminAssets() {
  const { request } = useAuth();
  const [folder, setFolder] = useState('projects');
  const [items, setItems] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const load = useCallback(async () => { setLoading(true); setError(''); try { const result = await request(`/admin/storage/objects?folder=${folder}&limit=100&offset=0`); setItems(result.items || []); } catch (err) { setError(err.message); } finally { setLoading(false); } }, [request, folder]);
  useEffect(() => { load(); }, [load]);
  const upload = async (event) => {
    event.preventDefault(); if (!file) return; setBusy(true); setError(''); setNotice('');
    try {
      if (!accepted.includes(file.type)) throw new Error('Formato no permitido. Usa JPG, PNG, WEBP, AVIF o GIF.');
      if (file.size > 8 * 1024 * 1024) throw new Error('La imagen supera el límite de 8 MB.');
      const signed = await request('/admin/storage/upload-url', { method: 'POST', body: { area: folder, fileName: file.name, contentType: file.type, size: file.size } });
      const response = await fetch(signed.signedUrl, { method: 'PUT', headers: { 'Content-Type': file.type, 'x-upsert': 'false' }, body: file });
      if (!response.ok) throw new Error('Supabase Storage rechazó la carga de la imagen.');
      await request('/admin/storage/confirm-upload', { method: 'POST', body: { path: signed.path } });
      setFile(null); event.target.reset(); setNotice(`Imagen cargada. Ruta: ${signed.path}`); await load();
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  };
  const remove = async (item) => { if (!window.confirm(`¿Eliminar ${item.name}?`)) return; setBusy(true); setError(''); try { await request('/admin/storage/objects', { method: 'DELETE', body: { path: item.path } }); setNotice('Imagen eliminada.'); await load(); } catch (err) { setError(err.message); } finally { setBusy(false); } };
  const copy = async (path) => { try { await navigator.clipboard.writeText(path); setNotice(`Ruta copiada: ${path}`); } catch { setNotice(path); } };

  return <div className="admin-page"><div className="admin-page-heading"><div><span className="admin-eyebrow">RECURSOS DEL SITIO</span><h1>Biblioteca multimedia</h1><p>Sube y administra las imágenes almacenadas en el bucket público del portafolio.</p></div></div>{error && <div className="admin-alert error">{error}</div>}{notice && <div className="admin-alert success">{notice}</div>}
    <section className="admin-panel admin-upload-panel"><div><h2>Subir una imagen</h2><p>Formatos JPG, PNG, WEBP, AVIF o GIF. Tamaño máximo: 8 MB.</p></div><form className="admin-upload-form" onSubmit={upload}><select value={folder} onChange={(e) => setFolder(e.target.value)}>{folders.map((f) => <option key={f.id} value={f.id}>{f.label}</option>)}</select><input type="file" accept="image/jpeg,image/png,image/webp,image/avif,image/gif" onChange={(e) => setFile(e.target.files?.[0] || null)} required /><button className="admin-button primary" disabled={busy || !file}>{busy ? 'Subiendo...' : 'Subir imagen'}</button></form></section>
    <div className="admin-toolbar"><label>Carpeta<select value={folder} onChange={(e) => setFolder(e.target.value)}>{folders.map((f) => <option key={f.id} value={f.id}>{f.label}</option>)}</select></label><span className="admin-toolbar-count">{items.length} archivos</span></div>
    {loading ? <div className="admin-empty">Cargando biblioteca...</div> : items.length ? <div className="admin-assets-grid">{items.map((item) => <article className="admin-asset-card" key={item.path}><img src={item.publicUrl} alt={item.name} loading="lazy" /><div><strong title={item.name}>{item.name}</strong><small>{(item.size / 1024).toFixed(0)} KB · {item.contentType || 'Imagen'}</small><div className="admin-actions"><button onClick={() => copy(item.path)}>Copiar ruta</button><button className="danger" disabled={busy} onClick={() => remove(item)}>Eliminar</button></div></div></article>)}</div> : <div className="admin-panel admin-empty">No hay imágenes en esta carpeta.</div>}
  </div>;
}
