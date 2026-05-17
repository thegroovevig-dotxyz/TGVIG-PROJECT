import { useEffect, useState } from "react";
import API from "../../services/api";

function RidesPage() {

  const [rides, setRides] = useState([]);

  useEffect(() => {

    API.get("/rides")
      .then((res) => {
        setRides(res.data.rides || res.data || []);
      })
      .catch((err) => {
        console.log(err);
        setRides([]);
      });

  }, []);

  return (
    <div>
      <h1>🚕 Rides</h1>

      {rides.map((ride) => (
        <div key={ride._id}>
          <p>{ride.status}</p>
        </div>
      ))}
    </div>
  );
}

export default RidesPage;