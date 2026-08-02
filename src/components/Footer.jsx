const Footer = () => {
  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant/20 py-12 text-on-surface-variant font-inter">
      <div className="max-w-[1120px] mx-auto px-4 md:px-10">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
          
          {/* Marca / Identidad */}
          <div className="text-center md:text-left space-y-2">
            <a href="#hero" className="text-lg font-bold text-on-surface font-inter tracking-tight flex items-center justify-center md:justify-start gap-2">
              <span className="material-symbols-outlined text-primary">terminal</span>
              Jose Miguel Rostrand
            </a>
            <p className="text-sm text-on-surface-variant font-geist max-w-sm">
              Ingeniero de Software & Desarrollador Full Stack enfocado en construir experiencias digitales escalables y modernas.
            </p>
          </div>

          {/* Enlaces de Navegación Rápida */}
          <div className="flex flex-wrap justify-center gap-6 text-sm font-geist text-on-surface-variant">
            <a href="#hero" className="hover:text-primary transition-colors">Inicio</a>
            <a href="#projects" className="hover:text-primary transition-colors">Proyectos</a>
            <a href="#skills" className="hover:text-primary transition-colors">Habilidades</a>
            <a href="#contact" className="hover:text-primary transition-colors">Contacto</a>
          </div>

          {/* Redes Sociales del Footer */}
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2.5 rounded-xl bg-surface-container-high text-on-surface hover:text-primary hover:bg-surface-container-highest transition-colors flex items-center justify-center"
              title="GitHub"
            >
              <span className="material-symbols-outlined text-xl">code</span>
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2.5 rounded-xl bg-surface-container-high text-on-surface hover:text-primary hover:bg-surface-container-highest transition-colors flex items-center justify-center"
              title="LinkedIn"
            >
              <span className="material-symbols-outlined text-xl">work</span>
            </a>
          </div>

        </div>

        {/* Línea divisoria y Copyright */}
        <div className="pt-8 border-t border-outline-variant/10 flex flex-col sm:flex-row items-center justify-between text-xs text-on-surface-variant/70 font-geist gap-4">
          <p>© {new Date().getFullYear()} Jose Miguel Rostrand Hernández. Todos los derechos reservados.</p>
          <p className="flex items-center gap-1">
            Diseñado y desarrollado con <span className="text-primary font-bold">React</span> & <span className="text-primary font-bold">Tailwind CSS</span>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;