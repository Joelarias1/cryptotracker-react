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
      className="px-4 py-72 text-center md:px-12 lg:text-left"
      initial="hidden"
      animate={controls}
      variants={motionVariants}
    >
      <div className="w-100 mx-auto sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="mt-12 lg:mt-0">
            <p className="text-base md:text-lg lg:text-xl font-bold leading-tight mx-2 text-blue-300">
              Introducing Crypto Portfolio
            </p>
            <h1 className="mt-0 mb-16 text-5xl font-bold tracking-tight md:text-6xl xl:text-7xl text-slate-100">
              Track on Real Time <br />
              <span className="text-blue-500">Your Assets</span>
            </h1>

            <Button
              href="#"
              className="bg-blue-600 px-12  text-sm font-medium uppercase leading-normal button-hover"
              ripple="light"
            >
              Try Demo
            </Button>
          </div>
          <div className="mb-12 lg:mb-0">
            <Lottie
              animationData={animation}
              className="w-full"
              alt=""
            />
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
