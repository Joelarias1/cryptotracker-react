import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import "./header.css";
import { Button } from "@material-tailwind/react";

const Header = () => {
  const motionVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { ease: "easeIn", duration: 1 } },
  };

  const controls = useAnimation();

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  return (
    <motion.header
      className="flex flex-col justify-center min-h-screen bg-zinc-850 overflow-hidden"
      initial="hidden"
      animate={controls}
      variants={motionVariants}
    >
      <div className="text-start mx-auto px-5">
        <p className="text-lg font-bold leading-tight text-blue-300">
          Introducing our Crypto Portfolio
        </p>
        <h1 className="mt-3 text-5xl xl:text-5xl sm:text-5xl font-bold leading-tight text-white">
          Track Your <span className="text-blue-600">Crypto</span> Assets
          <br /> in One Place
        </h1>
        <p className="mt-3 text-base text-start text-slate-400">
          Stay informed about your cryptocurrency investments with our
          all-in-one crypto tracking solution.
        </p>
        <motion.div className="mt-6 flex justify-start">
          <Button
            href="#"
            className="rounded-md bg-blue-700 px-16 py-3 font-medium text-white mt-2 button-hover"
            ripple="light"
          >
            Get started
          </Button>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;
