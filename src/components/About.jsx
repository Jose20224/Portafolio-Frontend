import { motion } from "framer-motion";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

const About = () => {
  return (
    <motion.section
      id="about"
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        margin: "-80px",
      }}
      className="py-20 md:py-28 bg-surface-container-lowest/50 relative overflow-hidden"
    >
      <div className="max-w-[1000px] mx-auto px-4 md:px-10">

        {/* Encabezado */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col items-center text-center mb-16 space-y-3"
        >
          <span className="text-xs font-geist uppercase tracking-widest text-primary font-semibold px-3 py-1 rounded-full bg-primary-container/20 border border-primary/20">
            Conóceme mejor
          </span>

          <h2 className="text-3xl md:text-4xl font-bold text-on-surface font-inter tracking-tight">
            Sobre mí
          </h2>

          <div className="w-12 h-1 bg-primary rounded-full mt-2" />
        </motion.div>


        {/* Tarjeta principal */}
        <motion.div
          variants={fadeUp}
          className="glass-card p-8 md:p-12 rounded-3xl border border-outline-variant/30 space-y-8 shadow-sm"
        >

          {/* Cabecera */}
          <div className="flex items-center gap-4 pb-6 border-b border-outline-variant/20">
            <div className="p-3.5 rounded-2xl bg-primary-container/30 text-primary shrink-0">
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
          </div>


          {/* Descripción */}
          <div className="space-y-4 text-on-surface-variant leading-relaxed font-inter text-base md:text-lg">
            <p>
              Me entusiasma desarrollar aplicaciones web que sobresalgan tanto
              por su alto rendimiento técnico como por su experiencia de usuario.
              Mi visión integral abarca desde la arquitectura de bases de datos
              y la solidez de las APIs en el backend, hasta la creación de
              interfaces dinámicas, responsivas y atractivas en el frontend,
              asegurando que cada proyecto no solo cumpla con los estándares de
              calidad, sino que también ofrezca una experiencia memorable a los
              usuarios.
            </p>

            <p>
              Aprovecho el potencial de la inteligencia artificial como aliada
              en mi día a día para agilizar el prototipado, potenciar la
              eficiencia y asegurar un estándar de calidad elevado, siempre con
              el objetivo de ofrecer soluciones digitales que no solo cumplan,
              sino que superen las expectativas de los usuarios.
            </p>
          </div>


          {/* Fortalezas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-outline-variant/20">

            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-primary-container/30 text-primary mt-1">
                <span className="material-symbols-outlined text-2xl">
                  bolt
                </span>
              </div>

              <div>
                <h4 className="font-semibold text-on-surface text-base font-inter">
                  Código Limpio y Escalable
                </h4>

                <p className="text-sm text-on-surface-variant font-inter mt-1">
                  Estructuras modulares pensadas para crecer de la mano del
                  negocio con total mantenibilidad.
                </p>
              </div>
            </div>


            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-primary-container/30 text-primary mt-1">
                <span className="material-symbols-outlined text-2xl">
                  verified
                </span>
              </div>

              <div>
                <h4 className="font-semibold text-on-surface text-base font-inter">
                  Enfoque en Resultados
                </h4>

                <p className="text-sm text-on-surface-variant font-inter mt-1">
                  Compromiso absoluto con la experiencia de usuario y la
                  optimización del rendimiento general.
                </p>
              </div>
            </div>

          </div>

        </motion.div>

      </div>
    </motion.section>
  );
};

export default About;