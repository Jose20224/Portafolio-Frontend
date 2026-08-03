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

        {/* Header */}
        <div className="text-center mb-20">
          <span className="uppercase tracking-[0.25em] text-primary text-sm font-semibold">
            Competencias
          </span>

          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-on-surface">
            Habilidades Técnicas
          </h2>

          <div className="w-20 h-1 bg-primary rounded-full mx-auto mt-6"></div>
        </div>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-14 items-start">

          {/* ===================== */}
          {/* Columna izquierda */}
          {/* ===================== */}

          <div>

            <div className="flex items-center gap-4 mb-10">

              <div className="w-1 h-10 bg-primary rounded-full"></div>

              <h3 className="text-3xl font-bold text-on-surface uppercase tracking-wide">
                Habilidades Técnicas
              </h3>

            </div>

            <div className="space-y-10">

              {technicalSkills.map((skill) => (

                <div key={skill.title}>

                  <div className="flex justify-between mb-2">

                    <h4 className="uppercase text-sm font-semibold text-on-surface tracking-wide">
                      {skill.title}
                    </h4>

                    <span className="text-primary font-bold">
                      {skill.level}%
                    </span>

                  </div>

                  <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">

                    <div
                      className="h-full bg-primary transition-all duration-700"
                      style={{ width: `${skill.level}%` }}
                    />

                  </div>

                </div>

              ))}

            </div>

            {/* Herramientas */}

            <div className="mt-20">

              <h3 className="text-3xl font-bold text-on-surface uppercase mb-8">
                Herramientas
              </h3>

              <div className="flex flex-wrap gap-4">

                {tools.map((tool) => (

                  <div
                    key={tool}
                    className="
                    border
                    border-outline-variant
                    px-6
                    py-3
                    text-sm
                    font-medium
                    text-on-surface
                    rounded-md
                    transition-all
                    duration-300
                    hover:border-primary
                    hover:text-primary
                    hover:-translate-y-1
                    "
                  >
                    {tool}
                  </div>

                ))}

              </div>

            </div>

          </div>

          {/* ===================== */}
          {/* Columna derecha */}
          {/* ===================== */}

          <div className="space-y-8">

            <div
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

            </div>

            <div
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

                {interests.map((item) => (

                  <li
                    key={item}
                    className="flex items-center gap-4 text-on-surface-variant"
                  >

                    <div className="w-2.5 h-2.5 bg-primary rotate-45"></div>

                    <span>{item}</span>

                  </li>

                ))}

              </ul>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Skills;