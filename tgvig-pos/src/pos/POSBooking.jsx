import { useState } from "react";
import API from "../api/axios";

export default function POSBooking() {
  const [clubId, setClubId] = useState("");
  const [tables, setTables] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("CASH");

  const handleBooking = async () => {
    try {
      await API.post("/table-bookings", {
        clubId,
        tables: tables.split(","),
        paymentMethod,
      });

      alert("Booking completed");

      setClubId("");
      setTables("");

    } catch (err) {
      console.log(err);
      alert("Booking failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🪑 POS Booking</h2>

      <input
        placeholder="Club ID"
        value={clubId}
        onChange={(e) => setClubId(e.target.value)}
      />

      <input
        placeholder="Tables (1,2,3)"
        value={tables}
        onChange={(e) => setTables(e.target.value)}
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

      <button onClick={handleBooking}>
        Confirm Booking
      </button>
    </div>
  );
}