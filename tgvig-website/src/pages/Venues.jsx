import { useEffect, useState } from "react";
import API from "../api/axios";

function Venues() {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await API.get("/webcontent/venues");
        setVenues(res.data?.content || []);
      } catch (err) {
        console.log(err);
      }
    };

    load();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Venues</h2>

      {rewards.map((r, i) => (
  <div
    key={i}
    onClick={() => navigate("/webRewards")}
    style={{ cursor: "pointer", marginBottom: "15px" }}
  >
    {r.image && <img src={r.image} width="200" />}
    <h3>{r.title}</h3>
    <p>{r.description}</p>
  </div>
))}
    </div>
  );
}

export default Venues;