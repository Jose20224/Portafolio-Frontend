import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';

const fadeUp = { hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } };
const defaultParagraphs = ['Me interesa desarrollar aplicaciones web que combinen solidez técnica y una experiencia de usuario clara.', 'Busco crear soluciones digitales útiles, mantenibles y pensadas para crecer.'];
const defaultStrengths = ['Código Limpio y Escalable', 'Enfoque en Resultados'];
const descriptions = ['Estructuras modulares pensadas para crecer de la mano del negocio con total mantenibilidad.', 'Compromiso absoluto con la experiencia de usuario y la optimización del rendimiento general.'];

export default function About() {
  const { profile } = usePortfolio();
  const paragraphs = profile?.about_paragraphs?.filter(Boolean)?.length ? profile.about_paragraphs.filter(Boolean) : defaultParagraphs;
  const strengths = profile?.strengths?.filter(Boolean)?.length ? profile.strengths.filter(Boolean) : defaultStrengths;
  return (
    <section id="about" className="py-20 md:py-28 bg-surface-container-lowest/50 relative overflow-hidden">
      <div className="max-w-[1000px] mx-auto px-4 md:px-10">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="flex flex-col items-center text-center mb-16 space-y-3">
          <span className="text-xs font-geist uppercase tracking-widest text-primary font-semibold px-3 py-1 rounded-full bg-primary-container/20 border border-primary/20">Conóceme mejor</span>
          <h2 className="text-3xl md:text-4xl font-bold text-on-surface font-inter tracking-tight">Sobre mí</h2>
          <div className="w-12 h-1 bg-primary rounded-full mt-2" />
        </motion.div>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-70px' }} className="glass-card p-8 md:p-12 rounded-3xl border border-outline-variant/30 space-y-8 shadow-sm">
          <div className="flex items-center gap-4 pb-6 border-b border-outline-variant/20">
            <div className="p-3.5 rounded-2xl bg-primary-container/30 text-primary shrink-0"><span className="material-symbols-outlined text-3xl leading-none">terminal</span></div>
            <div><h3 className="text-xl md:text-2xl font-bold text-on-surface font-inter">Desarrollador de Software &amp; Creador de Soluciones</h3><p className="text-sm text-primary font-medium mt-0.5">Transformando ideas en experiencias digitales eficientes</p></div>
          </div>
          <div className="space-y-4 text-on-surface-variant leading-relaxed font-inter text-base md:text-lg">{paragraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>)}</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-outline-variant/20">{strengths.map((strength, i) => (
            <motion.div key={`${strength}-${i}`} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-primary-container/30 text-primary mt-1 shrink-0"><span className="material-symbols-outlined text-2xl">{i % 2 === 0 ? 'bolt' : 'verified'}</span></div>
              <div><h4 className="font-semibold text-on-surface text-base font-inter">{strength}</h4>{descriptions[i] && <p className="text-sm text-on-surface-variant font-inter mt-1">{descriptions[i]}</p>}</div>
            </motion.div>
          ))}</div>
        </motion.div>
      </div>
    </section>
  );
}
