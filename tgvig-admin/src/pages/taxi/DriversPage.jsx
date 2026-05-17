import { useEffect, useState } from "react";
import API from "../../services/api";

function DriversPage() {

  const [drivers, setDrivers] = useState([]);

  useEffect(() => {

    API.get("/drivers")
      .then((res) => {
        setDrivers(res.data.drivers || res.data || []);
      })
      .catch((err) => {
        console.log(err);
        setDrivers([]);
      });

  }, []);

  return (
    <div>
      <h1>🚗 Drivers</h1>

      {drivers.map((driver) => (
        <div key={driver._id}>
          <p>{driver.status}</p>
        </div>
      ))}
    </div>
  );
}

export default DriversPage;