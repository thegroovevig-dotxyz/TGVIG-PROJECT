import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Rides() {
  const [rides, setRides] = useState([]);
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [price, setPrice] = useState("");

  const loadRides = async () => {
    try {
      const res = await API.get("/rides/my");
      setRides(res.data.rides || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadRides();
  }, []);

  const requestRide = async () => {
    try {
      await API.post("/rides/request", {
        pickup,
        dropoff,
        estimatedPrice: price,
      });

      setPickup("");
      setDropoff("");
      setPrice("");

      loadRides();
    } catch (err) {
      console.log(err);
    }
  };

  const payRide = async (rideId) => {
    try {
      await API.post("/rides/pay", { rideId });
      loadRides();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🚗 Ride Booking</h2>

      {/* REQUEST RIDE */}
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
          placeholder="Estimated Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button onClick={requestRide}>
          Request Ride
        </button>
      </div>

      {/* LIST RIDES */}
      <h3>My Rides</h3>

      {rides.map((r) => (
        <div key={r._id} style={{ border: "1px solid #ccc", padding: "10px" }}>
          <p>📍 {r.pickup} → {r.dropoff}</p>
          <p>💰 R{r.price}</p>
          <p>Status: {r.status}</p>

          {r.paymentStatus !== "PAID" && (
            <button onClick={() => payRide(r._id)}>
              Pay Ride
            </button>
          )}
        </div>
      ))}
    </div>
  );
}