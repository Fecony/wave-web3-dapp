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

  const waves = [
    {
      address: contractAddress,
      timestamp: 1597354800,
      message: "Hello, world!",
    },
    {
      address: contractAddress,
      timestamp: 1597354800,
      message: "Hello, world!",
    },
    {
      address: "0x4accb66CeA2a8168A06a89F73ED1a492Ad22b43C",
      timestamp: 1597354800,
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus quae velit mollitia dolores quasi itaque nihil, quidem facere obcaecati ipsa omnis quibusdam ad. Minus est vero non, alias voluptatem omnis?",
    },
    {
      address: contractAddress,
      timestamp: 1597354800,
      message: "Hello, world!",
    },
    {
      address: contractAddress,
      timestamp: 1597354800,
      message: "Hello, world!",
    },
    {
      address: contractAddress,
      timestamp: 1597354800,
      message: "Hello, world!",
    },
    {
      address: contractAddress,
      timestamp: 1597354800,
      message: "Hello, world!",
    },
    {
      address: contractAddress,
      timestamp: 1597354800,
      message: "Hello, world!",
    },
    {
      address: contractAddress,
      timestamp: 1597354800,
      message: "Hello, from Latvia",
    },
  ];

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

        {isMetaMaskConnectedToWrongNetwork && <Danger />}
      </div>

      <WaveList waves={waves} />

      <Github />
    </main>
  );
};

export default App;
