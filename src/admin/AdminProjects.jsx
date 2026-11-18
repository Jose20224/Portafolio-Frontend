import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const emptyForm = { category_id: '', slug: '', title: '', short_description: '', full_description: '', card_image_path: '', cover_image_path: '', live_url: '', github_url: '', year: new Date().getFullYear(), role: '', status: 'completed', is_featured: false, sort_order: 0 };

export default function AdminProjects() {
  const { request } = useAuth();
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryForm, setCategoryForm] = useState({ name: '', slug: '', label: '', description: '' });
  const [filters, setFilters] = useState({ is_published: '', status: '' });
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const load = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const query = new URLSearchParams({ page: '1', limit: '100' });
      if (filters.is_published !== '') query.set('is_published', filters.is_published);
      if (filters.status) query.set('status', filters.status);
      const [projectResult, categoryResult] = await Promise.all([
        request(`/admin/portfolio/projects?${query}`),
        request('/admin/portfolio/categories'),
      ]);
      setProjects(projectResult.items || []); setCategories(categoryResult || []);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }, [request, filters]);
  useEffect(() => { load(); }, [load]);

  const openNew = () => { setEditing('new'); setForm({ ...emptyForm, category_id: categories.find((c) => c.is_active)?.id || categories[0]?.id || '' }); setError(''); };
  const openEdit = async (project) => {
    setBusy(true); setError('');
    try {
      const full = await request(`/admin/portfolio/projects/${project.id}`);
      setEditing(full.id);
      setForm({ ...emptyForm, ...full, category_id: full.category_id || full.category?.id || '', short_description: full.short_description || '', full_description: full.full_description || '', card_image_path: full.card_image_path || '', cover_image_path: full.cover_image_path || '', live_url: full.live_url || '', github_url: full.github_url || '', year: full.year || '', role: full.role || '' });
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  };
  const closeModal = () => setEditing(null);
  const updateField = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const save = async (event) => {
    event.preventDefault(); setBusy(true); setError(''); setNotice('');
    const payload = {
      category_id: form.category_id, slug: form.slug.trim(), title: form.title.trim(),
      short_description: form.short_description, full_description: form.full_description,
      card_image_path: form.card_image_path.trim() || null, cover_image_path: form.cover_image_path.trim() || null,
      live_url: form.live_url.trim() || null, github_url: form.github_url.trim() || null,
      year: form.year === '' ? null : Number(form.year), role: form.role.trim() || null,
      status: form.status, is_featured: Boolean(form.is_featured), sort_order: Number(form.sort_order || 0),
    };
    try {
      if (editing === 'new') await request('/admin/portfolio/projects', { method: 'POST', body: payload });
      else await request(`/admin/portfolio/projects/${editing}`, { method: 'PATCH', body: payload });
      closeModal(); setNotice('Proyecto guardado correctamente.'); await load();
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  };

  const createCategory = async (event) => {
    event.preventDefault(); setBusy(true); setError(''); setNotice('');
    try {
      await request('/admin/portfolio/categories', { method: 'POST', body: { ...categoryForm, sort_order: categories.length, is_active: true } });
      setCategoryForm({ name: '', slug: '', label: '', description: '' });
      setNotice('Categoría creada correctamente.'); await load();
    } catch (err) { setError(err.message); } finally { setBusy(false); }
  };
  const toggleCategory = async (category) => {
    setBusy(true); setError('');
    try { await request(`/admin/portfolio/categories/${category.id}`, { method: 'PATCH', body: { is_active: !category.is_active } }); await load(); }
    catch (err) { setError(err.message); } finally { setBusy(false); }
  };
  const deleteCategory = async (category) => {
    if (!window.confirm(`¿Eliminar la categoría ${category.name}?`)) return;
    setBusy(true); setError('');
    try { await request(`/admin/portfolio/categories/${category.id}`, { method: 'DELETE' }); setNotice('Categoría eliminada.'); await load(); }
    catch (err) { setError(err.message); } finally { setBusy(false); }
  };

  const changePublication = async (project) => {
    setBusy(true); setError('');
    try { await request(`/admin/portfolio/projects/${project.id}/${project.is_published ? 'unpublish' : 'publish'}`, { method: 'POST' }); setNotice(project.is_published ? 'Proyecto retirado de publicación.' : 'Proyecto publicado correctamente.'); await load(); }
    catch (err) { setError(err.message); } finally { setBusy(false); }
  };
  const remove = async (project) => {
    if (!window.confirm(`¿Eliminar el proyecto «${project.title}»? Esta acción no se puede deshacer.`)) return;
    setBusy(true); setError('');
    try { await request(`/admin/portfolio/projects/${project.id}`, { method: 'DELETE' }); setNotice('Proyecto eliminado.'); await load(); }
    catch (err) { setError(err.message); } finally { setBusy(false); }
  };

  return <div className="admin-page"><div className="admin-page-heading"><div><span className="admin-eyebrow">CONTENIDO</span><h1>Proyectos</h1><p>Organiza los trabajos que aparecen en tu portafolio.</p></div><button className="admin-button primary" onClick={openNew}>＋ Nuevo proyecto</button></div>
    {error && !editing && <div className="admin-alert error">{error}</div>}{notice && <div className="admin-alert success">{notice}</div>}
    <div className="admin-toolbar"><label>Publicación<select value={filters.is_published} onChange={(e) => setFilters((v) => ({ ...v, is_published: e.target.value }))}><option value="">Todos</option><option value="true">Publicados</option><option value="false">Borradores</option></select></label><label>Estado<select value={filters.status} onChange={(e) => setFilters((v) => ({ ...v, status: e.target.value }))}><option value="">Todos</option><option value="in_progress">En progreso</option><option value="completed">Completados</option><option value="archived">Archivados</option></select></label><span className="admin-toolbar-count">{projects.length} proyectos</span></div>
    <section className="admin-panel"><div className="admin-panel-heading"><div><h2>Categorías</h2><p>Las categorías activas se pueden asignar a los proyectos publicados.</p></div></div><form className="admin-inline-form" onSubmit={createCategory}><input value={categoryForm.name} onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })} placeholder="Nombre" required maxLength="100" /><input value={categoryForm.slug} onChange={(e) => setCategoryForm({ ...categoryForm, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })} placeholder="slug-de-categoria" required pattern="[a-z0-9]+(-[a-z0-9]+)*" maxLength="100" /><input value={categoryForm.label} onChange={(e) => setCategoryForm({ ...categoryForm, label: e.target.value })} placeholder="Etiqueta pública" required maxLength="100" /><button className="admin-button primary" disabled={busy}>Crear</button></form><div className="admin-manage-list">{categories.map((category) => <div className="admin-manage-row" key={category.id}><div><strong>{category.label || category.name}</strong><small>/{category.slug}</small></div><label className="admin-check"><input type="checkbox" checked={Boolean(category.is_active)} onChange={() => toggleCategory(category)} disabled={busy} /> Activa</label><button className="admin-actions-button danger" onClick={() => deleteCategory(category)} disabled={busy}>Eliminar</button></div>)}</div></section>
    <section className="admin-panel admin-table-panel">{loading ? <div className="admin-empty">Cargando proyectos...</div> : projects.length ? <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Proyecto</th><th>Categoría</th><th>Estado</th><th>Visibilidad</th><th>Acciones</th></tr></thead><tbody>{projects.map((project) => <tr key={project.id}><td><div className="admin-project-cell"><span className="admin-project-thumb">{project.title?.slice(0, 1)}</span><span><strong>{project.title}</strong><small>/{project.slug}</small></span></div></td><td>{project.category?.label || project.category?.name || '—'}</td><td><span className={`admin-pill ${project.status}`}>{project.status === 'completed' ? 'Completado' : project.status === 'archived' ? 'Archivado' : 'En progreso'}</span></td><td><span className={`admin-pill ${project.is_published ? 'published' : 'draft'}`}>{project.is_published ? 'Publicado' : 'Borrador'}</span></td><td><div className="admin-actions"><button onClick={() => openEdit(project)} disabled={busy}>Editar</button><button onClick={() => changePublication(project)} disabled={busy}>{project.is_published ? 'Retirar' : 'Publicar'}</button><button className="danger" onClick={() => remove(project)} disabled={busy}>Eliminar</button></div></td></tr>)}</tbody></table></div> : <div className="admin-empty">No hay proyectos con estos filtros. Crea el primero para comenzar.</div>}</section>
    {editing && <div className="admin-modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) closeModal(); }}><section className="admin-modal"><div className="admin-modal-heading"><div><span className="admin-eyebrow">EDITOR DE CONTENIDO</span><h2>{editing === 'new' ? 'Nuevo proyecto' : 'Editar proyecto'}</h2></div><button className="admin-icon-button" onClick={closeModal}>×</button></div>{error && <div className="admin-alert error">{error}</div>}<form className="admin-form admin-form-grid" onSubmit={save}><label className="span-2">Título<input value={form.title} onChange={(e) => updateField('title', e.target.value)} maxLength="160" required /></label><label>Slug<input value={form.slug} onChange={(e) => updateField('slug', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))} maxLength="120" pattern="[a-z0-9]+(-[a-z0-9]+)*" required /></label><label>Categoría<select value={form.category_id} onChange={(e) => updateField('category_id', e.target.value)} required><option value="">Selecciona una categoría</option>{categories.filter((c) => c.is_active).map((c) => <option key={c.id} value={c.id}>{c.label || c.name}</option>)}</select></label><label className="span-2">Descripción breve<textarea rows="2" value={form.short_description} onChange={(e) => updateField('short_description', e.target.value)} maxLength="500" required /></label><label className="span-2">Descripción completa<textarea rows="5" value={form.full_description} onChange={(e) => updateField('full_description', e.target.value)} maxLength="10000" required /></label><label>Estado<select value={form.status} onChange={(e) => updateField('status', e.target.value)}><option value="in_progress">En progreso</option><option value="completed">Completado</option><option value="archived">Archivado</option></select></label><label>Año<input type="number" min="1900" max="2100" value={form.year} onChange={(e) => updateField('year', e.target.value)} /></label><label>Rol en el proyecto<input value={form.role} onChange={(e) => updateField('role', e.target.value)} maxLength="120" /></label><label>Orden<input type="number" min="0" value={form.sort_order} onChange={(e) => updateField('sort_order', e.target.value)} /></label><label className="span-2">Imagen de tarjeta (ruta de biblioteca)<input value={form.card_image_path} onChange={(e) => updateField('card_image_path', e.target.value)} placeholder="projects/imagen.webp" /></label><label className="span-2">Imagen de portada (ruta de biblioteca)<input value={form.cover_image_path} onChange={(e) => updateField('cover_image_path', e.target.value)} placeholder="projects/portada.webp" /></label><label>URL del proyecto<input type="url" value={form.live_url} onChange={(e) => updateField('live_url', e.target.value)} placeholder="https://..." /></label><label>Repositorio GitHub<input type="url" value={form.github_url} onChange={(e) => updateField('github_url', e.target.value)} placeholder="https://github.com/..." /></label><label className="admin-check span-2"><input type="checkbox" checked={Boolean(form.is_featured)} onChange={(e) => updateField('is_featured', e.target.checked)} /> Destacar en la página principal</label><div className="admin-modal-actions span-2"><button type="button" className="admin-button secondary" onClick={closeModal}>Cancelar</button><button className="admin-button primary" disabled={busy}>{busy ? 'Guardando...' : 'Guardar proyecto'}</button></div></form><p className="admin-form-note">Los proyectos nuevos se guardan como borrador. Puedes publicarlos desde el listado cuando estén listos.</p></section></div>}
  </div>;
}
