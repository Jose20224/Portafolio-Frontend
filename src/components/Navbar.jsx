
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const sections = [
  { id: 'hero', label: 'Inicio' },
  { id: 'about', label: 'Sobre mí' },
  { id: 'projects', label: 'Proyectos destacados' },
  { id: 'contact', label: 'Contacto' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  useEffect(() => {
    if (!isHome) return;

    const updateActiveSection = () => {
      setIsScrolled(window.scrollY > 50);

      const scrollPosition = window.scrollY + 160;
      let current = 'hero';

      for (const section of sections) {
        const element = document.getElementById(section.id);

        if (element && element.offsetTop <= scrollPosition) {
          current = section.id;
        }
      }

      // Detectar la última sección al llegar al final.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 20;

      if (atBottom) {
        current = 'contact';
      }

      setActiveSection(current);
    };

    updateActiveSection();

    window.addEventListener('scroll', updateActiveSection, {
      passive: true,
    });

    window.addEventListener('resize', updateActiveSection);

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, [isHome]);

  useEffect(() => {
    if (!isHome || !location.hash) return;

    const targetId = location.hash.slice(1);

    const timeout = setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 150);

    return () => clearTimeout(timeout);
  }, [isHome, location.hash]);

  const handleNavClick = (event, targetId) => {
    event.preventDefault();

    setActiveSection(targetId);

    if (!isHome) {
      navigate(`/#${targetId}`);
      return;
    }

    const element = document.getElementById(targetId);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const linkClass = (id) => {
    const base =
      'text-sm font-medium pb-1 uppercase tracking-widest ' +
      'font-geist transition-all duration-300 cursor-pointer ' +
      'border-b-2';

    const active =
      'text-primary border-primary';

    const inactive =
      'text-on-surface-variant border-transparent ' +
      'hover:text-primary hover:border-primary/40';

    return `${base} ${
      activeSection === id ? active : inactive
    }`;
  };

  return (
    <nav
      className={`w-full top-0 sticky z-50 border-b
        transition-all duration-300 h-16 flex items-center
        justify-between px-4 md:px-10 ${
          isScrolled
            ? 'nav-scrolled bg-surface/80 backdrop-blur-md border-outline-variant/30 shadow-sm'
            : 'bg-surface/0 border-transparent'
        }`}
    >
      <div className="max-w-[1120px] mx-auto flex justify-between items-center w-full">

        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold text-on-surface tracking-wider font-inter flex items-center gap-2 group"
        >
          {!isHome && (
            <span className="material-symbols-outlined text-primary text-lg group-hover:-translate-x-1 transition-transform">
              arrow_back
            </span>
          )}

          <span>Jose Miguel</span>
        </Link>

        {/* Navegación */}
        {isHome ? (
          <div className="hidden md:flex items-center gap-8">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={(event) =>
                  handleNavClick(event, section.id)
                }
                className={linkClass(section.id)}
                aria-current={
                  activeSection === section.id
                    ? 'location'
                    : undefined
                }
              >
                {section.label}
              </a>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="text-xs font-geist uppercase tracking-wider px-3 py-1.5 rounded-xl bg-surface-container-high text-on-surface hover:bg-primary-container hover:text-on-primary-container transition-all duration-300 flex items-center gap-1.5 border border-outline-variant/30"
            >
              <span className="material-symbols-outlined text-sm">
                home
              </span>

              <span className="hidden sm:inline">
                Volver al inicio
              </span>
            </Link>
          </div>
        )}

        {/* Botón de proyectos */}
        {isHome && (
          <Link
            to="/proyectos"
            className="bg-primary-container text-on-primary-container px-5 py-2 rounded-lg text-sm font-medium hover:scale-95 transition-all duration-200 uppercase tracking-widest glow-border font-geist"
          >
            Todos los Proyectos
          </Link>
        )}
      </div>
    </nav>
  );
}
