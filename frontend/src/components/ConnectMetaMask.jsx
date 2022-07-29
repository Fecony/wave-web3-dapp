import MetamaskLogo from "../assets/metamask_logo.svg";
import { toast } from "react-hot-toast";
import { useConnect, chain } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

const ConnectMetaMask = () => {
  const { connectAsync } = useConnect({
    connector: new MetaMaskConnector({
      chains: [chain.rinkeby],
    }),
  });

  const connectWithMetaMask = () => {
    connectAsync?.().catch((error) => {
      console.log(error);

      toast.error("Ooops... Something went wrong", {
        icon: "😱",
      });
    });
  };

  return (
    <button
      onClick={connectWithMetaMask}
      type="button"
      className="w-full py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm"
    >
      <img src={MetamaskLogo} width={16} height={16} alt="MetaMask Logo" />
      Connect with MetaMask
    </button>
  );
};

export default ConnectMetaMask;
