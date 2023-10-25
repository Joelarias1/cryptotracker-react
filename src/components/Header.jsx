import { motion } from "framer-motion";

const Header = () => {
  return (
    <motion.section
      className="flex items-center min-h-screen justify-center"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5 }}
    >
      <div className="text-center w-full mx-auto px-4">
        <div className="text-center">
          <motion.p className="text-lg font-medium leading-8 text-purple-500">
            Introducing Crypto Portfolio
          </motion.p>
          <motion.h1 className="mt-3 text-[3.5rem] font-bold leading-[4rem] tracking-tight text-white">
            Track Your <span className="text-purple-500">Crypto</span> Assets in One Place
          </motion.h1>
          <motion.p className="mt-3 text-lg leading-relaxed text-slate-400">
            Stay informed about your cryptocurrency investments with our all-in-one crypto tracking solution.
          </motion.p>
        </div>

        <motion.div className="mt-6 flex items-center justify-center gap-4">
          <a
            href="#"
            className="transform rounded-md bg-purple-500 px-5 py-3 font-medium text-white transition-colors hover:bg-purple-400"
          >
            Get started for free
          </a>
          <a
            href="#"
            className="transform rounded-md border border-purple-500 px-5 py-3 font-medium text-white transition-colors hover:bg-purple-400"
          >
            Request a demo
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Header;
