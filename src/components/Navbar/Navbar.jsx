/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  Button,
} from "@material-tailwind/react";
import { motion } from "framer-motion";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import myLogo from "../../assets/logo2.png";
import "./navbar.css";
import { Link } from "react-scroll";

const sections = ["header", "about-us", "market", "tech"];

function NavItem({ to, children, activeSection }) {
  return (
    <Typography as="li" variant="small" className="p-1 font-medium text-white">
      <Link
        to={to}
        smooth={true}
        duration={500}
        className={`flex items-center transition-colors cursor-pointer hover:scale-105 ${
          activeSection === to ? "text-blue-400" : "hover:text-blue-400"
        }`}
      >
        {children}
      </Link>
    </Typography>
  );
}

function NavList({ activeSection }) {
  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <NavItem to="header" activeSection={activeSection}>
        Home
      </NavItem>
      <NavItem to="about-us" activeSection={activeSection}>
        About Us
      </NavItem>
      <NavItem to="market" activeSection={activeSection}>
        Demo
      </NavItem>
      <NavItem to="tech" activeSection={activeSection}>
        Tech Stack
      </NavItem>
      <li className="p-1 font-medium">
        <motion.div
          whileTap={{
            scale: 0.75,
            borderRadius: "50%",
          }}
          whileHover={{
            scale: 1.1,
          }}
          transition={{ duration: 0.2 }}
        >
          <Button
            ripple
            className="w-full lg:w-auto text-xs rounded-2xl font-medium bg-blue-600"
            disabled
          >
            Soon 🦊
          </Button>
        </motion.div>
      </li>
    </ul>
  );
}

export const NavbarSimple = () => {
  const [openNav, setOpenNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }

    // Determinar la sección más visible
    let maxVisibleSection = "";
    let maxVisiblePercentage = 0;

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        const rect = element.getBoundingClientRect();
        const visibleHeight =
          Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
        const visiblePercentage = visibleHeight / element.offsetHeight;

        if (visiblePercentage > maxVisiblePercentage) {
          maxVisiblePercentage = visiblePercentage;
          maxVisibleSection = sectionId;
        }
      }
    });

    setActiveSection(maxVisibleSection);
  };

  const handleWindowResize = () =>
    window.innerWidth >= 768 && setOpenNav(false);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state
    return () => {
      window.removeEventListener("resize", handleWindowResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Navbar
      className={`h-max max-w-full px-6 py-3 fixed z-50 rounded-none border-none transition-all duration-300 ${
        scrolled || openNav
          ? "bg-neutral-900/95 backdrop-blur-sm shadow-lg"
          : "bg-neutral-900/60"
      }`}
    >
      <div className="flex items-center justify-between text-white">
        <motion.a
          className="flex items-center gap-2"
          href="#"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <img
            className="w-auto h-11"
            src={myLogo}
            alt="Logo of CryptoTracker"
          />
          <h3 className="text-2xl font-bold leading-none md:text-xl">
            Crypto
            <span className="text-gradient">Tracker</span>
          </h3>
        </motion.a>
        <div className="hidden lg:block">
          <NavList activeSection={activeSection} />
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <div className="p-4 rounded-lg mt-2">
          <NavList activeSection={activeSection} />
        </div>
      </Collapse>
    </Navbar>
  );
};
