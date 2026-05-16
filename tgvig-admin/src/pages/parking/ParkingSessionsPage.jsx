import { useEffect, useState } from "react";
import axios from "axios";

function ParkingSessionsPage() {

  const [sessions, setSessions] = useState([]);

  useEffect(() => {

    axios
      .get("/parking")
      .then((res) => {
        setSessions(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  return (
    <div>

      <h1>🅿️ Parking Sessions</h1>

      {sessions.map((session) => (
        <div
          key={session._id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px"
          }}
        >
          <p>Status: {session.status}</p>
          <p>Vehicle: {session.vehicleNumber}</p>
          <p>Amount: R{session.amount}</p>
        </div>
      ))}

    </div>
  );
}

export default ParkingSessionsPage;