import { useEffect, useState } from "react";
import API from "../api/axios";

function Benefits() {
  const [benefits, setBenefits] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await API.get("/webcontent/benefits");
        setBenefits(res.data?.content || []);
      } catch (err) {
        console.log(err);
      }
    };

    load();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Benefits</h2>

      {benefits.map((b, i) => (
  <div
    key={i}
    onClick={() => navigate("/benefits")}
    style={{ cursor: "pointer", marginBottom: "15px" }}
  >
    {b.image && <img src={b.image} width="200" />}
    <h3>{b.title}</h3>
    <p>{b.description}</p>
  </div>
))}
    </div>
  );
}

export default Benefits;