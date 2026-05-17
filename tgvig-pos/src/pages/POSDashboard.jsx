import API from "../api/axios";
import { useState, useEffect } from "react";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import { useNavigate } from "react-router-dom";

function POSDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);

  useEffect(() => {
    API.get("/devices").then(res => {
      setDevices(res.data);
      setSelectedDevice(res.data?.[0]);
    });
  }, []);

  useEffect(() => {
    API.get("/blogs").then(res => setBlogs(res.data));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>POS Dashboard</h2>

      <p>Welcome: {user?.name}</p>
      <p>Role: {user?.role}</p>

      {/* ACTIONS */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
        <button
          onClick={() =>
            selectedDevice &&
            navigate(`/start-sale/${selectedDevice.clubId}/${selectedDevice._id}`)
          }
        >
          Start Sale
        </button>

        <button onClick={() => navigate("/member")}>Search Member</button>
        <button onClick={() => navigate("/register-member")}>Register Member</button>
        <button onClick={() => navigate("/wallet-topup")}>Wallet Top-Up</button>

        <button onClick={() => navigate("/pos/rides")}>Ride Request</button>
        <button onClick={() => navigate("/pos/parking")}>Parking</button>
        <button onClick={() => navigate("/pos/bookings")}>Room Booking</button>
      </div>

      {/* POS CORE */}
      <div style={{ display: "flex", gap: "20px" }}>
        <div style={{ flex: 1 }}>
          <Cart />
        </div>

        <div style={{ flex: 1 }}>
          <Checkout />
        </div>
      </div>
    </div>
  );
}

export default POSDashboard;