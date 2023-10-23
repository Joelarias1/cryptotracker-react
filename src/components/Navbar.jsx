import { useState } from "react";
import myLogo from "../assets/logo.png";

const Navbar = () => {
  let Links = [
    { name: "Home", link: "/" },
    { name: "About", link: "/" },
    { name: "Tracker", link: "/" },
    { name: "Contact", link: "/" },
  ];
  let [open, setOpen] = useState(false);

  return (
    <nav className="w-full fixed top-0 left-0 bg-neutral-800 shadow-lg border-b border-purple-500">
      <div className="md:flex items-center justify-between py-3 md:px-10 px-7">
        <a className="logo flex items-center">
          <img src={myLogo} alt="Company Logo" className="h-14 w-14" />
        </a>

        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden text-white"
        >
          <ion-icon name={open ? "close" : "menu"}></ion-icon>
        </div>

        <ul
          className={`md:flex md:items-centerborder-b border-purple-500 md:pb-0 pb-12 absolute md:static bg-neutral-800 md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-20 border-b border-purple-500" : "top-[-490px] "
          }`}
        >
          {Links.map((link) => (
            <li key={link.name} className="md:ml-8 font-medium md:my-0 my-7">
              <a
                href={link.link}
                className="text-white hover:text-purple-400 duration-500"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
