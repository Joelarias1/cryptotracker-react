const Header = () => {
    return (
    <section class="py-24 flex items-center min-h-screen justify-center bg-neutral-900">
      <div class="mx-auto max-w-[43rem]">
        <div class="text-center">
          <p class="text-lg font-medium leading-8 text-purple-500">Introducing Crypto Portfolio</p>
          <h1 class="mt-3 text-[3.5rem] font-bold leading-[4rem] tracking-tight text-white">Check your Crypto Assets in one site</h1>
          <p class="mt-3 text-lg leading-relaxed text-slate-400">Specify helps you unify your brand identity by collecting, storing and distributing design tokens and assets — automatically.</p>
        </div>

        <div class="mt-6 flex items-center justify-center gap-4">
          <a href="#" class="transform rounded-md bg-purple-500 px-5 py-3 font-medium text-white transition-colors hover:bg-purple-400">Get started for free</a>
          <a href="#" class="transform rounded-md border border-purple-500 px-5 py-3 font-medium text-white transition-colors hover:bg-purple-400"> Request a demo </a>
        </div>
      </div>
    </section>
    );
  };
  

  export default Header;