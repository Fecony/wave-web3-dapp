import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useAccount, useNetwork } from "wagmi";
import { rinkeby } from "wagmi/chains";
import Danger from "./components/Danger.jsx";
import DisconnectButton from "./components/DisconnectButton.jsx";
import SendWave from "./components/SendWave.jsx";
import Header from "./components/Header.jsx";
import MetaMaskExtension from "./components/MetaMaskExtension.jsx";
import ConnectMetaMask from "./components/ConnectMetaMask.jsx";
import Github from "./components/Github.jsx";
import AttentionAlert from "./components/AttentionAlert.jsx";
import Address from "./components/Address.jsx";
import Loading from "./components/Loading.jsx";
import WaveList from "./components/WaveList.jsx";

const App = () => {
  const { chain } = useNetwork();
  const { address, isConnected, isDisconnected, status } = useAccount();

  const isCorrectNetwork = chain?.network === rinkeby.network;
  const isMetaMaskAvailable =
    typeof window.ethereum !== "undefined" && window.ethereum.isMetaMask;
  const isMetaMaskConnectedToWrongNetwork =
    isConnected && isMetaMaskAvailable && !isCorrectNetwork;

  const contractAddress = "0x5f201a69d75dab49352a265562859f0bedd0ce98";

  useEffect(() => {
    if (address) {
      toast.success("Hey! You are connected", {
        icon: "👋",
        id: "welcome:message",
      });
    }
  }, [address]);

  return (
    <main id="content" role="main" className="space-y-5">
      <AttentionAlert />

      <Address text="Contract address" address={contractAddress} />

      <div className="relative">
        <DisconnectButton />

        <div className="bg-white border border-gray-200 rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <div className="p-4 sm:p-7 space-y-5">
            <Header />

            {address ? (
              <>
                <Address
                  text="Your address"
                  address={address}
                  bgColor="bg-teal-100"
                  color="text-teal-800"
                />

                <SendWave />
              </>
            ) : (
              <>
                {["connecting", "reconnecting"].includes(status) ? (
                  <Loading />
                ) : (
                  <>
                    {!isMetaMaskAvailable && <MetaMaskExtension />}
                    {isDisconnected && <ConnectMetaMask />}
                  </>
                )}
              </>
            )}
          </div>
        </div>

        <Github />

        {isMetaMaskConnectedToWrongNetwork && <Danger />}
      </div>

      <WaveList />
    </main>
  );
};

export default App;
