import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { BrowserRouter } from "react-router-dom";


import { CartProvider } from "./context/CartContext";
import { WalletProvider } from "./context/WalletContext";

import "./styles/theme.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
      <WalletProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </WalletProvider>
  </BrowserRouter>
);