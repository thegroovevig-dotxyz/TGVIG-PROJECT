import API from "../api/axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const clubId = "69e9284d26961ca9fbef1c08";
  const deviceId = "69f32f056119ac5b6afe3b9b";

  useEffect(() => {
    API.get("/blogs"); // optional: you can even remove this too
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>WELCOME TO SELF POS</h1>

      <button
        onClick={() => navigate(`/selfpos/${clubId}/${deviceId}`)}
      >
        Start Order
      </button>
    </div>
  );
}

export default Home;