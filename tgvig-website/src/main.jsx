import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WalletProvider } from "./context/WalletContext";

import "./styles/theme.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
      <WalletProvider>
        <CartProvider>
          <AuthProvider>
          <App />
          </AuthProvider>
        </CartProvider>
      </WalletProvider>
  </BrowserRouter>
);