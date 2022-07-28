import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "preline";
import { Toaster } from "react-hot-toast";
import { MetaMaskProvider } from "metamask-react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MetaMaskProvider>
      <Toaster
        toastOptions={{
          position: "top-right",
          style: {
            borderRadius: "4px",
          },
        }}
      />
      <App />
    </MetaMaskProvider>
  </React.StrictMode>
);
