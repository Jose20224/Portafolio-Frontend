import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { apiRequest, isApiConfigured } from '../services/api/client';
import { projectsData as fallbackProjects } from '../data/projects';

const PortfolioContext = createContext(null);

export function normalizeProject(project) {
  const technologies = Array.isArray(project.technologies) ? project.technologies : [];
  const highlights = Array.isArray(project.highlights) ? project.highlights : [];
  const collaborators = Array.isArray(project.collaborators) ? project.collaborators : [];
  return {
    ...project,
    id: project.slug || project.id,
    category: project.category?.slug || project.category || 'general',
    categoryLabel: project.category?.label || project.category?.name || project.categoryLabel || 'Proyecto',
    shortDescription: project.short_description ?? project.shortDescription ?? '',
    fullDescription: project.full_description ?? project.fullDescription ?? '',
    image: project.card_image_url || project.cover_image_url || project.image || '',
    tags: technologies.map((item) => item.name).length ? technologies.map((item) => item.name) : (project.tags || []),
    liveUrl: project.live_url ?? project.liveUrl ?? '',
    githubUrl: project.github_url ?? project.githubUrl ?? '',
    featured: project.is_featured ?? project.featured ?? false,
    year: project.year ? String(project.year) : '',
    role: project.role || '',
    highlights: highlights.map((item) => typeof item === 'string' ? item : item.content),
    techStack: technologies.map((item) => ({ name: item.name, role: item.role || '' })),
    collaborators: collaborators.map((item) => ({
      name: item.name,
      role: item.role || '',
      avatar: item.avatar_url || item.avatar || '',
      github: item.github_url || item.github || '',
      linkedin: item.linkedin_url || item.linkedin || '',
    })),
  };
}

export function PortfolioProvider({ children }) {
  const [data, setData] = useState({ profile: null, socialLinks: [], skills: { technical: [], tools: [], interests: [] }, categories: [], projects: fallbackProjects, loading: true, connected: false, error: '' });

  useEffect(() => {
    let active = true;
    if (!isApiConfigured()) {
      setData((current) => ({ ...current, loading: false, error: 'Configura VITE_API_BASE_URL para cargar contenido desde la API.' }));
      return () => { active = false; };
    }

    Promise.allSettled([
      apiRequest('/portfolio/profile'),
      apiRequest('/portfolio/social-links'),
      apiRequest('/portfolio/skills'),
      apiRequest('/portfolio/categories'),
      apiRequest('/portfolio/projects?page=1&limit=50'),
    ]).then((results) => {
      if (!active) return;
      const value = (index, fallback) => results[index].status === 'fulfilled' ? results[index].value : fallback;
      const projectsResponse = value(4, { items: fallbackProjects.map(normalizeProject) });
      const apiProjects = (projectsResponse?.items || []).map(normalizeProject);
      const anySuccess = results.some((item) => item.status === 'fulfilled');
      const failures = results.filter((item) => item.status === 'rejected');
      setData({
        profile: value(0, null),
        socialLinks: value(1, []),
        skills: value(2, { technical: [], tools: [], interests: [] }),
        categories: value(3, []),
        projects: apiProjects.length || anySuccess ? apiProjects : fallbackProjects,
        loading: false,
        connected: anySuccess,
        error: failures.length === results.length ? 'No fue posible conectar con la API. Se muestran datos locales de respaldo.' : '',
      });
    }).catch(() => {
      if (active) setData((current) => ({ ...current, loading: false, error: 'No fue posible cargar el contenido del portafolio.' }));
    });
    return () => { active = false; };
  }, []);

  const value = useMemo(() => data, [data]);
  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
}

export function usePortfolio() {
  const value = useContext(PortfolioContext);
  if (!value) throw new Error('usePortfolio debe usarse dentro de PortfolioProvider.');
  return value;
}
