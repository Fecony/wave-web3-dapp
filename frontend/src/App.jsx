import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useAccount, useNetwork, useContractEvent } from "wagmi";
import { rinkeby } from "wagmi/chains";
import Danger from "./components/Danger";
import DisconnectButton from "./components/DisconnectButton";
import SendWave from "./components/SendWave";
import Header from "./components/Header";
import MetaMaskExtension from "./components/MetaMaskExtension";
import ConnectMetaMask from "./components/ConnectMetaMask";
import Github from "./components/Github";
import AttentionAlert from "./components/AttentionAlert";
import Address from "./components/Address";
import Loading from "./components/Loading";
import WaveList from "./components/WaveList";
import WaveCount from "./components/WaveCount";
import { abi as WavePortalABI } from "./artifacts/contracts/WavePortal.sol/WavePortal.json";
import Confetti from "react-confetti";

const App = () => {
  const { chain } = useNetwork();
  const [isVisibleConfetti, setVisibleConfetti] = useState(false);

  const { address, isConnected, isDisconnected, status } = useAccount();

  const isCorrectNetwork = chain?.network === rinkeby.network;
  const isMetaMaskAvailable =
    typeof window.ethereum !== "undefined" && window.ethereum.isMetaMask;
  const isMetaMaskConnectedToWrongNetwork =
    isConnected && isMetaMaskAvailable && !isCorrectNetwork;

  const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

  useContractEvent({
    addressOrName: contractAddress,
    contractInterface: WavePortalABI,
    eventName: "WonPrize",
    listener: (event) => {
      if (event[0] === address) {
        setVisibleConfetti(true);
      }

      console.log("user won!", event);
    },
  });

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
      {isVisibleConfetti && (
        <Confetti
          numberOfPieces={200}
          recycle={false}
          onConfettiComplete={(confetti) => {
            setVisibleConfetti(false);
          }}
        />
      )}

      <AttentionAlert />

      <Address text="Contract address" address={contractAddress} />

      <WaveCount />

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
