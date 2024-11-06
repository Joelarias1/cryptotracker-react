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
    <footer className="relative overflow-hidden bg-gradient-to-r from-zinc-800 via-zinc-800 to-zinc-900">
      <motion.div
        className="container px-6 py-12 mx-auto relative z-10"
        initial="hidden"
        animate={controls}
        variants={motionVariants}
        ref={ref}
      >
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
          <motion.div className="sm:col-span-2" variants={itemVariants}>
            <h2 className="text-2xl font-bold tracking-tight text-white xl:text-3xl mb-4">
              Stay Updated
            </h2>
            <p className="text-gray-300 mb-6">
              Subscribe to our newsletter for the latest crypto insights and updates.
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <input
                id="email"
                type="email"
                className="px-4 py-2 text-gray-300 bg-zinc-700/50 border border-zinc-600 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500/20 focus:outline-none transition-all duration-300"
                placeholder="Your email address"
              />
              <Button className="w-full px-6 py-2.5 text-sm font-medium tracking-wider text-white transition-colors duration-300 transform md:w-auto focus:outline-none bg-zinc-700/50 backdrop-filter backdrop-blur-sm rounded-md border border-zinc-600 hover:bg-zinc-600/50" ripple>
                Subscribe
              </Button>
            </div>
          </motion.div>

          <motion.section variants={itemVariants}>
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="header"
                  smooth={true}
                  duration={500}
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300 cursor-pointer"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="market"
                  smooth={true}
                  duration={500}
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300 cursor-pointer"
                >
                  Tracker
                </Link>
              </li>
            </ul>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h3 className="text-lg font-semibold text-white mb-4">
              Industries
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">
                  Cryptocurrencies
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">
                  Decentralized Finance (DeFi)
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">
                  Blockchain Technology
                </a>
              </li>
            </ul>
          </motion.section>
        </div>

        <hr className="my-8 border-zinc-700/50" />

        <motion.div className="flex items-center justify-center" variants={itemVariants}>
          <Typography variant="small" className="text-gray-400">
            © 2023 CryptoTracker. All rights reserved.
          </Typography>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
