const Danger = () => {
  return (
    <>
      <div className="absolute top-0 left-0 w-full h-full bg-white/[.8] rounded-md dark:bg-gray-800/[.4]"></div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full p-6">
        <div
          className="bg-yellow-50 border border-yellow-200 rounded-md p-4"
          role="alert"
        >
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-4 w-4 text-yellow-400 mt-0.5"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-sm text-yellow-800 font-semibold">
                Wrong network
              </h3>
              <div className="mt-1 text-sm text-yellow-700">
                We are unable to continue while you are not using correct
                testnet
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Danger;
