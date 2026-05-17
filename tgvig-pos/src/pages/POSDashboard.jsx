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
    setSelectedDevice(res.data[0]); // auto select first
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

      {blogs.map((b) => (
  <img key={b._id} src={b.image} width="100%" />
))}

      {/* 🔥 ACTION BUTTONS (RESTORED) */}
      <div style={{ marginBottom: "15px", display: "flex", gap: "10px" }}>
       <button
  onClick={() => {
    if (!selectedDevice) {
      console.log("❌ No device selected");
      return;
    }

    console.log("CLICKED", selectedDevice);

    navigate(`/start-sale/${selectedDevice.clubId}/${selectedDevice._id}`);
  }}
>
  Start Sale
</button>


        <button onClick={() => navigate("/member")}>
          Search Member
        </button>
      </div>

<button onClick={() => navigate("/register-member")}>
  Register Member
</button>

 <button onClick={() => navigate("/wallet-topup")}>
    Wallet Top-Up
  </button>

  {/* 🚗 RIDES */}
  <button onClick={() => navigate("/pos/rides")}>
    Ride Request
  </button>

  {/* 🅿️ PARKING */}
  <button onClick={() => navigate("/pos/parking")}>
    Parking
  </button>

  {/* 🪑 BOOKINGS */}
  <button onClick={() => navigate("/pos/bookings")}>
    Table Booking
  </button>

{blogs.map((b) => (
  <div key={b._id}>
    <h4>{b.title}</h4>
  </div>
))}

      {/* 🔥 LIVE POS AREA */}
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