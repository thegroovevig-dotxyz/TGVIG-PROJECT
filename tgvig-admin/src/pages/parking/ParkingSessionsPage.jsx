import { useEffect, useState } from "react";
import API from "../../services/api";

function ParkingSessionsPage() {

  const [sessions, setSessions] = useState([]);

  useEffect(() => {

    API.get("/parking")
      .then((res) => {
        setSessions(res.data.sessions || res.data || []);
      })
      .catch((err) => {
        console.log(err);
        setSessions([]);
      });

  }, []);

  return (
    <div>
      <h1>🅿️ Parking Sessions</h1>

      {sessions.map((session) => (
        <div key={session._id}>
          <p>{session.status}</p>
        </div>
      ))}
    </div>
  );
}

export default ParkingSessionsPage;