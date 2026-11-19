import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';

const COLLABORATION = [
  { value: 'all', label: 'Todos' },
  { value: 'individual', label: 'Individual' },
  { value: 'team', label: 'En colaboración' },
];

export default function ProjectsGrid() {
  const { projects = [], categories = [], loading, error } = usePortfolio();
  const [category, setCategory] = useState('all');
  const [collaboration, setCollaboration] = useState('all');
  const [technology, setTechnology] = useState('all');
  const [search, setSearch] = useState('');

  const publishedCategories = useMemo(() => {
    const used = new Set(projects.map((project) => project.category));
    return categories.filter((item) => used.has(item.slug));
  }, [categories, projects]);

  const technologies = useMemo(() => {
    const names = new Map();
    for (const project of projects) {
      for (const tag of project.tags || []) {
        const name = String(tag).trim();
        if (name) names.set(name.toLocaleLowerCase('es'), name);
      }
    }
    return [...names.entries()]
      .sort((a, b) => a[1].localeCompare(b[1], 'es'))
      .map(([value, label]) => ({ value, label }));
  }, [projects]);

  const filtered = useMemo(() => {
    const term = search.trim().toLocaleLowerCase('es');
    return projects.filter((project) => {
      const collaborators = Array.isArray(project.collaborators) ? project.collaborators : [];
      const tags = Array.isArray(project.tags) ? project.tags : [];
      if (category !== 'all' && project.category !== category) return false;
      if (collaboration === 'individual' && collaborators.length > 0) return false;
      if (collaboration === 'team' && collaborators.length === 0) return false;
      if (technology !== 'all' && !tags.some((tag) => String(tag).trim().toLocaleLowerCase('es') === technology)) return false;
      const haystack = [project.title, project.shortDescription, project.fullDescription, ...tags]
        .filter(Boolean).join(' ').toLocaleLowerCase('es');
      return !term || haystack.includes(term);
    });
  }, [projects, category, collaboration, technology, search]);

  const reset = () => { setCategory('all'); setCollaboration('all'); setTechnology('all'); setSearch(''); };
  const selectStyle = 'w-full rounded-xl border border-outline-variant/40 bg-surface-container-high/50 px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary';

  return (
    <main className="max-w-[1120px] mx-auto px-4 md:px-10 py-14 md:py-20">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-5 border-b border-outline-variant/30 pb-8 mb-9">
        <div>
          <span className="text-xs uppercase tracking-widest text-primary">Galería de software</span>
          <h1 className="text-3xl md:text-4xl font-bold text-on-surface mt-2">Todos los proyectos</h1>
          <p className="text-sm text-on-surface-variant mt-2">Explora las aplicaciones, sistemas e interfaces desarrolladas.</p>
        </div>
        <Link to="/" className="text-sm text-on-surface-variant hover:text-primary">← Volver al inicio</Link>
      </header>

      <section aria-label="Filtrar proyectos" className="space-y-5 mb-9">
        <label className="block">
          <span className="sr-only">Buscar proyectos</span>
          <input className={selectStyle} placeholder="Buscar por nombre, descripción o tecnología..." value={search} onChange={(event) => setSearch(event.target.value)} />
        </label>
        <div>
          <p className="text-sm font-semibold text-on-surface mb-3">Categoría principal</p>
          <div className="flex flex-wrap gap-2">
            {[{ slug: 'all', label: 'Todas' }, ...publishedCategories].map((item) => (
              <button type="button" key={item.slug} aria-pressed={category === item.slug}
                onClick={() => setCategory(item.slug)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${category === item.slug ? 'bg-primary-container text-on-primary-container' : 'bg-surface-container-high text-on-surface-variant border border-outline-variant/30 hover:border-primary/50'}`}>
                {item.label || item.name}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="block text-sm font-semibold text-on-surface">
            Colaboración
            <select className={`${selectStyle} mt-2`} value={collaboration} onChange={(event) => setCollaboration(event.target.value)}>
              {COLLABORATION.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
            </select>
          </label>
          <label className="block text-sm font-semibold text-on-surface">
            Tecnología utilizada
            <select className={`${selectStyle} mt-2`} value={technology} onChange={(event) => setTechnology(event.target.value)}>
              <option value="all">Todas las tecnologías</option>
              {technologies.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
            </select>
          </label>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p aria-live="polite" className="text-xs text-on-surface-variant">{filtered.length} {filtered.length === 1 ? 'proyecto encontrado' : 'proyectos encontrados'}</p>
          <button type="button" onClick={reset} className="text-xs font-semibold text-primary hover:underline">Limpiar filtros</button>
        </div>
      </section>

      {error && <p role="status" className="mb-5 text-sm text-on-surface-variant">{error}</p>}
      {loading ? <p className="text-on-surface-variant text-sm">Cargando proyectos...</p> : filtered.length ? (
        <div className="grid md:grid-cols-2 gap-7">
          {filtered.map((project) => (
            <Link key={project.id} to={`/proyecto/${project.id}`} className="group rounded-2xl overflow-hidden border border-outline-variant/30 bg-surface-container-low hover:border-primary/50 transition">
              <div className="h-52 bg-surface-container-high overflow-hidden">
                {project.image && <img src={project.image} alt={project.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-[1.02] transition" />}
              </div>
              <div className="p-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs text-primary">{project.categoryLabel}</span>
                  <span className="text-xs text-on-surface-variant">{project.collaborators?.length ? 'En colaboración' : 'Individual'}</span>
                </div>
                <h2 className="text-xl font-bold text-on-surface mt-2">{project.title}</h2>
                <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">{project.shortDescription}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {(project.tags || []).map((tag) => <span key={tag} className="text-[10px] bg-surface-container-high px-2 py-1 rounded">{tag}</span>)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-on-surface-variant">
          <p>No hay proyectos que coincidan con los filtros seleccionados.</p>
          <button type="button" onClick={reset} className="mt-4 text-sm text-primary hover:underline">Restablecer búsqueda</button>
        </div>
      )}
    </main>
  );
}
