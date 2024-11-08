/* eslint-disable react/prop-types */
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { Link } from "react-scroll";
import "./header.css";

const Header = ({ name }) => {
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

  return (
    <motion.header
      className="relative px-4 py-60 text-center overflow-hidden bg-zinc-900"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      id={name}
    >
      {/* Elementos de luz de fondo */}
      <motion.div
        className="absolute -top-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Efecto de "brillo" en movimiento */}
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{
          background: [
            "radial-gradient(circle at 0% 0%, #3b82f6 0%, transparent 50%), radial-gradient(circle at 100% 100%, #3b82f6 0%, transparent 50%)",
            "radial-gradient(circle at 100% 0%, #3b82f6 0%, transparent 50%), radial-gradient(circle at 0% 100%, #3b82f6 0%, transparent 50%)",
            "radial-gradient(circle at 0% 0%, #3b82f6 0%, transparent 50%), radial-gradient(circle at 100% 100%, #3b82f6 0%, transparent 50%)",
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
              <span className="relative py-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-600 animate-gradient">
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
            <Link to="market" spy={true} smooth={true} duration={500}>
              <button className="px-8 py-2 text-sm font-medium text-blue-400 bg-blue-500/10 backdrop-filter backdrop-blur-sm rounded-lg border border-blue-400/20 shadow-lg hover:bg-blue-500/20 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                Try Demo
              </button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </motion.header>
  );
};

export default Header;
