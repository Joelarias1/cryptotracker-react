
import { AboutUs } from "./components/About/AboutUs";
import { Table } from "./components/DataTable/Table";
import Footer from "./components/Footer";
import Header from "./components/Header/Header";
import { NavbarSimple } from "./components/Navbar/Navbar";
import { BrandsSection } from "./components/Social/BrandsSection";


function App() {
  return(
    <div className="bg-neutral-900">
      <NavbarSimple/>
      <Header name="header"/>
      <AboutUs name="about-us" />
      <Table name="market" />
      <BrandsSection/>
      <Footer/>
    </div>
  );
}

export default App;
