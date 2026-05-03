import { useEffect, useState } from "react";
import API from "../api/axios";

function PromoBanner() {
  const [promos, setPromos] = useState([]);

  useEffect(() => {
    loadPromos();
  }, []);

  const loadPromos = async () => {
    const res = await API.get("/promotions/1");
    setPromos(res.data || []);
  };

  return (
    <div>
      {promos.map((p) => (
        <div key={p._id} style={{ background: "#eee", padding: 10, margin: 5 }}>
          <h4>{p.title}</h4>
        </div>
      ))}
    </div>
  );
}

export default PromoBanner;