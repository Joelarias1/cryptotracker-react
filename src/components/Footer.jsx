import myLogo from '../assets/logo.png';


const Footer = () => {
  return (
    <footer class="bg-white dark:bg-gray-900">
      <div class="container px-6 py-12 mx-auto">
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
          <div class="sm:col-span-2">
            <h1 class="max-w-lg text-xl font-semibold tracking-tight text-gray-800 xl:text-2xl dark:text-white">
              Subscribe our newsletter to get update.
            </h1>

            <div class="flex flex-col mx-auto mt-6 space-y-3 md:space-y-0 md:flex-row">
              <input
                id="email"
                type="text"
                class="px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-purple-400 dark:focus:border-purple-300 focus:outline-none"
                placeholder="Email Address"
              />

              <button class="w-full px-6 py-2.5 text-sm font-medium tracking-wider text-white transition-colors duration-300 transform md:w-auto md:mx-4 focus:outline-none bg-purple-500 rounded-lg hover:bg-purple-300">
                Subscribe
              </button>
            </div>
          </div>

          <section>
            <p class="font-semibold text-gray-800 dark:text-white">
              Quick Link
            </p>

            <div class="flex flex-col items-start mt-5 space-y-2">
              <a
                href="#"
                class="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-purple-400 hover:underline hover:text-purple-500"
              >
                Home
              </a>
              <a
                href="#"
                class="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-purple-400 hover:underline hover:text-purple-500"
              >
                Tracker
              </a>
              <a
                href="#"
                class="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-purple-400 hover:underline hover:text-purple-500"
              >
                Contact
              </a>
            </div>
          </section>

          <section>
            <p class="font-semibold text-gray-800 dark:text-white">
              Industries
            </p>

            <div class="flex flex-col items-start mt-5 space-y-2">
              <a
                href="#"
                class="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-purple-400 hover:underline hover:text-purple-500"
              >
                Crypto Currencies
              </a>
              <a
                href="#"
                class="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-purple-400 hover:underline hover:text-purple-500"
              >
                Decentralized Finance <strong>(DeFi)</strong>
              </a>
              <a
                href="#"
                class="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-purple-400 hover:underline hover:text-purple-500"
              >
                Finance
              </a>
            </div>
          </section>
        </div>

        <hr class="my-6 border-gray-200 md:my-8 dark:border-gray-700" />

        <sect class="flex items-center justify-between">
          <a href="#">
            <img
              class="w-auto h-7"
              src={myLogo}
              alt="Logo of CryptoTracker"
            />
            
          </a>

          <div class="flex -mx-2">
            <a
              href="#"
              class="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
              aria-label="Github"
            ></a>
          </div>
        </sect>
      </div>
    </footer>
  );
};

export default Footer;
