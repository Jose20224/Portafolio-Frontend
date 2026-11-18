import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { usePortfolio, normalizeProject } from '../context/PortfolioContext';
import { apiRequest, isApiConfigured } from '../services/api/client';

const reveal = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.48, ease: 'easeOut' } } };
const stateName = { in_progress: 'En desarrollo', completed: 'Completado', archived: 'Archivado' };

function ExternalLink({ href, icon, primary, children }) {
  if (!href || !/^https?:\/\//i.test(href)) return null;
  return <a href={href} target="_blank" rel="noopener noreferrer"
    className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5 ${primary ? 'bg-primary-container text-on-primary-container glow-border' : 'bg-surface-container-high border border-outline-variant/40 text-on-surface hover:border-primary/50'}`}>
    <span className="material-symbols-outlined text-lg">{icon}</span>{children}<span className="material-symbols-outlined text-sm">north_east</span>
  </a>;
}

export default function ProjectDetail() {
  const { id } = useParams();
  const { projects, loading } = usePortfolio();
  const contextProject = projects.find((p) => String(p.id) === id || p.slug === id);
  const [detail, setDetail] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    setDetail(null); setError('');
    if (!isApiConfigured()) return () => { mounted = false; };
    setFetching(true);
    apiRequest(`/portfolio/projects/${encodeURIComponent(id)}`)
      .then((result) => { if (mounted) setDetail(normalizeProject(result)); })
      .catch((err) => { if (mounted) setError(err.message); })
      .finally(() => { if (mounted) setFetching(false); });
    return () => { mounted = false; };
  }, [id]);

  const project = detail || contextProject;
  if (!project && (loading || fetching)) return <div className="mx-auto max-w-[1000px] px-6 py-24 text-on-surface-variant">Cargando proyecto...</div>;
  if (!project) return <div className="mx-auto max-w-[900px] px-5 py-24 text-center"><h1 className="text-3xl font-bold text-on-surface">Proyecto no encontrado</h1><p className="mt-3 text-on-surface-variant">{error || 'Es posible que el proyecto ya no esté publicado.'}</p><Link to="/proyectos" className="mt-6 inline-block text-primary underline">Volver a proyectos</Link></div>;

  const technologies = project.techStack || [];
  const collaborators = project.collaborators || [];
  const highlights = project.highlights || [];
  const primaryTechnology = technologies[0]?.name || project.tags?.[0] || 'No indicada';
  const liveUrl = project.liveUrl && project.liveUrl !== '#' ? project.liveUrl : null;
  const githubUrl = project.githubUrl && project.githubUrl !== '#' ? project.githubUrl : null;
  const cover = project.cover_image_url || project.image || '';

  return <article className="mx-auto w-full max-w-[1050px] px-4 py-12 md:px-10 md:py-20">
    <nav aria-label="Ruta del proyecto" className="mb-8 flex flex-wrap items-center gap-2 text-xs text-on-surface-variant">
      <Link to="/" className="hover:text-primary">Inicio</Link><span>/</span><Link to="/proyectos" className="hover:text-primary">Proyectos</Link><span>/</span><span className="font-semibold text-on-surface">{project.title}</span>
    </nav>
    <Link to="/proyectos" className="mb-9 inline-flex items-center gap-2 rounded-xl border border-outline-variant/30 bg-surface-container-high/60 px-4 py-2.5 text-xs font-medium text-on-surface hover:border-primary/60"><span className="material-symbols-outlined text-sm">arrow_back</span>Volver a los proyectos</Link>

    <motion.header variants={reveal} initial="hidden" animate="visible" className="mb-10">
      <div className="mb-4 flex flex-wrap items-center gap-3"><span className="rounded-lg border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{project.categoryLabel}</span>{project.year && <span className="text-xs text-on-surface-variant">Año {project.year}</span>}</div>
      <h1 className="font-inter text-3xl font-bold tracking-tight text-on-surface md:text-5xl">{project.title}</h1>
      <p className="mt-5 max-w-3xl text-lg leading-relaxed text-on-surface-variant">{project.shortDescription}</p>
      <div className="mt-8 grid gap-4 rounded-2xl border border-outline-variant/30 bg-surface-container-low p-5 sm:grid-cols-3">
        <div><span className="text-xs uppercase tracking-wider text-on-surface-variant">Mi rol</span><p className="mt-2 text-sm font-semibold text-on-surface">{project.role || 'No especificado'}</p></div>
        <div><span className="text-xs uppercase tracking-wider text-on-surface-variant">Tecnología clave</span><p className="mt-2 text-sm font-semibold text-on-surface">{primaryTechnology}</p></div>
        <div><span className="text-xs uppercase tracking-wider text-on-surface-variant">Estado</span><p className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-primary"><span className="h-2 w-2 rounded-full bg-primary" />{stateName[project.status] || 'Proyecto registrado'}</p></div>
      </div>
    </motion.header>

    {cover && <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 overflow-hidden rounded-2xl border border-outline-variant/30 bg-surface-container-high shadow-xl"><img src={cover} alt={`Imagen principal de ${project.title}`} className="h-[260px] w-full object-cover sm:h-[380px] md:h-[470px]" /></motion.div>}

    <div className="grid grid-cols-1 gap-9 lg:grid-cols-[minmax(0,1fr)_310px]">
      <div className="space-y-10">
        <motion.section variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}><h2 className="mb-4 font-inter text-xl font-bold text-on-surface">Visión general del proyecto</h2><p className="whitespace-pre-line leading-relaxed text-on-surface-variant">{project.fullDescription || project.shortDescription}</p></motion.section>
        {highlights.length > 0 && <motion.section variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}><h2 className="mb-5 text-xl font-bold text-on-surface">Características clave</h2><ul className="space-y-4">{highlights.map((highlight, i) => <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-on-surface-variant"><span className="material-symbols-outlined mt-0.5 text-lg text-primary">check_circle</span>{typeof highlight === 'string' ? highlight : highlight.content}</li>)}</ul></motion.section>}
        {collaborators.length > 0 && <motion.section variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="rounded-2xl border border-outline-variant/30 bg-surface-container-low p-6"><h2 className="mb-2 flex items-center gap-2 text-xl font-bold text-on-surface"><span className="material-symbols-outlined text-primary">groups</span>Equipo y colaboradores</h2><p className="mb-5 text-sm text-on-surface-variant">Personas que participaron en este proyecto.</p><div className="space-y-3">{collaborators.map((person, i) => <div key={`${person.name}-${i}`} className="flex flex-wrap items-center gap-3 border-b border-outline-variant/20 py-3 last:border-0">
          {person.avatar ? <img src={person.avatar} alt={person.name} className="h-12 w-12 rounded-full border border-outline-variant/30 object-cover" /> : <div aria-hidden="true" className="grid h-12 w-12 place-items-center rounded-full bg-surface-container-high text-primary"><span className="material-symbols-outlined">person</span></div>}
          <div className="min-w-0 flex-1"><h3 className="font-semibold text-on-surface">{person.name}</h3>{person.role && <p className="text-xs text-on-surface-variant">{person.role}</p>}</div>
          <div className="flex gap-2">{person.github && <a href={person.github} target="_blank" rel="noopener noreferrer" aria-label={`GitHub de ${person.name}`} className="rounded-lg border border-outline-variant/30 p-2 text-primary hover:bg-surface-container-high"><span className="material-symbols-outlined text-lg">code</span></a>}{person.linkedin && <a href={person.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`LinkedIn de ${person.name}`} className="rounded-lg border border-outline-variant/30 p-2 text-primary hover:bg-surface-container-high"><span className="material-symbols-outlined text-lg">work</span></a>}</div>
        </div>)}</div></motion.section>}
      </div>

      <aside className="space-y-5">
        <motion.section variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="rounded-2xl border border-outline-variant/30 bg-surface-container-low p-6"><h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-on-surface">Enlaces del proyecto</h2><div className="space-y-3">
          {liveUrl ? <ExternalLink href={liveUrl} icon="open_in_new" primary>Ver demo pública</ExternalLink> : <div className="flex items-center gap-3 rounded-xl border border-outline-variant/20 bg-surface-container-high/40 p-3 text-xs text-on-surface-variant"><span className="material-symbols-outlined text-xl">info</span><span>Este proyecto no cuenta con una demo pública disponible.</span></div>}
          {githubUrl && <ExternalLink href={githubUrl} icon="code">Ver código en GitHub</ExternalLink>}
          {!githubUrl && <p className="text-xs text-on-surface-variant">El repositorio no se ha compartido públicamente.</p>}
        </div></motion.section>
        {technologies.length > 0 && <motion.section variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="rounded-2xl border border-outline-variant/30 bg-surface-container-low p-6"><h2 className="mb-5 text-sm font-bold uppercase tracking-wider text-on-surface">Tecnologías utilizadas</h2><div className="space-y-3">{technologies.map((tech, index) => <div key={`${tech.name}-${index}`} className="border-b border-outline-variant/20 pb-3 last:border-0 last:pb-0"><div className="flex flex-wrap items-center gap-2"><strong className="text-sm text-on-surface">{tech.name}</strong>{index === 0 && <span className="rounded bg-primary/10 px-2 py-0.5 text-[10px] text-primary">Principal</span>}</div>{tech.role && <p className="mt-1 text-xs text-on-surface-variant">{tech.role}</p>}</div>)}</div></motion.section>}
      </aside>
    </div>
  </article>;
}
