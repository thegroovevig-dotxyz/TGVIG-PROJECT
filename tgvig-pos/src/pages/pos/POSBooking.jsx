export default function POSBooking() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>🪑 POS Table Booking</h2>

      <input placeholder="Member ID / Phone" />
      <input placeholder="Club" />
      <input placeholder="Table No" />
      <input placeholder="Amount" />

      <select>
        <option>CASH</option>
        <option>CARD</option>
        <option>WALLET</option>
        <option>POINTS</option>
      </select>

      <button>Create Booking</button>
    </div>
  );
}