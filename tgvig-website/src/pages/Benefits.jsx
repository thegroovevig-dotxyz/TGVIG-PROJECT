import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Benefits() {
  const [benefits, setBenefits] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await API.get("/webcontent/benefits");
        const data = res.data?.content;
        setBenefits(Array.isArray(data) ? data : []);
      } catch (err) {
        console.log(err);
        setBenefits([]);
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