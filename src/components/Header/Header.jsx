/* eslint-disable react/prop-types */
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { Button } from "@material-tailwind/react";
import { Link } from "react-scroll";

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
      className="px-4 py-64 text-center md:px-12 lg:text-left"
      initial="hidden"
      animate={controls}
      variants={motionVariants}
      id={name}
    >
      <div className="px-12 mx-auto max-w-7xl">
        <div className="w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center">
          <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-normal text-slate-50 md:text-6xl md:tracking-tight">
            <span>Watch</span>{" "}
            <span className="block w-full py-2 text-transparent bg-clip-text leading-12 bg-gradient-to-r from-blue-500 to-blue-300 lg:inline">
              your favorite crypto
            </span>{" "}
            <span>in real time, here.</span>
          </h1>
          <p className="px-0 mb-8 text-lg text-slate-400 md:text-xl lg:px-24">
          All your assets, in one place. Have the information you want about your favorite assets, prices, capitalization, new releases at the click of a button.
          </p>
          <div className="mb-4 space-x-0 md:space-x-2 md:mb-8">
            <Link
              to="market" 
              spy={true}
              smooth={true}
              duration={500}
            >
              <Button
                className="inline-flex items-center justify-center w-full px-14 py-3 mb-2 text-lg text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl sm:w-auto sm:mb-0 hover:scale-105"
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
