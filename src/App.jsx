import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Componentes para la cuadrícula y el detalle
import ProjectsGrid from './components/ProjectsGrid';
import ProjectDetail from './components/ProjectDetail';
import ScrollToTop from './components/ScrollToTop';

// Componente para la Página de Inicio (Home) que junta tus secciones principales
function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
    </>
  );
}

function App() {
  return (
   <>
      <ScrollToTop />
      
      <div className="min-h-screen bg-surface text-on-surface font-geist flex flex-col">
        {/* Barra de Navegación fija / superior */}
        <Navbar />

        {/* Definición de Rutas de la Aplicación */}
        <main className="flex-grow">
          <Routes>
            {/* Ruta de Inicio: Muestra la landing principal con todas las secciones */}
            <Route path="/" element={<Home />} />

            {/* Ruta para ver la cuadrícula completa de todos los proyectos con filtros */}
            <Route path="/proyectos" element={<ProjectsGrid />} />
            
            {/* Ruta con parámetro dinámico para el detalle de un proyecto individual */}
            <Route path="/proyecto/:id" element={<ProjectDetail />} />
          </Routes>
        </main>

        {/* Pie de página global */}
        <Footer />
      </div>
    </>
  );
}

export default App;