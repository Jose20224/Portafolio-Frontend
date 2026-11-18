import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const initial = { full_name: '', professional_title: '', hero_badge_text: '', hero_description: '', hero_image_path: '', about_paragraphs: [''], strengths: [''], location: '', work_mode: 'flexible', contact_email: '', availability_status: 'open_to_opportunities', is_public: true };

export default function AdminProfile() {
  const { request } = useAuth();
  const [form, setForm] = useState(initial);
  const [socialLinks, setSocialLinks] = useState([]);
  const [skills, setSkills] = useState([]);
  const [socialForm, setSocialForm] = useState({ platform: 'github', label: 'GitHub', url: '' });
  const [skillForm, setSkillForm] = useState({ group_type: 'technical', name: '', level: 75 });
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const loadExtras = useCallback(async () => {
    const [linksResult, skillsResult] = await Promise.all([
      request('/admin/portfolio/social-links'), request('/admin/portfolio/skills'),
    ]);
    setSocialLinks(linksResult || []);
    setSkills(skillsResult || []);
  }, [request]);

  useEffect(() => {
    let active = true;
    Promise.all([request('/admin/portfolio/profile'), request('/admin/portfolio/social-links'), request('/admin/portfolio/skills')])
      .then(([profile, links, skillItems]) => {
        if (!active) return;
        setForm({ ...initial, ...profile, about_paragraphs: profile.about_paragraphs?.length ? profile.about_paragraphs : [''], strengths: profile.strengths?.length ? profile.strengths : [''] });
        setSocialLinks(links || []);
        setSkills(skillItems || []);
      })
      .catch((err) => { if (active) setError(err.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [request]);

  const set = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const updateArray = (key, index, value) => set(key, form[key].map((item, i) => i === index ? value : item));
  const save = async (event) => {
    event.preventDefault(); setBusy(true); setError(''); setNotice('');
    try {
      await request('/admin/portfolio/profile', { method: 'PATCH', body: {
        full_name: form.full_name, professional_title: form.professional_title, hero_badge_text: form.hero_badge_text,
        hero_description: form.hero_description, hero_image_path: form.hero_image_path || null,
        about_paragraphs: form.about_paragraphs.filter((v) => v.trim()), strengths: form.strengths.filter((v) => v.trim()),
        location: form.location || null, work_mode: form.work_mode, contact_email: form.contact_email || null,
        availability_status: form.availability_status, is_public: Boolean(form.is_public),
      } });
      setNotice('La información del perfil se actualizó correctamente.');
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  };

  const addSocial = async (event) => {
    event.preventDefault(); setBusy(true); setError('');
    try { await request('/admin/portfolio/social-links', { method: 'POST', body: { ...socialForm, sort_order: socialLinks.length, is_visible: true } }); setSocialForm({ platform: '', label: '', url: '' }); await loadExtras(); setNotice('Enlace social agregado.'); }
    catch (err) { setError(err.message); } finally { setBusy(false); }
  };
  const toggleSocial = async (item) => {
    setBusy(true); setError(''); try { await request(`/admin/portfolio/social-links/${item.id}`, { method: 'PATCH', body: { is_visible: !item.is_visible } }); await loadExtras(); } catch (err) { setError(err.message); } finally { setBusy(false); }
  };
  const deleteSocial = async (item) => {
    if (!window.confirm(`¿Eliminar el enlace ${item.label}?`)) return;
    setBusy(true); setError(''); try { await request(`/admin/portfolio/social-links/${item.id}`, { method: 'DELETE' }); await loadExtras(); setNotice('Enlace eliminado.'); } catch (err) { setError(err.message); } finally { setBusy(false); }
  };
  const addSkill = async (event) => {
    event.preventDefault(); setBusy(true); setError('');
    try { await request('/admin/portfolio/skills', { method: 'POST', body: { group_type: skillForm.group_type, name: skillForm.name, level: skillForm.group_type === 'technical' ? Number(skillForm.level) : null, sort_order: skills.length, is_visible: true } }); setSkillForm((v) => ({ ...v, name: '' })); await loadExtras(); setNotice('Habilidad agregada.'); }
    catch (err) { setError(err.message); } finally { setBusy(false); }
  };
  const toggleSkill = async (item) => {
    setBusy(true); setError(''); try { await request(`/admin/portfolio/skills/${item.id}`, { method: 'PATCH', body: { is_visible: !item.is_visible } }); await loadExtras(); } catch (err) { setError(err.message); } finally { setBusy(false); }
  };
  const deleteSkill = async (item) => {
    if (!window.confirm(`¿Eliminar la habilidad ${item.name}?`)) return;
    setBusy(true); setError(''); try { await request(`/admin/portfolio/skills/${item.id}`, { method: 'DELETE' }); await loadExtras(); setNotice('Habilidad eliminada.'); } catch (err) { setError(err.message); } finally { setBusy(false); }
  };

  if (loading) return <div className="admin-page"><div className="admin-empty">Cargando perfil...</div></div>;
  return <div className="admin-page"><div className="admin-page-heading"><div><span className="admin-eyebrow">IDENTIDAD PROFESIONAL</span><h1>Perfil público</h1><p>Administra tu presentación, redes y habilidades.</p></div></div>{error && <div className="admin-alert error">{error}</div>}{notice && <div className="admin-alert success">{notice}</div>}
    <form className="admin-panel admin-profile-form admin-form" onSubmit={save}><div className="admin-panel-heading"><div><h2>Información principal</h2><p>Estos datos alimentan el encabezado y la sección “Sobre mí”.</p></div><label className="admin-check"><input type="checkbox" checked={Boolean(form.is_public)} onChange={(e) => set('is_public', e.target.checked)} /> Perfil visible</label></div><div className="admin-form-grid"><label>Nombre completo<input value={form.full_name} onChange={(e) => set('full_name', e.target.value)} required maxLength="160" /></label><label>Título profesional<input value={form.professional_title} onChange={(e) => set('professional_title', e.target.value)} required maxLength="160" /></label><label className="span-2">Texto corto del encabezado<input value={form.hero_badge_text} onChange={(e) => set('hero_badge_text', e.target.value)} maxLength="160" /></label><label className="span-2">Descripción del encabezado<textarea rows="3" value={form.hero_description} onChange={(e) => set('hero_description', e.target.value)} maxLength="2000" /></label><label className="span-2">Imagen del encabezado (ruta de biblioteca)<input value={form.hero_image_path || ''} onChange={(e) => set('hero_image_path', e.target.value)} placeholder="profile/avatar.webp" /></label><label>Ubicación<input value={form.location || ''} onChange={(e) => set('location', e.target.value)} maxLength="120" /></label><label>Correo de contacto<input type="email" value={form.contact_email || ''} onChange={(e) => set('contact_email', e.target.value)} /></label><label>Modalidad<select value={form.work_mode} onChange={(e) => set('work_mode', e.target.value)}><option value="remote">Remoto</option><option value="hybrid">Híbrido</option><option value="onsite">Presencial</option><option value="flexible">Flexible</option></select></label><label>Disponibilidad<select value={form.availability_status} onChange={(e) => set('availability_status', e.target.value)}><option value="available">Disponible</option><option value="open_to_opportunities">Abierto a oportunidades</option><option value="not_available">No disponible</option></select></label></div>
      <div className="admin-form-section"><div className="admin-panel-heading"><div><h2>Sobre mí</h2><p>Párrafos que aparecen en la sección de presentación.</p></div><button type="button" className="admin-button secondary small" onClick={() => set('about_paragraphs', [...form.about_paragraphs, ''])}>＋ Agregar párrafo</button></div>{form.about_paragraphs.map((value, index) => <div className="admin-array-row" key={index}><textarea rows="3" value={value} onChange={(e) => updateArray('about_paragraphs', index, e.target.value)} /><button type="button" className="admin-icon-button danger" onClick={() => set('about_paragraphs', form.about_paragraphs.filter((_, i) => i !== index))}>×</button></div>)}</div>
      <div className="admin-form-section"><div className="admin-panel-heading"><div><h2>Fortalezas</h2><p>Ideas breves para destacar tus capacidades.</p></div><button type="button" className="admin-button secondary small" onClick={() => set('strengths', [...form.strengths, ''])}>＋ Agregar fortaleza</button></div>{form.strengths.map((value, index) => <div className="admin-array-row" key={index}><input value={value} onChange={(e) => updateArray('strengths', index, e.target.value)} /><button type="button" className="admin-icon-button danger" onClick={() => set('strengths', form.strengths.filter((_, i) => i !== index))}>×</button></div>)}</div>
      <div className="admin-form-footer"><p>Los cambios se reflejan en el sitio público después de actualizar el contenido.</p><button className="admin-button primary" disabled={busy}>{busy ? 'Guardando...' : 'Guardar cambios'}</button></div>
    </form>
    <section className="admin-panel"><div className="admin-panel-heading"><div><h2>Redes y enlaces sociales</h2><p>Configura los enlaces que se muestran en contacto.</p></div></div><form className="admin-inline-form" onSubmit={addSocial}><input value={socialForm.platform} onChange={(e) => setSocialForm({ ...socialForm, platform: e.target.value })} placeholder="Plataforma: github" required maxLength="60" /><input value={socialForm.label} onChange={(e) => setSocialForm({ ...socialForm, label: e.target.value })} placeholder="Etiqueta: GitHub" required maxLength="100" /><input type="url" value={socialForm.url} onChange={(e) => setSocialForm({ ...socialForm, url: e.target.value })} placeholder="https://..." required /><button className="admin-button primary" disabled={busy}>Agregar</button></form><div className="admin-manage-list">{socialLinks.map((item) => <div className="admin-manage-row" key={item.id}><div><strong>{item.label}</strong><small>{item.url}</small></div><label className="admin-check"><input type="checkbox" checked={Boolean(item.is_visible)} onChange={() => toggleSocial(item)} disabled={busy} /> Visible</label><button className="admin-actions-button danger" onClick={() => deleteSocial(item)} disabled={busy}>Eliminar</button></div>)}</div></section>
    <section className="admin-panel"><div className="admin-panel-heading"><div><h2>Habilidades</h2><p>Organiza conocimientos técnicos, herramientas e intereses.</p></div></div><form className="admin-inline-form" onSubmit={addSkill}><select value={skillForm.group_type} onChange={(e) => setSkillForm({ ...skillForm, group_type: e.target.value })}><option value="technical">Técnica</option><option value="tools">Herramienta</option><option value="interests">Interés</option></select><input value={skillForm.name} onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })} placeholder="Nombre de la habilidad" required maxLength="100" />{skillForm.group_type === 'technical' && <input type="number" min="0" max="100" value={skillForm.level} onChange={(e) => setSkillForm({ ...skillForm, level: e.target.value })} aria-label="Nivel porcentual" />}<button className="admin-button primary" disabled={busy}>Agregar</button></form><div className="admin-manage-list">{skills.map((item) => <div className="admin-manage-row" key={item.id}><div><strong>{item.name}</strong><small>{item.group_type === 'technical' ? `Técnica · ${item.level ?? 0}%` : item.group_type === 'tools' ? 'Herramienta' : 'Interés'}</small></div><label className="admin-check"><input type="checkbox" checked={Boolean(item.is_visible)} onChange={() => toggleSkill(item)} disabled={busy} /> Visible</label><button className="admin-actions-button danger" onClick={() => deleteSkill(item)} disabled={busy}>Eliminar</button></div>)}</div></section>
  </div>;
}
