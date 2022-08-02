import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "preline";
import { Toaster } from "react-hot-toast";
import { WagmiConfig, createClient, configureChains, chain } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

const { chains, provider, webSocketProvider } = configureChains(
  [chain.rinkeby],
  [publicProvider()]
);

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
  connectors: [
    new MetaMaskConnector({
      chains,
    }),
  ],
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WagmiConfig client={client}>
      <Toaster
        toastOptions={{
          position: "top-right",
          style: {
            borderRadius: "4px",
          },
        }}
      />
      <App />
    </WagmiConfig>
  </React.StrictMode>
);
