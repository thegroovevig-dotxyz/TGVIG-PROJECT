import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

function ScanQR() {
  const [qrToken, setQrToken] = useState("");
  const [type, setType] = useState("PROPERTY");
  const [data, setData] = useState(null);

  const navigate = useNavigate();

  // STEP 1: VALIDATE QR
  const validateQR = async () => {
  try {
    const res = await API.post("/VALIDATE-QR", {
      qrToken,
      type,
    });

    const qrType = res.data.type;
    const record = res.data.record;

    setData(record);

    // 🔥 ROUTE DECISION
    if (type === "PROPERTY") {
      navigate("/minipos/booking-approval");
    }

    if (type === "PARKING") {
      navigate("/minipos/parking-checkin");
    }

  } catch (err) {
    console.log(err.response?.data || err.message);
    alert("Invalid QR");
  }
};


  return (
    <div style={{ padding: 20 }}>
      <h2>MINIPOS QR SCANNER</h2>

      <input
        placeholder="QR Token"
        value={qrToken}
        onChange={(e) => setQrToken(e.target.value)}
      />

      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="PROPERTY">PROPERTY</option>
        <option value="PARKING">PARKING</option>
      </select>

      <button onClick={validateQR}>Validate</button>

      {data && (
        <div style={{ marginTop: 20 }}>
          <pre>{JSON.stringify(data, null, 2)}</pre>

          <button onClick={checkIn}>Check In</button>
          <button onClick={checkOut}>Check Out</button>
        </div>
      )}
    </div>
  );
}

export default ScanQR;