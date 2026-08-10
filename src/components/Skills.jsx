import { motion } from 'framer-motion';

const technicalSkills = [
  { title: "Backend Development (Django/Python)", level: 90 },
  { title: "Frontend (HTML, CSS, JavaScript)", level: 75 },
  { title: "Cybersecurity Fundamentals", level: 80 },
  { title: "Databases (SQL)", level: 85 },
];

const tools = [
  "Git / GitHub",
  "Docker",
  "CI/CD",
  "Linux",
  "Postman",
  "Tailwind CSS",
];

const interests = [
  "Desarrollo Backend y Arquitectura de Software",
  "Desarrollo Web Full Stack",
  "Ciberseguridad y Desarrollo Seguro",
];

const Skills = () => {
  return (
    <section
      id="skills"
      className="py-24 bg-surface-container-lowest"
    >
      <div className="max-w-[1120px] mx-auto px-5">

        {/* Header con animación de scroll */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <span className="uppercase tracking-[0.25em] text-primary text-sm font-semibold">
            Competencias
          </span>

          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-on-surface">
            Habilidades Técnicas
          </h2>

          <div className="w-20 h-1 bg-primary rounded-full mx-auto mt-6"></div>
        </motion.div>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-14 items-start">

          {/* ===================== */}
          {/* Columna izquierda */}
          {/* ===================== */}

          <div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex items-center gap-4 mb-10"
            >
              <div className="w-1 h-10 bg-primary rounded-full"></div>

              <h3 className="text-3xl font-bold text-on-surface uppercase tracking-wide">
                Habilidades Técnicas
              </h3>
            </motion.div>

            {/* Barras de progreso animadas en cascada */}
            <div className="space-y-10">
              {technicalSkills.map((skill, index) => (
                <motion.div 
                  key={skill.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
                >
                  <div className="flex justify-between mb-2">
                    <h4 className="uppercase text-sm font-semibold text-on-surface tracking-wide">
                      {skill.title}
                    </h4>

                    <span className="text-primary font-bold">
                      {skill.level}%
                    </span>
                  </div>

                  <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.8, delay: 0.2 + (index * 0.1), ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Herramientas con animación escalonada */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              className="mt-20"
            >
              <h3 className="text-3xl font-bold text-on-surface uppercase mb-8">
                Herramientas
              </h3>

              <div className="flex flex-wrap gap-4">
                {tools.map((tool, index) => (
                  <motion.div
                    key={tool}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.65, delay: index * 0.05, ease: "easeOut" }}
                    whileHover={{ y: -4 }}
                    className="
                    border
                    border-outline-variant
                    px-6
                    py-3
                    text-sm
                    font-medium
                    text-on-surface
                    rounded-md
                    cursor-pointer
                    transition-colors
                    duration-300
                    hover:border-primary
                    hover:text-primary
                    "
                  >
                    {tool}
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>

          {/* ===================== */}
          {/* Columna derecha */}
          {/* ===================== */}

          <div className="space-y-8">

            {/* Imagen con aparición suave y zoom controlado */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="
              overflow-hidden
              rounded-xl
              border-2
              border-primary/50
              shadow-2xl
              "
            >
              <img
                src="https://tse3.mm.bing.net/th/id/OIP.Gth_puJzNWkdEYkynYwqCgHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
                alt="Cybersecurity"
                className="w-full h-[280px] object-cover hover:scale-105 transition duration-500"
              />
            </motion.div>

            {/* Tarjeta de Áreas de Interés animada */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="
              glass-card
              rounded-xl
              p-8
              border
              border-outline-variant
              "
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-primary">
                  target
                </span>

                <h3 className="text-2xl font-bold text-on-surface uppercase">
                  Áreas de Interés
                </h3>
              </div>

              <ul className="space-y-5">
                {interests.map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.65, delay: 0.3 + (index * 0.1), ease: "easeOut" }}
                    className="flex items-center gap-4 text-on-surface-variant"
                  >
                    <div className="w-2.5 h-2.5 bg-primary rotate-45"></div>

                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Skills;