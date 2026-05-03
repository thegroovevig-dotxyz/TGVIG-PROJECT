import { createContext, useContext, useState } from "react";

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [wallet, setWallet] = useState({
    balance: 0,
    points: 0,
  });

  const updateWallet = (data) => {
    setWallet(data);
  };

  return (
    <WalletContext.Provider value={{ wallet, updateWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);