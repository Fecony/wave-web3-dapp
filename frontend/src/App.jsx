import MetaMaskExtension from "./components/MetamaskExtension.jsx";
import MetaMaskConnect from "./components/MetamaskConnect.jsx";
import Github from "./components/Github.jsx";
import AttentionAlert from "./components/AttentionAlert.jsx";
import Address from "./components/Address.jsx";
import Loading from "./components/Loading.jsx";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import truncateEthAddress from "truncate-eth-address";
import Danger from "./components/Danger.jsx";
import SendWave from "./components/SendWave.jsx";
import Header from "./components/Header.jsx";
import { useAccount, useConnect } from "wagmi";
import DisconnectButton from "./components/DisconnectButton.jsx";
import { rinkeby } from "wagmi/chains";

const App = () => {
  const { address, connector, isConnecting, isDisconnected, isReconnecting } =
    useAccount();
  const { data } = useConnect();

  // const isCorrectTestnet = data?.chain?.network === rinkeby.network;

  // console.log(isCorrectTestnet, data, data?.chain?.id, rinkeby?.id);

  const contractAddress = "0x5f201a69d75dab49352a265562859f0bedd0ce98";

  // TODO: Sections
  // Header & Bio ? ✅
  // Wave button with text input ✅
  // Connect wallet ✅
  // Display all waves

  // TODO: toast messages
  //  - on login ✅
  //     - pending ✅
  //     - fail ✅
  //     - success ✅
  //  - on waving
  //    - pending
  //    - success
  //    - fail
  //  - on win + confetti

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

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <div className="p-4 sm:p-7">
            <Header />

            <div className="mt-5 space-y-5">
              {address ? (
                <>
                  <Address
                    text="Your address"
                    address={address}
                    bgColor="bg-teal-100"
                    color="text-teal-800"
                  />

                  {/* <SendWave /> */}
                </>
              ) : (
                <>
                  {/* TODO: find a way to determine those... */}
                  {!connector && <MetaMaskExtension />}
                  {isDisconnected && connector && <MetaMaskConnect />}
                  {isConnecting || (isReconnecting && <Loading />)}
                </>
              )}
            </div>
          </div>
        </div>

        {/* {!isCorrectTestnet && <Danger />} */}
      </div>

      {/* <div className="columns-2 gap-4 space-y-4">
        {[
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
            message:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus quae velit mollitia dolores quasi itaque nihil, quidem facere obcaecati ipsa omnis quibusdam ad. Minus est vero non, alias voluptatem omnis?",
          },
          {
            address: contractAddress,
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
            message: "Hello, from Latvia",
          },
        ].map((wave, index) => {
          return (
            <div className={`overflow-auto `} key={index}>
              <div class="w-full rounded-xl flex flex-col bg-white border shadow-sm p-4 md:p-5">
                <a
                  href={`https://rinkeby.etherscan.io/address/${wave.address}`}
                  target="_blank"
                >
                  <p class="mt-1 text-xs font-medium  text-gray-500 dark:text-gray-500">
                    {truncateEthAddress(wave.address)}
                  </p>
                </a>

                <p class="mt-2 text-gray-800 dark:text-gray-400">
                  {wave.message}
                </p>
              </div>
            </div>
          );
        })}
      </div> */}

      <Github />
    </main>
  );
};

export default App;
