import { useEffect, useState } from "react";
import axios from "axios";

function RidesPage() {

  const [rides, setRides] = useState([]);

  useEffect(() => {

    axios
      .get("/api/rides")
      .then((res) => {
        setRides(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  return (
    <div>

      <h1>🚕 Ride Management</h1>

      {rides.map((ride) => (
        <div
          key={ride._id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px"
          }}
        >
          <p>Pickup: {ride.pickupLocation}</p>
          <p>Destination: {ride.destination}</p>
          <p>Status: {ride.status}</p>
          <p>Fare: R{ride.fare}</p>
        </div>
      ))}

    </div>
  );
}

export default RidesPage;