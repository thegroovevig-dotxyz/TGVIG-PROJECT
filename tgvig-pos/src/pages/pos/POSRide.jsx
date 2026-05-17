export default function POSRide() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>🚗 POS Ride Request</h2>

      <input placeholder="Member ID / Phone" />
      <input placeholder="Pickup" />
      <input placeholder="Dropoff" />
      <input placeholder="Estimated Price" />

      <select>
        <option>CASH</option>
        <option>CARD</option>
        <option>WALLET</option>
        <option>POINTS</option>
      </select>

      <button>Request Ride</button>
    </div>
  );
}