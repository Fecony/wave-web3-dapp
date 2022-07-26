const App = () => {
  return (
    <div class="container mx-auto">
      <div class="relative rounded-xl overflow-auto p-8">
        <div class="grid grid-cols-3 gap-4 font-mono text-white text-sm text-center font-bold">
          <div class="p-4 rounded-lg bg-indigo-300 dark:bg-indigo-800 dark:text-indigo-400">
            01
          </div>
          <div class="p-4 rounded-lg bg-indigo-300 dark:bg-indigo-800 dark:text-indigo-400">
            02
          </div>
          <div class="p-4 rounded-lg bg-indigo-300 dark:bg-indigo-800 dark:text-indigo-400">
            03
          </div>
          <div class="p-4 rounded-lg shadow-lg bg-indigo-500 col-span-2">
            04
          </div>
          <div class="p-4 rounded-lg bg-indigo-300 dark:bg-indigo-800 dark:text-indigo-400">
            05
          </div>
          <div class="p-4 rounded-lg bg-indigo-300 dark:bg-indigo-800 dark:text-indigo-400">
            06
          </div>
          <div class="p-4 rounded-lg shadow-lg bg-indigo-500 col-span-2">
            07
          </div>
        </div>
      </div>

      <button
        type="button"
        class="hs-collapse-toggle py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
        id="hs-basic-collapse"
        data-hs-collapse="#hs-basic-collapse-heading"
      >
        Collapse
      </button>
      <div
        id="hs-basic-collapse-heading"
        class="hs-collapse hidden w-full overflow-hidden transition-[height] duration-300"
        aria-labelledby="hs-basic-collapse"
      >
        <div class="mt-5">
          <p class="text-gray-500 dark:text-gray-400">
            This is a collapse body. It is hidden by default, until the collapse
            plugin adds the appropriate classes that we use to style each
            element. These classes control the overall appearance, as well as
            the showing and hiding via CSS transitions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
