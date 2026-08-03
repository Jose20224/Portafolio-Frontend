import { useState } from 'react';

const Contact = () => {
  // Estado opcional para manejar el envío del formulario de manera interactiva
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes integrar lógica real de envío (como EmailJS o una API propia)
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-surface-container-lowest/50 relative">
      <div className="max-w-[1120px] mx-auto px-4 md:px-10">
        
        {/* Encabezado de la Sección */}
        <div className="flex flex-col items-center text-center mb-16 space-y-3">
          <span className="text-xs font-geist uppercase tracking-widest text-primary font-semibold px-3 py-1 rounded-full bg-primary-container/20 border border-primary/20">
            Hablemos
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-on-surface font-inter tracking-tight">
            Contacto
          </h2>
          <div className="w-12 h-1 bg-primary rounded-full mt-2"></div>
          <p className="text-on-surface-variant font-inter max-w-xl text-sm md:text-base pt-2">
            ¿Tienes un proyecto en mente, una oportunidad laboral o simplemente quieres saludar? Escríbeme y te responderé lo antes posible.
          </p>
        </div>

        {/* Grid Principal: Info de Contacto y Formulario */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Columna Izquierda: Información de Contacto */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card p-6 md:p-8 rounded-3xl border border-outline-variant/30 space-y-6 shadow-xl">
              <h3 className="text-xl font-bold text-on-surface font-inter">
                Información de Contacto
              </h3>

              <div className="space-y-4">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-primary-container/30 text-primary shrink-0">
                    <span className="material-symbols-outlined text-2xl">mail</span>
                  </div>
                  <div>
                    <p className="text-xs text-on-surface-variant font-geist">Correo Electrónico</p>
                    <a href="mailto:tu-correo@example.com" className="text-sm font-semibold text-on-surface font-inter hover:text-primary transition-colors">
                      tu-correo@example.com
                    </a>
                  </div>
                </div>

                {/* Ubicación */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-primary-container/30 text-primary shrink-0">
                    <span className="material-symbols-outlined text-2xl">location_on</span>
                  </div>
                  <div>
                    <p className="text-xs text-on-surface-variant font-geist">Ubicación, Nicaragua</p>
                    <p className="text-sm font-semibold text-on-surface font-inter">
                      Disponible para trabajo Remoto / Híbrido / Presencial
                    </p>
                  </div>
                </div>

                {/* Estado laboral */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-primary-container/30 text-primary shrink-0">
                    <span className="material-symbols-outlined text-2xl">work_history</span>
                  </div>
                  <div>
                    <p className="text-xs text-on-surface-variant font-geist">Estado actual</p>
                    <p className="text-sm font-semibold text-emerald-400 font-inter">
                      Abierto a nuevas ofertas profesionales
                    </p>
                  </div>
                </div>
              </div>

              {/* Redes Sociales */}
              <div className="pt-4 border-t border-outline-variant/20">
                <p className="text-xs text-on-surface-variant font-geist mb-3">Redes Profesionales</p>
                <div className="flex items-center gap-3">
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-surface-container-high text-on-surface hover:text-primary hover:bg-surface-container-highest transition-colors flex items-center gap-2 text-xs font-geist">
                    <span className="material-symbols-outlined text-base">code</span> GitHub
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-surface-container-high text-on-surface hover:text-primary hover:bg-surface-container-highest transition-colors flex items-center gap-2 text-xs font-geist">
                    <span className="material-symbols-outlined text-base">work</span> LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Formulario de Contacto Interactivo */}
          <div className="lg:col-span-7">
            <div className="glass-card p-6 md:p-8 rounded-3xl border border-outline-variant/30 shadow-xl">
              
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-3xl">
                    <span className="material-symbols-outlined text-3xl">check_circle</span>
                  </div>
                  <h3 className="text-2xl font-bold text-on-surface font-inter">¡Mensaje Enviado!</h3>
                  <p className="text-on-surface-variant text-sm font-inter max-w-md mx-auto">
                    Gracias por ponerte en contacto. Te responderé al correo muy pronto.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="text-xl font-bold text-on-surface font-inter mb-4">
                    Envíame un mensaje
                  </h3>

                  {/* Campo Nombre */}
                  <div className="space-y-2">
                    <label className="block text-xs font-geist uppercase tracking-wider text-on-surface-variant font-medium">
                      Tu Nombre
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Ej. Juan Pérez"
                      className="w-full bg-surface-container-high/60 border border-outline-variant/30 rounded-xl px-4 py-3 text-on-surface text-sm font-inter focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  {/* Campo Correo */}
                  <div className="space-y-2">
                    <label className="block text-xs font-geist uppercase tracking-wider text-on-surface-variant font-medium">
                      Tu Correo Electrónico
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="ejemplo@correo.com"
                      className="w-full bg-surface-container-high/60 border border-outline-variant/30 rounded-xl px-4 py-3 text-on-surface text-sm font-inter focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  {/* Campo Mensaje */}
                  <div className="space-y-2">
                    <label className="block text-xs font-geist uppercase tracking-wider text-on-surface-variant font-medium">
                      Mensaje
                    </label>
                    <textarea
                      name="message"
                      rows="4"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Cuéntame sobre tu proyecto o propuesta..."
                      className="w-full bg-surface-container-high/60 border border-outline-variant/30 rounded-xl px-4 py-3 text-on-surface text-sm font-inter focus:outline-none focus:border-primary transition-colors resize-none"
                    ></textarea>
                  </div>

                  {/* Botón de Enviar */}
                  <button
                    type="submit"
                    className="w-full bg-primary-container hover:bg-primary-container/80 text-on-primary-container font-medium py-3.5 rounded-xl transition-all duration-200 shadow-lg glow-border flex items-center justify-center gap-2 font-geist text-sm uppercase tracking-wider"
                  >
                    Enviar Mensaje
                    <span className="material-symbols-outlined text-lg">send</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;