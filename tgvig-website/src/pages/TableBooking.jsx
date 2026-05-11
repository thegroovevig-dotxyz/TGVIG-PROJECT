import { useEffect, useState } from "react";
import { getClubs } from "../api/clubs.api";
import { useNavigate } from "react-router-dom";

export default function TableBooking() {
  const [clubs, setClubs] = useState([]);
  const [selectedClub, setSelectedClub] = useState(null);

  const [selectedTables, setSelectedTables] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("WALLET");
  const [pin, setPin] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    loadClubs();
  }, []);

  const loadClubs = async () => {
    try {
      const res = await getClubs();
      setClubs(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  // ---- TABLE CALC (mock structure for now) ----
  const getTableStats = (club) => {
    const total = club.tables || 20;
    const booked = club.bookedTables || 5;
    const sold = club.soldTables || 2;

    return {
      total,
      booked,
      sold,
      available: total - booked - sold,
    };
  };

  const toggleTable = (tableId) => {
    setSelectedTables((prev) =>
      prev.includes(tableId)
        ? prev.filter((t) => t !== tableId)
        : [...prev, tableId]
    );
  };

  const handleBooking = () => {
    if (!selectedClub) return alert("Select club first");
    if (selectedTables.length === 0) return alert("Select tables");
    if (!pin) return alert("Enter PIN");

    const stats = getTableStats(selectedClub);

    const totalPrice = selectedTables.length * 500; // example price
    const deposit = totalPrice * 0.4;

    const bookingPayload = {
      clubId: selectedClub._id,
      tables: selectedTables,
      totalPrice,
      deposit,
      paymentMethod,
      pin,
      rules: {
        validHours: 72,
        refundableSold: 0.5,
        refundableBooking: false,
        pointsAllowed: false,
      },
    };

    console.log("BOOKING:", bookingPayload);

    // navigate to checkout if you want
    navigate("/home/checkout", { state: bookingPayload });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Table Booking</h2>

      {/* CLUB LIST */}
      <div>
        {clubs.map((c) => {
          const stats = getTableStats(c);

          return (
            <div
              key={c._id}
              onClick={() => setSelectedClub(c)}
              style={{
                border: "1px solid #ccc",
                margin: "10px",
                padding: "10px",
                cursor: "pointer",
              }}
            >
              <img
                src={c.image || "https://via.placeholder.com/100"}
                width="100"
              />
              <p><b>{c.name}</b></p>

              {/* TABLE STATS */}
              <p>Total: {stats.total}</p>
              <p>Booked: {stats.booked}</p>
              <p>Sold: {stats.sold}</p>
              <p>Available: {stats.available}</p>
            </div>
          );
        })}
      </div>

      {/* SELECTED CLUB */}
      {selectedClub && (
        <div style={{ marginTop: "20px" }}>
          <h3>{selectedClub.name} - Select Tables</h3>

          {/* MOCK TABLES */}
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {[1, 2, 3, 4, 5].map((t) => (
              <button
                key={t}
                onClick={() => toggleTable(t)}
                style={{
                  padding: "10px",
                  background: selectedTables.includes(t)
                    ? "green"
                    : "#eee",
                }}
              >
                Table {t}
              </button>
            ))}
          </div>

          {/* PAYMENT */}
          <div style={{ marginTop: "20px" }}>
            <h4>Payment</h4>

            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="WALLET">Wallet</option>
              <option value="POINTS">Points (disabled rule)</option>
            </select>

            <input
              type="password"
              placeholder="Enter PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              style={{ marginLeft: "10px" }}
            />
          </div>

          {/* BOOK BUTTON */}
          <button
            onClick={handleBooking}
            style={{ marginTop: "20px", padding: "10px" }}
          >
            Book Tables (40% Deposit)
          </button>

          {/* RULES */}
          <div style={{ marginTop: "20px", fontSize: "12px" }}>
            <p>• Booking valid for 72 hours</p>
            <p>• 40% upfront deposit required</p>
            <p>• Sold tables: 50% refundable if cancelled</p>
            <p>• Points cannot be used for booking</p>
            <p>• No refunds on expired/no-show bookings</p>
          </div>
        </div>
      )}
    </div>
  );
}