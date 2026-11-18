import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import heroFallback from '../assets/hero.png';

const item = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } } };
const imageMotion = { hidden: { opacity: 0, y: 16, scale: 0.96 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease: 'easeOut', delay: 0.15 } } };

export default function Hero() {
  const { profile, socialLinks } = usePortfolio();
  const name = profile?.full_name || 'Jose Miguel Rostrand';
  const badge = profile?.hero_badge_text || 'Disponible para proyectos y oportunidades';
  const title = profile?.professional_title || 'Ingeniero de Sistemas';
  const description = profile?.hero_description || 'Construyo soluciones digitales modernas, escalables y eficientes, combinando desarrollo y experiencia de usuario.';
  const socials = Array.isArray(socialLinks) ? socialLinks.filter(link => link.is_visible !== false).slice(0, 3) : [];
  return (
    <section id="hero" className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden bg-pattern">
      <div className="max-w-[1120px] mx-auto px-4 md:px-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: 0.1 }} className="flex-1 space-y-6 text-center lg:text-left">
            <motion.div variants={item} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-high border border-outline-variant/40 text-xs font-geist text-primary">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />{badge}
            </motion.div>
            <motion.h1 variants={item} className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-on-surface font-inter leading-tight">
              Hola, soy <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-container to-on-primary-container">{name}</span>
            </motion.h1>
            <motion.p variants={item} className="text-primary font-semibold text-lg">{title}</motion.p>
            <motion.p variants={item} className="text-lg md:text-xl text-on-surface-variant font-inter max-w-2xl mx-auto lg:mx-0 leading-relaxed">{description}</motion.p>
            <motion.div variants={item} className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
              <a href="#projects" className="bg-primary-container hover:bg-primary-container/80 text-on-primary-container font-medium px-6 py-3 rounded-xl transition-all shadow-lg glow-border flex items-center gap-2 font-geist text-sm">Ver proyectos <span className="material-symbols-outlined text-lg">arrow_downward</span></a>
              <a href="#contact" className="glass-card hover:bg-surface-container-high text-on-surface font-medium px-6 py-3 rounded-xl border border-outline-variant/50 transition-all flex items-center gap-2 font-geist text-sm">Contáctame <span className="material-symbols-outlined text-lg">mail</span></a>
            </motion.div>
            
{socials.length > 0 && (
  <motion.div
    variants={item}
    className="pt-5 flex flex-wrap items-center justify-center lg:justify-start gap-3"
  >
    {socials.map((link) => {
      const platform = (link.platform || '').toLowerCase();

      const icons = {
        github: 'code',
        linkedin: 'work',
        instagram: 'photo_camera',
        facebook: 'public',
        twitter: 'alternate_email',
        x: 'alternate_email',
        youtube: 'smart_display',
        tiktok: 'music_note',
        website: 'language',
      };

      const icon = icons[platform] || 'link';

      return (
        <motion.a
          key={link.id || link.url}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ y: -4, scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.2 }}
          className="
            group flex items-center gap-3
            px-4 py-2.5
            rounded-xl
            bg-surface-container-high/60
            border border-outline-variant/40
            text-on-surface-variant
            hover:text-primary
            hover:border-primary/50
            hover:bg-primary-container/10
            hover:shadow-lg hover:shadow-primary/10
            transition-colors duration-300
          "
        >
          <span className="material-symbols-outlined text-xl group-hover:scale-110 transition-transform duration-300">
            {icon}
          </span>

          <span className="text-sm font-geist font-medium">
            {link.label || link.platform}
          </span>

          <span className="material-symbols-outlined text-base opacity-50 group-hover:opacity-100 transition-opacity">
            north_east
          </span>
        </motion.a>
      );
    })}
  </motion.div>
)}

          </motion.div>
          
          <motion.div variants={imageMotion} initial="hidden" animate="visible" className="flex-1 flex justify-center w-full max-w-md lg:max-w-none">
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary-container to-primary opacity-25 blur-2xl" />
              <div className="relative w-full h-full rounded-3xl glass-card glow-border p-3 overflow-hidden flex items-center justify-center">
                <img src={profile?.hero_image_url || heroFallback} alt={`Presentación de ${name}`} className="w-full h-full object-cover rounded-2xl" onError={(event) => { if (event.currentTarget.src !== new URL(heroFallback, window.location.href).href) event.currentTarget.src = heroFallback; }} />
              </div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65, duration: 0.4 }} className="absolute -bottom-4 -left-4 glass-card px-4 py-2.5 rounded-2xl border border-outline-variant/40 flex items-center gap-3 shadow-xl">
                <div className="p-2 rounded-xl bg-primary-container/40 text-primary"><span className="material-symbols-outlined">terminal</span></div>
                <div><p className="text-xs text-on-surface-variant font-geist">Especialidad</p><p className="text-sm font-semibold text-on-surface font-inter">{title}</p></div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
