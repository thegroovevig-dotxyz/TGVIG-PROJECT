import { useState } from "react";
import API from "../api/axios";

function WalletTopUp() {
  const [membershipNo, setMembershipNo] = useState("");
  const [pin, setPin] = useState("");
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("CASH");

  const handleTopUp = async () => {
    try {
      const res = await API.post("/wallet/topup", {
        membershipNo,
        pin,
        amount,
        method,
      });

      alert(res.data.message);
      setMembershipNo("");
      setPin("");
      setAmount("");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Top-up failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Wallet Top-Up</h2>

      {/* MEMBER IDENTIFICATION */}
      <input
        placeholder="Scan / Enter Membership No"
        value={membershipNo}
        onChange={(e) => setMembershipNo(e.target.value)}
      />

      <input
        type="password"
        placeholder="PIN"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
      />

      <hr />

      {/* AMOUNT */}
      <input
        type="number"
        placeholder="Enter Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      {/* PAYMENT METHOD */}
      <select value={method} onChange={(e) => setMethod(e.target.value)}>
        <option value="CASH">Cash</option>
        <option value="SPEEDPOINT">SpeedPoint</option>
      </select>

      <hr />

      <button onClick={handleTopUp}>
        Proceed Top-Up
      </button>
    </div>
  );
}

export default WalletTopUp;