import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './AdminProjectStyles.css';

const blankProject = () => ({
  category_id: '', slug: '', title: '', short_description: '', full_description: '',
  card_image_path: '', cover_image_path: '', live_url: '', github_url: '',
  year: new Date().getFullYear(), role: '', status: 'in_progress',
  is_featured: false, sort_order: 0,
});

const blankTechnology = () => ({ name: '', role: '' });
const blankHighlight = () => ({ content: '' });
const blankCollaborator = () => ({ name: '', role: '', avatar_path: '', github_url: '', linkedin_url: '' });

const childConfig = {
  technologies: ['name', 'role', 'sort_order'],
  highlights: ['content', 'sort_order'],
  collaborators: ['name', 'role', 'avatar_path', 'github_url', 'linkedin_url', 'sort_order'],
};

function slugify(text) {
  return String(text).normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 120);
}

function pickChildFields(kind, entry, position) {
  const result = { sort_order: position };
  for (const field of childConfig[kind]) {
    if (field === 'sort_order') continue;
    const value = String(entry[field] ?? '').trim();
    // The backend accepts null for optional URL / image / role fields.
    result[field] = value || (field === 'name' || field === 'content' ? '' : null);
  }
  return result;
}

function samePayload(current, desired) {
  return Object.entries(desired).every(([key, value]) => (current[key] ?? null) === value);
}

function Field({ children, label, hint, className = '' }) {
  return <label className={className}>{label}{children}{hint && <small className="ap-help">{hint}</small>}</label>;
}

function Optional({ children }) {
  return <span className="ap-optional">{children || 'Opcional'}</span>;
}

function EditorSection({ icon, title, description, children, badge }) {
  return <section className="ap-editor-section">
    <header className="ap-section-heading">
      <span className="material-symbols-outlined ap-section-icon">{icon}</span>
      <div><h3>{title} {badge && <span className="ap-section-count">{badge}</span>}</h3><p>{description}</p></div>
    </header>
    {children}
  </section>;
}

function ProjectEditor({ project, categories, request, onClose, onSaved }) {
  const [projectId, setProjectId] = useState(project?.id || null);
  const [form, setForm] = useState(() => ({ ...blankProject(), category_id: categories.find((c) => c.is_active)?.id || '' }));
  const [technologies, setTechnologies] = useState([blankTechnology()]);
  const [highlights, setHighlights] = useState([]);
  const [collaborators, setCollaborators] = useState([]);
  const [hasTeam, setHasTeam] = useState(false);
  const [originalChildren, setOriginalChildren] = useState({ technologies: [], highlights: [], collaborators: [] });
  const [assets, setAssets] = useState([]);
  const [loadingImages, setLoadingImages] = useState(false);
  const [showImages, setShowImages] = useState(false);
  const [imageField, setImageField] = useState('card_image_path');
  const [loading, setLoading] = useState(Boolean(project?.id));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [needsReload, setNeedsReload] = useState(false);
  const [slugEdited, setSlugEdited] = useState(Boolean(project?.id));

  useEffect(() => {
    if (!project?.id) return;
    let mounted = true;
    request(`/admin/portfolio/projects/${project.id}`).then((full) => {
      if (!mounted) return;
      setForm({ ...blankProject(), ...full,
        category_id: full.category_id || full.category?.id || '',
        card_image_path: full.card_image_path || '', cover_image_path: full.cover_image_path || '',
        live_url: full.live_url || '', github_url: full.github_url || '',
        year: full.year ?? '', role: full.role || '',
      });
      const tech = Array.isArray(full.technologies) ? full.technologies : [];
      const hi = Array.isArray(full.highlights) ? full.highlights : [];
      const collab = Array.isArray(full.collaborators) ? full.collaborators : [];
      setTechnologies(tech.length ? tech : [blankTechnology()]);
      setHighlights(hi);
      setCollaborators(collab);
      setHasTeam(collab.length > 0);
      setOriginalChildren({ technologies: tech, highlights: hi, collaborators: collab });
    }).catch((err) => { if (mounted) setError(err.message); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, [project?.id, request]);

  const set = (field, value) => setForm((current) => ({ ...current, [field]: value }));
  const updateArray = (setter, index, key, value) => setter((items) => items.map((item, i) => i === index ? { ...item, [key]: value } : item));
  const removeArray = (setter, index) => setter((items) => items.filter((_, i) => i !== index));
  const moveTechnology = (index, delta) => setTechnologies((items) => {
    const next = [...items];
    const target = index + delta;
    if (target < 0 || target >= next.length) return items;
    [next[index], next[target]] = [next[target], next[index]];
    return next;
  });

  const chooseImage = async (field) => {
    setImageField(field); setShowImages(true); setError('');
    setLoadingImages(true);
    try {
      const result = await request('/admin/storage/objects?folder=projects&limit=100&offset=0');
      setAssets(result.items || []);
    } catch (err) { setError(`No se pudo cargar la biblioteca: ${err.message}`); }
    finally { setLoadingImages(false); }
  };

  const switchTeam = (checked) => {
    if (!checked && collaborators.some((entry) => entry.id || entry.name.trim())) {
      if (!window.confirm('Al guardar sin colaboradores se eliminarán sus asociaciones actuales con el proyecto. ¿Continuar?')) return;
    }
    setHasTeam(checked);
    if (checked && collaborators.length === 0) setCollaborators([blankCollaborator()]);
  };

  const validate = () => {
    if (!form.category_id) return 'Debes elegir una categoría activa.';
    if (!form.title.trim() || !form.slug.trim()) return 'El título y el enlace interno son obligatorios.';
    if (!form.short_description.trim() || !form.full_description.trim()) return 'Completa las dos descripciones del proyecto.';
    const filledTech = technologies.filter((t) => t.name.trim());
    if (!filledTech.length) return 'Agrega al menos una tecnología: la primera será la tecnología clave.';
    if (technologies.some((t) => !t.name.trim())) return 'Hay tecnologías sin nombre. Complétalas o elimínalas.';
    if (highlights.some((h) => !h.content.trim())) return 'Hay características destacadas vacías. Complétalas o elimínalas.';
    if (hasTeam && collaborators.some((c) => !c.name.trim())) return 'Todos los colaboradores agregados necesitan nombre.';
    return '';
  };

  // Cada relación se guarda mediante su API real. No se envían campos anidados
  // al endpoint de projects, porque el DTO del backend los rechaza (400).
  const syncChildren = async (id, kind, desired, originals) => {
    const base = `/admin/portfolio/projects/${id}/${kind}`;
    for (let i = 0; i < desired.length; i += 1) {
      const entry = desired[i];
      const payload = pickChildFields(kind, entry, i);
      const original = entry.id ? originals.find((item) => item.id === entry.id) : null;
      if (original) {
        if (!samePayload(original, payload)) {
          await request(`${base}/${entry.id}`, { method: 'PATCH', body: payload });
        }
      } else {
        await request(base, { method: 'POST', body: payload });
      }
    }
    // Eliminar al final evita borrados prematuros si falla alguna creación.
    for (const original of originals) {
      if (!desired.some((entry) => entry.id === original.id)) {
        await request(`${base}/${original.id}`, { method: 'DELETE' });
      }
    }
  };

  const save = async (event) => {
    event.preventDefault();
    if (needsReload) { setError('Vuelve a abrir el proyecto para comprobar los cambios guardados antes de reintentar.'); return; }
    setError(''); setSuccess('');
    const issue = validate();
    if (issue) { setError(issue); return; }

    const basePayload = {
      category_id: form.category_id, slug: form.slug.trim(), title: form.title.trim(),
      short_description: form.short_description.trim(), full_description: form.full_description.trim(),
      card_image_path: form.card_image_path.trim() || null,
      cover_image_path: form.cover_image_path.trim() || null,
      live_url: form.live_url.trim() || null, github_url: form.github_url.trim() || null,
      year: form.year === '' ? null : Number(form.year), role: form.role.trim() || null,
      status: form.status, is_featured: Boolean(form.is_featured), sort_order: Number(form.sort_order || 0),
    };

    setSaving(true);
    let savedMain = false;
    try {
      const saved = projectId
        ? await request(`/admin/portfolio/projects/${projectId}`, { method: 'PATCH', body: basePayload })
        : await request('/admin/portfolio/projects', { method: 'POST', body: basePayload });
      const id = saved.id || projectId;
      if (!id) throw new Error('La API no devolvió el identificador del proyecto.');
      savedMain = true;
      setProjectId(id);
      await syncChildren(id, 'technologies', technologies, originalChildren.technologies);
      await syncChildren(id, 'highlights', highlights, originalChildren.highlights);
      await syncChildren(id, 'collaborators', hasTeam ? collaborators : [], originalChildren.collaborators);
      setSuccess('Proyecto y contenido adicional guardados correctamente.');
      await onSaved();
      onClose();
    } catch (err) {
      // Una secuencia REST no es una transacción: informar si quedó parcialmente guardado.
      if (savedMain) setNeedsReload(true);
      setError(savedMain
        ? `Se guardó el proyecto, pero falló parte de sus detalles: ${err.message}. Cierra y vuelve a editarlo para revisar lo guardado antes de reintentar.`
        : `No fue posible guardar el proyecto: ${err.message}`);
      if (savedMain) await onSaved().catch(() => {});
    } finally { setSaving(false); }
  };

  const totalFilled = technologies.filter((t) => t.name.trim()).length;
  const imageValue = (field) => assets.find((item) => item.path === form[field])?.publicUrl || '';

  return <div className="admin-modal-backdrop" onMouseDown={(event) => {
    if (!saving && event.target === event.currentTarget) onClose();
  }}>
    <section className="admin-modal ap-project-modal" role="dialog" aria-modal="true" aria-labelledby="ap-editor-heading">
      <div className="admin-modal-heading ap-editor-top">
        <div><span className="admin-eyebrow">EDITOR DE PROYECTOS</span><h2 id="ap-editor-heading">{project?.id || projectId ? 'Editar proyecto' : 'Nuevo proyecto'}</h2>
          <p>Completa la información que aparecerá en las tarjetas y en la vista de detalle.</p></div>
        <button type="button" className="admin-icon-button" onClick={onClose} disabled={saving} aria-label="Cerrar editor">×</button>
      </div>
      {loading ? <div className="admin-empty">Cargando información y colaboradores...</div> : <>
        {error && <div role="alert" className="admin-alert error ap-sticky-alert">{error}</div>}
        {success && <div className="admin-alert success">{success}</div>}
        <form className="admin-form ap-project-form" onSubmit={save}>
          <EditorSection icon="edit_note" title="Información principal" description="Datos esenciales para identificar el proyecto.">
            <div className="admin-form-grid ap-two-col">
              <Field label="Título del proyecto *" className="span-2"><input required maxLength="160" value={form.title} placeholder="Ej. Sabor Global" onChange={(event) => {
                const value = event.target.value;
                setForm((current) => ({ ...current, title: value, slug: slugEdited ? current.slug : slugify(value) }));
              }} /></Field>
              <Field label="Enlace interno (slug) *" hint="Se genera desde el título. Puedes modificarlo." ><input required maxLength="120" pattern="[a-z0-9]+(-[a-z0-9]+)*" value={form.slug} placeholder="sabor-global" onChange={(event) => { setSlugEdited(true); set('slug', slugify(event.target.value)); }} /></Field>
              <Field label="Categoría *"><select required value={form.category_id} onChange={(event) => set('category_id', event.target.value)}>
                <option value="">Seleccionar categoría</option>{categories.filter((c) => c.is_active || c.id === form.category_id).map((c) => <option key={c.id} value={c.id}>{c.label || c.name}</option>)}
              </select></Field>
              <Field label="Descripción breve *" className="span-2" hint={`${form.short_description.length}/500 caracteres. Se utiliza en las tarjetas.`}>
                <textarea required rows="2" maxLength="500" value={form.short_description} placeholder="Explica el objetivo del proyecto en pocas palabras." onChange={(event) => set('short_description', event.target.value)} />
              </Field>
              <Field label="Descripción completa *" className="span-2" hint="Explica qué problema resuelve, cómo funciona y qué aportaste.">
                <textarea required rows="5" maxLength="10000" value={form.full_description} onChange={(event) => set('full_description', event.target.value)} />
              </Field>
              <Field label="Tu rol"><input maxLength="120" value={form.role} placeholder="Ej. Desarrollador full stack" onChange={(event) => set('role', event.target.value)} /></Field>
              <Field label="Año"><input type="number" min="1900" max="2100" value={form.year} onChange={(event) => set('year', event.target.value)} /></Field>
              <Field label="Estado"><select value={form.status} onChange={(event) => set('status', event.target.value)}><option value="in_progress">En desarrollo</option><option value="completed">Completado</option><option value="archived">Archivado</option></select></Field>
              <Field label="Orden de presentación"><input type="number" min="0" max="100000" value={form.sort_order} onChange={(event) => set('sort_order', event.target.value)} /></Field>
            </div>
          </EditorSection>

          <EditorSection icon="code" title="Tecnologías utilizadas" badge={`${totalFilled} registradas`} description="Agrega las tecnologías del proyecto. La primera será la tecnología clave de la ficha pública.">
            {technologies.map((tech, index) => <div className="ap-repeat-row" key={tech.id || index}>
              <div className="ap-repeat-number">{index === 0 ? '★' : index + 1}</div>
              <div className="ap-repeat-content ap-repeat-two">
                <Field label={index === 0 ? 'Tecnología clave *' : 'Tecnología *'}>
                  <input required maxLength="100" placeholder="Ej. React, PostgreSQL, Python" value={tech.name} onChange={(e) => updateArray(setTechnologies, index, 'name', e.target.value)} />
                </Field>
                <Field label="Uso en el proyecto"><input maxLength="100" placeholder="Ej. Interfaz de usuario, base de datos" value={tech.role || ''} onChange={(e) => updateArray(setTechnologies, index, 'role', e.target.value)} /></Field>
              </div>
              <div className="ap-row-buttons">
                <button type="button" className="admin-icon-button" title="Subir tecnología" aria-label={`Subir tecnología ${index + 1}`} onClick={() => moveTechnology(index, -1)} disabled={index === 0}>↑</button>
                <button type="button" className="admin-icon-button" title="Bajar tecnología" aria-label={`Bajar tecnología ${index + 1}`} onClick={() => moveTechnology(index, 1)} disabled={index === technologies.length - 1}>↓</button>
                <button type="button" className="admin-icon-button danger" aria-label={`Quitar tecnología ${index + 1}`} title="Quitar tecnología" onClick={() => removeArray(setTechnologies, index)} disabled={technologies.length === 1}>×</button>
              </div>
            </div>)}
            <button type="button" className="admin-button secondary small" onClick={() => setTechnologies((items) => [...items, blankTechnology()])}>＋ Agregar tecnología</button>
          </EditorSection>

          <EditorSection icon="checklist" title="Características destacadas" description="Opcional. Explica funcionalidades o logros que aparecerán en la ficha de detalle.">
            {highlights.map((highlight, index) => <div className="ap-repeat-row" key={highlight.id || index}>
              <div className="ap-repeat-number">{index + 1}</div>
              <div className="ap-repeat-content"><Field label="Característica"><textarea rows="2" required maxLength="1000" placeholder="Ej. Búsqueda con filtros y restricciones alimentarias" value={highlight.content} onChange={(e) => updateArray(setHighlights, index, 'content', e.target.value)} /></Field></div>
              <button type="button" className="admin-icon-button danger" aria-label={`Eliminar característica ${index + 1}`} onClick={() => removeArray(setHighlights, index)}>×</button>
            </div>)}
            <button type="button" className="admin-button secondary small" onClick={() => setHighlights((items) => [...items, blankHighlight()])}>＋ Agregar característica</button>
            {!highlights.length && <p className="ap-help">Sin características adicionales. Puedes agregarlas en cualquier momento.</p>}
          </EditorSection>

          <EditorSection icon="groups" title="Equipo y colaboradores" description="Solo aparece en el portafolio público si hay colaboradores.">
            <label className="ap-team-toggle"><input type="checkbox" checked={hasTeam} onChange={(e) => switchTeam(e.target.checked)} /><span><strong>Este proyecto tuvo colaboradores</strong><small>Activa esta opción para registrar los integrantes y sus contribuciones.</small></span></label>
            {hasTeam && <div className="ap-team-entries">{collaborators.map((person, index) => <div key={person.id || index} className="ap-collab-card">
              <div className="ap-card-heading"><strong>Colaborador {index + 1}</strong><button type="button" className="admin-actions-button danger" onClick={() => removeArray(setCollaborators, index)}>Eliminar</button></div>
              <div className="admin-form-grid ap-two-col">
                <Field label="Nombre *"><input required maxLength="120" value={person.name} placeholder="Nombre y apellido" onChange={(e) => updateArray(setCollaborators, index, 'name', e.target.value)} /></Field>
                <Field label="Rol o contribución"><input maxLength="120" value={person.role || ''} placeholder="Ej. Backend, diseño UI/UX" onChange={(e) => updateArray(setCollaborators, index, 'role', e.target.value)} /></Field>
                <Field label="GitHub"><input type="url" maxLength="2048" placeholder="https://github.com/... (opcional)" value={person.github_url || ''} onChange={(e) => updateArray(setCollaborators, index, 'github_url', e.target.value)} /></Field>
                <Field label="LinkedIn"><input type="url" maxLength="2048" placeholder="https://linkedin.com/in/... (opcional)" value={person.linkedin_url || ''} onChange={(e) => updateArray(setCollaborators, index, 'linkedin_url', e.target.value)} /></Field>
                <Field label="Ruta de foto (biblioteca de colaboradores)" className="span-2" hint="Opcional. Carga la foto desde Biblioteca multimedia → Colaboradores y copia su ruta."><input value={person.avatar_path || ''} placeholder="collaborators/archivo.webp" onChange={(e) => updateArray(setCollaborators, index, 'avatar_path', e.target.value)} /></Field>
              </div>
            </div>)}<button type="button" className="admin-button secondary small" onClick={() => setCollaborators((items) => [...items, blankCollaborator()])}>＋ Agregar colaborador</button></div>}
          </EditorSection>

          <EditorSection icon="link" title="Repositorio y demostración" description="Ambos enlaces son opcionales e independientes: puedes publicar un proyecto que solo tenga GitHub.">
            <div className="admin-form-grid ap-two-col">
              <Field label={<>Enlace a GitHub <Optional /></>} hint="Si el repositorio es privado o no existe, deja vacío el campo."><input type="url" maxLength="2048" placeholder="https://github.com/usuario/proyecto" value={form.github_url} onChange={(e) => set('github_url', e.target.value)} /></Field>
              <Field label={<>Sitio o demo pública <Optional /></>} hint="Si no está desplegado, se indicará 'Sin demo pública disponible'."><input type="url" maxLength="2048" placeholder="https://mi-proyecto.vercel.app" value={form.live_url} onChange={(e) => set('live_url', e.target.value)} /></Field>
            </div>
            {!form.live_url.trim() && <p className="ap-note"><span className="material-symbols-outlined">info</span> Sin demo pública: en la vista de detalle se mostrará un mensaje, no un botón roto.</p>}
          </EditorSection>

          <EditorSection icon="image" title="Imágenes" description="Opcional. Selecciona imágenes ya cargadas en Biblioteca multimedia → Proyectos.">
            <div className="admin-form-grid ap-two-col">
              {['card_image_path', 'cover_image_path'].map((field) => <div key={field} className="ap-image-field">
                <Field label={<>{field === 'card_image_path' ? 'Imagen de tarjeta' : 'Imagen de portada'} <Optional /></>} hint="Se guarda la ruta del archivo, no la URL pública.">
                  <input value={form[field]} placeholder="projects/archivo.webp" onChange={(e) => set(field, e.target.value)} />
                </Field>
                <div className="ap-image-actions"><button type="button" className="admin-button secondary small" onClick={() => chooseImage(field)}>Elegir de biblioteca</button>{form[field] && <button type="button" className="admin-actions-button" onClick={() => set(field, '')}>Quitar</button>}</div>
                {imageValue(field) && <img className="ap-image-preview" src={imageValue(field)} alt="Vista previa" />}
              </div>)}
            </div>
          </EditorSection>

          <EditorSection icon="visibility" title="Opciones de visualización" description="Los proyectos nuevos se guardan como borradores, incluso si se marcan como destacados.">
            <label className="ap-team-toggle"><input type="checkbox" checked={form.is_featured} onChange={(e) => set('is_featured', e.target.checked)} /><span><strong>Mostrar como proyecto destacado</strong><small>Será visible en el inicio después de publicarlo.</small></span></label>
          </EditorSection>

          <div className="ap-save-bar"><p><span className="material-symbols-outlined">draft</span> Puedes completar o editar los datos más adelante desde el panel.</p><div><button type="button" className="admin-button secondary" disabled={saving} onClick={onClose}>Cancelar</button><button type="submit" className="admin-button primary" disabled={saving || loading || needsReload}>{needsReload ? 'Reabre el editor para continuar' : saving ? 'Guardando...' : projectId ? 'Guardar cambios' : 'Crear proyecto'}</button></div></div>
        </form>
      </>}
    </section>
    {showImages && <div className="ap-image-overlay" role="dialog" aria-modal="true" aria-label="Seleccionar imagen">
      <div className="ap-image-picker"><header><h3>Imágenes del proyecto</h3><button type="button" className="admin-icon-button" onClick={() => setShowImages(false)}>×</button></header>
        {loadingImages ? <p>Cargando imágenes...</p> : assets.length ? <div className="ap-image-grid">{assets.map((image) => <button type="button" key={image.path} onClick={() => { set(imageField, image.path); setShowImages(false); }}><img src={image.publicUrl} loading="lazy" alt={image.name} /><span>{image.name}</span></button>)}</div> : <p>No hay imágenes. Súbelas primero en Biblioteca multimedia.</p>}
      </div>
    </div>}
  </div>;
}

export default function AdminProjects() {
  const { request } = useAuth();
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryForm, setCategoryForm] = useState({ name: '', slug: '', label: '', description: '' });
  const [filters, setFilters] = useState({ is_published: '', status: '', search: '' });
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [editing, setEditing] = useState(undefined);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams({ page: '1', limit: '100' });
      if (filters.is_published) query.set('is_published', filters.is_published);
      if (filters.status) query.set('status', filters.status);
      const [results, categoryResult] = await Promise.all([
        request(`/admin/portfolio/projects?${query}`), request('/admin/portfolio/categories'),
      ]);
      setProjects(results.items || []);
      setCategories(categoryResult || []);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }, [request, filters.is_published, filters.status]);

  useEffect(() => { load(); }, [load]);
  const visible = useMemo(() => projects.filter((p) => `${p.title} ${p.slug} ${p.short_description}`.toLowerCase().includes(filters.search.toLowerCase().trim())), [projects, filters.search]);

  const execute = async (task, success) => {
    setBusy(true); setError(''); setNotice('');
    try { await task(); setNotice(success); await load(); }
    catch (err) { setError(err.message); }
    finally { setBusy(false); }
  };

  const createCategory = (event) => {
    event.preventDefault();
    execute(async () => {
      await request('/admin/portfolio/categories', { method: 'POST', body: {
        name: categoryForm.name.trim(), slug: slugify(categoryForm.slug),
        label: categoryForm.label.trim(), description: categoryForm.description.trim() || null,
        sort_order: categories.length, is_active: true,
      } });
      setCategoryForm({ name: '', slug: '', label: '', description: '' });
    }, 'Categoría creada correctamente.');
  };

  return <div className="admin-page ap-project-page">
    <div className="admin-page-heading"><div><span className="admin-eyebrow">CONTENIDO DEL PORTAFOLIO</span><h1>Proyectos</h1><p>Publica proyectos con sus tecnologías, características y equipo de trabajo.</p></div><button className="admin-button primary" disabled={!categories.some((c) => c.is_active)} onClick={() => { setEditing(null); setError(''); setNotice(''); }}>＋ Nuevo proyecto</button></div>
    {!categories.some((c) => c.is_active) && <div className="admin-alert error">Crea una categoría activa antes de registrar un proyecto.</div>}
    {error && <div className="admin-alert error" role="alert">{error}</div>}{notice && <div className="admin-alert success">{notice}</div>}
    <div className="admin-toolbar ap-project-toolbar"><label>Publicación<select value={filters.is_published} onChange={(e) => setFilters((p) => ({ ...p, is_published: e.target.value }))}><option value="">Todos</option><option value="true">Publicados</option><option value="false">Borradores</option></select></label><label>Estado<select value={filters.status} onChange={(e) => setFilters((p) => ({ ...p, status: e.target.value }))}><option value="">Todos</option><option value="in_progress">En desarrollo</option><option value="completed">Completados</option><option value="archived">Archivados</option></select></label><label>Buscar<input className="ap-project-search" placeholder="Título o descripción" value={filters.search} onChange={(e) => setFilters((p) => ({ ...p, search: e.target.value }))} /></label><span className="admin-toolbar-count">{visible.length} proyectos</span></div>
    <section className="admin-panel admin-table-panel">{loading ? <div className="admin-empty">Cargando proyectos...</div> : visible.length ? <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Proyecto</th><th>Categoría</th><th>Estado</th><th>Visibilidad</th><th>Acciones</th></tr></thead><tbody>{visible.map((p) => <tr key={p.id}><td><div className="admin-project-cell"><span className="admin-project-thumb">{p.title?.slice(0, 1)}</span><span><strong>{p.title}</strong><small>/{p.slug}</small></span></div></td><td>{p.category?.label || p.category?.name || '—'}</td><td><span className={`admin-pill ${p.status}`}>{p.status === 'completed' ? 'Completado' : p.status === 'archived' ? 'Archivado' : 'En desarrollo'}</span></td><td><span className={`admin-pill ${p.is_published ? 'published' : 'draft'}`}>{p.is_published ? 'Publicado' : 'Borrador'}</span></td><td><div className="admin-actions"><button disabled={busy} onClick={() => setEditing(p)}>Editar</button><button disabled={busy} onClick={() => execute(() => request(`/admin/portfolio/projects/${p.id}/${p.is_published ? 'unpublish' : 'publish'}`, { method: 'POST' }), p.is_published ? 'Proyecto retirado.' : 'Proyecto publicado.')}>{p.is_published ? 'Retirar' : 'Publicar'}</button><button className="danger" disabled={busy} onClick={() => { if (window.confirm(`¿Eliminar «${p.title}» y todos sus detalles? Esta acción no se puede deshacer.`)) execute(() => request(`/admin/portfolio/projects/${p.id}`, { method: 'DELETE' }), 'Proyecto eliminado.'); }}>Eliminar</button></div></td></tr>)}</tbody></table></div> : <div className="admin-empty">No hay proyectos con estos filtros.</div>}</section>
    <section className="admin-panel ap-categories-panel"><div className="admin-panel-heading"><div><h2>Categorías</h2><p>Crea categorías para organizar los proyectos.</p></div></div><form className="admin-inline-form" onSubmit={createCategory}><input required maxLength="100" value={categoryForm.name} placeholder="Nombre" onChange={(e) => setCategoryForm((v) => ({ ...v, name: e.target.value, slug: v.slug || slugify(e.target.value) }))} /><input required maxLength="100" pattern="[a-z0-9]+(-[a-z0-9]+)*" value={categoryForm.slug} placeholder="enlace-categoria" onChange={(e) => setCategoryForm((v) => ({ ...v, slug: slugify(e.target.value) }))} /><input required maxLength="100" value={categoryForm.label} placeholder="Etiqueta pública" onChange={(e) => setCategoryForm((v) => ({ ...v, label: e.target.value }))} /><button className="admin-button primary" disabled={busy}>Crear</button></form><div className="admin-manage-list">{categories.map((c) => <div key={c.id} className="admin-manage-row"><div><strong>{c.label || c.name}</strong><small>/{c.slug}</small></div><label className="admin-check"><input type="checkbox" checked={Boolean(c.is_active)} disabled={busy} onChange={() => execute(() => request(`/admin/portfolio/categories/${c.id}`, { method: 'PATCH', body: { is_active: !c.is_active } }), 'Categoría actualizada.')} /> Activa</label><button className="admin-actions-button danger" disabled={busy} onClick={() => { if (window.confirm(`¿Eliminar la categoría ${c.name}?`)) execute(() => request(`/admin/portfolio/categories/${c.id}`, { method: 'DELETE' }), 'Categoría eliminada.'); }}>Eliminar</button></div>)}</div></section>
    {editing !== undefined && <ProjectEditor key={editing?.id || 'new'} project={editing} categories={categories} request={request} onClose={() => setEditing(undefined)} onSaved={load} />}
  </div>;
}
