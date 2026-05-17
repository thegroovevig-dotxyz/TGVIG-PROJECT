import { useEffect, useState } from "react";
import API from "../services/api";

export default function Rides() {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    API.get("/rides")
      .then((res) => setRides(res.data || []))
      .catch(console.log);
  }, []);

  return (
    <div>
      <h2>My Rides</h2>

      {rides.map((r) => (
        <div key={r._id}>
          <p>Status: {r.status}</p>
          <p>Amount: R{r.amount}</p>
        </div>
      ))}
    </div>
  );
}