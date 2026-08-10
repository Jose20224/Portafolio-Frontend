import { AnimatePresence, motion } from "framer-motion";

import { Routes, Route, useLocation } from "react-router-dom";


import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import ProjectsGrid from "./components/ProjectsGrid";
import ProjectDetail from "./components/ProjectDetail";
import ScrollToTop from "./components/ScrollToTop";


const pageVariants = {
  initial: {
    opacity: 0,
  },

  animate: {
    opacity: 1,
  },

  exit: {
    opacity: 0,
  },
};


const pageTransition = {
  duration: 0.35,
  ease: "easeOut",
};


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


function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">

      <Routes
        location={location}
        key={location.pathname}
      >

        <Route
          path="/"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <Home />
            </motion.div>
          }
        />

        <Route
          path="/proyectos"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <ProjectsGrid />
            </motion.div>
          }
        />

        <Route
          path="/proyecto/:id"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <ProjectDetail />
            </motion.div>
          }
        />

      </Routes>

    </AnimatePresence>
  );
}


function App() {
  return (
    <div className="min-h-screen bg-surface text-on-surface font-geist flex flex-col">

      <ScrollToTop />

      <Navbar />

      <main className="flex-grow">
        <AnimatedRoutes />
      </main>

      <Footer />

    </div>
  );
}


export default App;