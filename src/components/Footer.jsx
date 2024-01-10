import { Button, Typography } from "@material-tailwind/react";
import { useEffect  } from "react";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
import { Link } from "react-scroll";

const Footer = () => {
  const motionVariants = {
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

  return (
    <footer className="bg-white">
      <motion.div
        className="container px-6 py-12 mx-auto"
        initial="hidden"
        animate={controls}
        variants={motionVariants}
        ref={ref}
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <h1 className="max-w-lg text-xl font-semibold tracking-tight text-gray-800 xl:text-2xl">
              Subscribe our newsletter to get updates.
            </h1>

            <div className="flex flex-col mx-auto mt-6 space-y-3 md:space-y-0 md:flex-row">
              <input
                id="email"
                type="text"
                className="px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-500  focus:outline-none"
                placeholder="Email Address"
              />

              <Button className="w-full px-6 py-2.5 text-sm font-medium tracking-wider text-white transition-colors duration-300 transform md:w-auto md:mx-4 focus:outline-none bg-blue-500 rounded-lg hover:bg-blue-600" ripple>
                Subscribe
              </Button>
            </div>
          </div>

          <section>
            <p className="font-semibold text-gray-800">
              Quick Links
            </p>

            <div className="flex flex-col items-start mt-5 space-y-2">
              <Link
                to="header"
                smooth={true}
                duration={500}
                className="text-gray-600 transition-colors duration-300 hover:text-blue-500 cursor-pointer"
              >
                Home
              </Link>
              <Link
                to="market"
                smooth={true}
                duration={500}
                className="text-gray-600 transition-colors duration-300 hover:text-blue-500 cursor-pointer"
              >
                Tracker
              </Link>
            </div>
          </section>

          <section>
            <p className="font-semibold text-gray-800">
              Industries
            </p>

            <div className="flex flex-col items-start mt-5 space-y-2">
              <a
                href="#"
                className="text-gray-600 transition-colors duration-300 hover:text-blue-500"
              >
                Crypto Currencies
              </a>
              <a
                href="#"
                className="text-gray-600 transition-colors duration-300 hover:text-blue-500"
              >
                Decentralized Finance <strong>(DeFi)</strong>
              </a>
              <a
                href="#"
                className="text-gray-600 transition-colors duration-300 hover:text-blue-500"
              >
                Finance
              </a>
            </div>
          </section>
        </div>

        <hr className="my-6 border-gray-200 md:my-8" />

        <div className="flex items-center justify-center">
          <Typography
            variant="small"
            color="blue-gray"
            className="text-black ml-4 font-medium"
          >
            © 2023 CryptoTracker. All rights reserved.
          </Typography>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
