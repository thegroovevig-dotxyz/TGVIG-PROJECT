import { useEffect, useState } from "react";
import API from "../../services/api";

export default function ParkingSessions() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    API.get("/parking")
      .then((res) => setSessions(res.data || []))
      .catch(console.log);
  }, []);

  return (
    <div>
      <h2>Parking Sessions</h2>

      {sessions.map((s) => (
        <div key={s._id}>
          <p>Status: {s.status}</p>
          <p>Amount: R{s.amount}</p>
        </div>
      ))}
    </div>
  );
}