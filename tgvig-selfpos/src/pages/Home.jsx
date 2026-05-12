import API from "../api/axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";



function Home() {
  const navigate = useNavigate();

  const clubId = "69e9284d26961ca9fbef1c08";
  const deviceId = "69f32f056119ac5b6afe3b9b"; // your SELF POS device

  useEffect(() => {
    API.get("/blogs").then(res => setBlogs(res.data));
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>WELCOME TO SELF POS</h1>

      <button
        onClick={() =>
          navigate(`/selfpos/${clubId}/${deviceId}`)
        }
      >
        Start Order
      </button>
    
      {blogs.map((b) => (
        <img key={b._id} src={b.image} width="200" />
      ))}
    </div>
  );
}

export default Home;