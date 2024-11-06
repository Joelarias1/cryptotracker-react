import { Button, Typography } from "@material-tailwind/react";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
import { Link } from "react-scroll";

const Footer = () => {
  const motionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        ease: "easeOut", 
        duration: 0.6,
        staggerChildren: 0.1
      } 
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  return (
    <footer className="bg-zinc-850 relative overflow-hidden">
      <div className="absolute inset-0 bg-neutral-500/5 backdrop-filter backdrop-blur-3xl"></div>
      <motion.div
        className="container px-6 py-12 mx-auto relative z-10"
        initial="hidden"
        animate={controls}
        variants={motionVariants}
        ref={ref}
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
          <motion.div className="sm:col-span-2" variants={itemVariants}>
            <h1 className="max-w-lg text-xl font-semibold tracking-tight text-white xl:text-2xl">
              Subscribe to our newsletter for updates.
            </h1>

            <div className="flex flex-col mx-auto mt-6 space-y-3 md:space-y-0 md:flex-row">
              <input
                id="email"
                type="text"
                className="px-4 py-2 text-gray-300 bg-zinc-800 border border-zinc-700 rounded-md focus:border-blue-500 focus:outline-none"
                placeholder="Email Address"
              />

              <Button className="w-full px-6 py-2.5 text-sm font-medium tracking-wider text-white transition-colors duration-300 transform md:w-auto md:mx-4 focus:outline-none bg-blue-500/20 backdrop-filter backdrop-blur-sm rounded-md border border-blue-400/20 hover:bg-blue-500/30" ripple>
                Subscribe
              </Button>
            </div>
          </motion.div>

          <motion.section variants={itemVariants}>
            <p className="font-semibold text-white">
              Quick Links
            </p>

            <div className="flex flex-col items-start mt-5 space-y-2">
              <Link
                to="header"
                smooth={true}
                duration={500}
                className="text-gray-400 transition-colors duration-300 hover:text-blue-400 cursor-pointer"
              >
                Home
              </Link>
              <Link
                to="market"
                smooth={true}
                duration={500}
                className="text-gray-400 transition-colors duration-300 hover:text-blue-400 cursor-pointer"
              >
                Tracker
              </Link>
            </div>
          </motion.section>

          <motion.section variants={itemVariants}>
            <p className="font-semibold text-white">
              Industries
            </p>

            <div className="flex flex-col items-start mt-5 space-y-2">
              <a
                href="#"
                className="text-gray-400 transition-colors duration-300 hover:text-blue-400"
              >
                Crypto Currencies
              </a>
              <a
                href="#"
                className="text-gray-400 transition-colors duration-300 hover:text-blue-400"
              >
                Decentralized Finance <strong className="text-blue-400">(DeFi)</strong>
              </a>
              <a
                href="#"
                className="text-gray-400 transition-colors duration-300 hover:text-blue-400"
              >
                Finance
              </a>
            </div>
          </motion.section>
        </div>

        <hr className="my-6 border-zinc-800 md:my-8" />

        <motion.div className="flex items-center justify-center" variants={itemVariants}>
          <Typography
            variant="small"
            className="text-gray-400 font-normal"
          >
            © 2023 CryptoTracker. All rights reserved.
          </Typography>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
