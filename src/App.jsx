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
        {/* ... (código del gradiente) ... */}
      </div>
      {/* Contenido principal */}
      <div className="relative z-10">
        <NavbarSimple/>
        <section id="header">
          <Header />
        </section>
        <section id="about-us">
          <AboutUs />
        </section>
        <section id="market">
          <Table />
        </section>
        <section id="tech">
          <BrandsSection />
        </section>
        <Footer/>
      </div>
    </div>
  );
}

export default App;
