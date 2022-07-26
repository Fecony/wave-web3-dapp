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
    </div>
  );
};

export default App;
