import toast from 'react-hot-toast';

// TODO: use for wave method
// const notify = () => toast.promise(
//   saveSettings(settings),
//    {
//      loading: 'Saving...',
//      success: <b>Settings saved!</b>,
//      error: <b>Could not save.</b>,
//    }
//  );

// TODO: use for custom toast
// const notify = () => toast.custom((t) => (
//   <div class="max-w-xs bg-white border rounded-md shadow-lg dark:bg-gray-800 dark:border-gray-700" role="alert">
//     <div class="flex p-4">
//       <div class="flex-shrink-0">
//         <svg class="h-4 w-4 text-blue-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
//           <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
//         </svg>
//       </div>
//       <div class="ml-3">
//         <p class="text-sm text-gray-700 dark:text-gray-400">
//           This is a normal message.
//         </p>
//       </div>
//     </div>
//   </div>
// ));

const App = () => {
  // TODO: Sections

  // Header & Bio ?
  // Wave button with text
  // Connect wallet
  // Display all waves

  // TODO: confetti
  // TODO: toast messages
  //  - on waving
  //    - pending
  //    - success / fail
  //  - on win + confetti

  return (
    <div class="container mx-auto">
      <div class="relative rounded-xl overflow-auto p-8">
        <div class="min-h-[15rem] flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
          <div class="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
            <div class="flex justify-center">
              <div
                class="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full"
                role="status"
                aria-label="loading"
              >
                <span class="sr-only">Loading...</span>
              </div>
              {/* <button onClick={notify}>Make me a toast</button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
