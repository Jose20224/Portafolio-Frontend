import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { apiRequest } from '../services/api/client';

const iconFor = (platform = '') => /github/i.test(platform) ? 'code' : /linkedin/i.test(platform) ? 'work' : 'open_in_new';
export default function Contact() {
  const { profile, socialLinks } = usePortfolio();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '', website: '' });
  const [submitted, setSubmitted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const startedAt = useMemo(() => Date.now(), []);
  const change = e => setForm(v => ({ ...v, [e.target.name]: e.target.value }));
  const submit = async e => {
    e.preventDefault(); setBusy(true); setError('');
    try { await apiRequest('/contact/messages', { method: 'POST', body: { ...form, formStartedAt: startedAt } }); setSubmitted(true); setForm({ name: '', email: '', subject: '', message: '', website: '' }); }
    catch (err) { setError(err.message || 'No fue posible enviar el mensaje.'); }
    finally { setBusy(false); }
  };
  const socials = Array.isArray(socialLinks) ? socialLinks.filter(x => x.is_visible !== false) : [];
  const mode = { remote: 'Remoto', hybrid: 'Híbrido', onsite: 'Presencial', flexible: 'Remoto / Híbrido / Presencial' }[profile?.work_mode] || 'Remoto / Híbrido / Presencial';
  return (
    <section id="contact" className="py-20 md:py-28 bg-surface-container-lowest/50 relative">
      <div className="max-w-[1120px] mx-auto px-4 md:px-10">
        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col items-center text-center mb-16 space-y-3"><span className="text-xs font-geist uppercase tracking-widest text-primary font-semibold px-3 py-1 rounded-full bg-primary-container/20 border border-primary/20">Hablemos</span><h2 className="text-3xl md:text-4xl font-bold text-on-surface font-inter">Contacto</h2><div className="w-12 h-1 bg-primary rounded-full mt-2"/><p className="text-on-surface-variant max-w-xl text-sm md:text-base pt-2">¿Tienes un proyecto en mente, una oportunidad laboral o simplemente quieres saludar? Escríbeme.</p></motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <motion.div initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-5 glass-card p-8 md:p-10 rounded-3xl border border-outline-variant/30 space-y-7">
            <h3 className="text-2xl font-bold text-on-surface">Información de Contacto</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-5"><span className="material-symbols-outlined bg-primary-container/30 text-primary p-4 rounded-2xl">mail</span><div><p className="text-sm text-on-surface-variant">Correo Electrónico</p>{profile?.contact_email ? <a className="font-semibold text-on-surface hover:text-primary break-all" href={`mailto:${profile.contact_email}`}>{profile.contact_email}</a> : <p className="font-semibold text-on-surface-variant">Correo pendiente de configurar</p>}</div></div>
              <div className="flex items-start gap-5"><span className="material-symbols-outlined bg-primary-container/30 text-primary p-4 rounded-2xl">location_on</span><div><p className="text-sm text-on-surface-variant">Ubicación{profile?.location ? `, ${profile.location}` : ''}</p><p className="font-semibold text-on-surface">Disponible para trabajo {mode}</p></div></div>
              <div className="flex items-start gap-5"><span className="material-symbols-outlined bg-primary-container/30 text-primary p-4 rounded-2xl">work_history</span><div><p className="text-sm text-on-surface-variant">Estado actual</p><p className={profile?.availability_status === 'not_available' ? 'font-semibold text-on-surface-variant' : 'font-semibold text-emerald-400'}>{profile?.availability_status === 'not_available' ? 'No disponible actualmente' : 'Abierto a nuevas ofertas profesionales'}</p></div></div>
            </div>
            {socials.length > 0 && <div className="pt-6 border-t border-outline-variant/20"><p className="text-sm text-on-surface-variant mb-4">Redes Profesionales</p><div className="flex flex-wrap gap-3">{socials.map(link => <a key={link.id || link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-surface-container-high text-on-surface font-medium text-sm hover:text-primary transition-colors"><span className="material-symbols-outlined text-xl">{iconFor(link.platform)}</span>{link.label || link.platform}</a>)}</div></div>}
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-7 glass-card p-8 md:p-10 rounded-3xl border border-outline-variant/30 shadow-xl">
            {submitted ? <div className="py-12 text-center space-y-4"><div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-3xl">✓</div><h3 className="text-2xl font-bold text-on-surface">¡Mensaje recibido!</h3><p className="text-on-surface-variant">Tu mensaje se registró correctamente.</p><button onClick={() => setSubmitted(false)} className="text-primary underline">Enviar otro mensaje</button></div> : <form onSubmit={submit} className="space-y-7"><h3 className="text-2xl font-bold text-on-surface">Envíame un mensaje</h3>{error && <div role="alert" className="rounded-lg bg-red-950/60 border border-red-700 text-red-200 px-4 py-3 text-sm">{error}</div>}
              <label className="block text-sm font-semibold uppercase tracking-wide text-on-surface-variant">Tu nombre<input name="name" value={form.name} onChange={change} minLength="2" maxLength="100" required placeholder="Ej. Juan Pérez" className="mt-3 w-full bg-surface-container-high/60 border border-outline-variant/30 rounded-xl px-5 py-4 text-on-surface text-base font-normal normal-case focus:outline-none focus:border-primary"/></label>
              <label className="block text-sm font-semibold uppercase tracking-wide text-on-surface-variant">Tu correo electrónico<input type="email" name="email" value={form.email} onChange={change} maxLength="254" required placeholder="ejemplo@correo.com" className="mt-3 w-full bg-surface-container-high/60 border border-outline-variant/30 rounded-xl px-5 py-4 text-on-surface text-base font-normal normal-case focus:outline-none focus:border-primary"/></label>
              <label className="block text-sm font-semibold uppercase tracking-wide text-on-surface-variant">Asunto (opcional)<input name="subject" value={form.subject} onChange={change} maxLength="150" placeholder="Motivo del contacto" className="mt-3 w-full bg-surface-container-high/60 border border-outline-variant/30 rounded-xl px-5 py-4 text-on-surface text-base font-normal normal-case focus:outline-none focus:border-primary"/></label>
              <label className="block text-sm font-semibold uppercase tracking-wide text-on-surface-variant">Mensaje<textarea name="message" rows="5" value={form.message} onChange={change} minLength="10" maxLength="5000" required placeholder="Cuéntame sobre tu proyecto o propuesta..." className="mt-3 w-full bg-surface-container-high/60 border border-outline-variant/30 rounded-xl px-5 py-4 text-on-surface text-base font-normal normal-case focus:outline-none focus:border-primary resize-y"/></label>
              <div className="hidden" aria-hidden="true"><label>Sitio web<input tabIndex="-1" autoComplete="off" name="website" value={form.website} onChange={change}/></label></div>
              <button type="submit" disabled={busy} className="w-full bg-primary-container hover:bg-primary-container/80 disabled:opacity-50 text-on-primary-container font-bold py-4 rounded-xl transition flex items-center justify-center gap-3 text-base uppercase tracking-wide shadow-lg shadow-primary-container/20">{busy ? 'Enviando...' : 'Enviar mensaje'} <span className="material-symbols-outlined">send</span></button>
            </form>}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
