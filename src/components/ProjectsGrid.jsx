import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projectsData } from '../data/projects';

const ProjectsGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Categorías disponibles
  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'web', label: 'Desarrollo Web' },
    { id: 'systems', label: 'Sistemas & Backend' },
    { id: 'mobile', label: 'Móvil' },
    { id: 'ui-ux', label: 'UI / UX' },
  ];

  // Filtrado de proyectos por categoría y término de búsqueda
  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
      const matchesSearch = 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }} // Duración más suave y pausada
      className="py-12 md:py-20 px-4 md:px-10 max-w-[1120px] mx-auto w-full"
    >
      {/* Encabezado de la Sección */}
      <motion.div   
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mb-10 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-outline-variant/30 pb-8"
      >
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-primary font-geist">
            Galería de Software
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-on-surface mt-2 font-inter">
            Todos los Proyectos
          </h1>
          <p className="text-on-surface-variant text-sm md:text-base mt-2 max-w-2xl font-geist">
            Explora la colección completa de aplicaciones, sistemas distribuidos e interfaces construidas con precisión técnica.
          </p>
        </div>

        {/* Botón rápido de volver al Home usando Link */}
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-on-surface-variant hover:text-primary transition-colors font-geist cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            Volver al inicio
          </Link>
        </div>
      </motion.div>

      {/* Barra de Búsqueda y Filtros por Categoría */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="flex flex-col md:flex-row gap-4 justify-between items-center mb-10"
      >
        {/* Filtros */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-medium font-geist tracking-wider uppercase transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-primary-container text-on-primary-container shadow-md scale-105'
                  : 'bg-surface-container-high/60 text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface border border-outline-variant/30'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Buscador */}
        <div className="relative w-full md:w-72">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-xl">
            search
          </span>
          <input
            type="text"
            placeholder="Buscar por tecnología o nombre..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-surface-container-high/50 border border-outline-variant/40 rounded-xl text-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary transition-colors font-geist"
          />
        </div>
      </motion.div>

      {/* Rejilla de Proyectos con Animación de Scroll */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }} // Se anima solo al hacer scroll y verlas
              viewport={{ once: true, margin: "-50px" }} // Se activa una sola vez cuando entran al viewport
              transition={{ duration: 1.7, delay: (index % 2) * 0.25 }} // Retraso escalonado controlado
              className="group bg-surface-container-low border border-outline-variant/30 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between"
            >
              <div>
                {/* Imagen del proyecto */}
                <div className="relative h-48 md:h-56 overflow-hidden bg-surface-container-high">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Categoría */}
                  <div className="absolute top-3 left-3 bg-surface/90 backdrop-blur-md text-on-surface px-3 py-1 rounded-lg text-xs font-semibold font-geist border border-outline-variant/30">
                    {project.categoryLabel}
                  </div>

                  {/* Badges de Colaboradores superpuestos */}
                  {project.collaborators && project.collaborators.length > 0 && (
                    <div className="absolute bottom-3 left-3 bg-surface/90 backdrop-blur-md px-2 py-1 rounded-full border border-outline-variant/30 flex items-center gap-1.5">
                      <div className="flex -space-x-2 overflow-hidden">
                        {project.collaborators.map((collab, idx) => (
                          <img
                            key={idx}
                            src={collab.avatar}
                            alt={collab.name}
                            title={`${collab.name} (${collab.role})`}
                            className="inline-block h-6 w-6 rounded-full ring-2 ring-surface object-cover"
                          />
                        ))}
                      </div>
                      <span className="text-[10px] font-medium text-on-surface-variant font-geist pr-1">
                        +{project.collaborators.length} {project.collaborators.length === 1 ? 'colaborador' : 'colaboradores'}
                      </span>
                    </div>
                  )}

                  <div className="absolute top-3 right-3 bg-surface/90 backdrop-blur-md text-on-surface-variant px-2.5 py-1 rounded-lg text-xs font-mono">
                    {project.year}
                  </div>
                </div>

                {/* Contenido */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-on-surface group-hover:text-primary transition-colors font-inter">
                    {project.title}
                  </h3>
                  <p className="text-on-surface-variant text-sm mt-2 line-clamp-2 font-geist leading-relaxed">
                    {project.shortDescription}
                  </p>

                  {/* Badges de Tecnología */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-surface-container-high text-on-surface-variant px-2.5 py-1 rounded-md text-xs font-mono border border-outline-variant/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Botón de Acción con Link hacia la ruta dinámica del detalle */}
              <div className="p-6 pt-0 mt-2">
                <Link
                  to={`/proyecto/${project.id}`}
                  className="w-full py-2.5 bg-primary-container/20 text-primary hover:bg-primary-container hover:text-on-primary-container rounded-xl text-xs font-semibold uppercase tracking-wider font-geist transition-all flex items-center justify-center gap-2 cursor-pointer border border-primary/20"
                >
                  <span>Ver detalles del proyecto</span>
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        /* Estado sin resultados */
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-20 bg-surface-container-low rounded-2xl border border-outline-variant/30"
        >
          <span className="material-symbols-outlined text-4xl text-outline mb-2">
            search_off
          </span>
          <h3 className="text-lg font-bold text-on-surface font-inter">No se encontraron proyectos</h3>
          <p className="text-on-surface-variant text-sm mt-1 font-geist">
            Prueba a cambiar el término de búsqueda o selecciona otra categoría.
          </p>
          <button
            onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
            className="mt-4 px-4 py-2 bg-primary-container text-on-primary-container text-xs uppercase font-geist tracking-wider rounded-lg cursor-pointer"
          >
            Limpiar filtros
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProjectsGrid;