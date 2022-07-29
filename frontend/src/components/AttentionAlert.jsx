import { toast } from "react-hot-toast";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import { rinkeby } from "wagmi/chains";

const AttentionAlert = () => {
  const { chain } = useNetwork();
  const { switchNetworkAsync } = useSwitchNetwork();
  const { isConnected } = useAccount();

  // We only want to show the alert if we're not on Rinkeby testnet
  // TODO: switch to Goerli testnet in the future
  const isCorrectNetwork = chain?.network === rinkeby.network;
  const isMetaMaskAvailable =
    typeof window.ethereum !== "undefined" && window.ethereum.isMetaMask;
  const isMetaMaskConnectedToWrongNetwork =
    isConnected && isMetaMaskAvailable && !isCorrectNetwork;

  if (
    (isMetaMaskAvailable && isConnected && isCorrectNetwork) ||
    // eslint-disable-next-line no-undef
    localStorage.getItem("dismissed") === "true"
  ) {
    return null;
  }

  const networkUsed = rinkeby.name;

  const switchToCorrectNetwork = () => {
    const toastId = toast.loading(`Switching to ${networkUsed} network...`);

    switchNetworkAsync?.(rinkeby.id)
      .then(() => {
        toast.success(`Switched to ${networkUsed} network!`, {
          icon: "🎉",
          id: toastId,
        });
      })
      .catch((error) => {
        toast.error(`Ooops... \nYou didn't switch to ${networkUsed} network`, {
          icon: "😱",
          id: toastId,
        });

        console.log(error);
      });
  };

  return (
    <div
      id="dismiss-alert"
      className="hs-removing:-translate-y-5 hs-removing:opacity-0 transition duration-300 bg-blue-50 border border-blue-200 rounded-md p-4"
      role="alert"
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <svg
            className="h-4 w-4 text-blue-400 mt-0.5"
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
          </svg>
        </div>

        <div className="ml-3">
          <h3 className="text-sm text-blue-800 font-medium">
            Attention needed
          </h3>
          <div className="text-sm text-blue-700 mt-2">
            Be sure to have your MetaMask extension installed and connected to
            the <span className="font-semibold">{networkUsed} network.</span>
          </div>

          {isMetaMaskConnectedToWrongNetwork && (
            <>
              <p className="text-sm mt-3">
                <button
                  className="text-gray-500 hover:text-gray-700 font-medium whitespace-nowrap"
                  onClick={switchToCorrectNetwork}
                >
                  Switch to {networkUsed} Network
                </button>
              </p>
            </>
          )}
        </div>

        <div className="pl-3 ml-auto">
          <div className="-mx-1.5 -my-1.5">
            <button
              type="button"
              className="inline-flex bg-blue-50 rounded-md p-1.5 text-blue-700 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-50 focus:ring-blue-600"
              data-hs-remove-element="#dismiss-alert"
              onClick={() => {
                // eslint-disable-next-line no-undef
                localStorage.setItem("dismissed", "true");
              }}
            >
              <span className="sr-only">Dismiss</span>

              <svg
                className="h-3 w-3"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M0.92524 0.687069C1.126 0.486219 1.39823 0.373377 1.68209 0.373377C1.96597 0.373377 2.2382 0.486219 2.43894 0.687069L8.10514 6.35813L13.7714 0.687069C13.8701 0.584748 13.9882 0.503105 14.1188 0.446962C14.2494 0.39082 14.3899 0.361248 14.5321 0.360026C14.6742 0.358783 14.8151 0.38589 14.9468 0.439762C15.0782 0.493633 15.1977 0.573197 15.2983 0.673783C15.3987 0.774389 15.4784 0.894026 15.5321 1.02568C15.5859 1.15736 15.6131 1.29845 15.6118 1.44071C15.6105 1.58297 15.5809 1.72357 15.5248 1.85428C15.4688 1.98499 15.3872 2.10324 15.2851 2.20206L9.61883 7.87312L15.2851 13.5441C15.4801 13.7462 15.588 14.0168 15.5854 14.2977C15.5831 14.5787 15.4705 14.8474 15.272 15.046C15.0735 15.2449 14.805 15.3574 14.5244 15.3599C14.2437 15.3623 13.9733 15.2543 13.7714 15.0591L8.10514 9.38812L2.43894 15.0591C2.23704 15.2543 1.96663 15.3623 1.68594 15.3599C1.40526 15.3574 1.13677 15.2449 0.938279 15.046C0.739807 14.8474 0.627232 14.5787 0.624791 14.2977C0.62235 14.0168 0.730236 13.7462 0.92524 13.5441L6.59144 7.87312L0.92524 2.20206C0.724562 2.00115 0.611816 1.72867 0.611816 1.44457C0.611816 1.16047 0.724562 0.887983 0.92524 0.687069Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttentionAlert;
