import { useEffect, useState } from "react";
import API from "../api/axios";
import PromotionForm from "../components/forms/promotionForm";

function Promotions() {
  const [promos, setPromos] = useState([]);
  const [clubs, setClubs] = useState([]);

  const loadData = async () => {
    try {
      const promoRes = await API.get("/promotions");
      const clubRes = await API.get("/clubs");

      setPromos(promoRes.data);
      setClubs(clubRes.data);

    } catch (err) {
      console.log("❌ ERROR:", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const createPromo = async (data) => {
    try {
      await API.post("/promotions", data);
      loadData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>Promotions</h2>

      <PromotionForm onCreate={createPromo} clubs={clubs} />

      <hr />

      {promos.map((p) => (
         <div key={p._id} style={{ border: "1px solid #ccc", padding: "10px" }}>

    {/* IMAGE FIX */}
    {p.image && (
      <img
        src={p.image}
        alt={p.title}
        style={{ width: "120px", height: "120px", objectFit: "cover" }}
      />
    )}
          <h4>{p.title}</h4>
          <p>{p.type}</p>
        </div>
      ))}
    </div>
  );
}

export default Promotions;