// import { useState } from "react";
// import toast from "react-hot-toast";
import { useMetaMask } from "metamask-react";
// import WavePortalABI from "./artifacts/contracts/WavePortal.sol/WavePortal.json";

import MetaMaskExtension from "./components/MetamaskExtension.jsx";
import MetaMaskConnect from "./components/MetamaskConnect.jsx";
import Github from "./components/Github.jsx";
import AttentionAlert from "./components/AttentionAlert.jsx";
import Address from "./components/Address.jsx";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import truncateEthAddress from "truncate-eth-address";

const App = () => {
  const { status, connect, account: address } = useMetaMask();

  // const [totalWaveCount, setTotalWaveCount] = useState(0);
  // const [totalUserWaveCount, setTotalUserWaveCount] = useState(0);
  // const [allWaves, setAllWaves] = useState([]);

  const [message, setMessage] = useState("");

  const contractAddress = "0x5f201a69d75dab49352a265562859f0bedd0ce98";
  // const contractABI = WavePortalABI.abi;

  // if (status === "initializing") {
  //   return <div>Synchronisation with MetaMask ongoing...</div>;
  // }

  // if (status === "connecting") {
  //   return <div>Connecting...</div>;
  // }

  // TODO: Sections

  // Header & Bio ? ✅
  // Wave button with text input ✅
  // Connect wallet ✅
  // Display all waves

  // TODO: confetti
  // TODO: toast messages
  //  - on login
  //  - on waving
  //    - pending
  //    - success / fail
  //  - on win + confetti

  useEffect(() => {
    if (address) {
      toast.success("Hey! You are connected", {
        icon: "👋",
        style: {
          borderRadius: "4px",
        },
      });
    }
  }, [address]);

  return (
    <main id="content" role="main" className="space-y-5">
      <AttentionAlert />

      <Address text="Contract address" address={contractAddress} />

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 ">
              Wave Portal 👋
            </h1>
          </div>

          <div className="mt-5 space-y-5">
            {address ? (
              <>
                <Address
                  text="Your address"
                  address={address}
                  bgColor="bg-teal-100"
                  color="text-teal-800"
                />

                <div>
                  <label
                    htmlFor="hs-trailing-button-add-on-with-icon"
                    className="sr-only"
                  >
                    Message
                  </label>

                  <div className="flex rounded-md shadow-sm">
                    <input
                      onChange={(e) => setMessage(e.target.value)}
                      type="text"
                      placeholder="Wave at me!"
                      id="hs-trailing-button-add-on-with-icon"
                      name="hs-trailing-button-add-on-with-icon"
                      className="py-3 px-4 block w-full border-gray-200 shadow-sm rounded-l-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    />

                    <button
                      type="button"
                      aria-label="Send message"
                      className="inline-flex flex-shrink-0 justify-center items-center h-[2.875rem] w-[2.875rem] rounded-r border border-transparent font-semibold bg-blue-100 hover:bg-blue-200 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    >
                      <span aria-hidden="true">👋</span>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                {status === "unavailable" && <MetaMaskExtension />}
                {status === "notConnected" && (
                  <MetaMaskConnect connect={connect} />
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <div className="columns-2 gap-4">
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
            message: "Hello, world!",
          },
        ].map((wave, index) => {
          return (
            <div className={`overflow-auto ${index !== 0 ? "mt-5" : ""}`}>
              <div class="w-full  flex flex-col bg-white border shadow-sm  p-4 md:p-5 dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
                <p class="mt-1 text-xs font-medium uppercase text-gray-500 dark:text-gray-500">
                  {truncateEthAddress(wave.address)}
                </p>
                <p class="mt-2 text-gray-800 dark:text-gray-400">
                  {wave.message}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <Github />
    </main>
  );
};

export default App;
