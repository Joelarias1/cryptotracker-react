import AboutUs from "./components/AboutUs";
import BigCard from "./components/BigCard";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { NavbarSimple } from "./components/Navbar";



function App() {
  return(
    <div className="bg-neutral-900">
      <NavbarSimple/>
      <Header/>
      <BigCard/>
      <AboutUs/>
      <Footer/>
    </div>
  );
}

export default App;
