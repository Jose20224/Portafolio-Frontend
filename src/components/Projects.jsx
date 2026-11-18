import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';

const reveal = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.48, ease: 'easeOut' } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

export default function Projects() {
  const { projects, loading } = usePortfolio();
  const featured = projects.filter(project => project.featured).slice(0, 3);
  return <section id="projects" className="py-20 md:py-28 relative bg-pattern"><div className="max-w-[1120px] mx-auto px-4 md:px-10">
    <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="flex flex-col items-center text-center mb-16 space-y-3">
      <span className="text-xs font-geist uppercase tracking-widest text-primary font-semibold px-3 py-1 rounded-full bg-primary-container/20 border border-primary/20">Mi trabajo</span>
      <h2 className="text-3xl md:text-4xl font-bold text-on-surface font-inter">Proyectos destacados</h2><div className="w-12 h-1 bg-primary rounded-full mt-2" />
    </motion.div>
    {loading ? <p className="text-center text-on-surface-variant">Cargando proyectos...</p> : featured.length ?
      <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {featured.map(project => <motion.article key={project.id} variants={reveal} className="glass-card rounded-2xl p-6 border border-outline-variant/30 hover:border-primary/50 transition-colors duration-300 flex flex-col h-full group">
          <Link to={`/proyecto/${project.id}`} className="w-full h-48 rounded-xl overflow-hidden mb-6 block bg-surface-container-high">{project.image && <img src={project.image} alt={project.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />}</Link>
          <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center mb-6"><span className="material-symbols-outlined text-primary text-2xl">code</span></div>
          <Link to={`/proyecto/${project.id}`}><h3 className="text-xl font-bold text-on-surface font-inter mb-3 group-hover:text-primary transition-colors">{project.title}</h3></Link>
          <p className="text-on-surface-variant text-sm font-inter leading-relaxed flex-grow mb-6">{project.shortDescription}</p>
          <div className="flex flex-wrap gap-2 mb-6">{(project.tags || []).slice(0, 4).map(tag => <span key={tag} className="text-xs font-geist px-2.5 py-1 rounded-md bg-surface-container-highest text-on-surface-variant border border-outline-variant/20">{tag}</span>)}</div>
          <div className="flex items-center gap-4 pt-4 border-t border-outline-variant/20 mt-auto"><Link to={`/proyecto/${project.id}`} className="text-sm font-geist text-on-surface hover:text-primary">Ver detalles →</Link>{project.githubUrl && project.githubUrl !== '#' && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-geist text-on-surface hover:text-primary">Código</a>}</div>
        </motion.article>)}
      </motion.div> : <p className="text-center text-on-surface-variant">Todavía no hay proyectos destacados publicados.</p>}
    <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex justify-center mt-12"><Link to="/proyectos" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-primary-container text-on-primary-container font-geist font-medium text-sm hover:bg-primary-container/80 transition-all shadow-lg group">Ver todos los proyectos <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">arrow_forward</span></Link></motion.div>
  </div></section>;
}
