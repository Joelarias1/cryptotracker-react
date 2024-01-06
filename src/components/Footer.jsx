import { Button, Typography } from "@material-tailwind/react";

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="container px-6 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <h1 className="max-w-lg text-xl font-semibold tracking-tight text-gray-800 xl:text-2xl dark:text-white">
              Subscribe our newsletter to get updates.
            </h1>

            <div className="flex flex-col mx-auto mt-6 space-y-3 md:space-y-0 md:flex-row">
              <input
                id="email"
                type="text"
                className="px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-purple-400 dark:focus:border-purple-300 focus:outline-none"
                placeholder="Email Address"
              />

              <Button className="w-full px-6 py-2.5 text-sm font-medium tracking-wider text-white transition-colors duration-300 transform md:w-auto md:mx-4 focus:outline-none bg-blue-500 rounded-lg hover:bg-blue-300">
                Subscribe
              </Button>
            </div>
          </div>

          <section>
            <p className="font-semibold text-gray-800 dark:text-white">Quick Links</p>

            <div className="flex flex-col items-start mt-5 space-y-2">
              <a
                href="#"
                className="text-gray-600 transition-colors duration-300 hover:text-blue-500"
              >
                Home
              </a>
              <a
                href="#"
                className="text-gray-600 transition-colors duration-300 hover:text-blue-500"
              >
                Tracker
              </a>
              <a
                href="#"
                className="text-gray-600 transition-colors duration-300 hover:text-blue-500"
              >
                Contact
              </a>
            </div>
          </section>

          <section>
            <p className="font-semibold text-gray-800 dark:text-white">Industries</p>

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

        <hr className="my-6 border-gray-200 md:my-8 dark:border-gray-700" />

        <div className="flex items-center justify-center">
          <Typography 
          variant="small"
          color="blue-gray"
          className="text-black ml-4 font-medium">© 2023 CryptoTracker. All rights reserved.</Typography>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
