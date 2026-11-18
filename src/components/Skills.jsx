import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';

const defaultTechnical = [
  { name: 'Backend Development (Django/Python)', level: 90 },
  { name: 'Frontend (HTML, CSS, JavaScript)', level: 75 },
  { name: 'Cybersecurity Fundamentals', level: 80 },
  { name: 'Databases (SQL)', level: 85 },
];
const defaultTools = ['Git / GitHub', 'Docker', 'CI/CD', 'Linux', 'Postman', 'Tailwind CSS'].map(name => ({ name }));
const defaultInterests = ['Desarrollo Backend y Arquitectura de Software', 'Desarrollo Web Full Stack', 'Ciberseguridad y Desarrollo Seguro'].map(name => ({ name }));
const fade = { initial: { opacity: 0, y: 18 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-55px' } };

export default function Skills() {
  const { skills } = usePortfolio();
  const technical = skills?.technical?.length ? skills.technical : defaultTechnical;
  const tools = skills?.tools?.length ? skills.tools : defaultTools;
  const interests = skills?.interests?.length ? skills.interests : defaultInterests;
  return (
    <section id="skills" className="py-24 bg-surface-container-lowest">
      <div className="max-w-[1120px] mx-auto px-5">
        <motion.div {...fade} transition={{ duration: 0.45 }} className="text-center mb-20"><span className="uppercase tracking-[.25em] text-primary text-sm font-semibold">Competencias</span><h2 className="mt-3 text-4xl md:text-5xl font-bold text-on-surface">Habilidades Técnicas</h2><div className="w-20 h-1 bg-primary rounded-full mx-auto mt-6" /></motion.div>
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-14 items-start">
          <div>
            <motion.div initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex items-center gap-4 mb-10"><div className="w-1 h-10 bg-primary rounded-full"/><h3 className="text-2xl md:text-3xl font-bold text-on-surface uppercase tracking-wide">Habilidades Técnicas</h3></motion.div>
            <div className="space-y-10">{technical.map((skill, i) => <motion.div key={skill.id || skill.name || i} {...fade} transition={{ delay: i * 0.08 }}><div className="flex justify-between gap-3 mb-2"><h4 className="uppercase text-sm font-semibold text-on-surface tracking-wide">{skill.name}</h4>{skill.level != null && <span className="text-primary font-bold">{skill.level}%</span>}</div>{skill.level != null && <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden"><motion.div className="h-full bg-primary" initial={{ width: 0 }} whileInView={{ width: `${Math.min(100, Math.max(0, Number(skill.level) || 0))}%` }} viewport={{ once: true }} transition={{ duration: 1.5, delay: i * 0.1 }} /></div>}</motion.div>)}</div>
            <motion.div {...fade} className="mt-20"><h3 className="text-2xl md:text-3xl font-bold text-on-surface uppercase mb-8">Herramientas</h3><div className="flex flex-wrap gap-4">{tools.map((tool, i) => <motion.span key={tool.id || tool.name || i} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ y: -3 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="border border-outline-variant px-5 py-3 text-sm font-medium text-on-surface rounded-md hover:border-primary hover:text-primary transition-colors">{tool.name}</motion.span>)}</div></motion.div>
          </div>
          <div className="space-y-8">
            <motion.div initial={{ opacity: 0, scale: .97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="overflow-hidden rounded-xl border-2 border-primary/50 shadow-2xl"><img src="https://tse3.mm.bing.net/th/id/OIP.Gth_puJzNWkdEYkynYwqCgHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" alt="Ciberseguridad y tecnología" loading="lazy" className="w-full h-[280px] object-cover hover:scale-105 transition-transform duration-500" /></motion.div>
            <motion.div {...fade} className="glass-card rounded-xl p-8 border border-outline-variant"><div className="flex items-center gap-3 mb-6"><span className="material-symbols-outlined text-primary">target</span><h3 className="text-2xl font-bold text-on-surface uppercase">Áreas de Interés</h3></div><ul className="space-y-5">{interests.map((interest, i) => <motion.li key={interest.id || interest.name || i} initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * .08 }} className="flex items-center gap-4 text-on-surface-variant"><div className="w-2.5 h-2.5 bg-primary rotate-45 shrink-0"/><span>{interest.name}</span></motion.li>)}</ul></motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
