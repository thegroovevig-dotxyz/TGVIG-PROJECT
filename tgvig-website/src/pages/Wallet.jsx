import { useEffect, useState } from "react";
import { getWallet, topupWallet } from "../api/wallet.api";
import { authService } from "../auth/authService";

function Wallet() {
  const user = authService.getUser();

  const [wallet, setWallet] = useState(null);
  const [amount, setAmount] = useState("");

  const [card, setCard] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    name: "",
  });

  const loadWallet = async () => {
    try {
      const res = await getWallet(user._id);
      setWallet(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user) loadWallet();
  }, []);

  const handleTopup = async () => {
    try {
      const res = await topupWallet({
        memberId: user._id,
        amount: Number(amount),
        method: "CARD",
        cardDetails: card,
      });

      alert("Top-up initiated");
      setAmount("");
      setCard({
        cardNumber: "",
        expiry: "",
        cvv: "",
        name: "",
      });

      loadWallet();
    } catch (err) {
      console.log(err);
      alert("Top-up failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>WALLET</h2>

      <h3>Balance: R {wallet?.balance || 0}</h3>

      {/* AMOUNT */}
      <input
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      {/* CARD DETAILS */}
      <div style={{ marginTop: "10px" }}>
        <h4>Card Details</h4>

        <input
          placeholder="Card Number"
          value={card.cardNumber}
          onChange={(e) =>
            setCard({ ...card, cardNumber: e.target.value })
          }
        />

        <input
          placeholder="Expiry (MM/YY)"
          value={card.expiry}
          onChange={(e) =>
            setCard({ ...card, expiry: e.target.value })
          }
        />

        <input
          placeholder="CVV"
          value={card.cvv}
          onChange={(e) =>
            setCard({ ...card, cvv: e.target.value })
          }
        />

        <input
          placeholder="Card Holder Name"
          value={card.name}
          onChange={(e) =>
            setCard({ ...card, name: e.target.value })
          }
        />
      </div>

      <button onClick={handleTopup} style={{ marginTop: "10px" }}>
        Top Up Wallet
      </button>
    </div>
  );
}

export default Wallet;