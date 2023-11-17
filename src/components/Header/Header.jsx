import { motion, useAnimation } from "framer-motion";
import { useState, useEffect } from "react";
import "./header.css";
import videoSource from "../Header/bg-video.mp4";

const Header = () => {
  const textVariants = ["Crypto", "NFT", "DeFi", "Market"];
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((currentTextIndex + 1) % textVariants.length);
    }, 1500);

    return () => {
      clearInterval(interval);
    };
  }, [currentTextIndex]);

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
      className="flex items-center min-h-screen justify-center relative"
      initial="hidden"
      animate={controls}
      variants={motionVariants}
    >
      <video
        className="absolute inset-0 w-full h-full object-cover object-center"
        autoPlay
        loop
        muted
      >
        <source src={videoSource} type="video/mp4" />
      </video>
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        variants={motionVariants}
      >
        <div className="text-center w-full mx-auto px-4">
          <div className="text-center">
            <p className="text-xl font-bold leading-8 text-blue-300">
              Introducing Crypto Portfolio
            </p>
            <motion.h1
              className="mt-3 text-[4.5rem] font-bold leading-[4rem] tracking-tight text-white"
              variants={motionVariants}
            >
              Track Your{" "}
              <span className="text-blue-600">
                {textVariants[currentTextIndex]}
              </span>{" "}
              Assets in One Place
            </motion.h1>
            <motion.p
              className="mt-3 text-lg leading-relaxed text-slate-400"
              variants={motionVariants}
            >
              Stay informed about your cryptocurrency investments with our
              all-in-one crypto tracking solution.
            </motion.p>
          </div>

          <motion.div
            className="mt-6 flex items-center justify-center gap-10"
            variants={motionVariants}
          >
            <motion.a
              href="#"
              className="transform rounded-md bg-blue-500 px-5 py-3 font-medium text-white"
              whileHover={{ scale: 1.05, backgroundColor: "#7643ea" }}
            >
              Get started for free
            </motion.a>
            <motion.a
              href="#"
              className="transform rounded-md border border-blue-500 px-5 py-3 font-medium text-white"
              whileHover={{ scale: 1.2, borderColor: "#7643ea" }}
            >
              Request a demo
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </motion.header>
  );
};

export default Header;
