import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Venues() {
  const [venues, setVenues] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await API.get("/webcontent/venues");
        const data = res.data?.content;
        setVenues(Array.isArray(data) ? data : []);
      } catch (err) {
        console.log(err);
        setVenues([]);
      }
    };

    load();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Venues</h2>

      {venues.map((v, i) => (
        <div
          key={i}
          onClick={() => navigate("/venues")}
          style={{ cursor: "pointer", marginBottom: "15px" }}
        >
          {v.image && <img src={v.image} width="200" />}
          <h3>{v.title}</h3>
          <p>{v.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Venues;