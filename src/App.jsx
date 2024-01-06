
import { AboutUs } from "./components/About/AboutUs";
import { Table } from "./components/DataTable/Table";
import Footer from "./components/Footer";
import Header from "./components/Header/Header";
import { NavbarSimple } from "./components/Navbar/Navbar";

function App() {
  return(
    <div className="bg-neutral-900">
      <NavbarSimple/>
      <Header/>
      <AboutUs/>
      <Table/>
      <Footer/>
    </div>
  );
}

export default App;
