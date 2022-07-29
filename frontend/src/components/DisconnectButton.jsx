import { useAccount, useDisconnect } from "wagmi";
import { toast } from "react-hot-toast";

const DisconnectButton = () => {
  const { address } = useAccount();
  const { disconnectAsync } = useDisconnect();

  if (!address) {
    return null;
  }

  const disconnect = () => {
    disconnectAsync().then(() => {
      toast.success("See ya!", {
        icon: "🙋",
      });
    });
  };

  return (
    <div
      className="hs-tooltip inline-block absolute top-2 right-2"
      data-hs-tooltip-placement="right"
    >
      <button
        type="button"
        className="hs-tooltip-toggle text-center inline-flex flex-shrink-0 justify-center items-center gap-2 h-8 w-8 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-xs"
        onClick={disconnect}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
        <span
          className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-sm"
          role="tooltip"
        >
          Disconnect account
        </span>
      </button>
    </div>
  );
};

export default DisconnectButton;
