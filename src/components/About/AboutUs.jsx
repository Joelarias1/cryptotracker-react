import { motion, useAnimation } from "framer-motion";
import Lottie from "lottie-react";
import animation from "./blocks-animation.json";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { getGlobalData } from "../../api/main-api";

export const AboutUs = () => {
  const [marketData, setMarketData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const marketdata = await getGlobalData();
        setMarketData(marketdata);
      } catch (error) {
        console.error("Error fetching market data:", error.message);
      }
    };

    fetchData();
  }, []);

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
    <section className="py-10 lg:py-20 bg-stone-100">
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
                <span className="text-sm font-bold text-gray-600 uppercase ">
                  Who we are?
                </span>
                <h1 className="mt-2 text-3xl font-black text-gray-700 md:text-5xl ">
                  About Us
                </h1>
              </div>
              <p className="px-4 mb-10 text-base leading-7 text-gray-500 dark:text-gray-400">
                This is a demo project created for my portfolio showcasing
                real-time cryptocurrency prices. The project involves consuming
                an API to dynamically display up-to-date crypto prices.
              </p>
              <div className="flex flex-wrap items-center">
                <div className="w-full px-4 mb-6 sm:w-1/2 md:w-1/2 lg:mb-6">
                  <div className="p-6 bg-white  border-b-4 border-blue-500">
                    <span className="text-blue-500 "></span>
                    <p className="mt-4 mb-2 text-3xl font-bold text-gray-700 ">
                      {marketData.activeCrypto || 0}
                    </p>
                    <h2 className="text-md text-gray-700 font-normal">
                      Crypto Currencies
                    </h2>
                  </div>
                </div>
                <div className="w-full px-4 mb-6 sm:w-1/2 md:w-1/2 lg:mb-6">
                  <div className="p-6 bg-white border-b-4 border-blue-500">
                    <span className="text-blue-500"></span>
                    <p className="mt-4 mb-2 text-3xl font-bold text-gray-700 ">
                      {marketData.markets|| 0}
                    </p>
                    <h2 className="text-md text-gray-700 font-normal">
                      Markets
                    </h2>
                  </div>
                </div>
                <div className="w-full px-4 mb-6 sm:w-1/2 md:w-1/2 lg:mb-6">
                  <div className="p-6 bg-white border-b-4 border-blue-500">
                    <span className="text-blue-50"></span>
                    <p className="mt-4 mb-2 text-3xl font-bold text-gray-700 ">
                      {marketData.totalExchanges || 0}
                    </p>
                    <h2 className="text-md text-gray-700 font-normal">
                      Total Exchanges
                    </h2>
                  </div>
                </div>
                <div className="w-full px-4 mb-6 sm:w-1/2 md:w-1/2 lg:mb-6">
                  <div className="p-6 bg-white border-b-4 border-blue-500">
                    <span className="text-blue-500 "></span>
                    <p className="mt-4 mb-2 text-3xl font-bold text-gray-700 ">
                      {marketData.icos || 0}
                    </p>
                    <h2 className="text-md text-gray-700 font-normal">
                      Ongoing Icos
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
