/* eslint-disable react/prop-types */
import { motion, useAnimation } from "framer-motion";
import Lottie from "lottie-react";
import animation from "./blocks-animation.json";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { getGlobalData } from "../../api/main-api";

export const AboutUs = () => {
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
        staggerChildren: 0.2,
      },
    },
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

  const StatCard = ({ title, value }) => {
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef(null);

    const handleMouseMove = (event) => {
      if (!cardRef.current || !isHovered) return;

      const card = cardRef.current;
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`; // Aumentado scale
    };

    const handleMouseLeave = () => {
      if (!cardRef.current) return;
      cardRef.current.style.transform = "none";
      setIsHovered(false);
    };

    return (
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative w-full px-4 mb-6 sm:w-1/2 md:w-1/2 lg:mb-6"
        style={{ transition: "transform 0.2s ease-out" }}
      >
        <motion.div
          className="h-[140px] p-6 rounded-2xl overflow-hidden relative backdrop-blur-md border border-white/10 bg-gradient-to-br from-white/10 to-white/5 flex flex-col justify-between"
          whileHover={{
            boxShadow: "0 0 20px 0 rgba(59, 130, 246, 0.1)",
          }}
        >
          {/* Efectos de fondo animados */}
          <motion.div
            className="absolute -top-8 -left-8 w-24 h-24 bg-blue-500/30 rounded-full blur-2xl"
            animate={{
              scale: isHovered ? 1.2 : 1,
              opacity: isHovered ? 0.4 : 0.3,
            }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="absolute -bottom-8 -right-8 w-24 h-24 bg-purple-500/30 rounded-full blur-2xl"
            animate={{
              scale: isHovered ? 1.2 : 1,
              opacity: isHovered ? 0.4 : 0.3,
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Borde brillante en hover */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            initial={{ opacity: 0 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              background: [
                "radial-gradient(circle at 0% 0%, #3b82f6 0%, transparent 50%)",
                "radial-gradient(circle at 100% 100%, #a855f7 0%, transparent 50%)",
                "radial-gradient(circle at 0% 0%, #3b82f6 0%, transparent 50%)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          <div className="relative z-10 h-full flex flex-col justify-between">
            <motion.h2
              className="text-sm text-neutral-300 font-medium uppercase tracking-wider"
              animate={{
                color: isHovered ? "#93c5fd" : "#d4d4d4",
              }}
              transition={{ duration: 0.2 }}
            >
              {title}
            </motion.h2>
            {loading ? (
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin self-start mt-4" />
            ) : (
              <motion.p
                className="text-3xl font-bold text-slate-100 tracking-tight mt-4"
                animate={{
                  scale: isHovered ? 1.05 : 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
              >
                {value || 0}
              </motion.p>
            )}
          </div>

          {/* Efecto de brillo en movimiento */}
          <motion.div
            className="absolute inset-0 opacity-0"
            animate={{
              opacity: isHovered ? 0.1 : 0,
              background: [
                "radial-gradient(circle at 0% 0%, #3b82f6 0%, transparent 50%)",
                "radial-gradient(circle at 100% 100%, #a855f7 0%, transparent 50%)",
                "radial-gradient(circle at 0% 0%, #3b82f6 0%, transparent 50%)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.div>
      </motion.div>
    );
  };

  return (
    <section id="about-us" className="py-10 lg:py-20 relative overflow-hidden">
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
              <div className="flex flex-wrap items-center relative">
                {/* Spark más arriba de las tarjetas */}
                <motion.div
                  className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-[200px] h-[200px] bg-blue-500/60 rounded-full blur-[60px] z-0"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.6, 0.8, 0.6],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <StatCard
                  title="Crypto Currencies"
                  value={marketData.activeCrypto}
                />
                <StatCard title="Markets" value={marketData.markets} />
                <StatCard
                  title="Total Exchanges"
                  value={marketData.totalExchanges}
                />
                <StatCard title="Ongoing ICO" value={marketData.icos} />
              </div>
            </div>
          </div>
          <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0">
            <motion.div
              className="relative"
              animate={{
                y: [-10, 10, -10], 
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <motion.div
                className="relative aspect-square sm:aspect-video md:aspect-[4/3] lg:aspect-square backdrop-blur-sm bg-white/5 rounded-3xl p-6 border border-white/10"
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
              >
                <motion.div
                  className="absolute inset-0 rounded-3xl"
                  animate={{
                    background: [
                      "linear-gradient(45deg, rgba(59,130,246,0.1), rgba(168,85,247,0.1))",
                      "linear-gradient(225deg, rgba(59,130,246,0.1), rgba(168,85,247,0.1))",
                      "linear-gradient(45deg, rgba(59,130,246,0.1), rgba(168,85,247,0.1))",
                    ],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <Lottie
                  animationData={animation}
                  className="w-full h-full"
                  loop={true}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};