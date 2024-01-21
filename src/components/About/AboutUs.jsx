/* eslint-disable react/prop-types */
import { motion, useAnimation } from "framer-motion";
import Lottie from "lottie-react";
import animation from "./blocks-animation.json";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { getGlobalData } from "../../api/main-api";
import { Spinner } from "@material-tailwind/react";


export const AboutUs = ({ name }) => {
  const [marketData, setMarketData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simular tiempo de carga de 2 segundos
        setTimeout(async () => {
          const marketdata = await getGlobalData();
          setMarketData(marketdata);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching market data:", error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const sectionAnimation = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { ease: "easeIn", duration: 0.7 } },
  };

  const cardsAnimation = {
    scale: 1.08,
    transition: { duration: 0.3 },
  };

  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  return (
    <section id={name} className="py-10 lg:py-20 bg-zinc-100">
      <motion.div
        className="max-w-6xl py-4 mx-auto lg:py-6 md:px-6"
        initial="hidden"
        animate={controls}
        variants={sectionAnimation}
        ref={ref}
      >
        <div className="flex flex-wrap ">
          <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0 ">
            <div className="lg:max-w-md">
              <div className="px-4 pl-4 mb-6 border-l-4 border-blue-500">
                <span className="text-sm font-bold text-gray-600 uppercase ">
                  Who we are?
                </span>
                <h1 className="mt-2 text-3xl font-black text-gray-700 md:text-5xl ">
                  About Us
                </h1>
              </div>
              <p className="px-4 mb-10 text-base leading-7 text-gray-500 dark:text-gray-400">
                This is a demo project created for my portfolio showcasing
                real-time cryptocurrency prices.
                <br />
                <br />
                The project involves consuming an API to dynamically display
                up-to-date crypto prices. Credits to CoinGecko for provide the
                API.
              </p>
              <div className="flex flex-wrap items-center">
                <div className="w-full px-4 mb-6 sm:w-1/2 md:w-1/2 lg:mb-6">
                  <motion.div
                    className="p-6 bg-white  border-b-4 border-blue-500"
                    whileHover={cardsAnimation}
                  >
                    <p className="mt-4 mb-2 text-3xl font-bold text-gray-700 ">
                      {loading ? <Spinner color="blue" size="4xl" /> : marketData.activeCrypto || 0}
                    </p>
                    <h2 className="text-md text-gray-700 font-medium">
                      Crypto Currencies
                    </h2>
                  </motion.div>
                </div>
                <div className="w-full px-4 mb-6 sm:w-1/2 md:w-1/2 lg:mb-6">
                  <motion.div
                    className="p-6 bg-white border-b-4 border-blue-500"
                    whileHover={cardsAnimation}
                  >
                    <p className="mt-4 mb-2 text-3xl font-bold text-gray-700 ">
                      {loading ? <Spinner color="blue" size="4xl" /> : marketData.markets || 0}
                    </p>
                    <h2 className="text-md text-gray-700 font-medium">
                      Markets
                    </h2>
                  </motion.div>
                </div>
                <div className="w-full px-4 mb-6 sm:w-1/2 md:w-1/2 lg:mb-6">
                  <motion.div
                    className="p-6 bg-white border-b-4 border-blue-500"
                    whileHover={cardsAnimation}
                  >
                    <p className="mt-4 mb-2 text-3xl font-bold text-gray-700 ">
                      {loading ? <Spinner color="blue" size="4xl" />: marketData.totalExchanges || 0}
                    </p>
                    <h2 className="text-md text-gray-700 font-medium">
                      Total Exchanges
                    </h2>
                  </motion.div>
                </div>
                <div className="w-full px-4 mb-6 sm:w-1/2 md:w-1/2 lg:mb-6">
                  <motion.div
                    className="p-6 bg-white border-b-4 border-blue-500"
                    whileHover={cardsAnimation}
                  >
                    <p className="mt-4 mb-2 text-3xl font-bold text-gray-700 ">
                      {loading ? <Spinner color="blue" size="4xl" /> : marketData.icos || 0}
                    </p>
                    <h2 className="text-md text-gray-700 font-medium">
                      Ongoing ICO
                    </h2>
                  </motion.div>
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
