import { AboutUs } from "./components/About/AboutUs";
import { Table } from "./components/DataTable/Table";
import Footer from "./components/Footer";
import Header from "./components/Header/Header";
import { NavbarSimple } from "./components/Navbar/Navbar";
import { BrandsSection } from "./components/Social/BrandsSection";

function App() {
  return (
    <div className="min-h-screen bg-neutral-900 relative">
      {/* Gradient background elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Orbes principales */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Orbes secundarios para más profundidad */}
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-3/4 left-1/3 w-[300px] h-[300px] bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        
        {/* Gradiente sutil superpuesto */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-900/50 to-neutral-900 pointer-events-none"></div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10">
        <NavbarSimple/>
        <Header name="header"/>
        <AboutUs name="about-us" />
        <Table name="market" />
        <BrandsSection name="tech"/>
        <Footer/>
      </div>
    </div>
  );
}

export default App;