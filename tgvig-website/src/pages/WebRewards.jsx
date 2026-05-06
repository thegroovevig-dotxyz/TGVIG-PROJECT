import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function WebRewards() {
  const [rewards, setRewards] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/webcontent/webRewards")
      .then((res) => {
        const data = res.data?.content;
        setRewards(Array.isArray(data) ? data : []);
      })
      .catch(() => setRewards([]));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Rewards</h1>

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