import { useEffect, useState } from "react";
import API from "../api/axios";

function WebRewards() {
  const [rewards, setRewards] = useState([]);

  useEffect(() => {
    API.get("/webcontent/webRewards")
      .then((res) => {
        const data = res.data?.content;

        // DEBUG (check what you're actually getting)
        console.log("WEB REWARDS RAW:", data);

        // FORCE CONSISTENT ARRAY
        let fixed = [];

        if (Array.isArray(data)) {
          fixed = data;
        } else if (data && typeof data === "object") {
          fixed = [data]; // convert single object → array
        } else {
          fixed = [];
        }

        setRewards(fixed);
      })
      .catch((err) => {
        console.log("WEB REWARDS ERROR:", err);
        setRewards([]);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Rewards</h1>

      {rewards.length === 0 && <p>No rewards found</p>}

      {rewards.map((r, i) => (
        <div key={i} style={{ marginBottom: "15px" }}>
          {r.image && <img src={r.image} width="200" />}
          <h3>{r.title}</h3>
          <p>{r.description}</p>
        </div>
      ))}
    </div>
  );
}

export default WebRewards;