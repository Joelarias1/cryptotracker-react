import { motion, useAnimation } from "framer-motion";
import Lottie from "lottie-react";
import animation from "./blocks-animation.json";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export const AboutUs = () => {
  const motionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { ease: "easeIn", duration: 1 } },
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

  return (
    <section className="py-10 lg:py-20 bg-stone-100 font-poppins dark:bg-gray-800">
      <motion.div
        className="max-w-6xl py-4 mx-auto lg:py-6 md:px-6"
        initial="hidden"
        animate={controls}
        variants={motionVariants}
        ref={ref}
      >
        <div className="flex flex-wrap ">
          <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0 ">
            <div className="lg:max-w-md">
              <div className="px-4 pl-4 mb-6 border-l-4 border-blue-500">
                <span className="text-sm font-bold text-gray-600 uppercase dark:text-gray-400">
                  Who we are?
                </span>
                <h1 className="mt-2 text-3xl font-black text-gray-700 md:text-5xl dark:text-gray-300">
                  About Us
                </h1>
              </div>
              <p className="px-4 mb-10 text-base leading-7 text-gray-500 dark:text-gray-400">
              This is a demo project created for my portfolio showcasing real-time cryptocurrency prices. The project involves consuming an API to dynamically display up-to-date crypto prices.
              </p>
              <div className="flex flex-wrap items-center">
                <div className="w-full px-4 mb-6 sm:w-1/2 md:w-1/2 lg:mb-6">
                  <div className="p-6 bg-white dark:bg-gray-900 border-b-4 border-blue-500">
                    <span className="text-blue-500 dark:text-blue-400"></span>
                    <p className="mt-4 mb-2 text-3xl font-bold text-gray-700 dark:text-gray-400">
                    DATA
                    </p>
                    <h2 className="text-sm text-gray-700 dark:text-gray-400">
                      Text 1
                    </h2>
                  </div>
                </div>
                <div className="w-full px-4 mb-6 sm:w-1/2 md:w-1/2 lg:mb-6">
                  <div className="p-6 bg-white dark:bg-gray-900 border-b-4 border-blue-500">
                    <span className="text-blue-500 dark:text-blue-400"></span>
                    <p className="mt-4 mb-2 text-3xl font-bold text-gray-700 dark:text-gray-400">
                    DATA
                    </p>
                    <h2 className="text-sm text-gray-700 dark:text-gray-400">
                      Text 2
                    </h2>
                  </div>
                </div>
                <div className="w-full px-4 mb-6 sm:w-1/2 md:w-1/2 lg:mb-6">
                  <div className="p-6 bg-white dark:bg-gray-900 border-b-4 border-blue-500">
                    <span className="text-blue-500 dark:text-blue-400"></span>
                    <p className="mt-4 mb-2 text-3xl font-bold text-gray-700 dark:text-gray-400">
                    DATA
                    </p>
                    <h2 className="text-sm text-gray-700 dark:text-gray-400">
                      Text 3
                    </h2>
                  </div>
                </div>
                <div className="w-full px-4 mb-6 sm:w-1/2 md:w-1/2 lg:mb-6">
                  <div className="p-6 bg-white dark:bg-gray-900 border-b-4 border-blue-500">
                    <span className="text-blue-500 dark:text-blue-400"></span>
                    <p className="mt-4 mb-2 text-3xl font-bold text-gray-700 dark:text-gray-400">
                      DATA
                    </p>
                    <h2 className="text-sm text-gray-700 dark:text-gray-400">
                      Text 4
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0">
            <Lottie
              animationData={animation}
              className="relative z-40 object-cover w-full h-full"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};
