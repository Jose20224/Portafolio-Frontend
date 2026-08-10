import { motion } from 'framer-motion';

const About = () => {
  // Variantes para el contenedor principal de la sección
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Retraso entre los bloques grandes (Encabezado -> Tarjeta)
        delayChildren: 0.1,
      },
    },
  };

  // Variantes para los bloques contenedores (Tarjetas y marcos principales)
  const containerItemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: "easeOut",
        staggerChildren: 0.15, // Una vez que aparece el contenedor, los textos dentro entran después
        delayChildren: 0.2,    // Asegura un pequeño respiro para que el contenedor tome forma antes del texto
      } 
    },
  };

  // Variantes específicas para las letras, títulos y párrafos internos
  const textItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    },
  };

  return (
    <motion.section 
      id="about" 
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="py-20 md:py-28 bg-surface-container-lowest/50 relative overflow-hidden"
    >
      <div className="max-w-[1000px] mx-auto px-4 md:px-10">
        
        {/* Encabezado de la Sección */}
        <motion.div 
          variants={containerItemVariants}
          className="flex flex-col items-center text-center mb-16 space-y-3"
        >
          <motion.span variants={textItemVariants} className="text-xs font-geist uppercase tracking-widest text-primary font-semibold px-3 py-1 rounded-full bg-primary-container/20 border border-primary/20">
            Conóceme mejor
          </motion.span>
          <motion.h2 variants={textItemVariants} className="text-3xl md:text-4xl font-bold text-on-surface font-inter tracking-tight">
            Sobre mí
          </motion.h2>
          <motion.div variants={textItemVariants} className="w-12 h-1 bg-primary rounded-full mt-2"></motion.div>
        </motion.div>

        {/* Tarjeta Principal Unificada */}
        <motion.div 
          variants={containerItemVariants}
          className="glass-card p-8 md:p-12 rounded-3xl border border-outline-variant/30 space-y-8 shadow-sm"
        >
          
          {/* Cabecera interna (Contenedor del icono y subtítulo) */}
          <motion.div 
            variants={textItemVariants}
            className="flex items-center gap-4 pb-6 border-b border-outline-variant/20"
          >
            <div className="p-3.5 rounded-2xl bg-primary-container/30 text-primary">
              <span className="material-symbols-outlined text-3xl leading-none">
                terminal
              </span>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-on-surface font-inter">
                Desarrollador de Software & Creador de Soluciones
              </h3>
              <p className="text-sm text-primary font-medium mt-0.5">
                Transformando ideas en experiencias digitales eficientes
              </p>
            </div>
          </motion.div>
          
          {/* Párrafos */}
          <motion.div 
            variants={textItemVariants}
            className="space-y-4 text-on-surface-variant leading-relaxed font-inter text-base md:text-lg"
          >
            <p>
              Me entusiasma desarrollar aplicaciones web que sobresalgan tanto por su alto rendimiento técnico como por su experiencia de usuario. Mi visión integral abarca desde la arquitectura de bases de datos y la solidez de las APIs en el backend, hasta la creación de interfaces dinámicas, responsivas y atractivas en el frontend, asegurando que cada proyecto no solo cumpla con los estándares de calidad, sino que también ofrezca una experiencia memorable a los usuarios.
            </p>

            <p>
              Aprovecho el potencial de la inteligencia artificial como aliada en mi día a día para agilizar el prototipado, potenciar la eficiencia y asegurar un estándar de calidad elevado, siempre con el objetivo de ofrecer soluciones digitales que no solo cumplan, sino que superen las expectativas de los usuarios.
            </p>
          </motion.div>

          {/* Bloque de fortalezas técnicas */}
          <motion.div 
            variants={textItemVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-outline-variant/20"
          >
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-primary-container/30 text-primary mt-1">
                <span className="material-symbols-outlined text-2xl">bolt</span>
              </div>
              <div>
                <h4 className="font-semibold text-on-surface text-base font-inter">Código Limpio y Escalable</h4>
                <p className="text-sm text-on-surface-variant font-inter mt-1">
                  Estructuras modulares pensadas para crecer de la mano del negocio con total mantenibilidad.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-primary-container/30 text-primary mt-1">
                <span className="material-symbols-outlined text-2xl">verified</span>
              </div>
              <div>
                <h4 className="font-semibold text-on-surface text-base font-inter">Enfoque en Resultados</h4>
                <p className="text-sm text-on-surface-variant font-inter mt-1">
                  Compromiso absoluto con la experiencia de usuario y la optimización del rendimiento general.
                </p>
              </div>
            </div>
          </motion.div>

        </motion.div>

      </div>
    </motion.section>
  );
};

export default About; 