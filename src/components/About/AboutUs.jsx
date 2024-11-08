/* eslint-disable react/prop-types */
import { motion, useAnimation } from "framer-motion";
import Lottie from "lottie-react";
import animation from "./blocks-animation.json";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { getGlobalData } from "../../api/main-api";

export const AboutUs = ({ name }) => {
  const [marketData, setMarketData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
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
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        ease: "easeOut", 
        duration: 0.8,
        staggerChildren: 0.2
      } 
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { 
      scale: 1.05,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    }
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

  const StatCard = ({ title, value }) => (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      className="relative w-full px-4 mb-6 sm:w-1/2 md:w-1/2 lg:mb-6"
    >
      <div className="h-[140px] p-6 rounded-2xl overflow-hidden relative backdrop-blur-md border border-white/10 bg-gradient-to-br from-white/10 to-white/5 flex flex-col justify-between">
        {/* Gradient orb background */}
        <div className="absolute -top-8 -left-8 w-24 h-24 bg-blue-500/30 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-purple-500/30 rounded-full blur-2xl"></div>
        
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-between">
          <h2 className="text-sm text-neutral-300 font-medium uppercase tracking-wider">
            {title}
          </h2>
          {loading ? (
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin self-start mt-4"/>
          ) : (
            <p className="text-3xl font-bold text-slate-100 tracking-tight mt-4">
              {value || 0}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
  

  return (
    <section id={name} className="py-10 lg:py-20 relative overflow-hidden">
      {/* Gradient background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        className="max-w-6xl py-4 mx-auto lg:py-6 md:px-6 relative z-10"
        initial="hidden"
        animate={controls}
        variants={sectionAnimation}
        ref={ref}
      >
        <div className="flex flex-wrap">
          <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0">
            <div className="lg:max-w-md">
              <div className="px-4 pl-4 mb-6 border-l-4 border-blue-500">
                <span className="text-sm font-bold text-blue-400 uppercase">
                  Who we are?
                </span>
                <h1 className="mt-2 text-3xl font-black text-slate-200 md:text-5xl">
                  About Us
                </h1>
              </div>
              <p className="px-4 mb-10 text-md leading-7 text-neutral-300">
                This is a demo project created for my portfolio showcasing
                real-time cryptocurrency prices.
                <br />
                <br />
                The project involves consuming an API to dynamically display
                up-to-date crypto prices. Credits to CoinGecko for provide the
                API.
              </p>
              <div className="flex flex-wrap items-center">
                <StatCard title="Crypto Currencies" value={marketData.activeCrypto} />
                <StatCard title="Markets" value={marketData.markets} />
                <StatCard title="Total Exchanges" value={marketData.totalExchanges} />
                <StatCard title="Ongoing ICO" value={marketData.icos} />
              </div>
            </div>
          </div>
          <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0">
            <div className="relative">
              {/* Animation background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-xl"></div>
              <div className="relative aspect-square sm:aspect-video md:aspect-[4/3] lg:aspect-square backdrop-blur-sm bg-white/5 rounded-3xl p-6 border border-white/10">
                <Lottie
                  animationData={animation}
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};