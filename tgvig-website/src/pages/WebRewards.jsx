import { useEffect, useState } from "react";
import API from "../api/axios";

function WebRewards() {
  const [rewards, setRewards] = useState([]);

  useEffect(() => {
    API.get("/webcontent/webRewards")
      .then((res) => setRewards(res.data?.content || []))
      .catch(() => setRewards([]));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Rewards</h1>

      {rewards.map((r, i) => (
        <div key={i}>
          {r.image && <img src={r.image} width="200" />}
          <h3>{r.title}</h3>
          <p>{r.description}</p>
        </div>
      ))}
    </div>
  );
}

export default WebRewards;