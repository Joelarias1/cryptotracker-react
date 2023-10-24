const Header = () => {
  return (
    <section className="flex items-center min-h-screen justify-center bg-neutral-900">
      <div className="text-center w-full mx-auto">
        <div className="text-center">
          <p className="text-lg font-medium leading-8 text-purple-500">Introducing Crypto Portfolio</p>
          <h1 className="mt-3 text-[3.5rem] font-bold leading-[4rem] tracking-tight text-white">Track Your Crypto Assets in One Place</h1>
          <p className="mt-3 text-lg leading-relaxed text-slate-400">Stay informed about your cryptocurrency investments with our all-in-one crypto tracking solution.</p>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <a href="#" className="transform rounded-md bg-purple-500 px-5 py-3 font-medium text-white transition-colors hover:bg-purple-400">Get started for free</a>
          <a href="#" className="transform rounded-md border border-purple-500 px-5 py-3 font-medium text-white transition-colors hover:bg-purple-400"> Request a demo </a>
        </div>
      </div>
    </section>
  );
};

export default Header;
