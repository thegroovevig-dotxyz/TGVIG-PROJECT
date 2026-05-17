import { useState } from "react";
import API from "../api/axios";

export default function POSParking() {
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [parkingId, setParkingId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("CASH");

  const handleParking = async () => {
    try {
      await API.post("/parking/start", {
        vehiclePlate,
        parkingId,
        paymentMethod,
      });

      alert("Parking started");

      setVehiclePlate("");
      setParkingId("");

    } catch (err) {
      console.log(err);
      alert("Parking failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🅿️ POS Parking</h2>

      <input
        placeholder="Vehicle Plate"
        value={vehiclePlate}
        onChange={(e) => setVehiclePlate(e.target.value)}
      />

      <input
        placeholder="Parking ID"
        value={parkingId}
        onChange={(e) => setParkingId(e.target.value)}
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

      <button onClick={handleParking}>
        Start Parking
      </button>
    </div>
  );
}