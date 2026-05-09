import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { authService } from "../auth/authService";

function Home() {
  const navigate = useNavigate();
  const user = authService.getUser();
  const [blogs, setBlogs] = useState([]);

  const loadBlogs = async () => {
  try {
    const res = await API.get("/blogs");
    setBlogs(res.data);
  } catch (err) {
    console.log(err);
  }
};

useEffect(() => {
  if (!user) {
    navigate("/login");
    return;
  }

  loadBlogs();
}, [user, navigate]);

  return (
    <div style={{ padding: "20px" }}>
<img
  src="/logo.png"
  alt="TGVIG Logo"
  style={{
  width: "120px",
  display: "block",
  margin: "0 auto 10px"
}}
/>

      <h1>WELCOME TO THE GROOVE VIG</h1>

      <p>
        Hello {user?.name}, explore menus, promotions, and rewards.
      </p>

      {/* 📰 BLOG FEED */}
<div style={{ marginTop: "20px" }}>
  <h3>Latest Updates</h3>

  {blogs.length === 0 ? (
    <p>No updates yet</p>
  ) : (
    blogs.map((b) => (
      <div
        key={b._id}
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "8px",
        }}
      >
        {b.image && (
          <img
            src={b.image}
            alt=""
            style={{ width: "100%", maxHeight: "200px", objectFit: "cover" }}
          />
        )}

        <h4>{b.title}</h4>
        <p>{b.content}</p>
      </div>
    ))
  )}
</div>

      {/* NAVIGATION BUTTONS */}
      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        <button onClick={() => navigate("/app/menu")}>
          Go to Menu
        </button>

        <button onClick={() => navigate("/app/promotions")}>
          View Promotions
        </button>

        {/* 🪑 TABLE BOOKING */}
        <button onClick={() => navigate("/app/table-booking")}>
          Table Booking
        </button>

        {/* 🎟️ EVENT TICKETS */}
        <button onClick={() => navigate("/app/events")}>
          Event Tickets
        </button>
      </div>
    </div>
  );
}

export default Home;