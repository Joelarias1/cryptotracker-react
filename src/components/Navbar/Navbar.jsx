import { useEffect, useState } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  Button,
} from "@material-tailwind/react";
import { motion } from "framer-motion";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { DialogCustomAnimation } from "./Suscribe";
import myLogo from "../../assets/logo2.png";
import "./navbar.css";
import { Link } from 'react-scroll';



function NavList() {
  return (
    <ul className="my-8 mx-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <Link
          to="header"
          smooth={true}
          duration={500}
          className="flex items-center hover:text-blue-400 transition-colors cursor-pointer hover:scale-105"
        >
          Home
        </Link>
      </Typography>

      <Typography as="li" variant="small" className="p-1 font-medium">
        <Link
            to="about-us"
            smooth={true}
            duration={500}
            className="flex items-center hover:text-blue-400 transition-colors cursor-pointer hover:scale-105"
          >
            About Us
          </Link>
      </Typography>

      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <Link
            to="market"
            smooth={true}
            duration={500}
            className="flex items-center hover:text-blue-400 transition-colors cursor-pointer hover:scale-105" 
          >
            Demo
          </Link>
      </Typography>

      <li className="p-1 font-medium">
        <SubscribeButton />
      </li>
    </ul>
  );
}

const SubscribeButton = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleOpen = () => setDialogOpen(!dialogOpen);

  return (
    <>
      <motion.div
        whileTap={{
          scale: 0.75,
          borderRadius: "50%",
        }}
        whileHover={{
          scale: 1.1,
        }}
        transition={{ duration: 0.2 }}
      >
        <Button
          ripple
          className="mt-4 lg:mt-0 lg:ml-auto text-xs rounded-2xl font-medium bg-blue-600"
          onClick={handleOpen}
        >
          Subscribe
        </Button>
      </motion.div>

      <DialogCustomAnimation isOpen={dialogOpen} handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }} />
    </>
  );
};

export const NavbarSimple = () => {
  const [openNav, setOpenNav] = useState(false);

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <Navbar className="h-max max-w-full px-6 py-3 fixed z-50 rounded-none bg-neutral-900 border-none shadow-none">
      <div className="flex items-center justify-between text-white">
        <a className="flex items-center gap-2" href="#">
          <img
            className="w-auto h-11"
            src={myLogo}
            alt="Logo of CryptoTracker"
          />
          <h3 className="text-2xl font-bold leading-none">
            Crypto<span className="text-blue-500">Tracker</span>
          </h3>
        </a>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
      </Collapse>
    </Navbar>
  );
};
