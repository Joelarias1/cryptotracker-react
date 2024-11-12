import { AboutUs } from "./components/About/AboutUs";
import { Table } from "./components/DataTable/Table";
import Footer from "./components/Footer";
import Header from "./components/Header/Header";
import { NavbarSimple } from "./components/Navbar/Navbar";
import { BrandsSection } from "./components/Social/BrandsSection";
import { useInView } from 'react-intersection-observer';
import { motion } from "framer-motion";

function App() {
  const { ref: aboutUsRef, inView: aboutUsInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: marketRef, inView: marketInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: techRef, inView: techInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="min-h-screen bg-neutral-900 relative overflow-hidden">
      {/* Fondo consistente para toda la aplicación */}
      <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 pointer-events-none z-0" />

      {/* Sparks grandes con movimiento y opacidad ajustada */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[200px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[200px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      {/* Sparks medianos y más notorios */}
      <motion.div
        className="absolute top-1/3 left-1/3 w-[200px] h-[200px] bg-blue-500/30 rounded-full blur-[100px]"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/3 w-[200px] h-[200px] bg-purple-500/30 rounded-full blur-[100px]"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      />

      {/* Sparks adicionales para AboutUs y Table */}
      <motion.div
        className="absolute top-1/2 left-1/5 w-[150px] h-[150px] bg-blue-500/40 rounded-full blur-[75px]"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute top-2/3 right-1/5 w-[150px] h-[150px] bg-purple-500/40 rounded-full blur-[75px]"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.3
        }}
      />

      {/* Contenido principal */}
      <div className="relative z-10">
        <NavbarSimple/>
        <section id="header">
          <Header />
        </section>
        <section id="about-us" ref={aboutUsRef} className={aboutUsInView ? 'animate-fadeIn' : 'opacity-0'}>
          <AboutUs />
        </section>
        <section id="market" ref={marketRef} className={marketInView ? 'animate-fadeIn' : 'opacity-0'}>
          <Table />
        </section>
        <section id="tech" ref={techRef} className={techInView ? 'animate-fadeIn' : 'opacity-0'}>
          <BrandsSection />
        </section>
        <Footer/>
      </div>
    </div>
  );
}

export default App;
