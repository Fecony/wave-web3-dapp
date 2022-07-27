import toast from "react-hot-toast";
import { useMetaMask } from "metamask-react";
import MetaMaskExtension from "./components/MetamaskExtension.jsx";
import MetaMaskConnect from "./components/MetamaskConnect.jsx";
import Github from "./components/Github";
import AttentionAlert from "./components/AttentionAlert";

const App = () => {
  const { status, connect, account, chainId, switchChain } = useMetaMask();

  // if (status === "initializing") {
  //   return <div>Synchronisation with MetaMask ongoing...</div>;
  // }

  // if (status === "connecting") {
  //   return <div>Connecting...</div>;
  // }

  // if (status === "connected")
  //   // TODO: yay we can send wave!
  //   return (
  //     <div>
  //       Connected account {account} on chain ID {chainId}
  //     </div>
  //   );

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
    <main id="content" role="main">
      <AttentionAlert />

      <div className="mt-5 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 ">
              Wave Portal 👋
            </h1>
          </div>
          <div className="mt-5">
            {status === "unavailable" && <MetaMaskExtension />}
            {status === "notConnected" && <MetaMaskConnect connect={connect} />}
          </div>
        </div>
      </div>

      <Github />
    </main>
  );
};

export default App;
