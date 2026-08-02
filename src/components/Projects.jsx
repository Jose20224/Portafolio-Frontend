// 1. Creamos nuestro arreglo de datos (puedes personalizar esto con tus proyectos reales)
const projectsData = [
  {
    id: 1,
    img: "https://tse3.mm.bing.net/th/id/OIP.MNg5diq2QTdikRbNYkbhNwHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    title: "E-Commerce API REST",
    description:
      "Plataforma de comercio electrónico con autenticación, pasarela de pagos y panel de administración.",
    techStack: ["Node.js", "Express", "MongoDB", "React"],
    repoLink: "#",
    liveLink: "#",
    icon: "shopping_cart",
  },
  {
    id: 2,
    img: "https://th.bing.com/th/id/R.b148b26e8e0b6247268b6fdaed488c2e?rik=pg66FGum%2f0W8hQ&riu=http%3a%2f%2f247tecno.com%2fwp-content%2fuploads%2f2018%2f05%2fTipos-de-tecnologia.jpg&ehk=crnK8pLfL%2f8OT4sUoqlw5xP1ej%2bFvxiaoynbM8dUyTo%3d&risl=&pid=ImgRaw&r=0",
    title: "Dashboard Financiero",
    description:
      "Aplicación web para la gestión de finanzas personales con gráficos interactivos y reportes en tiempo real.",
    techStack: ["React", "Tailwind CSS", "Firebase", "Chart.js"],
    repoLink: "#",
    liveLink: "#",
    icon: "query_stats",
  },
  {
    id: 3,
    img: "https://tse1.mm.bing.net/th/id/OIP.YbsG5DnORrDlK-JUFv1SVgHaII?r=0&pid=ImgDet&w=474&h=520&rs=1&o=7&rm=3",
    title: "Sistema de Gestión de Inventario",
    description:
      "Software empresarial para el control de stock, proveedores y facturación electrónica.",
    techStack: ["Java", "Spring Boot", "PostgreSQL", "Angular"],
    repoLink: "#",
    liveLink: "#",
    icon: "inventory_2",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-20 md:py-28 relative bg-pattern">
      <div className="max-w-[1120px] mx-auto px-4 md:px-10">
        {/* Encabezado de la Sección */}
        <div className="flex flex-col items-center text-center mb-16 space-y-3">
          <span className="text-xs font-geist uppercase tracking-widest text-primary font-semibold px-3 py-1 rounded-full bg-primary-container/20 border border-primary/20">
            Mi Trabajo
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-on-surface font-inter tracking-tight">
            Proyectos Destacados
          </h2>
          <div className="w-12 h-1 bg-primary rounded-full mt-2"></div>
        </div>

        {/* Grid Dinámico de Proyectos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Aquí ocurre la magia de React: iteramos sobre el arreglo de datos */}
          {projectsData.map((project) => (
            <div
              key={project.id}
              className="glass-card rounded-2xl p-6 border border-outline-variant/30 hover:border-primary/50 transition-colors duration-300 flex flex-col h-full group"
            >
              {/* Imagen del proyecto */}
              <div className="w-full h-48 rounded-xl overflow-hidden mb-6">
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              {/* Icono del proyecto */}
              <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-primary text-2xl">
                  {project.icon}
                </span>
              </div>

              {/* Información principal */}
              <h3 className="text-xl font-bold text-on-surface font-inter mb-3">
                {project.title}
              </h3>
              <p className="text-on-surface-variant text-sm font-inter leading-relaxed flex-grow mb-6">
                {project.description}
              </p>

              {/* Etiquetas de Tecnologías (Otro .map interno) */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.techStack.map((tech, index) => (
                  <span
                    key={index}
                    className="text-xs font-geist px-2.5 py-1 rounded-md bg-surface-container-highest text-on-surface-variant border border-outline-variant/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Enlaces de Acción */}
              <div className="flex items-center gap-4 pt-4 border-t border-outline-variant/20 mt-auto">
                <a
                  href={project.repoLink}
                  className="flex items-center gap-1.5 text-sm font-geist text-on-surface hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-base">
                    code
                  </span>
                  Código
                </a>
                <a
                  href={project.liveLink}
                  className="flex items-center gap-1.5 text-sm font-geist text-on-surface hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-base">
                    open_in_new
                  </span>
                  Demo
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Botón Centrado para ver más proyectos */}
        <div className="flex justify-center mt-12">
          <a
            href="/todos-los-proyectos"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-primary-container text-on-primary-container font-geist font-medium text-sm hover:bg-primary-container/80 transition-all duration-300 shadow-lg shadow-primary/20 group"
          >
            <span>Ver todos los proyectos</span>
            <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
