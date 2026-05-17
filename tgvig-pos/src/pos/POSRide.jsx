import { useState } from "react";
import API from "../api/axios";

export default function POSRide() {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [price, setPrice] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("CASH");

  const handleRide = async () => {
    try {
      await API.post("/rides/request", {
        pickup,
        dropoff,
        estimatedPrice: price,
        paymentMethod,
      });

      alert("Ride requested");

      setPickup("");
      setDropoff("");
      setPrice("");

    } catch (err) {
      console.log(err);
      alert("Ride failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🚗 POS Ride Booking</h2>

      <input
        placeholder="Pickup"
        value={pickup}
        onChange={(e) => setPickup(e.target.value)}
      />

      <input
        placeholder="Dropoff"
        value={dropoff}
        onChange={(e) => setDropoff(e.target.value)}
      />

      <input
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <select
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
      >
        <option value="CASH">Cash</option>
        <option value="CARD">Speed Point</option>
        <option value="WALLET">Wallet</option>
        <option value="POINTS">Points</option>
      </select>

      <button onClick={handleRide}>
        Confirm Ride
      </button>
    </div>
  );
}