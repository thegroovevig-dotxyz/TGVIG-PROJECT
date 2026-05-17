import { useEffect, useState } from "react";
import API from "../api/axios";

export default function POSProperty() {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [rooms, setRooms] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("CASH");

  useEffect(() => {
    API.get("/properties").then(res => {
      setProperties(res.data.properties || []);
    });
  }, []);

  const handleBooking = async () => {
    try {
      if (!selectedProperty) return alert("Select property");

      await API.post("/properties/book", {
        propertyId: selectedProperty._id,
        rooms,
        paymentMethod,
      });

      alert("Property booking completed");

      setSelectedProperty(null);
      setRooms(1);

    } catch (err) {
      console.log(err);
      alert("Booking failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🏨 POS Property Booking</h2>

      {/* PROPERTY LIST */}
      <div>
        {properties.map((p) => (
          <div
            key={p._id}
            onClick={() => setSelectedProperty(p)}
            style={{
              border: "1px solid #ccc",
              margin: "10px",
              padding: "10px",
              cursor: "pointer",
              background: selectedProperty?._id === p._id ? "#eee" : "#fff"
            }}
          >
            <h4>{p.name}</h4>
            <p>{p.location}</p>
          </div>
        ))}
      </div>

      {/* ROOMS */}
      <input
        type="number"
        min="1"
        value={rooms}
        onChange={(e) => setRooms(Number(e.target.value))}
      />

      {/* PAYMENT */}
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