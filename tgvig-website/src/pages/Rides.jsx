import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Rides() {
  const [rides, setRides] = useState([]);

  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [price, setPrice] = useState("");

  // 🚗 LOAD RIDES (FIXED SAFETY HANDLING)
  const loadRides = async () => {
    try {
      const res = await API.get("/rides/my");

      console.log("RIDES RESPONSE:", res.data);

      // supports BOTH formats:
      const data = res.data?.rides || res.data || [];

      setRides(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log("LOAD RIDES ERROR:", err);
      setRides([]);
    }
  };

  useEffect(() => {
    loadRides();
  }, []);

  // 🚗 REQUEST RIDE
  const requestRide = async () => {
    try {
      if (!pickup || !dropoff || !price) {
        alert("Fill all fields");
        return;
      }

      await API.post("/rides/request", {
        pickup,
        dropoff,
        estimatedPrice: Number(price),
      });

      setPickup("");
      setDropoff("");
      setPrice("");

      loadRides();
    } catch (err) {
      console.log("REQUEST RIDE ERROR:", err);
    }
  };

  // 💳 PAY RIDE
  const payRide = async (rideId) => {
    try {
      await API.post("/rides/pay", { rideId });
      loadRides();
    } catch (err) {
      console.log("PAY RIDE ERROR:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🚗 Ride Booking</h2>

      {/* REQUEST */}
      <div style={{ marginBottom: "20px" }}>
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

        <button onClick={requestRide}>
          Request Ride
        </button>
      </div>

      {/* LIST */}
      <h3>My Rides</h3>

      {rides.length === 0 ? (
        <p>No rides found</p>
      ) : (
        rides.map((r) => (
          <div
            key={r._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <p>📍 {r.pickup} → {r.dropoff}</p>
            <p>💰 R{r.price}</p>
            <p>Status: {r.status}</p>

            {r.paymentStatus !== "PAID" && (
              <button onClick={() => payRide(r._id)}>
                Pay Ride
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}