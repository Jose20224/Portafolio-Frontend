import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projectsData } from '../data/projects';

const ProjectDetail = () => {
  // Extraemos el parámetro :id directamente de la URL actual
  const { id } = useParams();

  // Buscar la información del proyecto activo por ID usando el id de la URL
  const project = useMemo(() => {
    return projectsData.find((p) => String(p.id) === String(id)) || projectsData[0];
  }, [id]);

  return (
    <motion.article 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="py-12 md:py-20 px-4 md:px-10 max-w-[1000px] mx-auto w-full"
    >
      {/* Navegación de migas de pan / Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs md:text-sm text-on-surface-variant font-geist mb-8 flex-wrap">
        <Link 
          to="/"
          className="hover:text-primary transition-colors cursor-pointer"
        >
          Inicio
        </Link>
        <span className="text-outline">/</span>
        <Link 
          to="/proyectos"
          className="hover:text-primary transition-colors cursor-pointer"
        >
          Proyectos
        </Link>
        <span className="text-outline">/</span>
        <span className="text-on-surface font-semibold truncate">{project.title}</span>
      </nav>

      {/* Botón de Regresar a la Galería usando Link */}
      <Link
        to="/proyectos"
        className="inline-flex items-center gap-2 px-4 py-2 bg-surface-container-high/60 hover:bg-surface-container-high text-on-surface rounded-xl text-xs uppercase tracking-wider font-geist mb-8 transition-colors border border-outline-variant/30 cursor-pointer"
      >
        <span className="material-symbols-outlined text-sm">arrow_back</span>
        Volver a todos los proyectos
      </Link>

      {/* Encabezado del Proyecto con Animación */}
      <motion.header 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        className="mb-10"
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-lg text-xs font-semibold font-geist border border-primary/20">
            {project.categoryLabel}
          </span>
          <span className="text-xs font-mono text-on-surface-variant">Año {project.year}</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-bold text-on-surface font-inter tracking-tight">
          {project.title}
        </h1>

        <p className="text-lg md:text-xl text-on-surface-variant mt-4 font-geist leading-relaxed">
          {project.shortDescription}
        </p>

        {/* Metadatos rápidos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8 p-4 bg-surface-container-low rounded-xl border border-outline-variant/30">
          <div>
            <span className="text-xs text-outline uppercase font-geist">Rol desempeñado</span>
            <p className="text-sm font-semibold text-on-surface font-inter mt-1">{project.role}</p>
          </div>
          <div>
            <span className="text-xs text-outline uppercase font-geist">Tecnología Clave</span>
            <p className="text-sm font-semibold text-on-surface font-inter mt-1">{project.tags[0]}</p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <span className="text-xs text-outline uppercase font-geist">Estado</span>
            <p className="text-sm font-semibold text-primary font-inter mt-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-primary inline-block animate-pulse"></span>
              Completado
            </p>
          </div>
        </div>
      </motion.header>

      {/* Previsualización Principal de Imagen con Scroll Reveal */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="rounded-2xl overflow-hidden border border-outline-variant/30 bg-surface-container-high mb-12 shadow-2xl"
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-[320px] md:h-[480px] object-cover"
        />
      </motion.div>

      {/* Cuerpo del Detalle */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
        {/* Columna Principal: Descripción y Puntos Clave */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="md:col-span-2 space-y-8"
        >
          <section>
            <h2 className="text-xl font-bold text-on-surface font-inter mb-3">
              Visión General del Proyecto
            </h2>
            <p className="text-on-surface-variant font-geist leading-relaxed text-base">
              {project.fullDescription}
            </p>
          </section>

          {/* Características destacadas */}
          <section>
            <h2 className="text-xl font-bold text-on-surface font-inter mb-4">
              Características Clave
            </h2>
            <ul className="space-y-3">
              {project.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-xl mt-0.5">
                    check_circle
                  </span>
                  <span className="text-on-surface-variant font-geist text-sm md:text-base">
                    {highlight}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </motion.div>

        {/* Columna Lateral: Tech Stack y Enlaces */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="space-y-8"
        >
          {/* Botones de acción */}
          <div className="p-6 bg-surface-container-low rounded-2xl border border-outline-variant/30 space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-on-surface font-geist mb-2">
              Enlaces Directos
            </h3>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 bg-primary-container text-on-primary-container hover:scale-[0.98] rounded-xl text-xs font-semibold uppercase tracking-wider font-geist transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-base">open_in_new</span>
              Ver sitio en vivo
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 bg-surface-container-high hover:bg-surface-container text-on-surface rounded-xl text-xs font-semibold uppercase tracking-wider font-geist transition-all flex items-center justify-center gap-2 border border-outline-variant/30"
            >
              <span className="material-symbols-outlined text-base">code</span>
              Código en GitHub
            </a>
          </div>

          {/* Stack Tecnológico Detallado */}
          <div className="p-6 bg-surface-container-low rounded-2xl border border-outline-variant/30">
            <h3 className="text-sm font-bold uppercase tracking-wider text-on-surface font-geist mb-4">
              Tecnologías Utilizadas
            </h3>
            <div className="space-y-3">
              {project.techStack.map((tech, index) => (
                <div key={index} className="border-b border-outline-variant/20 pb-2.5 last:border-none last:pb-0">
                  <span className="text-sm font-semibold text-on-surface font-inter block">
                    {tech.name}
                  </span>
                  <span className="text-xs text-on-surface-variant font-geist">
                    {tech.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Sección de Colaboradores */}
      {project.collaborators && project.collaborators.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="p-6 bg-surface-container-low rounded-2xl border border-outline-variant/30"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-on-surface font-geist flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-base">group</span>
              Equipo / Colaboradores ({project.collaborators.length})
            </h3>
          </div>
          <span className="text-sm text-on-surface-variant font-geist mb-4 block">
            Colaboradores que contribuyeron al desarrollo del proyecto.
          </span>
          <div className="space-y-4">
            {project.collaborators.map((collab, index) => (
              <div key={index} className="flex items-center justify-between gap-3 border-b border-outline-variant/20 pb-3 last:border-none last:pb-0">
                <div className="flex items-center gap-3">
                  <img
                    src={collab.avatar}
                    alt={collab.name}
                    className="w-10 h-10 rounded-full object-cover border border-outline-variant/40"
                  />
                  <div>
                    <h4 className="text-sm font-semibold text-on-surface font-inter">
                      {collab.name}
                    </h4>
                    <p className="text-xs text-on-surface-variant font-geist">
                      {collab.role}
                    </p>
                  </div>
                </div>

                {/* Enlaces al perfil del colaborador */}
                <div className="flex items-center gap-1">
                  {collab.github && (
                    <a
                      href={collab.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`GitHub de ${collab.name}`}
                      className="p-1.5 text-on-surface-variant hover:text-primary transition-colors"
                    >
                      <span className="material-symbols-outlined text-lg">code</span>
                    </a>
                  )}
                  {collab.linkedin && (
                    <a
                      href={collab.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`LinkedIn de ${collab.name}`}
                      className="p-1.5 text-on-surface-variant hover:text-primary transition-colors"
                    >
                      <span className="material-symbols-outlined text-lg">person</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.article>
  );
};

export default ProjectDetail;