import { useState } from "react";
import API from "../api/axios";

function ParkingCheckin() {
  const [plate, setPlate] = useState("");
  const [parkingId, setParkingId] = useState("");

  // STEP 2: CHECK IN
    const checkIn = async () => {
      await API.post("/CHECK-IN", {
        qrToken,
        type,
      });
  
      alert("CHECKED IN");
    };
  
    // STEP 3: CHECK OUT
    const checkOut = async () => {
      await API.post("/CHECK-OUT", {
        qrToken,
        type,
      });
  
      alert("CHECKED OUT");
    };

  return (
    <div style={{ padding: 20 }}>
      <h2>PARKING CHECK-IN</h2>

      <input
        placeholder="Vehicle Plate"
        onChange={(e) => setPlate(e.target.value)}
      />

      <input
        placeholder="Parking ID"
        onChange={(e) => setParkingId(e.target.value)}
      />

      <button onClick={checkin}>Start Parking</button>
    </div>
  );
}

export default ParkingCheckin;