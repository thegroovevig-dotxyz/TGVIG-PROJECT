import API from "../api/axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getBlogs } from "../api/blogs.api";



function Home() {
   const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  const clubId = "69e9284d26961ca9fbef1c08";
  const deviceId = "69f32f056119ac5b6afe3b9b"; // your SELF POS device


  useEffect(() => {
    API.get("/blogs").then(res => setBlogs(res.data));
  }, []);

  const loadBlogs = async () => {
    try {
      const res = await getBlogs();
      setBlogs(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

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