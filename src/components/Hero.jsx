const Hero = () => {
  return (
    <section id="hero" className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden bg-pattern">
      <div className="max-w-[1120px] mx-auto px-4 md:px-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Texto / Presentación */}
          <div className="flex-1 space-y-6 text-center lg:text-left">
            {/* Badge de estado */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-high border border-outline-variant/40 text-xs font-geist text-primary">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Disponible para proyectos y oportunidades
            </div>

            {/* Título principal */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-on-surface font-inter leading-tight">
              Hola, soy <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-container to-on-primary-container">
                Jose Miguel Rostrand
              </span>
            </h1>

            {/* Subtítulo / Descripción */}
            <p className="text-lg md:text-xl text-on-surface-variant font-inter max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Ingeniero de Software enfocado en construir soluciones digitales modernas, escalables y eficientes, combinando arquitectura de desarrollo con experiencia de usuario.
            </p>

            {/* Botones de Acción */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
              <a
                href="#projects"
                className="bg-primary-container hover:bg-primary-container/80 text-on-primary-container font-medium px-6 py-3 rounded-xl transition-all duration-200 shadow-lg glow-border flex items-center gap-2 font-geist text-sm"
              >
                Ver Proyectos
                <span className="material-symbols-outlined text-lg">arrow_downward</span>
              </a>

              <a
                href="#contact"
                className="glass-card hover:bg-surface-container-high text-on-surface font-medium px-6 py-3 rounded-xl border border-outline-variant/50 transition-all duration-200 flex items-center gap-2 font-geist text-sm"
              >
                Contáctame
                <span className="material-symbols-outlined text-lg">mail</span>
              </a>
            </div>

            {/* Enlaces a Redes / Stats */}
            <div className="pt-6 flex items-center justify-center lg:justify-start gap-6 text-on-surface-variant">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-1.5 text-sm font-geist">
                <span className="material-symbols-outlined text-base">code</span> GitHub
              </a>
              <span className="text-outline-variant">•</span>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-1.5 text-sm font-geist">
                <span className="material-symbols-outlined text-base">work</span> LinkedIn
              </a>
            </div>
          </div>

          {/* Tarjeta con Foto de Perfil */}
          <div className="flex-1 flex justify-center w-full max-w-md lg:max-w-none">
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              {/* Glow decorativo animado de fondo */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary-container to-primary opacity-25 blur-2xl animate-pulse"></div>

              {/* Contenedor principal de la imagen */}
              <div className="relative w-full h-full rounded-3xl glass-card glow-border p-3 overflow-hidden flex items-center justify-center">
                <img
                  src="https://tse3.mm.bing.net/th/id/OIP.M-WjQhEAsOiO8Ptc7nPUewHaJR?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
                  alt="Jose Miguel Rostrand Hernández"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>

              {/* Sub-tarjeta / Badge flotante decorativo */}
              <div className="absolute -bottom-4 -left-4 glass-card px-4 py-2.5 rounded-2xl border border-outline-variant/40 flex items-center gap-3 shadow-xl">
                <div className="p-2 rounded-xl bg-primary-container/40 text-primary">
                  <span className="material-symbols-outlined">terminal</span>
                </div>
                <div>
                  <p className="text-xs text-on-surface-variant font-geist">Especialidad</p>
                  <p className="text-sm font-semibold text-on-surface font-inter">Software Engineer</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;