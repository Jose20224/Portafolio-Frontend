import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  // En el futuro, aquí agregaremos la lógica (useEffect) para manejar
  // las animaciones de scroll y el cambio de estado del Navbar.

  return (
    <div className="bg-background text-on-surface font-body-md overflow-x-hidden">
      {/* Navegación Superior */}
      <Navbar />

      {/* Contenido Principal */}
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>

      {/* Pie de Página */}
      <Footer />
    </div>
  );
}

export default App;