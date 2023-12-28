import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import "./header.css";
import { Button } from "@material-tailwind/react";
import Lottie from "lottie-react";
import animation from "./animation.json";

const Header = () => {
  const motionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { ease: "easeIn", duration: 1 } },
  };

  const controls = useAnimation();

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  return (
    <motion.header
      className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-zinc-850"
      initial="hidden"
      animate={controls}
      variants={motionVariants}
    >
      <div className="text-start lg:w-1/2 px-10 lg:order-1">
        <p className="text-base md:text-lg lg:text-xl font-bold leading-tight text-blue-300">
          Introducing Crypto Portfolio
        </p>
        <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-white">
          Track Your <span className="text-blue-600">Crypto</span> Assets
          <br /> in One Place
        </h1>
        <p className="mt-3 text-base sm:text-lg lg:text-xl text-start text-slate-400">
          Stay informed about your cryptocurrency investments with our
          all-in-one crypto tracking solution.
        </p>
        <div className="mt-6 flex justify-start">
          <Button
            href="#"
            className="rounded-2xl bg-blue-700 px-8 sm:px-12 lg:px-16 py-3 font-medium text-white mt-2 button-hover"
            ripple="light"
          >
            Get started
          </Button>
        </div>
      </div>
      <div className="lg:w-3/4 xl:w-2/4 lg:order-2 ">
        <Lottie animationData={animation} className="relative z-40 object-cover w-full h-full"/>
      </div>
    </motion.header>
  );
};

export default Header;
