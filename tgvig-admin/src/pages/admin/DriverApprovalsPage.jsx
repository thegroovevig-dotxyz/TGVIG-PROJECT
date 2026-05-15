import { useEffect, useState } from "react";
import API from "../../services/api";

function DriverApprovalsPage() {

  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {

    try {

      const res = await API.get(
        "/drivers/pending"
      );

      setDrivers(res.data);

    } catch (err) {
      console.log(err);
    }
  };



  const approveDriver = async (id) => {

    try {

      await API.post(
        "/admin/driver/approve",
        { driverId: id }
      );

      fetchDrivers();

    } catch (err) {
      console.log(err);
    }
  };



  const rejectDriver = async (id) => {

    try {

      await API.post(
        "/admin/driver/reject",
        { driverId: id }
      );

      fetchDrivers();

    } catch (err) {
      console.log(err);
    }
  };



  return (
    <div>

      <h1>🚗 Driver Approvals</h1>

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

          <p>
            Vehicle: {driver.vehicleType}
          </p>

          <button
            onClick={() =>
              approveDriver(driver._id)
            }
          >
            Approve
          </button>

          <button
            onClick={() =>
              rejectDriver(driver._id)
            }
          >
            Reject
          </button>

        </div>

      ))}

    </div>
  );
}

export default DriverApprovalsPage;