/* eslint-disable react/prop-types */
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import "./header.css";

export const Header = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        ease: "easeInOut",
        duration: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const handleScrollToMarket = () => {
    const marketSection = document.querySelector("#market");
    if (marketSection) {
      marketSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      className="relative px-4 py-60 text-center overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      id="header"
    >
      {/* Gradiente base */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />

      {/* Elementos de luz de fondo mejorados */}
      <motion.div
        className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px]"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Sparks adicionales */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-48 h-48 bg-blue-500/30 rounded-full blur-[50px]"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/3 left-1/3 w-48 h-48 bg-purple-500/30 rounded-full blur-[50px]"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Efecto de "brillo" en movimiento mejorado */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            "radial-gradient(circle at 0% 0%, #3b82f6 0%, transparent 50%), radial-gradient(circle at 100% 100%, #a855f7 0%, transparent 50%)",
            "radial-gradient(circle at 100% 0%, #a855f7 0%, transparent 50%), radial-gradient(circle at 0% 100%, #3b82f6 0%, transparent 50%)",
            "radial-gradient(circle at 0% 0%, #3b82f6 0%, transparent 50%), radial-gradient(circle at 100% 100%, #a855f7 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="relative px-4 md:px-12 mx-auto max-w-7xl z-10"
        variants={containerVariants}
      >
        <div className="w-full mx-auto md:w-11/12 xl:w-9/12 text-center">
          <motion.h1
            className="mb-8 text-4xl font-extrabold leading-tight tracking-normal text-slate-100 md:text-6xl md:tracking-tight"
            variants={itemVariants}
          >
            <motion.span className="block" variants={itemVariants}>
              Watch
            </motion.span>
            <motion.span
              className="relative inline-block"
              variants={itemVariants}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-blue-600/20 to-blue-500/20 rounded-2xl blur-2xl"></div>
              <span className="relative py-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 animate-gradient">
                your favorite crypto
              </span>
            </motion.span>
            <motion.span className="block" variants={itemVariants}>
              in real time, here.
            </motion.span>
          </motion.h1>
          <motion.p
            className="px-4 mb-8 text-lg text-slate-400 md:text-xl mx-auto max-w-3xl"
            variants={itemVariants}
          >
            All your assets, in one place. Have the information you want about
            your favorite assets, prices, capitalization, new releases at the
            click of a button.
          </motion.p>
          <motion.div
            className="mb-4 flex justify-center"
            variants={itemVariants}
          >
            <motion.button
              onClick={handleScrollToMarket}
              className="glow-button px-8 py-2 text-sm font-medium text-blue-400 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-filter backdrop-blur-sm rounded-lg border border-blue-400/20 shadow-lg hover:from-blue-500/20 hover:to-purple-500/20 transition-all duration-300 ease-in-out transform"
              whileHover={{
                scale: 1.1,
                transition: {
                  duration: 0.3,
                  ease: "easeInOut",
                },
              }}
              whileTap={{ scale: 0.9 }}
            >
              Try Demo
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </motion.header>
  );
};

export default Header;
