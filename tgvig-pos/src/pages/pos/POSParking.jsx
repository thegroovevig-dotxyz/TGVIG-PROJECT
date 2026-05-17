export default function POSParking() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>🅿️ POS Parking</h2>

      <input placeholder="Member ID / Phone" />
      <input placeholder="Vehicle Plate" />
      <input placeholder="Parking Area" />
      <input placeholder="Amount" />

      <select>
        <option>CASH</option>
        <option>CARD</option>
        <option>WALLET</option>
        <option>POINTS</option>
      </select>

      <button>Start Parking</button>
    </div>
  );
}