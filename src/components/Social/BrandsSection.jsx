/* eslint-disable react/prop-types */
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { useState, useRef, useEffect, useCallback } from "react";
import coingeckoLogo from "../../assets/coingecko-logo.svg";

export const BrandsSection = ({ name }) => {
  const logos = [
    {
      src: "https://www.cdnlogo.com/logos/r/63/react.svg",
      alt: "React",
      title: "React",
      width: "w-24",
    },
    {
      src: "https://www.cdnlogo.com/logos/t/58/tailwindcss.svg",
      alt: "Tailwind CSS",
      title: "Tailwind CSS",
      width: "w-20",
    },
    {
      src: "https://www.cdnlogo.com/logos/j/44/javascript.svg",
      alt: "JavaScript",
      title: "JavaScript",
      width: "w-20",
    },
    {
      src: coingeckoLogo,
      alt: "CoinGecko API",
      title: "CoinGecko",
      width: "w-48",
    },
    {
      src: "https://www.chartjs.org/img/chartjs-logo.svg",
      alt: "Chart.js",
      title: "ChartJS",
      width: "w-28",
    },
    {
      src: "https://cdn.worldvectorlogo.com/logos/framer-motion.svg",
      alt: "Framer Motion",
      title: "Framer Motion",
      width: "w-32",
    },
  ];

  const LogoCard = ({ logo }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <motion.div
        className="flex-shrink-0 group relative"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{
          scale: 1.1,
          y: -5,
          transition: { duration: 0.3, ease: "easeOut" },
        }}
      >
        <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 transition-all duration-300 group-hover:bg-white/10">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <img
            src={logo.src}
            alt={logo.alt}
            className={`${logo.width} h-28 object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-300`}
          />
        </div>
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 5, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-max z-20"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gray-900/80 rounded-full blur-sm"></div>
                <div className="relative bg-gray-900/95 px-4 py-2 rounded-full border border-white/10">
                  <p className="text-white/90 text-sm font-medium whitespace-nowrap">
                    {logo.title}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  const InfiniteCarousel = () => {
    const controls = useAnimationControls();
    const containerRef = useRef(null);

    const startAnimation = useCallback(async () => {
      if (!containerRef.current) return;

      await controls.start({
        x: "-50%",
        transition: {
          duration: 20,
          ease: "linear",
        },
      });

      controls.set({ x: "0%" });
      startAnimation();
    }, [controls]);

    useEffect(() => {
      startAnimation();

      return () => {
        controls.stop();
      };
    }, [startAnimation, controls]);

    return (
      <div
        className="overflow-hidden relative w-full mx-auto"
        ref={containerRef}
      >
        <motion.div
          className="flex gap-24 py-6
          "
          animate={controls}
          initial={{ x: "0%" }}
        >
          {[...logos, ...logos].map((logo, idx) => (
            <LogoCard key={`${logo.alt}-${idx}`} logo={logo} />
          ))}
        </motion.div>
      </div>
    );
  };

  return (
    <section
      id={name}
      className="relative py-12 bg-gradient-to-b from-neutral-900 to-neutral-800 overflow-hidden min-h-screen flex flex-col"
    >
      <div className="absolute inset-0">
        <div className="absolute -top-4 left-1/4 w-96 h-96 bg-neutral-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-neutral-900 via-neutral-900/80 to-transparent z-10"></div>
        <div
          className="absolute -bottom-4 right-1/4 w-96 h-96 bg-neutral-400/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="relative container mx-auto px-4 md:px-8 lg:px-16 flex-shrink-0 z-10 content-center my-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-white">Powered by </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600">
              Modern Technologies
            </span>
          </h2>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Built with the latest tools and frameworks for
            <span className="font-semibold text-blue-400">
              {" "}
              optimal performance{" "}
            </span>
            and an
            <span className="font-semibold text-blue-400">
              {" "}
              exceptional user experience
            </span>
          </p>
        </motion.div>
      </div>

      <div className="relative w-full flex-grow flex items-center overflow-hidden">
        <InfiniteCarousel />

        <div className="absolute bottom-0 inset-x-0">
          <div className="h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
          <div className="h-[1px] mt-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"></div>
        </div>
      </div>
    </section>
  );
};
