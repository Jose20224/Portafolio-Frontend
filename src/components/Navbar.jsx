import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Saber si estamos exactamente en la página principal (Home)
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Función para manejar las anclas (scroll suave hacia secciones del Home)
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    if (!isHome) {
      // Si estamos en otra página (ej. detalle o proyectos), primero vamos al home y luego hacemos scroll
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      // Si ya estamos en el home, solo hacemos scroll directo
      const element = document.getElementById(targetId);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav 
      className={`w-full top-0 sticky z-50 border-b transition-all duration-300 h-16 flex items-center justify-between px-4 md:px-10 ${
        isScrolled ? 'nav-scrolled bg-surface/80 backdrop-blur-md border-outline-variant/30 shadow-sm' : 'bg-surface/0 border-transparent'
      }`}
    >
      <div className="max-w-[1120px] mx-auto flex justify-between items-center w-full">
        {/* Logo / Nombre: Enlace inteligente al inicio */}
        <Link 
          to="/"
          className="text-xl font-bold text-on-surface tracking-wider font-inter cursor-pointer border-none bg-transparent flex items-center gap-2 group"
        >
          {!isHome && (
            <span className="material-symbols-outlined text-primary text-lg group-hover:-translate-x-1 transition-transform">
              arrow_back
            </span>
          )}
          <span>Jose Miguel</span>
        </Link>

        {/* Enlaces de navegación: Se adaptan según la ruta actual */}
        {isHome ? (
          <div className="hidden md:flex items-center gap-8">
            <Link 
              to="/"
              className="text-sm font-medium pb-1 uppercase tracking-widest font-geist transition-colors cursor-pointer text-primary border-b-2 border-primary"
            >
              Inicio
            </Link>
            <a 
              onClick={(e) => handleNavClick(e, 'about')}
              className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors uppercase tracking-widest font-geist cursor-pointer" 
              href="#about"
            >
              Sobre mí
            </a>
            <a
              onClick={(e) => handleNavClick(e, 'projects')}
              className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors uppercase tracking-widest font-geist cursor-pointer" 
              href="#projects"
            >
              Proyectos destacados
            </a>
            <a 
              onClick={(e) => handleNavClick(e, 'contact')}
              className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors uppercase tracking-widest font-geist cursor-pointer" 
              href="#contact"
            >
              Contacto
            </a>
          </div>
        ) : (
          /* Si estamos explorando otras vistas (como proyectos o detalles), mostramos un acceso directo al home */
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="text-xs font-geist uppercase tracking-wider px-3 py-1.5 rounded-xl bg-surface-container-high text-on-surface hover:bg-primary-container hover:text-on-primary-container transition-all duration-300 flex items-center gap-1.5 cursor-pointer border border-outline-variant/30"
            >
              <span className="material-symbols-outlined text-sm">home</span>
              <span className="hidden sm:inline">Volver al inicio</span>
            </Link>
          </div>
        )}

        {/* Botón Resume / CV */}
        {isHome ? (
        <Link
          to="proyectos/"
          className="bg-primary-container text-on-primary-container px-5 py-2 rounded-lg text-sm font-medium hover:scale-95 transition-all duration-100 uppercase tracking-widest glow-border font-geist" 
         
        >
          Todos los Proyectos
        </Link>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;