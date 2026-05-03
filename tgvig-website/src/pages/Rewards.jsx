import { authService } from "../auth/authService";
import { useState } from "react";

function Rewards() {
  const user = authService.getUser();

  const [redeemAmount, setRedeemAmount] = useState("");

  if (!user) {
    return <p>Please login</p>;
  }

  const handleRedeem = async () => {
    try {
      // placeholder for backend call
      alert(`Redeeming ${redeemAmount} points`);
      setRedeemAmount("");
    } catch (err) {
      console.log(err);
      alert("Redeem failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>REWARDS</h2>

      <div style={{ border: "1px solid #ccc", padding: "15px" }}>
        <p><b>Points Balance:</b> {user.pointsBalance}</p>
        <p><b>Tier:</b> {user.tier}</p>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h3>Redeem Points</h3>

        <input
          placeholder="Enter points"
          value={redeemAmount}
          onChange={(e) => setRedeemAmount(e.target.value)}
        />

        <button onClick={handleRedeem}>
          Redeem
        </button>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h3>Tier Benefits</h3>

        <ul>
          <li>BRONZE - Basic access</li>
          <li>SILVER - Discounts</li>
          <li>GOLD - Priority deals</li>
          <li>VIP - Exclusive events</li>
        </ul>
      </div>
    </div>
  );
}

export default Rewards;