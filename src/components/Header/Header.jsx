import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { Button } from "@material-tailwind/react";
import { Link } from "react-scroll";
import './header.css';

// eslint-disable-next-line react/prop-types
const Header = ({ name }) => {
  const motionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { ease: "easeIn", duration: 0.7 } },
  };

  const controls = useAnimation();

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  return (
    <motion.header
      className="px-4 py-64 text-center" // Quitamos md:px-12 lg:text-left para mantener centrado
      initial="hidden"
      animate={controls}
      variants={motionVariants}
      id={name}
    >
      <div className="px-4 md:px-12 mx-auto max-w-7xl">
        <div className="w-full mx-auto md:w-11/12 xl:w-9/12 text-center"> {/* Mantenemos text-center */}
          <h1 className="mb-8 text-4xl font-extrabold leading-tight tracking-normal text-slate-50 md:text-6xl md:tracking-tight">
            <span className="block">Watch</span>
            <span className="block py-2 text-transparent animate-gradient">
              your favorite crypto
            </span>
            <span className="block">in real time, here.</span>
          </h1>
          <p className="px-4 mb-8 text-lg text-slate-400 md:text-xl mx-auto max-w-3xl">
            All your assets, in one place. Have the information you want about your 
            favorite assets, prices, capitalization, new releases at the click of a button.
          </p>
          <div className="mb-4 flex justify-center"> {/* Centramos el botón */}
            <Link
              to="market" 
              spy={true}
              smooth={true}
              duration={500}
            >
              <Button
                className="normal-case glow-button inline-flex items-center justify-center px-12 py-2.5 text-base text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl"
                ripple
              >
                Try Demo
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;