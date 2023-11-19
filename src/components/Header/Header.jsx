import { motion, useAnimation } from "framer-motion";
import { useState, useEffect } from "react";
import "./header.css";

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
      className="flex items-center min-h-screen justify-center bg-zinc-850"
      initial="hidden"
      animate={controls}
      variants={motionVariants}
    > 

      <motion.div
        className="absolute flex items-center justify-center"
        variants={motionVariants}
      >
        <div className="text-center mx-auto px-4">
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

          <motion.div
            className="mt-6 flex items-center justify-center gap-10"
            variants={motionVariants}
          >
            <motion.button
              href="#"
              className="rounded-md bg-blue-700 px-16 py-3 font-medium text-white"
              whileHover={{ scale: 1.15 }}
            >
              Get started for free
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </motion.header>
  );
};

export default Header;
