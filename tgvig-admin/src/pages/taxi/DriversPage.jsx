import { useEffect, useState } from "react";
import axios from "axios";
import API from "../../services/api";

function DriversPage() {

  const [drivers, setDrivers] = useState([]);

  useEffect(() => {

    API
      .get("/drivers/summary")
      .then((res) => {
        setDrivers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  return (
    <div>

      <h1>🚗 Drivers</h1>

      {drivers.map((driver) => (
        <div
          key={driver._id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px"
          }}
        >
          <h3>
            {driver.firstName} {driver.lastName}
          </h3>

          <p>Status: {driver.status}</p>
          <p>Vehicle: {driver.vehicleType}</p>
          <p>Online: {driver.onlineStatus}</p>
        </div>
      ))}

    </div>
  );
}

export default DriversPage;