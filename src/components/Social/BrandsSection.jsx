/* eslint-disable react/prop-types */
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect  } from "react";
import coingeckoLogo from "../../assets/coingecko-logo.svg";
// import { FiLink } from "react-icons/fi";

export const BrandsSection = ({name}) => {
  // const socialAnimation = {
  //   scale: 1.15,
  //   transition: { duration: 0.3 },
  // };

  const sectionAnimation = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { ease: "easeIn", duration: 0.7 } },
  };

  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  const imageAnimation = {
    scale: 1.15,
    transition: { duration: 0.2 },
  };

  return (
    <section id={name} className="py-6 text-center bg-zinc-900 border-b-8 border-blue-400">
      <motion.div
             initial="hidden"
             animate={controls}
             variants={sectionAnimation}
             ref={ref} 
      >
        {/* <div className="py-10 flex items-center justify-center gap-2">
          <h2 className="text-white font-medium text-4xl mr-2"></h2>
          <motion.a
            href="https://github.com/Joelarias1/cryptotracker-react"
            className="inline-flex items-center justify-center p-3 border border-white rounded-full transition duration-300"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={socialAnimation}
          >
            <FiLink className="text-white text-2xl" />
          </motion.a>
        </div> */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 sm:grid-cols-1 px-6">
          <div className="mb-12 lg:mb-0 mx-auto flex items-center justify-center">
            <motion.img
              whileHover={imageAnimation}
              src="https://www.cdnlogo.com/logos/r/63/react.svg"
              className="px-2 object-cover w-32"
              alt="React - Logo"
            />
          </div>

          <div className="mb-12 lg:mb-0 mx-auto flex items-center justify-center">
            <motion.img
              whileHover={imageAnimation}
              src="https://www.cdnlogo.com/logos/t/58/tailwindcss.svg"
              className="px-2 object-cover w-32"
              alt="Tailwind CSS - Logo"
            />
          </div>

          <div className="mb-12 lg:mb-0 mx-auto flex items-center justify-center">
            <motion.img
              whileHover={imageAnimation}
              src="https://www.cdnlogo.com/logos/j/44/javascript.svg"
              className="px-2 object-cover w-32"
              alt="Javascript - logo"
            />
          </div>

          <div className="mb-12 lg:mb-0 mx-auto flex items-center justify-center">
            <motion.img
              whileHover={imageAnimation}
              src={coingeckoLogo}
              className="px-2 object-cover w-72"
              alt="Coingecko Logo API"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};
