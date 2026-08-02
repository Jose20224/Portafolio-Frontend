import { useState, useEffect } from 'react';

const Navbar = () => {
  // Estado para controlar si hemos bajado el scroll
  const [isScrolled, setIsScrolled] = useState(false);

  // Efecto para escuchar el scroll de la ventana
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Limpieza del evento cuando el componente se desmonta
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`w-full top-0 sticky z-50 border-b transition-all duration-300 h-16 flex items-center justify-between px-4 md:px-10 ${
        isScrolled ? 'nav-scrolled' : 'bg-surface/0 border-transparent'
      }`}
    >
      <div className="max-w-[1120px] mx-auto flex justify-between items-center w-full">
        {/* Logo / Nombre */}
        <span className="text-xl font-bold text-on-surface tracking-wider font-inter">
          Jose Miguel
        </span>

        {/* Enlaces de navegación (Desktop) */}
        <div className="hidden md:flex items-center gap-8">
          <a className="text-sm font-medium text-primary border-b-2 border-primary pb-1 uppercase tracking-widest font-geist" href="#hero">
            Inicio
          </a>
          <a className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors uppercase tracking-widest font-geist" href="#about">
            Sobre mí
          </a>
          <a className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors uppercase tracking-widest font-geist" href="#projects">
            Proyectos
          </a>
          <a className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors uppercase tracking-widest font-geist" href="#contact">
            Contacto
          </a>
        </div>

        {/* Botón Resume */}
        <a 
          className="bg-primary-container text-on-primary-container px-6 py-2 rounded-lg text-sm font-medium hover:scale-95 transition-all duration-100 uppercase tracking-widest glow-border font-geist" 
          href="#"
        >
          Resume
        </a>
      </div>
    </nav>
  );
};

export default Navbar;