import API from "../api/axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

 const clubId = import.meta.env.VITE_CLUB_ID;
const deviceId = import.meta.env.VITE_DEVICE_ID;

  

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>WELCOME TO SELF POS</h1>

      <button
        onClick={() => navigate('/MenuGrid')}
      >
        Start Order
      </button>
    </div>
  );
}

export default Home;