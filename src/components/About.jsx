const About = () => {
  return (
    <section id="about" className="py-20 md:py-28 bg-surface-container-lowest/50 relative">
      <div className="max-w-[1120px] mx-auto px-4 md:px-10">
        
        {/* Encabezado de la Sección */}
        <div className="flex flex-col items-center text-center mb-16 space-y-3">
          <span className="text-xs font-geist uppercase tracking-widest text-primary font-semibold px-3 py-1 rounded-full bg-primary-container/20 border border-primary/20">
            Conóceme mejor
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-on-surface font-inter tracking-tight">
            Sobre mí
          </h2>
          <div className="w-12 h-1 bg-primary rounded-full mt-2"></div>
        </div>

        {/* Contenido Principal Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Columna Izquierda: Biografía Resumida */}
          <div className="lg:col-span-7 space-y-6">
            <div className="glass-card p-6 md:p-8 rounded-2xl border border-outline-variant/30 space-y-4">
              <h3 className="text-xl md:text-1xl font-semibold text-on-surface font-inter flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-2xl md:text-3xl leading-none">
                  badge
                </span>
                Desarroyador de Software
              </h3>
              
              <p className="text-on-surface-variant leading-relaxed font-inter text-base">
                Apasionado por la tecnología y el desarrollo de soluciones de software eficientes. Tengo experiencia en el diseño y desarrollo de aplicaciones web, desde la arquitectura de bases de datos y la construcción de APIs robustas en el Backend hasta la creación de interfaces modernas y responsivas en el Frontend. Utilizo herramientas de inteligencia artificial para optimizar el diseño de interfaces y agilizar tareas de desarrollo, aumentando la productividad sin comprometer la calidad del software.
              </p>

              <p className="text-on-surface-variant leading-relaxed font-inter text-base">
                Mi enfoque se centra en escribir código limpio, mantenible y escalable, aplicando buenas prácticas, patrones de diseño y estándares de la industria para desarrollar soluciones confiables y de alto rendimiento.
              </p>

              {/* Puntos destacados / Filosofía */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-outline-variant/20">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary-container/30 text-primary mt-1">
                    <span className="material-symbols-outlined text-xl">speed</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-on-surface text-sm font-inter">Rendimiento</h4>
                    <p className="text-xs text-on-surface-variant font-inter">Optimización de carga y ejecución eficiente.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary-container/30 text-primary mt-1">
                    <span className="material-symbols-outlined text-xl">architecture</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-on-surface text-sm font-inter">Escalabilidad</h4>
                    <p className="text-xs text-on-surface-variant font-inter">Sistemas modulares listos para crecer.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Tarjetas de Información y Estadísticas */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Tarjeta 1: Experiencia */}
            <div className="glass-card p-6 rounded-2xl border border-outline-variant/30 flex items-center gap-5">
              <div className="p-4 rounded-xl bg-primary-container/40 text-primary font-geist font-bold text-2xl">
                1+
              </div>
              <div>
                <h4 className="text-base font-semibold text-on-surface font-inter">Años de Experiencia</h4>
                <p className="text-xs text-on-surface-variant font-inter">Desarrollando soluciones web y de software.</p>
              </div>
            </div>

            {/* Tarjeta 2: Formación */}
            <div className="glass-card p-6 rounded-2xl border border-outline-variant/30 flex items-center gap-5">
              <div className="p-3.5 rounded-xl bg-surface-container-high text-primary">
                <span className="material-symbols-outlined text-3xl">school</span>
              </div>
              <div>
                <h4 className="text-base font-semibold text-on-surface font-inter">Ingeniería en Sistemas</h4>
                <p className="text-xs text-on-surface-variant font-inter">Formación universitaria sólida en computación.</p>
              </div>
            </div>

            {/* Tarjeta 3: Trabajo en equipo */}
            <div className="glass-card p-6 rounded-2xl border border-outline-variant/30 flex items-center gap-5">
              <div className="p-3.5 rounded-xl bg-surface-container-high text-primary">
                <span className="material-symbols-outlined text-3xl">groups</span>
              </div>
              <div>
                <h4 className="text-base font-semibold text-on-surface font-inter">Trabajo en Equipo</h4>
                <p className="text-xs text-on-surface-variant font-inter">Colaboración, metodologías ágiles y comunicación.</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default About;