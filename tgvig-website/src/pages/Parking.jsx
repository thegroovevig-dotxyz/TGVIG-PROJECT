import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Parking() {
  const [sessions, setSessions] = useState([]);
  const [parkingId, setParkingId] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [amount, setAmount] = useState("");

  const loadSessions = async () => {
    try {
      const res = await API.get("/parking/my");
      setSessions(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadSessions();
  }, []);

  // 🅿️ START SESSION
  const startParking = async () => {
    try {
      await API.post("/parking/start", {
        parkingId,
        vehiclePlate,
      });

      setParkingId("");
      setVehiclePlate("");

      loadSessions();
    } catch (err) {
      console.log(err);
    }
  };

  // 💳 END + PAY
  const endParking = async (sessionId) => {
    try {
      await API.post("/parking/end", {
        sessionId,
        amount,
      });

      setAmount("");
      loadSessions();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🅿️ Parking System</h2>

      {/* START SESSION */}
      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Parking ID / Location"
          value={parkingId}
          onChange={(e) => setParkingId(e.target.value)}
        />

        <input
          placeholder="Vehicle Plate"
          value={vehiclePlate}
          onChange={(e) => setVehiclePlate(e.target.value)}
        />

        <button onClick={startParking}>
          Start Parking
        </button>
      </div>

      {/* END SESSION PAYMENT */}
      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      {/* SESSIONS LIST */}
      <h3>My Parking Sessions</h3>

      {sessions.length === 0 ? (
        <p>No sessions yet</p>
      ) : (
        sessions.map((s) => (
          <div
            key={s._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <p>🚗 Plate: {s.vehiclePlate}</p>
            <p>📍 Parking: {s.parkingId}</p>
            <p>Status: {s.status}</p>

            {s.status === "ACTIVE" && (
              <button onClick={() => endParking(s._id)}>
                End + Pay
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}